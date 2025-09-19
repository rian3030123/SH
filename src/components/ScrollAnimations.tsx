import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeIn' | 'scale' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
  triggerPoint?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animationType = 'fadeUp',
  delay = 0,
  duration = 1,
  triggerPoint = 'top 80%',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Initial state based on animation type
    const getInitialState = () => {
      switch (animationType) {
        case 'fadeUp':
          return { opacity: 0, y: 50 };
        case 'fadeIn':
          return { opacity: 0 };
        case 'scale':
          return { opacity: 0, scale: 0.8 };
        case 'slideLeft':
          return { opacity: 0, x: -50 };
        case 'slideRight':
          return { opacity: 0, x: 50 };
        default:
          return { opacity: 0, y: 50 };
      }
    };

    const getFinalState = () => {
      switch (animationType) {
        case 'fadeUp':
          return { opacity: 1, y: 0 };
        case 'fadeIn':
          return { opacity: 1 };
        case 'scale':
          return { opacity: 1, scale: 1 };
        case 'slideLeft':
        case 'slideRight':
          return { opacity: 1, x: 0 };
        default:
          return { opacity: 1, y: 0 };
      }
    };

    // Set initial state
    gsap.set(element, getInitialState());

    // Create scroll trigger animation
    const animation = gsap.to(element, {
      ...getFinalState(),
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: triggerPoint,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
    };
  }, [animationType, delay, duration, triggerPoint]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Batch animation component for multiple elements
interface BatchScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  animationType?: 'fadeUp' | 'fadeIn' | 'scale';
}

export const BatchScrollAnimation: React.FC<BatchScrollAnimationProps> = ({
  children,
  className = '',
  stagger = 0.1,
  animationType = 'fadeUp',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const items = container.querySelectorAll('.animate-item');

    if (items.length === 0) return;

    // Set initial state for all items
    const getInitialState = () => {
      switch (animationType) {
        case 'fadeUp':
          return { opacity: 0, y: 30 };
        case 'fadeIn':
          return { opacity: 0 };
        case 'scale':
          return { opacity: 0, scale: 0.9 };
        default:
          return { opacity: 0, y: 30 };
      }
    };

    const getFinalState = () => {
      switch (animationType) {
        case 'fadeUp':
          return { opacity: 1, y: 0 };
        case 'fadeIn':
          return { opacity: 1 };
        case 'scale':
          return { opacity: 1, scale: 1 };
        default:
          return { opacity: 1, y: 0 };
      }
    };

    gsap.set(items, getInitialState());

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    timeline.to(items, {
      ...getFinalState(),
      duration: 0.8,
      stagger,
      ease: 'power2.out',
    });

    return () => {
      timeline.kill();
    };
  }, [stagger, animationType]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Parallax text component
interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  className = '',
  speed = 0.5,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};