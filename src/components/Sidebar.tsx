
import * as React from "react"
import { Link, useLocation } from 'react-router-dom'
import { SidebarProvider, Sidebar as SidebarComponent, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar"
import { 
  Home, 
  BarChart2, 
  Target, 
  BookOpen, 
  Settings, 
  HelpCircle, 
  Users,
  Clock,
  Briefcase,
  CalendarDays,
  Building,
  Lightbulb,
  BarChart,
  ShieldCheck
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useSubscription } from "@/contexts/SubscriptionContext"

export const Sidebar = (props) => {
  const location = useLocation();
  const { currentPlan } = useSubscription();
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const businessType = localStorage.getItem('businessType') || '';
  const logoUrl = localStorage.getItem('logoUrl') || '';
  
  const mainMenuItems = [
    { icon: <Home size={18} />, label: 'Início', href: '/' },
    { icon: <BarChart2 size={18} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <Briefcase size={18} />, label: 'Finanças', href: '/finances' },
    { icon: <Target size={18} />, label: 'Metas', href: '/goals' },
    { icon: <CalendarDays size={18} />, label: 'Calendário', href: '/calendar' },
    { icon: <BarChart size={18} />, label: 'Benchmarking', href: '/benchmarking' },
    { icon: <BookOpen size={18} />, label: 'Aprendizado', href: '/learn' }
  ];
  
  const secondaryMenuItems = [
    { icon: <Users size={18} />, label: 'Equipe', href: '/personnel' },
    { icon: <Clock size={18} />, label: 'Timetracking', href: '/personnel/time-tracking' },
    { icon: <Lightbulb size={18} />, label: 'Inspiração', href: '/inspiration' },
    { icon: <ShieldCheck size={18} />, label: 'ESG', href: '/esg' }
  ];
  
  const bottomMenuItems = [
    { icon: <Settings size={18} />, label: 'Configurações', href: '/settings' },
    { icon: <HelpCircle size={18} />, label: 'Ajuda', href: '/help' }
  ];

  return (
    <SidebarProvider>
      <SidebarComponent className="fixed left-0 top-0 h-screen border-r bg-sidebar" {...props}>
        <SidebarHeader className="p-4 flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2">
            {logoUrl ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={logoUrl} alt={companyName} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {companyName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                {companyName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <span className="font-semibold text-sidebar-foreground">{companyName}</span>
          </Link>
          {businessType && (
            <span className="text-xs text-muted-foreground mt-1">{businessType}</span>
          )}
        </SidebarHeader>
        
        <SidebarContent className="p-2">
          <ScrollArea className="h-[calc(100vh-180px)] pr-2">
            <SidebarGroup>
              {mainMenuItems.map((item, index) => (
                <Link to={item.href} key={index}>
                  <Button 
                    variant={location.pathname === item.href ? "default" : "ghost"} 
                    className={cn(
                      "w-full justify-start mb-1",
                      location.pathname === item.href 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    )}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </SidebarGroup>
            
            <SidebarGroup className="mt-4">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-3">MÓDULOS</div>
              {secondaryMenuItems.map((item, index) => (
                <Link to={item.href} key={index}>
                  <Button 
                    variant={location.pathname === item.href ? "default" : "ghost"} 
                    className={cn(
                      "w-full justify-start mb-1",
                      location.pathname === item.href 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    )}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>
        
        <SidebarFooter className="p-2 border-t">
          <SidebarGroup>
            {bottomMenuItems.map((item, index) => (
              <Link to={item.href} key={index}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start mb-1 hover:bg-primary/10"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </Link>
            ))}
          </SidebarGroup>
          
          <div className="mt-4 p-3 rounded-lg bg-sidebar-accent text-xs">
            <div className="flex items-center mb-2">
              <Building size={14} className="mr-1 text-primary" />
              <span className="font-medium">Plano Atual</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{currentPlan === 'free' ? 'Plano Gratuito' : 
                     currentPlan === 'starter' ? 'Plano Iniciante' : 
                     currentPlan === 'business' ? 'Plano Empresarial' : 
                     'Plano Premium'}</span>
              <Link to="/settings?tab=subscription">
                <Button variant="link" size="sm" className="h-auto p-0 text-primary text-xs">
                  Upgrade
                </Button>
              </Link>
            </div>
          </div>
        </SidebarFooter>
      </SidebarComponent>
    </SidebarProvider>
  )
}

// Também exporta como default para compatibilidade
export default Sidebar
