
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Check, Clock, Filter, Plus, Search, Users, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { NewProcessDialog } from '@/components/personnel/NewProcessDialog';
import { ProcessStepsDialog } from '@/components/personnel/ProcessStepsDialog';
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

type Process = {
  id: string;
  title: string;
  description: string;
  status: 'em_andamento' | 'concluido' | 'aguardando';
  category: string;
  assignedTo: string;
  dueDate: string;
  steps: {
    id: string;
    description: string;
    completed: boolean;
  }[];
};

const HRProcesses = () => {
  const [selectedProcess, setSelectedProcess] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newProcessDialog, setNewProcessDialog] = useState(false);
  const [processStepsDialog, setProcessStepsDialog] = useState(false);
  const [selectedProcessData, setSelectedProcessData] = useState<Process | null>(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [processToComplete, setProcessToComplete] = useState<string | null>(null);
  const { toast } = useToast();

  // Dados de exemplo para processos de RH
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: "1",
      title: "Onboarding de Novo Funcionário",
      description: "Processo de integração de novo colaborador na empresa",
      status: "em_andamento",
      category: "Onboarding",
      assignedTo: "Maria Silva",
      dueDate: "2023-12-25",
      steps: [
        { id: "1-1", description: "Preparar documentação", completed: true },
        { id: "1-2", description: "Configurar acesso aos sistemas", completed: true },
        { id: "1-3", description: "Apresentar à equipe", completed: false }
      ]
    },
    {
      id: "2",
      title: "Avaliação de Desempenho Trimestral",
      description: "Avaliação de desempenho do time de marketing",
      status: "aguardando",
      category: "Avaliação",
      assignedTo: "João Oliveira",
      dueDate: "2024-01-15",
      steps: [
        { id: "2-1", description: "Definir metas e expectativas", completed: true },
        { id: "2-2", description: "Realizar avaliações individuais", completed: false },
        { id: "2-3", description: "Fornecer feedback construtivo", completed: false }
      ]
    },
    {
      id: "3",
      title: "Treinamento em Liderança",
      description: "Programa de desenvolvimento para novos gestores",
      status: "concluido",
      category: "Treinamento",
      assignedTo: "Ana Santos",
      dueDate: "2023-11-30",
      steps: [
        { id: "3-1", description: "Identificar necessidades de treinamento", completed: true },
        { id: "3-2", description: "Conduzir workshops de liderança", completed: true },
        { id: "3-3", description: "Avaliar resultados do treinamento", completed: true }
      ]
    },
    {
      id: "4",
      title: "Offboarding de Colaborador",
      description: "Processo de desligamento de colaborador",
      status: "em_andamento",
      category: "Offboarding",
      assignedTo: "Carlos Mendes",
      dueDate: "2023-12-10",
      steps: [
        { id: "4-1", description: "Realizar entrevista de desligamento", completed: true },
        { id: "4-2", description: "Recolher equipamentos", completed: false },
        { id: "4-3", description: "Revogar acessos aos sistemas", completed: false }
      ]
    }
  ]);

  // Filtrar processos baseado no filtro de status e busca
  const filteredProcesses = processes.filter(process => {
    const matchesSearch = 
      process.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      process.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'em_andamento' && process.status === 'em_andamento') ||
      (statusFilter === 'concluido' && process.status === 'concluido') ||
      (statusFilter === 'aguardando' && process.status === 'aguardando');
    
    return matchesSearch && matchesStatus;
  });

  // Filtrar processos por categoria atual selecionada na tab
  const processesForTab = filteredProcesses.filter(
    process => selectedProcess === 'all' || process.category.toLowerCase() === selectedProcess.toLowerCase()
  );

  const handleProcessComplete = (processId: string) => {
    setProcessToComplete(processId);
    setConfirmDialog(true);
  };

  const confirmProcessComplete = () => {
    if (!processToComplete) return;
    
    setProcesses(processes.map(p => {
      if (p.id === processToComplete) {
        return {
          ...p,
          status: p.status === 'concluido' ? 'em_andamento' : 'concluido',
          steps: p.status === 'concluido' 
            ? p.steps 
            : p.steps.map(step => ({ ...step, completed: true }))
        };
      }
      return p;
    }));
    
    const targetProcess = processes.find(p => p.id === processToComplete);
    const newStatus = targetProcess?.status === 'concluido' ? 'reaberto' : 'concluído';
    
    toast({
      title: `Processo ${newStatus}`,
      description: `O processo foi marcado como ${newStatus} com sucesso.`,
    });
    
    setConfirmDialog(false);
    setProcessToComplete(null);
  };

  const handleViewProcess = (process: Process) => {
    setSelectedProcessData(process);
    setProcessStepsDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'em_andamento':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            Em Andamento
          </Badge>
        );
      case 'concluido':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
            <Check className="mr-1 h-3 w-3" />
            Concluído
          </Badge>
        );
      case 'aguardando':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Aguardando
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Definir os itens de navegação para o Navbar
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Finanças', href: '/finances', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Metas', href: '/goals', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Aprendizados', href: '/learn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        <PageContainer>
          <PageHeader title="Processos de RH" description="Gerencie os processos de recursos humanos da sua empresa" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar processos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full sm:w-[300px]"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="em_andamento">Em andamento</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="aguardando">Aguardando</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="w-full sm:w-auto" onClick={() => setNewProcessDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Processo
              </Button>
            </div>
          </div>

          <Tabs value={selectedProcess} onValueChange={setSelectedProcess} className="w-full space-y-6">
            <TabsList className="w-full sm:w-auto flex flex-wrap">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
              <TabsTrigger value="avaliação">Avaliação</TabsTrigger>
              <TabsTrigger value="treinamento">Treinamento</TabsTrigger>
              <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedProcess} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {processesForTab.length > 0 ? (
                  processesForTab.map((process) => (
                    <Card key={process.id} className="overflow-hidden flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-base">{process.title}</CardTitle>
                            <CardDescription className="text-xs mt-1">{process.description}</CardDescription>
                          </div>
                          {getStatusBadge(process.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-xs text-muted-foreground">Responsável</p>
                              <p className="font-medium flex items-center">
                                <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                                {process.assignedTo}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Data Limite</p>
                              <p className="font-medium">{formatDate(process.dueDate)}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">Progresso</p>
                            <div className="space-y-2">
                              {process.steps.map((step) => (
                                <div key={step.id} className="flex items-start gap-2">
                                  <div className={`rounded-full p-0.5 mt-0.5 ${step.completed ? "bg-green-500" : "bg-muted border"}`}>
                                    {step.completed ? (
                                      <Check className="h-3 w-3 text-white" />
                                    ) : (
                                      <div className="h-3 w-3" />
                                    )}
                                  </div>
                                  <span className={`text-sm ${step.completed ? "line-through text-muted-foreground" : ""}`}>
                                    {step.description}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          {process.steps.filter(s => s.completed).length} de {process.steps.length} etapas
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="secondary"
                            className="text-xs"
                            onClick={() => handleViewProcess(process)}
                          >
                            Gerenciar
                          </Button>
                          <Button 
                            size="sm" 
                            variant={process.status === 'concluido' ? "outline" : "default"}
                            className="text-xs"
                            onClick={() => handleProcessComplete(process.id)}
                          >
                            {process.status === 'concluido' ? 'Reabrir' : 'Concluir'}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full bg-muted/10 border border-dashed rounded-lg p-8 text-center">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
                    <h3 className="text-xl font-medium mb-2">Nenhum processo encontrado</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Não foram encontrados processos que correspondam aos critérios de busca.
                    </p>
                    <Button onClick={() => setNewProcessDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Criar Novo Processo
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </PageContainer>
        
        <NewProcessDialog 
          open={newProcessDialog}
          onOpenChange={setNewProcessDialog}
        />

        <ProcessStepsDialog
          open={processStepsDialog}
          onOpenChange={setProcessStepsDialog}
          process={selectedProcessData}
        />

        <AlertDialog open={confirmDialog} onOpenChange={setConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Alterar Status do Processo</AlertDialogTitle>
              <AlertDialogDescription>
                {processToComplete && processes.find(p => p.id === processToComplete)?.status === 'concluido' ? (
                  "Tem certeza que deseja reabrir este processo?"
                ) : (
                  "Tem certeza que deseja marcar este processo como concluído? Todas as etapas serão marcadas como concluídas."
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmProcessComplete}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default HRProcesses;
