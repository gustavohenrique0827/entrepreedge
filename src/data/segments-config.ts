import { BusinessSegmentType, SegmentModuleConfig, SegmentVisualPreferences } from "@/types/segment-types";
import { 
  User, Calendar, BarChart, FileText, Building2, GraduationCap, Leaf, 
  Stethoscope, HeartPulse, FilePlus2, Pill, Microscope, ClipboardList, 
  BadgeCheck, CalendarClock, Tractor, Wheat, ShoppingCart, Truck, Box, 
  Users, CreditCard, FileCheck2, BookOpen, Sprout, GraduationCap as Education,
  School, BookOpen as SchoolBook, CircleUser, Library, Award, TreePine,
  ShoppingBag, Shirt, PackageCheck, Database, TrendingUp, ArrowRightLeft,
  Store, Palette
} from "lucide-react";

// Import specific segment configurations
import { servicesModuleConfig } from "./segment-configurations/services-config";
import { techModuleConfig } from "./segment-configurations/tech-config";
import { legalModuleConfig } from "./segment-configurations/legal-config";
import { manufacturingModuleConfig } from "./segment-configurations/manufacturing-config";

// Preferências visuais por segmento de negócio
export const visualPreferencesBySegment: Record<BusinessSegmentType, SegmentVisualPreferences> = {
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

// Nomes de exibição dos segmentos
export const segmentNames: Record<BusinessSegmentType, string> = {
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

// Configurações de módulos por segmento
export const moduleConfigBySegment: Record<BusinessSegmentType, SegmentModuleConfig> = {
  // Configuração Genérica
  generic: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral do seu negócio",
        enabled: true,
        order: 1,
        submodules: []
      },
      {
        name: "Finanças",
        path: "/finances",
        icon: "DollarSign",
        description: "Gestão financeira",
        enabled: true,
        order: 2,
        submodules: [
          {
            name: "Fluxo de Caixa",
            path: "/finances/cash-flow",
            icon: "TrendingUp",
            description: "Controle de entradas e saídas",
            enabled: true
          },
          {
            name: "Relatórios",
            path: "/finances/reports",
            icon: "FileText",
            description: "Relatórios financeiros",
            enabled: true
          }
        ]
      },
      {
        name: "Metas",
        path: "/goals",
        icon: "Target",
        description: "Definição e acompanhamento de metas",
        enabled: true,
        order: 3,
        submodules: []
      }
    ],
    dashboardConfig: {
      widgets: ["finance-summary", "goals-progress", "recent-activities"],
      defaultLayout: "standard"
    },
    userRoles: ["admin", "manager", "user"],
    defaultPermissions: {
      "admin": ["all"],
      "manager": ["view_all", "edit_finances", "edit_goals"],
      "user": ["view_dashboard", "view_goals"]
    }
  },
  
  // Configuração para o segmento de Saúde
  health: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral da sua clínica",
        enabled: true,
        order: 1,
        submodules: []
      },
      {
        name: "Pacientes",
        path: "/patients",
        icon: "User",
        description: "Gestão de pacientes",
        enabled: true,
        order: 2,
        submodules: [
          {
            name: "Cadastro",
            path: "/patients/register",
            icon: "UserPlus",
            description: "Cadastro de pacientes",
            enabled: true
          },
          {
            name: "Prontuários",
            path: "/patients/records",
            icon: "ClipboardList",
            description: "Prontuário eletrônico",
            enabled: true
          },
          {
            name: "Histórico",
            path: "/patients/history",
            icon: "FileText",
            description: "Histórico de atendimentos",
            enabled: true
          }
        ]
      },
      {
        name: "Agenda",
        path: "/calendar",
        icon: "Calendar",
        description: "Agendamento de consultas",
        enabled: true,
        order: 3,
        submodules: [
          {
            name: "Nova Consulta",
            path: "/calendar/new",
            icon: "CalendarPlus",
            description: "Agendar nova consulta",
            enabled: true
          },
          {
            name: "Telemedicina",
            path: "/calendar/telemedicine",
            icon: "Video",
            description: "Consultas online",
            enabled: true
          }
        ]
      },
      {
        name: "Financeiro",
        path: "/finances",
        icon: "DollarSign",
        description: "Gestão financeira da clínica",
        enabled: true,
        order: 4,
        submodules: [
          {
            name: "Convênios",
            path: "/finances/insurance",
            icon: "CreditCard",
            description: "Gestão de convênios",
            enabled: true
          },
          {
            name: "Faturamento",
            path: "/finances/billing",
            icon: "FileText",
            description: "Faturamento e cobranças",
            enabled: true
          },
          {
            name: "Relatórios",
            path: "/finances/reports",
            icon: "BarChart",
            description: "Relatórios financeiros",
            enabled: true
          }
        ]
      },
      {
        name: "Fiscal",
        path: "/fiscal",
        icon: "FileCheck2",
        description: "Gestão fiscal e contábil",
        enabled: true,
        order: 5,
        submodules: [
          {
            name: "Notas Fiscais",
            path: "/fiscal/invoices",
            icon: "Receipt",
            description: "Emissão de NF-e",
            enabled: true
          },
          {
            name: "Impostos",
            path: "/fiscal/taxes",
            icon: "BadgeDollar",
            description: "Controle de tributos",
            enabled: true
          }
        ]
      },
      {
        name: "Equipe",
        path: "/team",
        icon: "Users",
        description: "Gestão de profissionais",
        enabled: true,
        order: 6,
        submodules: [
          {
            name: "Médicos",
            path: "/team/doctors",
            icon: "Stethoscope",
            description: "Gestão de médicos",
            enabled: true
          },
          {
            name: "Enfermagem",
            path: "/team/nursing",
            icon: "HeartPulse",
            description: "Gestão de enfermagem",
            enabled: true
          },
          {
            name: "Escalas",
            path: "/team/schedules",
            icon: "CalendarClock",
            description: "Escalas de trabalho",
            enabled: true
          }
        ]
      },
      {
        name: "Treinamentos",
        path: "/training",
        icon: "GraduationCap",
        description: "Educação continuada",
        enabled: true,
        order: 7,
        submodules: [
          {
            name: "Cursos",
            path: "/training/courses",
            icon: "BookOpen",
            description: "Cursos disponíveis",
            enabled: true
          },
          {
            name: "Certificados",
            path: "/training/certificates",
            icon: "Award",
            description: "Certificações",
            enabled: true
          }
        ]
      },
      {
        name: "ESG",
        path: "/esg",
        icon: "Leaf",
        description: "Sustentabilidade em saúde",
        enabled: true,
        order: 8,
        submodules: [
          {
            name: "Indicadores",
            path: "/esg/indicators",
            icon: "Activity",
            description: "Métricas ESG",
            enabled: true
          },
          {
            name: "Projetos",
            path: "/esg/projects",
            icon: "FolderHeart",
            description: "Projetos sociais",
            enabled: true
          }
        ]
      }
    ],
    dashboardConfig: {
      widgets: ["patient-appointments", "financial-summary", "pending-authorizations", "team-schedule"],
      defaultLayout: "health-dashboard"
    },
    userRoles: ["admin", "doctor", "nurse", "receptionist", "financial"],
    defaultPermissions: {
      "admin": ["all"],
      "doctor": ["view_dashboard", "view_patients", "edit_patients", "view_calendar", "edit_calendar"],
      "nurse": ["view_dashboard", "view_patients", "edit_patients", "view_calendar"],
      "receptionist": ["view_dashboard", "view_patients", "edit_patients", "view_calendar", "edit_calendar"],
      "financial": ["view_dashboard", "view_finances", "edit_finances", "view_fiscal", "edit_fiscal"]
    }
  },
  
  // Configuração para o segmento de Agronegócio
  agro: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral da sua fazenda",
        enabled: true,
        order: 1,
        submodules: []
      },
      {
        name: "Produção",
        path: "/production",
        icon: "Tractor",
        description: "Gestão da produção agrícola",
        enabled: true,
        order: 2,
        submodules: [
          {
            name: "Áreas",
            path: "/production/areas",
            icon: "Map",
            description: "Gestão de áreas e talhões",
            enabled: true
          },
          {
            name: "Safras",
            path: "/production/crops",
            icon: "Wheat",
            description: "Planejamento de safras",
            enabled: true
          },
          {
            name: "Operações",
            path: "/production/operations",
            icon: "Wrench",
            description: "Operações mecanizadas",
            enabled: true
          }
        ]
      },
      {
        name: "Comercialização",
        path: "/sales",
        icon: "ShoppingCart",
        description: "Comercialização de produtos",
        enabled: true,
        order: 3,
        submodules: [
          {
            name: "Contratos",
            path: "/sales/contracts",
            icon: "FileText",
            description: "Contratos de venda",
            enabled: true
          },
          {
            name: "Compradores",
            path: "/sales/buyers",
            icon: "Users",
            description: "Gestão de compradores",
            enabled: true
          }
        ]
      },
      {
        name: "Financeiro",
        path: "/finances",
        icon: "DollarSign",
        description: "Gestão financeira rural",
        enabled: true,
        order: 4,
        submodules: [
          {
            name: "Fluxo de Caixa",
            path: "/finances/cash-flow",
            icon: "TrendingUp",
            description: "Fluxo por safra/fazenda",
            enabled: true
          },
          {
            name: "Financiamentos",
            path: "/finances/loans",
            icon: "Building",
            description: "Crédito rural",
            enabled: true
          }
        ]
      },
      {
        name: "Fiscal",
        path: "/fiscal",
        icon: "FileCheck2",
        description: "Gestão fiscal e contábil",
        enabled: true,
        order: 5,
        submodules: [
          {
            name: "Notas Fiscais",
            path: "/fiscal/invoices",
            icon: "Receipt",
            description: "Emissão de NF-e Rural",
            enabled: true
          },
          {
            name: "Tributos",
            path: "/fiscal/taxes",
            icon: "BadgeDollar",
            description: "Controle de tributos rurais",
            enabled: true
          }
        ]
      },
      {
        name: "Equipe",
        path: "/team",
        icon: "Users",
        description: "Gestão de colaboradores",
        enabled: true,
        order: 6,
        submodules: [
          {
            name: "Funcionários",
            path: "/team/employees",
            icon: "User",
            description: "Cadastro de funcionários",
            enabled: true
          },
          {
            name: "Safristas",
            path: "/team/seasonal",
            icon: "UserPlus",
            description: "Trabalhadores sazonais",
            enabled: true
          }
        ]
      },
      {
        name: "Treinamentos",
        path: "/training",
        icon: "GraduationCap",
        description: "Capacitação no campo",
        enabled: true,
        order: 7,
        submodules: []
      },
      {
        name: "ESG",
        path: "/esg",
        icon: "Leaf",
        description: "Sustentabilidade rural",
        enabled: true,
        order: 8,
        submodules: [
          {
            name: "Certificações",
            path: "/esg/certifications",
            icon: "BadgeCheck",
            description: "Certificações rurais",
            enabled: true
          },
          {
            name: "Meio Ambiente",
            path: "/esg/environment",
            icon: "TreePine",
            description: "Gestão ambiental",
            enabled: true
          }
        ]
      }
    ],
    dashboardConfig: {
      widgets: ["crop-status", "weather-forecast", "financial-summary", "yield-comparison"],
      defaultLayout: "agro-dashboard"
    },
    userRoles: ["admin", "manager", "agronomist", "field-worker", "financial"],
    defaultPermissions: {
      "admin": ["all"],
      "manager": ["view_all", "edit_all"],
      "agronomist": ["view_dashboard", "view_production", "edit_production"],
      "field-worker": ["view_dashboard", "view_production"],
      "financial": ["view_dashboard", "view_finances", "edit_finances", "view_fiscal", "edit_fiscal"]
    }
  },

  // Configuração para o segmento de Educação
  education: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral da instituição",
        enabled: true,
        order: 1,
        submodules: []
      },
      {
        name: "Acadêmico",
        path: "/academic",
        icon: "BookOpen",
        description: "Gestão acadêmica",
        enabled: true,
        order: 2,
        submodules: [
          {
            name: "Alunos",
            path: "/academic/students",
            icon: "Users",
            description: "Cadastro de alunos",
            enabled: true
          },
          {
            name: "Turmas",
            path: "/academic/classes",
            icon: "LayoutGrid",
            description: "Gestão de turmas",
            enabled: true
          },
          {
            name: "Notas",
            path: "/academic/grades",
            icon: "ClipboardList",
            description: "Lançamento de notas",
            enabled: true
          },
          {
            name: "Frequência",
            path: "/academic/attendance",
            icon: "CheckSquare",
            description: "Controle de frequência",
            enabled: true
          }
        ]
      },
      {
        name: "Secretaria",
        path: "/secretary",
        icon: "FileText",
        description: "Secretaria escolar",
        enabled: true,
        order: 3,
        submodules: [
          {
            name: "Matrículas",
            path: "/secretary/enrollment",
            icon: "FilePlus",
            description: "Processo de matrícula",
            enabled: true
          },
          {
            name: "Documentos",
            path: "/secretary/documents",
            icon: "FileText",
            description: "Emissão de documentos",
            enabled: true
          }
        ]
      },
      {
        name: "Financeiro",
        path: "/finances",
        icon: "DollarSign",
        description: "Gestão financeira escolar",
        enabled: true,
        order: 4,
        submodules: [
          {
            name: "Mensalidades",
            path: "/finances/tuition",
            icon: "CreditCard",
            description: "Controle de mensalidades",
            enabled: true
          },
          {
            name: "Bolsas",
            path: "/finances/scholarships",
            icon: "Award",
            description: "Bolsas e descontos",
            enabled: true
          }
        ]
      },
      {
        name: "RH Educacional",
        path: "/hr",
        icon: "Users",
        description: "Gestão de colaboradores",
        enabled: true,
        order: 5,
        submodules: [
          {
            name: "Professores",
            path: "/hr/teachers",
            icon: "UserCheck",
            description: "Gestão de professores",
            enabled: true
          },
          {
            name: "Funcionários",
            path: "/hr/staff",
            icon: "User",
            description: "Gestão de funcionários",
            enabled: true
          }
        ]
      },
      {
        name: "Biblioteca",
        path: "/library",
        icon: "Library",
        description: "Gestão da biblioteca",
        enabled: true,
        order: 6,
        submodules: [
          {
            name: "Acervo",
            path: "/library/collection",
            icon: "BookOpen",
            description: "Gestão do acervo",
            enabled: true
          },
          {
            name: "Empréstimos",
            path: "/library/loans",
            icon: "ArrowRightLeft",
            description: "Controle de empréstimos",
            enabled: true
          }
        ]
      },
      {
        name: "EAD",
        path: "/elearning",
        icon: "Monitor",
        description: "Ensino a distância",
        enabled: true,
        order: 7,
        submodules: [
          {
            name: "Cursos",
            path: "/elearning/courses",
            icon: "FolderOpen",
            description: "Gestão de cursos",
            enabled: true
          },
          {
            name: "Aulas",
            path: "/elearning/lessons",
            icon: "Video",
            description: "Aulas online",
            enabled: true
          }
        ]
      },
      {
        name: "ESG Educacional",
        path: "/esg",
        icon: "Leaf",
        description: "Sustentabilidade escolar",
        enabled: true,
        order: 8,
        submodules: []
      }
    ],
    dashboardConfig: {
      widgets: ["student-performance", "financial-summary", "attendance-rates", "upcoming-events"],
      defaultLayout: "education-dashboard"
    },
    userRoles: ["admin", "teacher", "staff", "financial", "librarian"],
    defaultPermissions: {
      "admin": ["all"],
      "teacher": ["view_dashboard", "view_academic", "edit_academic_grades", "view_elearning", "edit_elearning"],
      "staff": ["view_dashboard", "view_secretary", "edit_secretary"],
      "financial": ["view_dashboard", "view_finances", "edit_finances"],
      "librarian": ["view_dashboard", "view_library", "edit_library"]
    }
  },

  // Configuração para o segmento de E-commerce
  ecommerce: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral da loja",
        enabled: true,
        order: 1,
        submodules: []
      },
      {
        name: "Produtos",
        path: "/products",
        icon: "Package",
        description: "Gestão de produtos",
        enabled: true,
        order: 2,
        submodules: [
          {
            name: "Catálogo",
            path: "/products/catalog",
            icon: "Grid",
            description: "Catálogo de produtos",
            enabled: true
          },
          {
            name: "Categorias",
            path: "/products/categories",
            icon: "FolderTree",
            description: "Categorias de produtos",
            enabled: true
          },
          {
            name: "Estoque",
            path: "/products/inventory",
            icon: "PackageCheck",
            description: "Gestão de estoque",
            enabled: true
          }
        ]
      },
      {
        name: "Pedidos",
        path: "/orders",
        icon: "ShoppingBag",
        description: "Gestão de pedidos",
        enabled: true,
        order: 3,
        submodules: [
          {
            name: "Novos",
            path: "/orders/new",
            icon: "Bell",
            description: "Pedidos novos",
            enabled: true
          },
          {
            name: "Em Processamento",
            path: "/orders/processing",
            icon: "Clock",
            description: "Pedidos em processamento",
            enabled: true
          },
          {
            name: "Enviados",
            path: "/orders/shipped",
            icon: "Truck",
            description: "Pedidos enviados",
            enabled: true
          }
        ]
      },
      {
        name: "Clientes",
        path: "/customers",
        icon: "Users",
        description: "Gestão de clientes",
        enabled: true,
        order: 4,
        submodules: [
          {
            name: "Lista",
            path: "/customers/list",
            icon: "List",
            description: "Lista de clientes",
            enabled: true
          },
          {
            name: "Segmentação",
            path: "/customers/segments",
            icon: "PieChart",
            description: "Segmentação de clientes",
            enabled: true
          }
        ]
      },
      {
        name: "Pagamentos",
        path: "/payments",
        icon: "CreditCard",
        description: "Gestão de pagamentos",
        enabled: true,
        order: 5,
        submodules: [
          {
            name: "Transações",
            path: "/payments/transactions",
            icon: "ArrowRightLeft",
            description: "Histórico de transações",
            enabled: true
          },
          {
            name: "Métodos",
            path: "/payments/methods",
            icon: "Wallet",
            description: "Métodos de pagamento",
            enabled: true
          }
        ]
      },
      {
        name: "Marketing",
        path: "/marketing",
        icon: "TrendingUp",
        description: "Marketing e campanhas",
        enabled: true,
        order: 6,
        submodules: [
          {
            name: "Campanhas",
            path: "/marketing/campaigns",
            icon: "Megaphone",
            description: "Gestão de campanhas",
            enabled: true
          },
          {
            name: "Cupons",
            path: "/marketing/coupons",
            icon: "Ticket",
            description: "Cupons de desconto",
            enabled: true
          },
          {
            name: "SEO",
            path: "/marketing/seo",
            icon: "Search",
            description: "Otimização para buscas",
            enabled: true
          }
        ]
      },
      {
        name: "Fiscal",
        path: "/fiscal",
        icon: "FileCheck2",
        description: "Gestão fiscal",
        enabled: true,
        order: 7,
        submodules: [
          {
            name: "Notas Fiscais",
            path: "/fiscal/invoices",
            icon: "Receipt",
            description: "Emissão de NF-e",
            enabled: true
          }
        ]
      },
      {
        name: "Atendimento",
        path: "/support",
        icon: "HeadphonesIcon",
        description: "Suporte ao cliente",
        enabled: true,
        order: 8,
        submodules: [
          {
            name: "Chamados",
            path: "/support/tickets",
            icon: "MessageSquare",
            description: "Gestão de chamados",
            enabled: true
          },
          {
            name: "FAQ",
            path: "/support/faq",
            icon: "HelpCircle",
            description: "Perguntas frequentes",
            enabled: true
          }
        ]
      }
    ],
    dashboardConfig: {
      widgets: ["sales-summary", "new-orders", "top-products", "abandoned-carts"],
      defaultLayout: "ecommerce-dashboard"
    },
    userRoles: ["admin", "inventory", "support", "marketing", "financial"],
    defaultPermissions: {
      "admin": ["all"],
      "inventory": ["view_dashboard", "view_products", "edit_products", "view_orders"],
      "support": ["view_dashboard", "view_customers", "view_orders", "view_support", "edit_support"],
      "marketing": ["view_dashboard", "view_marketing", "edit_marketing", "view_products"],
      "financial": ["view_dashboard", "view_payments", "edit_payments", "view_fiscal", "edit_fiscal"]
    }
  },

  // Configuração para o segmento de Moda
  fashion: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral da marca",
        enabled: true,
        order: 1,
        submodules: []
      },
      {
        name: "Coleções",
        path: "/collections",
        icon: "Shirt",
        description: "Gestão de coleções",
        enabled: true,
        order: 2,
        submodules: [
          {
            name: "Por Temporada",
            path: "/collections/seasons",
            icon: "Calendar",
            description: "Coleções por temporada",
            enabled: true
          },
          {
            name: "Catálogo",
            path: "/collections/catalog",
            icon: "Images",
            description: "Catálogo de produtos",
            enabled: true
          },
          {
            name: "Lookbooks",
            path: "/collections/lookbooks",
            icon: "BookOpen",
            description: "Lookbooks e campanhas",
            enabled: true
          }
        ]
      },
      {
        name: "Vendas",
        path: "/sales",
        icon: "ShoppingBag",
        description: "Gestão de vendas",
        enabled: true,
        order: 3,
        submodules: [
          {
            name: "Lojas Físicas",
            path: "/sales/retail",
            icon: "Store",
            description: "Vendas em lojas",
            enabled: true
          },
          {
            name: "E-commerce",
            path: "/sales/online",
            icon: "Globe",
            description: "Vendas online",
            enabled: true
          },
          {
            name: "Marketplaces",
            path: "/sales/marketplaces",
            icon: "ShoppingCart",
            description: "Vendas em marketplaces",
            enabled: true
          }
        ]
      },
      {
        name: "Estoque",
        path: "/inventory",
        icon: "PackageCheck",
        description: "Gestão de estoque",
        enabled: true,
        order: 4,
        submodules: [
          {
            name: "Grade",
            path: "/inventory/sizing",
            icon: "Ruler",
            description: "Controle por tamanho/cor",
            enabled: true
          },
          {
            name: "Lojas",
            path: "/inventory/stores",
            icon: "Store",
            description: "Estoque por loja",
            enabled: true
          },
          {
            name: "Transferências",
            path: "/inventory/transfers",
            icon: "ArrowRightLeft",
            description: "Transferências entre lojas",
            enabled: true
          }
        ]
      },
      {
        name: "Clientes",
        path: "/customers",
        icon: "Users",
        description: "Gestão de clientes",
        enabled: true,
        order: 5,
        submodules: [
          {
            name: "Cadastro",
            path: "/customers/register",
            icon: "UserPlus",
            description: "Cadastro de clientes",
            enabled: true
          },
          {
            name: "Fidelidade",
            path: "/customers/loyalty",
            icon: "Award",
            description: "Programa de fidelidade",
            enabled: true
          }
        ]
      },
      {
        name: "Produção",
        path: "/production",
        icon: "Scissors",
        description: "Gestão da produção",
        enabled: true,
        order: 6,
        submodules: [
          {
            name: "Fichas Técnicas",
            path: "/production/specs",
            icon: "FileText",
            description: "Fichas técnicas",
            enabled: true
          },
          {
            name: "Fornecedores",
            path: "/production/suppliers",
            icon: "Factory",
            description: "Gestão de fornecedores",
            enabled: true
          }
        ]
      },
      {
        name: "Marketing",
        path: "/marketing",
        icon: "Palette",
        description: "Marketing e visual",
        enabled: true,
        order: 7,
        submodules: [
          {
            name: "Campanhas",
            path: "/marketing/campaigns",
            icon: "Camera",
            description: "Campanhas e visual",
            enabled: true
          },
          {
            name: "Redes Sociais",
            path: "/marketing/social",
            icon: "Instagram",
            description: "Gestão de redes sociais",
            enabled: true
          },
          {
            name: "Influenciadores",
            path: "/marketing/influencers",
            icon: "Star",
            description: "Parceria com influenciadores",
            enabled: true
          }
        ]
      },
      {
        name: "ESG Moda",
        path: "/esg",
        icon: "Leaf",
        description: "Moda sustentável",
        enabled: true,
        order: 8,
        submodules: [
          {
            name: "Materiais",
            path: "/esg/materials",
            icon: "Shirt",
            description: "Materiais sustentáveis",
            enabled: true
          },
          {
            name: "Certificações",
            path: "/esg/certifications",
            icon: "BadgeCheck",
            description: "Certificações sustentáveis",
            enabled: true
          }
        ]
      }
    ],
    dashboardConfig: {
      widgets: ["sales-by-collection", "trending-items", "inventory-status", "social-performance"],
      defaultLayout: "fashion-dashboard"
    },
    userRoles: ["admin", "designer", "sales", "production", "marketing"],
    defaultPermissions: {
      "admin": ["all"],
      "designer": ["view_dashboard", "view_collections", "edit_collections"],
      "sales": ["view_dashboard", "view_sales", "edit_sales", "view_customers", "edit_customers"],
      "production": ["view_dashboard", "view_production", "edit_production", "view_inventory"],
      "marketing": ["view_dashboard", "view_marketing", "edit_marketing", "view_collections"]
    }
  },

  // Configurações para os demais segmentos (apenas básico para este exemplo)
  services: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral dos serviços",
        enabled: true,
        order: 1,
        submodules: []
      },
      {
        name: "Clientes",
        path: "/clients",
        icon: "Users",
        description: "Gestão de clientes",
        enabled: true,
        order: 2,
        submodules: []
      },
      {
        name: "Projetos",
        path: "/projects",
        icon: "FolderOpen",
        description: "Gestão de projetos",
        enabled: true,
        order: 3,
        submodules: []
      }
    ],
    dashboardConfig: {
      widgets: ["active-projects", "client-satisfaction", "billing-status"],
      defaultLayout: "services-dashboard"
    },
    userRoles: ["admin", "manager", "staff"],
    defaultPermissions: {
      "admin": ["all"],
      "manager": ["view_all", "edit_all"],
      "staff": ["view_dashboard", "view_projects"]
    }
  },
  tech: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral tech",
        enabled: true,
        order: 1,
        submodules: []
      }
    ],
    dashboardConfig: {
      widgets: ["development-status", "active-sprints", "bug-reports"],
      defaultLayout: "tech-dashboard"
    },
    userRoles: ["admin", "developer", "tester", "product-manager"],
    defaultPermissions: {
      "admin": ["all"],
      "developer": ["view_dashboard", "view_code", "edit_code"],
      "tester": ["view_dashboard", "view_tests", "edit_tests"],
      "product-manager": ["view_dashboard", "view_roadmap", "edit_roadmap"]
    }
  },
  legal: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral jurídica",
        enabled: true,
        order: 1,
        submodules: []
      }
    ],
    dashboardConfig: {
      widgets: ["active-cases", "deadlines", "client-billing"],
      defaultLayout: "legal-dashboard"
    },
    userRoles: ["admin", "attorney", "paralegal", "secretary"],
    defaultPermissions: {
      "admin": ["all"],
      "attorney": ["view_dashboard", "view_cases", "edit_cases"],
      "paralegal": ["view_dashboard", "view_cases"],
      "secretary": ["view_dashboard", "view_calendar", "edit_calendar"]
    }
  },
  manufacturing: {
    modules: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "BarChart",
        description: "Visão geral industrial",
        enabled: true,
        order: 1,
        submodules: []
      }
    ],
    dashboardConfig: {
      widgets: ["production-status", "quality-control", "maintenance-schedule"],
      defaultLayout: "manufacturing-dashboard"
    },
    userRoles: ["admin", "production-manager", "quality-control", "maintenance"],
    defaultPermissions: {
      "admin": ["all"],
      "production-manager": ["view_dashboard", "view_production", "edit_production"],
      "quality-control": ["view_dashboard", "view_quality", "edit_quality"],
      "maintenance": ["view_dashboard", "view_maintenance", "edit_maintenance"]
    }
  }
};
