
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Cases = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Processos"
        description="Gestão de processos jurídicos e casos"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Processos Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão de processos no segmento jurídico.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Cases;
