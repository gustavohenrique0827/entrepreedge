
import { useState, useEffect } from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { useToast } from '@/hooks/use-toast';
import { SegmentModuleConfig } from '@/types/segment-types';

// Custom hook to manage segment configuration
const useSegmentConfig = () => {
  const { currentSegment, getModuleConfig } = useSegment();
  const { toast } = useToast();
  const [isConfigApplied, setIsConfigApplied] = useState(false);
  const [activeModules, setActiveModules] = useState<string[]>([]);

  // Check if config is already applied
  useEffect(() => {
    const configApplied = localStorage.getItem('segmentConfigApplied') === 'true';
    const storedSegment = localStorage.getItem('segmentConfigType');
    
    if (configApplied && storedSegment === currentSegment) {
      setIsConfigApplied(true);
      
      // Load active modules
      try {
        const storedModules = localStorage.getItem('activeModules');
        if (storedModules) {
          setActiveModules(JSON.parse(storedModules));
        }
      } catch (e) {
        console.error("Error loading active modules:", e);
      }
    } else {
      setIsConfigApplied(false);
    }
  }, [currentSegment]);

  // Function to apply segment configuration
  const applySegmentConfig = () => {
    try {
      const config = getModuleConfig();
      
      // Save active modules based on configuration
      const enabledModules = config.modules
        .filter(module => module.enabled)
        .map(module => module.path);
        
      localStorage.setItem('activeModules', JSON.stringify(enabledModules));
      setActiveModules(enabledModules);
      
      // Save config to localStorage
      localStorage.setItem('moduleConfig', JSON.stringify(config));
      localStorage.setItem('segmentConfigApplied', 'true');
      localStorage.setItem('segmentConfigType', currentSegment);
      
      // Set active modules based on configuration
      applyModuleConfiguration(config);
      
      setIsConfigApplied(true);
      
      toast({
        title: "Configuração aplicada",
        description: "As configurações do segmento foram aplicadas com sucesso.",
        variant: "success"
      });
      
      return true;
    } catch (error) {
      console.error("Error applying segment config:", error);
      
      toast({
        title: "Erro ao aplicar configuração",
        description: "Ocorreu um erro ao aplicar as configurações do segmento.",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  // Internal function to apply module configuration
  const applyModuleConfiguration = (config: SegmentModuleConfig) => {
    // Save dashboard configuration
    if (config.dashboardConfig) {
      localStorage.setItem('dashboardWidgets', JSON.stringify(config.dashboardConfig.widgets));
      localStorage.setItem('dashboardLayout', config.dashboardConfig.defaultLayout);
    }
    
    // Save user roles and permissions
    if (config.userRoles) {
      localStorage.setItem('availableRoles', JSON.stringify(config.userRoles));
    }
    
    if (config.defaultPermissions) {
      localStorage.setItem('defaultPermissions', JSON.stringify(config.defaultPermissions));
    }
  };

  // Check if a specific module is active
  const isModuleActive = (modulePath: string) => {
    return activeModules.includes(modulePath);
  };

  return {
    isConfigApplied,
    applySegmentConfig,
    isModuleActive,
    activeModules
  };
};

export default useSegmentConfig;
