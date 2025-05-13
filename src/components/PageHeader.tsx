
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string; // Added subtitle prop
  action?: React.ReactNode;
  actionButton?: React.ReactNode; // Added actionButton prop
  icon?: React.ReactNode; // Added icon prop
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description,
  subtitle,
  action,
  actionButton,
  icon
}) => {
  // Prefer description over subtitle if both are provided
  const displayDescription = description || subtitle;
  // Prefer action over actionButton if both are provided
  const displayAction = action || actionButton;
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {displayDescription && (
            <p className="text-sm text-muted-foreground mt-1">{displayDescription}</p>
          )}
        </div>
      </div>
      
      {displayAction && (
        <div className="flex justify-start md:justify-end">
          {displayAction}
        </div>
      )}
    </div>
  );
};
