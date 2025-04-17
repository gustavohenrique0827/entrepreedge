
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Edit, Trash2, Code, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CustomProcess {
  id: number;
  name: string;
  description: string;
  type: 'form' | 'workflow' | 'report' | 'integration';
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  module: string;
}

const CustomProcesses = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [processes, setProcesses] = useState<CustomProcess[]>([
    {
      id: 1,
      name: 'Solicitação de Férias',
      description: 'Processo para gerenciar solicitações de férias dos colaboradores',
      type: 'form',
      status: 'active',
      createdAt: '2025-01-15',
      module: 'rh'
    },
    {
      id: 2,
      name: 'Aprovação de Despesas',
      description: 'Fluxo de aprovação para despesas de viagem e reembolsos',
      type: 'workflow',
      status: 'active',
      createdAt: '2025-02-10',
      module: 'financeiro'
    },
    {
      id: 3,
      name: 'Integração com API Externa',
      description: 'Integração com serviço externo para importação de dados',
      type: 'integration',
      status: 'draft',
      createdAt: '2025-03-05',
      module: 'sistema'
    }
  ]);
  
  const [newProcess, setNewProcess] = useState<Omit<CustomProcess, 'id' | 'createdAt'>>({
    name: '',
    description: '',
    type: 'form',
    status: 'draft',
    module: 'rh'
  });
  
  const handleAddProcess = () => {
    if (!newProcess.name) {
      toast({
        title: "Erro ao criar processo",
        description: "Nome do processo é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    const process: CustomProcess = {
      ...newProcess,
      id: processes.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProcesses([...processes, process]);
    setIsDialogOpen(false);
    setNewProcess({
      name: '',
      description: '',
      type: 'form',
      status: 'draft',
      module: 'rh'
    });
    
    toast({
      title: "Processo adicionado",
      description: "O processo personalizado foi adicionado com sucesso.",
    });
  };
  
  const handleDeleteProcess = (id: number) => {
    setProcesses(processes.filter(process => process.id !== id));
    
    toast({
      title: "Processo removido",
      description: "O processo personalizado foi removido com sucesso.",
    });
  };
  
  const handleActivateProcess = (id: number) => {
    setProcesses(processes.map(process => 
      process.id === id ? { ...process, status: 'active' } : process
    ));
    
    toast({
      title: "Processo ativado",
      description: "O processo personalizado foi ativado com sucesso.",
    });
  };
  
  const handleDeactivateProcess = (id: number) => {
    setProcesses(processes.map(process => 
      process.id === id ? { ...process, status: 'inactive' } : process
    ));
    
    toast({
      title: "Processo desativado",
      description: "O processo personalizado foi desativado com sucesso.",
    });
  };
  
  const filteredProcesses = activeTab === 'all' 
    ? processes 
    : processes.filter(process => process.type === activeTab);
  
  return (
    <PageContainer>
      <PageHeader 
        title="Processos Personalizados" 
        description="Adicione, edite e gerencie processos personalizados no sistema" 
      />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="form">Formulários</TabsTrigger>
              <TabsTrigger value="workflow">Fluxos</TabsTrigger>
              <TabsTrigger value="report">Relatórios</TabsTrigger>
              <TabsTrigger value="integration">Integrações</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button onClick={() => setIsDialogOpen(true)} className="ml-4">
            <Plus className="mr-2 h-4 w-4" />
            Novo Processo
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Processos Personalizados</CardTitle>
            <CardDescription>Lista de processos personalizados criados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcesses.length > 0 ? (
                    filteredProcesses.map((process) => (
                      <TableRow key={process.id}>
                        <TableCell className="font-medium">{process.name}</TableCell>
                        <TableCell>
                          {process.type === 'form' && 'Formulário'}
                          {process.type === 'workflow' && 'Fluxo de Trabalho'}
                          {process.type === 'report' && 'Relatório'}
                          {process.type === 'integration' && 'Integração'}
                        </TableCell>
                        <TableCell>
                          {process.module === 'rh' && 'Recursos Humanos'}
                          {process.module === 'financeiro' && 'Financeiro'}
                          {process.module === 'sistema' && 'Sistema'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              process.status === 'active' ? 'default' : 
                              process.status === 'inactive' ? 'secondary' : 
                              'outline'
                            }
                          >
                            {process.status === 'active' && 'Ativo'}
                            {process.status === 'inactive' && 'Inativo'}
                            {process.status === 'draft' && 'Rascunho'}
                          </Badge>
                        </TableCell>
                        <TableCell>{process.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {process.status !== 'active' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleActivateProcess(process.id)}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            {process.status !== 'inactive' && process.status !== 'draft' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeactivateProcess(process.id)}
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteProcess(process.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        Nenhum processo encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Processo</DialogTitle>
              <DialogDescription>
                Preencha os detalhes para criar um novo processo personalizado.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome*</Label>
                <Input
                  id="name"
                  value={newProcess.name}
                  onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
                  placeholder="Ex: Solicitação de Materiais"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newProcess.description}
                  onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })}
                  placeholder="Descreva o propósito e funcionamento do processo"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo de Processo</Label>
                  <Select
                    value={newProcess.type}
                    onValueChange={(value: 'form' | 'workflow' | 'report' | 'integration') => 
                      setNewProcess({ ...newProcess, type: value })
                    }
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="form">Formulário</SelectItem>
                      <SelectItem value="workflow">Fluxo de Trabalho</SelectItem>
                      <SelectItem value="report">Relatório</SelectItem>
                      <SelectItem value="integration">Integração</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="module">Módulo do Sistema</Label>
                  <Select
                    value={newProcess.module}
                    onValueChange={(value) => setNewProcess({ ...newProcess, module: value })}
                  >
                    <SelectTrigger id="module">
                      <SelectValue placeholder="Selecione o módulo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rh">Recursos Humanos</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="sistema">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status Inicial</Label>
                <Select
                  value={newProcess.status}
                  onValueChange={(value: 'active' | 'inactive' | 'draft') => 
                    setNewProcess({ ...newProcess, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddProcess}>
                <Code className="mr-2 h-4 w-4" />
                Criar Processo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default CustomProcesses;
