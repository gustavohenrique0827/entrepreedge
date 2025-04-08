
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Upload } from 'lucide-react';

const PreferencesSettings = () => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'Sua Empresa');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt-BR');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'BRL');
  const [segment, setSegment] = useState(localStorage.getItem('segment') || 'generic');
  const [logoUrl, setLogoUrl] = useState(localStorage.getItem('logoUrl') || '');
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || '#8B5CF6');
  const [secondaryColor, setSecondaryColor] = useState(localStorage.getItem('secondaryColor') || '#D946EF');
  const [logoPreview, setLogoPreview] = useState(localStorage.getItem('logoUrl') || '');

  // Apply preferences when component mounts and when they change
  useEffect(() => {
    // Update document lang attribute
    document.documentElement.lang = language.split('-')[0];
    
    // Update global preferences object
    const preferences = {
      companyName,
      language,
      currency,
      segment,
      primaryColor,
      secondaryColor,
      logoUrl
    };
    
    localStorage.setItem('preferences', JSON.stringify(preferences));
    
    // Apply currency formatting globally
    if (currency === 'BRL') {
      window.currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    } else if (currency === 'USD') {
      window.currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    } else if (currency === 'EUR') {
      window.currencyFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
    }
    
    // Update document title with company name
    document.title = `${companyName} - Painel de Controle`;
    
    // Apply theme colors
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  }, [companyName, language, currency, segment, primaryColor, secondaryColor, logoUrl]);

  const handleSavePreferences = () => {
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('language', language);
    localStorage.setItem('currency', currency);
    localStorage.setItem('segment', segment);
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    localStorage.setItem('logoUrl', logoUrl);
    
    toast({
      title: "Preferências salvas",
      description: "Suas configurações pessoais foram atualizadas.",
    });
    
    // Force reload after language change to apply translations
    if (language !== localStorage.getItem('language')) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
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
        return {
          primary: '#0052CC',
          secondary: '#36B37E'
        };
      case 'healthcare':
        return {
          primary: '#00A3C4',
          secondary: '#00875A'
        };
      case 'education':
        return {
          primary: '#6554C0',
          secondary: '#00B8D9'
        };
      case 'ecommerce':
        return {
          primary: '#FF5630',
          secondary: '#6554C0'
        };
      case 'manufacturing':
        return {
          primary: '#505F79',
          secondary: '#0052CC'
        };
      default:
        return {
          primary: '#8B5CF6',
          secondary: '#D946EF'
        };
    }
  };

  // Apply segment recommendations
  const applySegmentRecommendations = () => {
    const recommendations = getSegmentRecommendations();
    setPrimaryColor(recommendations.primary);
    setSecondaryColor(recommendations.secondary);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Select value={segment} onValueChange={setSegment}>
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
          >
            Aplicar cores recomendadas para este segmento
          </Button>
        </div>

        <Separator className="my-4" />
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
              />
              <Input 
                type="color" 
                className="w-10 h-10 p-1 bg-transparent"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
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
              />
              <Input 
                type="color" 
                className="w-10 h-10 p-1 bg-transparent"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-3 border rounded-md bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200 mt-3 text-sm flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5" />
          <p>
            As alterações de cores e logo serão aplicadas em todo o sistema, 
            tornando a experiência personalizada para seu negócio.
          </p>
        </div>
        
        <Separator className="my-4" />

        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <Select value={language} onValueChange={setLanguage}>
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
          <Select value={currency} onValueChange={setCurrency}>
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
        
        <Button className="mt-6 w-full" onClick={handleSavePreferences}>
          Salvar Preferências
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesSettings;
