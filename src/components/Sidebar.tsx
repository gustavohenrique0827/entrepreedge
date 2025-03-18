
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { 
  Home, 
  BarChart2, 
  Target, 
  BookOpen, 
  Mail, 
  Menu, 
  X, 
  Settings, 
  User,
  HelpCircle,
  LayoutDashboard
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Início', 
      href: '/', 
      icon: <Home className="h-5 w-5" />,
      active: location.pathname === '/'
    },
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: location.pathname === '/dashboard'
    },
    { 
      name: 'Finanças', 
      href: '/finances', 
      icon: <BarChart2 className="h-5 w-5" />,
      active: location.pathname === '/finances'
    },
    { 
      name: 'Metas', 
      href: '/goals', 
      icon: <Target className="h-5 w-5" />,
      active: location.pathname === '/goals'
    },
    { 
      name: 'Aprendizado', 
      href: '/learn', 
      icon: <BookOpen className="h-5 w-5" />,
      active: location.pathname === '/learn'
    },
    { 
      name: 'Contato', 
      href: '/contact', 
      icon: <Mail className="h-5 w-5" />,
      active: location.pathname === '/contact'
    },
  ];

  const bottomMenuItems = [
    { 
      name: 'Configurações', 
      href: '/settings', 
      icon: <Settings className="h-5 w-5" />,
      active: location.pathname === '/settings'
    },
    { 
      name: 'Perfil', 
      href: '/profile', 
      icon: <User className="h-5 w-5" />,
      active: location.pathname === '/profile'
    },
    { 
      name: 'Ajuda', 
      href: '/help', 
      icon: <HelpCircle className="h-5 w-5" />,
      active: location.pathname === '/help'
    },
  ];

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className={cn("flex items-center p-4", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed && (
              <Link to="/" className="flex items-center">
                <div className="bg-primary rounded-md p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L17 7H14V13H10V7H7L12 2Z" fill="white" />
                    <path d="M19 14H5V17H19V14Z" fill="white" />
                    <path d="M17 18H7V22H17V18Z" fill="white" />
                  </svg>
                </div>
                <span className="ml-2 text-lg font-semibold">EntrepreEdge</span>
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {collapsed ? <Menu /> : <X />}
            </Button>
          </div>

          <div className="px-3 py-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                    collapsed && "justify-center"
                  )}
                >
                  {item.icon}
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="px-3 py-4 border-t border-sidebar-border">
          <nav className="space-y-1">
            {bottomMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors",
                  item.active && "bg-sidebar-accent text-sidebar-accent-foreground",
                  collapsed && "justify-center"
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
