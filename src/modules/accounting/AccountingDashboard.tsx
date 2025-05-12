
import React from 'react';
import { ModuleContainer } from '@/modules/ModuleContainer';
import AccountingRobot from '@/components/accounting/AccountingRobot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Receipt, Calculator, Clock, PieChart, CreditCard } from 'lucide-react';
import { BusinessSegmentType } from '@/contexts/SegmentContext';

interface ModuleDashboardProps {
  segmentId: BusinessSegmentType;
  features: string[];
}

const AccountingDashboard: React.FC<ModuleDashboardProps> = ({ 
  segmentId = 'financial' as BusinessSegmentType,
  features = [] 
}) => {
  return (
    <ModuleContainer requiredSegment={segmentId}>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Contabilidade</h1>
            <p className="text-sm text-muted-foreground">
              Sistema contábil inteligente para seu negócio
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="robot">Robô Contábil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Notas Fiscais</p>
                  <p className="text-xs text-muted-foreground">12 pendentes</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
                  <Receipt className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Guias Abertas</p>
                  <p className="text-xs text-muted-foreground">3 para pagamento</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
                  <Calculator className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Impostos</p>
                  <p className="text-xs text-muted-foreground">Próx. vencimento: 20/05</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Obrigações</p>
                  <p className="text-xs text-muted-foreground">Em dia</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
                  <CardDescription>Visão geral das suas finanças</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <PieChart className="h-32 w-32 text-muted-foreground opacity-40" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Transações Recentes</CardTitle>
                  <CardDescription>Últimas movimentações</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Pagamento de Fornecedor</p>
                          <p className="text-xs text-muted-foreground">08/05/2025</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-red-500">- R$ 1.250,00</p>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Venda de Produtos</p>
                          <p className="text-xs text-muted-foreground">07/05/2025</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-green-500">+ R$ 3.450,00</p>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Pagamento de Imposto</p>
                          <p className="text-xs text-muted-foreground">05/05/2025</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-red-500">- R$ 870,00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Contábeis</CardTitle>
                <CardDescription>
                  Gere e visualize relatórios contábeis para seu negócio
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Selecione um tipo de relatório para gerar:
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="robot">
            <AccountingRobot />
          </TabsContent>
        </Tabs>
      </div>
    </ModuleContainer>
  );
};

export default AccountingDashboard;
