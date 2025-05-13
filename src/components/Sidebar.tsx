import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BarChart2, Code, Settings, Package, PenTool, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useSegment } from '@/contexts/SegmentContext';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  
  const { segmentName, segmentActivities, segmentIcon } = useSegment();
  
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Define estrutura do menu
  const menuItems = [
    {
      title: 'Navegação',
      items: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
          active: location.pathname === '/dashboard',
        },
        {
          name: 'Finanças',
          href: '/finances',
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
          active: location.pathname === '/finances',
        },
        {
          name: 'Metas',
          href: '/goals',
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
          active: location.pathname === '/goals',
        },
        {
          name: 'Aprendizado',
          href: '/learn',
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
          active: location.pathname === '/learn',
        },
      ],
    },
    {
      title: `Atividades do Segmento (${segmentIcon} ${segmentName})`,
      items: segmentActivities.map(activity => ({
        name: activity.title,
        href: activity.path,
        description: activity.description,
        active: location.pathname === activity.path,
      })),
    },
    {
      title: 'Departamento Pessoal',
      items: [
        {
          name: 'Gestão de Colaboradores',
          href: '/personnel/employees',
          active: location.pathname === '/personnel/employees',
        },
        {
          name: 'Controle de Ponto',
          href: '/personnel/time-tracking',
          active: location.pathname === '/personnel/time-tracking',
        },
        {
          name: 'Holerites',
          href: '/personnel/payslips',
          active: location.pathname === '/personnel/payslips',
        },
        {
          name: 'Recrutamento',
          href: '/personnel/hiring',
          active: location.pathname === '/personnel/hiring',
        },
        {
          name: 'Processos de RH',
          href: '/personnel/processes',
          active: location.pathname === '/personnel/processes',
        },
      ],
    },
    {
      title: 'Contabilidade',
      items: [
        {
          name: 'Visão Geral',
          href: '/accounting/overview',
          active: location.pathname === '/accounting/overview',
        },
        {
          name: 'Dashboard Contábil',
          href: '/accounting/dashboard',
          active: location.pathname === '/accounting/dashboard',
        },
        {
          name: 'Lançamentos',
          href: '/accounting/entries',
          active: location.pathname === '/accounting/entries',
        },
        {
          name: 'Fiscal',
          href: '/accounting/fiscal',
          active: location.pathname === '/accounting/fiscal',
        },
        {
          name: 'Impostos',
          href: '/accounting/taxes',
          active: location.pathname === '/accounting/taxes',
        },
        {
          name: 'Notas Fiscais',
          href: '/accounting/invoices',
          active: location.pathname === '/accounting/invoices',
        },
        {
          name: 'Relatórios',
          href: '/accounting/reports',
          active: location.pathname === '/accounting/reports',
        },
        {
          name: 'MEI',
          href: '/accounting/mei',
          active: location.pathname === '/accounting/mei',
        },
        {
          name: 'DRE e Balanços',
          href: '/accounting/financial-statements',
          active: location.pathname === '/accounting/financial-statements',
        },
      ],
    },
    {
      title: 'Utilitários',
      items: [
        {
          name: 'Calendário',
          href: '/calendar',
          active: location.pathname === '/calendar',
        },
        {
          name: 'Benchmarking',
          href: '/benchmarking',
          active: location.pathname === '/benchmarking',
        },
        {
          name: 'Simulador',
          href: '/simulator',
          active: location.pathname === '/simulator',
        },
        {
          name: 'Inspiração',
          href: '/inspiration',
          active: location.pathname === '/inspiration',
        },
        {
          name: 'Indicadores ESG',
          href: '/esg',
          active: location.pathname === '/esg',
        },
      ],
    },
  ];

  return (
    <>
      <aside
        className={`bg-card min-h-screen ${
          isExpanded ? 'w-[240px]' : 'w-[75px]'
        } flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-center h-16 shrink-0">
          <img
            src="/logo.svg"
            alt="Company Logo"
            className="h-8 w-auto transition-all duration-300"
          />
        </div>
        <Separator />
        <nav className="flex-1 py-4">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-4">
              {section.title && (
                <div className="text-sm text-muted-foreground px-4 py-2">
                  {section.title}
                </div>
              )}
              <ul>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm rounded-md transition-colors duration-200
                        ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`
                      }
                    >
                      {item.icon && (
                        <span className="mr-2">{item.icon}</span>
                      )}
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 md:hidden"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-sm">
          <SheetHeader className="text-left">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Ações rápidas e informações da sua conta.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          <div className="pb-4">
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">
                Sua Empresa
              </p>
              <p className="text-sm text-muted-foreground">
                Informações da sua conta e perfil.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Seu Nome
                </p>
                <p className="text-sm text-muted-foreground">
                  seuemail@example.com
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <nav className="flex-1 py-4">
            {menuItems.map((section, index) => (
              <div key={index} className="mb-4">
                {section.title && (
                  <div className="text-sm text-muted-foreground px-4 py-2">
                    {section.title}
                  </div>
                )}
                <ul>
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 text-sm rounded-md transition-colors duration-200
                          ${
                            isActive
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`
                        }
                      >
                        {item.icon && (
                          <span className="mr-2">{item.icon}</span>
                        )}
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
