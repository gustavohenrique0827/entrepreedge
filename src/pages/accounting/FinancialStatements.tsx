
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FileText, Download, Printer, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FinancialStatements = () => {
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Demonstrações Financeiras</h1>
            <p className="text-sm text-muted-foreground">
              Relatórios financeiros detalhados de {companyName}
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Demonstrações atualizadas</AlertTitle>
            <AlertDescription className="text-xs">
              As demonstrações financeiras foram atualizadas com os dados contábeis de abril/2025.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Relatórios Financeiros</h2>
            </div>
            
            <div className="flex items-center gap-2">
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
          
          <Tabs defaultValue="balanco" className="mb-6">
            <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
              <TabsTrigger value="balanco">Balanço Patrimonial</TabsTrigger>
              <TabsTrigger value="dre">DRE</TabsTrigger>
              <TabsTrigger value="dfc">DFC</TabsTrigger>
              <TabsTrigger value="dvp">DVA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="balanco" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base">Balanço Patrimonial</CardTitle>
                      <CardDescription>Posição patrimonial em 30/04/2025</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Ativo</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[60%]">Descrição</TableHead>
                            <TableHead className="text-right">Valor (R$)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="font-medium">
                            <TableCell>Ativo Circulante</TableCell>
                            <TableCell className="text-right">1.250.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Caixa e Equivalentes</TableCell>
                            <TableCell className="text-right">380.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Contas a Receber</TableCell>
                            <TableCell className="text-right">520.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Estoques</TableCell>
                            <TableCell className="text-right">280.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Outros Ativos Circulantes</TableCell>
                            <TableCell className="text-right">70.000,00</TableCell>
                          </TableRow>
                          
                          <TableRow className="font-medium">
                            <TableCell>Ativo Não Circulante</TableCell>
                            <TableCell className="text-right">1.750.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Realizável a Longo Prazo</TableCell>
                            <TableCell className="text-right">250.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Investimentos</TableCell>
                            <TableCell className="text-right">300.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Imobilizado</TableCell>
                            <TableCell className="text-right">1.100.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Intangível</TableCell>
                            <TableCell className="text-right">100.000,00</TableCell>
                          </TableRow>
                          
                          <TableRow className="font-medium bg-muted/20">
                            <TableCell>Total do Ativo</TableCell>
                            <TableCell className="text-right">3.000.000,00</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Passivo e Patrimônio Líquido</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[60%]">Descrição</TableHead>
                            <TableHead className="text-right">Valor (R$)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="font-medium">
                            <TableCell>Passivo Circulante</TableCell>
                            <TableCell className="text-right">850.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Fornecedores</TableCell>
                            <TableCell className="text-right">320.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Empréstimos e Financiamentos</TableCell>
                            <TableCell className="text-right">280.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Obrigações Sociais e Trabalhistas</TableCell>
                            <TableCell className="text-right">150.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Obrigações Fiscais</TableCell>
                            <TableCell className="text-right">100.000,00</TableCell>
                          </TableRow>
                          
                          <TableRow className="font-medium">
                            <TableCell>Passivo Não Circulante</TableCell>
                            <TableCell className="text-right">750.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Empréstimos e Financiamentos</TableCell>
                            <TableCell className="text-right">650.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Outras Obrigações</TableCell>
                            <TableCell className="text-right">100.000,00</TableCell>
                          </TableRow>
                          
                          <TableRow className="font-medium">
                            <TableCell>Patrimônio Líquido</TableCell>
                            <TableCell className="text-right">1.400.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Capital Social</TableCell>
                            <TableCell className="text-right">1.000.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Reservas</TableCell>
                            <TableCell className="text-right">250.000,00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="pl-8">Lucros Acumulados</TableCell>
                            <TableCell className="text-right">150.000,00</TableCell>
                          </TableRow>
                          
                          <TableRow className="font-medium bg-muted/20">
                            <TableCell>Total do Passivo e Patrimônio Líquido</TableCell>
                            <TableCell className="text-right">3.000.000,00</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  
                  <div className="mt-5 p-4 border rounded-lg bg-muted/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Análise Comparativa</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Compare o balanço atual com períodos anteriores para análise de tendências e variações.
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Button>Ver Comparativo</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dre" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base">Demonstração do Resultado do Exercício (DRE)</CardTitle>
                      <CardDescription>Resultado do período de 01/04/2025 a 30/04/2025</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60%]">Descrição</TableHead>
                        <TableHead className="text-right">Valor (R$)</TableHead>
                        <TableHead className="text-right">% Receita</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-medium">
                        <TableCell>Receita Operacional Bruta</TableCell>
                        <TableCell className="text-right">580.000,00</TableCell>
                        <TableCell className="text-right">100,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Vendas de Produtos</TableCell>
                        <TableCell className="text-right">380.000,00</TableCell>
                        <TableCell className="text-right">65,5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Vendas de Serviços</TableCell>
                        <TableCell className="text-right">200.000,00</TableCell>
                        <TableCell className="text-right">34,5%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>(-) Deduções da Receita</TableCell>
                        <TableCell className="text-right">(87.000,00)</TableCell>
                        <TableCell className="text-right">-15,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Impostos sobre Vendas</TableCell>
                        <TableCell className="text-right">(78.300,00)</TableCell>
                        <TableCell className="text-right">-13,5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Devoluções e Abatimentos</TableCell>
                        <TableCell className="text-right">(8.700,00)</TableCell>
                        <TableCell className="text-right">-1,5%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>Receita Operacional Líquida</TableCell>
                        <TableCell className="text-right">493.000,00</TableCell>
                        <TableCell className="text-right">85,0%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>(-) Custo dos Produtos/Serviços Vendidos</TableCell>
                        <TableCell className="text-right">(295.800,00)</TableCell>
                        <TableCell className="text-right">-51,0%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>Lucro Bruto</TableCell>
                        <TableCell className="text-right">197.200,00</TableCell>
                        <TableCell className="text-right">34,0%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>(-) Despesas Operacionais</TableCell>
                        <TableCell className="text-right">(139.200,00)</TableCell>
                        <TableCell className="text-right">-24,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Despesas com Vendas</TableCell>
                        <TableCell className="text-right">(46.400,00)</TableCell>
                        <TableCell className="text-right">-8,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Despesas Administrativas</TableCell>
                        <TableCell className="text-right">(87.000,00)</TableCell>
                        <TableCell className="text-right">-15,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Outras Despesas/Receitas Operacionais</TableCell>
                        <TableCell className="text-right">(5.800,00)</TableCell>
                        <TableCell className="text-right">-1,0%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>Resultado Operacional</TableCell>
                        <TableCell className="text-right">58.000,00</TableCell>
                        <TableCell className="text-right">10,0%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>Resultado Financeiro</TableCell>
                        <TableCell className="text-right">(11.600,00)</TableCell>
                        <TableCell className="text-right">-2,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Receitas Financeiras</TableCell>
                        <TableCell className="text-right">2.900,00</TableCell>
                        <TableCell className="text-right">0,5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Despesas Financeiras</TableCell>
                        <TableCell className="text-right">(14.500,00)</TableCell>
                        <TableCell className="text-right">-2,5%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>Resultado Antes dos Tributos</TableCell>
                        <TableCell className="text-right">46.400,00</TableCell>
                        <TableCell className="text-right">8,0%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>(-) Impostos sobre o Lucro</TableCell>
                        <TableCell className="text-right">(15.660,00)</TableCell>
                        <TableCell className="text-right">-2,7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">IRPJ</TableCell>
                        <TableCell className="text-right">(11.600,00)</TableCell>
                        <TableCell className="text-right">-2,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">CSLL</TableCell>
                        <TableCell className="text-right">(4.060,00)</TableCell>
                        <TableCell className="text-right">-0,7%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium bg-muted/20">
                        <TableCell>Resultado Líquido do Período</TableCell>
                        <TableCell className="text-right">30.740,00</TableCell>
                        <TableCell className="text-right">5,3%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dfc" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base">Demonstração dos Fluxos de Caixa (DFC)</CardTitle>
                      <CardDescription>Fluxo de caixa do período de 01/04/2025 a 30/04/2025</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60%]">Descrição</TableHead>
                        <TableHead className="text-right">Valor (R$)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-medium">
                        <TableCell>1. Fluxo de Caixa das Atividades Operacionais</TableCell>
                        <TableCell className="text-right">68.500,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Resultado Líquido do Período</TableCell>
                        <TableCell className="text-right">30.740,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Ajustes para Reconciliar o Resultado</TableCell>
                        <TableCell className="text-right">29.200,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Depreciação e Amortização</TableCell>
                        <TableCell className="text-right">18.500,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Provisões</TableCell>
                        <TableCell className="text-right">10.700,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Variações nos Ativos e Passivos Operacionais</TableCell>
                        <TableCell className="text-right">8.560,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">(Aumento) Redução em Contas a Receber</TableCell>
                        <TableCell className="text-right">(15.400,00)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">(Aumento) Redução em Estoques</TableCell>
                        <TableCell className="text-right">5.200,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Aumento (Redução) em Fornecedores</TableCell>
                        <TableCell className="text-right">12.800,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Aumento (Redução) em Obrigações Fiscais</TableCell>
                        <TableCell className="text-right">5.960,00</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>2. Fluxo de Caixa das Atividades de Investimento</TableCell>
                        <TableCell className="text-right">(45.800,00)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Aquisição de Imobilizado</TableCell>
                        <TableCell className="text-right">(38.500,00)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Aquisição de Intangível</TableCell>
                        <TableCell className="text-right">(7.300,00)</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>3. Fluxo de Caixa das Atividades de Financiamento</TableCell>
                        <TableCell className="text-right">(15.200,00)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Captação de Empréstimos</TableCell>
                        <TableCell className="text-right">25.000,00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Amortização de Empréstimos</TableCell>
                        <TableCell className="text-right">(32.500,00)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Pagamento de Dividendos</TableCell>
                        <TableCell className="text-right">(7.700,00)</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium bg-muted/20">
                        <TableCell>Aumento (Redução) Líquido de Caixa</TableCell>
                        <TableCell className="text-right">7.500,00</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>Caixa e Equivalentes no Início do Período</TableCell>
                        <TableCell className="text-right">372.500,00</TableCell>
                      </TableRow>
                      <TableRow className="font-medium">
                        <TableCell>Caixa e Equivalentes no Final do Período</TableCell>
                        <TableCell className="text-right">380.000,00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dvp" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base">Demonstração do Valor Adicionado (DVA)</CardTitle>
                      <CardDescription>Valor adicionado do período de 01/04/2025 a 30/04/2025</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60%]">Descrição</TableHead>
                        <TableHead className="text-right">Valor (R$)</TableHead>
                        <TableHead className="text-right">%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-medium">
                        <TableCell>1. Receitas</TableCell>
                        <TableCell className="text-right">571.300,00</TableCell>
                        <TableCell className="text-right">100,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Vendas de Mercadorias e Serviços</TableCell>
                        <TableCell className="text-right">580.000,00</TableCell>
                        <TableCell className="text-right">101,5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">(-) Devoluções e Abatimentos</TableCell>
                        <TableCell className="text-right">(8.700,00)</TableCell>
                        <TableCell className="text-right">-1,5%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>2. Insumos Adquiridos de Terceiros</TableCell>
                        <TableCell className="text-right">(245.100,00)</TableCell>
                        <TableCell className="text-right">-42,9%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Custos dos Produtos e Serviços</TableCell>
                        <TableCell className="text-right">(183.400,00)</TableCell>
                        <TableCell className="text-right">-32,1%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Materiais, Energia e Serviços de Terceiros</TableCell>
                        <TableCell className="text-right">(61.700,00)</TableCell>
                        <TableCell className="text-right">-10,8%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>3. Valor Adicionado Bruto (1-2)</TableCell>
                        <TableCell className="text-right">326.200,00</TableCell>
                        <TableCell className="text-right">57,1%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>4. Depreciação e Amortização</TableCell>
                        <TableCell className="text-right">(18.500,00)</TableCell>
                        <TableCell className="text-right">-3,2%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>5. Valor Adicionado Líquido (3-4)</TableCell>
                        <TableCell className="text-right">307.700,00</TableCell>
                        <TableCell className="text-right">53,9%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell>6. Valor Adicionado Recebido em Transferência</TableCell>
                        <TableCell className="text-right">2.900,00</TableCell>
                        <TableCell className="text-right">0,5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Receitas Financeiras</TableCell>
                        <TableCell className="text-right">2.900,00</TableCell>
                        <TableCell className="text-right">0,5%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium bg-muted/20">
                        <TableCell>7. Valor Adicionado Total a Distribuir (5+6)</TableCell>
                        <TableCell className="text-right">310.600,00</TableCell>
                        <TableCell className="text-right">54,4%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-medium">
                        <TableCell>8. Distribuição do Valor Adicionado</TableCell>
                        <TableCell className="text-right">310.600,00</TableCell>
                        <TableCell className="text-right">100,0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Pessoal</TableCell>
                        <TableCell className="text-right">171.400,00</TableCell>
                        <TableCell className="text-right">55,2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Remuneração Direta</TableCell>
                        <TableCell className="text-right">135.200,00</TableCell>
                        <TableCell className="text-right">43,5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Benefícios</TableCell>
                        <TableCell className="text-right">28.600,00</TableCell>
                        <TableCell className="text-right">9,2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">FGTS</TableCell>
                        <TableCell className="text-right">7.600,00</TableCell>
                        <TableCell className="text-right">2,4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Impostos, Taxas e Contribuições</TableCell>
                        <TableCell className="text-right">93.960,00</TableCell>
                        <TableCell className="text-right">30,3%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Federais</TableCell>
                        <TableCell className="text-right">74.900,00</TableCell>
                        <TableCell className="text-right">24,1%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Estaduais</TableCell>
                        <TableCell className="text-right">16.850,00</TableCell>
                        <TableCell className="text-right">5,4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Municipais</TableCell>
                        <TableCell className="text-right">2.210,00</TableCell>
                        <TableCell className="text-right">0,7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Remuneração de Capital de Terceiros</TableCell>
                        <TableCell className="text-right">14.500,00</TableCell>
                        <TableCell className="text-right">4,7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Juros</TableCell>
                        <TableCell className="text-right">14.500,00</TableCell>
                        <TableCell className="text-right">4,7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Remuneração de Capital Próprio</TableCell>
                        <TableCell className="text-right">30.740,00</TableCell>
                        <TableCell className="text-right">9,9%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Lucros Retidos</TableCell>
                        <TableCell className="text-right">23.040,00</TableCell>
                        <TableCell className="text-right">7,4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-12">Dividendos</TableCell>
                        <TableCell className="text-right">7.700,00</TableCell>
                        <TableCell className="text-right">2,5%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FinancialStatements;
