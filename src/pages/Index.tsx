
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FinanceTracker from '@/components/FinanceTracker';
import GoalTracker from '@/components/GoalTracker';
import LearnSection from '@/components/LearnSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, BarChart2, Target, BookOpen, TrendingUp, CheckCircle, BookOpenCheck, Activity } from 'lucide-react';
import StatCard from '@/components/StatCard';

const Index = () => {
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
            <h1 className="text-2xl font-bold mb-1">Dashboard | {companyName}</h1>
            <p className="text-sm text-muted-foreground">
              {businessType && `${businessType} • `}
              Resumo geral do seu negócio
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Bem-vindo ao seu painel de controle</AlertTitle>
            <AlertDescription className="text-xs">
              Aqui você encontrará um resumo das principais informações do seu negócio.
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <BarChart2 size={16} /> 
                  Resumo Financeiro
                </CardTitle>
                <CardDescription className="text-xs">Visão geral do seu saldo e transações recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] overflow-hidden">
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
                <div className="h-[200px] overflow-auto">
                  <GoalTracker />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-1">
                <BookOpen size={16} /> 
                Cursos Recomendados
              </CardTitle>
              <CardDescription className="text-xs">
                Baseados no seu segmento: {businessType || "Seu negócio"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] overflow-auto">
                <LearnSection />
              </div>
            </CardContent>
          </Card>
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
