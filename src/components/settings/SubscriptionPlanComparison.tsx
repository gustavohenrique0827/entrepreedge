
import React from 'react';
import { Check, X } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from "@/components/ui/button";

type PlanFeature = {
  name: string;
  free: boolean;
  starter: boolean;
  business: boolean;
  premium: boolean;
};

const SubscriptionPlanComparison = () => {
  const { currentPlan, changePlan } = useSubscription();
  
  // Get theme colors from localStorage
  const primaryColor = localStorage.getItem('primaryColor') || '#8B5CF6';
  
  const features: PlanFeature[] = [
    { 
      name: "Rastreamento financeiro básico", 
      free: true, 
      starter: true, 
      business: true, 
      premium: true 
    },
    { 
      name: "Definição de metas", 
      free: true, 
      starter: true, 
      business: true, 
      premium: true 
    },
    { 
      name: "Dashboard personalizado", 
      free: false, 
      starter: true, 
      business: true, 
      premium: true 
    },
    { 
      name: "Relatórios avançados", 
      free: false, 
      starter: true, 
      business: true, 
      premium: true 
    },
    { 
      name: "Múltiplos usuários", 
      free: false, 
      starter: false, 
      business: true, 
      premium: true 
    },
    { 
      name: "Integrações com terceiros", 
      free: false, 
      starter: false, 
      business: true, 
      premium: true 
    },
    { 
      name: "API personalizada", 
      free: false, 
      starter: false, 
      business: false, 
      premium: true 
    },
    { 
      name: "Suporte prioritário", 
      free: false, 
      starter: false, 
      business: false, 
      premium: true 
    },
  ];

  return (
    <div className="overflow-x-auto py-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 border-b">Recurso</th>
            <th className="text-center p-3 border-b">Gratuito</th>
            <th className="text-center p-3 border-b">Iniciante</th>
            <th className="text-center p-3 border-b">Empresarial</th>
            <th className="text-center p-3 border-b">Premium</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
              <td className="p-3 border-b">{feature.name}</td>
              <td className="text-center p-3 border-b">
                {feature.free ? <Check className="inline text-green-500" size={18} /> : <X className="inline text-gray-400" size={18} />}
              </td>
              <td className="text-center p-3 border-b">
                {feature.starter ? <Check className="inline text-green-500" size={18} /> : <X className="inline text-gray-400" size={18} />}
              </td>
              <td className="text-center p-3 border-b">
                {feature.business ? <Check className="inline text-green-500" size={18} /> : <X className="inline text-gray-400" size={18} />}
              </td>
              <td className="text-center p-3 border-b">
                {feature.premium ? <Check className="inline text-green-500" size={18} /> : <X className="inline text-gray-400" size={18} />}
              </td>
            </tr>
          ))}
          <tr>
            <td className="p-3 border-b font-medium">Preço</td>
            <td className="text-center p-3 border-b">Grátis</td>
            <td className="text-center p-3 border-b">R$49/mês</td>
            <td className="text-center p-3 border-b">R$99/mês</td>
            <td className="text-center p-3 border-b">R$199/mês</td>
          </tr>
          <tr>
            <td className="p-3"></td>
            <td className="text-center p-3">
              <Button 
                variant={currentPlan === 'free' ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                disabled={currentPlan === 'free'}
                onClick={() => changePlan('free')}
              >
                {currentPlan === 'free' ? 'Atual' : 'Selecionar'}
              </Button>
            </td>
            <td className="text-center p-3">
              <Button 
                variant={currentPlan === 'starter' ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                disabled={currentPlan === 'starter'}
                onClick={() => changePlan('starter')}
              >
                {currentPlan === 'starter' ? 'Atual' : 'Selecionar'}
              </Button>
            </td>
            <td className="text-center p-3">
              <Button 
                variant={currentPlan === 'business' ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                disabled={currentPlan === 'business'}
                onClick={() => changePlan('business')}
                style={{ backgroundColor: currentPlan === 'business' ? primaryColor : '' }}
              >
                {currentPlan === 'business' ? 'Atual' : 'Selecionar'}
              </Button>
            </td>
            <td className="text-center p-3">
              <Button 
                variant={currentPlan === 'premium' ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                disabled={currentPlan === 'premium'}
                onClick={() => changePlan('premium')}
              >
                {currentPlan === 'premium' ? 'Atual' : 'Selecionar'}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionPlanComparison;
