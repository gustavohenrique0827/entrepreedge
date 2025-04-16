
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define segment types
export type BusinessSegmentType = 'generic' | 'agro' | 'ecommerce' | 'health' | 'fashion' | 'services' | 'tech' | 'legal' | 'education' | 'manufacturing';

// Visual preferences for each segment
export interface SegmentVisualPreferences {
  primaryColor: string;
  secondaryColor: string;
  typography: 'serif' | 'sans-serif' | 'handwritten';
  iconStyle: 'outlined' | 'filled' | 'duotone';
  layoutPriorities: string[];
}

interface SegmentContextType {
  currentSegment: BusinessSegmentType;
  setCurrentSegment: (segment: BusinessSegmentType) => void;
  getVisualPreferences: () => SegmentVisualPreferences;
  applySegmentVisuals: () => void;
  segmentName: string;
}

// Default visual preferences for each segment
const visualPreferencesBySegment: Record<BusinessSegmentType, SegmentVisualPreferences> = {
  generic: {
    primaryColor: '#8B5CF6', // Purple
    secondaryColor: '#D946EF', // Pink
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['dashboard', 'finances', 'goals']
  },
  agro: {
    primaryColor: '#84cc16', // Earth green
    secondaryColor: '#ca8a04', // Wheat/Earth brown
    typography: 'serif',
    iconStyle: 'filled',
    layoutPriorities: ['production', 'weather', 'finances']
  },
  ecommerce: {
    primaryColor: '#f97316', // Orange
    secondaryColor: '#6554C0', // Purple
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['products', 'sales', 'marketing']
  },
  health: {
    primaryColor: '#00A3C4', // Teal
    secondaryColor: '#00875A', // Green
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['patients', 'appointments', 'finances']
  },
  fashion: {
    primaryColor: '#EC4899', // Pink
    secondaryColor: '#8B5CF6', // Purple
    typography: 'handwritten',
    iconStyle: 'duotone',
    layoutPriorities: ['collections', 'sales', 'trends']
  },
  services: {
    primaryColor: '#3B82F6', // Blue
    secondaryColor: '#10B981', // Green
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['clients', 'projects', 'invoices']
  },
  tech: {
    primaryColor: '#6366F1', // Indigo
    secondaryColor: '#14B8A6', // Teal
    typography: 'sans-serif',
    iconStyle: 'duotone',
    layoutPriorities: ['projects', 'development', 'clients']
  },
  legal: {
    primaryColor: '#0F172A', // Dark navy
    secondaryColor: '#475569', // Slate
    typography: 'serif',
    iconStyle: 'filled',
    layoutPriorities: ['cases', 'documents', 'clients']
  },
  education: {
    primaryColor: '#6554C0', // Purple
    secondaryColor: '#00B8D9', // Blue
    typography: 'serif',
    iconStyle: 'outlined',
    layoutPriorities: ['courses', 'students', 'schedule']
  },
  manufacturing: {
    primaryColor: '#505F79', // Steel blue
    secondaryColor: '#0052CC', // Blue
    typography: 'sans-serif',
    iconStyle: 'filled',
    layoutPriorities: ['production', 'inventory', 'orders']
  }
};

// Segment display names
const segmentNames: Record<BusinessSegmentType, string> = {
  generic: 'Genérico',
  agro: 'Agronegócio',
  ecommerce: 'E-Commerce',
  health: 'Saúde',
  fashion: 'Moda',
  services: 'Serviços',
  tech: 'Tecnologia',
  legal: 'Jurídico',
  education: 'Educação',
  manufacturing: 'Indústria'
};

const SegmentContext = createContext<SegmentContextType | undefined>(undefined);

export const SegmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [currentSegment, setCurrentSegment] = useState<BusinessSegmentType>('generic');

  // Initialize from localStorage on component mount
  useEffect(() => {
    const savedSegment = localStorage.getItem('segment') as BusinessSegmentType;
    if (savedSegment && visualPreferencesBySegment[savedSegment]) {
      setCurrentSegment(savedSegment);
    }
  }, []);

  // Get current segment visual preferences
  const getVisualPreferences = (): SegmentVisualPreferences => {
    return visualPreferencesBySegment[currentSegment];
  };

  // Update segment and save to localStorage
  const updateSegment = (segment: BusinessSegmentType) => {
    setCurrentSegment(segment);
    localStorage.setItem('segment', segment);
    
    toast({
      title: "Segmento atualizado",
      description: `Sua empresa agora está configurada como: ${segmentNames[segment]}`,
    });
  };

  // Apply visual preferences to the app
  const applySegmentVisuals = () => {
    const preferences = getVisualPreferences();
    
    // Apply colors
    document.documentElement.style.setProperty('--primary-color', preferences.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', preferences.secondaryColor);
    
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
    
    toast({
      title: "Estilo visual atualizado",
      description: `Estilo visual para ${segmentNames[currentSegment]} aplicado com sucesso`,
    });
  };

  return (
    <SegmentContext.Provider value={{ 
      currentSegment,
      setCurrentSegment: updateSegment,
      getVisualPreferences,
      applySegmentVisuals,
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
