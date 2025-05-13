
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, color, size = 24, className }) => {
  // @ts-ignore - Dynamic icon loading
  const LucideIcon = LucideIcons[name];
  
  if (!LucideIcon) {
    console.warn(`Icon ${name} not found`);
    // @ts-ignore
    const FallbackIcon = LucideIcons.HelpCircle;
    return <FallbackIcon color={color} size={size} className={className} />;
  }
  
  return <LucideIcon color={color} size={size} className={className} />;
};
