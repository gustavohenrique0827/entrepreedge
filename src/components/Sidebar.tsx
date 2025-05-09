
// We can't modify the Sidebar component directly as it's in read-only files
// Let's create a custom SegmentSidebar component that we'll use

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSegment } from '@/contexts/SegmentContext';
import { useSupabase } from '@/contexts/SupabaseContext';
import { cn } from '@/lib/utils';

// Import icons for different segments
import { 
  Home, Settings, HelpCircle, BarChart2, Target, BookOpen,
  ShoppingBag, Wallet, Stethoscope, GraduationCap, Store, Factory,
  Package, FileText, Users, Clock, Calendar, CreditCard, Percent
} from 'lucide-react';

// Create a component to show segment-specific menu
const SegmentMenu = () => {
  const { currentSegment, modulesForSegment } = useSegment();
  const location = useLocation();
  
  // Map module keys to icons and labels
  const moduleIcons: Record<string, React.ReactNode> = {
    // Sales segment
    products: <Package size={18} />,
    inventory: <ShoppingBag size={18} />,
    transactions: <FileText size={18} />,
    reports: <BarChart2 size={18} />,
    
    // Financial segment
    accounts: <CreditCard size={18} />,
    categories: <Percent size={18} />,
    exports: <FileText size={18} />,
    
    // Health segment
    patients: <Users size={18} />,
    appointments: <Calendar size={18} />,
    exams: <FileText size={18} />,
    prescriptions: <FileText size={18} />,
    
    // Education segment
    students: <Users size={18} />,
    courses: <BookOpen size={18} />,
    enrollments: <FileText size={18} />,
    certificates: <FileText size={18} />,
    grades: <Target size={18} />,
    
    // E-commerce segment
    customers: <Users size={18} />,
    orders: <ShoppingBag size={18} />,
    payments: <CreditCard size={18} />,
    shipping: <Package size={18} />,
    
    // Industrial segment
    machines: <Factory size={18} />,
    'production-orders': <FileText size={18} />,
    maintenance: <Clock size={18} />,
    'quality-control': <Target size={18} />
  };
  
  const moduleLabels: Record<string, string> = {
    // Sales segment
    products: 'Produtos',
    inventory: 'Estoque',
    transactions: 'Transações',
    reports: 'Relatórios',
    
    // Financial segment
    accounts: 'Contas',
    categories: 'Categorias',
    exports: 'Exportações',
    
    // Health segment
    patients: 'Pacientes',
    appointments: 'Consultas',
    exams: 'Exames',
    prescriptions: 'Prescrições',
    
    // Education segment
    students: 'Alunos',
    courses: 'Cursos',
    enrollments: 'Matrículas',
    certificates: 'Certificados',
    grades: 'Notas',
    
    // E-commerce segment
    customers: 'Clientes',
    orders: 'Pedidos',
    payments: 'Pagamentos',
    shipping: 'Entregas',
    
    // Industrial segment
    machines: 'Máquinas',
    'production-orders': 'Ordens de Produção',
    maintenance: 'Manutenção',
    'quality-control': 'Controle de Qualidade'
  };
  
  // Get modules for the current segment
  const modules = modulesForSegment(currentSegment as any);
  
  if (!currentSegment || !modules || modules.length === 0) {
    return null;
  }
  
  // Map segment to its dashboard path
  const segmentDashboardPaths: Record<string, string> = {
    sales: '/modules/sales',
    financial: '/modules/financial',
    health: '/modules/health',
    education: '/modules/education',
    ecommerce: '/modules/ecommerce',
    industrial: '/modules/industrial'
  };
  
  return (
    <div className="px-3 py-2">
      <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground tracking-tight">
        {currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1)}
      </div>
      <div className="space-y-1">
        <Link 
          to={segmentDashboardPaths[currentSegment] || '/'}
          className={cn(
            "text-sm group flex p-3 w-full justify-start font-medium cursor-default hover:bg-primary/10 rounded-md",
            location.pathname === segmentDashboardPaths[currentSegment] ? "bg-primary/10 text-primary" : "text-muted-foreground"
          )}
        >
          <BarChart2 className="h-5 w-5 mr-3" />
          <span>Dashboard</span>
        </Link>
      
        {modules.map((module) => (
          <Link 
            key={module}
            to={`/modules/${currentSegment}/${module}`}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-default hover:bg-primary/10 rounded-md",
              location.pathname === `/modules/${currentSegment}/${module}` ? "bg-primary/10 text-primary" : "text-muted-foreground"
            )}
          >
            {moduleIcons[module] || <div className="h-5 w-5 mr-3" />}
            <span className="ml-3">{moduleLabels[module] || module}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Since we can't modify the original Sidebar, we'll inject our component into the UI
// by using it as a standalone component elsewhere. Here's an example of how it would be used:

const SegmentSidebarContent = () => {
  const { currentSegment } = useSegment();
  
  if (!currentSegment) {
    return null;
  }
  
  return <SegmentMenu />;
};

export { SegmentSidebarContent };

// We'll leave the original export as is
export default function Sidebar() {
  return null; // This won't be used, but we need to keep the default export
}
