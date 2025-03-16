
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedNumber from './AnimatedNumber';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  change?: number;
  icon: React.ReactNode;
  format?: (value: number) => string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  change,
  icon,
  format = (val) => val.toLocaleString('pt-BR'),
  className,
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  // Determine if the value is numeric and should be animated
  const isNumericValue = typeof value === 'number';

  return (
    <div className={cn(
      'stat-card glass flex flex-col h-full',
      className
    )}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      
      <div className="mt-1">
        <h3 className="text-2xl font-semibold">
          {isNumericValue ? (
            <AnimatedNumber 
              value={value as number} 
              formatValue={format} 
            />
          ) : (
            value
          )}
        </h3>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        
        {change !== undefined && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium flex items-center",
                isPositive && "text-green-500",
                isNegative && "text-red-500",
                !isPositive && !isNegative && "text-gray-500"
              )}
            >
              {isPositive && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M12 3L20 11L17.6 13.4L13 8.8V21H11V8.8L6.4 13.4L4 11L12 3Z" fill="currentColor" />
                </svg>
              )}
              {isNegative && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M12 21L4 13L6.4 10.6L11 15.2V3H13V15.2L17.6 10.6L20 13L12 21Z" fill="currentColor" />
                </svg>
              )}
              {change.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 1 })}
            </span>
            <span className="text-xs text-muted-foreground ml-1">desde o mês passado</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
