
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FileText, Plus, ArrowDownUp, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Entries = () => {
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Lançamentos Contábeis</h1>
            <p className="text-sm text-muted-foreground">
              Gerenciamento de lançamentos contábeis de {companyName}
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Fechamento mensal</AlertTitle>
            <AlertDescription className="text-xs">
              O fechamento contábil deste mês está previsto para 30/04/2025. Por favor, registre todos os lançamentos até esta data.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button className="gap-2">
                <Plus size={16} />
                Novo Lançamento
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText size={16} />
                Exportar
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar lançamentos..." className="pl-10 w-[250px]" />
              </div>
              
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
          
          <Tabs defaultValue="todos" className="mb-6">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="debito">Débitos</TabsTrigger>
              <TabsTrigger value="credito">Créditos</TabsTrigger>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Lançamentos Contábeis</CardTitle>
                  <CardDescription>Lista de todos os lançamentos do período selecionado</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Conta</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>05/04/2025</TableCell>
                        <TableCell>Pagamento de fornecedor</TableCell>
                        <TableCell>Fornecedores</TableCell>
                        <TableCell>Débito</TableCell>
                        <TableCell className="text-right">R$ 4.500,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Conciliado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>10/04/2025</TableCell>
                        <TableCell>Recebimento de cliente</TableCell>
                        <TableCell>Clientes</TableCell>
                        <TableCell>Crédito</TableCell>
                        <TableCell className="text-right">R$ 8.750,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Conciliado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15/04/2025</TableCell>
                        <TableCell>Folha de pagamento</TableCell>
                        <TableCell>Salários</TableCell>
                        <TableCell>Débito</TableCell>
                        <TableCell className="text-right">R$ 12.800,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                            Pendente
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>20/04/2025</TableCell>
                        <TableCell>Pagamento de impostos</TableCell>
                        <TableCell>Impostos</TableCell>
                        <TableCell>Débito</TableCell>
                        <TableCell className="text-right">R$ 6.350,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Conciliado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>25/04/2025</TableCell>
                        <TableCell>Faturamento serviços</TableCell>
                        <TableCell>Receitas</TableCell>
                        <TableCell>Crédito</TableCell>
                        <TableCell className="text-right">R$ 15.200,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                            Pendente
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="debito" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Lançamentos de Débito</CardTitle>
                  <CardDescription>Lista de todos os débitos do período selecionado</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Conta</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>05/04/2025</TableCell>
                        <TableCell>Pagamento de fornecedor</TableCell>
                        <TableCell>Fornecedores</TableCell>
                        <TableCell className="text-right">R$ 4.500,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Conciliado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15/04/2025</TableCell>
                        <TableCell>Folha de pagamento</TableCell>
                        <TableCell>Salários</TableCell>
                        <TableCell className="text-right">R$ 12.800,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                            Pendente
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>20/04/2025</TableCell>
                        <TableCell>Pagamento de impostos</TableCell>
                        <TableCell>Impostos</TableCell>
                        <TableCell className="text-right">R$ 6.350,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Conciliado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="credito" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Lançamentos de Crédito</CardTitle>
                  <CardDescription>Lista de todos os créditos do período selecionado</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Conta</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>10/04/2025</TableCell>
                        <TableCell>Recebimento de cliente</TableCell>
                        <TableCell>Clientes</TableCell>
                        <TableCell className="text-right">R$ 8.750,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Conciliado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>25/04/2025</TableCell>
                        <TableCell>Faturamento serviços</TableCell>
                        <TableCell>Receitas</TableCell>
                        <TableCell className="text-right">R$ 15.200,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                            Pendente
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pendentes" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Lançamentos Pendentes</CardTitle>
                  <CardDescription>Lista de todos os lançamentos pendentes de conciliação</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Conta</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>15/04/2025</TableCell>
                        <TableCell>Folha de pagamento</TableCell>
                        <TableCell>Salários</TableCell>
                        <TableCell>Débito</TableCell>
                        <TableCell className="text-right">R$ 12.800,00</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Conciliar</Button>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>25/04/2025</TableCell>
                        <TableCell>Faturamento serviços</TableCell>
                        <TableCell>Receitas</TableCell>
                        <TableCell>Crédito</TableCell>
                        <TableCell className="text-right">R$ 15.200,00</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Conciliar</Button>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resumo de Lançamentos</CardTitle>
                <CardDescription>Saldo do período por tipo de conta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">Total de Débitos</p>
                      <p className="text-sm text-muted-foreground">Abril/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-500">R$ 23.650,00</p>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">Total de Créditos</p>
                      <p className="text-sm text-muted-foreground">Abril/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-500">R$ 23.950,00</p>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md flex justify-between items-center bg-muted/20">
                    <div>
                      <p className="font-medium">Saldo do Período</p>
                      <p className="text-sm text-muted-foreground">Abril/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-500">R$ 300,00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conciliação Bancária</CardTitle>
                <CardDescription>Status da conciliação do período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Lançamentos conciliados</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="p-3 border rounded-md bg-muted/10">
                      <p className="text-sm text-muted-foreground">Lançamentos</p>
                      <p className="text-lg font-semibold">123</p>
                    </div>
                    <div className="p-3 border rounded-md bg-muted/10">
                      <p className="text-sm text-muted-foreground">Pendentes</p>
                      <p className="text-lg font-semibold">49</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-3">
                    <ArrowDownUp className="mr-2 h-4 w-4" /> 
                    Iniciar Conciliação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entries;
