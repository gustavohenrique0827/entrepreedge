import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Check, Palette, AlertCircle, Upload, Smartphone, Tablet, Laptop } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';

const IntegratedSettings = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { 
    primaryColor, 
    secondaryColor, 
    darkMode, 
    fontSize, 
    updateThemeColors, 
    toggleDarkMode, 
    setFontSize 
  } = useTheme();
  const { currentSegment, segmentName, getVisualPreferences, applySegmentVisuals } = useSegment();
  
  // Preferences state
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'Fênix');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt-BR');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'BRL');
  const [segment, setSegment] = useState(localStorage.getItem('segment') || 'generic');
  const [logoUrl, setLogoUrl] = useState(localStorage.getItem('logoUrl') || '');
  const [logoPreview, setLogoPreview] = useState(localStorage.getItem('logoUrl') || '');

  // Active settings tab
  const [activeSettingsTab, setActiveSettingsTab] = useState('appearance');

  // Dark mode handler
  const handleDarkModeChange = (checked: boolean) => {
    toggleDarkMode(checked);
  };

  // Font size handler
  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
  };

  // Color handlers
  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateThemeColors(e.target.value, secondaryColor);
  };

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateThemeColors(primaryColor, e.target.value);
  };

  // Apply segment colors
  const applySegmentColors = () => {
    applySegmentVisuals();
    const prefs = getVisualPreferences();
    updateThemeColors(prefs.primaryColor, prefs.secondaryColor);
    
    toast({
      title: "Cores aplicadas",
      description: "Cores do segmento aplicadas com sucesso."
    });
  };

  // Format a sample amount according to the selected currency
  const formatSampleAmount = () => {
    const amount = 1234.56;
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
    } else if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    } else if (currency === 'EUR') {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
    }
    return amount.toString();
  };

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoUrl(base64String);
        setLogoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get segment-specific recommendations
  const getSegmentRecommendations = () => {
    switch(segment) {
      case 'financial':
        return { primary: '#0052CC', secondary: '#36B37E' };
      case 'healthcare':
        return { primary: '#00A3C4', secondary: '#00875A' };
      case 'education':
        return { primary: '#6554C0', secondary: '#00B8D9' };
      case 'ecommerce':
        return { primary: '#FF5630', secondary: '#6554C0' };
      case 'manufacturing':
        return { primary: '#505F79', secondary: '#0052CC' };
      default:
        return { primary: '#8B5CF6', secondary: '#D946EF' };
    }
  };

  // Apply segment recommendations
  const applySegmentRecommendations = () => {
    const recommendations = getSegmentRecommendations();
    updateThemeColors(recommendations.primary, recommendations.secondary);
    
    toast({
      title: "Recomendações aplicadas",
      description: "Cores do segmento aplicadas com sucesso."
    });
  };

  // Save all settings together
  const handleSaveSettings = () => {
    // Save preferences
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('language', language);
    localStorage.setItem('currency', currency);
    localStorage.setItem('segment', segment);
    localStorage.setItem('logoUrl', logoUrl);
    
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de aparência e configurações foram atualizadas com sucesso.",
    });
    
    // Force reload after language change to apply translations
    if (language !== localStorage.getItem('language')) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Aparência e Preferências</CardTitle>
          <CardDescription>
            Personalize a aparência do sistema e defina suas preferências
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSettingsTab} onValueChange={setActiveSettingsTab} className="w-full">
            <TabsList className={`mb-4 ${isMobile ? 'grid grid-cols-2' : 'flex'}`}>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette size={16} />
                <span>Aparência</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Check size={16} />
                <span>Preferências</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
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
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Cores do Sistema</Label>
                  <Button 
                    onClick={applySegmentColors} 
                    variant="outline" 
                    size="sm"
                    type="button"
                  >
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

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <div className="flex flex-col items-center justify-center gap-2 border rounded-lg p-3 flex-1">
                    <Smartphone size={24} className="text-primary" />
                    <span className="text-sm text-center">Otimizado para dispositivos móveis</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 border rounded-lg p-3 flex-1">
                    <Tablet size={24} className="text-primary" />
                    <span className="text-sm text-center">Compatível com tablets</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 border rounded-lg p-3 flex-1">
                    <Laptop size={24} className="text-primary" />
                    <span className="text-sm text-center">Design responsivo para desktop</span>
                  </div>
                </div>
                
                <div className="bg-background p-3 border rounded-md mt-3 text-sm flex items-start gap-2">
                  <Check size={16} className="mt-0.5 text-green-500" />
                  <p>
                    As cores serão aplicadas a todos os elementos do sistema que usam a cor primária ou secundária.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da empresa</Label>
                <Input 
                  id="company-name" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="segment">Segmento de atuação</Label>
                <Select value={segment} onValueChange={(val) => setSegment(val)}>
                  <SelectTrigger id="segment">
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="generic">Genérico</SelectItem>
                    <SelectItem value="financial">Financeiro</SelectItem>
                    <SelectItem value="healthcare">Saúde</SelectItem>
                    <SelectItem value="education">Educação</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="manufacturing">Indústria</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  onClick={applySegmentRecommendations}
                  type="button"
                >
                  Aplicar cores recomendadas para este segmento
                </Button>
              </div>

              <Separator className="my-2" />
              
              <div className="space-y-2">
                <Label>Logo da empresa</Label>
                <div className="flex flex-col space-y-3">
                  {logoPreview && (
                    <div className="border p-4 rounded-md bg-muted/20 flex items-center justify-center">
                      <img 
                        src={logoPreview} 
                        alt="Logo da empresa" 
                        className="max-h-20 max-w-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex items-center">
                    <Label 
                      htmlFor="logo-upload" 
                      className="cursor-pointer flex items-center gap-2 py-2 px-4 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                    >
                      <Upload size={16} />
                      <span>Upload do logo</span>
                      <Input 
                        id="logo-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleLogoUpload}
                      />
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Formatos suportados: PNG, JPG, SVG. Tamanho máximo: 2MB.
                  </p>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select value={language} onValueChange={(val) => setLanguage(val)}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Moeda</Label>
                <Select value={currency} onValueChange={(val) => setCurrency(val)}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Selecione a moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BRL">Real (R$)</SelectItem>
                    <SelectItem value="USD">Dólar (US$)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Exemplo: {formatSampleAmount()}
                </p>
              </div>
              
              <div className="p-3 border rounded-md bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200 mt-3 text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5" />
                <p>
                  As alterações de cores e logo serão aplicadas em todo o sistema, 
                  tornando a experiência personalizada para seu negócio.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button 
            className="mt-6 w-full" 
            onClick={handleSaveSettings}
            type="button"
          >
            Salvar Todas as Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratedSettings;
