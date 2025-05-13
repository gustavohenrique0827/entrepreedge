
import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the screen size is mobile
 * @param breakpoint The width breakpoint to consider as mobile (default: 768px)
 * @returns boolean indicating if the screen is mobile size
 */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Initial check
    setIsMobile(window.innerWidth < breakpoint);
    
    // Update on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}
