
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/PageContainer';
import { useSegment } from '@/contexts/SegmentContext';
import { Helmet } from 'react-helmet-async';
import { Package, Settings, FileText, User, Calendar, Star, 
  Briefcase, Truck, ShoppingCart, Users, CreditCard } from 'lucide-react';

const GenericSegmentPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { segmentActivities, currentSegment, segmentName } = useSegment();
  const navigate = useNavigate();
  const [currentActivity, setCurrentActivity] = useState<any>(null);

  useEffect(() => {
    // Find matching activity
    const activity = segmentActivities.find(act => {
      const path = act.path.split('/').pop();
      return path === pageId;
    });

    if (activity) {
      setCurrentActivity(activity);
    } else {
      // If no matching activity is found, redirect to dashboard
      navigate('/dashboard', { replace: true });
    }
  }, [pageId, segmentActivities, navigate]);

  // Helper function to get icon for the page
  const getPageIcon = (iconName: string) => {
    switch (iconName) {
      case 'package': return <Package className="h-10 w-10" />;
      case 'shopping-cart': return <ShoppingCart className="h-10 w-10" />;
      case 'list-ordered': return <FileText className="h-10 w-10" />;
      case 'users': return <Users className="h-10 w-10" />;
      case 'user-plus': return <User className="h-10 w-10" />;
      case 'calendar': 
      case 'calendar-check': return <Calendar className="h-10 w-10" />;
      case 'star': 
      case 'award': return <Star className="h-10 w-10" />;
      case 'wrench': 
      case 'settings': return <Settings className="h-10 w-10" />;
      case 'truck': return <Truck className="h-10 w-10" />;
      case 'briefcase': return <Briefcase className="h-10 w-10" />;
      case 'credit-card': return <CreditCard className="h-10 w-10" />;
      default: return <FileText className="h-10 w-10" />;
    }
  };

  if (!currentActivity) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse bg-gray-200 rounded-md h-10 w-60"></div>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentActivity.title} | {segmentName}</title>
      </Helmet>
      <PageContainer>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary rounded-lg p-3">
              {getPageIcon(currentActivity.icon)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{currentActivity.title}</h1>
              <p className="text-muted-foreground">
                {currentActivity.description || `Gerenciamento de ${currentActivity.title.toLowerCase()} para o segmento de ${segmentName}`}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-card rounded-lg shadow p-6 border">
              <h3 className="font-semibold mb-2">Esta é uma página dinâmica para o segmento {segmentName}</h3>
              <p className="text-muted-foreground text-sm">
                Esta página adapta-se automaticamente ao seu segmento de negócio.
                Aqui você encontrará recursos específicos para gerenciar {currentActivity.title.toLowerCase()}.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow p-6 border">
              <h3 className="font-semibold mb-2">Funcionalidades de {currentActivity.title}</h3>
              <p className="text-muted-foreground text-sm">
                As ferramentas e relatórios desta seção foram personalizadas para satisfazer 
                as necessidades específicas de negócios no segmento de {segmentName}.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow p-6 border border-primary/20">
              <h3 className="font-semibold mb-2">Suporte e Recursos</h3>
              <p className="text-muted-foreground text-sm">
                Precisa de ajuda com o módulo de {currentActivity.title}? 
                Nossa equipe de suporte especializada em {segmentName} está disponível para ajudar.
              </p>
              <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm">
                Acessar Ajuda
              </button>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow p-6 border mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ações Rápidas</h2>
              <button className="text-sm text-primary hover:underline">Ver todas</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <button className="bg-card hover:bg-accent text-left p-4 rounded-md border flex flex-col gap-2">
                <span className="font-medium">Criar Novo</span>
                <span className="text-sm text-muted-foreground">Adicione um novo registro</span>
              </button>
              <button className="bg-card hover:bg-accent text-left p-4 rounded-md border flex flex-col gap-2">
                <span className="font-medium">Importar Dados</span>
                <span className="text-sm text-muted-foreground">De CSV ou Excel</span>
              </button>
              <button className="bg-card hover:bg-accent text-left p-4 rounded-md border flex flex-col gap-2">
                <span className="font-medium">Gerar Relatório</span>
                <span className="text-sm text-muted-foreground">Relatórios personalizados</span>
              </button>
              <button className="bg-card hover:bg-accent text-left p-4 rounded-md border flex flex-col gap-2">
                <span className="font-medium">Configurações</span>
                <span className="text-sm text-muted-foreground">Personalize este módulo</span>
              </button>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow p-6 border mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Visão Geral</h2>
              <div className="flex gap-2">
                <select className="bg-background border rounded px-3 py-1 text-sm">
                  <option>Último mês</option>
                  <option>Último trimestre</option>
                  <option>Último ano</option>
                </select>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-1 rounded text-sm">
                  Filtrar
                </button>
              </div>
            </div>
            <div className="h-60 flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Visualização de dados de {currentActivity.title} será exibida aqui</p>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default GenericSegmentPage;
