
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import GoalTracker from "@/components/GoalTracker";
import AddGoalDialog from "@/components/goals/AddGoalDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Filter, Search } from 'lucide-react';
import api from '@/services/dbService';
import { useToast } from "@/hooks/use-toast";

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
    
    fetchGoals();
  }, [toast]);

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

  return (
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
  );
};

export default Goals;
