
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import AddGoalDialog from './goals/AddGoalDialog';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  dueDate: string;
  category: string;
}

// Sample data
const sampleGoals: Goal[] = [
  {
    id: '1',
    title: 'Aumentar vendas mensais',
    description: 'Alcançar R$ 15.000 em vendas mensais até o final do trimestre',
    targetValue: 15000,
    currentValue: 8750,
    dueDate: '2023-09-30',
    category: 'Vendas'
  },
  {
    id: '2',
    title: 'Reduzir custos operacionais',
    description: 'Diminuir custos operacionais em 15% nos próximos 2 meses',
    targetValue: 15,
    currentValue: 7,
    dueDate: '2023-08-31',
    category: 'Finanças'
  },
  {
    id: '3',
    title: 'Expandir base de clientes',
    description: 'Adicionar 20 novos clientes ativos',
    targetValue: 20,
    currentValue: 8,
    dueDate: '2023-10-15',
    category: 'Marketing'
  },
];

const GoalTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(
    JSON.parse(localStorage.getItem('goals') || JSON.stringify(sampleGoals))
  );
  const { hasAccess } = useSubscription();

  // Save goals to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (newGoal: Goal) => {
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const formatProgress = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (progress: number, daysRemaining: number) => {
    if (progress >= 75) return 'text-green-500';
    if (progress >= 50) return 'text-yellow-500';
    if (daysRemaining < 14) return 'text-red-500';
    return 'text-blue-500';
  };

  return (
    <div className="animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Metas SMART</h2>
          <p className="text-muted-foreground">Acompanhe o progresso de suas metas estratégicas</p>
        </div>
        <AddGoalDialog onAddGoal={handleAddGoal} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {goals.length === 0 ? (
          <Card className="glass p-6 text-center">
            <p className="text-muted-foreground">Nenhuma meta encontrada. Clique em "Nova meta" para começar.</p>
          </Card>
        ) : (
          goals.map((goal) => {
            const progressPercent = formatProgress(goal.currentValue, goal.targetValue);
            const daysRemaining = getDaysRemaining(goal.dueDate);
            const statusColor = getStatusColor(progressPercent, daysRemaining);
            
            return (
              <Card key={goal.id} className="glass overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className={`h-1 ${progressPercent > 75 ? 'bg-green-500' : progressPercent > 50 ? 'bg-yellow-500' : progressPercent > 25 ? 'bg-orange-500' : 'bg-red-500'}`} />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription className="mt-1">{goal.description}</CardDescription>
                    </div>
                    <div className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded">
                      {goal.category}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span>Progresso</span>
                    <span className="font-medium">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2 mb-4" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Meta</p>
                      <p className="font-medium">{
                        goal.category === 'Finanças' && goal.targetValue < 100 
                          ? `${goal.targetValue}%` 
                          : goal.category === 'Vendas' 
                            ? `R$ ${goal.targetValue.toLocaleString('pt-BR')}` 
                            : goal.targetValue
                      }</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Atual</p>
                      <p className="font-medium">{
                        goal.category === 'Finanças' && goal.targetValue < 100 
                          ? `${goal.currentValue}%` 
                          : goal.category === 'Vendas' 
                            ? `R$ ${goal.currentValue.toLocaleString('pt-BR')}` 
                            : goal.currentValue
                      }</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Prazo: </span>
                    <span>{formatDate(goal.dueDate)}</span>
                  </div>
                  <div className={`text-sm font-medium ${statusColor}`}>
                    {daysRemaining > 0 
                      ? `${daysRemaining} dias restantes` 
                      : daysRemaining === 0 
                        ? "Vence hoje" 
                        : "Meta vencida"}
                  </div>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
      
      {!hasAccess('customReports') && (
        <div className="mt-6 p-4 bg-muted rounded-md text-sm">
          <p className="text-muted-foreground">Atualize para o plano Empresarial ou Premium para acessar relatórios avançados de metas e análises preditivas.</p>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
