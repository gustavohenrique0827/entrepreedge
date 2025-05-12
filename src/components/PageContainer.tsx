
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useSegment } from '@/contexts/SegmentContext';
import useSegmentConfig from '@/hooks/useSegmentConfig';

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
  
  // Aplicar configurações do segmento automaticamente na primeira renderização
  useEffect(() => {
    // Carregar preferências visuais se não estiverem aplicadas
    const segmentConfigType = localStorage.getItem('segmentConfigType');
    if (segmentConfigType !== currentSegment) {
      applySegmentVisuals();
      applySegmentConfig();
    }
    
    // Ajustar variáveis CSS para o tema atual
    const prefs = getVisualPreferences();
    if (prefs) {
      document.documentElement.style.setProperty('--primary-color', prefs.primaryColor || '#8B5CF6');
      document.documentElement.style.setProperty('--secondary-color', prefs.secondaryColor || '#D946EF');
    }
  }, [currentSegment]);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};
