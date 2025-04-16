
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertCircle, Check, Palette } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';

const AppearanceSettings = () => {
  const { toast } = useToast();
  const { getVisualPreferences, applySegmentVisuals } = useSegment();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') !== 'false');
  const [primaryColor, setPrimaryColor] = useState(getVisualPreferences().primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(getVisualPreferences().secondaryColor);

  // Apply dark mode when component mounts and when changed
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Apply font size when component mounts and when changed
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    
    // Apply font size classes
    if (fontSize === 'small') {
      document.documentElement.classList.add('text-sm');
      document.documentElement.classList.remove('text-base', 'text-lg');
    } else if (fontSize === 'medium') {
      document.documentElement.classList.add('text-base');
      document.documentElement.classList.remove('text-sm', 'text-lg');
    } else if (fontSize === 'large') {
      document.documentElement.classList.add('text-lg');
      document.documentElement.classList.remove('text-sm', 'text-base');
    }
    
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Apply colors when component mounts and when changed
  useEffect(() => {
    applyColors();
  }, [primaryColor, secondaryColor]);

  const applyColors = () => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Save color preferences to localStorage for other components
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem('notifications', checked.toString());
  };

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
  };

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryColor(e.target.value);
  };

  const applySegmentColors = () => {
    const preferences = getVisualPreferences();
    setPrimaryColor(preferences.primaryColor);
    setSecondaryColor(preferences.secondaryColor);
    
    toast({
      title: "Cores do segmento aplicadas",
      description: "Cores recomendadas para o segmento foram aplicadas em todo o sistema.",
    });
  };

  const handleSaveAppearance = () => {
    // Apply all settings
    applyColors();
    applySegmentVisuals();
    
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de aparência foram atualizadas com sucesso em todo o sistema.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Aparência</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Modo Escuro</Label>
          <Switch 
            id="dark-mode" 
            checked={darkMode} 
            onCheckedChange={handleDarkModeChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="font-size">Tamanho da Fonte</Label>
          <Select value={fontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger id="font-size">
              <SelectValue placeholder="Selecione o tamanho da fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeno</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator className="my-2" />
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Cores do Sistema</Label>
            <Button onClick={applySegmentColors} variant="outline" size="sm">
              <Palette className="mr-2 h-4 w-4" />
              Aplicar cores recomendadas
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Cor primária</Label>
              <div className="flex gap-2 items-center">
                <div 
                  className="w-10 h-10 rounded-md border" 
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <Input 
                  id="primary-color" 
                  type="text" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1"
                />
                <Input 
                  type="color" 
                  className="w-10 h-10 p-1 bg-transparent"
                  value={primaryColor}
                  onChange={handlePrimaryColorChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Cor secundária</Label>
              <div className="flex gap-2 items-center">
                <div 
                  className="w-10 h-10 rounded-md border" 
                  style={{ backgroundColor: secondaryColor }}
                ></div>
                <Input 
                  id="secondary-color" 
                  type="text" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1"
                />
                <Input 
                  type="color" 
                  className="w-10 h-10 p-1 bg-transparent"
                  value={secondaryColor}
                  onChange={handleSecondaryColorChange}
                />
              </div>
            </div>
          </div>
          
          <div className="p-3 border rounded-md bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200 mt-3 text-sm flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5" />
            <p>
              As cores serão aplicadas a todos os elementos do sistema que usam a cor primária ou secundária.
            </p>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Notificações</Label>
          <Switch 
            id="notifications" 
            checked={notifications} 
            onCheckedChange={handleNotificationsChange}
          />
        </div>

        <Button className="mt-4 w-full" onClick={handleSaveAppearance}>
          <Check className="mr-2 h-4 w-4" />
          Salvar e Aplicar em Todo o Sistema
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
