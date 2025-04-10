
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, UserPlus, Search, Filter } from "lucide-react";

// Mock data for employees
const mockEmployees = [
  { id: 1, name: 'João Silva', position: 'Desenvolvedor', department: 'TI', status: 'Ativo', hireDate: '12/06/2022' },
  { id: 2, name: 'Maria Souza', position: 'Designer', department: 'Marketing', status: 'Ativo', hireDate: '03/04/2021' },
  { id: 3, name: 'Pedro Santos', position: 'Vendedor', department: 'Comercial', status: 'Ativo', hireDate: '15/01/2023' },
  { id: 4, name: 'Ana Oliveira', position: 'Gerente', department: 'Administração', status: 'Ativo', hireDate: '20/08/2020' },
  { id: 5, name: 'Carlos Pereira', position: 'Suporte', department: 'TI', status: 'Afastado', hireDate: '10/10/2022' },
];

const EmployeeManagement = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    status: 'Ativo',
    hireDate: ''
  });

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.department || !newEmployee.hireDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const id = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const employeeToAdd = {
      id,
      ...newEmployee
    };

    setEmployees([...employees, employeeToAdd]);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      status: 'Ativo',
      hireDate: ''
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Funcionário adicionado",
      description: `${employeeToAdd.name} foi adicionado com sucesso.`
    });
  };

  const handleRemoveEmployee = (id: number) => {
    const employeeToRemove = employees.find(e => e.id === id);
    if (employeeToRemove) {
      setEmployees(employees.filter(e => e.id !== id));
      toast({
        title: "Funcionário removido",
        description: `${employeeToRemove.name} foi removido com sucesso.`
      });
    }
  };

  // Create the action button for the header
  const actionButton = (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Colaborador
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Colaborador</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo colaborador abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nome</Label>
            <Input
              id="name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">Cargo</Label>
            <Input
              id="position"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">Departamento</Label>
            <Input
              id="department"
              value={newEmployee.department}
              onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select 
              value={newEmployee.status}
              onValueChange={(value) => setNewEmployee({...newEmployee, status: value})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Afastado">Afastado</SelectItem>
                <SelectItem value="Férias">Férias</SelectItem>
                <SelectItem value="Desligado">Desligado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hireDate" className="text-right">Data de Admissão</Label>
            <Input
              id="hireDate"
              type="date"
              value={newEmployee.hireDate}
              onChange={(e) => setNewEmployee({...newEmployee, hireDate: e.target.value})}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddEmployee}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Gestão de Colaboradores"
        description="Gerencie os funcionários da sua empresa"
        actionButton={actionButton}
      />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Colaboradores</CardTitle>
            <CardDescription>
              Lista completa de colaboradores da empresa. Use os filtros para encontrar pessoas específicas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, cargo ou departamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" className="sm:w-auto w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Admissão</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.status === 'Ativo' ? 'bg-green-100 text-green-800' :
                            employee.status === 'Afastado' ? 'bg-yellow-100 text-yellow-800' :
                            employee.status === 'Férias' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {employee.status}
                          </span>
                        </TableCell>
                        <TableCell>{employee.hireDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveEmployee(employee.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum resultado encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredEmployees.length} de {employees.length} colaboradores
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm" disabled>Próxima</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
};

export default EmployeeManagement;
