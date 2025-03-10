
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatValue?: (value: number) => string;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  formatValue = (val) => val.toFixed(0),
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const initialValueRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    initialValueRef.current = displayValue;
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = initialValueRef.current + (value - initialValueRef.current) * easeOutQuart(progress);
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);
  
  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };

  return <span className={className}>{formatValue(displayValue)}</span>;
};

export default AnimatedNumber;
