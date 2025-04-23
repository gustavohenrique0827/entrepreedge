
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageCurrencySettingsProps {
  language: string;
  currency: string;
  onLanguageChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  formatSampleAmount: () => string;
}

const LanguageCurrencySettings = ({
  language,
  currency,
  onLanguageChange,
  onCurrencyChange,
  formatSampleAmount
}: LanguageCurrencySettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="language">Idioma</Label>
        <Select value={language} onValueChange={onLanguageChange}>
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
        <Select value={currency} onValueChange={onCurrencyChange}>
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
    </div>
  );
};

export default LanguageCurrencySettings;
