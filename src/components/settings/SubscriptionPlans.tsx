
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Award, Users, BarChart, FileText, Clock, HardDrive, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SubscriptionPlans = () => {
  const { toast } = useToast();
  const { currentPlan, setCurrentPlan, planFeatures, getPlanModuleCount } = useSubscription();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [customTheme, setCustomTheme] = useState({
    primaryColor: localStorage.getItem('primaryColor') || '#8B5CF6',
    secondaryColor: localStorage.getItem('secondaryColor') || '#D946EF',
  });

  // Listen for theme changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCustomTheme({
        primaryColor: localStorage.getItem('primaryColor') || '#8B5CF6',
        secondaryColor: localStorage.getItem('secondaryColor') || '#D946EF',
      });
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const handleSelectPlan = (planId: string) => {
    setCurrentPlan(planId as any);
    toast({
      title: "Plano alterado com sucesso!",
      description: "As novas funcionalidades estarão disponíveis em instantes.",
    });
  };

  const formatStorage = (gb: number) => {
    return gb >= 1000 ? `${gb / 1000} TB` : `${gb} GB`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Planos de Assinatura</CardTitle>
            <CardDescription>Escolha o plano que melhor atende às necessidades da sua empresa</CardDescription>
          </div>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'cards' | 'table')} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cards">Cartões</TabsTrigger>
              <TabsTrigger value="table">Tabela</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <TabsContent value="cards" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Plano Gratuito */}
            <Card 
              className={`border-2 ${currentPlan === 'free' ? 'border-primary' : 'border-border'} h-full flex flex-col`}
              style={{borderColor: currentPlan === 'free' ? customTheme.primaryColor : ''}}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  Plano Gratuito
                </CardTitle>
                <CardDescription>Conheça o sistema</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">R$0</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="pb-3 flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Módulos</span>
                  <Badge variant="outline">{getPlanModuleCount('free')}</Badge>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Módulo financeiro básico</span>
                  </li>
                </ul>
                
                <Separator className="my-3" />
                
                <div className="grid grid-cols-1 gap-2 text-sm mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users size={14} className="mr-2 text-muted-foreground" />
                      <span>Usuários</span>
                    </div>
                    <span>{planFeatures.free.maxUsers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <HardDrive size={14} className="mr-2 text-muted-foreground" />
                      <span>Armazenamento</span>
                    </div>
                    <span>{formatStorage(planFeatures.free.storageGB)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-muted-foreground" />
                      <span>Backup</span>
                    </div>
                    <span>Não incluso</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSelectPlan('free')} 
                  className="w-full"
                  variant={currentPlan === 'free' ? 'default' : 'outline'}
                  style={currentPlan === 'free' ? {backgroundColor: customTheme.primaryColor} : {}}
                >
                  {currentPlan === 'free' ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>

            {/* Plano Iniciante */}
            <Card 
              className={`border-2 ${currentPlan === 'starter' ? 'border-primary' : 'border-border'} h-full flex flex-col`}
              style={{borderColor: currentPlan === 'starter' ? customTheme.primaryColor : ''}}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  Plano Iniciante
                  <Badge className="ml-2" style={{backgroundColor: "#2563EB"}}>Popular</Badge>
                </CardTitle>
                <CardDescription>Ideal para pequenas empresas</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">R$199</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="pb-3 flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Módulos</span>
                  <Badge variant="outline">{getPlanModuleCount('starter')}</Badge>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Financeiro e fluxo de caixa</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Vendas e faturamento</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Módulo de metas</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Análises básicas</span>
                  </li>
                </ul>
                
                <Separator className="my-3" />
                
                <div className="grid grid-cols-1 gap-2 text-sm mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users size={14} className="mr-2 text-muted-foreground" />
                      <span>Usuários</span>
                    </div>
                    <span>{planFeatures.starter.maxUsers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield size={14} className="mr-2 text-muted-foreground" />
                      <span>Suporte</span>
                    </div>
                    <span>Email</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <HardDrive size={14} className="mr-2 text-muted-foreground" />
                      <span>Armazenamento</span>
                    </div>
                    <span>{formatStorage(planFeatures.starter.storageGB)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-muted-foreground" />
                      <span>Backup</span>
                    </div>
                    <span>Semanal</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSelectPlan('starter')} 
                  className="w-full"
                  variant={currentPlan === 'starter' ? 'default' : 'outline'}
                  style={currentPlan === 'starter' ? {backgroundColor: customTheme.primaryColor} : {}}
                >
                  {currentPlan === 'starter' ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>

            {/* Plano Empresarial */}
            <Card 
              className={`border-2 ${currentPlan === 'business' ? 'border-primary' : 'border-border'} h-full flex flex-col`}
              style={{borderColor: currentPlan === 'business' ? customTheme.primaryColor : ''}}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  Plano Empresarial
                  <Badge className="ml-2" style={{backgroundColor: "#F59E0B"}}>Recomendado</Badge>
                </CardTitle>
                <CardDescription>Médias empresas em crescimento</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">R$699</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="pb-3 flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Módulos</span>
                  <Badge variant="outline">{getPlanModuleCount('business')}</Badge>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Módulos completos (vendas, compras, estoque)</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>CRM integrado e projetos</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Marketing e campanhas</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Dashboard personalizado</span>
                  </li>
                </ul>
                
                <Separator className="my-3" />
                
                <div className="grid grid-cols-1 gap-2 text-sm mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users size={14} className="mr-2 text-muted-foreground" />
                      <span>Usuários</span>
                    </div>
                    <span>{planFeatures.business.maxUsers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield size={14} className="mr-2 text-muted-foreground" />
                      <span>Suporte</span>
                    </div>
                    <span>Prioritário</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText size={14} className="mr-2 text-muted-foreground" />
                      <span>Relatórios</span>
                    </div>
                    <span>Personalizados</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <HardDrive size={14} className="mr-2 text-muted-foreground" />
                      <span>Armazenamento</span>
                    </div>
                    <span>{formatStorage(planFeatures.business.storageGB)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-muted-foreground" />
                      <span>Backup</span>
                    </div>
                    <span>Diário</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSelectPlan('business')} 
                  className="w-full"
                  variant={currentPlan === 'business' ? 'default' : 'outline'}
                  style={currentPlan === 'business' ? {backgroundColor: customTheme.primaryColor} : {}}
                >
                  {currentPlan === 'business' ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>

            {/* Plano Premium */}
            <Card 
              className={`border-2 ${currentPlan === 'premium' ? 'border-primary' : 'border-border'} h-full flex flex-col`}
              style={{borderColor: currentPlan === 'premium' ? customTheme.primaryColor : ''}}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  Plano Premium
                  <Badge className="ml-2" style={{backgroundColor: "#9333EA"}}>Empresarial</Badge>
                </CardTitle>
                <CardDescription>Para grandes empresas</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">R$2.499</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="pb-3 flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Módulos</span>
                  <Badge variant="outline">{getPlanModuleCount('premium')}</Badge>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Todos os módulos + RH</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>White label e personalização completa</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>API completa para integrações</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2" style={{color: customTheme.primaryColor}} />
                    <span>Consultor de negócios dedicado</span>
                  </li>
                </ul>
                
                <Separator className="my-3" />
                
                <div className="grid grid-cols-1 gap-2 text-sm mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users size={14} className="mr-2 text-muted-foreground" />
                      <span>Usuários</span>
                    </div>
                    <span>Ilimitados</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield size={14} className="mr-2 text-muted-foreground" />
                      <span>Suporte</span>
                    </div>
                    <span>24/7 Dedicado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <HardDrive size={14} className="mr-2 text-muted-foreground" />
                      <span>Armazenamento</span>
                    </div>
                    <span>{formatStorage(planFeatures.premium.storageGB)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-muted-foreground" />
                      <span>Backup</span>
                    </div>
                    <span>Horário</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSelectPlan('premium')} 
                  className="w-full"
                  variant={currentPlan === 'premium' ? 'default' : 'outline'}
                  style={currentPlan === 'premium' ? {backgroundColor: customTheme.primaryColor} : {}}
                >
                  {currentPlan === 'premium' ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="table" className="mt-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Recurso</th>
                  <th className="text-center p-2">Gratuito</th>
                  <th className="text-center p-2">Iniciante</th>
                  <th className="text-center p-2">Empresarial</th>
                  <th className="text-center p-2">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Preço mensal</td>
                  <td className="text-center p-2">R$0</td>
                  <td className="text-center p-2">R$199</td>
                  <td className="text-center p-2">R$699</td>
                  <td className="text-center p-2">R$2.499</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Módulos disponíveis</td>
                  <td className="text-center p-2">{getPlanModuleCount('free')}</td>
                  <td className="text-center p-2">{getPlanModuleCount('starter')}</td>
                  <td className="text-center p-2">{getPlanModuleCount('business')}</td>
                  <td className="text-center p-2">{getPlanModuleCount('premium')}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Usuários</td>
                  <td className="text-center p-2">{planFeatures.free.maxUsers}</td>
                  <td className="text-center p-2">{planFeatures.starter.maxUsers}</td>
                  <td className="text-center p-2">{planFeatures.business.maxUsers}</td>
                  <td className="text-center p-2">Ilimitados</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Armazenamento</td>
                  <td className="text-center p-2">{formatStorage(planFeatures.free.storageGB)}</td>
                  <td className="text-center p-2">{formatStorage(planFeatures.starter.storageGB)}</td>
                  <td className="text-center p-2">{formatStorage(planFeatures.business.storageGB)}</td>
                  <td className="text-center p-2">{formatStorage(planFeatures.premium.storageGB)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Módulo financeiro</td>
                  <td className="text-center p-2">Básico</td>
                  <td className="text-center p-2">Completo</td>
                  <td className="text-center p-2">Completo</td>
                  <td className="text-center p-2">Avançado</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Módulo vendas</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✓</td>
                  <td className="text-center p-2">✓</td>
                  <td className="text-center p-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Módulo estoque</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✓</td>
                  <td className="text-center p-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">CRM</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✓</td>
                  <td className="text-center p-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">RH</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Metas</td>
                  <td className="text-center p-2">✗</td>
                  <td className="text-center p-2">✓</td>
                  <td className="text-center p-2">✓</td>
                  <td className="text-center p-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Relatórios personalizados</td>
                  <td className="text-center p-2">{planFeatures.free.customReports ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.starter.customReports ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.business.customReports ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.premium.customReports ? '✓' : '✗'}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Integrações avançadas</td>
                  <td className="text-center p-2">{planFeatures.free.advancedIntegrations ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.starter.advancedIntegrations ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.business.advancedIntegrations ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.premium.advancedIntegrations ? '✓' : '✗'}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">API de acesso</td>
                  <td className="text-center p-2">{planFeatures.free.apiAccess ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.starter.apiAccess ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.business.apiAccess ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.premium.apiAccess ? '✓' : '✗'}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">White label</td>
                  <td className="text-center p-2">{planFeatures.free.whiteLabel ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.starter.whiteLabel ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.business.whiteLabel ? '✓' : '✗'}</td>
                  <td className="text-center p-2">{planFeatures.premium.whiteLabel ? '✓' : '✗'}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Frequência de backup</td>
                  <td className="text-center p-2">Não incluso</td>
                  <td className="text-center p-2">Semanal</td>
                  <td className="text-center p-2">Diário</td>
                  <td className="text-center p-2">Horário</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Suporte</td>
                  <td className="text-center p-2">Não incluso</td>
                  <td className="text-center p-2">Email</td>
                  <td className="text-center p-2">Prioritário</td>
                  <td className="text-center p-2">24/7 Dedicado</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Ações</td>
                  <td className="text-center p-2">
                    <Button 
                      onClick={() => handleSelectPlan('free')} 
                      size="sm"
                      variant={currentPlan === 'free' ? 'default' : 'outline'}
                      style={currentPlan === 'free' ? {backgroundColor: customTheme.primaryColor} : {}}
                    >
                      {currentPlan === 'free' ? 'Atual' : 'Selecionar'}
                    </Button>
                  </td>
                  <td className="text-center p-2">
                    <Button 
                      onClick={() => handleSelectPlan('starter')} 
                      size="sm"
                      variant={currentPlan === 'starter' ? 'default' : 'outline'}
                      style={currentPlan === 'starter' ? {backgroundColor: customTheme.primaryColor} : {}}
                    >
                      {currentPlan === 'starter' ? 'Atual' : 'Selecionar'}
                    </Button>
                  </td>
                  <td className="text-center p-2">
                    <Button 
                      onClick={() => handleSelectPlan('business')} 
                      size="sm"
                      variant={currentPlan === 'business' ? 'default' : 'outline'}
                      style={currentPlan === 'business' ? {backgroundColor: customTheme.primaryColor} : {}}
                    >
                      {currentPlan === 'business' ? 'Atual' : 'Selecionar'}
                    </Button>
                  </td>
                  <td className="text-center p-2">
                    <Button 
                      onClick={() => handleSelectPlan('premium')} 
                      size="sm"
                      variant={currentPlan === 'premium' ? 'default' : 'outline'}
                      style={currentPlan === 'premium' ? {backgroundColor: customTheme.primaryColor} : {}}
                    >
                      {currentPlan === 'premium' ? 'Atual' : 'Selecionar'}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlans;
