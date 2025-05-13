
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSegment } from '@/contexts/SegmentContext';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { ActivityCard } from '@/components/segment/ActivityCard';
import * as LucideIcons from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

// Mapeamento de páginas específicas implementadas
const specificImplementations: Record<string, string> = {
  'online-sales': '/segment/ecommerce/online-sales',
  'products': '/segment/ecommerce/products',
  'checkout': '/segment/checkout',
  // Aqui você vai adicionar mais implementações específicas conforme criar:
  // 'ecommerce-inventory': '/segment/ecommerce/inventory',
  // 'payments': '/segment/ecommerce/payments',
  // 'ecommerce-logistics': '/segment/ecommerce/logistics',
  // 'marketing': '/segment/ecommerce/marketing',
  // etc.
};

export default function GenericSegmentPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const { segmentActivities, segmentName, currentSegment } = useSegment();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Verificar se existe uma implementação específica para este pageId
    if (pageId && specificImplementations[pageId]) {
      navigate(specificImplementations[pageId]);
      return;
    }
    
    // Simulate loading data for this segment activity
    const loadPageData = async () => {
      setLoading(true);
      try {
        await dataService.loadData(`${currentSegment}_${pageId}`);
        setLoading(false);
      } catch (error) {
        console.error("Error loading segment data:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados desta atividade",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    loadPageData();
  }, [currentSegment, pageId, navigate]);
  
  // If this is the main segment page (no specific pageId), show all available activities
  if (!pageId) {
    return (
      <SegmentPageLayout 
        title={`Atividades de ${segmentName}`} 
        description={`Gerencie todas as atividades específicas para o segmento de ${segmentName}`}
      >
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {segmentActivities.map((activity) => {
            // Get the icon from Lucide icons if available
            const IconComponent = activity.icon && (LucideIcons as any)[activity.icon.charAt(0).toUpperCase() + activity.icon.slice(1)];
            
            return (
              <ActivityCard
                key={activity.path}
                title={activity.title}
                description={activity.description || `Gerencie ${activity.title.toLowerCase()} específicos para ${segmentName}`}
                icon={IconComponent && <IconComponent size={24} />}
                onClick={() => navigate(activity.path)}
              />
            );
          })}
        </div>
      </SegmentPageLayout>
    );
  }
  
  // Find the specific activity
  const currentActivity = segmentActivities.find(activity => 
    activity.path === `/segment/${pageId}` || 
    activity.path.endsWith(`/${pageId}`)
  );
  
  if (!currentActivity) {
    return (
      <SegmentPageLayout 
        title="Atividade não encontrada" 
        description="A atividade solicitada não está disponível para este segmento."
      >
        <div className="p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Atividade não encontrada</h3>
          <p className="text-muted-foreground mb-4">
            A atividade solicitada não existe ou não está disponível para o segmento de {segmentName}.
          </p>
          <button 
            onClick={() => navigate('/segment')} 
            className="text-primary hover:underline"
          >
            Voltar para atividades do segmento
          </button>
        </div>
      </SegmentPageLayout>
    );
  }
  
  // Para atividades que não têm uma implementação específica ainda, 
  // continuamos mostrando a versão genérica
  return (
    <SegmentPageLayout 
      title={currentActivity.title} 
      description={currentActivity.description || `Gerencie ${currentActivity.title.toLowerCase()} específicos para ${segmentName}`}
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Esta é a página para {currentActivity.title}</h3>
        <p className="text-muted-foreground mb-6">
          Esta é uma página de demonstração para {currentActivity.title} no segmento de {segmentName}.
          Em uma implementação real, esta página teria funcionalidades específicas para {currentActivity.title.toLowerCase()}.
        </p>
        
        <div className="bg-muted p-4 rounded-md mb-6">
          <h4 className="font-medium mb-2">Ações disponíveis:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Visualizar {currentActivity.title.toLowerCase()}</li>
            <li>Adicionar novos {currentActivity.title.toLowerCase()}</li>
            <li>Editar {currentActivity.title.toLowerCase()} existentes</li>
            <li>Remover {currentActivity.title.toLowerCase()}</li>
            <li>Buscar e filtrar {currentActivity.title.toLowerCase()}</li>
          </ul>
        </div>
        
        <button 
          onClick={() => {
            toast({
              title: "Função simulada",
              description: `A funcionalidade para ${currentActivity.title} foi executada com sucesso!`,
            });
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          Simular ação para {currentActivity.title}
        </button>
      </div>
    </SegmentPageLayout>
  );
}
