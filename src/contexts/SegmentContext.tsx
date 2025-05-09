import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from './SupabaseContext';

// Define segment types with all needed options
export type BusinessSegmentType = 'generic' | 'sales' | 'financial' | 'health' | 'education' | 
  'ecommerce' | 'industrial' | 'agro' | 'fashion' | 'services' | 'tech' | 'legal' | 'manufacturing';

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
  modulesForSegment: (segment: BusinessSegmentType) => string[];
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
  sales: {
    primaryColor: '#f97316', // Orange
    secondaryColor: '#3B82F6', // Blue
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['products', 'sales', 'dashboard']
  },
  financial: {
    primaryColor: '#3B82F6', // Blue
    secondaryColor: '#10B981', // Green
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['transactions', 'reports', 'categories']
  },
  health: {
    primaryColor: '#00A3C4', // Teal
    secondaryColor: '#00875A', // Green
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['patients', 'appointments', 'exams']
  },
  education: {
    primaryColor: '#6554C0', // Purple
    secondaryColor: '#00B8D9', // Blue
    typography: 'serif',
    iconStyle: 'outlined',
    layoutPriorities: ['courses', 'students', 'certificates']
  },
  ecommerce: {
    primaryColor: '#f97316', // Orange
    secondaryColor: '#6554C0', // Purple
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['products', 'orders', 'customers']
  },
  industrial: {
    primaryColor: '#505F79', // Steel blue
    secondaryColor: '#0052CC', // Blue
    typography: 'sans-serif',
    iconStyle: 'filled',
    layoutPriorities: ['production', 'maintenance', 'machines']
  },
  // Add the additional segments
  agro: {
    primaryColor: '#15803d', // Green
    secondaryColor: '#eab308', // Yellow
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['crops', 'livestock', 'machinery']
  },
  fashion: {
    primaryColor: '#db2777', // Pink
    secondaryColor: '#6366f1', // Indigo
    typography: 'serif',
    iconStyle: 'filled',
    layoutPriorities: ['collections', 'inventory', 'sales']
  },
  services: {
    primaryColor: '#4f46e5', // Indigo
    secondaryColor: '#0ea5e9', // Sky
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['appointments', 'clients', 'schedule']
  },
  tech: {
    primaryColor: '#2563eb', // Blue
    secondaryColor: '#10b981', // Emerald
    typography: 'sans-serif',
    iconStyle: 'outlined',
    layoutPriorities: ['projects', 'clients', 'resources']
  },
  legal: {
    primaryColor: '#0f172a', // Slate
    secondaryColor: '#b91c1c', // Red
    typography: 'serif',
    iconStyle: 'outlined',
    layoutPriorities: ['cases', 'clients', 'calendar']
  },
  manufacturing: {
    primaryColor: '#475569', // Slate
    secondaryColor: '#f97316', // Orange
    typography: 'sans-serif',
    iconStyle: 'filled',
    layoutPriorities: ['production', 'inventory', 'quality']
  }
};

// Segment display names
const segmentNames: Record<BusinessSegmentType, string> = {
  generic: 'Genérico',
  sales: 'Vendas',
  financial: 'Financeiro',
  health: 'Saúde',
  education: 'Educação',
  ecommerce: 'E-commerce',
  industrial: 'Industrial',
  // Add names for the new segments
  agro: 'Agronegócio',
  fashion: 'Moda',
  services: 'Serviços',
  tech: 'Tecnologia',
  legal: 'Jurídico',
  manufacturing: 'Manufatura'
};

// Modules available for each segment
const modulesBySegment: Record<BusinessSegmentType, string[]> = {
  generic: ['dashboard', 'finances', 'goals'],
  sales: ['products', 'inventory', 'transactions', 'reports'],
  financial: ['accounts', 'transactions', 'categories', 'reports', 'exports'],
  health: ['patients', 'appointments', 'exams', 'reports', 'prescriptions'],
  education: ['students', 'courses', 'enrollments', 'certificates', 'grades'],
  ecommerce: ['products', 'customers', 'orders', 'payments', 'shipping'],
  industrial: ['machines', 'production-orders', 'maintenance', 'quality-control'],
  // Add modules for the new segments
  agro: ['crops', 'livestock', 'machinery', 'weather', 'soil'],
  fashion: ['collections', 'inventory', 'trends', 'suppliers', 'marketing'],
  services: ['appointments', 'clients', 'scheduling', 'billing', 'feedback'],
  tech: ['projects', 'clients', 'resources', 'development', 'support'],
  legal: ['cases', 'clients', 'documents', 'calendar', 'billing'],
  manufacturing: ['production', 'inventory', 'quality', 'maintenance', 'shipping']
};

const SegmentContext = createContext<SegmentContextType | undefined>(undefined);

export const SegmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { switchSegment, allSegments } = useSupabase();
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

  // Get modules for a segment
  const modulesForSegment = (segment: BusinessSegmentType): string[] => {
    return modulesBySegment[segment] || [];
  };

  // Update segment and save to localStorage
  const updateSegment = async (segment: BusinessSegmentType) => {
    setCurrentSegment(segment);
    localStorage.setItem('segment', segment);
    
    // Apply the visual preferences immediately
    const prefs = visualPreferencesBySegment[segment];
    applyVisualPreferences(prefs);
    
    // Try to switch to the corresponding Supabase client
    await switchSegment(segment);
    
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

  return (
    <SegmentContext.Provider value={{ 
      currentSegment,
      setCurrentSegment: updateSegment,
      getVisualPreferences,
      applySegmentVisuals,
      segmentName: segmentNames[currentSegment],
      modulesForSegment
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
