import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FileText, Download, Calendar, Printer, ExternalLink, BarChart2, PieChart, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { viewReport, exportReport } from '@/utils/reportUtils';
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const [selectedPeriod, setSelectedPeriod] = useState('abril');
  
  const handleViewReport = (reportName: string) => {
    viewReport({
      reportName,
      reportPeriod: getPeriodLabel(selectedPeriod),
    });
  };
  
  const handleExportReport = (reportName: string, format: 'pdf' | 'xlsx' | 'csv' = 'pdf') => {
    exportReport({
      reportName,
      reportPeriod: getPeriodLabel(selectedPeriod),
      format,
    });
  };
  
  const handlePrintReport = (reportName: string) => {
    toast({
      title: "Imprimindo Relatório",
      description: `${reportName} - ${getPeriodLabel(selectedPeriod)}`,
      duration: 3000,
    });
  };
  
  const getPeriodLabel = (period: string): string => {
    const periodMap: Record<string, string> = {
      'janeiro': 'Janeiro 2025',
      'fevereiro': 'Fevereiro 2025',
      'marco': 'Março 2025',
      'abril': 'Abril 2025',
    };
    return periodMap[period] || 'Abril 2025';
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Relatórios Contábeis</h1>
            <p className="text-sm text-muted-foreground">
              Análise e exportação de relatórios de {companyName}
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Relatórios disponíveis</AlertTitle>
            <AlertDescription className="text-xs">
              Você tem acesso a relatórios contábeis, fiscais e gerenciais. Selecione a categoria desejada abaixo.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Relatórios e Análises</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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
          
          <Tabs defaultValue="contabeis" className="mb-6">
            <TabsList className="grid grid-cols-3 w-full md:w-[500px]">
              <TabsTrigger value="contabeis">Relatórios Contábeis</TabsTrigger>
              <TabsTrigger value="fiscais">Relatórios Fiscais</TabsTrigger>
              <TabsTrigger value="gerenciais">Relatórios Gerenciais</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contabeis" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Relatórios Principais</CardTitle>
                    <CardDescription>Demonstrações contábeis do período</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Balanço Patrimonial</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Balanço Patrimonial")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Imprimir"
                            onClick={() => handlePrintReport("Balanço Patrimonial")}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Balanço Patrimonial", "pdf")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">DRE - Demonstração do Resultado do Exercício</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("DRE - Demonstração do Resultado do Exercício")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Imprimir"
                            onClick={() => handlePrintReport("DRE - Demonstração do Resultado do Exercício")}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("DRE - Demonstração do Resultado do Exercício", "pdf")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Fluxo de Caixa</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Fluxo de Caixa")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Imprimir"
                            onClick={() => handlePrintReport("Fluxo de Caixa")}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Fluxo de Caixa", "pdf")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">DMPL - Demonstração das Mutações do Patrimônio Líquido</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("DMPL - Demonstração das Mutações do Patrimônio Líquido")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Imprimir"
                            onClick={() => handlePrintReport("DMPL - Demonstração das Mutações do Patrimônio Líquido")}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("DMPL - Demonstração das Mutações do Patrimônio Líquido", "pdf")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Relatórios Adicionais</CardTitle>
                    <CardDescription>Livros contábeis e análises específicas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Livro Diário</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Livro Diário")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Imprimir"
                            onClick={() => handlePrintReport("Livro Diário")}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Livro Diário", "pdf")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Livro Razão</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Livro Razão")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Imprimir"
                            onClick={() => handlePrintReport("Livro Razão")}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Livro Razão", "pdf")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Balancete de Verificação</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Balancete de Verificação")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Imprimir"
                            onClick={() => handlePrintReport("Balancete de Verificação")}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Balancete de Verificação", "pdf")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Conciliação Bancária</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Conciliação Bancária")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Imprimir"
                            onClick={() => handlePrintReport("Conciliação Bancária")}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Conciliação Bancária", "pdf")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="fiscais" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Relatórios Fiscais</CardTitle>
                  <CardDescription>Documentação fiscal e tributária</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Apuração de Impostos</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Apuração de Impostos")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Apuração de Impostos", "xlsx")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Registro de Inventário</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Registro de Inventário")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Registro de Inventário", "xlsx")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Livro de Entrada e Saída</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Livro de Entrada e Saída")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Livro de Entrada e Saída", "xlsx")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Registro de Apuração de ICMS</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Registro de Apuração de ICMS")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Registro de Apuração de ICMS", "xlsx")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Apuração PIS/COFINS</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Apuração PIS/COFINS")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Apuração PIS/COFINS", "xlsx")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Relatório de Retenções</p>
                            <p className="text-xs text-muted-foreground">{getPeriodLabel(selectedPeriod)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewReport("Relatório de Retenções")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleExportReport("Relatório de Retenções", "xlsx")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 p-4 border rounded-lg bg-muted/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Relatórios Fiscais Automáticos</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Configure a geração e envio automático de relatórios fiscais por email.
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Button onClick={() => {
                          toast({
                            title: "Configuração de Relatórios",
                            description: "Abrindo painel de configuração de relatórios automáticos",
                            duration: 3000,
                          });
                        }}>Configurar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gerenciais" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Indicadores Financeiros
                    </CardTitle>
                    <CardDescription>
                      Relatórios de performance financeira
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Análise de Liquidez</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Análise de Liquidez")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Capital de Giro</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Capital de Giro")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Ciclo Financeiro</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Ciclo Financeiro")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Endividamento</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Endividamento")}>Visualizar</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Análise de Rentabilidade
                    </CardTitle>
                    <CardDescription>
                      Relatórios de lucratividade e retorno
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Margem de Lucro</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Margem de Lucro")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">ROI por Produto</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("ROI por Produto")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">ROA e ROE</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("ROA e ROE")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Ponto de Equilíbrio</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Ponto de Equilíbrio")}>Visualizar</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <PieChart className="mr-2 h-4 w-4" />
                      Dashboard Gerencial
                    </CardTitle>
                    <CardDescription>
                      Painéis interativos de dados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">KPIs Financeiros</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("KPIs Financeiros")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Comparativo Mensal</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Comparativo Mensal")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Indicadores de Cashflow</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Indicadores de Cashflow")}>Visualizar</Button>
                    </div>
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <span className="text-sm">Previsão Financeira</span>
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("Previsão Financeira")}>Visualizar</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-base">Relatórios Personalizados</CardTitle>
                  <CardDescription>Crie relatórios personalizados para sua necessidade específica</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-5">
                      <h3 className="font-medium mb-2">Construtor de Relatórios</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Crie relatórios customizados selecionando as métricas e indicadores relevantes para seu negócio.
                      </p>
                      <Button onClick={() => {
                        toast({
                          title: "Construtor de Relatórios",
                          description: "Abrindo ferramenta de criação de relatórios personalizados",
                          duration: 3000,
                        });
                      }}>Criar Relatório</Button>
                    </div>
                    
                    <div className="border rounded-lg p-5">
                      <h3 className="font-medium mb-2">Agendar Relatórios</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Configure a geração automática e envio periódico de relatórios para sua equipe.
                      </p>
                      <Button onClick={() => {
                        toast({
                          title: "Agendamento de Relatórios",
                          description: "Abrindo painel de agendamento de relatórios",
                          duration: 3000,
                        });
                      }}>Agendar Entregas</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reports;
