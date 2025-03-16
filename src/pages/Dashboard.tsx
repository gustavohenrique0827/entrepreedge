
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FinanceTracker from '@/components/FinanceTracker';
import GoalTracker from '@/components/GoalTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, BarChart2, Target, TrendingUp, Activity } from 'lucide-react';
import StatCard from '@/components/StatCard';

const Dashboard = () => {
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
              Análise detalhada dos indicadores do seu negócio
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Área de análise avançada</AlertTitle>
            <AlertDescription className="text-xs">
              Aqui você encontrará informações mais detalhadas sobre o desempenho do seu negócio.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Receita Mensal" 
              value={`R$ ${monthlyRevenue.toLocaleString('pt-BR')}`} 
              description={`Meta anual: R$ ${Math.round(targetRevenueValue / 12).toLocaleString('pt-BR')}`} 
              icon={<Activity className="h-4 w-4" />} 
            />
            <StatCard 
              title="Meta de Crescimento" 
              value={`${targetGrowth}%`} 
              description="Para o próximo ano" 
              icon={<TrendingUp className="h-4 w-4" />} 
            />
            <StatCard 
              title="Categoria" 
              value={businessType || "Não definido"} 
              description="Segmento de atuação" 
              icon={<BarChart2 className="h-4 w-4" />} 
            />
            <StatCard 
              title="Metas em Progresso" 
              value="4" 
              description="2 prestes a concluir" 
              icon={<Target className="h-4 w-4" />} 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <BarChart2 size={16} /> 
                  Análise Financeira Detalhada
                </CardTitle>
                <CardDescription className="text-xs">Evolução de receitas e despesas ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] overflow-hidden">
                  <FinanceTracker />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <Target size={16} /> 
                  Progresso de Metas Detalhado
                </CardTitle>
                <CardDescription className="text-xs">Acompanhamento detalhado das suas metas estratégicas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] overflow-auto">
                  <GoalTracker />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <BarChart2 size={16} /> 
                  Projeção Financeira
                </CardTitle>
                <CardDescription className="text-xs">
                  Análise de tendências futuras com base nos dados atuais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] overflow-hidden">
                  <FinanceTracker />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
