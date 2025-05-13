
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';

const Logistics = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Logística"
        description="Gestão de operações logísticas e transportes"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Operações Logísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão logística no segmento industrial.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Logistics;
