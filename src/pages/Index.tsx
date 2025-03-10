
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FinanceTracker from '@/components/FinanceTracker';
import GoalTracker from '@/components/GoalTracker';
import LearnSection from '@/components/LearnSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Home, BarChart2, Target, BookOpen, TrendingUp, CheckCircle, BookOpenCheck, Activity } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-3 py-4 sm:px-4 sm:py-6 md:py-8">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Bem-vindo ao Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Resumo de toda a sua atividade empresarial</p>
          </div>
          
          <Alert className="mb-4 sm:mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <AlertTitle className="text-xs sm:text-sm">Notificação</AlertTitle>
            <AlertDescription className="text-xs sm:text-sm">
              Você tem 2 metas próximas do prazo. Verifique sua lista de metas para mais detalhes.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <SummaryCard 
              title="Saldo Atual" 
              value="R$ 1.430,00" 
              description="↑ 12,5% desde o mês passado" 
              icon={<Activity className="h-4 w-4 sm:h-5 sm:w-5" />} 
            />
            <SummaryCard 
              title="Receitas" 
              value="R$ 2.700,00" 
              description="↑ 12% desde o mês passado" 
              icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />} 
            />
            <SummaryCard 
              title="Metas Concluídas" 
              value="2 de 5" 
              description="40% do planejado" 
              icon={<CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />} 
            />
            <SummaryCard 
              title="Cursos Completos" 
              value="1" 
              description="3 em andamento" 
              icon={<BookOpenCheck className="h-4 w-4 sm:h-5 sm:w-5" />} 
            />
          </div>
          
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            <TabsList className="glass">
              <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Home size={14} className="sm:size-16" />
                <span>Resumo</span>
              </TabsTrigger>
              <TabsTrigger value="finances" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <BarChart2 size={14} className="sm:size-16" />
                <span>Finanças</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Target size={14} className="sm:size-16" />
                <span>Metas</span>
              </TabsTrigger>
              <TabsTrigger value="learn" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <BookOpen size={14} className="sm:size-16" />
                <span>Aprendizado</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="glass">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                      <BarChart2 size={16} className="sm:size-18" /> 
                      Resumo Financeiro
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Visão geral do seu saldo e transações recentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] sm:h-[250px] overflow-hidden">
                      <FinanceTracker />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                      <Target size={16} className="sm:size-18" /> 
                      Progresso de Metas
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Acompanhamento das suas metas atuais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] sm:h-[250px] overflow-auto">
                      <GoalTracker />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass col-span-1 lg:col-span-2">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                      <BookOpen size={16} className="sm:size-18" /> 
                      Cursos em Andamento
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Continue aprendendo com nossos cursos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] sm:h-[300px] overflow-auto">
                      <LearnSection />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="finances">
              <FinanceTracker />
            </TabsContent>
            
            <TabsContent value="goals">
              <GoalTracker />
            </TabsContent>
            
            <TabsContent value="learn">
              <LearnSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, description, icon }) => (
  <Card className="glass">
    <CardContent className="pt-4 sm:pt-6">
      <div className="flex justify-between items-start mb-1 sm:mb-2">
        <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-sm sm:text-base lg:text-lg mt-1 sm:mt-2">{value}</h3>
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{description}</p>
    </CardContent>
  </Card>
);

export default Index;
