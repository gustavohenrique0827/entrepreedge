
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Documents = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Documentos"
        description="Gerenciamento de documentos e contratos jurídicos"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão de documentos no segmento jurídico.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Documents;
