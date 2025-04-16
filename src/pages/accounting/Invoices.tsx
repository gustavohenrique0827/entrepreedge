
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, FileDown, Plus, Search, SlidersHorizontal, ChevronDown, Eye, Printer, Copy, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Invoices = () => {
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  
  const toggleInvoiceSelection = (id: string) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(selectedInvoices.filter(item => item !== id));
    } else {
      setSelectedInvoices([...selectedInvoices, id]);
    }
  };
  
  const selectAllInvoices = () => {
    if (selectedInvoices.length === invoiceData.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(invoiceData.map(invoice => invoice.id));
    }
  };
  
  const invoiceData = [
    { id: 'NF-1234', date: '05/04/2025', customer: 'Empresa ABC Ltda', value: 8500.00, status: 'Emitida' },
    { id: 'NF-1235', date: '10/04/2025', customer: 'XYZ Comércio S.A.', value: 12350.00, status: 'Emitida' },
    { id: 'NF-1236', date: '15/04/2025', customer: 'Distribuidora 123', value: 5780.00, status: 'Processando' },
    { id: 'NF-1237', date: '18/04/2025', customer: 'Indústria Nacional', value: 15900.00, status: 'Emitida' },
    { id: 'NF-1238', date: '20/04/2025', customer: 'Comércio Local Ltda', value: 3450.00, status: 'Cancelada' },
    { id: 'NF-1239', date: '22/04/2025', customer: 'Serviços Gerais S.A.', value: 7800.00, status: 'Emitida' },
    { id: 'NF-1240', date: '25/04/2025', customer: 'Tecnologia Avançada', value: 9600.00, status: 'Processando' }
  ];
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Notas Fiscais</h1>
            <p className="text-sm text-muted-foreground">
              Gerenciamento de notas fiscais de {companyName}
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Notas fiscais emitidas</AlertTitle>
            <AlertDescription className="text-xs">
              Este mês foram emitidas 43 notas fiscais, totalizando R$ 156.800,00.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button className="gap-2">
                <Plus size={16} />
                Nova Nota Fiscal
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Ações em Lote
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem disabled={selectedInvoices.length === 0}>
                    <Printer className="mr-2 h-4 w-4" />
                    <span>Imprimir selecionados</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={selectedInvoices.length === 0}>
                    <FileDown className="mr-2 h-4 w-4" />
                    <span>Exportar selecionados</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar notas fiscais..." className="pl-10 w-[250px]" />
              </div>
              
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              
              <Select defaultValue="abril">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="janeiro">Janeiro 2025</SelectItem>
                  <SelectItem value="fevereiro">Fevereiro 2025</SelectItem>
                  <SelectItem value="marco">Março 2025</SelectItem>
                  <SelectItem value="abril">Abril 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="emitidas" className="mb-6">
            <TabsList>
              <TabsTrigger value="emitidas">Emitidas</TabsTrigger>
              <TabsTrigger value="recebidas">Recebidas</TabsTrigger>
              <TabsTrigger value="canceladas">Canceladas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emitidas" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Notas Fiscais Emitidas</CardTitle>
                  <CardDescription>Relação de notas fiscais emitidas no período</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={selectedInvoices.length === invoiceData.length}
                            onChange={selectAllInvoices}
                          />
                        </TableHead>
                        <TableHead>Número</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoiceData.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              checked={selectedInvoices.includes(invoice.id)}
                              onChange={() => toggleInvoiceSelection(invoice.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.customer}</TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(invoice.value)}
                          </TableCell>
                          <TableCell>
                            {invoice.status === 'Emitida' && (
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                                Emitida
                              </span>
                            )}
                            {invoice.status === 'Processando' && (
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                                Processando
                              </span>
                            )}
                            {invoice.status === 'Cancelada' && (
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                                Cancelada
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Ações <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Visualizar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Printer className="mr-2 h-4 w-4" />
                                  <span>Imprimir</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" />
                                  <span>Duplicar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Cancelar</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Mostrando <strong>7</strong> de <strong>43</strong> notas fiscais
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>Anterior</Button>
                      <Button variant="outline" size="sm" className="bg-muted/50">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">Próximo</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recebidas" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Notas Fiscais Recebidas</CardTitle>
                  <CardDescription>Relação de notas fiscais recebidas no período</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <FileDown className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Importar Notas Fiscais</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                      Você pode importar notas fiscais recebidas de fornecedores através de arquivos XML ou consultar diretamente da base da Receita Federal.
                    </p>
                    <div className="flex gap-2">
                      <Button>Importar XML</Button>
                      <Button variant="outline">Consultar Receita</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="canceladas" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Notas Fiscais Canceladas</CardTitle>
                  <CardDescription>Relação de notas fiscais canceladas no período</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Data Emissão</TableHead>
                        <TableHead>Data Cancelamento</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">NF-1238</TableCell>
                        <TableCell>20/04/2025</TableCell>
                        <TableCell>20/04/2025</TableCell>
                        <TableCell>Comércio Local Ltda</TableCell>
                        <TableCell className="text-right">R$ 3.450,00</TableCell>
                        <TableCell>Erro de valor</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Ver Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">NF-1220</TableCell>
                        <TableCell>01/04/2025</TableCell>
                        <TableCell>02/04/2025</TableCell>
                        <TableCell>Empresa ABC Ltda</TableCell>
                        <TableCell className="text-right">R$ 2.800,00</TableCell>
                        <TableCell>Erro de CFOP</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Ver Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resumo de NFe por Mês</CardTitle>
                <CardDescription>Quantidade e valor das notas emitidas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Janeiro/2025</span>
                    <div className="text-right">
                      <div className="font-medium">35 notas</div>
                      <div className="text-muted-foreground text-xs">R$ 128.500,00</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Fevereiro/2025</span>
                    <div className="text-right">
                      <div className="font-medium">38 notas</div>
                      <div className="text-muted-foreground text-xs">R$ 142.800,00</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Março/2025</span>
                    <div className="text-right">
                      <div className="font-medium">41 notas</div>
                      <div className="text-muted-foreground text-xs">R$ 151.200,00</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>Abril/2025</span>
                    <div className="text-right">
                      <div className="font-medium">43 notas</div>
                      <div className="text-muted-foreground text-xs">R$ 156.800,00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">NFe por Status</CardTitle>
                <CardDescription>Distribuição por situação atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Emitidas</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Processando</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Canceladas</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Principais Clientes</CardTitle>
                <CardDescription>Top clientes por valor de notas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        XY
                      </div>
                      <span className="font-medium">XYZ Comércio S.A.</span>
                    </div>
                    <div className="text-right text-sm">
                      R$ 35.250,00
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        IN
                      </div>
                      <span className="font-medium">Indústria Nacional</span>
                    </div>
                    <div className="text-right text-sm">
                      R$ 28.900,00
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        AB
                      </div>
                      <span className="font-medium">Empresa ABC Ltda</span>
                    </div>
                    <div className="text-right text-sm">
                      R$ 22.500,00
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        SG
                      </div>
                      <span className="font-medium">Serviços Gerais S.A.</span>
                    </div>
                    <div className="text-right text-sm">
                      R$ 18.750,00
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
