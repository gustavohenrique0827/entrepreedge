
import React, { useState } from 'react';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, PenTool, Tags, Filter, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Tipo para os processos
interface Process {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  description: string;
}

// Dados iniciais de exemplo
const initialProcesses: Process[] = [
  { id: 1, name: 'Processo de Admissão', type: 'rh', status: 'active', description: 'Processo completo para admissão de novos colaboradores' },
  { id: 2, name: 'Processo de Férias', type: 'rh', status: 'active', description: 'Fluxo para solicitação e aprovação de férias' },
  { id: 3, name: 'Fluxo de Aprovação Financeira', type: 'financial', status: 'active', description: 'Processo de aprovação de despesas e pagamentos' },
  { id: 4, name: 'Integração de API Externa', type: 'development', status: 'inactive', description: 'Processo para integração com APIs externas' },
];

const Processes = () => {
  const [processes, setProcesses] = useState<Process[]>(initialProcesses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProcess, setCurrentProcess] = useState<Process>({
    id: 0,
    name: '',
    type: 'rh',
    description: '',
    status: 'active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProcess({ ...currentProcess, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentProcess({ ...currentProcess, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProcess.name || !currentProcess.type) {
      toast({
        title: "Erro ao criar processo",
        description: "Nome e tipo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    if (isEditing) {
      setProcesses(processes.map(process => 
        process.id === currentProcess.id ? currentProcess : process
      ));
      toast({
        title: "Sucesso",
        description: "Processo atualizado com sucesso",
      });
    } else {
      const newId = processes.length > 0 ? Math.max(...processes.map(p => p.id)) + 1 : 1;
      setProcesses([...processes, { ...currentProcess, id: newId }]);
      toast({
        title: "Sucesso",
        description: "Processo criado com sucesso",
      });
    }
    
    resetForm();
  };

  const resetForm = () => {
    setCurrentProcess({
      id: 0,
      name: '',
      type: 'rh',
      description: '',
      status: 'active'
    });
    setDialogOpen(false);
    setIsEditing(false);
  };

  const handleEdit = (process: Process) => {
    setCurrentProcess(process);
    setIsEditing(true);
    setDialogOpen(true);
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

  const getTypeLabel = (type: string): string => {
    switch(type) {
      case 'rh': return 'Recursos Humanos';
      case 'financial': return 'Financeiro';
      case 'administrative': return 'Administrativo';
      case 'development': return 'Desenvolvimento';
      case 'custom': return 'Personalizado';
      default: return type;
    }
  };

  const getTypeColor = (type: string): string => {
    switch(type) {
      case 'rh': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'administrative': return 'bg-purple-100 text-purple-800';
      case 'development': return 'bg-amber-100 text-amber-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProcesses = processes.filter(process => 
    process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getTypeLabel(process.type).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SegmentPageLayout 
      title="Processos de Pessoal" 
      description="Gerencie os processos de recursos humanos e pessoal da sua empresa"
      action={
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Processo
        </Button>
      }
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar processos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 max-w-sm"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProcesses.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Nenhum processo encontrado</p>
            </CardContent>
          </Card>
        ) : (
          filteredProcesses.map((process) => (
            <Card key={process.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{process.name}</CardTitle>
                    <div className="mt-1 flex items-center">
                      <Badge variant="outline" className={getTypeColor(process.type)}>
                        {getTypeLabel(process.type)}
                      </Badge>
                      <Badge variant={process.status === 'active' ? 'default' : 'outline'} className="ml-2">
                        {process.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    #{process.id}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{process.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(process)}
                >
                  <PenTool className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button 
                  variant={process.status === 'active' ? 'destructive' : 'outline'} 
                  size="sm"
                  onClick={() => toggleProcessStatus(process.id)}
                >
                  <Tags className="h-4 w-4 mr-1" /> {process.status === 'active' ? 'Desativar' : 'Ativar'}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      
      <div className="mt-6 flex justify-between items-center text-sm text-muted-foreground">
        <div>Total de processos: {processes.length}</div>
        <div>
          Ativos: {processes.filter(p => p.status === 'active').length} | 
          Inativos: {processes.filter(p => p.status === 'inactive').length}
        </div>
      </div>

      {/* Dialog for adding/editing processes */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Processo' : 'Novo Processo'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Edite as informações do processo abaixo.' : 'Preencha as informações abaixo para criar um novo processo.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Processo *</Label>
              <Input
                id="name"
                name="name"
                value={currentProcess.name}
                onChange={handleInputChange}
                placeholder="Ex: Processo de Admissão"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select
                name="type"
                value={currentProcess.type}
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
                value={currentProcess.description}
                onChange={handleInputChange}
                placeholder="Descreva o processo"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={currentProcess.status}
                onValueChange={(value) => handleSelectChange('status', value as 'active' | 'inactive')}
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
            
            <DialogFooter className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? 'Atualizar' : 'Criar'} Processo
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SegmentPageLayout>
  );
};

export default Processes;
