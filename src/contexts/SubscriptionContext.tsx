
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

type PlanType = 'free' | 'starter' | 'business' | 'premium';

interface SubscriptionFeaturesType {
  modules: {
    financial: boolean;
    sales: boolean;
    inventory: boolean;
    crm: boolean;
    hr: boolean;
    projects: boolean;
    goals: boolean; // Adding goals module
  };
  maxUsers: number;
  customReports: boolean;
  advancedIntegrations: boolean;
  supportEmail: boolean;
}

interface SubscriptionContextType {
  currentPlan: PlanType;
  setCurrentPlan: (plan: PlanType) => void;
  hasAccess: (feature: string) => boolean;
  planFeatures: Record<PlanType, SubscriptionFeaturesType>;
  refreshContext: () => void;
}

const planFeatures: Record<PlanType, SubscriptionFeaturesType> = {
  free: {
    modules: {
      financial: true,
      sales: false,
      inventory: false,
      crm: false,
      hr: false,
      projects: false,
      goals: false
    },
    maxUsers: 1,
    customReports: false,
    advancedIntegrations: false,
    supportEmail: false
  },
  starter: {
    modules: {
      financial: true,
      sales: true,
      inventory: false,
      crm: false,
      hr: false,
      projects: false,
      goals: true  // Enabling goals module for starter plan
    },
    maxUsers: 3,
    customReports: false,
    advancedIntegrations: false,
    supportEmail: true // Enabling email support for starter plan
  },
  business: {
    modules: {
      financial: true,
      sales: true,
      inventory: true,
      crm: true,
      hr: false,
      projects: false,
      goals: true
    },
    maxUsers: 15,
    customReports: true,
    advancedIntegrations: false,
    supportEmail: true
  },
  premium: {
    modules: {
      financial: true,
      sales: true,
      inventory: true,
      crm: true,
      hr: true,
      projects: true,
      goals: true
    },
    maxUsers: 999, // Unlimited
    customReports: true,
    advancedIntegrations: true,
    supportEmail: true
  }
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState<PlanType>('free');

  useEffect(() => {
    // Load plan from localStorage
    const savedPlan = localStorage.getItem('currentPlan') as PlanType;
    if (savedPlan && planFeatures[savedPlan]) {
      setCurrentPlan(savedPlan);
    }
  }, []);

  const updatePlan = (plan: PlanType) => {
    setCurrentPlan(plan);
    localStorage.setItem('currentPlan', plan);

    // Display notification when plan changes
    toast({
      title: "Plano atualizado",
      description: `Seu plano foi atualizado para: ${
        plan === 'starter' ? 'Plano Iniciante' : 
        plan === 'business' ? 'Plano Empresarial' :
        plan === 'premium' ? 'Plano Premium' : 'Plano Gratuito'
      }`,
    });
  };

  // Check if user has access to a feature based on their current plan
  const hasAccess = (feature: string): boolean => {
    const features = planFeatures[currentPlan].modules;
    
    switch (feature) {
      case 'financial':
        return features.financial;
      case 'sales':
        return features.sales;
      case 'inventory':
        return features.inventory;
      case 'crm':
        return features.crm;
      case 'hr':
        return features.hr;
      case 'projects':
        return features.projects;
      case 'goals':
        return features.goals;
      case 'customReports':
        return planFeatures[currentPlan].customReports;
      case 'advancedIntegrations':
        return planFeatures[currentPlan].advancedIntegrations;
      case 'supportEmail':
        return planFeatures[currentPlan].supportEmail;
      default:
        return false;
    }
  };

  const refreshContext = () => {
    const savedPlan = localStorage.getItem('currentPlan') as PlanType;
    if (savedPlan && planFeatures[savedPlan]) {
      setCurrentPlan(savedPlan);
    }
  };

  return (
    <SubscriptionContext.Provider 
      value={{ 
        currentPlan, 
        setCurrentPlan: updatePlan, 
        hasAccess, 
        planFeatures,
        refreshContext
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
