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

// Define segment activities
export interface SegmentActivity {
  title: string;
  path: string;
  icon: string; // Icon name from lucide-react
  description?: string;
}

interface SegmentContextType {
  currentSegment: BusinessSegmentType;
  setCurrentSegment: (segment: BusinessSegmentType) => void;
  getVisualPreferences: () => SegmentVisualPreferences;
  applySegmentVisuals: () => void;
  segmentName: string;
  segmentActivities: SegmentActivity[];
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

// Segment-specific activities
const segmentActivitiesByType: Record<BusinessSegmentType, SegmentActivity[]> = {
  manufacturing: [
    { title: "Gestão de Estoque", path: "/segment/inventory", icon: "package" },
    { title: "Ordens de Produção", path: "/segment/production-orders", icon: "list-ordered" },
    { title: "Compras e Suprimentos", path: "/segment/supplies", icon: "shopping-cart" },
    { title: "Manutenção de Equipamentos", path: "/segment/equipment", icon: "wrench" },
    { title: "Logística e Expedição", path: "/segment/logistics", icon: "truck" },
    { title: "Relatórios de Produção", path: "/segment/production-reports", icon: "file-text" }
  ],
  education: [
    { title: "Matrículas e Alunos", path: "/segment/students", icon: "user-plus" },
    { title: "Disciplinas e Turmas", path: "/segment/courses", icon: "book" },
    { title: "Professores e Diário", path: "/segment/teachers", icon: "user-check" },
    { title: "Notas e Avaliações", path: "/segment/grades", icon: "edit" },
    { title: "Emissão de Certificados", path: "/segment/certificates", icon: "award" },
    { title: "Calendário Escolar", path: "/segment/school-calendar", icon: "calendar" }
  ],
  legal: [
    { title: "Gestão de Processos", path: "/segment/cases", icon: "folder-open" },
    { title: "Prazos e Audiências", path: "/segment/hearings", icon: "calendar-clock" },
    { title: "Documentos Jurídicos", path: "/segment/legal-documents", icon: "file-text" },
    { title: "Clientes e Contratos", path: "/segment/legal-clients", icon: "users" },
    { title: "Agenda Jurídica", path: "/segment/legal-calendar", icon: "calendar" },
    { title: "Relatórios por Advogado", path: "/segment/lawyer-reports", icon: "chart-bar" }
  ],
  tech: [
    { title: "Gestão de Projetos", path: "/segment/projects", icon: "kanban" },
    { title: "Chamados e Suporte", path: "/segment/support-tickets", icon: "headphones" },
    { title: "Testes e Versionamento", path: "/segment/testing", icon: "git-branch" },
    { title: "Base de Conhecimento", path: "/segment/knowledge", icon: "book" },
    { title: "Configurações Técnicas", path: "/segment/tech-config", icon: "settings" },
    { title: "Indicadores de Dev", path: "/segment/dev-metrics", icon: "chart-line" }
  ],
  services: [
    { title: "Ordens de Serviço", path: "/segment/service-orders", icon: "clipboard-list" },
    { title: "Agendamentos", path: "/segment/service-appointments", icon: "calendar-check" },
    { title: "Contratos e SLA", path: "/segment/sla", icon: "file-contract" },
    { title: "Atendimento ao Cliente", path: "/segment/customer-support", icon: "message-square" },
    { title: "Orçamentos e Propostas", path: "/segment/proposals", icon: "file-text" },
    { title: "Equipe de Campo", path: "/segment/field-team", icon: "users" }
  ],
  fashion: [
    { title: "Gestão de Coleções", path: "/segment/collections", icon: "layout-grid" },
    { title: "Estoque (tamanho/cor)", path: "/segment/fashion-inventory", icon: "grid-2x2" },
    { title: "Vendas Online", path: "/segment/fashion-sales", icon: "shopping-cart" },
    { title: "Produtos com Imagens", path: "/segment/product-images", icon: "image" },
    { title: "Trocas e Devoluções", path: "/segment/returns", icon: "repeat" },
    { title: "Relatórios de Moda", path: "/segment/fashion-reports", icon: "chart-bar" }
  ],
  health: [
    { title: "Cadastro de Pacientes", path: "/segment/patients", icon: "user-plus" },
    { title: "Agendamento Consultas", path: "/segment/appointments", icon: "calendar-check" },
    { title: "Gestão Hospital/Leitos", path: "/segment/hospital", icon: "bed" },
    { title: "Controle de Medicamentos", path: "/segment/medications", icon: "pill" },
    { title: "Faturamento Convênios", path: "/segment/health-billing", icon: "file-invoice" },
    { title: "Prontuário Eletrônico", path: "/segment/medical-records", icon: "clipboard-list" }
  ],
  ecommerce: [
    { title: "Cadastro de Produtos", path: "/segment/products", icon: "package" },
    { title: "Carrinho e Checkout", path: "/segment/checkout", icon: "shopping-cart" },
    { title: "Gestão Vendas Online", path: "/segment/online-sales", icon: "dollar-sign" },
    { title: "Integração Pagamentos", path: "/segment/payments", icon: "credit-card" },
    { title: "Logística e Entregas", path: "/segment/ecommerce-logistics", icon: "truck" },
    { title: "Marketing e Campanhas", path: "/segment/marketing", icon: "megaphone" }
  ],
  agro: [
    { title: "Talhões e Safras", path: "/segment/crops", icon: "map" },
    { title: "Controle de Insumos", path: "/segment/farm-supplies", icon: "package" },
    { title: "Produtividade por Área", path: "/segment/productivity", icon: "chart-bar" },
    { title: "Calendário Agrícola", path: "/segment/farm-calendar", icon: "calendar" },
    { title: "Integração Sensores/IoT", path: "/segment/farm-iot", icon: "wifi" },
    { title: "Comercialização", path: "/segment/farm-sales", icon: "dollar-sign" }
  ],
  generic: [
    { title: "Clientes e Fornecedores", path: "/segment/clients-suppliers", icon: "users" },
    { title: "Emissão de Notas Fiscais", path: "/segment/invoices", icon: "file-text" },
    { title: "Financeiro", path: "/segment/financial", icon: "dollar-sign" }
  ]
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

  return (
    <SegmentContext.Provider value={{ 
      currentSegment,
      setCurrentSegment: updateSegment,
      getVisualPreferences,
      applySegmentVisuals,
      segmentName: segmentNames[currentSegment],
      segmentActivities: segmentActivitiesByType[currentSegment] || []
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
