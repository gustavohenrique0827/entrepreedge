
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';

const Inventory = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Estoque"
        description="Gerenciamento de estoque e matéria prima"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Materiais em Estoque
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão de estoque no segmento industrial.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Inventory;
