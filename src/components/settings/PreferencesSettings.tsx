
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PreferencesSettings = () => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'Sua Empresa');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt-BR');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'BRL');

  // Apply preferences when component mounts and when they change
  useEffect(() => {
    // Update document lang attribute
    document.documentElement.lang = language.split('-')[0];
    
    // Update global preferences object
    const preferences = {
      companyName,
      language,
      currency
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
  }, [companyName, language, currency]);

  const handleSavePreferences = () => {
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('language', language);
    localStorage.setItem('currency', currency);
    
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
        
        <Button className="mt-4 w-full" onClick={handleSavePreferences}>
          Salvar Preferências
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesSettings;
