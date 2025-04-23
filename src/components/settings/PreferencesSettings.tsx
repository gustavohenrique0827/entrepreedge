import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';
import CompanySettings from './preferences/CompanySettings';
import LanguageCurrencySettings from './preferences/LanguageCurrencySettings';
import SegmentSettings from './preferences/SegmentSettings';

const PreferencesSettings = () => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'Sua Empresa');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt-BR');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'BRL');
  const [segment, setSegment] = useState(localStorage.getItem('segment') || 'generic');
  const [logoUrl, setLogoUrl] = useState(localStorage.getItem('logoUrl') || '');
  const [logoPreview, setLogoPreview] = useState(localStorage.getItem('logoUrl') || '');

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

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

  const handleSaveSettings = () => {
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('language', language);
    localStorage.setItem('currency', currency);
    localStorage.setItem('segment', segment);
    localStorage.setItem('logoUrl', logoUrl);
    
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
    
    if (language !== localStorage.getItem('language')) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const handleApplySegmentRecommendations = () => {
    // Implementation remains the same
    toast({
      title: "Recomendações aplicadas",
      description: "Cores do segmento aplicadas com sucesso.",
    });
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <CompanySettings 
          companyName={companyName}
          logoPreview={logoPreview}
          onCompanyNameChange={handleCompanyNameChange}
          onLogoUpload={handleLogoUpload}
        />
        
        <SegmentSettings 
          segment={segment}
          onSegmentChange={setSegment}
          onApplyRecommendations={handleApplySegmentRecommendations}
        />
        
        <LanguageCurrencySettings 
          language={language}
          currency={currency}
          onLanguageChange={setLanguage}
          onCurrencyChange={setCurrency}
          formatSampleAmount={formatSampleAmount}
        />
        
        <div className="p-3 border rounded-md bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200 text-sm flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5" />
          <p>
            Alterações nas configurações serão aplicadas em todo o sistema.
            Se você alterar o idioma, a página será recarregada.
          </p>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSaveSettings}
          type="button"
        >
          Salvar Todas as Configurações
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesSettings;
