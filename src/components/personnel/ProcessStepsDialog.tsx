
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X, Users, Calendar, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface ProcessStep {
  id: string;
  description: string;
  completed: boolean;
}

interface Process {
  id: string;
  title: string;
  description: string;
  status: 'em_andamento' | 'concluido' | 'aguardando';
  category: string;
  assignedTo: string;
  dueDate: string;
  steps: ProcessStep[];
}

interface ProcessStepsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process: Process | null;
}

export function ProcessStepsDialog({ 
  open, 
  onOpenChange, 
  process 
}: ProcessStepsDialogProps) {
  const { toast } = useToast();
  const [alertOpen, setAlertOpen] = useState(false);
  const [localProcess, setLocalProcess] = useState<Process | null>(null);
  
  React.useEffect(() => {
    if (process) {
      setLocalProcess({ ...process });
    }
  }, [process]);

  if (!localProcess) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getCompletedPercent = () => {
    const completed = localProcess.steps.filter(s => s.completed).length;
    return (completed / localProcess.steps.length) * 100;
  };

  const handleToggleStep = (stepId: string) => {
    setLocalProcess(prev => {
      if (!prev) return null;
      return {
        ...prev,
        steps: prev.steps.map(step => 
          step.id === stepId ? { ...step, completed: !step.completed } : step
        )
      };
    });

    toast({
      title: "Etapa atualizada",
      description: "O status da etapa foi atualizado com sucesso.",
    });
  };

  const handleComplete = () => {
    onOpenChange(false);
    toast({
      title: "Processo concluído",
      description: `O processo "${localProcess.title}" foi marcado como concluído.`,
    });
  };

  const handleCancel = () => {
    setAlertOpen(true);
  };

  const confirmCancel = () => {
    setAlertOpen(false);
    onOpenChange(false);
    toast({
      title: "Processo cancelado",
      description: `O processo "${localProcess.title}" foi cancelado.`,
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'em_andamento':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Em Andamento</Badge>;
      case 'concluido':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Concluído</Badge>;
      case 'aguardando':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Aguardando</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{localProcess.title}</DialogTitle>
              {getStatusBadge(localProcess.status)}
            </div>
            <DialogDescription>
              {localProcess.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Responsável</p>
                <p className="font-medium flex items-center">
                  <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                  {localProcess.assignedTo}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Data Limite</p>
                <p className="font-medium flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                  {formatDate(localProcess.dueDate)}
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Progresso</h4>
                <span className="text-xs text-muted-foreground">
                  {localProcess.steps.filter(s => s.completed).length} de {localProcess.steps.length} etapas
                </span>
              </div>
              <Progress value={getCompletedPercent()} className="h-2" />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Etapas do Processo</h4>
              <div className="space-y-2">
                {localProcess.steps.map((step) => (
                  <div 
                    key={step.id}
                    className={`flex items-center justify-between p-3 rounded border ${
                      step.completed ? "bg-muted/40" : "bg-card"
                    }`}
                  >
                    <span className={step.completed ? "line-through text-muted-foreground" : ""}>
                      {step.description}
                    </span>
                    <Button
                      variant={step.completed ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleToggleStep(step.id)}
                    >
                      {step.completed ? (
                        <X className="mr-1 h-4 w-4" />
                      ) : (
                        <Check className="mr-1 h-4 w-4" />
                      )}
                      {step.completed ? "Desfazer" : "Concluir"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="destructive" 
              onClick={handleCancel}
            >
              Cancelar Processo
            </Button>
            <Button 
              onClick={handleComplete} 
              disabled={localProcess.steps.some(s => !s.completed)}
            >
              {localProcess.steps.some(s => !s.completed) ? (
                "Complete todas as etapas"
              ) : (
                "Concluir Processo"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Processo</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col items-center py-4">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <p>
                  Tem certeza que deseja cancelar este processo? Esta ação não poderá ser desfeita.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não, manter processo</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>
              Sim, cancelar processo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
