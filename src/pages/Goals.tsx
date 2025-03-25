
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import GoalTracker from '@/components/GoalTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';

const Goals = () => {
  const { hasAccess, currentPlan } = useSubscription();
  
  const getUpgradeTarget = () => {
    if (currentPlan === 'free') return 'starter';
    return 'business';
  };

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
            <Card className="border-dashed border-2 border-muted p-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ShieldAlert size={32} className="text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Módulo de Metas</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Este módulo permite acompanhar e gerenciar metas financeiras e estratégicas da sua empresa. 
                    Disponível a partir do Plano Iniciante.
                  </p>
                </div>
                <Button 
                  className="group"
                  onClick={() => {
                    localStorage.setItem('settingsTab', 'subscription');
                    window.location.href = '/settings';
                  }}
                >
                  <span>Atualizar para plano {getUpgradeTarget() === 'starter' ? 'Iniciante' : 'Empresarial'}</span>
                  <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      <Target size={16} /> 
                      Acompanhamento de Metas
                    </CardTitle>
                    <CardDescription className="text-xs">Acompanhe o progresso das suas metas de negócio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GoalTracker />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Resumo de Metas</CardTitle>
                    <CardDescription className="text-xs">Visão geral do status das suas metas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Metas concluídas</span>
                        <span className="text-sm font-bold text-green-500">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Metas em andamento</span>
                        <span className="text-sm font-bold text-amber-500">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Metas atrasadas</span>
                        <span className="text-sm font-bold text-red-500">1</span>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Desempenho</h4>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">0%</span>
                          <span className="text-xs font-medium">65%</span>
                          <span className="text-xs text-muted-foreground">100%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;
