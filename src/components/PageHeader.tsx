
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string; // Added description as an alternative to subtitle
  icon?: React.ReactNode; // Added icon support
  actionButton?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description, // Support for description prop
  icon,
  actionButton,
  className = ""
}) => {
  const displayedSubtitle = subtitle || description; // Use either subtitle or description
  
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-4 sm:mb-0 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {displayedSubtitle && (
              <p className="text-sm text-muted-foreground mt-1">{displayedSubtitle}</p>
            )}
          </div>
        </div>
        {actionButton && (
          <div className="flex-shrink-0">
            {actionButton}
          </div>
        )}
      </div>
      <Separator className="my-4" />
    </div>
  );
};
