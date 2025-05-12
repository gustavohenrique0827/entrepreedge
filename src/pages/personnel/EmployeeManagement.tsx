
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Search, Plus, FileText, User, Pencil, Trash2, Calendar, BookOpen, BarChart2, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for employees
const initialEmployees = [
  {
    id: 1,
    name: "João Silva",
    department: "Vendas",
    role: "Gerente de Vendas",
    email: "joao.silva@empresa.com",
    phone: "(11) 98765-4321",
    admissionDate: "2020-03-15",
    status: "active"
  },
  {
    id: 2,
    name: "Maria Santos",
    department: "Marketing",
    role: "Analista de Marketing",
    email: "maria.santos@empresa.com",
    phone: "(11) 91234-5678",
    admissionDate: "2021-05-20",
    status: "active"
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    department: "TI",
    role: "Desenvolvedor Full Stack",
    email: "pedro.oliveira@empresa.com",
    phone: "(11) 99876-5432",
    admissionDate: "2019-11-10",
    status: "active"
  },
  {
    id: 4,
    name: "Ana Costa",
    department: "Financeiro",
    role: "Analista Financeiro",
    email: "ana.costa@empresa.com",
    phone: "(11) 97654-3210",
    admissionDate: "2022-01-05",
    status: "active"
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    department: "RH",
    role: "Coordenador de RH",
    email: "carlos.ferreira@empresa.com",
    phone: "(11) 95432-1098",
    admissionDate: "2018-08-22",
    status: "inactive"
  }
];

// Sample departments
const departments = [
  "Administrativo",
  "Comercial",
  "Financeiro",
  "Marketing",
  "Operações",
  "RH",
  "TI",
  "Vendas"
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    role: "",
    email: "",
    phone: "",
    admissionDate: new Date().toISOString().split("T")[0],
    status: "active"
  });
  const { toast } = useToast();

  // Filter employees based on search term and active tab
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "active" && employee.status === "active") ||
      (activeTab === "inactive" && employee.status === "inactive");
    
    return matchesSearch && matchesTab;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (isEditDialogOpen && selectedEmployee) {
      setSelectedEmployee({
        ...selectedEmployee,
        [name]: value
      });
    } else {
      setNewEmployee({
        ...newEmployee,
        [name]: value
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (isEditDialogOpen && selectedEmployee) {
      setSelectedEmployee({
        ...selectedEmployee,
        [name]: value
      });
    } else {
      setNewEmployee({
        ...newEmployee,
        [name]: value
      });
    }
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.department) {
      toast({
        title: "Erro ao adicionar",
        description: "Preencha os campos obrigatórios: Nome, Email e Departamento.",
        variant: "destructive"
      });
      return;
    }

    const id = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    
    setEmployees([
      ...employees,
      {
        ...newEmployee,
        id
      }
    ]);
    
    setIsAddDialogOpen(false);
    setNewEmployee({
      name: "",
      department: "",
      role: "",
      email: "",
      phone: "",
      admissionDate: new Date().toISOString().split("T")[0],
      status: "active"
    });
    
    toast({
      title: "Colaborador adicionado",
      description: `${newEmployee.name} foi adicionado com sucesso.`
    });
  };

  const handleEditEmployee = () => {
    if (!selectedEmployee) return;
    
    if (!selectedEmployee.name || !selectedEmployee.email || !selectedEmployee.department) {
      toast({
        title: "Erro ao editar",
        description: "Preencha os campos obrigatórios: Nome, Email e Departamento.",
        variant: "destructive"
      });
      return;
    }
    
    setEmployees(employees.map(employee => 
      employee.id === selectedEmployee.id ? selectedEmployee : employee
    ));
    
    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
    
    toast({
      title: "Colaborador atualizado",
      description: `Dados de ${selectedEmployee.name} atualizados com sucesso.`
    });
  };

  const handleDeleteEmployee = () => {
    if (!selectedEmployee) return;
    
    setEmployees(employees.filter(employee => employee.id !== selectedEmployee.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Colaborador removido",
      description: `${selectedEmployee.name} foi removido com sucesso.`
    });
    
    setSelectedEmployee(null);
  };

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (employee: any) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <PageContainer>
          <PageHeader
            title="Gerenciamento de Colaboradores"
            description="Gerencie a equipe da sua empresa"
          />
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2 w-full max-w-sm">
              <Input
                placeholder="Buscar por nome, email, departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" className="shrink-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Colaborador
            </Button>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Colaboradores</CardTitle>
              <CardDescription>Gerencie todos os colaboradores da empresa</CardDescription>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="active">Ativos</TabsTrigger>
                  <TabsTrigger value="inactive">Inativos</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhum colaborador encontrado com os filtros atuais.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>
                          <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                            {employee.status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleViewEmployee(employee)}
                            >
                              <User className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleEditClick(employee)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleDeleteClick(employee)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Total de colaboradores: {employees.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Ativos: {employees.filter(e => e.status === "active").length} | 
                Inativos: {employees.filter(e => e.status === "inactive").length}
              </div>
            </CardFooter>
          </Card>
          
          {/* Add Employee Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Colaborador</DialogTitle>
                <DialogDescription>
                  Preencha os dados para adicionar um novo colaborador ao sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      placeholder="Ex: joao.silva@empresa.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="department">Departamento *</Label>
                    <Select
                      value={newEmployee.department}
                      onValueChange={(value) => handleSelectChange("department", value)}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Selecione o departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Input
                      id="role"
                      name="role"
                      value={newEmployee.role}
                      onChange={handleInputChange}
                      placeholder="Ex: Gerente de Vendas"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newEmployee.phone}
                      onChange={handleInputChange}
                      placeholder="Ex: (11) 98765-4321"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="admissionDate">Data de Admissão</Label>
                    <Input
                      id="admissionDate"
                      name="admissionDate"
                      type="date"
                      value={newEmployee.admissionDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newEmployee.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleAddEmployee}>Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Edit Employee Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Editar Colaborador</DialogTitle>
                <DialogDescription>
                  Edite os dados do colaborador selecionado
                </DialogDescription>
              </DialogHeader>
              {selectedEmployee && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-name">Nome Completo *</Label>
                      <Input
                        id="edit-name"
                        name="name"
                        value={selectedEmployee.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-email">Email *</Label>
                      <Input
                        id="edit-email"
                        name="email"
                        type="email"
                        value={selectedEmployee.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-department">Departamento *</Label>
                      <Select
                        value={selectedEmployee.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger id="edit-department">
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-role">Cargo</Label>
                      <Input
                        id="edit-role"
                        name="role"
                        value={selectedEmployee.role}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-phone">Telefone</Label>
                      <Input
                        id="edit-phone"
                        name="phone"
                        value={selectedEmployee.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-admissionDate">Data de Admissão</Label>
                      <Input
                        id="edit-admissionDate"
                        name="admissionDate"
                        type="date"
                        value={selectedEmployee.admissionDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={selectedEmployee.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger id="edit-status">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleEditEmployee}>Salvar Alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Delete Employee Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja excluir este colaborador? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              {selectedEmployee && (
                <div className="py-4">
                  <p className="mb-2">Você está prestes a excluir o colaborador:</p>
                  <p className="font-semibold">{selectedEmployee.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.department} - {selectedEmployee.role}</p>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
                <Button variant="destructive" onClick={handleDeleteEmployee}>Excluir</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* View Employee Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Detalhes do Colaborador</DialogTitle>
                <DialogDescription>
                  Informações detalhadas sobre o colaborador selecionado
                </DialogDescription>
              </DialogHeader>
              {selectedEmployee && (
                <div className="py-4">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedEmployee.name}</h3>
                      <p className="text-muted-foreground">{selectedEmployee.role}</p>
                    </div>
                    <Badge variant={selectedEmployee.status === "active" ? "default" : "secondary"}>
                      {selectedEmployee.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Departamento</h4>
                      <p className="font-medium">{selectedEmployee.department}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Admissão</h4>
                      <p className="font-medium">{formatDate(selectedEmployee.admissionDate)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                      <p className="font-medium">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Telefone</h4>
                      <p className="font-medium">{selectedEmployee.phone || "-"}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-8">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Ver Histórico
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Registros de Ponto
                    </Button>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="default"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditClick(selectedEmployee);
                  }}
                >
                  Editar
                </Button>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PageContainer>
      </div>
    </div>
  );
};

export default EmployeeManagement;
