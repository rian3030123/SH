import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const raf = useCallback((time: number) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time);
      ScrollTrigger.update();
    }
    rafIdRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Start RAF loop
    rafIdRef.current = requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenisRef.current.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Store refresh handler for proper cleanup
    const refreshHandler = () => lenisRef.current?.resize();
    ScrollTrigger.addEventListener('refresh', refreshHandler);
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      ScrollTrigger.removeEventListener('refresh', refreshHandler);
    };
  }, [raf]);

  return lenisRef.current;
};