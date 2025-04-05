
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import GoalTracker from '@/components/GoalTracker';
import AddGoalDialog from '@/components/goals/AddGoalDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  ShieldAlert, 
  ArrowUpRight, 
  Calendar, 
  TrendingUp, 
  BarChart, 
  Filter,
  Award
} from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  dueDate: string;
  category: string;
  status?: 'concluída' | 'em andamento' | 'atrasada';
  createdAt?: string;
}

const Goals = () => {
  const { hasAccess, currentPlan } = useSubscription();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeTab, setActiveTab] = useState('active');
  
  // Sample goals data
  const sampleGoals: Goal[] = [
    {
      id: '1',
      title: 'Aumentar vendas mensais',
      description: 'Alcançar R$ 15.000 em vendas mensais até o final do trimestre',
      targetValue: 15000,
      currentValue: 8750,
      dueDate: '2023-09-30',
      category: 'Vendas',
      status: 'em andamento',
      createdAt: '2023-05-15'
    },
    {
      id: '2',
      title: 'Reduzir custos operacionais',
      description: 'Diminuir custos operacionais em 15% nos próximos 2 meses',
      targetValue: 15,
      currentValue: 7,
      dueDate: '2023-08-31',
      category: 'Finanças',
      status: 'em andamento',
      createdAt: '2023-06-01'
    },
    {
      id: '3',
      title: 'Expandir base de clientes',
      description: 'Adicionar 20 novos clientes ativos',
      targetValue: 20,
      currentValue: 8,
      dueDate: '2023-10-15',
      category: 'Marketing',
      status: 'em andamento',
      createdAt: '2023-06-10'
    },
    {
      id: '4',
      title: 'Implementar programa de fidelidade',
      description: 'Desenvolver e lançar programa de fidelidade para clientes',
      targetValue: 100,
      currentValue: 100,
      dueDate: '2023-07-30',
      category: 'Marketing',
      status: 'concluída',
      createdAt: '2023-05-20'
    },
    {
      id: '5',
      title: 'Treinar equipe de vendas',
      description: 'Realizar treinamento completo com toda equipe comercial',
      targetValue: 100,
      currentValue: 100,
      dueDate: '2023-07-15',
      category: 'RH',
      status: 'concluída',
      createdAt: '2023-06-05'
    },
    {
      id: '6',
      title: 'Reduzir tempo de entrega',
      description: 'Diminuir tempo médio de entrega para 24h',
      targetValue: 24,
      currentValue: 28,
      dueDate: '2023-08-15',
      category: 'Operações',
      status: 'atrasada',
      createdAt: '2023-06-20'
    }
  ];

  useEffect(() => {
    // Load from localStorage if exists, otherwise use sample data
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      setGoals(sampleGoals);
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem('goals', JSON.stringify(goals));
    }
  }, [goals]);

  const getUpgradeTarget = () => {
    if (currentPlan === 'free') return 'starter';
    return 'business';
  };

  const handleAddGoal = (newGoal: Goal) => {
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const filteredGoals = goals.filter(goal => {
    let passesFilter = true;
    
    // Filter by category
    if (categoryFilter !== 'all') {
      passesFilter = passesFilter && goal.category === categoryFilter;
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      passesFilter = passesFilter && goal.status === statusFilter;
    }
    
    // Filter by active/completed tab
    if (activeTab === 'active') {
      passesFilter = passesFilter && goal.status !== 'concluída';
    } else if (activeTab === 'completed') {
      passesFilter = passesFilter && goal.status === 'concluída';
    }
    
    return passesFilter;
  });
  
  const categoryCounts = goals.reduce((acc: Record<string, number>, goal) => {
    acc[goal.category] = (acc[goal.category] || 0) + 1;
    return acc;
  }, {});
  
  const categories = Object.keys(categoryCounts);
  
  const statusCounts = {
    concluída: goals.filter(g => g.status === 'concluída').length,
    "em andamento": goals.filter(g => g.status === 'em andamento').length,
    atrasada: goals.filter(g => g.status === 'atrasada').length
  };

  const calculateOverallProgress = () => {
    if (goals.length === 0) return 0;
    
    const totalProgress = goals.reduce((acc, goal) => {
      return acc + (goal.currentValue / goal.targetValue) * 100;
    }, 0);
    
    return Math.round(totalProgress / goals.length);
  };
  
  const getChartData = () => {
    return categories.map(category => {
      const categoryGoals = goals.filter(g => g.category === category);
      const totalGoals = categoryGoals.length;
      const completedGoals = categoryGoals.filter(g => g.status === 'concluída').length;
      const progress = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
      
      return {
        category,
        total: totalGoals,
        completed: completedGoals,
        progress
      };
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 flex items-center">
              <Target className="mr-2 text-primary" size={28} />
              Metas
            </h1>
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200 dark:border-blue-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center text-blue-700 dark:text-blue-300">
                      <Target size={18} className="mr-2" />
                      Total de Metas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                      {goals.length}
                    </div>
                    <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">
                      {statusCounts["em andamento"]} em andamento
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border-green-200 dark:border-green-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center text-green-700 dark:text-green-300">
                      <Award size={18} className="mr-2" />
                      Metas Concluídas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                      {statusCounts.concluída}
                    </div>
                    <p className="text-sm text-green-600/70 dark:text-green-400/70 mt-1">
                      {Math.round((statusCounts.concluída / goals.length) * 100) || 0}% do total
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200 dark:border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center text-amber-700 dark:text-amber-300">
                      <TrendingUp size={18} className="mr-2" />
                      Progresso Geral
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                      {calculateOverallProgress()}%
                    </div>
                    <Progress value={calculateOverallProgress()} className="h-2 mt-2" />
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 border-red-200 dark:border-red-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center text-red-700 dark:text-red-300">
                      <Calendar size={18} className="mr-2" />
                      Metas Atrasadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-700 dark:text-red-300">
                      {statusCounts.atrasada}
                    </div>
                    <p className="text-sm text-red-600/70 dark:text-red-400/70 mt-1">
                      Requerem atenção imediata
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">Suas Metas</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas categorias</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos status</SelectItem>
                        <SelectItem value="em andamento">Em andamento</SelectItem>
                        <SelectItem value="concluída">Concluídas</SelectItem>
                        <SelectItem value="atrasada">Atrasadas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <AddGoalDialog onAddGoal={handleAddGoal} />
                </div>
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-1">
                          <Target size={16} /> 
                          Acompanhamento de Metas
                        </CardTitle>
                        <Tabs 
                          value={activeTab} 
                          onValueChange={setActiveTab} 
                          className="mr-auto ml-4"
                        >
                          <TabsList className="h-8">
                            <TabsTrigger value="active" className="text-xs px-3 h-7">Ativas</TabsTrigger>
                            <TabsTrigger value="completed" className="text-xs px-3 h-7">Concluídas</TabsTrigger>
                            <TabsTrigger value="all" className="text-xs px-3 h-7">Todas</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                      <CardDescription className="text-xs">Acompanhe o progresso das suas metas de negócio</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2">
                          <Badge variant="secondary">Em andamento: {statusCounts["em andamento"]}</Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Concluídas: {statusCounts.concluída}</Badge>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Atrasadas: {statusCounts.atrasada}</Badge>
                        </div>
                      </div>
                      <GoalTracker goals={filteredGoals} onGoalsChange={setGoals} />
                      
                      {filteredGoals.length === 0 && (
                        <div className="text-center py-8">
                          <Target className="mx-auto h-12 w-12 text-muted-foreground/60" />
                          <h3 className="mt-2 text-lg font-semibold">Nenhuma meta encontrada</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activeTab === 'active' 
                              ? 'Não há metas ativas com os filtros selecionados.' 
                              : activeTab === 'completed'
                                ? 'Você ainda não concluiu nenhuma meta.'
                                : 'Não foram encontradas metas com os filtros selecionados.'}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              setCategoryFilter('all');
                              setStatusFilter('all');
                            }}
                          >
                            Limpar filtros
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Resumo de Metas</CardTitle>
                      <CardDescription className="text-xs">Visão geral do status das suas metas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2 mb-3">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 justify-between">
                            <span>Metas concluídas</span>
                            <span className="font-bold">{statusCounts.concluída}</span>
                          </Badge>
                          <Badge variant="secondary" className="justify-between">
                            <span>Metas em andamento</span>
                            <span className="font-bold">{statusCounts["em andamento"]}</span>
                          </Badge>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 justify-between">
                            <span>Metas atrasadas</span>
                            <span className="font-bold">{statusCounts.atrasada}</span>
                          </Badge>
                        </div>
                        
                        <div className="pt-4 mt-4 border-t">
                          <h4 className="text-sm font-medium mb-2">Desempenho</h4>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${calculateOverallProgress()}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-muted-foreground">0%</span>
                            <span className="text-xs font-medium">{calculateOverallProgress()}%</span>
                            <span className="text-xs text-muted-foreground">100%</span>
                          </div>
                        </div>
                        
                        <div className="pt-4 mt-4 border-t">
                          <h4 className="text-sm font-medium mb-3">Progresso por categoria</h4>
                          <div className="space-y-3">
                            {getChartData().map((data, i) => (
                              <div key={i}>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs">{data.category}</span>
                                  <span className="text-xs font-medium">{data.progress}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1.5">
                                  <div 
                                    className={`h-1.5 rounded-full ${
                                      data.progress >= 75 ? 'bg-green-500' : 
                                      data.progress >= 50 ? 'bg-amber-500' : 
                                      'bg-primary'
                                    }`}
                                    style={{ width: `${data.progress}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {data.completed} de {data.total} concluídas
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;
