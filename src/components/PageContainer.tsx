
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useSegment } from '@/contexts/SegmentContext';
import useSegmentConfig from '@/hooks/useSegmentConfig';
import { getNavItemsBySegment } from '@/utils/navigationUtils';

interface PageContainerProps {
  children: React.ReactNode;
  navItems?: any[];
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  navItems = [] 
}) => {
  const { currentSegment, getVisualPreferences, applySegmentVisuals } = useSegment();
  const { isConfigApplied, applySegmentConfig } = useSegmentConfig();
  
  // Automatically apply segment configuration on first render
  useEffect(() => {
    // Load visual preferences if they aren't applied
    const segmentConfigType = localStorage.getItem('segmentConfigType');
    if (segmentConfigType !== currentSegment) {
      applySegmentVisuals();
      applySegmentConfig();
    }
    
    // Adjust CSS variables for the current theme
    const prefs = getVisualPreferences();
    if (prefs) {
      document.documentElement.style.setProperty('--primary-color', prefs.primaryColor || '#8B5CF6');
      document.documentElement.style.setProperty('--secondary-color', prefs.secondaryColor || '#D946EF');
    }
  }, [currentSegment]);
  
  // Get segment-specific navigation items if none were provided
  const segmentNavItems = navItems.length > 0 ? navItems : getNavItemsBySegment(currentSegment);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={segmentNavItems} />
        
        <div className="container px-4 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};
