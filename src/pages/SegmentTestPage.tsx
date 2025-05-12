
import React, { useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import SegmentTester from '@/components/segment/SegmentTester';
import AutoSegmentConfig from '@/components/segment/AutoSegmentConfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, Settings, LayoutDashboard, Home, BarChart2, Target } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';

const SegmentTestPage: React.FC = () => {
  const { segmentName, applySegmentVisuals } = useSegment();
  
  // Ativar configurações visuais ao entrar na página
  useEffect(() => {
    applySegmentVisuals();
  }, []);
  
  // Navitems consistentes com o restante da aplicação
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    {
      name: 'Configurações',
      href: '/settings',
      icon: <Settings size={18} />
    }
  ];

  return (
    <PageContainer navItems={navItems}>
      <PageHeader 
        title="Teste de Segmentos" 
        description={`Teste os diferentes segmentos de negócio configurados no sistema. Segmento atual: ${segmentName}`}
      />

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Seleção de Segmento
            </CardTitle>
            <CardDescription>
              Escolha um segmento de negócio para visualizar suas configurações específicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SegmentTester />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              Configuração Automática do Sistema
            </CardTitle>
            <CardDescription>
              Configure automaticamente o sistema para o segmento selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AutoSegmentConfig />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SegmentTestPage;
