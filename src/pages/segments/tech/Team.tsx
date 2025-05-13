
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const Team = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Equipe"
        description="Gestão de equipe técnica e desenvolvedores"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Membros da Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão de equipe no segmento de tecnologia.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Team;
