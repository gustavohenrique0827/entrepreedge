
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Search, Download, FileText, Calendar, Filter, Eye } from 'lucide-react';

interface PayslipItem {
  id: number;
  description: string;
  reference: string;
  value: number;
  type: 'earnings' | 'deductions';
}

interface Payslip {
  id: number;
  employeeId: number;
  employeeName: string;
  period: string;
  baseDate: string;
  grossAmount: number;
  netAmount: number;
  status: 'Processando' | 'Disponível' | 'Pago';
  items: PayslipItem[];
}

const mockPayslips: Payslip[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'João Silva',
    period: 'Maio 2023',
    baseDate: '2023-05-31',
    grossAmount: 5000,
    netAmount: 4125,
    status: 'Pago',
    items: [
      { id: 1, description: 'Salário Base', reference: '30 dias', value: 5000, type: 'earnings' },
      { id: 2, description: 'INSS', reference: '8%', value: 400, type: 'deductions' },
      { id: 3, description: 'IRRF', reference: '7.5%', value: 375, type: 'deductions' },
      { id: 4, description: 'FGTS', reference: '8%', value: 400, type: 'earnings' }
    ]
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Maria Oliveira',
    period: 'Maio 2023',
    baseDate: '2023-05-31',
    grossAmount: 7500,
    netAmount: 5925,
    status: 'Pago',
    items: [
      { id: 1, description: 'Salário Base', reference: '30 dias', value: 7500, type: 'earnings' },
      { id: 2, description: 'INSS', reference: '9%', value: 675, type: 'deductions' },
      { id: 3, description: 'IRRF', reference: '12%', value: 900, type: 'deductions' },
      { id: 4, description: 'FGTS', reference: '8%', value: 600, type: 'earnings' }
    ]
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Pedro Santos',
    period: 'Maio 2023',
    baseDate: '2023-05-31',
    grossAmount: 6200,
    netAmount: 5022,
    status: 'Disponível',
    items: [
      { id: 1, description: 'Salário Base', reference: '30 dias', value: 6000, type: 'earnings' },
      { id: 2, description: 'Hora Extra', reference: '10h', value: 200, type: 'earnings' },
      { id: 3, description: 'INSS', reference: '9%', value: 558, type: 'deductions' },
      { id: 4, description: 'IRRF', reference: '10%', value: 620, type: 'deductions' },
      { id: 5, description: 'FGTS', reference: '8%', value: 496, type: 'earnings' }
    ]
  }
];

const Payslips = () => {
  const [payslips] = useState<Payslip[]>(mockPayslips);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [isPayslipDialogOpen, setIsPayslipDialogOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('05/2023');
  const { toast } = useToast();

  // Filtrar folhas de pagamento
  const filteredPayslips = payslips.filter(
    (payslip) => 
      payslip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payslip.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Visualizar detalhes da folha de pagamento
  const viewPayslip = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setIsPayslipDialogOpen(true);
  };

  // Gerar folha de pagamento
  const generatePayslip = () => {
    toast({
      title: "Folha de pagamento gerada",
      description: `A folha de pagamento do período ${selectedMonth} foi gerada com sucesso.`,
      variant: "success",
    });
  };

  // Download da folha de pagamento
  const downloadPayslip = (id: number) => {
    toast({
      title: "Download iniciado",
      description: "O download do contracheque foi iniciado.",
      variant: "success",
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Folha de Pagamento"
        description="Gerenciamento de folha de pagamento e contracheques"
      />

      <Tabs defaultValue="payslips" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="payslips">Contracheques</TabsTrigger>
          <TabsTrigger value="processing">Processamento</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payslips">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Contracheques
                </CardTitle>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <select 
                      className="bg-background border rounded py-1 px-2 text-sm"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="05/2023">Maio/2023</option>
                      <option value="04/2023">Abril/2023</option>
                      <option value="03/2023">Março/2023</option>
                    </select>
                  </div>
                  
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar funcionário..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Data Base</TableHead>
                    <TableHead className="text-right">Valor Bruto</TableHead>
                    <TableHead className="text-right">Valor Líquido</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayslips.map((payslip) => (
                    <TableRow key={payslip.id}>
                      <TableCell className="font-medium">{payslip.employeeName}</TableCell>
                      <TableCell>{payslip.period}</TableCell>
                      <TableCell>{new Date(payslip.baseDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payslip.grossAmount)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payslip.netAmount)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payslip.status === 'Pago' 
                            ? 'bg-green-100 text-green-800' 
                            : payslip.status === 'Disponível'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payslip.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => viewPayslip(payslip)}
                          >
                            <Eye size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadPayslip(payslip.id)}
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Processamento da Folha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Parâmetros de Processamento</h3>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Período de Competência</label>
                      <div className="flex items-center gap-2">
                        <select className="border rounded-md p-2 w-full">
                          <option value="05/2023">Maio/2023</option>
                          <option value="06/2023">Junho/2023</option>
                          <option value="07/2023">Julho/2023</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Data de Pagamento</label>
                      <Input type="date" defaultValue="2023-06-05" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Tipo de Folha</label>
                      <select className="border rounded-md p-2">
                        <option value="regular">Folha Regular</option>
                        <option value="13">13º Salário</option>
                        <option value="vacation">Férias</option>
                        <option value="bonus">Participação nos Lucros</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Funcionários</label>
                      <select className="border rounded-md p-2">
                        <option value="all">Todos os Funcionários</option>
                        <option value="department">Por Departamento</option>
                        <option value="individual">Individual</option>
                      </select>
                    </div>
                    
                    <Button onClick={generatePayslip} className="mt-2 w-full">
                      Processar Folha de Pagamento
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Histórico de Processamentos</h3>
                  
                  <div className="border rounded-md divide-y">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Folha de Maio/2023</p>
                        <p className="text-sm text-muted-foreground">Processada em 31/05/2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> Relatório
                      </Button>
                    </div>
                    
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Folha de Abril/2023</p>
                        <p className="text-sm text-muted-foreground">Processada em 30/04/2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> Relatório
                      </Button>
                    </div>
                    
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Folha de Março/2023</p>
                        <p className="text-sm text-muted-foreground">Processada em 31/03/2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> Relatório
                      </Button>
                    </div>
                    
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">13º Salário - 1ª Parcela</p>
                        <p className="text-sm text-muted-foreground">Processada em 15/11/2022</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> Relatório
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatórios da Folha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Relatórios Gerenciais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Resumo da Folha</span>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download size={14} />
                          PDF
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Custos por Departamento</span>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download size={14} />
                          PDF
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Encargos Sociais</span>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download size={14} />
                          PDF
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span>Provisões Trabalhistas</span>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download size={14} />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Relatórios Legais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Guia INSS</span>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download size={14} />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download size={14} />
                            GFIP
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Guia FGTS</span>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download size={14} />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download size={14} />
                            SEFIP
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Guia IRRF</span>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download size={14} />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download size={14} />
                            DARF
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span>CAGED</span>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download size={14} />
                          XML
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de detalhes do contracheque */}
      <Dialog open={isPayslipDialogOpen} onOpenChange={setIsPayslipDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedPayslip && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes do Contracheque</DialogTitle>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold">{selectedPayslip.employeeName}</p>
                    <p className="text-sm text-muted-foreground">Matrícula: #{selectedPayslip.employeeId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{selectedPayslip.period}</p>
                    <p className="text-sm text-muted-foreground">Data Base: {new Date(selectedPayslip.baseDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Vencimentos</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Referência</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPayslip.items
                          .filter(item => item.type === 'earnings')
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.description}</TableCell>
                              <TableCell>{item.reference}</TableCell>
                              <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Descontos</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Referência</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPayslip.items
                          .filter(item => item.type === 'deductions')
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.description}</TableCell>
                              <TableCell>{item.reference}</TableCell>
                              <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Vencimentos</p>
                    <p className="text-lg font-bold">{formatCurrency(selectedPayslip.grossAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Descontos</p>
                    <p className="text-lg font-bold">{formatCurrency(selectedPayslip.grossAmount - selectedPayslip.netAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Líquido</p>
                    <p className="text-xl font-bold">{formatCurrency(selectedPayslip.netAmount)}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPayslipDialogOpen(false)}>
                  Fechar
                </Button>
                <Button 
                  onClick={() => downloadPayslip(selectedPayslip.id)}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Baixar Contracheque
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Payslips;
