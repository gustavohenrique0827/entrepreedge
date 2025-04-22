
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Check, Palette } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';
import { useTheme } from '@/contexts/ThemeContext';

const AppearanceSettings = () => {
  const { toast } = useToast();
  const { currentSegment, getVisualPreferences, applySegmentVisuals } = useSegment();
  const { 
    primaryColor, 
    secondaryColor, 
    darkMode, 
    fontSize, 
    updateThemeColors, 
    toggleDarkMode, 
    setFontSize 
  } = useTheme();

  const handleDarkModeChange = (checked: boolean) => {
    toggleDarkMode(checked);
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
  };

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateThemeColors(e.target.value, secondaryColor);
  };

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateThemeColors(primaryColor, e.target.value);
  };

  const applySegmentColors = () => {
    applySegmentVisuals();
    const prefs = getVisualPreferences();
    updateThemeColors(prefs.primaryColor, prefs.secondaryColor);
    
    toast({
      title: "Cores aplicadas",
      description: "Cores do segmento aplicadas com sucesso."
    });
  };

  const handleSaveAppearance = () => {
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
                  onChange={(e) => updateThemeColors(e.target.value, secondaryColor)}
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
                  onChange={(e) => updateThemeColors(primaryColor, e.target.value)}
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
        
        <Button className="mt-4 w-full" onClick={handleSaveAppearance}>
          Salvar Preferências
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
