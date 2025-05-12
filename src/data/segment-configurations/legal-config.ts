
import { SegmentModuleConfig } from '@/types/segment-types';

// Configuration for the Legal segment
export const legalModuleConfig: SegmentModuleConfig = {
  modules: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "BarChart",
      description: "Visão geral do escritório",
      enabled: true,
      order: 1,
      submodules: []
    },
    {
      name: "Processos",
      path: "/cases",
      icon: "FileText",
      description: "Gestão de processos e casos",
      enabled: true,
      order: 2,
      submodules: [
        {
          name: "Judiciais",
          path: "/cases/judicial",
          icon: "Gavel",
          description: "Processos judiciais",
          enabled: true
        },
        {
          name: "Administrativos",
          path: "/cases/administrative",
          icon: "Briefcase",
          description: "Processos administrativos",
          enabled: true
        },
        {
          name: "Andamentos",
          path: "/cases/updates",
          icon: "Activity",
          description: "Andamentos processuais",
          enabled: true
        },
        {
          name: "Prazos",
          path: "/cases/deadlines",
          icon: "Calendar",
          description: "Controle de prazos",
          enabled: true
        }
      ]
    },
    {
      name: "Documentos",
      path: "/documents",
      icon: "FileText",
      description: "Gestão de documentos e contratos",
      enabled: true,
      order: 3,
      submodules: [
        {
          name: "Contratos",
          path: "/documents/contracts",
          icon: "FileCheck",
          description: "Gestão de contratos",
          enabled: true
        },
        {
          name: "Modelos",
          path: "/documents/templates",
          icon: "Copy",
          description: "Modelos de documentos",
          enabled: true
        },
        {
          name: "Assinaturas",
          path: "/documents/signatures",
          icon: "Pen",
          description: "Assinatura eletrônica",
          enabled: true
        },
        {
          name: "Vencimentos",
          path: "/documents/expirations",
          icon: "Clock",
          description: "Controle de vencimentos",
          enabled: true
        }
      ]
    },
    {
      name: "Clientes",
      path: "/clients",
      icon: "Users",
      description: "Gestão de clientes e atendimento",
      enabled: true,
      order: 4,
      submodules: [
        {
          name: "Cadastro",
          path: "/clients/register",
          icon: "UserPlus",
          description: "Cadastro de clientes",
          enabled: true
        },
        {
          name: "Reuniões",
          path: "/clients/meetings",
          icon: "MessageSquare",
          description: "Histórico de reuniões",
          enabled: true
        },
        {
          name: "Honorários",
          path: "/clients/fees",
          icon: "DollarSign",
          description: "Contratos de honorários",
          enabled: true
        },
        {
          name: "Portal",
          path: "/clients/portal",
          icon: "Monitor",
          description: "Portal do cliente",
          enabled: true
        }
      ]
    },
    {
      name: "Financeiro",
      path: "/finances",
      icon: "DollarSign",
      description: "Gestão financeira jurídica",
      enabled: true,
      order: 5,
      submodules: [
        {
          name: "Honorários",
          path: "/finances/fees",
          icon: "DollarSign",
          description: "Controle de honorários",
          enabled: true
        },
        {
          name: "Contas",
          path: "/finances/accounts",
          icon: "CreditCard",
          description: "Contas a pagar e receber",
          enabled: true
        },
        {
          name: "Notas Fiscais",
          path: "/finances/invoices",
          icon: "FileText",
          description: "Emissão de notas fiscais",
          enabled: true
        },
        {
          name: "Despesas",
          path: "/finances/expenses",
          icon: "TrendingDown",
          description: "Despesas processuais",
          enabled: true
        }
      ]
    },
    {
      name: "Equipe",
      path: "/team",
      icon: "Users",
      description: "Gestão de equipe jurídica",
      enabled: true,
      order: 6,
      submodules: [
        {
          name: "Advogados",
          path: "/team/lawyers",
          icon: "Briefcase",
          description: "Gestão de advogados",
          enabled: true
        },
        {
          name: "Produtividade",
          path: "/team/productivity",
          icon: "TrendingUp",
          description: "Controle de produtividade",
          enabled: true
        },
        {
          name: "Tarefas",
          path: "/team/tasks",
          icon: "CheckSquare",
          description: "Distribuição de tarefas",
          enabled: true
        },
        {
          name: "Avaliações",
          path: "/team/reviews",
          icon: "Star",
          description: "Avaliação de desempenho",
          enabled: true
        }
      ]
    },
    {
      name: "Agenda",
      path: "/calendar",
      icon: "Calendar",
      description: "Agenda jurídica e prazos",
      enabled: true,
      order: 7,
      submodules: [
        {
          name: "Prazos",
          path: "/calendar/deadlines",
          icon: "Clock",
          description: "Prazos processuais",
          enabled: true
        },
        {
          name: "Audiências",
          path: "/calendar/hearings",
          icon: "Video",
          description: "Audiências e compromissos",
          enabled: true
        },
        {
          name: "Alertas",
          path: "/calendar/alerts",
          icon: "Bell",
          description: "Alertas e notificações",
          enabled: true
        }
      ]
    },
    {
      name: "ESG",
      path: "/esg",
      icon: "Leaf",
      description: "ESG e responsabilidade jurídica",
      enabled: true,
      order: 8,
      submodules: [
        {
          name: "Pro Bono",
          path: "/esg/probono",
          icon: "Heart",
          description: "Advocacia pro bono",
          enabled: true
        },
        {
          name: "Ética",
          path: "/esg/ethics",
          icon: "Shield",
          description: "Ética e diversidade",
          enabled: true
        },
        {
          name: "Impacto",
          path: "/esg/impact",
          icon: "BarChart",
          description: "Relatórios de impacto",
          enabled: true
        }
      ]
    }
  ],
  dashboardConfig: {
    widgets: ["active-cases", "upcoming-deadlines", "financial-summary", "client-activity"],
    defaultLayout: "legal-dashboard"
  },
  userRoles: ["admin", "partner", "associate", "intern", "paralegal", "financial"],
  defaultPermissions: {
    "admin": ["all"],
    "partner": ["view_all", "edit_all"],
    "associate": ["view_dashboard", "view_cases", "edit_cases", "view_documents", "edit_documents"],
    "intern": ["view_dashboard", "view_cases", "view_documents"],
    "paralegal": ["view_dashboard", "view_cases", "view_documents", "edit_documents"],
    "financial": ["view_dashboard", "view_finances", "edit_finances"]
  }
};
