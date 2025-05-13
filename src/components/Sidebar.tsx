
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Settings, HelpCircle, CircleUserRound } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useSegment } from "@/contexts/SegmentContext";
import { getNavItemsBySegment } from "@/utils/navigationUtils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Define proper TypeScript interfaces for navigation items
interface NavSubItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  subItems?: NavSubItem[];
}

const Sidebar = () => {
  const location = useLocation();
  const { hasAccess } = useSubscription();
  const { segmentName, currentSegment } = useSegment();
  
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'Sua Empresa');
  const [logoUrl, setLogoUrl] = useState(localStorage.getItem('logoUrl') || '');
  
  // State to track open menu sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
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
    const prefs = localStorage.getItem('primaryColor') || '#8B5CF6';
    if (prefs) {
      document.documentElement.style.setProperty('--sidebar-accent', `${prefs}15`);
      document.documentElement.style.setProperty('--sidebar-primary', prefs);
    }
  }, [currentSegment]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Toggle a collapsible section
  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };
  
  // Auto-expand sections that contain the current active route
  useEffect(() => {
    const navItems = getNavItemsBySegment(currentSegment);
    
    navItems.forEach((item: NavItem) => {
      if (item.subItems && item.subItems.some(subItem => isActive(subItem.href))) {
        setOpenSections(prev => ({
          ...prev,
          [item.name]: true
        }));
      }
    });
  }, [location.pathname, currentSegment]);

  // Get navigation items for current segment
  const navItems = getNavItemsBySegment(currentSegment) as NavItem[];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] border-r bg-sidebar border-sidebar-border transition-all duration-300 ease-in-out z-20 overflow-y-auto">
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

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {navItems.map((item, index) => (
            <div key={`${item.name}-${index}`} className="mb-2">
              {item.subItems ? (
                <Collapsible 
                  open={openSections[item.name]} 
                  onOpenChange={() => toggleSection(item.name)}
                  className="w-full"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground no-underline text-sidebar-foreground/80">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    {openSections[item.name] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-2 pl-3 border-l border-sidebar-border mt-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={`${subItem.name}-${subIndex}`}
                          to={subItem.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-1 no-underline",
                            isActive(subItem.href)
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground/80"
                          )}
                        >
                          {subItem.icon}
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-2 no-underline",
                    isActive(item.href)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )}
            </div>
          ))}
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
