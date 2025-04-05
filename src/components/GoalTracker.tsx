
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Check,
  AlertTriangle,
  Clock,
  MoreHorizontal,
  Target,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  BarChart,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  dueDate: string;
  category: string;
  status?: string;
}

interface GoalTrackerProps {
  goals?: Goal[];
  onGoalsChange?: (goals: Goal[]) => void;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ goals: propGoals, onGoalsChange }) => {
  const { toast } = useToast();
  const [expandedGoals, setExpandedGoals] = useState<string[]>([]);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deleteConfirmGoal, setDeleteConfirmGoal] = useState<string | null>(null);
  const [progressUpdate, setProgressUpdate] = useState<{ id: string; value: number } | null>(null);

  // Sample data if no goals are provided through props
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

  const [goals, setGoals] = useState<Goal[]>(propGoals || sampleGoals);

  // Update internal state if props change
  React.useEffect(() => {
    if (propGoals) {
      setGoals(propGoals);
    }
  }, [propGoals]);

  const handleSaveEdit = () => {
    if (!editingGoal) return;
    
    const updatedGoals = goals.map(goal => 
      goal.id === editingGoal.id ? editingGoal : goal
    );
    
    setGoals(updatedGoals);
    if (onGoalsChange) onGoalsChange(updatedGoals);
    
    setEditingGoal(null);
    
    toast({
      title: "Meta atualizada",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleDeleteGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    if (onGoalsChange) onGoalsChange(updatedGoals);
    
    setDeleteConfirmGoal(null);
    
    toast({
      title: "Meta excluída",
      description: "A meta foi removida permanentemente.",
    });
  };

  const handleUpdateProgress = () => {
    if (!progressUpdate) return;
    
    const updatedGoals = goals.map(goal => {
      if (goal.id === progressUpdate.id) {
        // Calculate if this goal is now complete
        const newValue = progressUpdate.value;
        const isComplete = newValue >= goal.targetValue;
        
        return {
          ...goal,
          currentValue: newValue,
          status: isComplete ? 'concluída' : goal.status
        };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    if (onGoalsChange) onGoalsChange(updatedGoals);
    
    setProgressUpdate(null);
    
    toast({
      title: "Progresso atualizado",
      description: "O progresso da meta foi atualizado com sucesso.",
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedGoals(prev => 
      prev.includes(id) ? prev.filter(goalId => goalId !== id) : [...prev, id]
    );
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vendas':
        return <BarChart size={16} className="text-blue-500" />;
      case 'finanças':
        return <BarChart size={16} className="text-green-500" />;
      case 'marketing':
        return <BarChart size={16} className="text-purple-500" />;
      case 'rh':
        return <BarChart size={16} className="text-amber-500" />;
      case 'operações':
        return <BarChart size={16} className="text-indigo-500" />;
      default:
        return <Target size={16} className="text-primary" />;
    }
  };

  const getStatusBadge = (goal: Goal) => {
    const progressPercent = formatProgress(goal.currentValue, goal.targetValue);
    const daysRemaining = getDaysRemaining(goal.dueDate);
    
    if (goal.status === 'concluída' || progressPercent >= 100) {
      return (
        <div className="flex items-center bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
          <Check size={12} className="mr-1" />
          <span>Concluída</span>
        </div>
      );
    } else if (daysRemaining < 0) {
      return (
        <div className="flex items-center bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
          <AlertTriangle size={12} className="mr-1" />
          <span>Atrasada</span>
        </div>
      );
    } else if (daysRemaining <= 7) {
      return (
        <div className="flex items-center bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">
          <Clock size={12} className="mr-1" />
          <span>Urgente</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
          <Target size={12} className="mr-1" />
          <span>Em andamento</span>
        </div>
      );
    }
  };

  if (goals.length === 0) {
    return (
      <div className="text-center py-10 bg-muted/10 border border-dashed rounded-md">
        <Target className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
        <h3 className="text-lg font-medium mb-2">Nenhuma meta encontrada</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Você ainda não adicionou nenhuma meta. Comece criando sua primeira meta SMART.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progressPercent = formatProgress(goal.currentValue, goal.targetValue);
        const daysRemaining = getDaysRemaining(goal.dueDate);
        const isExpanded = expandedGoals.includes(goal.id);
        
        return (
          <Card 
            key={goal.id} 
            className={`transition-all duration-200 ${
              isExpanded ? 'shadow-md' : ''
            }`}
          >
            <CardHeader className="p-4 pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    {getCategoryIcon(goal.category)}
                  </div>
                  <div>
                    <CardTitle className="text-base">{goal.title}</CardTitle>
                    <CardDescription className="text-xs mt-1 line-clamp-1">
                      {goal.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(goal)}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setProgressUpdate({ id: goal.id, value: goal.currentValue })}>
                        <Target className="mr-2 h-4 w-4" />
                        <span>Atualizar progresso</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingGoal(goal)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar meta</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setDeleteConfirmGoal(goal.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="mt-3 pt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progresso</span>
                  <span className="text-xs font-medium">{progressPercent}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      progressPercent >= 100
                        ? 'bg-green-500'
                        : progressPercent >= 75
                        ? 'bg-emerald-500'
                        : progressPercent >= 50
                        ? 'bg-amber-500'
                        : progressPercent >= 25
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, progressPercent)}%` }}
                  ></div>
                </div>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="px-4 pb-2 pt-0">
                <div className="border-t pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Categoria
                      </h4>
                      <p className="text-sm font-medium flex items-center">
                        {getCategoryIcon(goal.category)}
                        <span className="ml-1">{goal.category}</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Data limite
                      </h4>
                      <p className="text-sm font-medium flex items-center">
                        <Calendar size={16} className="mr-1 text-muted-foreground" />
                        <span>{formatDate(goal.dueDate)}</span>
                        {daysRemaining > 0 && (
                          <span className="text-xs text-muted-foreground ml-1">
                            ({daysRemaining} dias restantes)
                          </span>
                        )}
                        {daysRemaining <= 0 && (
                          <span className="text-xs text-red-500 ml-1">
                            (Meta atrasada)
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Valor atual / Meta
                      </h4>
                      <p className="text-sm font-medium">
                        {goal.currentValue} / {goal.targetValue}
                        {typeof goal.targetValue === 'number' && goal.targetValue > 100 ? ' R$' : '%'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">
                      Descrição completa
                    </h4>
                    <p className="text-sm">{goal.description}</p>
                  </div>
                </div>
              </CardContent>
            )}
            
            <CardFooter className="p-2 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={() => toggleExpand(goal.id)}
              >
                {isExpanded ? (
                  <span className="flex items-center">
                    Recolher <ChevronUp size={16} className="ml-1" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Expandir <ChevronDown size={16} className="ml-1" />
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}

      {/* Edit goal dialog */}
      <Dialog open={!!editingGoal} onOpenChange={(open) => !open && setEditingGoal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Meta</DialogTitle>
            <DialogDescription>
              Faça alterações na sua meta. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          
          {editingGoal && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={editingGoal.title}
                  onChange={(e) => setEditingGoal({...editingGoal, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={editingGoal.description}
                  onChange={(e) => setEditingGoal({...editingGoal, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetValue">Valor alvo</Label>
                  <Input
                    id="targetValue"
                    type="number"
                    value={editingGoal.targetValue}
                    onChange={(e) => setEditingGoal({...editingGoal, targetValue: Number(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentValue">Valor atual</Label>
                  <Input
                    id="currentValue"
                    type="number"
                    value={editingGoal.currentValue}
                    onChange={(e) => setEditingGoal({...editingGoal, currentValue: Number(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={editingGoal.category}
                    onChange={(e) => setEditingGoal({...editingGoal, category: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Data limite</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={editingGoal.dueDate}
                    onChange={(e) => setEditingGoal({...editingGoal, dueDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingGoal(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update progress dialog */}
      <Dialog open={!!progressUpdate} onOpenChange={(open) => !open && setProgressUpdate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Progresso</DialogTitle>
            <DialogDescription>
              Atualize o progresso atual desta meta.
            </DialogDescription>
          </DialogHeader>
          
          {progressUpdate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="progress">Valor atual</Label>
                <Input
                  id="progress"
                  type="number"
                  value={progressUpdate.value}
                  onChange={(e) => setProgressUpdate({...progressUpdate, value: Number(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Meta</Label>
                <p className="text-sm">
                  {goals.find(g => g.id === progressUpdate.id)?.targetValue}
                  {typeof goals.find(g => g.id === progressUpdate.id)?.targetValue === 'number' && 
                   goals.find(g => g.id === progressUpdate.id)?.targetValue as number > 100 ? ' R$' : '%'}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setProgressUpdate(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateProgress}>Atualizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteConfirmGoal} onOpenChange={(open) => !open && setDeleteConfirmGoal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta meta? Esta ação não poderá ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmGoal(null)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteConfirmGoal && handleDeleteGoal(deleteConfirmGoal)}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalTracker;
