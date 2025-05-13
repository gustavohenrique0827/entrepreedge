
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSegment } from '@/contexts/SegmentContext';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { ActivityCard } from '@/components/segment/ActivityCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileText } from 'lucide-react';

// Hardcoded implemented pages to redirect to specific implementations
const specificImplementations: Record<string, string> = {
  'online-sales': '/segment/ecommerce/online-sales',
  'products': '/segment/ecommerce/products',
  'checkout': '/segment/ecommerce/checkout'
};

// Mocked data service to simulate saving and loading data
const dataService = {
  saveData: (key: string, data: any) => {
    localStorage.setItem(`segment_data_${key}`, JSON.stringify(data));
    return new Promise<void>(resolve => setTimeout(resolve, 500));
  },
  loadData: (key: string) => {
    const data = localStorage.getItem(`segment_data_${key}`);
    return new Promise(resolve => setTimeout(() => resolve(data ? JSON.parse(data) : null), 300));
  }
};

const GenericSegmentPage = () => {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const { segmentActivities, currentSegment, segmentName } = useSegment();
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  
  // Find the current activity based on the pageId
  const currentActivity = pageId 
    ? segmentActivities.find(activity => activity.path.includes(pageId))
    : null;
  
  // If no pageId, show all segment activities
  const showAllActivities = !pageId;
  
  // Check if there's a specific implementation for this page
  useEffect(() => {
    if (pageId && specificImplementations[pageId]) {
      navigate(specificImplementations[pageId], { replace: true });
      return;
    }
    
    // Load data for this specific page
    if (pageId) {
      const loadPageData = async () => {
        try {
          setIsLoading(true);
          const data = await dataService.loadData(`${currentSegment}_${pageId}`);
          setPageData(data || { title: currentActivity?.title, content: [] });
        } catch (error) {
          console.error('Error loading page data:', error);
          toast({
            title: "Erro ao carregar dados",
            description: "Não foi possível carregar os dados desta página.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      loadPageData();
    } else {
      setIsLoading(false);
    }
  }, [pageId, currentSegment]);
  
  // Handle the case where we're showing all activities for the segment
  if (showAllActivities) {
    return (
      <SegmentPageLayout
        title={`Atividades para ${segmentName}`}
        description={`Gerencie todas as atividades específicas para o segmento ${segmentName}`}
      >
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertTitle className="text-sm font-medium">Atividades específicas para seu segmento</AlertTitle>
          <AlertDescription className="text-xs">
            As atividades abaixo foram personalizadas para o segmento de {segmentName}. Clique em uma atividade para acessá-la.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {segmentActivities.map((activity) => (
            <ActivityCard 
              key={activity.path}
              title={activity.title}
              description={activity.description}
              path={activity.path}
              icon={activity.icon}
            />
          ))}
        </div>
      </SegmentPageLayout>
    );
  }
  
  // Handle the case of a specific activity page
  if (!currentActivity) {
    return (
      <SegmentPageLayout
        title="Página não encontrada"
        description="A atividade que você está procurando não existe para este segmento."
      >
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-lg font-medium mb-2">Atividade não encontrada</h2>
          <p className="text-muted-foreground mb-6">A página que você está procurando não existe ou não está disponível para este segmento.</p>
          <Button onClick={() => navigate('/segment')}>Ver todas as atividades</Button>
        </div>
      </SegmentPageLayout>
    );
  }
  
  // Show a generic page for activities that don't have specific implementations
  return (
    <SegmentPageLayout
      title={currentActivity.title}
      description={currentActivity.description || `Gerenciamento de ${currentActivity.title} para o segmento ${segmentName}`}
      action={
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Exportar dados
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            Funcionalidade em desenvolvimento
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
              {currentActivity.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">{currentActivity.title}</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Esta funcionalidade está em desenvolvimento para o segmento de {segmentName}.
              O conteúdo será personalizado de acordo com as necessidades específicas deste segmento.
            </p>
            <Button variant="outline" onClick={() => navigate('/segment')}>
              Voltar para atividades
            </Button>
          </div>
        </CardContent>
      </Card>
    </SegmentPageLayout>
  );
};

export default GenericSegmentPage;
