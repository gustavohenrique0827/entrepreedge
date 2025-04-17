
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, UserPlus, Search, BarChart, UserCheck, FileText, Trash2, Plus, Check, ArrowUpDown, ListFilter, Users, UserMinus, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useToast } from '@/hooks/use-toast';

// Mock data
const departments = [
  { id: 1, name: 'Tecnologia' },
  { id: 2, name: 'Marketing' },
  { id: 3, name: 'Financeiro' },
  { id: 4, name: 'Recursos Humanos' },
  { id: 5, name: 'Operações' },
  { id: 6, name: 'Comercial' },
  { id: 7, name: 'Administrativo' }
];

const initialProcesses = [
  {
    id: 1,
    title: 'Desenvolvedor Full Stack',
    type: 'recruitment',
    department: 'Tecnologia',
    status: 'in_progress',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
    progress: 60,
    candidates: 12,
    interviews: 5,
    approved: 2,
    owner: 'Ana Costa',
    description: 'Processo seletivo para contratação de um desenvolvedor Full Stack com experiência em React e Node.js.',
    steps: [
      { name: 'Triagem de currículos', status: 'completed', date: '2024-04-10' },
      { name: 'Teste técnico', status: 'completed', date: '2024-04-15' },
      { name: 'Entrevista técnica', status: 'in_progress', date: '2024-04-20' },
      { name: 'Entrevista comportamental', status: 'pending', date: '2024-04-25' },
      { name: 'Proposta e contratação', status: 'pending', date: '2024-04-30' }
    ]
  },
  {
    id: 2,
    title: 'Transferência - Pedro Alves',
    type: 'internal_transfer',
    department: 'Marketing',
    status: 'completed',
    startDate: '2024-03-15',
    endDate: '2024-04-01',
    progress: 100,
    owner: 'Ana Costa',
    description: 'Transferência interna do colaborador Pedro Alves do departamento de Vendas para Marketing.',
    steps: [
      { name: 'Solicitação formal', status: 'completed', date: '2024-03-15' },
      { name: 'Aprovação dos gestores', status: 'completed', date: '2024-03-20' },
      { name: 'Ajustes de remuneração', status: 'completed', date: '2024-03-25' },
      { name: 'Transição e treinamento', status: 'completed', date: '2024-03-28' },
      { name: 'Efetivação da transferência', status: 'completed', date: '2024-04-01' }
    ]
  },
  {
    id: 3,
    title: 'Desligamento - Carlos Santos',
    type: 'termination',
    department: 'Financeiro',
    status: 'in_progress',
    startDate: '2024-04-10',
    endDate: '2024-04-30',
    progress: 40,
    owner: 'Ana Costa',
    description: 'Processo de desligamento do colaborador Carlos Santos, a pedido do funcionário.',
    steps: [
      { name: 'Comunicação formal', status: 'completed', date: '2024-04-10' },
      { name: 'Entrevista de desligamento', status: 'completed', date: '2024-04-15' },
      { name: 'Cálculos rescisórios', status: 'in_progress', date: '2024-04-20' },
      { name: 'Devolução de equipamentos', status: 'pending', date: '2024-04-25' },
      { name: 'Homologação e pagamentos', status: 'pending', date: '2024-04-30' }
    ]
  },
  {
    id: 4,
    title: 'Analista de Marketing',
    type: 'recruitment',
    department: 'Marketing',
    status: 'not_started',
    startDate: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 45), 'yyyy-MM-dd'),
    progress: 0,
    candidates: 0,
    interviews: 0,
    approved: 0,
    owner: 'Ana Costa',
    description: 'Processo seletivo para contratação de um analista de marketing digital.',
    steps: [
      { name: 'Triagem de currículos', status: 'pending', date: '2024-04-25' },
      { name: 'Avaliação de portfólio', status: 'pending', date: '2024-05-05' },
      { name: 'Entrevista técnica', status: 'pending', date: '2024-05-15' },
      { name: 'Entrevista com gestor', status: 'pending', date: '2024-05-25' },
      { name: 'Proposta e contratação', status: 'pending', date: '2024-06-01' }
    ]
  }
];

const processTypes = [
  { id: 'recruitment', name: 'Recrutamento e Seleção', icon: <UserPlus className="h-4 w-4" /> },
  { id: 'internal_transfer', name: 'Transferência Interna', icon: <RefreshCw className="h-4 w-4" /> },
  { id: 'termination', name: 'Desligamento', icon: <UserMinus className="h-4 w-4" /> },
  { id: 'integration', name: 'Integração', icon: <Users className="h-4 w-4" /> }
];

const HRProcesses = () => {
  const [processes, setProcesses] = useState(initialProcesses);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<any | null>(null);
  const [isViewProcessDialogOpen, setIsViewProcessDialogOpen] = useState(false);
  const [isNewProcessDialogOpen, setIsNewProcessDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const [processForm, setProcessForm] = useState({
    title: '',
    type: '',
    department: '',
    description: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 30), 'yyyy-MM-dd')
  });
  
  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         process.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || process.type === filterType;
    const matchesStatus = !filterStatus || process.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleInputChange = (field: string, value: string) => {
    setProcessForm(prev => ({ ...prev, [field]: value }));
  };
  
  const handleViewProcess = (process: any) => {
    setSelectedProcess(process);
    setIsViewProcessDialogOpen(true);
  };
  
  const handleCreateProcess = () => {
    if (!processForm.title || !processForm.type || !processForm.department) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    const newProcess = {
      id: processes.length + 1,
      ...processForm,
      status: 'not_started',
      progress: 0,
      candidates: 0,
      interviews: 0,
      approved: 0,
      owner: 'Ana Costa',
      steps: [
        { name: 'Inicialização', status: 'pending', date: processForm.startDate }
      ]
    };
    
    setProcesses([...processes, newProcess]);
    setIsNewProcessDialogOpen(false);
    
    toast({
      title: "Processo criado",
      description: "O processo foi criado com sucesso."
    });
    
    // Reset form
    setProcessForm({
      title: '',
      type: '',
      department: '',
      description: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(addDays(new Date(), 30), 'yyyy-MM-dd')
    });
  };
  
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'not_started':
        return { label: 'Não iniciado', color: 'gray' };
      case 'in_progress':
        return { label: 'Em andamento', color: 'blue' };
      case 'completed':
        return { label: 'Concluído', color: 'green' };
      case 'canceled':
        return { label: 'Cancelado', color: 'red' };
      case 'on_hold':
        return { label: 'Em espera', color: 'yellow' };
      default:
        return { label: 'Desconhecido', color: 'gray' };
    }
  };
  
  const getStepStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Concluído', color: 'green' };
      case 'in_progress':
        return { label: 'Em andamento', color: 'blue' };
      case 'pending':
        return { label: 'Pendente', color: 'gray' };
      default:
        return { label: 'Desconhecido', color: 'gray' };
    }
  };
  
  const getTypeInfo = (type: string) => {
    return processTypes.find(t => t.id === type) || { id: type, name: 'Outro', icon: null };
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="Processos de RH" 
        description="Gerencie recrutamentos, transferências e desligamentos"
      />
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Processos de RH</CardTitle>
                <CardDescription>Acompanhe todos os processos de RH em andamento</CardDescription>
              </div>
              
              <Button onClick={() => setIsNewProcessDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Processo
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar processos..." 
                  className="pl-8" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterType || ''} onValueChange={(value) => setFilterType(value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de processo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  {processTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus || ''} onValueChange={(value) => setFilterStatus(value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="not_started">Não iniciado</SelectItem>
                  <SelectItem value="in_progress">Em andamento</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="on_hold">Em espera</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Término</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progresso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcesses.length > 0 ? (
                    filteredProcesses.map((process) => {
                      const statusInfo = getStatusInfo(process.status);
                      const typeInfo = getTypeInfo(process.type);
                      
                      return (
                        <TableRow 
                          key={process.id} 
                          className="cursor-pointer"
                          onClick={() => handleViewProcess(process)}
                        >
                          <TableCell className="font-medium">{process.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {typeInfo.icon}
                              <span>{typeInfo.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{process.department}</TableCell>
                          <TableCell>{format(new Date(process.startDate), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>{format(new Date(process.endDate), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn(
                              statusInfo.color === 'green' && "border-green-500 text-green-700 dark:text-green-400",
                              statusInfo.color === 'blue' && "border-blue-500 text-blue-700 dark:text-blue-400",
                              statusInfo.color === 'yellow' && "border-yellow-500 text-yellow-700 dark:text-yellow-400",
                              statusInfo.color === 'red' && "border-red-500 text-red-700 dark:text-red-400",
                              statusInfo.color === 'gray' && "border-gray-500 text-gray-700 dark:text-gray-400"
                            )}>
                              {statusInfo.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className={cn(
                                  "h-2.5 rounded-full",
                                  process.progress < 30 ? "bg-blue-500" : 
                                  process.progress < 70 ? "bg-yellow-500" : 
                                  "bg-green-500"
                                )} 
                                style={{ width: `${process.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">{process.progress}%</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewProcess(process);
                              }}
                            >
                              Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        Nenhum processo encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* View Process Dialog */}
        <Dialog open={isViewProcessDialogOpen} onOpenChange={setIsViewProcessDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProcess && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {getTypeInfo(selectedProcess.type).icon}
                    {selectedProcess.title}
                  </DialogTitle>
                  <DialogDescription>
                    Detalhes do processo de {getTypeInfo(selectedProcess.type).name.toLowerCase()}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Departamento</p>
                      <p className="font-medium">{selectedProcess.department}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Responsável</p>
                      <p className="font-medium">{selectedProcess.owner}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Início</p>
                      <p className="font-medium">{format(new Date(selectedProcess.startDate), 'dd/MM/yyyy')}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Término previsto</p>
                      <p className="font-medium">{format(new Date(selectedProcess.endDate), 'dd/MM/yyyy')}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Descrição</p>
                      <p>{selectedProcess.description}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status atual</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn(
                        "text-base px-3 py-1",
                        getStatusInfo(selectedProcess.status).color === 'green' && "border-green-500 text-green-700 dark:text-green-400",
                        getStatusInfo(selectedProcess.status).color === 'blue' && "border-blue-500 text-blue-700 dark:text-blue-400",
                        getStatusInfo(selectedProcess.status).color === 'yellow' && "border-yellow-500 text-yellow-700 dark:text-yellow-400",
                        getStatusInfo(selectedProcess.status).color === 'red' && "border-red-500 text-red-700 dark:text-red-400",
                        getStatusInfo(selectedProcess.status).color === 'gray' && "border-gray-500 text-gray-700 dark:text-gray-400"
                      )}>
                        {getStatusInfo(selectedProcess.status).label}
                      </Badge>
                      
                      <div className="ml-4 flex-1">
                        <div className="w-full bg-muted rounded-full h-3">
                          <div 
                            className={cn(
                              "h-3 rounded-full",
                              selectedProcess.progress < 30 ? "bg-blue-500" : 
                              selectedProcess.progress < 70 ? "bg-yellow-500" : 
                              "bg-green-500"
                            )} 
                            style={{ width: `${selectedProcess.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="font-medium">{selectedProcess.progress}%</span>
                    </div>
                  </div>
                  
                  {selectedProcess.type === 'recruitment' && (
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-3xl font-bold">{selectedProcess.candidates}</p>
                          <p className="text-sm text-muted-foreground">Candidatos</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-3xl font-bold">{selectedProcess.interviews}</p>
                          <p className="text-sm text-muted-foreground">Entrevistas</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-3xl font-bold">{selectedProcess.approved}</p>
                          <p className="text-sm text-muted-foreground">Aprovados</p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Etapas do Processo</h3>
                    
                    <div className="space-y-4">
                      {selectedProcess.steps.map((step: any, index: number) => {
                        const stepStatus = getStepStatusInfo(step.status);
                        
                        return (
                          <div key={index} className="flex items-start gap-4">
                            <div className={cn(
                              "mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                              stepStatus.color === 'green' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                              stepStatus.color === 'blue' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                              stepStatus.color === 'gray' && "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                            )}>
                              {step.status === 'completed' ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-current"></div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{step.name}</h4>
                                <Badge variant="outline" className={cn(
                                  "text-xs",
                                  stepStatus.color === 'green' && "border-green-500 text-green-700 dark:text-green-400",
                                  stepStatus.color === 'blue' && "border-blue-500 text-blue-700 dark:text-blue-400",
                                  stepStatus.color === 'gray' && "border-gray-500 text-gray-700 dark:text-gray-400"
                                )}>
                                  {stepStatus.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Data prevista: {format(new Date(step.date), 'dd/MM/yyyy')}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsViewProcessDialogOpen(false)}>
                    Fechar
                  </Button>
                  
                  {selectedProcess.status !== 'completed' && selectedProcess.status !== 'canceled' && (
                    <Button>
                      Atualizar Status
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        
        {/* New Process Dialog */}
        <Dialog open={isNewProcessDialogOpen} onOpenChange={setIsNewProcessDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Processo de RH</DialogTitle>
              <DialogDescription>
                Cadastre um novo processo de recrutamento, transferência ou desligamento
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="Título do processo" 
                  value={processForm.title} 
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Processo <span className="text-red-500">*</span></Label>
                  <Select 
                    value={processForm.type} 
                    onValueChange={(value) => handleInputChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {processTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            {type.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento <span className="text-red-500">*</span></Label>
                  <Select 
                    value={processForm.department.toString()} 
                    onValueChange={(value) => handleInputChange('department', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(department => (
                        <SelectItem key={department.id} value={department.name}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data de Início <span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {processForm.startDate ? (
                          format(new Date(processForm.startDate), 'dd/MM/yyyy')
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={processForm.startDate ? new Date(processForm.startDate) : undefined}
                        onSelect={(date) => handleInputChange('startDate', date ? format(date, 'yyyy-MM-dd') : '')}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data de Término Prevista <span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {processForm.endDate ? (
                          format(new Date(processForm.endDate), 'dd/MM/yyyy')
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={processForm.endDate ? new Date(processForm.endDate) : undefined}
                        onSelect={(date) => handleInputChange('endDate', date ? format(date, 'yyyy-MM-dd') : '')}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descreva os detalhes do processo..." 
                  className="min-h-[100px]"
                  value={processForm.description} 
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewProcessDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreateProcess}>Criar Processo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default HRProcesses;
