
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';

const Support = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Suporte"
        description="Gerenciamento de suporte técnico e atendimento ao cliente"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5" />
            Chamados Abertos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão de suporte no segmento de tecnologia.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Support;
