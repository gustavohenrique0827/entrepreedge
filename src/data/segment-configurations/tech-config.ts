
import { SegmentModuleConfig } from '@/types/segment-types';

// Configuration for the Technology segment
export const techModuleConfig: SegmentModuleConfig = {
  modules: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "BarChart",
      description: "Visão geral da empresa",
      enabled: true,
      order: 1,
      submodules: []
    },
    {
      name: "Comercial",
      path: "/commercial",
      icon: "ShoppingCart",
      description: "Gestão comercial e pré-venda",
      enabled: true,
      order: 2,
      submodules: [
        {
          name: "Leads",
          path: "/commercial/leads",
          icon: "Users",
          description: "Gestão de leads e oportunidades",
          enabled: true
        },
        {
          name: "Propostas",
          path: "/commercial/proposals",
          icon: "FileText",
          description: "Propostas técnicas e comerciais",
          enabled: true
        },
        {
          name: "Contratos",
          path: "/commercial/contracts",
          icon: "FileCheck",
          description: "Contratos e licenciamentos",
          enabled: true
        },
        {
          name: "Metas",
          path: "/commercial/goals",
          icon: "Target",
          description: "Controle de metas",
          enabled: true
        }
      ]
    },
    {
      name: "Projetos",
      path: "/projects",
      icon: "Briefcase",
      description: "Gestão de projetos e produtos",
      enabled: true,
      order: 3,
      submodules: [
        {
          name: "Kanban",
          path: "/projects/kanban",
          icon: "Trello",
          description: "Gestão visual de projetos",
          enabled: true
        },
        {
          name: "Roadmap",
          path: "/projects/roadmap",
          icon: "Map",
          description: "Roadmap de produtos",
          enabled: true
        },
        {
          name: "Sprints",
          path: "/projects/sprints",
          icon: "Flag",
          description: "Gestão de sprints",
          enabled: true
        },
        {
          name: "Versões",
          path: "/projects/versions",
          icon: "GitBranch",
          description: "Controle de versões",
          enabled: true
        }
      ]
    },
    {
      name: "Suporte",
      path: "/support",
      icon: "Headphones",
      description: "Suporte e atendimento técnico",
      enabled: true,
      order: 4,
      submodules: [
        {
          name: "Tickets",
          path: "/support/tickets",
          icon: "MessageSquare",
          description: "Gestão de chamados",
          enabled: true
        },
        {
          name: "Base de Conhecimento",
          path: "/support/knowledge",
          icon: "Book",
          description: "Base de conhecimento",
          enabled: true
        },
        {
          name: "SLAs",
          path: "/support/slas",
          icon: "Clock",
          description: "Gestão de SLAs",
          enabled: true
        },
        {
          name: "Avaliações",
          path: "/support/ratings",
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
      order: 5,
      submodules: [
        {
          name: "Assinaturas",
          path: "/finances/subscriptions",
          icon: "Repeat",
          description: "Faturamento recorrente",
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
      description: "Gestão de equipe técnica",
      enabled: true,
      order: 6,
      submodules: [
        {
          name: "Desenvolvedores",
          path: "/team/developers",
          icon: "Code",
          description: "Gestão de desenvolvedores",
          enabled: true
        },
        {
          name: "Jornada",
          path: "/team/timesheet",
          icon: "Clock",
          description: "Controle de jornada",
          enabled: true
        },
        {
          name: "Metas",
          path: "/team/goals",
          icon: "Target",
          description: "Metas técnicas",
          enabled: true
        },
        {
          name: "Avaliações",
          path: "/team/reviews",
          icon: "CheckSquare",
          description: "Avaliações e feedbacks",
          enabled: true
        }
      ]
    },
    {
      name: "Segurança",
      path: "/security",
      icon: "Lock",
      description: "Segurança e conformidade",
      enabled: true,
      order: 7,
      submodules: [
        {
          name: "Acessos",
          path: "/security/access",
          icon: "Key",
          description: "Controle de acessos",
          enabled: true
        },
        {
          name: "LGPD",
          path: "/security/lgpd",
          icon: "Shield",
          description: "Conformidade com LGPD",
          enabled: true
        },
        {
          name: "Auditoria",
          path: "/security/audit",
          icon: "Search",
          description: "Auditoria de atividades",
          enabled: true
        },
        {
          name: "Políticas",
          path: "/security/policies",
          icon: "FileText",
          description: "Políticas de segurança",
          enabled: true
        }
      ]
    },
    {
      name: "ESG",
      path: "/esg",
      icon: "Leaf",
      description: "ESG e impacto social",
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
          description: "Projetos sociais",
          enabled: true
        },
        {
          name: "Sustentabilidade",
          path: "/esg/sustainability",
          icon: "Zap",
          description: "Sustentabilidade em TI",
          enabled: true
        }
      ]
    }
  ],
  dashboardConfig: {
    widgets: ["project-status", "support-metrics", "sales-pipeline", "team-productivity"],
    defaultLayout: "tech-dashboard"
  },
  userRoles: ["admin", "developer", "product_manager", "support", "sales", "financial"],
  defaultPermissions: {
    "admin": ["all"],
    "developer": ["view_dashboard", "view_projects", "edit_projects"],
    "product_manager": ["view_dashboard", "view_projects", "edit_projects", "view_roadmap", "edit_roadmap"],
    "support": ["view_dashboard", "view_support", "edit_support", "view_knowledge", "edit_knowledge"],
    "sales": ["view_dashboard", "view_commercial", "edit_commercial", "view_clients"],
    "financial": ["view_dashboard", "view_finances", "edit_finances"]
  }
};
