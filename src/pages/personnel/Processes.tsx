
import React, { useState } from 'react';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, PenTool, Tags } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DataTable } from '@/components/segment/DataTable';

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
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProcess, setCurrentProcess] = useState<Process>({
    id: 0,
    name: '',
    type: 'rh',
    description: '',
    status: 'active'
  });
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
    setShowForm(false);
    setIsEditing(false);
  };

  const handleEdit = (process: Process) => {
    setCurrentProcess(process);
    setIsEditing(true);
    setShowForm(true);
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

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Nome' },
    { 
      accessorKey: 'type', 
      header: 'Tipo',
      cell: ({ getValue }: { getValue: () => string }) => (
        <Badge variant={getValue() === 'development' ? 'outline' : 'secondary'}>
          {getTypeLabel(getValue())}
        </Badge>
      )
    },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: ({ getValue }: { getValue: () => string }) => (
        <Badge variant={getValue() === 'active' ? 'default' : 'outline'}>
          {getValue() === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    { 
      accessorKey: 'actions', 
      header: 'Ações',
      cell: ({ row }: { row: { original: Process } }) => (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            title="Editar"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row.original);
            }}
          >
            <PenTool className="h-4 w-4" />
          </Button>
          <Button 
            variant={row.original.status === 'active' ? 'destructive' : 'outline'} 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation();
              toggleProcessStatus(row.original.id);
            }}
            title={row.original.status === 'active' ? 'Desativar' : 'Ativar'}
          >
            <Tags className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <SegmentPageLayout 
      title="Processos de Pessoal" 
      description="Gerencie os processos de recursos humanos e pessoal da sua empresa"
      action={
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {showForm ? "Cancelar" : "Novo Processo"}
        </Button>
      }
    >
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{isEditing ? 'Editar Processo' : 'Novo Processo'}</CardTitle>
          </CardHeader>
          <CardContent>
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
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {isEditing ? 'Atualizar' : 'Criar'} Processo
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Processos</CardTitle>
          <CardDescription>
            Gerencie os processos de sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={processes}
            searchable={true}
            pagination={true}
            emptyMessage="Nenhum processo encontrado"
          />
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
    </SegmentPageLayout>
  );
};

export default Processes;
