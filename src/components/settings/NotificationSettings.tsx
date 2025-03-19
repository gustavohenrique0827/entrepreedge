
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(localStorage.getItem('emailNotifications') !== 'false');
  const [appNotifications, setAppNotifications] = useState(localStorage.getItem('appNotifications') !== 'false');
  const [financialAlerts, setFinancialAlerts] = useState(localStorage.getItem('financialAlerts') !== 'false');
  const [goalReminders, setGoalReminders] = useState(localStorage.getItem('goalReminders') !== 'false');

  // Apply notification settings globally
  useEffect(() => {
    const notificationSettings = {
      email: emailNotifications,
      app: appNotifications,
      financial: financialAlerts,
      goals: goalReminders
    };
    
    // Store settings object as JSON for easy access
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    
    // Update global notification state if needed
    if (window.updateNotificationSettings) {
      window.updateNotificationSettings(notificationSettings);
    }
  }, [emailNotifications, appNotifications, financialAlerts, goalReminders]);

  const handleEmailChange = (checked: boolean) => {
    setEmailNotifications(checked);
    localStorage.setItem('emailNotifications', checked.toString());
  };

  const handleAppChange = (checked: boolean) => {
    setAppNotifications(checked);
    localStorage.setItem('appNotifications', checked.toString());
  };

  const handleFinancialChange = (checked: boolean) => {
    setFinancialAlerts(checked);
    localStorage.setItem('financialAlerts', checked.toString());
  };

  const handleGoalChange = (checked: boolean) => {
    setGoalReminders(checked);
    localStorage.setItem('goalReminders', checked.toString());
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notificações atualizadas",
      description: "Suas preferências de notificação foram salvas com sucesso.",
      variant: "default" // Changed from "success" to "default" as it's a valid variant
    });
    
    // Display a test notification if app notifications are enabled
    if (appNotifications) {
      setTimeout(() => {
        toast({
          title: "Notificação de teste",
          description: "Esta é uma notificação de teste para verificar suas configurações.",
        });
      }, 1500);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Receber notificações por email</Label>
          <Switch 
            id="email-notifications" 
            checked={emailNotifications} 
            onCheckedChange={handleEmailChange}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="app-notifications">Notificações no aplicativo</Label>
          <Switch 
            id="app-notifications" 
            checked={appNotifications} 
            onCheckedChange={handleAppChange}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="financial-alerts">Alertas financeiros</Label>
          <Switch 
            id="financial-alerts" 
            checked={financialAlerts} 
            onCheckedChange={handleFinancialChange}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="goal-reminders">Lembretes de metas</Label>
          <Switch 
            id="goal-reminders" 
            checked={goalReminders} 
            onCheckedChange={handleGoalChange}
          />
        </div>

        <Button className="mt-4 w-full" onClick={handleSaveNotifications}>
          Salvar Notificações
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
