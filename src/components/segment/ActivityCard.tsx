
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Package, ShoppingCart, Settings, Users, BarChart, Calendar } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  description: string;
  path: string;
  icon: string;
  className?: string;
}

// Helper function to get icons by string name
const getIcon = (iconName: string, size: number = 18) => {
  switch (iconName) {
    case 'package':
      return <Package size={size} />;
    case 'shopping-cart':
      return <ShoppingCart size={size} />;
    case 'file-text':
      return <FileText size={size} />;
    case 'settings':
      return <Settings size={size} />;
    case 'users':
      return <Users size={size} />;
    case 'chart-bar':
      return <BarChart size={size} />;
    case 'calendar':
      return <Calendar size={size} />;
    default:
      return <FileText size={size} />;
  }
};

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  title, 
  description, 
  path, 
  icon,
  className = ""
}) => {
  return (
    <Link to={path} className="no-underline">
      <Card className={`h-full hover:shadow-md transition-shadow ${className}`}>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
            <span className="text-primary">
              {getIcon(icon)}
            </span>
          </div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground flex-grow mb-4">{description}</p>
          <Button variant="outline" className="w-full justify-center">
            Acessar
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
