
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define business segment types
export type BusinessSegmentType = 
  | 'generic' 
  | 'sales' 
  | 'financial' 
  | 'health'
  | 'education'
  | 'ecommerce'
  | 'industrial'
  | 'agro'
  | 'fashion'
  | 'services'
  | 'tech'
  | 'legal'
  | 'manufacturing';

// Define directory mappings for segments
export type SegmentDirectoryMapping = {
  [key in BusinessSegmentType]?: string;
};

// Define the shape of the segment context
interface SegmentContextType {
  currentSegment: BusinessSegmentType | null;
  setCurrentSegment: (segment: BusinessSegmentType) => void;
  segmentName: string;
  segmentColor: string;
  modulesForSegment: (segment: BusinessSegmentType) => string[];
  getVisualPreferences: () => { primaryColor: string; secondaryColor: string; };
  applySegmentVisuals: () => void;
  getDirectoryPath: () => string | null;
  isGlobalPage: (path: string) => boolean;
}

// Create the context with a default value
const SegmentContext = createContext<SegmentContextType | undefined>(undefined);

// Segment provider component
export const SegmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial segment from localStorage or default to null
  const initialSegment = localStorage.getItem('segment') as BusinessSegmentType | null;
  const [currentSegment, setCurrentSegment] = useState<BusinessSegmentType | null>(initialSegment);

  // Update localStorage when segment changes
  useEffect(() => {
    if (currentSegment) {
      localStorage.setItem('segment', currentSegment);
    }
  }, [currentSegment]);

  // Get segment name based on segment id
  const getSegmentName = (segment: BusinessSegmentType | null): string => {
    if (!segment) return 'Genérico';
    
    const segmentNames: Record<BusinessSegmentType, string> = {
      generic: 'Sistema Genérico',
      sales: 'Sistema de Vendas',
      financial: 'Sistema Financeiro',
      health: 'Sistema para Saúde',
      education: 'Sistema Educacional',
      ecommerce: 'Sistema de E-commerce',
      industrial: 'Sistema Industrial',
      agro: 'Sistema de Agronegócio',
      fashion: 'Sistema de Moda',
      services: 'Sistema de Serviços',
      tech: 'Sistema de Tecnologia',
      legal: 'Sistema Jurídico',
      manufacturing: 'Sistema de Manufatura'
    };
    
    return segmentNames[segment] || 'Sistema Genérico';
  };
  
  // Get segment color based on segment id
  const getSegmentColor = (segment: BusinessSegmentType | null): string => {
    if (!segment) return 'blue';
    
    const segmentColors: Record<BusinessSegmentType, string> = {
      generic: 'blue',
      sales: 'orange',
      financial: 'sky', 
      health: 'teal',
      education: 'purple',
      ecommerce: 'amber',
      industrial: 'slate',
      agro: 'green',
      fashion: 'pink',
      services: 'indigo',
      tech: 'blue',
      legal: 'gray',
      manufacturing: 'stone'
    };
    
    return segmentColors[segment] || 'blue';
  };
  
  // Get modules for a specific segment
  const modulesForSegment = (segment: BusinessSegmentType): string[] => {
    if (!segment) return [];
    
    const modules: Record<BusinessSegmentType, string[]> = {
      generic: ['dashboard', 'finances', 'accounting'],
      
      sales: ['dashboard', 'products', 'inventory', 'customers', 'transactions', 'reports', 'accounting'],
      
      financial: ['dashboard', 'accounts', 'categories', 'transactions', 'reports', 'exports', 'accounting'],
      
      health: ['dashboard', 'patients', 'appointments', 'exams', 'prescriptions', 'accounting'],
      
      education: ['dashboard', 'students', 'courses', 'enrollments', 'certificates', 'grades', 'accounting'],
      
      ecommerce: ['dashboard', 'products', 'customers', 'orders', 'payments', 'shipping', 'accounting'],
      
      industrial: ['dashboard', 'machines', 'production-orders', 'maintenance', 'quality-control', 'accounting'],
      
      agro: ['dashboard', 'crops', 'livestock', 'machinery', 'weather', 'soil', 'accounting'],
      
      fashion: ['dashboard', 'collections', 'products', 'inventory', 'trends', 'suppliers', 'accounting'],
      
      services: ['dashboard', 'clients', 'scheduling', 'billing', 'feedback', 'accounting'],
      
      tech: ['dashboard', 'projects', 'clients', 'resources', 'development', 'support', 'accounting'],
      
      legal: ['dashboard', 'clients', 'cases', 'documents', 'billing', 'accounting'],
      
      manufacturing: ['dashboard', 'production', 'inventory', 'machinery', 'quality', 'accounting']
    };
    
    return modules[segment] || [];
  };

  // Directory mappings for each segment
  const directoryMappings: SegmentDirectoryMapping = {
    generic: 'generic',
    sales: 'vendas',
    financial: 'financial',
    health: 'saude',
    education: 'educacao',
    ecommerce: 'ecommerce',
    industrial: 'industrial',
    agro: 'agro',
    fashion: 'fashion',
    services: 'servicos',
    tech: 'tech',
    legal: 'legal',
    manufacturing: 'manufacturing',
  };
  
  // Global pages that are available across all segments
  const globalPages = [
    '/',
    '/dashboard',
    '/finances',
    '/goals',
    '/learn',
    '/profile',
    '/settings',
    '/help',
    '/contact',
    '/calendar',
    '/benchmarking',
    '/simulator',
    '/inspiration',
    '/esg',
    '/accounting'
  ];

  // Get directory path for the current segment
  const getDirectoryPath = (): string | null => {
    if (!currentSegment) return null;
    return directoryMappings[currentSegment] || null;
  };

  // Check if a path is a global page
  const isGlobalPage = (path: string): boolean => {
    return globalPages.some(page => path === page || path.startsWith(`${page}/`));
  };

  // Get visual preferences for theming
  const getVisualPreferences = () => {
    const segment = currentSegment || 'generic';
    
    // Define color schemes for each segment
    const colorSchemes: Record<BusinessSegmentType, { primaryColor: string; secondaryColor: string }> = {
      generic: { primaryColor: '#3B82F6', secondaryColor: '#8B5CF6' },
      sales: { primaryColor: '#F97316', secondaryColor: '#EA580C' },
      financial: { primaryColor: '#0EA5E9', secondaryColor: '#0284C7' },
      health: { primaryColor: '#14B8A6', secondaryColor: '#0D9488' },
      education: { primaryColor: '#A855F7', secondaryColor: '#9333EA' },
      ecommerce: { primaryColor: '#F59E0B', secondaryColor: '#D97706' },
      industrial: { primaryColor: '#64748B', secondaryColor: '#475569' },
      agro: { primaryColor: '#22C55E', secondaryColor: '#16A34A' },
      fashion: { primaryColor: '#EC4899', secondaryColor: '#DB2777' },
      services: { primaryColor: '#6366F1', secondaryColor: '#4F46E5' },
      tech: { primaryColor: '#3B82F6', secondaryColor: '#2563EB' },
      legal: { primaryColor: '#71717A', secondaryColor: '#52525B' },
      manufacturing: { primaryColor: '#78716C', secondaryColor: '#57534E' }
    };
    
    return colorSchemes[segment];
  };
  
  const applySegmentVisuals = () => {
    const prefs = getVisualPreferences();
    
    // Apply theme colors to CSS variables
    document.documentElement.style.setProperty('--color-primary', prefs.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', prefs.secondaryColor);
    
    return prefs;
  };

  return (
    <SegmentContext.Provider
      value={{
        currentSegment,
        setCurrentSegment,
        segmentName: getSegmentName(currentSegment),
        segmentColor: getSegmentColor(currentSegment),
        modulesForSegment,
        getVisualPreferences,
        applySegmentVisuals,
        getDirectoryPath,
        isGlobalPage
      }}
    >
      {children}
    </SegmentContext.Provider>
  );
};

// Custom hook to use segment context
export const useSegment = () => {
  const context = useContext(SegmentContext);
  if (context === undefined) {
    throw new Error('useSegment must be used within a SegmentProvider');
  }
  return context;
};
