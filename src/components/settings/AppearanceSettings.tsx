
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertCircle, Palette, Check } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';

const AppearanceSettings = () => {
  const { toast } = useToast();
  const { currentSegment, getVisualPreferences, applySegmentVisuals } = useSegment();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') !== 'false');
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || '#8B5CF6');
  const [secondaryColor, setSecondaryColor] = useState(localStorage.getItem('secondaryColor') || '#D946EF');

  // Apply dark mode when component mounts and when changed
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
  }, [fontSize]);

  // Apply colors when component mounts and when changed
  useEffect(() => {
    // Apply to CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Convert hex to HSL and apply to Tailwind variables
    const hexToHSL = (hex: string) => {
      // Remove the # from the beginning
      hex = hex.replace(/^#/, '');

      // Parse the hex values
      let r = parseInt(hex.substring(0, 2), 16) / 255;
      let g = parseInt(hex.substring(2, 4), 16) / 255;
      let b = parseInt(hex.substring(4, 6), 16) / 255;

      // Find max and min values to calculate the lightness
      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      // Calculate hue and saturation
      if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else if (max === b) h = (r - g) / d + 4;
        h *= 60;
      }

      return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const primaryHSL = hexToHSL(primaryColor);
    const secondaryHSL = hexToHSL(secondaryColor);
    
    document.documentElement.style.setProperty('--primary', `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`);
    document.documentElement.style.setProperty('--secondary', `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`);
  }, [primaryColor, secondaryColor]);

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', checked.toString());
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    localStorage.setItem('fontSize', value);
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem('notifications', checked.toString());
  };

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
    localStorage.setItem('primaryColor', e.target.value);
  };

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryColor(e.target.value);
    localStorage.setItem('secondaryColor', e.target.value);
  };

  const applySegmentColors = () => {
    applySegmentVisuals();
    const prefs = getVisualPreferences();
    setPrimaryColor(prefs.primaryColor);
    setSecondaryColor(prefs.secondaryColor);
  };

  const handleSaveAppearance = () => {
    // Update document variables directly
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Update in localStorage
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    
    // Convert to HSL for Tailwind
    const hexToHSL = (hex: string) => {
      hex = hex.replace(/^#/, '');
      let r = parseInt(hex.substring(0, 2), 16) / 255;
      let g = parseInt(hex.substring(2, 4), 16) / 255;
      let b = parseInt(hex.substring(4, 6), 16) / 255;
      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else if (max === b) h = (r - g) / d + 4;
        h *= 60;
      }
      
      return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
    };
    
    const primaryHSL = hexToHSL(primaryColor);
    const secondaryHSL = hexToHSL(secondaryColor);
    
    document.documentElement.style.setProperty('--primary', `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`);
    document.documentElement.style.setProperty('--secondary', `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`);
    
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de aparência foram atualizadas com sucesso.",
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
          
          <div className="bg-background p-3 border rounded-md mt-3 text-sm flex items-start gap-2">
            <Check size={16} className="mt-0.5 text-green-500" />
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
          Salvar Preferências
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
