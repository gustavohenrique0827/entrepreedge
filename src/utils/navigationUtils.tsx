
import React from 'react';
import { BusinessSegmentType } from '@/contexts/SegmentContext';
import { Home, BarChart2, Target, BookOpen, Users, DollarSign, ShoppingBag, Calendar, PieChart, Settings, Package, FileText, Briefcase, Truck, Database, HeartPulse, Scissors, Cloud } from 'lucide-react';

// Define the navigation items for different segments
export const getNavItemsBySegment = (segment: BusinessSegmentType) => {
  const commonItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <DollarSign size={18} />
    },
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    }
  ];

  // Segment-specific navigation items
  const segmentItems = {
    // E-commerce segment
    ecommerce: [
      ...commonItems,
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
    ],
    
    // Tech segment
    tech: [
      ...commonItems,
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
    ],
    
    // Manufacturing segment
    manufacturing: [
      ...commonItems,
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
    ],
    
    // Legal segment
    legal: [
      ...commonItems,
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
    ],
    
    // Fashion segment
    fashion: [
      ...commonItems,
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
    ],
    
    // Services segment
    services: [
      ...commonItems,
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
    ],
    
    // Health segment
    health: [
      ...commonItems,
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
    ],
    
    // Agro segment
    agro: [
      ...commonItems,
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
    ],
    
    // Education segment
    education: [
      ...commonItems,
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
    ],
    
    // Generic segment (default)
    generic: commonItems
  };

  return segmentItems[segment] || commonItems;
};
