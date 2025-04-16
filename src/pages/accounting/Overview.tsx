
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, AlertCircle, FileText, DollarSign, Coins, Receipt } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Overview = () => {
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Visão Geral Contábil</h1>
            <p className="text-sm text-muted-foreground">
              Panorama geral da saúde financeira e contábil de {companyName}
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Informações atualizadas</AlertTitle>
            <AlertDescription className="text-xs">
              Os dados contábeis foram atualizados pela última vez hoje às 08:30. Próxima atualização automática: amanhã às 08:30.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Receita Mensal</p>
                    <p className="text-2xl font-bold mt-1">R$ 45.680,00</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-green-500 mt-2 flex items-center">
                  +12.5% em relação ao mês anterior
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Despesas</p>
                    <p className="text-2xl font-bold mt-1">R$ 28.450,00</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Coins className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-red-500 mt-2 flex items-center">
                  +5.2% em relação ao mês anterior
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Notas Fiscais</p>
                    <p className="text-2xl font-bold mt-1">143</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-green-500 mt-2 flex items-center">
                  24 emitidas nos últimos 7 dias
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Impostos</p>
                    <p className="text-2xl font-bold mt-1">R$ 12.340,00</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-amber-500 mt-2 flex items-center">
                  Próximo vencimento em 10 dias
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="receitas" className="mb-6">
            <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
              <TabsTrigger value="receitas">Receitas</TabsTrigger>
              <TabsTrigger value="despesas">Despesas</TabsTrigger>
              <TabsTrigger value="lucro">Lucro</TabsTrigger>
              <TabsTrigger value="impostos">Impostos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="receitas" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Receitas nos últimos 6 meses</CardTitle>
                  <CardDescription>Acompanhamento da evolução das receitas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <BarChart size={60} className="opacity-40" />
                      <p>Dados de gráfico de receitas seriam exibidos aqui</p>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="despesas" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Despesas por categoria</CardTitle>
                  <CardDescription>Análise de gastos por departamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <PieChart size={60} className="opacity-40" />
                      <p>Dados de gráfico de despesas seriam exibidos aqui</p>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="lucro" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Evolução do lucro</CardTitle>
                  <CardDescription>Acompanhamento do lucro ao longo do ano</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <LineChart size={60} className="opacity-40" />
                      <p>Dados de gráfico de lucro seriam exibidos aqui</p>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="impostos" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Impostos e taxas</CardTitle>
                  <CardDescription>Análise de impostos pagos e a pagar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <BarChart size={60} className="opacity-40" />
                      <p>Dados de gráfico de impostos seriam exibidos aqui</p>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Próximos vencimentos</CardTitle>
                <CardDescription>Impostos e obrigações a vencer nos próximos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">INSS</p>
                      <p className="text-sm text-muted-foreground">Vencimento em 20/02/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ 3.450,00</p>
                      <Button variant="outline" size="sm" className="mt-1">Pagar</Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">FGTS</p>
                      <p className="text-sm text-muted-foreground">Vencimento em 07/02/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ 2.780,00</p>
                      <Button variant="outline" size="sm" className="mt-1">Pagar</Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">ICMS</p>
                      <p className="text-sm text-muted-foreground">Vencimento em 15/02/2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ 4.210,00</p>
                      <Button variant="outline" size="sm" className="mt-1">Pagar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Obrigações acessórias</CardTitle>
                <CardDescription>Declarações e documentos previstos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">SPED Fiscal</p>
                      <p className="text-sm text-muted-foreground">Prazo: 25/02/2025</p>
                    </div>
                    <Button variant="outline" size="sm">Preparar</Button>
                  </div>
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">DIRF</p>
                      <p className="text-sm text-muted-foreground">Prazo: 28/02/2025</p>
                    </div>
                    <Button variant="outline" size="sm">Preparar</Button>
                  </div>
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">EFD-Contribuições</p>
                      <p className="text-sm text-muted-foreground">Prazo: 10/03/2025</p>
                    </div>
                    <Button variant="outline" size="sm">Preparar</Button>
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

export default Overview;
