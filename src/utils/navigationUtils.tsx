
import React from 'react';
import { BusinessSegmentType } from '@/contexts/SegmentContext';
import { 
  Home, 
  BarChart2, 
  Target, 
  BookOpen, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Calendar, 
  PieChart, 
  Settings, 
  Package, 
  FileText, 
  Briefcase, 
  Truck, 
  Database, 
  HeartPulse, 
  Scissors, 
  Cloud,
  Clock,
  Award,
  UserPlus,
  Calculator,
  LineChart,
  ClipboardList,
  FilePlus,
  ListChecks,
  Scale,
  Layers,
  BookOpen as Learn,
  BarChart2 as Goals,
  FileText as Reports,
  DollarSign as Financial
} from 'lucide-react';

// Define interfaces for navigation items
export interface NavSubItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  subItems?: NavSubItem[];
}

// Define common items for all segments
export const getCommonNavItems = (): NavItem[] => {
  return [
    // Department Personnel (Required for all segments)
    {
      name: 'Departamento Pessoal',
      href: '/personnel',
      icon: <Users size={18} />,
      subItems: [
        {
          name: 'Cadastro de Funcionários',
          href: '/personnel/employees',
          icon: <Users size={18} />
        },
        {
          name: 'Controle de Ponto',
          href: '/personnel/time-tracking',
          icon: <Clock size={18} />
        },
        {
          name: 'Folha de Pagamento',
          href: '/personnel/payslips',
          icon: <DollarSign size={18} />
        },
        {
          name: 'Férias / Afastamentos',
          href: '/personnel/time-off',
          icon: <Calendar size={18} />
        },
        {
          name: 'Avaliação de Desempenho',
          href: '/personnel/performance',
          icon: <Award size={18} />
        },
        {
          name: 'Admissões / Demissões',
          href: '/personnel/hiring',
          icon: <UserPlus size={18} />
        }
      ]
    },
    
    // Accounting / Fiscal (Required for all segments)
    {
      name: 'Contábil / Fiscal',
      href: '/accounting',
      icon: <Calculator size={18} />,
      subItems: [
        {
          name: 'Escrituração Contábil e Fiscal',
          href: '/accounting/entries',
          icon: <FilePlus size={18} />
        },
        {
          name: 'Apuração de Impostos',
          href: '/accounting/taxes',
          icon: <Calculator size={18} />
        },
        {
          name: 'Lançamentos',
          href: '/accounting/entries',
          icon: <ListChecks size={18} />
        },
        {
          name: 'DRE',
          href: '/accounting/financial-statements',
          icon: <LineChart size={18} />
        },
        {
          name: 'Balancetes',
          href: '/accounting/reports',
          icon: <FileText size={18} />
        },
        {
          name: 'Obrigações Acessórias',
          href: '/accounting/fiscal',
          icon: <ClipboardList size={18} />
        }
      ]
    },
    
    // Learning (Required for all segments but adapted)
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />,
      subItems: [
        {
          name: 'Treinamentos Técnicos',
          href: '/learn/technical',
          icon: <BookOpen size={18} />
        },
        {
          name: 'Procedimentos Internos',
          href: '/learn/procedures',
          icon: <ListChecks size={18} />
        },
        {
          name: 'Legislação Específica',
          href: '/learn/legislation',
          icon: <Scale size={18} />
        },
        {
          name: 'Soft Skills',
          href: '/learn/soft-skills',
          icon: <Users size={18} />
        }
      ]
    },
    
    // Goals (segment specific)
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    
    // Reports (segment specific)
    {
      name: 'Relatórios',
      href: '/reports',
      icon: <FileText size={18} />
    },
    
    // ESG (segment specific)
    {
      name: 'ESG',
      href: '/esg-indicators',
      icon: <Layers size={18} />
    },
    
    // Financial (segment specific)
    {
      name: 'Financeiro',
      href: '/finances',
      icon: <DollarSign size={18} />
    }
  ];
};

// Define the navigation items for different segments
export const getNavItemsBySegment = (segment: BusinessSegmentType): NavItem[] => {
  // Get common navigation items
  const commonItems = getCommonNavItems();
  
  // Dashboard is first for all segments
  const dashboardItem: NavItem = {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <Home size={18} />
  };
  
  // Segment-specific navigation items
  const segmentItems: Record<BusinessSegmentType, NavItem[]> = {
    // E-commerce segment
    ecommerce: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/ecommerce-activities',
        icon: <Package size={18} />,
        subItems: [
          {
            name: 'Produtos',
            href: '/products',
            icon: <Package size={18} />
          },
          {
            name: 'Vendas',
            href: '/sales',
            icon: <ShoppingBag size={18} />
          },
          {
            name: 'Clientes',
            href: '/customers',
            icon: <Users size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Tech segment
    tech: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/tech-activities',
        icon: <Briefcase size={18} />,
        subItems: [
          {
            name: 'Projetos',
            href: '/projects',
            icon: <Briefcase size={18} />
          },
          {
            name: 'Suporte',
            href: '/support',
            icon: <HeartPulse size={18} />
          },
          {
            name: 'Equipe',
            href: '/team',
            icon: <Users size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Manufacturing segment
    manufacturing: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/manufacturing-activities',
        icon: <Settings size={18} />,
        subItems: [
          {
            name: 'Produção',
            href: '/production',
            icon: <Settings size={18} />
          },
          {
            name: 'Estoque',
            href: '/inventory',
            icon: <Database size={18} />
          },
          {
            name: 'Logística',
            href: '/logistics',
            icon: <Truck size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Legal segment
    legal: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/legal-activities',
        icon: <FileText size={18} />,
        subItems: [
          {
            name: 'Processos',
            href: '/cases',
            icon: <FileText size={18} />
          },
          {
            name: 'Clientes',
            href: '/clients',
            icon: <Users size={18} />
          },
          {
            name: 'Documentos',
            href: '/documents',
            icon: <FileText size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Fashion segment
    fashion: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/fashion-activities',
        icon: <Scissors size={18} />,
        subItems: [
          {
            name: 'Coleções',
            href: '/collections',
            icon: <Scissors size={18} />
          },
          {
            name: 'Vendas',
            href: '/sales',
            icon: <ShoppingBag size={18} />
          },
          {
            name: 'Clientes',
            href: '/customers',
            icon: <Users size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Services segment
    services: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/services-activities',
        icon: <Briefcase size={18} />,
        subItems: [
          {
            name: 'Serviços',
            href: '/services',
            icon: <Briefcase size={18} />
          },
          {
            name: 'Clientes',
            href: '/customers',
            icon: <Users size={18} />
          },
          {
            name: 'Equipe',
            href: '/team',
            icon: <Users size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Health segment
    health: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/health-activities',
        icon: <HeartPulse size={18} />,
        subItems: [
          {
            name: 'Pacientes',
            href: '/patients',
            icon: <Users size={18} />
          },
          {
            name: 'Consultas',
            href: '/appointments',
            icon: <Calendar size={18} />
          },
          {
            name: 'Resultados',
            href: '/results',
            icon: <BarChart2 size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Agro segment
    agro: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/agro-activities',
        icon: <Cloud size={18} />,
        subItems: [
          {
            name: 'Produção',
            href: '/production',
            icon: <PieChart size={18} />
          },
          {
            name: 'Clima',
            href: '/weather',
            icon: <Cloud size={18} />
          },
          {
            name: 'Estoque',
            href: '/inventory',
            icon: <Database size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Education segment
    education: [
      dashboardItem,
      {
        name: 'Atividades do Segmento',
        href: '/education-activities',
        icon: <BookOpen size={18} />,
        subItems: [
          {
            name: 'Alunos',
            href: '/students',
            icon: <Users size={18} />
          },
          {
            name: 'Cursos',
            href: '/courses',
            icon: <BookOpen size={18} />
          },
          {
            name: 'Resultados',
            href: '/results',
            icon: <BarChart2 size={18} />
          }
        ]
      },
      ...commonItems
    ],
    
    // Generic segment (default)
    generic: [
      dashboardItem,
      {
        name: 'Atividades Gerais',
        href: '/activities',
        icon: <Briefcase size={18} />,
        subItems: [
          {
            name: 'Calendário',
            href: '/calendar',
            icon: <Calendar size={18} />
          },
          {
            name: 'Tarefas',
            href: '/tasks',
            icon: <ListChecks size={18} />
          },
          {
            name: 'Documentos',
            href: '/documents',
            icon: <FileText size={18} />
          }
        ]
      },
      ...commonItems
    ]
  };

  return segmentItems[segment] || segmentItems.generic;
};
