import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxLayersProps {
  children?: React.ReactNode;
  className?: string;
}

export const ParallaxLayers: React.FC<ParallaxLayersProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const midgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Background layer - slowest movement
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Midground layer - medium movement
    if (midgroundRef.current) {
      gsap.to(midgroundRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Foreground layer - fastest movement
    if (foregroundRef.current) {
      gsap.to(foregroundRef.current, {
        yPercent: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative z-10 ${className}`}>
      {/* Background Layer */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-xl" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full blur-lg" />
        <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full blur-2xl" />
      </div>

      {/* Midground Layer */}
      <div 
        ref={midgroundRef}
        className="absolute inset-0 pointer-events-none opacity-30"
      >
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg blur-md rotate-45" />
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-lg blur-sm rotate-12" />
        <div className="absolute top-2/3 left-1/6 w-28 h-28 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg blur-lg rotate-[30deg]" />
      </div>

      {/* Foreground Layer */}
      <div 
        ref={foregroundRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      >
        <div className="absolute top-1/6 right-1/6 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-sm" />
        <div className="absolute bottom-1/6 right-2/3 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-xs" />
        <div className="absolute top-5/6 left-1/2 w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};