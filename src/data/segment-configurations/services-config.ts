
import { SegmentModuleConfig } from '@/types/segment-types';

// Configuration for the Services segment
export const servicesModuleConfig: SegmentModuleConfig = {
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
      name: "Gestão de Serviços",
      path: "/services",
      icon: "FileCheck",
      description: "Gestão de serviços e contratos",
      enabled: true,
      order: 2,
      submodules: [
        {
          name: "Contratos",
          path: "/services/contracts",
          icon: "FileText",
          description: "Gerenciamento de contratos",
          enabled: true
        },
        {
          name: "Ordens de Serviço",
          path: "/services/orders",
          icon: "ClipboardList",
          description: "Ordens de serviço e agendamentos",
          enabled: true
        },
        {
          name: "SLAs",
          path: "/services/slas",
          icon: "Clock",
          description: "Controle de SLAs e prazos",
          enabled: true
        }
      ]
    },
    {
      name: "Clientes",
      path: "/customers",
      icon: "Users",
      description: "Gestão de clientes e atendimento",
      enabled: true,
      order: 3,
      submodules: [
        {
          name: "Cadastro",
          path: "/customers/register",
          icon: "UserPlus",
          description: "Cadastro de clientes",
          enabled: true
        },
        {
          name: "Chamados",
          path: "/customers/tickets",
          icon: "MessageSquare",
          description: "Gestão de chamados e suporte",
          enabled: true
        },
        {
          name: "Avaliações",
          path: "/customers/ratings",
          icon: "Star",
          description: "Avaliações de satisfação",
          enabled: true
        }
      ]
    },
    {
      name: "Financeiro",
      path: "/finances",
      icon: "DollarSign",
      description: "Gestão financeira",
      enabled: true,
      order: 4,
      submodules: [
        {
          name: "Contas",
          path: "/finances/accounts",
          icon: "CreditCard",
          description: "Contas a pagar e receber",
          enabled: true
        },
        {
          name: "Faturamento",
          path: "/finances/billing",
          icon: "FileText",
          description: "Faturamento e notas fiscais",
          enabled: true
        },
        {
          name: "Relatórios",
          path: "/finances/reports",
          icon: "BarChart2",
          description: "Relatórios financeiros",
          enabled: true
        }
      ]
    },
    {
      name: "Equipe",
      path: "/team",
      icon: "Users",
      description: "Gestão de equipes e profissionais",
      enabled: true,
      order: 5,
      submodules: [
        {
          name: "Profissionais",
          path: "/team/professionals",
          icon: "User",
          description: "Cadastro de profissionais",
          enabled: true
        },
        {
          name: "Agenda",
          path: "/team/schedule",
          icon: "Calendar",
          description: "Agenda e escalas",
          enabled: true
        },
        {
          name: "Desempenho",
          path: "/team/performance",
          icon: "TrendingUp",
          description: "Avaliação de desempenho",
          enabled: true
        }
      ]
    },
    {
      name: "Operações",
      path: "/operations",
      icon: "Settings",
      description: "Operações e execução de serviços",
      enabled: true,
      order: 6,
      submodules: [
        {
          name: "Checklist",
          path: "/operations/checklist",
          icon: "CheckSquare",
          description: "Checklists de execução",
          enabled: true
        },
        {
          name: "Evidências",
          path: "/operations/evidence",
          icon: "Image",
          description: "Upload de evidências",
          enabled: true
        },
        {
          name: "Relatórios",
          path: "/operations/reports",
          icon: "FileText",
          description: "Relatórios técnicos",
          enabled: true
        }
      ]
    },
    {
      name: "Qualidade",
      path: "/quality",
      icon: "Award",
      description: "Indicadores e qualidade",
      enabled: true,
      order: 7,
      submodules: [
        {
          name: "Indicadores",
          path: "/quality/indicators",
          icon: "Activity",
          description: "Indicadores de desempenho",
          enabled: true
        },
        {
          name: "Não Conformidades",
          path: "/quality/issues",
          icon: "AlertCircle",
          description: "Controle de não conformidades",
          enabled: true
        },
        {
          name: "Pesquisas",
          path: "/quality/surveys",
          icon: "MessageCircle",
          description: "Pesquisas de satisfação",
          enabled: true
        }
      ]
    },
    {
      name: "ESG",
      path: "/esg",
      icon: "Leaf",
      description: "ESG para serviços",
      enabled: true,
      order: 8,
      submodules: [
        {
          name: "Indicadores",
          path: "/esg/indicators",
          icon: "BarChart",
          description: "Indicadores ESG",
          enabled: true
        },
        {
          name: "Projetos",
          path: "/esg/projects",
          icon: "Heart",
          description: "Projetos de impacto",
          enabled: true
        }
      ]
    }
  ],
  dashboardConfig: {
    widgets: ["service-summary", "client-satisfaction", "team-performance", "financial-overview"],
    defaultLayout: "services-dashboard"
  },
  userRoles: ["admin", "manager", "technician", "support", "financial"],
  defaultPermissions: {
    "admin": ["all"],
    "manager": ["view_all", "edit_services", "edit_team", "view_finances"],
    "technician": ["view_dashboard", "view_services", "edit_operations"],
    "support": ["view_dashboard", "view_customers", "edit_customers"],
    "financial": ["view_dashboard", "view_finances", "edit_finances"]
  }
};
