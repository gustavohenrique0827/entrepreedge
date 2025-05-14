
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const DEFAULT_NOTIFICATION_SETTINGS = {
  emailFinancial: true,
  emailMarketing: false,
  emailSystem: true,
  pushNewFeatures: true,
  pushReminders: true,
  pushTransactions: false,
  pushGoals: true,
  smsImportantAlerts: false,
  smsTransaction: false,
  whatsappSummary: true,
  whatsappTransactions: false
};

const NotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS);
  const [loading, setLoading] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Register global update function for external components
    window.updateNotificationSettings = (newSettings) => {
      setSettings(prevSettings => ({
        ...prevSettings,
        ...newSettings
      }));
    };
    
    return () => {
      // Clean up
      delete window.updateNotificationSettings;
    };
  }, []);

  // Toggle handler for all switches
  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Save all settings
  const saveSettings = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
      
      setLoading(false);
      toast({
        title: "Configurações salvas",
        description: "Suas preferências de notificação foram atualizadas com sucesso."
      });
    }, 800);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Notificação</CardTitle>
        <CardDescription>
          Gerencie como o Fênix se comunica com você
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Notificações por E-mail</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-financial" className="flex-1">
                <span>Atualizações financeiras</span>
                <p className="text-sm text-muted-foreground">
                  Receba relatórios e alertas sobre movimentações financeiras
                </p>
              </Label>
              <Switch 
                id="email-financial" 
                checked={settings.emailFinancial}
                onCheckedChange={() => handleToggle('emailFinancial')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="email-marketing" className="flex-1">
                <span>Newsletter e promoções</span>
                <p className="text-sm text-muted-foreground">
                  Fique por dentro de novidades, promoções e conteúdo exclusivo
                </p>
              </Label>
              <Switch 
                id="email-marketing" 
                checked={settings.emailMarketing}
                onCheckedChange={() => handleToggle('emailMarketing')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="email-system" className="flex-1">
                <span>Alertas do sistema</span>
                <p className="text-sm text-muted-foreground">
                  Atualizações importantes sobre o sistema e sua conta
                </p>
              </Label>
              <Switch 
                id="email-system" 
                checked={settings.emailSystem}
                onCheckedChange={() => handleToggle('emailSystem')}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Notificações Push</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-features" className="flex-1">
                <span>Novos recursos</span>
                <p className="text-sm text-muted-foreground">
                  Seja notificado quando novos recursos forem lançados
                </p>
              </Label>
              <Switch 
                id="push-features" 
                checked={settings.pushNewFeatures}
                onCheckedChange={() => handleToggle('pushNewFeatures')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="push-reminders" className="flex-1">
                <span>Lembretes</span>
                <p className="text-sm text-muted-foreground">
                  Receba lembretes sobre tarefas e compromissos
                </p>
              </Label>
              <Switch 
                id="push-reminders" 
                checked={settings.pushReminders}
                onCheckedChange={() => handleToggle('pushReminders')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="push-transactions" className="flex-1">
                <span>Transações financeiras</span>
                <p className="text-sm text-muted-foreground">
                  Alerta instantâneo sobre movimentações na sua conta
                </p>
              </Label>
              <Switch 
                id="push-transactions" 
                checked={settings.pushTransactions}
                onCheckedChange={() => handleToggle('pushTransactions')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="push-goals" className="flex-1">
                <span>Metas e objetivos</span>
                <p className="text-sm text-muted-foreground">
                  Acompanhamento de progresso e alertas sobre suas metas
                </p>
              </Label>
              <Switch 
                id="push-goals" 
                checked={settings.pushGoals}
                onCheckedChange={() => handleToggle('pushGoals')}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Mensagens SMS</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-alerts" className="flex-1">
                <span>Alertas importantes</span>
                <p className="text-sm text-muted-foreground">
                  Receba alertas críticos via SMS
                </p>
              </Label>
              <Switch 
                id="sms-alerts" 
                checked={settings.smsImportantAlerts}
                onCheckedChange={() => handleToggle('smsImportantAlerts')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-transaction" className="flex-1">
                <span>Confirmação de transações</span>
                <p className="text-sm text-muted-foreground">
                  Receba confirmações de transações importantes via SMS
                </p>
              </Label>
              <Switch 
                id="sms-transaction" 
                checked={settings.smsTransaction}
                onCheckedChange={() => handleToggle('smsTransaction')}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">WhatsApp</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="whatsapp-summary" className="flex-1">
                <span>Resumo semanal</span>
                <p className="text-sm text-muted-foreground">
                  Receba um resumo semanal das suas atividades
                </p>
              </Label>
              <Switch 
                id="whatsapp-summary" 
                checked={settings.whatsappSummary}
                onCheckedChange={() => handleToggle('whatsappSummary')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="whatsapp-transactions" className="flex-1">
                <span>Alertas de transações</span>
                <p className="text-sm text-muted-foreground">
                  Notificações instantâneas de transações via WhatsApp
                </p>
              </Label>
              <Switch 
                id="whatsapp-transactions" 
                checked={settings.whatsappTransactions}
                onCheckedChange={() => handleToggle('whatsappTransactions')}
              />
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4" 
          onClick={saveSettings} 
          disabled={loading}
          type="button"
        >
          {loading ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
