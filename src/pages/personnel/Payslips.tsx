
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, Printer, Search, UserCheck, X, Plus, Edit, Trash2 } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock data for employees
const employees = [
  { id: 1, name: 'João Silva', role: 'Desenvolvedor', department: 'TI', hireDate: '2021-03-15' },
  { id: 2, name: 'Maria Oliveira', role: 'Designer', department: 'Marketing', hireDate: '2020-08-23' },
  { id: 3, name: 'Pedro Santos', role: 'Analista Financeiro', department: 'Financeiro', hireDate: '2022-01-10' },
  { id: 4, name: 'Ana Costa', role: 'RH', department: 'Recursos Humanos', hireDate: '2019-11-05' },
  { id: 5, name: 'Carlos Ferreira', role: 'Gerente de Projetos', department: 'Operações', hireDate: '2020-05-18' }
];

// Mock data for payslips
const initialPayslips = [
  {
    id: 1, 
    employeeId: 1, 
    employeeName: 'João Silva',
    month: '2024-04-01',
    grossSalary: 5000,
    inss: 468.00,
    irrf: 142.80,
    fgts: 400.00,
    otherDeductions: 120.00,
    otherEarnings: 350.00,
    netSalary: 4619.20,
    status: 'processed'
  },
  {
    id: 2, 
    employeeId: 2, 
    employeeName: 'Maria Oliveira',
    month: '2024-04-01',
    grossSalary: 4200,
    inss: 378.84,
    irrf: 87.48,
    fgts: 336.00,
    otherDeductions: 100.00,
    otherEarnings: 0,
    netSalary: 3633.68,
    status: 'processed'
  },
  {
    id: 3, 
    employeeId: 3, 
    employeeName: 'Pedro Santos',
    month: '2024-04-01',
    grossSalary: 6800,
    inss: 745.36,
    irrf: 502.95,
    fgts: 544.00,
    otherDeductions: 350.00,
    otherEarnings: 500.00,
    netSalary: 5701.69,
    status: 'pending'
  }
];

interface PayslipFormData {
  id?: number;
  employeeId: number;
  month: string;
  grossSalary: number;
  inss: number;
  irrf: number;
  fgts: number;
  otherDeductions: number;
  otherEarnings: number;
  netSalary: number;
}

const Payslips = () => {
  const [payslips, setPayslips] = useState(initialPayslips);
  const [selectedPayslip, setSelectedPayslip] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState<Date | undefined>(new Date());
  const [isNewPayslipDialogOpen, setIsNewPayslipDialogOpen] = useState(false);
  const [isViewPayslipDialogOpen, setIsViewPayslipDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();
  
  const [payslipForm, setPayslipForm] = useState<PayslipFormData>({
    employeeId: 0,
    month: format(new Date(), 'yyyy-MM-dd'),
    grossSalary: 0,
    inss: 0,
    irrf: 0,
    fgts: 0,
    otherDeductions: 0,
    otherEarnings: 0,
    netSalary: 0
  });
  
  const filteredPayslips = payslips.filter(payslip => {
    const matchesSearch = payslip.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = filterMonth 
      ? new Date(payslip.month).getMonth() === filterMonth.getMonth() && 
        new Date(payslip.month).getFullYear() === filterMonth.getFullYear()
      : true;
    
    return matchesSearch && matchesMonth;
  });

  const handleViewPayslip = (payslip: any) => {
    setSelectedPayslip(payslip);
    setIsViewPayslipDialogOpen(true);
  };
  
  const handleEditPayslip = (payslip: any) => {
    setSelectedPayslip(payslip);
    setPayslipForm({
      id: payslip.id,
      employeeId: payslip.employeeId,
      month: payslip.month,
      grossSalary: payslip.grossSalary,
      inss: payslip.inss,
      irrf: payslip.irrf,
      fgts: payslip.fgts,
      otherDeductions: payslip.otherDeductions,
      otherEarnings: payslip.otherEarnings,
      netSalary: payslip.netSalary
    });
    setIsEditMode(true);
    setIsNewPayslipDialogOpen(true);
  };
  
  const handleNewPayslip = () => {
    setIsEditMode(false);
    setPayslipForm({
      employeeId: 0,
      month: format(new Date(), 'yyyy-MM-dd'),
      grossSalary: 0,
      inss: 0,
      irrf: 0,
      fgts: 0,
      otherDeductions: 0,
      otherEarnings: 0,
      netSalary: 0
    });
    setIsNewPayslipDialogOpen(true);
  };
  
  const calculateNetSalary = (form: PayslipFormData) => {
    const netSalary = form.grossSalary - form.inss - form.irrf - form.otherDeductions + form.otherEarnings;
    return netSalary;
  };
  
  const calculateINSS = (grossSalary: number) => {
    // Brazilian INSS 2024 calculation (simplified)
    let inssValue = 0;
    
    if (grossSalary <= 1412) {
      inssValue = grossSalary * 0.075;
    } else if (grossSalary <= 2666.68) {
      inssValue = 1412 * 0.075 + (grossSalary - 1412) * 0.09;
    } else if (grossSalary <= 4000.03) {
      inssValue = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (grossSalary - 2666.68) * 0.12;
    } else if (grossSalary <= 7786.02) {
      inssValue = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (grossSalary - 4000.03) * 0.14;
    } else {
      // INSS cap for 2024
      inssValue = 876.97;
    }
    
    return parseFloat(inssValue.toFixed(2));
  };
  
  const calculateIRRF = (grossSalary: number, inss: number) => {
    // Brazilian IRRF 2024 calculation (simplified)
    const baseCalculo = grossSalary - inss;
    let irrfValue = 0;
    
    if (baseCalculo <= 2259.20) {
      irrfValue = 0;
    } else if (baseCalculo <= 2826.65) {
      irrfValue = (baseCalculo * 0.075) - 169.44;
    } else if (baseCalculo <= 3751.05) {
      irrfValue = (baseCalculo * 0.15) - 381.44;
    } else if (baseCalculo <= 4664.68) {
      irrfValue = (baseCalculo * 0.225) - 662.77;
    } else {
      irrfValue = (baseCalculo * 0.275) - 896.00;
    }
    
    return parseFloat(irrfValue.toFixed(2));
  };
  
  const handleFormChange = (field: keyof PayslipFormData, value: string | number) => {
    const updatedForm = { ...payslipForm, [field]: value };
    
    // Recalculate INSS when gross salary changes
    if (field === 'grossSalary') {
      const grossSalary = typeof value === 'string' ? parseFloat(value) : value;
      const inss = calculateINSS(grossSalary);
      updatedForm.inss = inss;
      
      // Recalculate IRRF when INSS changes
      const irrf = calculateIRRF(grossSalary, inss);
      updatedForm.irrf = irrf;
      
      // Update FGTS (8% of gross salary)
      updatedForm.fgts = parseFloat((grossSalary * 0.08).toFixed(2));
    }
    
    // Recalculate net salary whenever any relevant field changes
    updatedForm.netSalary = calculateNetSalary(updatedForm);
    
    setPayslipForm(updatedForm);
  };
  
  const handleSavePayslip = () => {
    if (payslipForm.employeeId === 0) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um funcionário",
        variant: "destructive"
      });
      return;
    }
    
    const employee = employees.find(emp => emp.id === payslipForm.employeeId);
    
    if (!employee) {
      toast({
        title: "Erro",
        description: "Funcionário não encontrado",
        variant: "destructive"
      });
      return;
    }
    
    const newPayslip = {
      ...payslipForm,
      id: isEditMode ? payslipForm.id! : payslips.length + 1,
      employeeName: employee.name,
      status: 'pending'
    };
    
    if (isEditMode) {
      setPayslips(payslips.map(p => p.id === newPayslip.id ? newPayslip : p));
      toast({
        title: "Holerite atualizado",
        description: `Holerite de ${employee.name} foi atualizado com sucesso.`
      });
    } else {
      setPayslips([...payslips, newPayslip]);
      toast({
        title: "Holerite criado",
        description: `Holerite de ${employee.name} foi criado com sucesso.`
      });
    }
    
    setIsNewPayslipDialogOpen(false);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM/yyyy', { locale: ptBR });
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Holerites" 
        description="Gerencie os holerites dos colaboradores"
      />
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Holerites</CardTitle>
                <CardDescription>Consulte e gerencie os holerites dos colaboradores</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filterMonth ? (
                          format(filterMonth, 'MMMM/yyyy', { locale: ptBR })
                        ) : (
                          <span>Selecione o mês</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filterMonth}
                        onSelect={setFilterMonth}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <Button onClick={handleNewPayslip}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Holerite
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome de colaborador..." 
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
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Salário Bruto</TableHead>
                    <TableHead>Salário Líquido</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayslips.length > 0 ? (
                    filteredPayslips.map((payslip) => (
                      <TableRow key={payslip.id}>
                        <TableCell className="font-medium">{payslip.employeeName}</TableCell>
                        <TableCell>{formatDate(payslip.month)}</TableCell>
                        <TableCell>{formatCurrency(payslip.grossSalary)}</TableCell>
                        <TableCell>{formatCurrency(payslip.netSalary)}</TableCell>
                        <TableCell>
                          <div className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            payslip.status === 'processed' 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" 
                          )}>
                            {payslip.status === 'processed' ? 'Processado' : 'Pendente'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleViewPayslip(payslip)}
                              title="Visualizar"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditPayslip(payslip)}
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        Nenhum holerite encontrado para os filtros selecionados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* View Payslip Dialog */}
        <Dialog open={isViewPayslipDialogOpen} onOpenChange={setIsViewPayslipDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Holerite</DialogTitle>
              <DialogDescription>
                Detalhes do holerite de {selectedPayslip?.employeeName || ''} - {selectedPayslip ? formatDate(selectedPayslip.month) : ''}
              </DialogDescription>
            </DialogHeader>
            
            {selectedPayslip && (
              <div className="space-y-4">
                <div className="bg-card p-4 border rounded-md">
                  <div className="text-xl font-bold text-center mb-2">DEMONSTRATIVO DE PAGAMENTO</div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-medium">Sua Empresa LTDA</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CNPJ</p>
                      <p className="font-medium">00.000.000/0001-00</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Funcionário</p>
                      <p className="font-medium">{selectedPayslip.employeeName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Período</p>
                      <p className="font-medium">{formatDate(selectedPayslip.month)}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-4 gap-2 mb-1">
                    <div className="font-semibold">Descrição</div>
                    <div className="font-semibold text-right">Referência</div>
                    <div className="font-semibold text-right">Proventos</div>
                    <div className="font-semibold text-right">Descontos</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-2 py-1 border-b">
                      <div>Salário Base</div>
                      <div className="text-right">30 dias</div>
                      <div className="text-right">{formatCurrency(selectedPayslip.grossSalary)}</div>
                      <div className="text-right">-</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 py-1 border-b">
                      <div>INSS</div>
                      <div className="text-right">-</div>
                      <div className="text-right">-</div>
                      <div className="text-right">{formatCurrency(selectedPayslip.inss)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 py-1 border-b">
                      <div>IRRF</div>
                      <div className="text-right">-</div>
                      <div className="text-right">-</div>
                      <div className="text-right">{formatCurrency(selectedPayslip.irrf)}</div>
                    </div>
                    
                    {selectedPayslip.otherEarnings > 0 && (
                      <div className="grid grid-cols-4 gap-2 py-1 border-b">
                        <div>Outros Proventos</div>
                        <div className="text-right">-</div>
                        <div className="text-right">{formatCurrency(selectedPayslip.otherEarnings)}</div>
                        <div className="text-right">-</div>
                      </div>
                    )}
                    
                    {selectedPayslip.otherDeductions > 0 && (
                      <div className="grid grid-cols-4 gap-2 py-1 border-b">
                        <div>Outros Descontos</div>
                        <div className="text-right">-</div>
                        <div className="text-right">-</div>
                        <div className="text-right">{formatCurrency(selectedPayslip.otherDeductions)}</div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-4 gap-2 py-1 border-b">
                      <div>FGTS</div>
                      <div className="text-right">8%</div>
                      <div className="text-right">-</div>
                      <div className="text-right">({formatCurrency(selectedPayslip.fgts)})</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 py-2 font-semibold">
                      <div>Total</div>
                      <div className="text-right"></div>
                      <div className="text-right">{formatCurrency(selectedPayslip.grossSalary + selectedPayslip.otherEarnings)}</div>
                      <div className="text-right">{formatCurrency(selectedPayslip.inss + selectedPayslip.irrf + selectedPayslip.otherDeductions)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 py-2 border-t-2 font-bold">
                      <div>Valor Líquido</div>
                      <div className="text-right"></div>
                      <div className="text-right col-span-2">{formatCurrency(selectedPayslip.netSalary)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsViewPayslipDialogOpen(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Fechar
                  </Button>
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Create/Edit Payslip Dialog */}
        <Dialog open={isNewPayslipDialogOpen} onOpenChange={setIsNewPayslipDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Editar Holerite' : 'Novo Holerite'}</DialogTitle>
              <DialogDescription>
                {isEditMode ? 'Altere os dados do holerite' : 'Preencha os dados para criar um novo holerite'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee">Funcionário</Label>
                  <Select 
                    value={payslipForm.employeeId.toString()} 
                    onValueChange={(value) => handleFormChange('employeeId', parseInt(value))}
                    disabled={isEditMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um funcionário" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(employee => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {employee.name} - {employee.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="month">Mês de Referência</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {payslipForm.month ? (
                          format(new Date(payslipForm.month), 'MMMM/yyyy', { locale: ptBR })
                        ) : (
                          <span>Selecione o mês</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={payslipForm.month ? new Date(payslipForm.month) : undefined}
                        onSelect={(date) => handleFormChange('month', date ? format(date, 'yyyy-MM-dd') : '')}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="grossSalary">Salário Bruto</Label>
                <Input 
                  id="grossSalary" 
                  type="number" 
                  placeholder="0.00" 
                  value={payslipForm.grossSalary || ''} 
                  onChange={(e) => handleFormChange('grossSalary', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inss">INSS</Label>
                  <Input 
                    id="inss" 
                    type="number" 
                    placeholder="0.00" 
                    value={payslipForm.inss || ''} 
                    onChange={(e) => handleFormChange('inss', parseFloat(e.target.value) || 0)}
                    readOnly
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="irrf">IRRF</Label>
                  <Input 
                    id="irrf" 
                    type="number" 
                    placeholder="0.00" 
                    value={payslipForm.irrf || ''} 
                    onChange={(e) => handleFormChange('irrf', parseFloat(e.target.value) || 0)}
                    readOnly
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fgts">FGTS</Label>
                  <Input 
                    id="fgts" 
                    type="number" 
                    placeholder="0.00" 
                    value={payslipForm.fgts || ''} 
                    onChange={(e) => handleFormChange('fgts', parseFloat(e.target.value) || 0)}
                    readOnly
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="otherDeductions">Outros Descontos</Label>
                  <Input 
                    id="otherDeductions" 
                    type="number" 
                    placeholder="0.00" 
                    value={payslipForm.otherDeductions || ''} 
                    onChange={(e) => handleFormChange('otherDeductions', parseFloat(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="otherEarnings">Outros Proventos</Label>
                  <Input 
                    id="otherEarnings" 
                    type="number" 
                    placeholder="0.00" 
                    value={payslipForm.otherEarnings || ''} 
                    onChange={(e) => handleFormChange('otherEarnings', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <Label>Salário Líquido</Label>
                  <div className="text-xl font-bold">{formatCurrency(payslipForm.netSalary)}</div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewPayslipDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSavePayslip}>{isEditMode ? 'Atualizar' : 'Criar'} Holerite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default Payslips;
