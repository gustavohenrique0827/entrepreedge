
import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos de segmentos de negócio disponíveis
export type BusinessSegmentType = 
  'manufacturing' | 
  'education' | 
  'health' | 
  'legal' | 
  'technology' | 
  'services' | 
  'fashion' | 
  'ecommerce' | 
  'agribusiness' | 
  'retail';

// Definir o tipo para uma atividade de segmento
export interface SegmentActivity {
  id: string;
  title: string;
  description?: string;
  path: string;
  icon?: React.ReactNode;
}

// Definir o tipo para o contexto
interface SegmentContextType {
  segmentName: string;
  segmentType: BusinessSegmentType | null;
  segmentIcon: string;
  segmentActivities: SegmentActivity[];
  changeSegment: (type: BusinessSegmentType, name: string) => void;
}

// Criar o contexto
const SegmentContext = createContext<SegmentContextType | undefined>(undefined);

// Definir o provedor do contexto
export const SegmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para armazenar o tipo de segmento atual
  const [segmentType, setSegmentType] = useState<BusinessSegmentType | null>(null);
  // Estado para armazenar o nome do segmento atual
  const [segmentName, setSegmentName] = useState<string>('');
  // Estado para armazenar o ícone do segmento atual
  const [segmentIcon, setSegmentIcon] = useState<string>('🏢');
  // Estado para armazenar as atividades do segmento atual
  const [segmentActivities, setSegmentActivities] = useState<SegmentActivity[]>([]);

  // Função para definir as atividades com base no tipo de segmento
  const getSegmentActivities = (type: BusinessSegmentType): SegmentActivity[] => {
    switch (type) {
      case 'manufacturing':
        setSegmentIcon('🏭');
        return [
          { id: '1', title: 'Estoque', description: 'Gestão de inventário', path: '/segment/inventory' },
          { id: '2', title: 'Ordens de Produção', description: 'Controle de produção', path: '/segment/production-orders' },
          { id: '3', title: 'Suprimentos', description: 'Gestão de materiais', path: '/segment/supplies' },
          { id: '4', title: 'Equipamentos', description: 'Manutenção e controle', path: '/segment/equipment' },
          { id: '5', title: 'Logística', description: 'Transporte e distribuição', path: '/segment/logistics' },
          { id: '6', title: 'Relatórios', description: 'Análise de produção', path: '/segment/production-reports' }
        ];
      case 'education':
        setSegmentIcon('🎓');
        return [
          { id: '1', title: 'Alunos', description: 'Cadastro e gerenciamento', path: '/segment/students' },
          { id: '2', title: 'Cursos e Turmas', description: 'Estrutura pedagógica', path: '/segment/courses' },
          { id: '3', title: 'Professores', description: 'Corpo docente', path: '/segment/teachers' },
          { id: '4', title: 'Notas', description: 'Avaliação e desempenho', path: '/segment/grades' },
          { id: '5', title: 'Certificados', description: 'Emissão de documentos', path: '/segment/certificates' },
          { id: '6', title: 'Calendário', description: 'Agenda escolar', path: '/segment/school-calendar' }
        ];
      case 'health':
        setSegmentIcon('🏥');
        return [
          { id: '1', title: 'Pacientes', description: 'Cadastro e prontuários', path: '/segment/patients' },
          { id: '2', title: 'Consultas', description: 'Agendamento e atendimento', path: '/segment/appointments' },
          { id: '3', title: 'Hospital', description: 'Gestão hospitalar', path: '/segment/hospital' },
          { id: '4', title: 'Medicamentos', description: 'Controle de farmácia', path: '/segment/medications' },
          { id: '5', title: 'Faturamento', description: 'Convênios e recebimentos', path: '/segment/health-billing' },
          { id: '6', title: 'Prontuários', description: 'Histórico médico', path: '/segment/medical-records' }
        ];
      case 'legal':
        setSegmentIcon('⚖️');
        return [
          { id: '1', title: 'Processos', description: 'Gestão de casos', path: '/segment/cases' },
          { id: '2', title: 'Documentos', description: 'Geração de documentos jurídicos', path: '/segment/legal-documents' },
          { id: '3', title: 'Audiências', description: 'Agenda de audiências', path: '/segment/hearings' },
          { id: '4', title: 'Clientes', description: 'Cadastro de clientes', path: '/segment/legal-clients' },
          { id: '5', title: 'Prazos', description: 'Calendário jurídico', path: '/segment/legal-calendar' },
          { id: '6', title: 'Relatórios', description: 'Produtividade e resultados', path: '/segment/lawyer-reports' }
        ];
      case 'technology':
        setSegmentIcon('💻');
        return [
          { id: '1', title: 'Projetos', description: 'Gestão de projetos', path: '/segment/projects' },
          { id: '2', title: 'Chamados', description: 'Suporte técnico', path: '/segment/support-tickets' },
          { id: '3', title: 'Testes', description: 'Qualidade de software', path: '/segment/testing' },
          { id: '4', title: 'Base de Conhecimento', description: 'Documentação', path: '/segment/knowledge' },
          { id: '5', title: 'Configurações', description: 'Infraestrutura', path: '/segment/tech-config' },
          { id: '6', title: 'Métricas', description: 'Desempenho e análises', path: '/segment/dev-metrics' }
        ];
      case 'services':
        setSegmentIcon('🔧');
        return [
          { id: '1', title: 'Ordens de Serviço', description: 'Gestão de tarefas', path: '/segment/service-orders' },
          { id: '2', title: 'Agendamentos', description: 'Calendário de serviços', path: '/segment/service-appointments' },
          { id: '3', title: 'SLA', description: 'Acordos de nível de serviço', path: '/segment/sla' },
          { id: '4', title: 'Suporte', description: 'Atendimento ao cliente', path: '/segment/customer-support' },
          { id: '5', title: 'Propostas', description: 'Orçamentos e contratos', path: '/segment/proposals' },
          { id: '6', title: 'Equipe de Campo', description: 'Gestão de técnicos', path: '/segment/field-team' }
        ];
      case 'fashion':
        setSegmentIcon('👕');
        return [
          { id: '1', title: 'Coleções', description: 'Desenvolvimento de produtos', path: '/segment/collections' },
          { id: '2', title: 'Estoque', description: 'Controle de inventário', path: '/segment/fashion-inventory' },
          { id: '3', title: 'Vendas', description: 'Gestão de vendas', path: '/segment/fashion-sales' },
          { id: '4', title: 'Catálogo', description: 'Imagens de produtos', path: '/segment/product-images' },
          { id: '5', title: 'Devoluções', description: 'Gestão de trocas', path: '/segment/returns' },
          { id: '6', title: 'Relatórios', description: 'Desempenho e tendências', path: '/segment/fashion-reports' }
        ];
      case 'ecommerce':
        setSegmentIcon('🛒');
        return [
          { id: '1', title: 'Produtos', description: 'Gestão de catálogo', path: '/segment/products' },
          { id: '2', title: 'Checkout', description: 'Pagamento e finalização', path: '/segment/checkout' },
          { id: '3', title: 'Vendas', description: 'Gestão de pedidos', path: '/segment/online-sales' },
          { id: '4', title: 'Pagamentos', description: 'Formas de pagamento', path: '/segment/payments' },
          { id: '5', title: 'Logística', description: 'Entrega e rastreamento', path: '/segment/ecommerce-logistics' },
          { id: '6', title: 'Marketing', description: 'Campanhas e promoções', path: '/segment/marketing' }
        ];
      case 'agribusiness':
        setSegmentIcon('🌾');
        return [
          { id: '1', title: 'Culturas', description: 'Gestão de plantio', path: '/segment/crops' },
          { id: '2', title: 'Insumos', description: 'Controle de estoque', path: '/segment/farm-supplies' },
          { id: '3', title: 'Produtividade', description: 'Métricas de produção', path: '/segment/productivity' },
          { id: '4', title: 'Calendário', description: 'Planejamento agrícola', path: '/segment/farm-calendar' },
          { id: '5', title: 'Sensores', description: 'IoT e monitoramento', path: '/segment/farm-iot' },
          { id: '6', title: 'Vendas', description: 'Comercialização', path: '/segment/farm-sales' }
        ];
      case 'retail':
        setSegmentIcon('🏪');
        return [
          { id: '1', title: 'Clientes e Fornecedores', description: 'Cadastro e gestão', path: '/segment/clients-suppliers' },
          { id: '2', title: 'Notas Fiscais', description: 'Documentos fiscais', path: '/segment/invoices' },
          { id: '3', title: 'Financeiro', description: 'Contas e pagamentos', path: '/segment/financial' },
          { id: '4', title: 'PDV', description: 'Ponto de venda', path: '/segment/pos' },
          { id: '5', title: 'Estoque', description: 'Controle de produtos', path: '/segment/retail-inventory' },
          { id: '6', title: 'Relatórios', description: 'Análises de vendas', path: '/segment/retail-reports' }
        ];
      default:
        return [];
    }
  };

  // Carregar o segmento salvo ao iniciar
  useEffect(() => {
    const savedSegmentType = localStorage.getItem('segmentType') as BusinessSegmentType;
    const savedSegmentName = localStorage.getItem('segmentName') || '';
    
    if (savedSegmentType) {
      setSegmentType(savedSegmentType);
      setSegmentName(savedSegmentName);
      setSegmentActivities(getSegmentActivities(savedSegmentType));
    }
  }, []);

  // Função para mudar o segmento atual
  const changeSegment = (type: BusinessSegmentType, name: string) => {
    setSegmentType(type);
    setSegmentName(name);
    
    // Atualizar atividades com base no novo tipo
    const newActivities = getSegmentActivities(type);
    setSegmentActivities(newActivities);
    
    // Salvar no localStorage
    localStorage.setItem('segmentType', type);
    localStorage.setItem('segmentName', name);
  };

  // Valor do contexto
  const value: SegmentContextType = {
    segmentName,
    segmentType,
    segmentIcon,
    segmentActivities,
    changeSegment
  };

  return (
    <SegmentContext.Provider value={value}>
      {children}
    </SegmentContext.Provider>
  );
};

// Hook para facilitar o uso do contexto
export const useSegment = () => {
  const context = useContext(SegmentContext);
  if (context === undefined) {
    throw new Error('useSegment deve ser usado dentro de um SegmentProvider');
  }
  return context;
};
