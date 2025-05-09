
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSegment } from '@/contexts/SegmentContext';
import { useSupabase } from '@/contexts/SupabaseContext';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

import {
  BarChart2,
  Box,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Wallet,
  BookOpen,
  Heart,
  Stethoscope,
  GraduationCap,
  Store,
  Factory,
  Leaf,
  Scissors,
  Briefcase,
  Code,
  Scale,
  HardDrive,
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm transition-colors hover:bg-primary/10 w-full",
        isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
      )}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

export const SegmentSidebar: React.FC = () => {
  const { currentSegment, modulesForSegment, segmentName } = useSegment();
  const { isConfigured } = useSupabase();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Segment-specific menu icons
  const moduleIcons: Record<string, React.ReactNode> = {
    dashboard: <BarChart2 size={18} />,
    finances: <Wallet size={18} />,
    goals: <BarChart2 size={18} />,
    products: <Package size={18} />,
    inventory: <Box size={18} />,
    customers: <Users size={18} />,
    transactions: <FileText size={18} />,
    reports: <FileText size={18} />,
    accounts: <Wallet size={18} />,
    categories: <FileText size={18} />,
    exports: <FileText size={18} />,
    patients: <Heart size={18} />,
    appointments: <Calendar size={18} />,
    exams: <Stethoscope size={18} />,
    prescriptions: <FileText size={18} />,
    students: <Users size={18} />,
    courses: <BookOpen size={18} />,
    enrollments: <FileText size={18} />,
    certificates: <FileText size={18} />,
    grades: <FileText size={18} />,
    orders: <ShoppingBag size={18} />,
    payments: <Wallet size={18} />,
    shipping: <Package size={18} />,
    machines: <Factory size={18} />,
    'production-orders': <FileText size={18} />,
    maintenance: <Settings size={18} />,
    'quality-control': <FileText size={18} />,
    crops: <Leaf size={18} />,
    livestock: <FileText size={18} />,
    machinery: <HardDrive size={18} />,
    weather: <FileText size={18} />,
    soil: <FileText size={18} />,
    collections: <Scissors size={18} />,
    trends: <FileText size={18} />,
    suppliers: <FileText size={18} />,
    marketing: <FileText size={18} />,
    clients: <Briefcase size={18} />,
    scheduling: <Calendar size={18} />,
    billing: <FileText size={18} />,
    feedback: <FileText size={18} />,
    projects: <Code size={18} />,
    resources: <FileText size={18} />,
    development: <FileText size={18} />,
    support: <FileText size={18} />,
    cases: <Scale size={18} />,
    documents: <FileText size={18} />,
    production: <Factory size={18} />,
    quality: <FileText size={18} />
  };

  // Segment-specific module labels in Portuguese
  const moduleLabels: Record<string, string> = {
    dashboard: 'Dashboard',
    finances: 'Finanças',
    goals: 'Metas',
    products: 'Produtos',
    inventory: 'Estoque',
    customers: 'Clientes',
    transactions: 'Transações',
    reports: 'Relatórios',
    accounts: 'Contas',
    categories: 'Categorias',
    exports: 'Exportações',
    patients: 'Pacientes',
    appointments: 'Consultas',
    exams: 'Exames',
    prescriptions: 'Prescrições',
    students: 'Alunos',
    courses: 'Cursos',
    enrollments: 'Matrículas',
    certificates: 'Certificados',
    grades: 'Notas',
    orders: 'Pedidos',
    payments: 'Pagamentos',
    shipping: 'Entregas',
    machines: 'Máquinas',
    'production-orders': 'Ordens de Produção',
    maintenance: 'Manutenção',
    'quality-control': 'Controle de Qualidade',
    crops: 'Culturas',
    livestock: 'Rebanho',
    machinery: 'Maquinário',
    weather: 'Clima',
    soil: 'Solo',
    collections: 'Coleções',
    trends: 'Tendências',
    suppliers: 'Fornecedores',
    marketing: 'Marketing',
    clients: 'Clientes',
    scheduling: 'Agenda',
    billing: 'Faturamento',
    feedback: 'Feedback',
    projects: 'Projetos',
    resources: 'Recursos',
    development: 'Desenvolvimento',
    support: 'Suporte',
    cases: 'Casos',
    documents: 'Documentos',
    production: 'Produção',
    quality: 'Qualidade'
  };

  // Get modules for current segment
  const modules = currentSegment ? modulesForSegment(currentSegment) : [];

  // Get segment icon for header
  const getSegmentIcon = () => {
    switch (currentSegment) {
      case 'sales': return <ShoppingBag size={20} />;
      case 'financial': return <Wallet size={20} />;
      case 'health': return <Stethoscope size={20} />;
      case 'education': return <GraduationCap size={20} />;
      case 'ecommerce': return <Store size={20} />;
      case 'industrial': return <Factory size={20} />;
      case 'agro': return <Leaf size={20} />;
      case 'fashion': return <Scissors size={20} />;
      case 'services': return <Briefcase size={20} />;
      case 'tech': return <Code size={20} />;
      case 'legal': return <Scale size={20} />;
      case 'manufacturing': return <Factory size={20} />;
      default: return <Home size={20} />;
    }
  };

  // Check if the segment is configured
  const isSegmentConfigured = currentSegment ? isConfigured(currentSegment) : false;

  // If no segment or segment not configured, show placeholder
  if (!currentSegment || !isSegmentConfigured) {
    return (
      <div className={cn(
        "h-full bg-muted/5 border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-60"
      )}>
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && <span className="font-semibold">Segmento</span>}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          <p className={cn("text-muted-foreground text-center text-sm", 
            collapsed && "hidden"
          )}>
            Nenhum segmento selecionado ou configurado.
          </p>
          <Button 
            variant="outline" 
            className={cn("mt-4", collapsed && "hidden")}
            onClick={() => navigate("/settings")}
          >
            Configurar Segmento
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "h-full bg-muted/5 border-r transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            {getSegmentIcon()}
            <span className="font-semibold">{segmentName}</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <div className="flex-1 py-4 overflow-auto">
        <nav className="space-y-1 px-2">
          {/* Common menu items */}
          <SidebarItem 
            to="/" 
            icon={<Home size={18} />} 
            label="Início" 
            isActive={location.pathname === '/'}
          />

          <SidebarItem 
            to="/dashboard" 
            icon={<BarChart2 size={18} />} 
            label="Dashboard" 
            isActive={location.pathname === '/dashboard'}
          />

          {/* Segment-specific modules */}
          {modules.map((module) => (
            <SidebarItem
              key={module}
              to={`/modules/${currentSegment}/${module}`}
              icon={moduleIcons[module] || <FileText size={18} />}
              label={!collapsed ? moduleLabels[module] || module : ''}
              isActive={location.pathname === `/modules/${currentSegment}/${module}`}
            />
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <SidebarItem
          to="/settings"
          icon={<Settings size={18} />}
          label={!collapsed ? "Configurações" : ''}
          isActive={location.pathname.startsWith('/settings')}
        />
      </div>
    </div>
  );
};
