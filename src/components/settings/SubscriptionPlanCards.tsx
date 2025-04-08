
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

const SubscriptionPlanCards = () => {
  const { currentPlan, changePlan } = useSubscription();
  
  // Get theme colors from localStorage
  const primaryColor = localStorage.getItem('primaryColor') || '#8B5CF6';
  const secondaryColor = localStorage.getItem('secondaryColor') || '#D946EF';

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 'R$0',
      description: 'Para pequenos empreendedores começando',
      features: [
        'Rastreamento financeiro básico',
        'Definição de metas',
        'Dashboard simples',
        'Suporte por email'
      ],
      highlighted: false,
      buttonText: currentPlan === 'free' ? 'Plano Atual' : 'Começar Grátis'
    },
    {
      id: 'starter',
      name: 'Iniciante',
      price: 'R$49',
      description: 'Para negócios em crescimento',
      features: [
        'Todas as funcionalidades do plano Gratuito',
        'Dashboard personalizado',
        'Relatórios avançados',
        'Exportação de dados'
      ],
      highlighted: false,
      buttonText: currentPlan === 'starter' ? 'Plano Atual' : 'Assinar'
    },
    {
      id: 'business',
      name: 'Empresarial',
      price: 'R$99',
      description: 'Para negócios estabelecidos',
      features: [
        'Todas as funcionalidades do plano Iniciante',
        'Múltiplos usuários',
        'Integrações com terceiros',
        'Suporte prioritário'
      ],
      highlighted: true,
      buttonText: currentPlan === 'business' ? 'Plano Atual' : 'Assinar'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$199',
      description: 'Para empresas em busca de crescimento',
      features: [
        'Todas as funcionalidades do plano Empresarial',
        'API personalizada',
        'Consultoria dedicada',
        'Suporte 24/7'
      ],
      highlighted: false,
      buttonText: currentPlan === 'premium' ? 'Plano Atual' : 'Assinar'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`flex flex-col ${plan.highlighted ? 'border-primary shadow-lg' : ''}`}
        >
          <CardHeader 
            className={`pb-2 ${plan.highlighted ? 'bg-primary/5' : ''}`}
            style={{
              backgroundColor: plan.highlighted ? `${primaryColor}10` : '',
              borderBottom: plan.highlighted ? `2px solid ${primaryColor}` : ''
            }}
          >
            <CardTitle className="flex justify-between items-center">
              {plan.name}
              {plan.highlighted && (
                <span 
                  className="text-xs px-2 py-1 rounded-full" 
                  style={{ backgroundColor: primaryColor, color: 'white' }}
                >
                  Mais Popular
                </span>
              )}
            </CardTitle>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{plan.price}</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="py-4 flex-1">
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check 
                    className="mt-0.5" 
                    size={16} 
                    style={{ color: primaryColor }}
                  />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              className="w-full" 
              variant={plan.id === currentPlan ? "outline" : "default"}
              disabled={plan.id === currentPlan}
              onClick={() => changePlan(plan.id as 'free' | 'starter' | 'business' | 'premium')}
              style={{
                backgroundColor: plan.id === currentPlan ? '' : plan.highlighted ? primaryColor : '',
              }}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlanCards;
