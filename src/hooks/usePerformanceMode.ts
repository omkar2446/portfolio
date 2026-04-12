import { useState, useEffect } from 'react';

export const usePerformanceMode = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      // Basic mobile detection
      const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      // Check for user preference (Reduced Motion)
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check for battery status (if API supported)
      // Note: This is an experimental API, wrapping in try/catch or simple check
      const battery = (navigator as any).battery || (navigator as any).webkitBattery;
      const isLowBattery = battery && battery.level < 0.2 && !battery.charging;

      setIsLowPerformance(isMobile || prefersReducedMotion || isLowBattery);
    };

    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  return isLowPerformance;
};
