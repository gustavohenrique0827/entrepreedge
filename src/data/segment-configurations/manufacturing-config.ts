
import { SegmentModuleConfig } from '@/types/segment-types';

// Configuration for the Manufacturing segment
export const manufacturingModuleConfig: SegmentModuleConfig = {
  modules: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "BarChart",
      description: "Visão geral da indústria",
      enabled: true,
      order: 1,
      submodules: []
    },
    {
      name: "Produção",
      path: "/production",
      icon: "Settings",
      description: "Produção e operações",
      enabled: true,
      order: 2,
      submodules: [
        {
          name: "Ordens",
          path: "/production/orders",
          icon: "FileText",
          description: "Ordens de produção",
          enabled: true
        },
        {
          name: "PCP",
          path: "/production/planning",
          icon: "Calendar",
          description: "Planejamento e controle",
          enabled: true
        },
        {
          name: "Apontamentos",
          path: "/production/tracking",
          icon: "Clock",
          description: "Apontamentos de produção",
          enabled: true
        },
        {
          name: "Refugos",
          path: "/production/scrap",
          icon: "Trash",
          description: "Controle de refugos",
          enabled: true
        }
      ]
    },
    {
      name: "Estoque",
      path: "/inventory",
      icon: "Package",
      description: "Estoque e logística",
      enabled: true,
      order: 3,
      submodules: [
        {
          name: "Matérias-primas",
          path: "/inventory/raw-materials",
          icon: "Box",
          description: "Matérias-primas",
          enabled: true
        },
        {
          name: "Produtos",
          path: "/inventory/products",
          icon: "Package",
          description: "Produtos acabados",
          enabled: true
        },
        {
          name: "Movimentações",
          path: "/inventory/movements",
          icon: "RefreshCw",
          description: "Movimentações internas",
          enabled: true
        },
        {
          name: "Expedição",
          path: "/inventory/shipping",
          icon: "Truck",
          description: "Expedição e recebimento",
          enabled: true
        }
      ]
    },
    {
      name: "Engenharia",
      path: "/engineering",
      icon: "Sliders",
      description: "Engenharia e produtos",
      enabled: true,
      order: 4,
      submodules: [
        {
          name: "Produtos",
          path: "/engineering/products",
          icon: "Package",
          description: "Cadastro de produtos",
          enabled: true
        },
        {
          name: "BOM",
          path: "/engineering/bom",
          icon: "Layers",
          description: "Estrutura de produtos",
          enabled: true
        },
        {
          name: "Roteiros",
          path: "/engineering/routes",
          icon: "Map",
          description: "Roteiros de produção",
          enabled: true
        },
        {
          name: "Revisões",
          path: "/engineering/revisions",
          icon: "GitBranch",
          description: "Revisões de engenharia",
          enabled: true
        }
      ]
    },
    {
      name: "Custos",
      path: "/costs",
      icon: "DollarSign",
      description: "Custos e financeiro",
      enabled: true,
      order: 5,
      submodules: [
        {
          name: "Custo Padrão",
          path: "/costs/standard",
          icon: "Tag",
          description: "Custo padrão",
          enabled: true
        },
        {
          name: "Custo Real",
          path: "/costs/actual",
          icon: "Activity",
          description: "Custo real",
          enabled: true
        },
        {
          name: "Financeiro",
          path: "/costs/financial",
          icon: "Briefcase",
          description: "Gestão financeira",
          enabled: true
        },
        {
          name: "Fornecedores",
          path: "/costs/suppliers",
          icon: "Truck",
          description: "Gestão de fornecedores",
          enabled: true
        }
      ]
    },
    {
      name: "Qualidade",
      path: "/quality",
      icon: "CheckCircle",
      description: "Qualidade e inspeções",
      enabled: true,
      order: 6,
      submodules: [
        {
          name: "Inspeções",
          path: "/quality/inspections",
          icon: "Search",
          description: "Controle de inspeções",
          enabled: true
        },
        {
          name: "Não Conformidades",
          path: "/quality/nonconformities",
          icon: "AlertTriangle",
          description: "Não conformidades",
          enabled: true
        },
        {
          name: "CAPA",
          path: "/quality/capa",
          icon: "Tool",
          description: "Ações corretivas",
          enabled: true
        },
        {
          name: "Certificações",
          path: "/quality/certifications",
          icon: "Award",
          description: "Certificações",
          enabled: true
        }
      ]
    },
    {
      name: "Equipe",
      path: "/team",
      icon: "Users",
      description: "Equipe e segurança do trabalho",
      enabled: true,
      order: 7,
      submodules: [
        {
          name: "Operadores",
          path: "/team/operators",
          icon: "User",
          description: "Cadastro de operadores",
          enabled: true
        },
        {
          name: "Turnos",
          path: "/team/shifts",
          icon: "Clock",
          description: "Gestão de turnos",
          enabled: true
        },
        {
          name: "EPIs",
          path: "/team/ppe",
          icon: "Shield",
          description: "Controle de EPIs",
          enabled: true
        },
        {
          name: "Segurança",
          path: "/team/safety",
          icon: "AlertCircle",
          description: "Segurança do trabalho",
          enabled: true
        }
      ]
    },
    {
      name: "ESG",
      path: "/esg",
      icon: "Leaf",
      description: "ESG e sustentabilidade industrial",
      enabled: true,
      order: 8,
      submodules: [
        {
          name: "Ambiental",
          path: "/esg/environmental",
          icon: "Droplet",
          description: "Indicadores ambientais",
          enabled: true
        },
        {
          name: "Resíduos",
          path: "/esg/waste",
          icon: "Trash2",
          description: "Gestão de resíduos",
          enabled: true
        },
        {
          name: "Social",
          path: "/esg/social",
          icon: "Heart",
          description: "Projetos sociais",
          enabled: true
        },
        {
          name: "Governança",
          path: "/esg/governance",
          icon: "Shield",
          description: "Governança industrial",
          enabled: true
        }
      ]
    }
  ],
  dashboardConfig: {
    widgets: ["production-status", "quality-indicators", "inventory-levels", "efficiency-metrics"],
    defaultLayout: "manufacturing-dashboard"
  },
  userRoles: ["admin", "production_manager", "engineer", "quality", "inventory", "financial"],
  defaultPermissions: {
    "admin": ["all"],
    "production_manager": ["view_dashboard", "view_production", "edit_production", "view_team", "edit_team"],
    "engineer": ["view_dashboard", "view_engineering", "edit_engineering", "view_production"],
    "quality": ["view_dashboard", "view_quality", "edit_quality", "view_production"],
    "inventory": ["view_dashboard", "view_inventory", "edit_inventory"],
    "financial": ["view_dashboard", "view_costs", "edit_costs"]
  }
};
