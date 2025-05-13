
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { ActivityCard } from '@/components/segment/ActivityCard';
import { Button } from '@/components/ui/button';
import { useSegment } from '@/contexts/SegmentContext';
import { AlertTriangle, Settings, FileText, Calendar, PenTool } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const GenericSegmentPage = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const location = useLocation();
  const { segmentActivities, segmentName, segmentIcon } = useSegment();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Remover o prefixo "/segment/" para obter o ID da página
    const currentPath = location.pathname;
    const pagePath = currentPath.startsWith('/segment/') 
      ? currentPath 
      : `/segment/${pageId}`;

    // Buscar informações da atividade com base no caminho atual
    const activity = segmentActivities.find(act => act.path === pagePath);
    
    if (activity) {
      setTitle(activity.title);
      setDescription(activity.description || `Funcionalidade relacionada a ${activity.title}`);
    } else {
      setTitle(`${pageId ? pageId.replace(/-/g, ' ') : 'Atividade'}`);
      setDescription(`Esta página está em desenvolvimento`);
    }
  }, [pageId, location.pathname, segmentActivities]);

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleAction = (type: string) => {
    toast({
      title: `${type}`,
      description: `A funcionalidade "${type}" para ${title} será disponibilizada em breve.`,
    });
  };

  return (
    <SegmentPageLayout 
      title={capitalizeFirstLetter(title)}
      description={description}
    >
      <div className="p-8 rounded-lg border border-dashed flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Funcionalidade em Desenvolvimento</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Esta página está sendo implementada e estará disponível em breve para o segmento {segmentIcon} {segmentName}.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
          <ActivityCard
            title="Sugerir Funcionalidades"
            description="Envie sugestões para este módulo"
            icon={<PenTool size={20} />}
            onAction={() => handleAction("Sugerir Funcionalidades")}
          >
            <p className="text-sm text-muted-foreground">
              Compartilhe suas necessidades e ideias para melhorar esta área
            </p>
          </ActivityCard>
          
          <ActivityCard
            title="Documentação"
            description="Consulte informações sobre esta área"
            icon={<FileText size={20} />}
            onAction={() => handleAction("Documentação")}
          >
            <p className="text-sm text-muted-foreground">
              Acesse materiais e tutoriais relacionados a esta funcionalidade
            </p>
          </ActivityCard>
          
          <ActivityCard
            title="Cronograma"
            description="Previsão de disponibilidade"
            icon={<Calendar size={20} />}
            onAction={() => handleAction("Cronograma")}
          >
            <p className="text-sm text-muted-foreground">
              Veja as próximas atualizações planejadas para o sistema
            </p>
          </ActivityCard>
        </div>
        <Button className="mt-8" variant="outline" onClick={() => handleAction("Configurações")}>
          <Settings className="mr-2 h-4 w-4" />
          Verificar Configurações
        </Button>
      </div>
    </SegmentPageLayout>
  );
};

export default GenericSegmentPage;
