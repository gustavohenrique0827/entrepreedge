
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import GoalTracker from "@/components/GoalTracker";
import AddGoalDialog from "@/components/goals/AddGoalDialog";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Filter, Search } from 'lucide-react';
import api from '@/services/dbService';
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/contexts/SubscriptionContext";

// Define the Goal interface
export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  dueDate: string;
  category: string;
  status: "em andamento" | "concluída" | "atrasada";
  priority: string;
  createdAt: string;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { toast } = useToast();
  const { hasAccess } = useSubscription();

  // Define navigation items for Navbar
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Finanças', href: '/finances', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Metas', href: '/goals', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Aprendizados', href: '/learn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
  ];

  // Check if user has access to goals module
  useEffect(() => {
    // If user doesn't have access to goals module, show toast notification
    if (!hasAccess('goals')) {
      toast({
        title: "Acesso restrito",
        description: "O módulo de metas está disponível apenas para planos pagos. Faça upgrade para acessar.",
        variant: "destructive",
      });
    }
  }, [hasAccess, toast]);

  // Fetch goals from database on component mount
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsData = await api.goals.getAll();
        setGoals(goalsData);
      } catch (error) {
        console.error("Error fetching goals:", error);
        toast({
          title: "Erro ao carregar metas",
          description: "Não foi possível carregar suas metas. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    };
    
    if (hasAccess('goals')) {
      fetchGoals();
    }
  }, [toast, hasAccess]);

  // Handle adding a new goal
  const handleAddGoal = async (goal: Goal) => {
    try {
      await api.goals.add(goal);
      setGoals(prev => [...prev, goal]);
      toast({
        title: "Meta adicionada",
        description: "Sua meta foi adicionada com sucesso.",
      });
    } catch (error) {
      console.error("Error adding goal:", error);
      toast({
        title: "Erro ao adicionar meta",
        description: "Não foi possível adicionar sua meta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Handle updating goals
  const handleGoalsChange = async (updatedGoals: Goal[]) => {
    try {
      // Find which goal was updated
      const updatedGoal = updatedGoals.find(
        (goal) => !goals.some((g) => g.id === goal.id && JSON.stringify(g) === JSON.stringify(goal))
      );
      
      if (updatedGoal) {
        await api.goals.update(updatedGoal);
      }
      
      setGoals(updatedGoals);
    } catch (error) {
      console.error("Error updating goals:", error);
      toast({
        title: "Erro ao atualizar metas",
        description: "Não foi possível atualizar suas metas. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Filter goals based on search query, status filter and category filter
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          goal.description.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesStatusFilter = filter === 'all' || 
                               (filter === 'pending' && goal.status === 'em andamento') ||
                               (filter === 'completed' && goal.status === 'concluída') ||
                               (filter === 'overdue' && goal.status === 'atrasada');
                               
    const matchesCategoryFilter = categoryFilter === 'all' || goal.category === categoryFilter;
    
    return matchesSearch && matchesStatusFilter && matchesCategoryFilter;
  });

  // If user doesn't have access to goals module, show upgrade message
  if (!hasAccess('goals')) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <div className="flex-1 ml-[240px] transition-all duration-300">
          <Navbar items={navItems} />
          <PageContainer>
            <Helmet>
              <title>Metas e Objetivos | Sistema</title>
            </Helmet>
            
            <PageHeader
              title="Metas e Objetivos"
              subtitle="Acompanhe e gerencie os objetivos estratégicos da sua empresa"
            />
            
            <div className="bg-muted/10 border border-dashed rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">Módulo de Metas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                O módulo de metas está disponível apenas para planos pagos. Faça upgrade para acessar.
              </p>
              <Button onClick={() => window.location.href = '/settings'} className="bg-gradient-to-r from-primary to-primary-foreground">
                Fazer upgrade
              </Button>
            </div>
          </PageContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        <PageContainer>
          <Helmet>
            <title>Metas e Objetivos | Sistema</title>
          </Helmet>
          
          <PageHeader
            title="Metas e Objetivos"
            subtitle="Acompanhe e gerencie os objetivos estratégicos da sua empresa"
            actionButton={<AddGoalDialog onAddGoal={handleAddGoal} />}
          />
          
          <div className="mb-6">
            <Tabs defaultValue="list" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <TabsList className="mb-4 sm:mb-0">
                  <TabsTrigger value="list">Lista</TabsTrigger>
                  <TabsTrigger value="kanban">Kanban</TabsTrigger>
                  <TabsTrigger value="calendar">Calendário</TabsTrigger>
                </TabsList>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar metas..."
                      className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <span>Status</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="pending">Em andamento</SelectItem>
                        <SelectItem value="completed">Concluídas</SelectItem>
                        <SelectItem value="overdue">Atrasadas</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <div className="flex items-center">
                          <ChevronDown className="mr-2 h-4 w-4" />
                          <span>Categoria</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        <SelectItem value="Vendas">Vendas</SelectItem>
                        <SelectItem value="Finanças">Finanças</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="RH">RH</SelectItem>
                        <SelectItem value="Operações">Operações</SelectItem>
                        <SelectItem value="Educação">Educação</SelectItem>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Inovação">Inovação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <TabsContent value="list" className="mt-0">
                <div className="rounded-lg border">
                  <div className="p-4 sm:p-6">
                    <GoalTracker
                      goals={filteredGoals}
                      onGoalsChange={handleGoalsChange}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="kanban" className="mt-0">
                <div className="bg-muted/10 border border-dashed rounded-lg p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">Visualização Kanban</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A visualização Kanban estará disponível em breve.
                  </p>
                  <Button variant="outline">Ativar Versão Beta</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-0">
                <div className="bg-muted/10 border border-dashed rounded-lg p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">Visualização de Calendário</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A visualização de Calendário estará disponível em breve.
                  </p>
                  <Button variant="outline">Ativar Versão Beta</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </PageContainer>
      </div>
    </div>
  );
};

export default Goals;
