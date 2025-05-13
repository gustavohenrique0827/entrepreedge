import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definição de tipos para as atividades de cada segmento
export interface SegmentActivity {
  id: string;
  title: string;
  icon?: React.ReactNode;
  path: string;
  description?: string;
}

export interface SegmentData {
  id: string;
  name: string;
  icon: React.ReactNode | string;
  activities: SegmentActivity[];
  color: string;
  secondaryColor: string;
}

interface SegmentContextType {
  currentSegment: string;
  segmentName: string;
  segmentIcon: React.ReactNode | string;
  segmentActivities: SegmentActivity[];
  setCurrentSegment: (segment: string) => void;
  getVisualPreferences: () => { primaryColor: string; secondaryColor: string };
  applySegmentVisuals: () => void;
}

const SegmentContext = createContext<SegmentContextType | undefined>(undefined);

export const useSegment = () => {
  const context = useContext(SegmentContext);
  if (!context) {
    throw new Error('useSegment must be used within a SegmentProvider');
  }
  return context;
};

// Define as atividades para cada segmento
const segmentData: Record<string, SegmentData> = {
  generic: {
    id: 'generic',
    name: 'Genérico',
    icon: '🏢',
    color: '#8B5CF6', // Roxo
    secondaryColor: '#D946EF',
    activities: [
      { id: 'clients-suppliers', title: 'Clientes e Fornecedores', path: '/segment/clients-suppliers' },
      { id: 'invoices', title: 'Emissão de Notas Fiscais', path: '/segment/invoices' },
      { id: 'financial', title: 'Financeiro (Contas a Pagar/Receber)', path: '/segment/financial' }
    ]
  },
  manufacturing: {
    id: 'manufacturing',
    name: 'Indústria',
    icon: '🏭',
    color: '#2563EB', // Azul
    secondaryColor: '#3B82F6',
    activities: [
      { id: 'inventory', title: '📦 Gestão de Estoque', path: '/segment/inventory', description: 'Controle de inventário, movimentações e categorias' },
      { id: 'production-orders', title: '🛠️ Ordens de Produção', path: '/segment/production-orders', description: 'Planejamento e execução da produção' },
      { id: 'supplies', title: '🧾 Compras e Suprimentos', path: '/segment/supplies', description: 'Gestão de compras e fornecedores' },
      { id: 'equipment', title: '⚙️ Manutenção de Equipamentos', path: '/segment/equipment', description: 'Controle de manutenção preventiva e corretiva' },
      { id: 'logistics', title: '🚚 Logística e Expedição', path: '/segment/logistics', description: 'Controle de entregas e distribuição' },
      { id: 'production-reports', title: '📊 Relatórios de Produção', path: '/segment/production-reports', description: 'Análise de performance da produção' }
    ]
  },
  education: {
    id: 'education',
    name: 'Educação',
    icon: '🎓',
    color: '#9333EA', // Roxo escuro
    secondaryColor: '#A855F7',
    activities: [
      { id: 'students', title: '🎓 Matrículas e Alunos', path: '/segment/students', description: 'Gestão de alunos e controle de matrículas' },
      { id: 'courses', title: '📚 Disciplinas e Turmas', path: '/segment/courses', description: 'Gerenciamento das turmas, disciplinas e horários' },
      { id: 'teachers', title: '🧑‍🏫 Professores e Diário de Classe', path: '/segment/teachers', description: 'Gerenciamento de professores e aulas' },
      { id: 'grades', title: '📝 Notas e Avaliações', path: '/segment/grades', description: 'Gestão de avaliações e lançamento de notas' },
      { id: 'certificates', title: '📄 Emissão de Boletins/Certificados', path: '/segment/certificates', description: 'Emissão de documentos escolares' },
      { id: 'school-calendar', title: '📅 Calendário Escolar', path: '/segment/school-calendar', description: 'Planejamento de eventos e calendário letivo' }
    ]
  },
  legal: {
    id: 'legal',
    name: 'Jurídico',
    icon: '⚖️',
    color: '#7C3AED', // Roxo
    secondaryColor: '#8B5CF6',
    activities: [
      { id: 'cases', title: '📁 Gestão de Processos', path: '/segment/cases', description: 'Acompanhamento e gestão dos processos judiciais' },
      { id: 'hearings', title: '🗓️ Controle de Prazos e Audiências', path: '/segment/hearings', description: 'Agenda de prazos processuais e audiências' },
      { id: 'legal-documents', title: '📑 Geração de Documentos Jurídicos', path: '/segment/legal-documents', description: 'Criação e gerenciamento de documentos e templates' },
      { id: 'legal-clients', title: '📂 Clientes e Contratos', path: '/segment/legal-clients', description: 'Gestão de clientes e contratos jurídicos' },
      { id: 'legal-calendar', title: '👨‍⚖️ Agenda Jurídica', path: '/segment/legal-calendar', description: 'Agenda de compromissos e calendário jurídico' },
      { id: 'lawyer-reports', title: '📊 Relatórios por Advogado', path: '/segment/lawyer-reports', description: 'Análise de performance por advogado' }
    ]
  },
  technology: {
    id: 'technology',
    name: 'Tecnologia',
    icon: '💻',
    color: '#0891B2', // Azul escuro
    secondaryColor: '#06B6D4',
    activities: [
      { id: 'projects', title: '📋 Gestão de Projetos (Scrum/Kanban)', path: '/segment/projects', description: 'Gerenciamento ágil de projetos' },
      { id: 'support-tickets', title: '💻 Chamados e Suporte Técnico', path: '/segment/support-tickets', description: 'Gestão de chamados de suporte técnico' },
      { id: 'testing', title: '🧪 Testes e Versionamento', path: '/segment/testing', description: 'Controle de testes e versionamento de software' },
      { id: 'knowledge', title: '📚 Base de Conhecimento', path: '/segment/knowledge', description: 'Documentação e base de conhecimento' },
      { id: 'tech-config', title: '🔧 Configurações Técnicas', path: '/segment/tech-config', description: 'Gestão de configurações de infraestrutura' },
      { id: 'dev-metrics', title: '📊 Indicadores de Desenvolvimento', path: '/segment/dev-metrics', description: 'Acompanhamento de métricas de desenvolvimento' }
    ]
  },
  services: {
    id: 'services',
    name: 'Serviços',
    icon: '🛠️',
    color: '#0284C7', // Azul
    secondaryColor: '#0EA5E9',
    activities: [
      { id: 'service-orders', title: '🛎️ Ordens de Serviço', path: '/segment/service-orders', description: 'Gestão de ordens de serviço' },
      { id: 'service-appointments', title: '🗓️ Agendamento de Atendimentos', path: '/segment/service-appointments', description: 'Agenda de atendimentos e serviços' },
      { id: 'sla', title: '📃 Contratos e SLA', path: '/segment/sla', description: 'Gerenciamento de SLA e contratos' },
      { id: 'customer-support', title: '💬 Atendimento ao Cliente', path: '/segment/customer-support', description: 'Gestão de chamados e suporte ao cliente' },
      { id: 'proposals', title: '🧾 Orçamentos e Propostas', path: '/segment/proposals', description: 'Elaboração de propostas e orçamentos' },
      { id: 'field-team', title: '🚗 Equipe de Campo', path: '/segment/field-team', description: 'Gestão de equipes externas e rotas' }
    ]
  },
  fashion: {
    id: 'fashion',
    name: 'Moda',
    icon: '👗',
    color: '#DB2777', // Rosa
    secondaryColor: '#EC4899',
    activities: [
      { id: 'collections', title: '🧵 Gestão de Coleções', path: '/segment/collections', description: 'Planejamento e criação de coleções' },
      { id: 'fashion-inventory', title: '📦 Estoque com Grade (tamanho/cor)', path: '/segment/fashion-inventory', description: 'Gestão de estoque por grade' },
      { id: 'fashion-sales', title: '🛒 Vendas em Loja Online', path: '/segment/fashion-sales', description: 'Gestão de vendas online e física' },
      { id: 'product-images', title: '📸 Produtos com Imagens', path: '/segment/product-images', description: 'Catálogo de produtos com imagens' },
      { id: 'returns', title: '🔄 Trocas e Devoluções', path: '/segment/returns', description: 'Gestão de trocas e devoluções' },
      { id: 'fashion-reports', title: '📈 Relatórios de Moda', path: '/segment/fashion-reports', description: 'Análise de vendas e tendências' }
    ]
  },
  health: {
    id: 'health',
    name: 'Saúde',
    icon: '🩺',
    color: '#059669', // Verde
    secondaryColor: '#10B981',
    activities: [
      { id: 'patients', title: '👤 Cadastro de Pacientes', path: '/segment/patients', description: 'Gerenciamento de pacientes e prontuários' },
      { id: 'appointments', title: '📅 Agendamento de Consultas', path: '/segment/appointments', description: 'Agenda de consultas e atendimentos' },
      { id: 'hospital', title: '🏥 Gestão Hospitalar / Leitos', path: '/segment/hospital', description: 'Gerenciamento de leitos e internações' },
      { id: 'medications', title: '💊 Controle de Medicamentos', path: '/segment/medications', description: 'Controle de estoque e dispensação' },
      { id: 'health-billing', title: '📄 Faturamento por Convênios (TISS)', path: '/segment/health-billing', description: 'Faturamento de convênios médicos' },
      { id: 'medical-records', title: '📋 Prontuário Eletrônico', path: '/segment/medical-records', description: 'Prontuários médicos digitais' }
    ]
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛒',
    color: '#D97706', // Âmbar
    secondaryColor: '#F59E0B',
    activities: [
      { id: 'products', title: '📦 Cadastro de Produtos', path: '/segment/products', description: 'Gerenciamento de produtos, categorias e estoque' },
      { id: 'checkout', title: '🛒 Carrinho e Checkout', path: '/segment/checkout', description: 'Gerenciamento de carrinhos, pedidos e pagamentos' },
      { id: 'online-sales', title: '📈 Gestão Vendas Online', path: '/segment/online-sales', description: 'Acompanhamento e gestão de vendas' },
      { id: 'payments', title: '💳 Integração com Pagamentos', path: '/segment/payments', description: 'Configuração de meios de pagamento' },
      { id: 'ecommerce-logistics', title: '🚚 Logística e Entregas', path: '/segment/ecommerce-logistics', description: 'Gestão de envios e entregas' },
      { id: 'marketing', title: '📊 Marketing e Campanhas', path: '/segment/marketing', description: 'Gestão de campanhas e promoções' }
    ]
  },
  agribusiness: {
    id: 'agribusiness',
    name: 'Agronegócio',
    icon: '🌾',
    color: '#65A30D', // Verde
    secondaryColor: '#84CC16',
    activities: [
      { id: 'crops', title: '🌾 Gestão de Talhões e Safras', path: '/segment/crops', description: 'Controle de áreas e cultivos' },
      { id: 'farm-supplies', title: '🛒 Controle de Insumos', path: '/segment/farm-supplies', description: 'Gestão de insumos agrícolas' },
      { id: 'productivity', title: '📊 Produtividade por Área', path: '/segment/productivity', description: 'Análise de produtividade por talhão' },
      { id: 'farm-calendar', title: '📅 Calendário Agrícola', path: '/segment/farm-calendar', description: 'Planejamento de ciclos de plantio' },
      { id: 'farm-iot', title: '🤖 Integração com Sensores/IoT', path: '/segment/farm-iot', description: 'Monitoramento via sensores e dispositivos IoT' },
      { id: 'farm-sales', title: '🛒 Comercialização da Produção', path: '/segment/farm-sales', description: 'Controle de vendas e estoque' }
    ]
  }
};

export const SegmentProvider = ({ children }: { children: ReactNode }) => {
  // Lendo do localStorage na primeira renderização
  const [currentSegment, setCurrentSegmentState] = useState<string>(() => {
    return localStorage.getItem('segment') || 'generic';
  });
  
  const setCurrentSegment = (segment: string) => {
    localStorage.setItem('segment', segment);
    setCurrentSegmentState(segment);
  };
  
  useEffect(() => {
    // Aplicar as cores do segmento quando o componente montar ou quando o segmento mudar
    applySegmentVisuals();
  }, [currentSegment]);
  
  // Função para obter as cores do tema com base no segmento
  const getVisualPreferences = () => {
    const segment = segmentData[currentSegment] || segmentData.generic;
    return {
      primaryColor: segment.color,
      secondaryColor: segment.secondaryColor
    };
  };
  
  // Função para aplicar cores do segmento no CSS
  const applySegmentVisuals = () => {
    const { primaryColor, secondaryColor } = getVisualPreferences();
    document.documentElement.style.setProperty('--primary', primaryColor);
    document.documentElement.style.setProperty('--primary-foreground', '#ffffff');
    document.documentElement.style.setProperty('--secondary', secondaryColor);
  };
  
  // Obter dados do segmento atual
  const segmentInfo = segmentData[currentSegment] || segmentData.generic;
  
  const value = {
    currentSegment,
    segmentName: segmentInfo.name,
    segmentIcon: segmentInfo.icon,
    segmentActivities: segmentInfo.activities,
    setCurrentSegment,
    getVisualPreferences,
    applySegmentVisuals
  };
  
  return (
    <SegmentContext.Provider value={value}>
      {children}
    </SegmentContext.Provider>
  );
};
