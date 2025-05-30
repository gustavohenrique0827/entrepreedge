
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
    { title: "Gestão de Estoque", path: "/segment/inventory", icon: "Package", description: "Controle seu estoque de matérias-primas, produtos em processo e produtos acabados." },
    { title: "Ordens de Produção", path: "/segment/production-orders", icon: "ClipboardList", description: "Crie e gerencie ordens de produção para acompanhar o fluxo de fabricação." },
    { title: "Compras e Suprimentos", path: "/segment/supplies", icon: "ShoppingCart", description: "Gerencie fornecedores, cotações e pedidos de compra de materiais." },
    { title: "Manutenção de Equipamentos", path: "/segment/equipment", icon: "Wrench", description: "Controle a manutenção preventiva e corretiva de seus equipamentos e máquinas." },
    { title: "Logística e Expedição", path: "/segment/logistics", icon: "Truck", description: "Organize o processo de expedição, carga e entrega de seus produtos." },
    { title: "Relatórios de Produção", path: "/segment/production-reports", icon: "FileText", description: "Visualize relatórios detalhados sobre sua produção, rendimento e eficiência." }
  ],
  education: [
    { title: "Matrículas e Alunos", path: "/segment/students", icon: "UserPlus", description: "Cadastre e gerencie informações de alunos e processo de matrícula." },
    { title: "Disciplinas e Turmas", path: "/segment/courses", icon: "Book", description: "Organize disciplinas, turmas, horários e salas de aula." },
    { title: "Professores e Diário", path: "/segment/teachers", icon: "UserCheck", description: "Gerencie corpo docente, alocação de aulas e diário de classe." },
    { title: "Notas e Avaliações", path: "/segment/grades", icon: "Edit", description: "Registre notas, frequência e avaliações dos alunos." },
    { title: "Emissão de Certificados", path: "/segment/certificates", icon: "Award", description: "Emita e controle certificados, diplomas e históricos escolares." },
    { title: "Calendário Escolar", path: "/segment/school-calendar", icon: "Calendar", description: "Planeje o calendário letivo, eventos e datas importantes." }
  ],
  legal: [
    { title: "Gestão de Processos", path: "/segment/cases", icon: "FolderOpen", description: "Controle todos os seus processos judiciais e extrajudiciais." },
    { title: "Prazos e Audiências", path: "/segment/hearings", icon: "CalendarClock", description: "Acompanhe prazos processuais e agende audiências e compromissos." },
    { title: "Documentos Jurídicos", path: "/segment/legal-documents", icon: "FileText", description: "Elabore e armazene petições, contratos e outros documentos legais." },
    { title: "Clientes e Contratos", path: "/segment/legal-clients", icon: "Users", description: "Gerencie cadastro de clientes e contratos de honorários." },
    { title: "Agenda Jurídica", path: "/segment/legal-calendar", icon: "Calendar", description: "Organize sua agenda de compromissos legais e reuniões." },
    { title: "Relatórios por Advogado", path: "/segment/lawyer-reports", icon: "BarChart", description: "Visualize relatórios de produtividade e desempenho por advogado." }
  ],
  tech: [
    { title: "Gestão de Projetos", path: "/segment/projects", icon: "Kanban", description: "Gerencie projetos de tecnologia com metodologias ágeis." },
    { title: "Chamados e Suporte", path: "/segment/support-tickets", icon: "Headphones", description: "Atenda solicitações de suporte dos clientes e acompanhe status." },
    { title: "Testes e Versionamento", path: "/segment/testing", icon: "GitBranch", description: "Organize testes e controle versões de seu software." },
    { title: "Base de Conhecimento", path: "/segment/knowledge", icon: "Book", description: "Crie e consulte documentação técnica e soluções conhecidas." },
    { title: "Configurações Técnicas", path: "/segment/tech-config", icon: "Settings", description: "Gerencie ambientes, servidores e infraestrutura." },
    { title: "Indicadores de Dev", path: "/segment/dev-metrics", icon: "LineChart", description: "Acompanhe métricas de desenvolvimento e performance." }
  ],
  services: [
    { title: "Ordens de Serviço", path: "/segment/service-orders", icon: "ClipboardList", description: "Crie e acompanhe ordens de serviço dos clientes." },
    { title: "Agendamentos", path: "/segment/service-appointments", icon: "CalendarCheck", description: "Organize sua agenda de atendimentos e visitas técnicas." },
    { title: "Contratos e SLA", path: "/segment/sla", icon: "FileText", description: "Gerencie contratos de prestação de serviços e acordos de nível." },
    { title: "Atendimento ao Cliente", path: "/segment/customer-support", icon: "MessageSquare", description: "Registre e solucione solicitações de suporte dos clientes." },
    { title: "Orçamentos e Propostas", path: "/segment/proposals", icon: "FileText", description: "Elabore orçamentos e propostas comerciais para seus serviços." },
    { title: "Equipe de Campo", path: "/segment/field-team", icon: "Users", description: "Gerencie equipes externas e atendimentos in loco." }
  ],
  fashion: [
    { title: "Gestão de Coleções", path: "/segment/collections", icon: "Layers", description: "Organize suas coleções por temporada, tema e categoria." },
    { title: "Estoque (tamanho/cor)", path: "/segment/fashion-inventory", icon: "Grid", description: "Controle estoque específico de moda com variações de tamanho e cor." },
    { title: "Vendas Online", path: "/segment/fashion-sales", icon: "ShoppingCart", description: "Gerencie vendas de produtos de moda em sua loja virtual." },
    { title: "Produtos com Imagens", path: "/segment/product-images", icon: "Image", description: "Cadastre produtos com múltiplas imagens, ângulos e lookbooks." },
    { title: "Trocas e Devoluções", path: "/segment/returns", icon: "RefreshCw", description: "Gerencie processos de troca, devolução e ajustes de peças." },
    { title: "Relatórios de Moda", path: "/segment/fashion-reports", icon: "BarChart", description: "Obtenha insights sobre vendas por coleção, estilo e sazonalidade." }
  ],
  health: [
    { title: "Cadastro de Pacientes", path: "/segment/patients", icon: "UserPlus", description: "Registre informações completas dos pacientes e histórico médico." },
    { title: "Agendamento Consultas", path: "/segment/appointments", icon: "CalendarCheck", description: "Gerencie agenda de consultas, exames e procedimentos." },
    { title: "Gestão Hospital/Leitos", path: "/segment/hospital", icon: "Bed", description: "Controle de ocupação de leitos e gestão hospitalar." },
    { title: "Controle de Medicamentos", path: "/segment/medications", icon: "Package", description: "Gerencie o estoque e dispensação de medicamentos." },
    { title: "Faturamento Convênios", path: "/segment/health-billing", icon: "FileText", description: "Organize faturamento de convênios médicos e particulares." },
    { title: "Prontuário Eletrônico", path: "/segment/medical-records", icon: "ClipboardList", description: "Registre prontuários médicos eletrônicos completos." }
  ],
  ecommerce: [
    { title: "Cadastro de Produtos", path: "/segment/products", icon: "Package", description: "Cadastre e gerencie seu catálogo de produtos para venda online." },
    { title: "Estoque de Produtos", path: "/segment/ecommerce-inventory", icon: "PackageCheck", description: "Controle seu estoque com alertas de baixo estoque e rastreamento." },
    { title: "Carrinho e Checkout", path: "/segment/checkout", icon: "ShoppingCart", description: "Configure seu processo de compra, pagamento e finalização de pedidos." },
    { title: "Gestão Vendas Online", path: "/segment/online-sales", icon: "DollarSign", description: "Acompanhe vendas, status de pedidos e entregas." },
    { title: "Integração Pagamentos", path: "/segment/payments", icon: "CreditCard", description: "Configure métodos de pagamento e acompanhe transações." },
    { title: "Logística e Entregas", path: "/segment/ecommerce-logistics", icon: "Truck", description: "Gerencie expedição, entregas e transportadoras." },
    { title: "Marketing e Campanhas", path: "/segment/marketing", icon: "Megaphone", description: "Crie e acompanhe campanhas promocionais e cupons de desconto." }
  ],
  agro: [
    { title: "Talhões e Safras", path: "/segment/crops", icon: "Map", description: "Gerencie áreas de plantio, safras e produtividade." },
    { title: "Controle de Insumos", path: "/segment/farm-supplies", icon: "Package", description: "Controle estoque e aplicação de insumos agrícolas." },
    { title: "Produtividade por Área", path: "/segment/productivity", icon: "BarChart", description: "Analise produtividade e rendimento por talhão ou área." },
    { title: "Calendário Agrícola", path: "/segment/farm-calendar", icon: "Calendar", description: "Planeje atividades agrícolas de acordo com o calendário sazonal." },
    { title: "Integração Sensores/IoT", path: "/segment/farm-iot", icon: "Wifi", description: "Conecte sensores e equipamentos IoT para monitoramento." },
    { title: "Comercialização", path: "/segment/farm-sales", icon: "DollarSign", description: "Gerencie contratos de venda e comercialização da produção." }
  ],
  generic: [
    { title: "Clientes e Fornecedores", path: "/segment/clients-suppliers", icon: "Users", description: "Gerencie cadastros de clientes e fornecedores da sua empresa." },
    { title: "Emissão de Notas Fiscais", path: "/segment/invoices", icon: "FileText", description: "Emita e controle notas fiscais de produtos e serviços." },
    { title: "Financeiro", path: "/segment/financial", icon: "DollarSign", description: "Controle contas a pagar, receber e fluxo de caixa." }
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
