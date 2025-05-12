
// Definição dos tipos para segmentos de negócios
export type BusinessSegmentType = 
  | 'generic' 
  | 'agro' 
  | 'ecommerce' 
  | 'health' 
  | 'fashion' 
  | 'services' 
  | 'tech' 
  | 'legal' 
  | 'education' 
  | 'manufacturing';

// Tipos para prioridades de layout e estilos
export interface SegmentVisualPreferences {
  primaryColor: string;
  secondaryColor: string;
  typography: 'serif' | 'sans-serif' | 'handwritten';
  iconStyle: 'outlined' | 'filled' | 'duotone';
  layoutPriorities: string[];
}

// Definição das estruturas de módulos disponíveis por segmento
export interface ModuleStructure {
  name: string;
  path: string;
  icon: string;
  description: string;
  submodules: SubModule[];
  enabled: boolean;
  order: number;
}

export interface SubModule {
  name: string;
  path: string;
  icon: string;
  description: string;
  enabled: boolean;
}

export interface SegmentModuleConfig {
  modules: ModuleStructure[];
  dashboardConfig: {
    widgets: string[];
    defaultLayout: string;
  };
  userRoles: string[];
  defaultPermissions: Record<string, string[]>;
}

export interface SegmentContextType {
  currentSegment: BusinessSegmentType;
  segmentName: string;
  setCurrentSegment: (segment: BusinessSegmentType) => void;
  getVisualPreferences: () => SegmentVisualPreferences;
  applySegmentVisuals: () => void;
  getModuleConfig: () => SegmentModuleConfig;
  applyModuleConfig: () => void;
}
