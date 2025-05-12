
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  BusinessSegmentType, 
  SegmentContextType, 
  SegmentModuleConfig, 
  SegmentVisualPreferences 
} from '@/types/segment-types';
import { moduleConfigBySegment, segmentNames, visualPreferencesBySegment } from '@/data/segments-config';

const SegmentContext = createContext<SegmentContextType | undefined>(undefined);

export const SegmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [currentSegment, setCurrentSegment] = useState<BusinessSegmentType>('generic');

  // Initialize from localStorage on component mount
  useEffect(() => {
    const savedSegment = localStorage.getItem('segment') as BusinessSegmentType;
    if (savedSegment && visualPreferencesBySegment[savedSegment]) {
      setCurrentSegment(savedSegment);
      
      // Apply the visual preferences when loading the app
      setTimeout(() => {
        const prefs = visualPreferencesBySegment[savedSegment];
        applyVisualPreferences(prefs);
      }, 100);
    }
  }, []);

  // Apply visual preferences function
  const applyVisualPreferences = (preferences: SegmentVisualPreferences) => {
    // Apply colors to CSS variables
    document.documentElement.style.setProperty('--primary-color', preferences.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', preferences.secondaryColor);
    
    // Apply to Tailwind variables
    document.documentElement.style.setProperty('--primary', `hsl(${hexToHSL(preferences.primaryColor).h} ${hexToHSL(preferences.primaryColor).s}% ${hexToHSL(preferences.primaryColor).l}%)`);
    document.documentElement.style.setProperty('--secondary', `hsl(${hexToHSL(preferences.secondaryColor).h} ${hexToHSL(preferences.secondaryColor).s}% ${hexToHSL(preferences.secondaryColor).l}%)`);
    
    // Apply typography
    const rootElement = document.documentElement;
    rootElement.classList.remove('font-serif', 'font-sans', 'font-handwritten');
    
    if (preferences.typography === 'serif') {
      rootElement.classList.add('font-serif');
    } else if (preferences.typography === 'handwritten') {
      rootElement.classList.add('font-handwritten');
    } else {
      rootElement.classList.add('font-sans');
    }

    // Save color preferences to localStorage for other components
    localStorage.setItem('primaryColor', preferences.primaryColor);
    localStorage.setItem('secondaryColor', preferences.secondaryColor);
  };

  // Helper function to convert hex to HSL
  const hexToHSL = (hex: string) => {
    // Remove the # from the beginning
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    // Find max and min values to calculate the lightness
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    // Calculate hue and saturation
    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else if (max === b) h = (r - g) / d + 4;
      h *= 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // Get current segment visual preferences
  const getVisualPreferences = (): SegmentVisualPreferences => {
    return visualPreferencesBySegment[currentSegment];
  };

  // Get current segment module configuration
  const getModuleConfig = (): SegmentModuleConfig => {
    return moduleConfigBySegment[currentSegment];
  };

  // Update segment and save to localStorage
  const updateSegment = (segment: BusinessSegmentType) => {
    setCurrentSegment(segment);
    localStorage.setItem('segment', segment);
    
    // Apply the visual preferences immediately
    const prefs = visualPreferencesBySegment[segment];
    applyVisualPreferences(prefs);
    
    toast({
      title: "Segmento atualizado",
      description: `Sua empresa agora está configurada como: ${segmentNames[segment]}`,
    });
  };

  // Apply visual preferences to the app
  const applySegmentVisuals = () => {
    const preferences = getVisualPreferences();
    applyVisualPreferences(preferences);
    
    toast({
      title: "Estilo visual atualizado",
      description: `Estilo visual para ${segmentNames[currentSegment]} aplicado com sucesso`,
    });
  };

  // Apply module configuration for the current segment
  const applyModuleConfig = () => {
    // Busca configuração do segmento atual
    const config = getModuleConfig();
    
    // Salva no localStorage
    localStorage.setItem('moduleConfig', JSON.stringify(config));
    
    // Notifica o usuário
    toast({
      title: "Módulos configurados",
      description: `Estrutura de módulos para ${segmentNames[currentSegment]} configurada com sucesso`,
    });
  };

  return (
    <SegmentContext.Provider value={{ 
      currentSegment,
      setCurrentSegment: updateSegment,
      getVisualPreferences,
      applySegmentVisuals,
      getModuleConfig,
      applyModuleConfig,
      segmentName: segmentNames[currentSegment]
    }}>
      {children}
    </SegmentContext.Provider>
  );
};

export const useSegment = () => {
  const context = useContext(SegmentContext);
  if (context === undefined) {
    throw new Error('useSegment must be used within a SegmentProvider');
  }
  return context;
};

export { segmentNames, BusinessSegmentType };
