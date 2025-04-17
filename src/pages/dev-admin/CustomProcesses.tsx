
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Home, BarChart2, Code, Settings, Plus, FileText, PenTool, Tags } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for processes
const initialProcesses = [
  { id: 1, name: 'Processo de Admissão', type: 'rh', status: 'active', description: 'Processo completo para admissão de novos colaboradores' },
  { id: 2, name: 'Processo de Férias', type: 'rh', status: 'active', description: 'Fluxo para solicitação e aprovação de férias' },
  { id: 3, name: 'Fluxo de Aprovação Financeira', type: 'financial', status: 'active', description: 'Processo de aprovação de despesas e pagamentos' },
  { id: 4, name: 'Integração de API Externa', type: 'development', status: 'inactive', description: 'Processo para integração com APIs externas' },
];

const CustomProcesses = () => {
  const [processes, setProcesses] = useState(initialProcesses);
  const [showForm, setShowForm] = useState(false);
  const [newProcess, setNewProcess] = useState({
    name: '',
    type: 'rh',
    description: '',
    status: 'active'
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProcess({ ...newProcess, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewProcess({ ...newProcess, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProcess.name || !newProcess.type) {
      toast({
        title: "Erro ao criar processo",
        description: "Nome e tipo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const newId = processes.length > 0 ? Math.max(...processes.map(p => p.id)) + 1 : 1;
    setProcesses([...processes, { ...newProcess, id: newId }]);
    setNewProcess({
      name: '',
      type: 'rh',
      description: '',
      status: 'active'
    });
    setShowForm(false);
    toast({
      title: "Sucesso",
      description: "Processo personalizado criado com sucesso",
    });
  };

  const toggleProcessStatus = (id: number) => {
    setProcesses(processes.map(process => 
      process.id === id 
        ? { ...process, status: process.status === 'active' ? 'inactive' : 'active' } 
        : process
    ));
    toast({
      title: "Status atualizado",
      description: "O status do processo foi atualizado com sucesso",
    });
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Dev/Admin',
      href: '/dev-admin/custom-processes',
      icon: <Code size={18} />
    },
    {
      name: 'Configurações',
      href: '/settings',
      icon: <Settings size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <PageContainer>
          <PageHeader 
            title="Processos Personalizados" 
            description="Gerencie processos personalizados do sistema"
          />
          
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Processos Personalizados</CardTitle>
                <CardDescription>
                  Gerencie fluxos e processos personalizados para o sistema
                </CardDescription>
              </div>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                {showForm ? "Cancelar" : "Novo Processo"}
              </Button>
            </CardHeader>
            <CardContent>
              {showForm && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Novo Processo Personalizado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome do Processo *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={newProcess.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Processo de Admissão"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="type">Tipo *</Label>
                        <Select
                          name="type"
                          value={newProcess.type}
                          onValueChange={(value) => handleSelectChange('type', value)}
                        >
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rh">Recursos Humanos</SelectItem>
                            <SelectItem value="financial">Financeiro</SelectItem>
                            <SelectItem value="administrative">Administrativo</SelectItem>
                            <SelectItem value="development">Desenvolvimento</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={newProcess.description}
                          onChange={handleInputChange}
                          placeholder="Descreva o processo personalizado"
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          name="status"
                          value={newProcess.status}
                          onValueChange={(value) => handleSelectChange('status', value)}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">
                          <Plus className="mr-2 h-4 w-4" />
                          Criar Processo
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processes.map((process) => (
                    <TableRow key={process.id}>
                      <TableCell className="font-medium">{process.id}</TableCell>
                      <TableCell>{process.name}</TableCell>
                      <TableCell>
                        <Badge variant={process.type === 'development' ? 'outline' : 'secondary'}>
                          {process.type === 'rh' && 'Recursos Humanos'}
                          {process.type === 'financial' && 'Financeiro'}
                          {process.type === 'administrative' && 'Administrativo'}
                          {process.type === 'development' && 'Desenvolvimento'}
                          {process.type === 'custom' && 'Personalizado'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={process.status === 'active' ? 'default' : 'outline'}>
                          {process.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" title="Editar">
                            <PenTool className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant={process.status === 'active' ? 'destructive' : 'outline'} 
                            size="icon" 
                            onClick={() => toggleProcessStatus(process.id)}
                            title={process.status === 'active' ? 'Desativar' : 'Ativar'}
                          >
                            <Tags className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Total de processos: {processes.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Ativos: {processes.filter(p => p.status === 'active').length} | 
                Inativos: {processes.filter(p => p.status === 'inactive').length}
              </div>
            </CardFooter>
          </Card>
        </PageContainer>
      </div>
    </div>
  );
};

export default CustomProcesses;
