
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  className = "",
  fullWidth = false
}) => {
  return (
    <main className={`container mx-auto p-4 md:p-6 ${fullWidth ? 'max-w-full' : 'max-w-7xl'} ${className}`}>
      {children}
    </main>
  );
};
