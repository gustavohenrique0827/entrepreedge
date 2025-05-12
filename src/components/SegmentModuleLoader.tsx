
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSegment, BusinessSegmentType } from '@/contexts/SegmentContext';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Import segment-specific pages
const FinancialDashboard = React.lazy(() => import('../modules/financial/FinancialDashboard'));
const VendaDashboard = React.lazy(() => import('../modules/vendas/VendaDashboard'));
const SaudeDashboard = React.lazy(() => import('../modules/saude/SaudeDashboard'));
const EducacaoDashboard = React.lazy(() => import('../modules/educacao/EducacaoDashboard'));
const EcommerceDashboard = React.lazy(() => import('../modules/ecommerce/EcommerceDashboard'));
const IndustrialDashboard = React.lazy(() => import('../modules/industrial/IndustrialDashboard'));
const AgroDashboard = React.lazy(() => import('../modules/agro/AgroDashboard'));
const FashionDashboard = React.lazy(() => import('../modules/fashion/FashionDashboard'));
const ServicosDashboard = React.lazy(() => import('../modules/servicos/ServicosDashboard'));
const TechDashboard = React.lazy(() => import('../modules/tech/TechDashboard'));
const LegalDashboard = React.lazy(() => import('../modules/legal/LegalDashboard'));
const ManufacturingDashboard = React.lazy(() => import('../modules/manufacturing/ManufacturingDashboard'));

// Map of segment IDs to their respective module components
const segmentComponentMap: Record<string, React.LazyExoticComponent<any>> = {
  'financial': FinancialDashboard,
  'sales': VendaDashboard,
  'health': SaudeDashboard,
  'education': EducacaoDashboard,
  'ecommerce': EcommerceDashboard,
  'industrial': IndustrialDashboard,
  'agro': AgroDashboard,
  'fashion': FashionDashboard,
  'services': ServicosDashboard,
  'tech': TechDashboard,
  'legal': LegalDashboard,
  'manufacturing': ManufacturingDashboard,
};

// Map segment IDs to their respective directory paths
const segmentDirectoryMap: Record<string, string> = {
  'financial': 'financial',
  'sales': 'vendas',
  'health': 'saude',
  'education': 'educacao',
  'ecommerce': 'ecommerce',
  'industrial': 'industrial',
  'agro': 'agro',
  'fashion': 'fashion',
  'services': 'servicos',
  'tech': 'tech',
  'legal': 'legal',
  'manufacturing': 'manufacturing',
};

interface SegmentModuleProps {
  segmentId: BusinessSegmentType;
}

const SegmentModule: React.FC<SegmentModuleProps> = ({ segmentId }) => {
  const { getDirectoryPath } = useSegment();
  const location = useLocation();
  const [isModuleAvailable, setIsModuleAvailable] = useState<boolean>(false);
  
  // Check if the module is available for the current segment
  useEffect(() => {
    const checkModuleAvailability = async () => {
      const dirPath = getDirectoryPath();
      if (dirPath && segmentComponentMap[segmentId]) {
        setIsModuleAvailable(true);
      } else {
        setIsModuleAvailable(false);
      }
    };
    
    checkModuleAvailability();
  }, [segmentId, getDirectoryPath]);
  
  if (!isModuleAvailable) {
    return (
      <div className="container p-6">
        <Card>
          <CardContent className="p-6">
            <Alert variant="destructive" className="mb-4">
              <AlertTitle className="text-lg font-semibold mb-2">
                Módulo não disponível
              </AlertTitle>
              <AlertDescription className="text-sm">
                O módulo para o segmento {segmentId} ainda não está disponível ou não foi configurado corretamente.
                Por favor, entre em contato com o administrador do sistema.
              </AlertDescription>
            </Alert>
            
            <div className="mt-4">
              <p className="text-gray-500 text-sm">
                Você está tentando acessar: {location.pathname}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Get the component for the current segment
  const SegmentComponent = segmentComponentMap[segmentId];
  
  if (!SegmentComponent) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <ModuleContainer requiredSegment={segmentId}>
      <React.Suspense fallback={
        <div className="flex h-full items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <Routes>
          <Route path="/*" element={<SegmentComponent />} />
        </Routes>
      </React.Suspense>
    </ModuleContainer>
  );
};

export default SegmentModule;
