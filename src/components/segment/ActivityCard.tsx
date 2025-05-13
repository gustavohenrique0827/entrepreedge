
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

interface ActivityCardProps {
  title: string;
  description?: string;
  path: string;
  icon: string;
  className?: string;
}

// Helper function to get icons by name
const getIconByName = (iconName: string, size: number = 18) => {
  const iconMap: Record<string, keyof typeof LucideIcons> = {
    'package': 'Package',
    'clipboard-list': 'ClipboardList',
    'shopping-cart': 'ShoppingCart',
    'wrench': 'Wrench',
    'truck': 'Truck',
    'file-text': 'FileText',
    'user-plus': 'UserPlus',
    'book': 'BookOpen',
    'user-check': 'UserCheck',
    'edit': 'Edit',
    'award': 'Award',
    'calendar': 'Calendar',
    'folder-open': 'FolderOpen',
    'calendar-clock': 'Clock',
    'users': 'Users',
    'bar-chart': 'BarChart',
    'kanban': 'Kanban',
    'headphones': 'Headphones',
    'git-branch': 'GitBranch',
    'settings': 'Settings',
    'line-chart': 'LineChart',
    'message-square': 'MessageSquare',
    'layers': 'Layers',
    'image': 'Image',
    'refresh-cw': 'RefreshCw',
    'bed': 'BedDouble',
    'dollar-sign': 'DollarSign',
    'credit-card': 'CreditCard',
    'megaphone': 'Megaphone',
    'map': 'Map',
    'wifi': 'Wifi',
  };

  const iconName2 = iconMap[iconName.toLowerCase()] || 'FileText';
  
  // Get the specific icon component from LucideIcons
  // @ts-ignore - Dynamic icon component
  const IconComponent = LucideIcons[iconName2];
  
  // Return the icon component with the specified size
  return IconComponent ? React.createElement(IconComponent, { size }) : React.createElement(LucideIcons.FileText, { size });
};

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
              {getIconByName(icon)}
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
