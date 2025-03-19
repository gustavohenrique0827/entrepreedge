
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from '@/contexts/SubscriptionContext';

const SubscriptionPlans = () => {
  const { toast } = useToast();
  const { currentPlan, setCurrentPlan } = useSubscription();

  const handleSelectPlan = (planId: string) => {
    setCurrentPlan(planId as any);
    toast({
      title: "Plano alterado com sucesso!",
      description: "As novas funcionalidades estarão disponíveis em instantes.",
    });
  };

  return (
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
                  <span>Módulo de metas de negócio</span>
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
                  <span>CRM integrado</span>
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
  );
};

export default SubscriptionPlans;
