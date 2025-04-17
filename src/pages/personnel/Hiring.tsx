
import React, { useState } from 'react';
import { format } from 'date-fns';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, FilePlus, Upload, Search, CalendarDays, UserCheck, FileText, Trash2, Plus, Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useToast } from '@/hooks/use-toast';

// Mock data for departments and roles
const departments = [
  { id: 1, name: 'Tecnologia' },
  { id: 2, name: 'Marketing' },
  { id: 3, name: 'Financeiro' },
  { id: 4, name: 'Recursos Humanos' },
  { id: 5, name: 'Operações' },
  { id: 6, name: 'Comercial' },
  { id: 7, name: 'Administrativo' }
];

const roles = [
  { id: 1, name: 'Desenvolvedor(a)', departmentId: 1 },
  { id: 2, name: 'Designer', departmentId: 2 },
  { id: 3, name: 'Analista Financeiro(a)', departmentId: 3 },
  { id: 4, name: 'Recrutador(a)', departmentId: 4 },
  { id: 5, name: 'Gerente de Projetos', departmentId: 5 },
  { id: 6, name: 'Vendedor(a)', departmentId: 6 },
  { id: 7, name: 'Assistente Administrativo(a)', departmentId: 7 },
  { id: 8, name: 'Analista de Sistemas', departmentId: 1 },
  { id: 9, name: 'Redator(a)', departmentId: 2 },
  { id: 10, name: 'Contador(a)', departmentId: 3 }
];

// Mock data for contract types and employment regimes
const contractTypes = [
  { id: 'clt', name: 'CLT' },
  { id: 'pj', name: 'Pessoa Jurídica' },
  { id: 'estagio', name: 'Estágio' },
  { id: 'temporario', name: 'Temporário' },
  { id: 'autonomo', name: 'Autônomo' }
];

const employmentRegimes = [
  { id: 'integral', name: 'Integral (8h)' },
  { id: 'parcial', name: 'Parcial (4h-6h)' },
  { id: 'remoto', name: 'Trabalho Remoto' },
  { id: 'hibrido', name: 'Híbrido' },
  { id: 'escala', name: 'Escala' }
];

// Mock data for required documents
const requiredDocuments = [
  { id: 'cpf', name: 'CPF', required: true },
  { id: 'rg', name: 'RG', required: true },
  { id: 'ctps', name: 'Carteira de Trabalho', required: true },
  { id: 'titulo', name: 'Título de Eleitor', required: true },
  { id: 'reservista', name: 'Certificado de Reservista', required: false },
  { id: 'comprovante_residencia', name: 'Comprovante de Residência', required: true },
  { id: 'comprovante_escolaridade', name: 'Comprovante de Escolaridade', required: true },
  { id: 'foto', name: 'Foto 3x4', required: true },
  { id: 'certidao_casamento', name: 'Certidão de Casamento', required: false },
  { id: 'certidao_nascimento_filhos', name: 'Certidão de Nascimento dos Filhos', required: false },
  { id: 'cartao_vacinacao_filhos', name: 'Cartão de Vacinação dos Filhos até 7 anos', required: false },
  { id: 'pis', name: 'Número do PIS', required: true }
];

// Mock data for hiring processes
const initialHiringProcesses = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    position: 'Desenvolvedor',
    department: 'Tecnologia',
    startDate: '2024-05-10',
    status: 'documents',
    progress: 60
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '(11) 91234-5678',
    position: 'Designer',
    department: 'Marketing',
    startDate: '2024-05-15',
    status: 'contract',
    progress: 80
  },
  {
    id: 3,
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    phone: '(11) 93456-7890',
    position: 'Analista Financeiro',
    department: 'Financeiro',
    startDate: '2024-06-01',
    status: 'pending',
    progress: 25
  }
];

interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  department: number;
  role: number;
  contractType: string;
  employmentRegime: string;
  salary: string;
  startDate: string;
  bankInfo: string;
  additionalInfo: string;
  documents: { id: string; name: string; required: boolean; uploaded: boolean }[];
}

const Hiring = () => {
  const [hiringProcesses, setHiringProcesses] = useState(initialHiringProcesses);
  const [selectedProcess, setSelectedProcess] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();
  
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    rg: '',
    birthDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    department: 0,
    role: 0,
    contractType: '',
    employmentRegime: '',
    salary: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    bankInfo: '',
    additionalInfo: '',
    documents: requiredDocuments.map(doc => ({ ...doc, uploaded: false }))
  });
  
  const filteredRoles = roles.filter(role => 
    employeeForm.department === 0 || role.departmentId === employeeForm.department
  );
  
  const filteredProcesses = hiringProcesses.filter(process => 
    process.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    process.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleInputChange = (field: keyof EmployeeFormData, value: string | number) => {
    setEmployeeForm(prev => ({ ...prev, [field]: value }));
    
    // If department changes, reset the role
    if (field === 'department') {
      setEmployeeForm(prev => ({ ...prev, role: 0 }));
    }
  };
  
  const handleDocumentUpload = (documentId: string) => {
    setEmployeeForm(prev => ({
      ...prev,
      documents: prev.documents.map(doc => 
        doc.id === documentId ? { ...doc, uploaded: true } : doc
      )
    }));
    
    toast({
      title: "Documento enviado",
      description: "O documento foi enviado com sucesso."
    });
  };
  
  const validateForm = () => {
    // Check if all required fields in the current tab are filled
    if (activeTab === 'personal') {
      if (!employeeForm.name || !employeeForm.email || !employeeForm.phone || !employeeForm.cpf) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return false;
      }
    } else if (activeTab === 'contract') {
      if (!employeeForm.department || !employeeForm.role || !employeeForm.contractType || !employeeForm.salary) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return false;
      }
    }
    
    return true;
  };
  
  const handleNextTab = () => {
    if (!validateForm()) return;
    
    if (activeTab === 'personal') {
      setActiveTab('contract');
    } else if (activeTab === 'contract') {
      setActiveTab('documents');
    } else if (activeTab === 'documents') {
      handleCreateEmployee();
    }
  };
  
  const handlePrevTab = () => {
    if (activeTab === 'contract') {
      setActiveTab('personal');
    } else if (activeTab === 'documents') {
      setActiveTab('contract');
    }
  };
  
  const handleCreateEmployee = () => {
    // Check if any required documents are missing
    const missingRequiredDocs = employeeForm.documents.filter(doc => doc.required && !doc.uploaded);
    
    if (missingRequiredDocs.length > 0) {
      toast({
        title: "Documentos obrigatórios",
        description: "Envie todos os documentos obrigatórios antes de prosseguir.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new hiring process
    const department = departments.find(d => d.id === employeeForm.department)?.name || '';
    const role = roles.find(r => r.id === employeeForm.role)?.name || '';
    
    const newProcess = {
      id: hiringProcesses.length + 1,
      name: employeeForm.name,
      email: employeeForm.email,
      phone: employeeForm.phone,
      position: role,
      department: department,
      startDate: employeeForm.startDate,
      status: 'pending',
      progress: 25
    };
    
    setHiringProcesses([...hiringProcesses, newProcess]);
    setIsNewEmployeeDialogOpen(false);
    setShowSuccessDialog(true);
    
    // Reset form for future use
    setEmployeeForm({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      rg: '',
      birthDate: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      department: 0,
      role: 0,
      contractType: '',
      employmentRegime: '',
      salary: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      bankInfo: '',
      additionalInfo: '',
      documents: requiredDocuments.map(doc => ({ ...doc, uploaded: false }))
    });
    setActiveTab('personal');
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendente', color: 'yellow' };
      case 'documents':
        return { label: 'Documentação', color: 'blue' };
      case 'contract':
        return { label: 'Contrato', color: 'purple' };
      case 'completed':
        return { label: 'Concluído', color: 'green' };
      default:
        return { label: 'Desconhecido', color: 'gray' };
    }
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="Admissão de Colaboradores" 
        description="Gerencie o processo de admissão de novos colaboradores"
      />
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Processos de Admissão</CardTitle>
                <CardDescription>Acompanhe os processos de admissão em andamento</CardDescription>
              </div>
              
              <Button onClick={() => setIsNewEmployeeDialogOpen(true)}>
                <UserCheck className="mr-2 h-4 w-4" />
                Nova Admissão
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome, cargo ou departamento..." 
                className="pl-8" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Data de Início</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progresso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcesses.length > 0 ? (
                    filteredProcesses.map((process) => {
                      const status = getStatusLabel(process.status);
                      
                      return (
                        <TableRow key={process.id}>
                          <TableCell className="font-medium">{process.name}</TableCell>
                          <TableCell>{process.position}</TableCell>
                          <TableCell>{process.department}</TableCell>
                          <TableCell>{format(new Date(process.startDate), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>
                            <div className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              status.color === 'green' && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
                              status.color === 'yellow' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
                              status.color === 'blue' && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
                              status.color === 'purple' && "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
                              status.color === 'gray' && "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
                            )}>
                              {status.label}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${process.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">{process.progress}%</span>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        Nenhum processo de admissão encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* New Employee Dialog */}
        <Dialog open={isNewEmployeeDialogOpen} onOpenChange={setIsNewEmployeeDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nova Admissão</DialogTitle>
              <DialogDescription>
                Cadastre um novo colaborador no sistema
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="contract">Dados Contratuais</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="Nome completo" 
                      value={employeeForm.name} 
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail <span className="text-red-500">*</span></Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@exemplo.com" 
                      value={employeeForm.email} 
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone <span className="text-red-500">*</span></Label>
                    <Input 
                      id="phone" 
                      placeholder="(00) 00000-0000" 
                      value={employeeForm.phone} 
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data de Nascimento</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {employeeForm.birthDate ? (
                            format(new Date(employeeForm.birthDate), 'dd/MM/yyyy')
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={employeeForm.birthDate ? new Date(employeeForm.birthDate) : undefined}
                          onSelect={(date) => handleInputChange('birthDate', date ? format(date, 'yyyy-MM-dd') : '')}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF <span className="text-red-500">*</span></Label>
                    <Input 
                      id="cpf" 
                      placeholder="000.000.000-00" 
                      value={employeeForm.cpf} 
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input 
                      id="rg" 
                      placeholder="00.000.000-0" 
                      value={employeeForm.rg} 
                      onChange={(e) => handleInputChange('rg', e.target.value)}
                    />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-medium mb-4">Endereço</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input 
                      id="address" 
                      placeholder="Rua, número, complemento" 
                      value={employeeForm.address} 
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input 
                      id="city" 
                      placeholder="Cidade" 
                      value={employeeForm.city} 
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input 
                      id="state" 
                      placeholder="Estado" 
                      value={employeeForm.state} 
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input 
                      id="zipCode" 
                      placeholder="00000-000" 
                      value={employeeForm.zipCode} 
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contract" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento <span className="text-red-500">*</span></Label>
                    <Select 
                      value={employeeForm.department.toString()} 
                      onValueChange={(value) => handleInputChange('department', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(department => (
                          <SelectItem key={department.id} value={department.id.toString()}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Cargo <span className="text-red-500">*</span></Label>
                    <Select 
                      value={employeeForm.role.toString()} 
                      onValueChange={(value) => handleInputChange('role', parseInt(value))}
                      disabled={employeeForm.department === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={employeeForm.department === 0 ? "Selecione um departamento primeiro" : "Selecione um cargo"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredRoles.map(role => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contractType">Tipo de Contrato <span className="text-red-500">*</span></Label>
                    <Select 
                      value={employeeForm.contractType} 
                      onValueChange={(value) => handleInputChange('contractType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de contrato" />
                      </SelectTrigger>
                      <SelectContent>
                        {contractTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employmentRegime">Regime de Trabalho</Label>
                    <Select 
                      value={employeeForm.employmentRegime} 
                      onValueChange={(value) => handleInputChange('employmentRegime', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o regime" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentRegimes.map(regime => (
                          <SelectItem key={regime.id} value={regime.id}>
                            {regime.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salário <span className="text-red-500">*</span></Label>
                    <Input 
                      id="salary" 
                      placeholder="0,00" 
                      value={employeeForm.salary} 
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início <span className="text-red-500">*</span></Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {employeeForm.startDate ? (
                            format(new Date(employeeForm.startDate), 'dd/MM/yyyy')
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={employeeForm.startDate ? new Date(employeeForm.startDate) : undefined}
                          onSelect={(date) => handleInputChange('startDate', date ? format(date, 'yyyy-MM-dd') : '')}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-medium mb-4">Informações Bancárias</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="bankInfo">Dados Bancários</Label>
                  <Textarea 
                    id="bankInfo" 
                    placeholder="Banco, agência, conta e tipo de conta" 
                    value={employeeForm.bankInfo} 
                    onChange={(e) => handleInputChange('bankInfo', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Informações Adicionais</Label>
                  <Textarea 
                    id="additionalInfo" 
                    placeholder="Observações, acordos especiais, etc." 
                    value={employeeForm.additionalInfo} 
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-md mb-6 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Documentos obrigatórios</p>
                    <p className="text-muted-foreground">
                      Realize o upload de todos os documentos marcados como obrigatórios para prosseguir com a admissão.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {employeeForm.documents.map((document) => (
                    <Card key={document.id} className={document.uploaded ? "border-green-500/50" : ""}>
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{document.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {document.required ? "Obrigatório" : "Opcional"}
                            </p>
                          </div>
                          {document.uploaded && <Check className="h-5 w-5 text-green-500" />}
                        </div>
                        
                        <div className="mt-auto pt-4">
                          {document.uploaded ? (
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-green-700 dark:text-green-400">Documento enviado</span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDocumentUpload(document.id)}
                              >
                                <Upload className="h-3 w-3 mr-1" />
                                Substituir
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="w-full" 
                              onClick={() => handleDocumentUpload(document.id)}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Enviar documento
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex justify-between gap-2 sm:justify-between mt-6">
              <div>
                {activeTab !== 'personal' && (
                  <Button variant="outline" onClick={handlePrevTab}>
                    Voltar
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsNewEmployeeDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleNextTab}>
                  {activeTab === 'documents' ? 'Finalizar Cadastro' : 'Avançar'}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Admissão Iniciada</DialogTitle>
              <DialogDescription>
                O processo de admissão foi iniciado com sucesso.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center py-4">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              
              <p className="text-center mb-4">
                O colaborador entrará na fila de processamento do departamento pessoal. Você poderá acompanhar o progresso na lista de processos de admissão.
              </p>
              
              <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md w-full">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Tempo estimado para conclusão: 2-3 dias úteis
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setShowSuccessDialog(false)}>
                Entendi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default Hiring;
