
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const Clients = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Clientes"
        description="Gerenciamento de clientes do escritório jurídico"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Clientes Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão de clientes no segmento jurídico.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Clients;
