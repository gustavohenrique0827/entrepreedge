
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Users, Search, Plus, Edit, Trash } from 'lucide-react';

// Tipo para funcionários
interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
}

// Dados de exemplo
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'João Silva',
    position: 'Desenvolvedor',
    department: 'TI',
    email: 'joao.silva@empresa.com',
    phone: '(11) 99999-9999',
    hireDate: '2021-01-15'
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    position: 'Analista Financeiro',
    department: 'Financeiro',
    email: 'maria.oliveira@empresa.com',
    phone: '(11) 98888-8888',
    hireDate: '2020-05-10'
  },
  {
    id: 3,
    name: 'Pedro Santos',
    position: 'Gerente de Vendas',
    department: 'Vendas',
    email: 'pedro.santos@empresa.com',
    phone: '(11) 97777-7777',
    hireDate: '2019-11-20'
  }
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  // Filtrar funcionários
  const filteredEmployees = employees.filter(
    (emp) => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir diálogo para adicionar/editar funcionário
  const openEmployeeDialog = (employee: Employee | null = null) => {
    setCurrentEmployee(employee);
    setIsDialogOpen(true);
  };

  // Remover funcionário
  const removeEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast({
      title: "Funcionário removido",
      description: "O funcionário foi removido com sucesso",
      variant: "success",
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Cadastro de Funcionários"
        description="Gerencie o cadastro de funcionários da sua empresa"
      />

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar funcionários..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => openEmployeeDialog()} className="flex items-center gap-2">
          <Plus size={16} />
          Novo Funcionário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Funcionários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Data de Contratação</TableHead>
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
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{new Date(employee.hireDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEmployeeDialog(employee)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeEmployee(employee.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Nenhum funcionário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
            </DialogTitle>
            <DialogDescription>
              {currentEmployee 
                ? 'Edite os dados do funcionário nos campos abaixo.'
                : 'Preencha os dados do novo funcionário.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome
                </label>
                <Input id="name" defaultValue={currentEmployee?.name || ''} />
              </div>
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">
                  Cargo
                </label>
                <Input id="position" defaultValue={currentEmployee?.position || ''} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Departamento
                </label>
                <Input id="department" defaultValue={currentEmployee?.department || ''} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </label>
                <Input id="email" type="email" defaultValue={currentEmployee?.email || ''} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Telefone
                </label>
                <Input id="phone" defaultValue={currentEmployee?.phone || ''} />
              </div>
              <div className="space-y-2">
                <label htmlFor="hireDate" className="text-sm font-medium">
                  Data de Contratação
                </label>
                <Input 
                  id="hireDate" 
                  type="date" 
                  defaultValue={currentEmployee?.hireDate || ''}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              setIsDialogOpen(false);
              toast({
                title: currentEmployee ? "Funcionário atualizado" : "Funcionário cadastrado",
                description: currentEmployee 
                  ? "Os dados do funcionário foram atualizados com sucesso."
                  : "Novo funcionário cadastrado com sucesso.",
                variant: "success",
              });
            }}>
              {currentEmployee ? 'Salvar' : 'Cadastrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Employees;
