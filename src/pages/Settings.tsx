
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { 
  Home, 
  BarChart2, 
  Target, 
  BookOpen,
  Check,
  Paintbrush,
  Bell,
  Lock,
  Sliders
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PreferencesForm from '@/components/PreferencesForm';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('subscription');
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
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
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />
    },
  ];

  const currentPlan = localStorage.getItem('currentPlan') || 'free';

  const handleSelectPlan = (planId: string) => {
    localStorage.setItem('currentPlan', planId);
    toast({
      title: "Plano alterado com sucesso!",
      description: "As novas funcionalidades estarão disponíveis em instantes.",
    });
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Configurações do Sistema</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie as configurações para {companyName}
            </p>
          </div>
          
          <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="glass mb-6">
              <TabsTrigger value="subscription">Planos</TabsTrigger>
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
              <TabsTrigger value="preferences">Preferências</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subscription">
              <div className="grid grid-cols-1 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Planos de Assinatura</CardTitle>
                    <CardDescription>Escolha o plano que melhor atende às necessidades da sua empresa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Plano Iniciante */}
                      <Card className={`border-2 ${currentPlan === 'starter' ? 'border-primary' : 'border-border'}`}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl">Plano Iniciante</CardTitle>
                          <CardDescription>Ideal para pequenas empresas</CardDescription>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">R$199</span>
                            <span className="text-muted-foreground">/mês</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Módulos básicos (financeiro e fluxo de caixa)</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Até 3 usuários</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Suporte por email</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Funcionalidades essenciais</span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleSelectPlan('starter')} 
                            className="w-full"
                            variant={currentPlan === 'starter' ? 'default' : 'outline'}
                          >
                            {currentPlan === 'starter' ? 'Plano Atual' : 'Selecionar Plano'}
                          </Button>
                        </CardFooter>
                      </Card>

                      {/* Plano Empresarial */}
                      <Card className={`border-2 ${currentPlan === 'business' ? 'border-primary' : 'border-border'}`}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl">Plano Empresarial</CardTitle>
                          <CardDescription>Para pequenas e médias empresas</CardDescription>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">R$699</span>
                            <span className="text-muted-foreground">/mês</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Módulos completos (vendas, compras, estoque)</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Até 15 usuários</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Suporte prioritário</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Relatórios personalizados</span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleSelectPlan('business')} 
                            className="w-full"
                            variant={currentPlan === 'business' ? 'default' : 'outline'}
                          >
                            {currentPlan === 'business' ? 'Plano Atual' : 'Selecionar Plano'}
                          </Button>
                        </CardFooter>
                      </Card>

                      {/* Plano Premium */}
                      <Card className={`border-2 ${currentPlan === 'premium' ? 'border-primary' : 'border-border'}`}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl">Plano Premium</CardTitle>
                          <CardDescription>Para empresas de médio a grande porte</CardDescription>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">R$2.499</span>
                            <span className="text-muted-foreground">/mês</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Todos os módulos (+ CRM, RH, projetos)</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Usuários ilimitados</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Suporte 24/7 personalizado</span>
                            </li>
                            <li className="flex items-center">
                              <Check size={16} className="mr-2 text-primary" />
                              <span>Integrações avançadas e customização</span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleSelectPlan('premium')} 
                            className="w-full"
                            variant={currentPlan === 'premium' ? 'default' : 'outline'}
                          >
                            {currentPlan === 'premium' ? 'Plano Atual' : 'Selecionar Plano'}
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Configurações de Aparência</CardTitle>
                  <CardDescription>Personalize a interface e experiência visual do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Logo da Empresa</h3>
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary rounded-md p-4 w-16 h-16 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary-foreground">
                            {companyName.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Alterar logo
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Tema da Interface</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="border p-3 rounded-md flex flex-col items-center cursor-pointer hover:border-primary">
                          <div className="h-20 w-full bg-background rounded-md mb-2 border"></div>
                          <span className="text-sm">Claro</span>
                        </div>
                        <div className="border p-3 rounded-md flex flex-col items-center cursor-pointer hover:border-primary">
                          <div className="h-20 w-full bg-black rounded-md mb-2 border"></div>
                          <span className="text-sm">Escuro</span>
                        </div>
                        <div className="border p-3 rounded-md flex flex-col items-center cursor-pointer hover:border-primary">
                          <div className="h-20 w-full rounded-md mb-2 border bg-gradient-to-r from-background to-black"></div>
                          <span className="text-sm">Sistema</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Cor Principal</h3>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                        <div className="h-10 rounded-md bg-blue-500 cursor-pointer hover:ring-2 ring-offset-2"></div>
                        <div className="h-10 rounded-md bg-green-500 cursor-pointer hover:ring-2 ring-offset-2"></div>
                        <div className="h-10 rounded-md bg-purple-500 cursor-pointer hover:ring-2 ring-offset-2"></div>
                        <div className="h-10 rounded-md bg-red-500 cursor-pointer hover:ring-2 ring-offset-2"></div>
                        <div className="h-10 rounded-md bg-orange-500 cursor-pointer hover:ring-2 ring-offset-2"></div>
                        <div className="h-10 rounded-md bg-slate-700 cursor-pointer hover:ring-2 ring-offset-2"></div>
                      </div>
                    </div>
                    
                    <Button onClick={() => {
                      toast({
                        title: "Aparência atualizada",
                        description: "As configurações de aparência foram salvas com sucesso.",
                      });
                    }} className="w-full">
                      Salvar Configurações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Configure opções de segurança e controle de acesso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Autenticação</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="2fa">Autenticação de dois fatores</Label>
                          <Switch id="2fa" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="remember-session">Lembrar sessão por 30 dias</Label>
                          <Switch id="remember-session" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="single-session">Permitir apenas uma sessão ativa</Label>
                          <Switch id="single-session" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Política de Senhas</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="strong-passwords">Exigir senhas fortes</Label>
                          <Switch id="strong-passwords" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password-expiry">Expirar senhas a cada 90 dias</Label>
                          <Switch id="password-expiry" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password-history">Evitar reutilização de senhas</Label>
                          <Switch id="password-history" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Privacidade</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="privacy-logs">Registrar atividades de usuários</Label>
                          <Switch id="privacy-logs" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="data-analytics">Compartilhar dados para melhorias</Label>
                          <Switch id="data-analytics" />
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => {
                      toast({
                        title: "Configurações de segurança atualizadas",
                        description: "As configurações de segurança foram salvas com sucesso.",
                      });
                    }} className="w-full">
                      Salvar Configurações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Preferências do Sistema</CardTitle>
                  <CardDescription>Configure opções gerais do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <PreferencesForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
