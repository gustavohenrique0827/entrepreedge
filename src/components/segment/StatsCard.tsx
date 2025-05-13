
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  change,
  trend
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-primary">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {icon && (
            <div className="text-primary">{icon}</div>
          )}
        </div>
        {typeof change !== 'undefined' && (
          <div className="mt-4">
            <span className={`text-xs font-medium ${
              trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }`}>
              {change > 0 ? '+' : ''}{change}% {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            </span>
            <span className="text-xs text-muted-foreground ml-1">desde o último período</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
