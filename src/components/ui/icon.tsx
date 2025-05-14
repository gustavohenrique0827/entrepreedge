
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, color, size = 24, className }) => {
  // Convert kebab-case to PascalCase for Lucide icons
  const formatIconName = (iconName: string): string => {
    return iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  };

  const iconName = formatIconName(name);
  
  // @ts-ignore - Dynamic icon loading
  const LucideIcon = LucideIcons[iconName];
  
  if (!LucideIcon) {
    console.warn(`Icon ${name} not found, using fallback`);
    // @ts-ignore
    const FallbackIcon = LucideIcons.FileText;
    return <FallbackIcon color={color} size={size} className={className} />;
  }
  
  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;
