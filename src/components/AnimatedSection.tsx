import { ReactNode, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gsap from 'gsap';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.4,
        ease: 'power4.out',
        delay: delay / 1000,
        force3D: true
      });
    }
  }, [isVisible, delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-100px) opacity(0)';
      case 'right': return 'translateX(100px) opacity(0)';
      case 'up': return 'translateY(80px) opacity(0)';
      default: return 'opacity(0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
    >
      <div
        ref={contentRef}
        style={{
          opacity: 0,
          transform: direction === 'up' 
            ? 'translateY(80px) translateZ(-50px) rotateX(10deg)' 
            : direction === 'left' 
              ? 'translateX(-100px)' 
              : direction === 'right' 
                ? 'translateX(100px)' 
                : 'none',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedSection;
