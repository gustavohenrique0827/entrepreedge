import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Home, BarChart2, Target, BookOpen, Settings as SettingsIcon, Bell, Shield, Palette, Sliders } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionPlans from '@/components/settings/SubscriptionPlans';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import PreferencesSettings from '@/components/settings/PreferencesSettings';
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useSegment } from '@/contexts/SegmentContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from "@/components/ui/card";

const Settings = () => {
  const { toast } = useToast();
  const { currentPlan } = useSubscription();
  const { segmentName } = useSegment();
  const { applyThemeColors } = useTheme();
  const [activeTab, setActiveTab] = useState(localStorage.getItem('settingsTab') || "subscription");
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';

  // Salvar tab ativa no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('settingsTab', activeTab);
  }, [activeTab]);

  // Garantir sempre que ao montar ou atualizar página o tema será reaplicado conforme localStorage
  useEffect(() => {
    // Sempre aplique as cores no mount
    applyThemeColors();

    // Atualize titulo da página
    document.title = `${companyName} - Configurações`;
  }, [companyName, applyThemeColors]);

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
      name: 'Benchmarking',
      href: '/benchmarking',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />
    },
  ];

  const tabIcons = {
    subscription: <SettingsIcon size={16} />,
    appearance: <Palette size={16} />,
    notifications: <Bell size={16} />,
    security: <Shield size={16} />,
    preferences: <Sliders size={16} />
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Configurações do Sistema</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Gerencie as configurações para {companyName} - Segmento: {segmentName}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Plano {currentPlan === 'free' ? 'Gratuito' : 
                        currentPlan === 'starter' ? 'Iniciante' :
                        currentPlan === 'business' ? 'Empresarial' : 'Premium'}
              </span>
            </p>
          </div>
          
          <Card className="mb-6 overflow-hidden border-none shadow-sm">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 rounded-none h-auto p-0">
                  {Object.entries(tabIcons).map(([key, icon]) => (
                    <TabsTrigger 
                      key={key} 
                      value={key}
                      className="rounded-none data-[state=active]:bg-background border-b-2 border-transparent data-[state=active]:border-primary py-3"
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <span>
                          {key === 'subscription' ? 'Assinatura' :
                           key === 'appearance' ? 'Aparência' :
                           key === 'notifications' ? 'Notificações' :
                           key === 'security' ? 'Segurança' : 'Preferências'}
                        </span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="subscription" className="mt-0">
                  <SubscriptionPlans />
                </TabsContent>
                
                <TabsContent value="appearance" className="mt-0 p-4">
                  <AppearanceSettings />
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <NotificationSettings />
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <SecuritySettings />
                </TabsContent>
                
                <TabsContent value="preferences" className="mt-0">
                  <PreferencesSettings />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
