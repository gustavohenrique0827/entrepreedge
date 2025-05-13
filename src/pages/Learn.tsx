
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import LearnSection from '@/components/LearnSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';

const Learn = () => {
  const businessType = localStorage.getItem('businessType') || '';
  const { segmentName } = useSegment();
  
  return (
    <PageContainer>
      <PageHeader 
        title="Aprendizado"
        description="Cursos e materiais para o seu desenvolvimento"
      />
      
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-1">
            <BookOpen size={16} /> 
            Cursos Recomendados
          </CardTitle>
          <CardDescription className="text-xs">
            {businessType ? `Baseados no seu segmento: ${segmentName}` : 'Conteúdo personalizado para o seu negócio'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LearnSection />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Learn;
