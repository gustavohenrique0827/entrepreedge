
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { HexColorPicker } from 'react-colorful';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Flame, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ColorSettings = () => {
  const { primaryColor, secondaryColor, updateThemeColors, applyThemeColors, setPersistentColors } = useTheme();
  const { toast } = useToast();

  // Fenix default theme colors
  const defaultPrimary = '#ff5722'; // Orange-red like fire
  const defaultSecondary = '#9c27b0'; // Purple for mystic/rebirth aspect of phoenix

  const resetToDefaults = () => {
    updateThemeColors(defaultPrimary, defaultSecondary);
    applyThemeColors();
    toast({
      title: "Cores restauradas",
      description: "As cores padrão da plataforma Fenix foram aplicadas."
    });
  };

  const handleApplyChanges = () => {
    applyThemeColors();
    setPersistentColors();
    
    toast({
      title: "Cores atualizadas",
      description: "As alterações de cor foram aplicadas com sucesso."
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Cores da Plataforma Fenix</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2" 
          onClick={resetToDefaults}
        >
          <RefreshCw size={14} />
          <span>Restaurar padrão</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="mb-4 p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/20 flex gap-2 items-center">
          <Flame className="text-orange-500 shrink-0" size={20} />
          <p className="text-sm text-orange-800 dark:text-orange-200">
            As cores escolhidas serão aplicadas em toda a plataforma Fenix, mantidas mesmo ao recarregar a página.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Label>Cor Primária</Label>
            <div className="relative">
              <HexColorPicker
                color={primaryColor}
                onChange={(color) => updateThemeColors(color, secondaryColor)}
                className="w-full"
              />
              <div
                className="mt-2 h-8 w-full rounded-md border"
                style={{ backgroundColor: primaryColor }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Cor Secundária</Label>
            <div className="relative">
              <HexColorPicker
                color={secondaryColor}
                onChange={(color) => updateThemeColors(primaryColor, color)}
                className="w-full"
              />
              <div
                className="mt-2 h-8 w-full rounded-md border"
                style={{ backgroundColor: secondaryColor }}
              />
            </div>
          </div>
        </div>

        <Button 
          className="mt-6 w-full"
          onClick={handleApplyChanges}
        >
          Aplicar e Salvar Cores
        </Button>
      </CardContent>
    </Card>
  );
};

export default ColorSettings;
