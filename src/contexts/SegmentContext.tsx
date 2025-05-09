
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

// Define the shape of the segment context
interface SegmentContextType {
  currentSegment: BusinessSegmentType | null;
  setCurrentSegment: (segment: BusinessSegmentType) => void;
  segmentName: string;
  segmentColor: string;
  modulesForSegment: (segment: BusinessSegmentType) => string[];
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

  return (
    <SegmentContext.Provider
      value={{
        currentSegment,
        setCurrentSegment,
        segmentName: getSegmentName(currentSegment),
        segmentColor: getSegmentColor(currentSegment),
        modulesForSegment
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
