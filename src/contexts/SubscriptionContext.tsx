
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
    goals: boolean;
    analytics: boolean;
    marketing: boolean;
    // Novos módulos específicos
    advancedGoals: boolean; // Metas avançadas (plano business)
    aiPredictions: boolean; // Previsões com IA (plano premium)
    okrIntegration: boolean; // Integração com OKRs (plano premium)
    consultancy: boolean; // Consultoria especializada (plano premium)
  };
  maxUsers: number;
  customReports: boolean;
  advancedIntegrations: boolean;
  supportEmail: boolean;
  prioritySupport: boolean;
  dataExport: boolean;
  apiAccess: boolean;
  whiteLabel: boolean;
  customization: boolean;
  backupFrequency: 'none' | 'weekly' | 'daily' | 'hourly';
  storageGB: number;
}

interface SubscriptionContextType {
  currentPlan: PlanType;
  setCurrentPlan: (plan: PlanType) => void;
  hasAccess: (feature: string) => boolean;
  planFeatures: Record<PlanType, SubscriptionFeaturesType>;
  refreshContext: () => void;
  getPlanModuleCount: (plan: PlanType) => number;
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
      goals: false,
      analytics: false,
      marketing: false,
      advancedGoals: false,
      aiPredictions: false,
      okrIntegration: false,
      consultancy: false
    },
    maxUsers: 1,
    customReports: false,
    advancedIntegrations: false,
    supportEmail: false,
    prioritySupport: false,
    dataExport: false,
    apiAccess: false,
    whiteLabel: false,
    customization: false,
    backupFrequency: 'none',
    storageGB: 1
  },
  starter: {
    modules: {
      financial: true,
      sales: true,
      inventory: false,
      crm: false,
      hr: false,
      projects: false,
      goals: true,
      analytics: true,
      marketing: false,
      advancedGoals: false,
      aiPredictions: false,
      okrIntegration: false,
      consultancy: false
    },
    maxUsers: 3,
    customReports: false,
    advancedIntegrations: false,
    supportEmail: true,
    prioritySupport: false,
    dataExport: true,
    apiAccess: false,
    whiteLabel: false,
    customization: false,
    backupFrequency: 'weekly',
    storageGB: 5
  },
  business: {
    modules: {
      financial: true,
      sales: true,
      inventory: true,
      crm: true,
      hr: false,
      projects: true,
      goals: true,
      analytics: true,
      marketing: true,
      advancedGoals: true,
      aiPredictions: false,
      okrIntegration: false,
      consultancy: false
    },
    maxUsers: 15,
    customReports: true,
    advancedIntegrations: true,
    supportEmail: true,
    prioritySupport: true,
    dataExport: true,
    apiAccess: true,
    whiteLabel: false,
    customization: true,
    backupFrequency: 'daily',
    storageGB: 50
  },
  premium: {
    modules: {
      financial: true,
      sales: true,
      inventory: true,
      crm: true,
      hr: true,
      projects: true,
      goals: true,
      analytics: true,
      marketing: true,
      advancedGoals: true,
      aiPredictions: true,
      okrIntegration: true,
      consultancy: true
    },
    maxUsers: 999, // Unlimited
    customReports: true,
    advancedIntegrations: true,
    supportEmail: true,
    prioritySupport: true,
    dataExport: true,
    apiAccess: true,
    whiteLabel: true,
    customization: true,
    backupFrequency: 'hourly',
    storageGB: 500
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
      variant: "success"
    });
  };

  // Count number of available modules for a given plan
  const getPlanModuleCount = (plan: PlanType): number => {
    const modulesList = planFeatures[plan].modules;
    return Object.values(modulesList).filter(Boolean).length;
  };

  // Check if user has access to a feature based on their current plan
  const hasAccess = (feature: string): boolean => {
    const features = planFeatures[currentPlan].modules;
    
    switch (feature) {
      // Módulos básicos
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
      case 'analytics':
        return features.analytics;
      case 'marketing':
        return features.marketing;
      
      // Módulos avançados específicos por plano
      case 'advancedGoals':
        return features.advancedGoals;
      case 'aiPredictions':
        return features.aiPredictions;
      case 'okrIntegration':
        return features.okrIntegration;
      case 'consultancy':
        return features.consultancy;
      
      // Recursos gerais
      case 'customReports':
        return planFeatures[currentPlan].customReports;
      case 'advancedIntegrations':
        return planFeatures[currentPlan].advancedIntegrations;
      case 'supportEmail':
        return planFeatures[currentPlan].supportEmail;
      case 'prioritySupport':
        return planFeatures[currentPlan].prioritySupport;
      case 'dataExport':
        return planFeatures[currentPlan].dataExport;
      case 'apiAccess':
        return planFeatures[currentPlan].apiAccess;
      case 'whiteLabel':
        return planFeatures[currentPlan].whiteLabel;
      case 'customization':
        return planFeatures[currentPlan].customization;
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
        refreshContext,
        getPlanModuleCount
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
