import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Home, BarChart2, Target, BookOpen, Settings as SettingsIcon, User, Shield, Sliders } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from '@/components/settings/ProfileSettings';
import PreferencesSettings from '@/components/settings/PreferencesSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useSegment } from '@/contexts/SegmentContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';

const Profile = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { currentPlan } = useSubscription();
  const { segmentName } = useSegment();
  const { applyThemeColors } = useTheme();
  const [activeTab, setActiveTab] = useState(localStorage.getItem('profileTab') || "profile");
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('userRole') === 'admin');

  // Salvar tab ativa no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('profileTab', activeTab);
  }, [activeTab]);

  // Aplicar tema apenas na montagem do componente
  useEffect(() => {
    // Apply theme colors once - no repetição por atualização
    try {
      applyThemeColors();
    } catch (error) {
      console.error("Erro ao aplicar tema:", error);
    }

    // Atualize titulo da página
    document.title = `${companyName} - Perfil`;
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
    // Mostrar opção de admin apenas para usuários administradores
    ...(isAdmin ? [{
      name: 'Admin',
      href: '/dev-admin',
      icon: <SettingsIcon size={18} />
    }] : [])
  ];

  const tabIcons = {
    profile: <User size={16} />,
    preferences: <Sliders size={16} />,
    security: <Shield size={16} />
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Perfil do Usuário</h1>
            <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
              Gerencie seu perfil e preferências para {companyName} - Segmento: {segmentName}
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
                <TabsList className={`w-full ${isMobile ? 'grid grid-cols-3' : 'grid grid-cols-3'} rounded-none h-auto p-0`}>
                  {Object.entries(tabIcons).map(([key, icon]) => (
                    <TabsTrigger 
                      key={key} 
                      value={key}
                      className="rounded-none data-[state=active]:bg-background border-b-2 border-transparent data-[state=active]:border-primary py-3"
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <span>
                          {key === 'profile' ? 'Perfil' :
                           key === 'preferences' ? 'Preferências' : 'Segurança'}
                        </span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="profile" className="mt-0 p-4">
                  <ProfileSettings />
                </TabsContent>
                
                <TabsContent value="preferences" className="mt-0 p-4">
                  <PreferencesSettings />
                </TabsContent>
                
                <TabsContent value="security" className="mt-0 p-4">
                  <SecuritySettings />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
