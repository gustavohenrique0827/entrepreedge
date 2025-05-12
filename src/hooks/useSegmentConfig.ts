
import { useState, useEffect } from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { moduleConfigBySegment } from '@/data/segments-config';
import { useToast } from './use-toast';
import { SegmentModuleConfig } from '@/types/segment-types';

/**
 * Hook para aplicar e gerenciar automaticamente as configurações específicas do segmento
 */
export const useSegmentConfig = () => {
  const { currentSegment, segmentName } = useSegment();
  const { toast } = useToast();
  const [isConfigApplied, setIsConfigApplied] = useState(false);
  const [activeModules, setActiveModules] = useState<string[]>([]);

  // Obter a configuração atual do segmento
  const currentConfig: SegmentModuleConfig = moduleConfigBySegment[currentSegment] || moduleConfigBySegment.generic;

  // Aplicar a configuração do segmento automaticamente
  const applySegmentConfig = () => {
    try {
      // 1. Armazenar módulos ativos no localStorage
      const enabledModules = currentConfig.modules
        .filter(module => module.enabled)
        .map(module => module.path);
        
      localStorage.setItem('activeModules', JSON.stringify(enabledModules));
      setActiveModules(enabledModules);
      
      // 2. Armazenar configuração de dashboard
      localStorage.setItem('dashboardConfig', JSON.stringify(currentConfig.dashboardConfig));
      
      // 3. Armazenar permissões e papéis
      localStorage.setItem('userRoles', JSON.stringify(currentConfig.userRoles));
      localStorage.setItem('defaultPermissions', JSON.stringify(currentConfig.defaultPermissions));
      
      // 4. Definir flag para indicar que a configuração foi aplicada
      localStorage.setItem('segmentConfigApplied', 'true');
      localStorage.setItem('segmentConfigType', currentSegment);
      
      setIsConfigApplied(true);
      
      // 5. Notificar o usuário
      toast({
        title: "Configuração aplicada",
        description: `Configuração para segmento ${segmentName} aplicada com sucesso`,
        variant: "success",
      });
      
      return true;
    } catch (error) {
      console.error("Erro ao aplicar configuração do segmento:", error);
      
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao aplicar a configuração do segmento",
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Verificar se é necessário aplicar a configuração
  useEffect(() => {
    const segmentConfigApplied = localStorage.getItem('segmentConfigApplied') === 'true';
    const segmentConfigType = localStorage.getItem('segmentConfigType');
    
    // Se não existir configuração aplicada ou se o segmento mudou, aplica automaticamente
    if (!segmentConfigApplied || segmentConfigType !== currentSegment) {
      applySegmentConfig();
    } else {
      setIsConfigApplied(true);
      
      // Carregar módulos ativos do localStorage
      try {
        const storedModules = localStorage.getItem('activeModules');
        if (storedModules) {
          setActiveModules(JSON.parse(storedModules));
        }
      } catch (e) {
        console.error("Erro ao carregar módulos ativos:", e);
      }
    }
  }, [currentSegment]);

  // Verificar se um módulo específico está ativo
  const isModuleActive = (modulePath: string) => {
    return activeModules.includes(modulePath);
  };

  return {
    currentConfig,
    applySegmentConfig,
    isConfigApplied,
    isModuleActive,
    activeModules,
  };
};

export default useSegmentConfig;
