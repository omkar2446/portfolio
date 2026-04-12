import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { 
          opacity: 0, 
          scale: 0.9, 
          rotateY: -10,
          z: -100,
          transformPerspective: 1200
        },
        { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          z: 0,
          duration: 0.8, 
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};

export default PageTransition;
