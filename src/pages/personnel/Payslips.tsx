import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Edit, Eye, Plus, Printer, Search, Filter, FileText, Calendar, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NewPayslipDialog } from '@/components/personnel/NewPayslipDialog';
import { PayslipViewDialog } from '@/components/personnel/PayslipViewDialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Payslip {
  id: number;
  employee: string;
  period: string;
  status: string;
  amount: string; // Changed from optional to required to match PayslipData
  department: string; // Changed from optional to required to match PayslipData
}

const Payslips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof Payslip>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [newPayslipDialogOpen, setNewPayslipDialogOpen] = useState(false);
  const [viewPayslipDialogOpen, setViewPayslipDialogOpen] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [editAlertOpen, setEditAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleDownload = (id: number) => {
    toast({
      title: "Download Iniciado",
      description: `O download do holerite #${id} foi iniciado.`,
    });
  };

  const handleSort = (column: keyof Payslip) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handlePrint = () => {
    toast({
      title: "Imprimindo holerites",
      description: "Todos os holerites filtrados serão enviados para impressão.",
    });
  };

  const handleGeneratePayslip = () => {
    setNewPayslipDialogOpen(true);
  };

  const handleViewPayslip = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setViewPayslipDialogOpen(true);
  };

  const handleEditPayslip = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setEditAlertOpen(true);
  };

  const handleDeletePayslip = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setDeleteAlertOpen(true);
  };

  const confirmEdit = () => {
    toast({
      title: "Modo de edição",
      description: "Funcionalidade de edição estará disponível em breve.",
    });
    setEditAlertOpen(false);
  };

  const confirmDelete = () => {
    toast({
      title: "Holerite removido",
      description: `O holerite de ${selectedPayslip?.employee} foi removido com sucesso.`,
      variant: "destructive",
    });
    setDeleteAlertOpen(false);
  };

  const handleExport = () => {
    toast({
      title: "Exportando dados",
      description: "Os dados dos holerites estão sendo exportados para CSV.",
    });
  };

  const payslipsData: Payslip[] = [
    { id: 1, employee: 'João Silva', period: '2024-01', status: 'Pago', amount: 'R$ 3.450,00', department: 'Comercial' },
    { id: 2, employee: 'Maria Santos', period: '2024-01', status: 'Pago', amount: 'R$ 4.200,00', department: 'Tecnologia' },
    { id: 3, employee: 'Alice Oliveira', period: '2024-01', status: 'Pendente', amount: 'R$ 2.850,00', department: 'Marketing' },
    { id: 4, employee: 'Carlos Mendes', period: '2024-02', status: 'Pago', amount: 'R$ 3.600,00', department: 'Comercial' },
    { id: 5, employee: 'Fernanda Lima', period: '2024-02', status: 'Pendente', amount: 'R$ 5.100,00', department: 'Tecnologia' },
    { id: 6, employee: 'Roberto Alves', period: '2024-02', status: 'Cancelado', amount: 'R$ 3.200,00', department: 'RH' },
    { id: 7, employee: 'Paula Sousa', period: '2024-03', status: 'Pago', amount: 'R$ 4.500,00', department: 'Financeiro' },
    { id: 8, employee: 'Miguel Costa', period: '2024-03', status: 'Pendente', amount: 'R$ 2.950,00', department: 'Marketing' },
  ];

  const filteredPayslips = payslipsData
    .filter(payslip => {
      const matchesSearch = 
        payslip.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payslip.period.includes(searchTerm) ||
        (payslip.department && payslip.department.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = 
        statusFilter === 'all' || 
        payslip.status.toLowerCase() === statusFilter.toLowerCase();
      
      const matchesPeriod =
        periodFilter === 'all' ||
        payslip.period === periodFilter;
      
      return matchesSearch && matchesStatus && matchesPeriod;
    })
    .sort((a, b) => {
      if (sortColumn === 'id' || sortColumn === 'period') {
        return sortDirection === 'asc' 
          ? a[sortColumn] > b[sortColumn] ? 1 : -1
          : a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
      
      return sortDirection === 'asc'
        ? String(a[sortColumn]).localeCompare(String(b[sortColumn]))
        : String(b[sortColumn]).localeCompare(String(a[sortColumn]));
    });

  const periods = [...new Set(payslipsData.map(p => p.period))];

  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pago':
        return 'default';
      case 'pendente':
        return 'secondary';
      case 'cancelado':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Finanças', href: '/finances', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Metas', href: '/goals', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Aprendizados', href: '/learn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        <PageContainer>
          <PageHeader title="Holerites" description="Gerenciar e visualizar holerites dos colaboradores" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar colaborador ou departamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full sm:w-[300px]"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Período" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {periods.map(period => (
                      <SelectItem key={period} value={period}>{period}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={handleGeneratePayslip}>
                      <Plus className="mr-2 h-4 w-4" />
                      Gerar Holerite
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Criar novo holerite para um colaborador</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Visão Geral de Holerites</CardTitle>
                <CardDescription>Visualize e gerencie os holerites dos colaboradores.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
                        <div className="flex items-center">
                          ID
                          {sortColumn === 'id' && (
                            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('employee')}>
                        <div className="flex items-center">
                          Colaborador
                          {sortColumn === 'employee' && (
                            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('period')}>
                        <div className="flex items-center">
                          Período
                          {sortColumn === 'period' && (
                            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                        <div className="flex items-center">
                          Status
                          {sortColumn === 'status' && (
                            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayslips.length > 0 ? (
                      filteredPayslips.map((payslip) => (
                        <TableRow key={payslip.id}>
                          <TableCell>{payslip.id}</TableCell>
                          <TableCell className="font-medium">{payslip.employee}</TableCell>
                          <TableCell>{payslip.period}</TableCell>
                          <TableCell>{payslip.department || '-'}</TableCell>
                          <TableCell>{payslip.amount || '-'}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(payslip.status)}>
                              {payslip.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => handleDownload(payslip.id)}>
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Baixar holerite</p>
                                  </TooltipContent>
                                </Tooltip>
                                
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => handleViewPayslip(payslip)}>
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Visualizar holerite</p>
                                  </TooltipContent>
                                </Tooltip>
                                
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => handleEditPayslip(payslip)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Editar holerite</p>
                                  </TooltipContent>
                                </Tooltip>
                                
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => handleDeletePayslip(payslip)}>
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Ver detalhes completos</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          <div className="flex flex-col items-center">
                            <FileText className="h-10 w-10 text-muted-foreground/60 mb-2" />
                            <p>Nenhum holerite encontrado com os filtros aplicados</p>
                            <Button 
                              variant="link" 
                              onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('all');
                                setPeriodFilter('all');
                              }}
                            >
                              Limpar filtros
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="text-sm">
                    Total de Holerites: <strong>{filteredPayslips.length}</strong>
                    {filteredPayslips.length !== payslipsData.length && (
                      <span className="text-muted-foreground"> de {payslipsData.length}</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </PageContainer>

        <NewPayslipDialog 
          open={newPayslipDialogOpen} 
          onOpenChange={setNewPayslipDialogOpen} 
        />

        <PayslipViewDialog
          open={viewPayslipDialogOpen}
          onOpenChange={setViewPayslipDialogOpen}
          payslip={selectedPayslip}
        />

        <AlertDialog open={editAlertOpen} onOpenChange={setEditAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Editar Holerite</AlertDialogTitle>
              <AlertDialogDescription>
                Você está prestes a editar o holerite de {selectedPayslip?.employee}.
                Deseja continuar?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmEdit}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Holerite</AlertDialogTitle>
              <AlertDialogDescription>
                Você está prestes a excluir o holerite de {selectedPayslip?.employee}.
                Esta ação não pode ser desfeita. Deseja continuar?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Payslips;
