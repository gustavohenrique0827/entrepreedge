
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, className }) => {
  // Convert from kebab-case or regular name to PascalCase
  const formatName = (iconName: string): string => {
    return iconName
      .split(/[-\s]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
  };

  const iconName = formatName(name);
  
  // Cast LucideIcons to a Record with proper type assertion
  const iconSet = LucideIcons as unknown as Record<string, React.ComponentType<any>>;
  const IconComponent = iconSet[iconName] || iconSet.HelpCircle;
  
  return <IconComponent size={size} color={color} className={className} />;
};

export default Icon;
