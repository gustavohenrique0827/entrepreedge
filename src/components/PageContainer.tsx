
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  className = ""
}) => {
  return (
    <main className={`container mx-auto p-4 md:p-6 max-w-7xl ${className}`}>
      {children}
    </main>
  );
};
