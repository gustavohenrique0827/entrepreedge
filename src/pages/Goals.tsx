
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import GoalTracker from '@/components/GoalTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

const Goals = () => {
  const { hasAccess, currentPlan } = useSubscription();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Metas</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhamento das metas da sua empresa
            </p>
          </div>
          
          {!hasAccess('goals') ? (
            <Card className="glass p-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Target size={32} className="text-muted-foreground" />
                <h2 className="text-lg font-medium">Módulo de Metas</h2>
                <p className="text-muted-foreground">Este módulo está disponível a partir do Plano Iniciante.</p>
                <button 
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                  onClick={() => {
                    localStorage.setItem('settingsTab', 'subscription');
                    window.location.href = '/settings';
                  }}
                >
                  Atualizar plano
                </button>
              </div>
            </Card>
          ) : (
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <Target size={16} /> 
                  Metas
                </CardTitle>
                <CardDescription className="text-xs">Define e acompanhe suas metas de negócio</CardDescription>
              </CardHeader>
              <CardContent>
                <GoalTracker />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;
