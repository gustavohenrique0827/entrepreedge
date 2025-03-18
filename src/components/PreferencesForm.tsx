
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const PreferencesForm = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ptbr');
  const [notifications, setNotifications] = useState({
    email: localStorage.getItem('notifyEmail') !== 'false',
    system: localStorage.getItem('notifySystem') !== 'false',
    updates: localStorage.getItem('notifyUpdates') !== 'false',
  });
  
  const handleChangeTheme = (value: string) => {
    setTheme(value);
  };
  
  const handleChangeLanguage = (value: string) => {
    setLanguage(value);
  };
  
  const handleToggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  const handleSavePreferences = () => {
    // Salvar preferências no localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
    localStorage.setItem('notifyEmail', notifications.email.toString());
    localStorage.setItem('notifySystem', notifications.system.toString());
    localStorage.setItem('notifyUpdates', notifications.updates.toString());
    
    toast({
      title: "Preferências salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Tema da Interface</h3>
        <RadioGroup value={theme} onValueChange={handleChangeTheme} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="theme-light" />
            <Label htmlFor="theme-light">Claro</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="theme-dark" />
            <Label htmlFor="theme-dark">Escuro</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="theme-system" />
            <Label htmlFor="theme-system">Usar preferência do sistema</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Idioma do Sistema</h3>
        <RadioGroup value={language} onValueChange={handleChangeLanguage} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ptbr" id="lang-ptbr" />
            <Label htmlFor="lang-ptbr">Português (Brasil)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="en" id="lang-en" />
            <Label htmlFor="lang-en">English</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="es" id="lang-es" />
            <Label htmlFor="lang-es">Español</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Notificações</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications-email">Receber emails de notificação</Label>
            <Switch 
              id="notifications-email" 
              checked={notifications.email}
              onCheckedChange={() => handleToggleNotification('email')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications-system">Notificações no sistema</Label>
            <Switch 
              id="notifications-system" 
              checked={notifications.system}
              onCheckedChange={() => handleToggleNotification('system')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications-updates">Atualizações e novidades</Label>
            <Switch 
              id="notifications-updates" 
              checked={notifications.updates}
              onCheckedChange={() => handleToggleNotification('updates')}
            />
          </div>
        </div>
      </div>
      
      <Button onClick={handleSavePreferences} className="w-full">
        Salvar Preferências
      </Button>
    </div>
  );
};

export default PreferencesForm;
