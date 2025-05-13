
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const Projects = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Projetos"
        description="Gestão de projetos para empresas de tecnologia"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Projetos Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo específico para gestão de projetos no segmento de tecnologia.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Projects;
