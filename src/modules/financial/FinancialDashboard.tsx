
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { Wallet, TrendingUp, ArrowUpCircle, ArrowDownCircle, Calendar, PieChart, BarChart } from 'lucide-react';

const FinancialDashboard: React.FC = () => {
  return (
    <ModuleContainer requiredSegment="financial">
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Financeiro</h1>
            <p className="text-sm text-muted-foreground">
              Controle financeiro completo para seu negócio
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Exportar</Button>
            <Button size="sm">Nova Transação</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="rounded-full bg-green-100 p-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-xs text-muted-foreground">Este mês</span>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">R$ 32.450,00</h3>
                <p className="text-xs text-muted-foreground">Saldo atual</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="rounded-full bg-green-100 p-2">
                  <ArrowUpCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-xs text-muted-foreground">Este mês</span>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">R$ 12.850,00</h3>
                <p className="text-xs text-muted-foreground">Receitas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="rounded-full bg-red-100 p-2">
                  <ArrowDownCircle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-xs text-muted-foreground">Este mês</span>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">R$ 8.320,00</h3>
                <p className="text-xs text-muted-foreground">Despesas</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Distribuição de Despesas
                  </CardTitle>
                  <CardDescription>Por categoria</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <PieChart className="h-32 w-32 text-muted-foreground opacity-40" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    Evolução Financeira
                  </CardTitle>
                  <CardDescription>Últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <BarChart className="h-32 w-32 text-muted-foreground opacity-40" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transações</CardTitle>
                <CardDescription>
                  Histórico de todas as transações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Dados de transações serão carregados do Supabase
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
                <CardDescription>
                  Gerenciamento de categorias de receitas e despesas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Dados de categorias serão carregados do Supabase
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>
                  Relatórios financeiros personalizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Relatórios serão gerados a partir dos dados do Supabase
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Próximos Pagamentos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-md bg-background/50">
                  <div>
                    <p className="font-medium text-sm">Aluguel do Escritório</p>
                    <p className="text-xs text-muted-foreground">Vence em 12/05/2025</p>
                  </div>
                  <p className="font-medium text-red-500">R$ 2.500,00</p>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-md bg-background/50">
                  <div>
                    <p className="font-medium text-sm">Internet</p>
                    <p className="text-xs text-muted-foreground">Vence em 15/05/2025</p>
                  </div>
                  <p className="font-medium text-red-500">R$ 199,90</p>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-md bg-background/50">
                  <div>
                    <p className="font-medium text-sm">Salários</p>
                    <p className="text-xs text-muted-foreground">Vence em 05/06/2025</p>
                  </div>
                  <p className="font-medium text-red-500">R$ 8.750,00</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Contas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <p className="font-medium text-sm">Conta Principal</p>
                  <p className="text-xs text-muted-foreground mb-2">Banco do Brasil</p>
                  <p className="text-lg font-bold">R$ 24.650,00</p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <p className="font-medium text-sm">Reserva</p>
                  <p className="text-xs text-muted-foreground mb-2">Nubank</p>
                  <p className="text-lg font-bold">R$ 7.800,00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default FinancialDashboard;
