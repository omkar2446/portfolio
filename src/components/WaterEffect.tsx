import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface WaterEffectProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * WaterEffect Component
 * Applies a 3D water displacement effect to text on hover using SVG filters and GSAP.
 */
const WaterEffect: React.FC<WaterEffectProps> = ({ children, className = '' }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const filterId = useRef(`water-filter-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const filter = document.getElementById(filterId.current);
    const displacement = filter?.querySelector('feDisplacementMap');
    const turbulence = filter?.querySelector('feTurbulence');

    if (!displacement || !turbulence) return;

    const onMouseEnter = () => {
      gsap.to(displacement, {
        attr: { scale: 30 },
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(turbulence, {
        attr: { baseFrequency: 0.03 },
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    };

    const onMouseLeave = () => {
      gsap.to(displacement, {
        attr: { scale: 0 },
        duration: 0.6,
        ease: 'power2.in',
      });
      gsap.killTweensOf(turbulence);
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(displacement);
      gsap.killTweensOf(turbulence);
    };
  }, []);

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id={filterId.current}>
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div
        ref={textRef}
        className={`inline-block cursor-default ${className}`}
        style={{ filter: `url(#${filterId.current})` }}
      >
        {children}
      </div>
    </>
  );
};

export default WaterEffect;
