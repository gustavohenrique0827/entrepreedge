
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Award, Users, BarChart, FileText, Clock, HardDrive, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const SubscriptionPlans = () => {
  const { toast } = useToast();
  const { currentPlan, setCurrentPlan, planFeatures, getPlanModuleCount } = useSubscription();
  
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
        <CardTitle>Planos de Assinatura</CardTitle>
        <CardDescription>Escolha o plano que melhor atende às necessidades da sua empresa</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Plano Gratuito */}
          <Card className={`border-2 ${currentPlan === 'free' ? 'border-primary' : 'border-border'} h-full flex flex-col`}>
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
                  <Check size={16} className="mr-2 text-primary" />
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
              >
                {currentPlan === 'free' ? 'Plano Atual' : 'Selecionar Plano'}
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Iniciante */}
          <Card className={`border-2 ${currentPlan === 'starter' ? 'border-primary' : 'border-border'} h-full flex flex-col`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                Plano Iniciante
                <Badge className="bg-blue-500 hover:bg-blue-600 ml-2">Popular</Badge>
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
                  <Check size={16} className="mr-2 text-primary" />
                  <span>Financeiro e fluxo de caixa</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
                  <span>Vendas e faturamento</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
                  <span>Módulo de metas</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
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
              >
                {currentPlan === 'starter' ? 'Plano Atual' : 'Selecionar Plano'}
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Empresarial */}
          <Card className={`border-2 ${currentPlan === 'business' ? 'border-primary' : 'border-border'} h-full flex flex-col`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                Plano Empresarial
                <Badge className="bg-amber-500 hover:bg-amber-600 ml-2">Recomendado</Badge>
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
                  <Check size={16} className="mr-2 text-primary" />
                  <span>Módulos completos (vendas, compras, estoque)</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
                  <span>CRM integrado e projetos</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
                  <span>Marketing e campanhas</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
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
              >
                {currentPlan === 'business' ? 'Plano Atual' : 'Selecionar Plano'}
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Premium */}
          <Card className={`border-2 ${currentPlan === 'premium' ? 'border-primary' : 'border-border'} h-full flex flex-col`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                Plano Premium
                <Badge className="bg-purple-500 hover:bg-purple-600 ml-2">Empresarial</Badge>
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
                  <Check size={16} className="mr-2 text-primary" />
                  <span>Todos os módulos + RH</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
                  <span>White label e personalização completa</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
                  <span>API completa para integrações</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
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
              >
                {currentPlan === 'premium' ? 'Plano Atual' : 'Selecionar Plano'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Comparativo de funcionalidades</h3>
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
                <tr>
                  <td className="p-2">Frequência de backup</td>
                  <td className="text-center p-2">Não incluso</td>
                  <td className="text-center p-2">Semanal</td>
                  <td className="text-center p-2">Diário</td>
                  <td className="text-center p-2">Horário</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlans;
