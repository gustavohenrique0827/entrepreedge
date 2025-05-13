
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, className }) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  
  return <IconComponent size={size} color={color} className={className} />;
};

export default Icon;
