
import React from 'react';
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
} from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useSegment } from "@/contexts/SegmentContext";

type SidebarMainItem = {
  title: string;
  icon: JSX.Element;
  href: string;
  requiresFeature?: string;
};

const Sidebar = () => {
  const location = useLocation();
  const { hasAccess } = useSubscription();
  const { segmentName } = useSegment();
  
  const isActive = (path: string) => {
    return location.pathname === path;
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
    { title: "Dep. Pessoal", icon: <Users size={18} />, href: "/personnel", requiresFeature: "hr" },
  ];

  const collaborationItems: SidebarMainItem[] = [
    { title: "Aprendizado", icon: <BookOpen size={18} />, href: "/learn" },
    { title: "Inspiração", icon: <Star size={18} />, href: "/inspiration" },
    { title: "Agenda", icon: <CalendarDays size={18} />, href: "/calendar" },
    { title: "Chat", icon: <MessageCircle size={18} />, href: "/chat", requiresFeature: "communications" },
  ];
  
  // Nova seção para área contábil
  const accountingItems: SidebarMainItem[] = [
    { title: "Documentos", icon: <FileText size={18} />, href: "/accounting/documents", requiresFeature: "accounting" },
    { title: "Tributos", icon: <FileText size={18} />, href: "/accounting/taxes", requiresFeature: "accounting" },
    { title: "Relatórios", icon: <FileText size={18} />, href: "/accounting/reports", requiresFeature: "accounting" },
  ];

  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] border-r bg-sidebar border-sidebar-border transition-all duration-300 ease-in-out z-20">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="bg-primary rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold">
              {companyName.charAt(0).toUpperCase()}
            </div>
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

          {/* Área Contábil - Nova seção */}
          {hasAccess('accounting') && (
            <div className="px-3 py-2">
              <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                Área Contábil
              </div>
              {accountingItems.map((item) => (
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
              ))}
            </div>
          )}

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
