
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const Production = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Produção"
        description="Gestão de linhas de produção e operações industriais"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Operações de Produção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão de produção no segmento industrial.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Production;
