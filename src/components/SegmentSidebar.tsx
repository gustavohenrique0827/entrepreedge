
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSegment } from '@/contexts/SegmentContext';
import { useSupabase } from '@/contexts/SupabaseContext';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import fs from 'fs';

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
  Folder,
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, isActive, isCollapsed }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm transition-colors hover:bg-primary/10 w-full",
        isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
      )}
    >
      <div className="mr-3">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

interface SegmentModule {
  path: string;
  name: string;
  icon: React.ReactNode;
}

export const SegmentSidebar: React.FC = () => {
  const { currentSegment, segmentName, getDirectoryPath, isGlobalPage } = useSegment();
  const { isConfigured } = useSupabase();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(localStorage.getItem('sidebarCollapsed') === 'true');
  const [segmentModules, setSegmentModules] = useState<SegmentModule[]>([]);

  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

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
    quality: <FileText size={18} />,
    accounting: <FileText size={18} />
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
    quality: 'Qualidade',
    accounting: 'Contabilidade',
    crm: 'CRM & Comercial',
    financial: 'Financeiro',
    fiscal: 'Fiscal & Contábil',
    personnel: 'Recursos Humanos',
    admin: 'Administração',
    training: 'Treinamento',
    esg: 'ESG'
  };

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

  // Define segment-specific module structures based on user description
  const segmentModuleStructure: Record<string, SegmentModule[]> = {
    sales: [
      { path: "/crm", name: "CRM & Comercial", icon: <Users size={18} /> },
      { path: "/financial", name: "Financeiro", icon: <Wallet size={18} /> },
      { path: "/fiscal", name: "Fiscal & Contábil", icon: <FileText size={18} /> },
      { path: "/personnel", name: "Recursos Humanos", icon: <Users size={18} /> },
      { path: "/admin", name: "Administração & Gestão", icon: <Briefcase size={18} /> },
      { path: "/training", name: "Treinamento & Educação", icon: <GraduationCap size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    health: [
      { path: "/patients", name: "Atendimento & Gestão de Pacientes", icon: <Users size={18} /> },
      { path: "/financial", name: "Financeiro", icon: <Wallet size={18} /> },
      { path: "/fiscal", name: "Fiscal & Contábil", icon: <FileText size={18} /> },
      { path: "/personnel", name: "Recursos Humanos", icon: <Users size={18} /> },
      { path: "/admin", name: "Administração & Gestão", icon: <Briefcase size={18} /> },
      { path: "/training", name: "Treinamento & Educação", icon: <GraduationCap size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    agro: [
      { path: "/production", name: "Produção & Operações", icon: <Factory size={18} /> },
      { path: "/crm", name: "CRM & Comercial", icon: <Users size={18} /> },
      { path: "/financial", name: "Financeiro", icon: <Wallet size={18} /> },
      { path: "/fiscal", name: "Fiscal & Contábil", icon: <FileText size={18} /> },
      { path: "/personnel", name: "Recursos Humanos", icon: <Users size={18} /> },
      { path: "/admin", name: "Administração & Gestão", icon: <Briefcase size={18} /> },
      { path: "/training", name: "Treinamento & Educação", icon: <GraduationCap size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    education: [
      { path: "/academic", name: "Acadêmico & Pedagógico", icon: <BookOpen size={18} /> },
      { path: "/secretary", name: "Secretaria & Atendimento", icon: <FileText size={18} /> },
      { path: "/financial", name: "Financeiro", icon: <Wallet size={18} /> },
      { path: "/fiscal", name: "Fiscal & Contábil", icon: <FileText size={18} /> },
      { path: "/personnel", name: "Recursos Humanos", icon: <Users size={18} /> },
      { path: "/admin", name: "Administração & Gestão", icon: <Briefcase size={18} /> },
      { path: "/training", name: "EAD & Treinamento", icon: <GraduationCap size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    ecommerce: [
      { path: "/products", name: "Produtos & Estoque", icon: <Package size={18} /> },
      { path: "/orders", name: "Pedidos & Entregas", icon: <Box size={18} /> },
      { path: "/customers", name: "Clientes & CRM", icon: <Users size={18} /> },
      { path: "/financial", name: "Pagamentos & Financeiro", icon: <Wallet size={18} /> },
      { path: "/marketing", name: "Vendas & Marketing", icon: <BarChart2 size={18} /> },
      { path: "/fiscal", name: "Fiscal & Nota Fiscal", icon: <FileText size={18} /> },
      { path: "/support", name: "Suporte & Atendimento", icon: <Briefcase size={18} /> },
      { path: "/admin", name: "Configurações & Administração", icon: <Settings size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    fashion: [
      { path: "/collections", name: "Coleções & Produtos", icon: <Scissors size={18} /> },
      { path: "/sales", name: "Vendas & Canais", icon: <ShoppingBag size={18} /> },
      { path: "/inventory", name: "Estoque & Logística", icon: <Box size={18} /> },
      { path: "/financial", name: "Financeiro", icon: <Wallet size={18} /> },
      { path: "/customers", name: "Clientes & CRM", icon: <Users size={18} /> },
      { path: "/production", name: "Produção & Fornecedores", icon: <Factory size={18} /> },
      { path: "/marketing", name: "Marketing", icon: <BarChart2 size={18} /> },
      { path: "/personnel", name: "Recursos Humanos", icon: <Users size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    services: [
      { path: "/services", name: "Gestão de Serviços", icon: <Briefcase size={18} /> },
      { path: "/customers", name: "Clientes & Atendimento", icon: <Users size={18} /> },
      { path: "/financial", name: "Financeiro", icon: <Wallet size={18} /> },
      { path: "/personnel", name: "Equipes & Profissionais", icon: <Users size={18} /> },
      { path: "/operations", name: "Operações & Execução", icon: <Settings size={18} /> },
      { path: "/quality", name: "Indicadores & Qualidade", icon: <BarChart2 size={18} /> },
      { path: "/training", name: "Treinamento & Capacitação", icon: <GraduationCap size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    tech: [
      { path: "/sales", name: "Comercial & Pré-venda", icon: <Briefcase size={18} /> },
      { path: "/projects", name: "Projetos & Produtos", icon: <Package size={18} /> },
      { path: "/support", name: "Suporte & Atendimento", icon: <Briefcase size={18} /> },
      { path: "/financial", name: "Financeiro", icon: <Wallet size={18} /> },
      { path: "/personnel", name: "Equipe Técnica & RH", icon: <Users size={18} /> },
      { path: "/security", name: "Segurança & Conformidade", icon: <Settings size={18} /> },
      { path: "/training", name: "Treinamento & Inovação", icon: <GraduationCap size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    legal: [
      { path: "/cases", name: "Gestão de Processos", icon: <Scale size={18} /> },
      { path: "/documents", name: "Documentos & Contratos", icon: <FileText size={18} /> },
      { path: "/customers", name: "Clientes & Atendimento", icon: <Users size={18} /> },
      { path: "/financial", name: "Financeiro", icon: <Wallet size={18} /> },
      { path: "/personnel", name: "Equipe & RH", icon: <Users size={18} /> },
      { path: "/calendar", name: "Agenda & Prazos", icon: <Calendar size={18} /> },
      { path: "/compliance", name: "Compliance & Governança", icon: <Settings size={18} /> },
      { path: "/esg", name: "ESG", icon: <Leaf size={18} /> }
    ],
    manufacturing: [
      { path: "/production", name: "Produção & Operações", icon: <Factory size={18} /> },
      { path: "/inventory", name: "Estoque & Logística", icon: <Box size={18} /> },
      { path: "/engineering", name: "Engenharia & Produtos", icon: <Settings size={18} /> },
      { path: "/financial", name: "Custos & Financeiro", icon: <Wallet size={18} /> },
      { path: "/quality", name: "Qualidade & Inspeções", icon: <FileText size={18} /> },
      { path: "/personnel", name: "Equipe & Segurança", icon: <Users size={18} /> },
      { path: "/sales", name: "Comercial & Planejamento", icon: <BarChart2 size={18} /> },
      { path: "/esg", name: "ESG & Sustentabilidade", icon: <Leaf size={18} /> }
    ]
  };

  // Load segment-specific modules
  useEffect(() => {
    if (currentSegment && segmentModuleStructure[currentSegment]) {
      setSegmentModules(segmentModuleStructure[currentSegment]);
    } else {
      setSegmentModules([]);
    }
  }, [currentSegment]);

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
            onClick={toggleCollapse}
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

  // Get the segment's directory path
  const dirPath = getDirectoryPath();

  return (
    <div className={cn(
      "h-full bg-muted/5 border-r transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            {getSegmentIcon()}
            <span className="font-semibold truncate">{segmentName}</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={toggleCollapse}
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
            isCollapsed={collapsed}
          />

          <SidebarItem 
            to="/dashboard" 
            icon={<BarChart2 size={18} />} 
            label="Dashboard" 
            isActive={location.pathname === '/dashboard'}
            isCollapsed={collapsed}
          />

          {/* Accounting should be available for all segments */}
          <SidebarItem
            to="/accounting"
            icon={<FileText size={18} />}
            label="Contabilidade"
            isActive={location.pathname.startsWith('/accounting')}
            isCollapsed={collapsed}
          />

          {/* Segment-specific modules */}
          {dirPath && (
            <div className={cn("mt-6", !collapsed && "mb-2")}>
              {!collapsed && <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Módulos</div>}
              <div className="mt-2">
                {segmentModules.map((module) => (
                  <SidebarItem
                    key={module.path}
                    to={`/${dirPath}${module.path}`}
                    icon={module.icon}
                    label={module.name}
                    isActive={location.pathname.startsWith(`/${dirPath}${module.path}`)}
                    isCollapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>

      <div className="p-4 border-t">
        <SidebarItem
          to="/settings"
          icon={<Settings size={18} />}
          label="Configurações"
          isActive={location.pathname.startsWith('/settings')}
          isCollapsed={collapsed}
        />
      </div>
    </div>
  );
};

export default SegmentSidebar;
