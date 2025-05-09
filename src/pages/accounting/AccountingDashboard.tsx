
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Files, FileSpreadsheet, Calculator, Receipt, CreditCard, Home, BarChart2, Target, BookOpen, Settings as SettingsIcon, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountingRobot from '@/components/accounting/AccountingRobot';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useToast } from '@/hooks/use-toast';

const AccountingDashboard = () => {
  const { toast } = useToast();
  const { supabase, currentSegment, isConfigured } = useSupabase();
  const [activeTab, setActiveTab] = React.useState('overview');
  
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const isAdmin = localStorage.getItem('userRole') === 'admin';

  useEffect(() => {
    document.title = `${companyName} - Contabilidade`;
  }, [companyName]);
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Contabilidade',
      href: '/accounting',
      icon: <FileSpreadsheet size={18} />
    },
    {
      name: 'RH',
      href: '/personnel',
      icon: <Users size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />
    },
    ...(isAdmin ? [{
      name: 'Admin',
      href: '/dev-admin',
      icon: <SettingsIcon size={18} />
    }] : [])
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Contabilidade</h1>
            <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
              {currentSegment ? (
                <>Gerenciamento contábil - Segmento: <span className="font-medium capitalize">{currentSegment}</span></>
              ) : (
                <>Selecione um segmento de negócio nas configurações</>
              )}
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 h-auto mb-6">
              <TabsTrigger value="overview" className="py-2">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="documents" className="py-2">
                <Files className="mr-2 h-4 w-4" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="taxes" className="py-2">
                <Calculator className="mr-2 h-4 w-4" />
                Tributos
              </TabsTrigger>
              <TabsTrigger value="robot" className="py-2">
                <Receipt className="mr-2 h-4 w-4" />
                Robô Contábil
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Balancetes
                    </CardTitle>
                    <CardDescription>Resumo do período</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Receita</span>
                        <span className="font-medium text-green-600">R$ 87.450,00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Despesas</span>
                        <span className="font-medium text-red-600">R$ 52.830,00</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2 mt-2">
                        <span>Resultado</span>
                        <span className="font-medium text-primary">R$ 34.620,00</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Ver relatório completo
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      <Calculator className="h-4 w-4" />
                      Tributos
                    </CardTitle>
                    <CardDescription>Próximos vencimentos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>DAS</span>
                        <span className="font-medium">R$ 980,00 (20/05)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ICMS</span>
                        <span className="font-medium">R$ 1.450,00 (15/05)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>IRPJ</span>
                        <span className="font-medium">R$ 2.300,00 (25/05)</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Ver todos os tributos
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      <Receipt className="h-4 w-4" />
                      Documentos
                    </CardTitle>
                    <CardDescription>Notas fiscais recentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>NF-e #4523</span>
                        <span className="font-medium">R$ 5.430,00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>NF-e #4522</span>
                        <span className="font-medium">R$ 2.150,00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>NF-e #4521</span>
                        <span className="font-medium">R$ 8.700,00</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Ver todas as notas
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {!currentSegment && (
                <Card className="mb-6 border-dashed border-2">
                  <CardHeader>
                    <CardTitle>Selecione um segmento</CardTitle>
                    <CardDescription>
                      Para acessar os dados contábeis, selecione um segmento de negócio nas configurações.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button onClick={() => window.location.href = '/profile'}>
                      Ir para Configurações
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                <AccountingRobot />
              </div>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Contábeis</CardTitle>
                  <CardDescription>
                    Gerenciamento de notas fiscais, recibos e comprovantes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col justify-center items-center">
                      <FileText className="h-6 w-6 mb-2" />
                      <div className="text-center">
                        <p className="font-medium">Notas Fiscais</p>
                        <p className="text-xs text-muted-foreground">45 documentos</p>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="h-24 flex flex-col justify-center items-center">
                      <Receipt className="h-6 w-6 mb-2" />
                      <div className="text-center">
                        <p className="font-medium">Recibos</p>
                        <p className="text-xs text-muted-foreground">23 documentos</p>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="h-24 flex flex-col justify-center items-center">
                      <CreditCard className="h-6 w-6 mb-2" />
                      <div className="text-center">
                        <p className="font-medium">Comprovantes</p>
                        <p className="text-xs text-muted-foreground">12 documentos</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="taxes">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Tributos</CardTitle>
                  <CardDescription>
                    Acompanhamento e gestão de obrigações tributárias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    {currentSegment ? 
                      "Funcionalidade em desenvolvimento para este segmento." :
                      "Selecione um segmento nas configurações para acessar esta funcionalidade."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="robot">
              <AccountingRobot />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccountingDashboard;
