
import React, { useState, useEffect } from 'react';
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
  
  // Get company data from localStorage
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const businessType = localStorage.getItem('businessType') || '';
  const annualRevenue = localStorage.getItem('annualRevenue') || '0';
  const targetRevenue = localStorage.getItem('targetRevenue') || '0';
  
  // Calculate financial metrics
  const currentRevenueValue = parseInt(annualRevenue) || 0;
  const targetRevenueValue = parseInt(targetRevenue) || 0;
  const monthlyRevenue = Math.round(currentRevenueValue / 12);
  const targetGrowth = currentRevenueValue > 0 
    ? Math.round(((targetRevenueValue - currentRevenueValue) / currentRevenueValue) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">{companyName}</h1>
            <p className="text-sm text-muted-foreground">
              {businessType && `${businessType} • `}
              Dashboard de gestão empresarial
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Notificação</AlertTitle>
            <AlertDescription className="text-xs">
              Você tem metas de crescimento definidas. Acompanhe seu progresso na seção de metas.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SummaryCard 
              title="Receita Mensal" 
              value={`R$ ${monthlyRevenue.toLocaleString('pt-BR')}`} 
              description={`Meta anual: R$ ${Math.round(targetRevenueValue / 12).toLocaleString('pt-BR')}`} 
              icon={<Activity className="h-4 w-4" />} 
            />
            <SummaryCard 
              title="Meta de Crescimento" 
              value={`${targetGrowth}%`} 
              description="Para o próximo ano" 
              icon={<TrendingUp className="h-4 w-4" />} 
            />
            <SummaryCard 
              title="Metas Definidas" 
              value="3" 
              description="2 em andamento" 
              icon={<CheckCircle className="h-4 w-4" />} 
            />
            <SummaryCard 
              title="Cursos Disponíveis" 
              value="8" 
              description="Segmentados para seu negócio" 
              icon={<BookOpenCheck className="h-4 w-4" />} 
            />
          </div>
          
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="glass">
              <TabsTrigger value="dashboard" className="flex items-center gap-1 text-xs">
                <Home size={14} />
                <span>Resumo</span>
              </TabsTrigger>
              <TabsTrigger value="finances" className="flex items-center gap-1 text-xs">
                <BarChart2 size={14} />
                <span>Finanças</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-1 text-xs">
                <Target size={14} />
                <span>Metas</span>
              </TabsTrigger>
              <TabsTrigger value="learn" className="flex items-center gap-1 text-xs">
                <BookOpen size={14} />
                <span>Aprendizado</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      <BarChart2 size={16} /> 
                      Resumo Financeiro
                    </CardTitle>
                    <CardDescription className="text-xs">Visão geral do seu saldo e transações recentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[220px] overflow-hidden">
                      <FinanceTracker />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      <Target size={16} /> 
                      Progresso de Metas
                    </CardTitle>
                    <CardDescription className="text-xs">Acompanhamento das suas metas atuais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[220px] overflow-auto">
                      <GoalTracker />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass col-span-1 lg:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      <BookOpen size={16} /> 
                      Cursos Recomendados
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Baseados no seu segmento: {businessType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[260px] overflow-auto">
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
    <CardContent className="pt-4">
      <div className="flex justify-between items-start mb-1">
        <div className="bg-primary/10 p-1.5 rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-base mt-1">{value}</h3>
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </CardContent>
  </Card>
);

export default Index;
