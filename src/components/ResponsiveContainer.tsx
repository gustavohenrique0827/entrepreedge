
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = "",
  fullHeight = false
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`
      w-full 
      px-4 
      sm:px-6 
      md:px-8 
      lg:px-10 
      mx-auto 
      ${fullHeight ? 'min-h-[calc(100vh-64px)]' : ''} 
      ${isMobile ? 'max-w-full' : 'max-w-7xl'}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
