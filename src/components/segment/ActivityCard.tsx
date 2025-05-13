
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/icon';

interface ActivityCardProps {
  title: string;
  description?: string;
  path: string;
  icon: string;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  title, 
  description, 
  path, 
  icon,
  className = ""
}) => {
  return (
    <Link to={path} className="block">
      <Card className={`glass h-full hover:shadow-md transition-all ${className}`}>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
            <span className="text-primary">
              <Icon name={icon} size={18} />
            </span>
          </div>
          <h3 className="font-semibold mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mb-auto">{description}</p>
          )}
          <Button variant="link" className="p-0 h-auto justify-start mt-4 text-primary text-sm">
            Acessar
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
