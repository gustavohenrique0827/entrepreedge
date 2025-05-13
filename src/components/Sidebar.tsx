
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  BarChartBig,
  BookOpen,
  CalendarDays,
  CircleUserRound,
  FileText,
  Goal,
  HelpCircle,
  Home,
  Leaf,
  LineChart,
  MessageCircle,
  Settings,
  Star,
  Target,
  Users,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Clock,
  FileSpreadsheet,
  UserPlus,
  UserCheck,
  GraduationCap,
  Receipt,
  Building2,
  FilePieChart,
  FileBarChart,
  LayoutDashboard,
  ClipboardCheck,
  Tag,
  Code,
  Lock,
  Building,
  BarChart,
  HeadphonesIcon,
  Package,
  Layers
} from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useSegment } from "@/contexts/SegmentContext";
import { Icon } from './ui/icon';

type SidebarMainItem = {
  title: string;
  icon: JSX.Element;
  href: string;
  requiresFeature?: string;
};

type SidebarSubItem = {
  title: string;
  href: string;
  icon?: JSX.Element;
};

type SidebarCollapsibleItem = {
  title: string;
  icon: JSX.Element;
  items: SidebarSubItem[];
  requiresFeature?: string;
  open?: boolean;
};

const Sidebar = () => {
  const location = useLocation();
  const { hasAccess } = useSubscription();
  const { segmentName, currentSegment, segmentActivities } = useSegment();
  
  const [segmentMenuOpen, setSegmentMenuOpen] = useState(false);
  const [personnelOpen, setPersonnelOpen] = useState(false);
  const [accountingOpen, setAccountingOpen] = useState(false);
  const [devAdminOpen, setDevAdminOpen] = useState(false);
  
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'Sua Empresa');
  const [logoUrl, setLogoUrl] = useState(localStorage.getItem('logoUrl') || '');
  
  useEffect(() => {
    const handleStorageChange = () => {
      setCompanyName(localStorage.getItem('companyName') || 'Sua Empresa');
      setLogoUrl(localStorage.getItem('logoUrl') || '');
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const checkInterval = setInterval(() => {
      const storedLogo = localStorage.getItem('logoUrl') || '';
      const storedName = localStorage.getItem('companyName') || 'Sua Empresa';
      
      if (storedLogo !== logoUrl) {
        setLogoUrl(storedLogo);
      }
      
      if (storedName !== companyName) {
        setCompanyName(storedName);
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkInterval);
    };
  }, [logoUrl, companyName]);
  
  useEffect(() => {
    if (location.pathname.startsWith('/segment')) {
      setSegmentMenuOpen(true);
    }
    if (location.pathname.startsWith('/personnel')) {
      setPersonnelOpen(true);
    }
    if (location.pathname.startsWith('/accounting')) {
      setAccountingOpen(true);
    }
    if (location.pathname.startsWith('/dev-admin')) {
      setDevAdminOpen(true);
    }
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isInPath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const sidebarMainItems: SidebarMainItem[] = [
    { title: "Dashboard", icon: <Home size={18} />, href: "/dashboard" },
    { title: "Finanças", icon: <BarChartBig size={18} />, href: "/finances", requiresFeature: "financial" },
    { title: "Metas", icon: <Goal size={18} />, href: "/goals", requiresFeature: "goals" },
  ];

  const analyticsItems: SidebarMainItem[] = [
    { title: "Benchmarking", icon: <LineChart size={18} />, href: "/benchmarking" },
    { title: "Simulador", icon: <Target size={18} />, href: "/simulator" },
    { title: "ESG", icon: <Leaf size={18} />, href: "/esg" },
  ];

  const collaborationItems: SidebarMainItem[] = [
    { title: "Aprendizado", icon: <BookOpen size={18} />, href: "/learn" },
    { title: "Inspiração", icon: <Star size={18} />, href: "/inspiration" },
    { title: "Agenda", icon: <CalendarDays size={18} />, href: "/calendar" },
    { title: "Chat", icon: <MessageCircle size={18} />, href: "/chat", requiresFeature: "communications" },
  ];

  const personnelItems = [
    { title: "Colaboradores", href: "/personnel/employees", icon: <Users size={16} /> },
    { title: "Ponto Eletrônico", href: "/personnel/time-tracking", icon: <Clock size={16} /> },
    { title: "Holerites", href: "/personnel/payslips", icon: <FileSpreadsheet size={16} /> },
    { title: "Admissões", href: "/personnel/hiring", icon: <UserPlus size={16} /> },
    { title: "Processos de RH", href: "/personnel/processes", icon: <GraduationCap size={16} /> },
  ];

  const accountingItems = [
    { title: "Visão Geral", href: "/accounting/overview", icon: <LayoutDashboard size={16} /> },
    { title: "Lançamentos Contábeis", href: "/accounting/entries", icon: <FileText size={16} /> },
    { title: "Fiscal", href: "/accounting/fiscal", icon: <ClipboardCheck size={16} /> },
    { title: "Tributos", href: "/accounting/taxes", icon: <Building2 size={16} /> },
    { title: "Notas Fiscais", href: "/accounting/invoices", icon: <Receipt size={16} /> },
    { title: "Relatórios", href: "/accounting/reports", icon: <FilePieChart size={16} /> },
    { title: "MEI", href: "/accounting/mei", icon: <Tag size={16} /> },
    { title: "DRE", href: "/accounting/financial-statements", icon: <FileBarChart size={16} /> },
  ];

  const devAdminItems = [
    { title: "Processos Personalizados", href: "/dev-admin/custom-processes", icon: <Code size={16} /> },
    { title: "Níveis de Acesso", href: "/dev-admin/access-levels", icon: <Lock size={16} /> },
    { title: "Empresas", href: "/dev-admin/companies", icon: <Building size={16} /> },
    { title: "Relatórios", href: "/dev-admin/reports", icon: <BarChart size={16} /> },
    { title: "Planos", href: "/dev-admin/plans", icon: <Package size={16} /> },
    { title: "Suporte", href: "/dev-admin/support", icon: <HeadphonesIcon size={16} /> },
  ];

  useEffect(() => {
    const prefs = localStorage.getItem('primaryColor') || '#8B5CF6';
    if (prefs) {
      document.documentElement.style.setProperty('--sidebar-accent', `${prefs}15`);
      document.documentElement.style.setProperty('--sidebar-primary', prefs);
    }
  }, [currentSegment]);

  // Map the icon string from segmentActivities to a Lucide component
  const getIconComponent = (iconName: string, size: number = 16) => {
    try {
      // Common icons used in the app
      switch (iconName) {
        case 'package': return <Package size={size} />;
        case 'list-ordered': return <ClipboardCheck size={size} />;
        case 'shopping-cart': return <Receipt size={size} />;
        case 'wrench': return <Settings size={size} />;
        case 'truck': return <Building2 size={size} />;
        case 'file-text': return <FileText size={size} />;
        case 'user-plus': return <UserPlus size={size} />;
        case 'book': return <BookOpen size={size} />;
        case 'user-check': return <UserCheck size={size} />;
        case 'edit': return <FileText size={size} />;
        case 'award': return <Star size={size} />;
        case 'calendar': return <CalendarDays size={size} />;
        case 'folder-open': return <FileText size={size} />;
        case 'calendar-clock': return <Clock size={size} />;
        case 'users': return <Users size={size} />;
        case 'chart-bar': return <BarChart size={size} />;
        case 'kanban': return <Layers size={size} />;
        case 'headphones': return <HeadphonesIcon size={size} />;
        case 'git-branch': return <Code size={size} />;
        case 'settings': return <Settings size={size} />;
        case 'chart-line': return <LineChart size={size} />;
        case 'clipboard-list': return <ClipboardCheck size={size} />;
        case 'calendar-check': return <CalendarDays size={size} />;
        case 'file-contract': return <FileText size={size} />;
        case 'message-square': return <MessageCircle size={size} />;
        case 'grid-2x2': return <Layers size={size} />;
        case 'image': return <FileText size={size} />;
        case 'repeat': return <Code size={size} />;
        case 'bed': return <Building2 size={size} />;
        case 'pill': return <Package size={size} />;
        case 'file-invoice': return <FileText size={size} />;
        case 'dollar-sign': return <BarChartBig size={size} />;
        case 'credit-card': return <BarChartBig size={size} />;
        case 'megaphone': return <MessageCircle size={size} />;
        case 'map': return <FileText size={size} />;
        case 'wifi': return <Code size={size} />;
        case 'layout-grid': return <Layers size={size} />;
        default: return <FileText size={size} />;
      }
    } catch (error) {
      console.error(`Error loading icon: ${iconName}`, error);
      return <FileText size={size} />;
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] border-r bg-sidebar border-sidebar-border transition-all duration-300 ease-in-out z-20">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 no-underline">
            {logoUrl ? (
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                <img src={logoUrl} alt={companyName} className="max-w-full max-h-full object-contain" />
              </div>
            ) : (
              <div className="bg-primary rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold">
                {companyName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-medium text-sidebar-foreground truncate">
              {companyName}
            </span>
          </Link>
          <div className="text-xs text-sidebar-foreground/70 mt-1 ml-10">
            {segmentName}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto pb-6">
          <div className="px-3 py-2">
            <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              Principal
            </div>
            {sidebarMainItems.map((item) => (
              (!item.requiresFeature || hasAccess(item.requiresFeature)) && (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 no-underline",
                    isActive(item.href)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )
            ))}
          </div>

          {/* Segment-specific Activities Section */}
          {segmentActivities.length > 0 && (
            <div className="px-3 py-2">
              <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                Atividades do Segmento
              </div>
              <div
                className={cn(
                  "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 cursor-pointer",
                  isInPath("/segment")
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80"
                )}
                onClick={() => setSegmentMenuOpen(!segmentMenuOpen)}
              >
                <div className="flex items-center gap-3">
                  <Layers size={18} />
                  <span>Atividades do {segmentName}</span>
                </div>
                {segmentMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              
              {segmentMenuOpen && (
                <div className="ml-9 space-y-1 mt-1">
                  {segmentActivities.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground no-underline",
                        isActive(item.path)
                          ? "bg-sidebar-accent/50 text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70"
                      )}
                    >
                      {getIconComponent(item.icon)}
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="px-3 py-2">
            <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              Analytics
            </div>
            {analyticsItems.map((item) => (
              (!item.requiresFeature || hasAccess(item.requiresFeature)) && (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 no-underline",
                    isActive(item.href)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )
            ))}
          </div>

          <div className="px-3 py-2">
            <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              Departamento Pessoal
            </div>
            <div
              className={cn(
                "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 cursor-pointer",
                isInPath("/personnel")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80"
              )}
              onClick={() => setPersonnelOpen(!personnelOpen)}
            >
              <div className="flex items-center gap-3">
                <Briefcase size={18} />
                <span>Departamento Pessoal</span>
              </div>
              {personnelOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            
            {personnelOpen && (
              <div className="ml-9 space-y-1 mt-1">
                {personnelItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground no-underline",
                      isActive(item.href)
                        ? "bg-sidebar-accent/50 text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="px-3 py-2">
            <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              Área Contábil
            </div>
            <div
              className={cn(
                "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 cursor-pointer",
                isInPath("/accounting")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80"
              )}
              onClick={() => setAccountingOpen(!accountingOpen)}
            >
              <div className="flex items-center gap-3">
                <FileText size={18} />
                <span>Área Contábil</span>
              </div>
              {accountingOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            
            {accountingOpen && (
              <div className="ml-9 space-y-1 mt-1">
                {accountingItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground no-underline",
                      isActive(item.href)
                        ? "bg-sidebar-accent/50 text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="px-3 py-2">
            <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              Dev / Admin
            </div>
            <div
              className={cn(
                "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 cursor-pointer",
                isInPath("/dev-admin")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80"
              )}
              onClick={() => setDevAdminOpen(!devAdminOpen)}
            >
              <div className="flex items-center gap-3">
                <Code size={18} />
                <span>Dev / Admin</span>
              </div>
              {devAdminOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            
            {devAdminOpen && (
              <div className="ml-9 space-y-1 mt-1">
                {devAdminItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground no-underline",
                      isActive(item.href)
                        ? "bg-sidebar-accent/50 text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="px-3 py-2">
            <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              Colaboração
            </div>
            {collaborationItems.map((item) => (
              (!item.requiresFeature || hasAccess(item.requiresFeature)) && (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 no-underline",
                    isActive(item.href)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )
            ))}
          </div>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 no-underline",
              isActive("/settings")
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80"
            )}
          >
            <Settings size={18} />
            Configurações
          </Link>
          <Link
            to="/help"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 no-underline",
              isActive("/help")
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80"
            )}
          >
            <HelpCircle size={18} />
            Ajuda
          </Link>
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground no-underline",
              isActive("/profile")
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80"
            )}
          >
            <CircleUserRound size={18} />
            Perfil
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
