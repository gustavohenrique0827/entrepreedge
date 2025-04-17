
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertCircle, Palette, Check, Sparkles } from 'lucide-react';
import { BusinessSegmentType, useSegment } from '@/contexts/SegmentContext';

const VisualizationSettings = () => {
  const { toast } = useToast();
  const { currentSegment, setCurrentSegment, applySegmentVisuals, getVisualPreferences } = useSegment();
  
  // Local state for color pickers
  const [primaryColor, setPrimaryColor] = useState(getVisualPreferences().primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(getVisualPreferences().secondaryColor);
  const [layoutPreview, setLayoutPreview] = useState('default');
  const [layoutPriorities, setLayoutPriorities] = useState<string[]>(
    JSON.parse(localStorage.getItem('layoutPriorities') || '[]') || 
    getVisualPreferences().layoutPriorities || []
  );
  
  // Update colors when segment changes
  useEffect(() => {
    const prefs = getVisualPreferences();
    setPrimaryColor(prefs.primaryColor);
    setSecondaryColor(prefs.secondaryColor);
  }, [currentSegment, getVisualPreferences]);

  // Load layout priorities from localStorage separately
  useEffect(() => {
    const savedLayoutPriorities = localStorage.getItem('layoutPriorities');
    if (savedLayoutPriorities) {
      setLayoutPriorities(JSON.parse(savedLayoutPriorities));
    }
  }, []);

  const segments: {id: BusinessSegmentType, name: string}[] = [
    { id: 'generic', name: 'Genérico' },
    { id: 'agro', name: 'Agronegócio' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'health', name: 'Saúde' },
    { id: 'fashion', name: 'Moda' },
    { id: 'services', name: 'Serviços' },
    { id: 'tech', name: 'Tecnologia' },
    { id: 'legal', name: 'Jurídico' },
    { id: 'education', name: 'Educação' },
    { id: 'manufacturing', name: 'Indústria' }
  ];

  const handleSegmentChange = (value: BusinessSegmentType) => {
    setCurrentSegment(value);
    const prefs = getVisualPreferences();
    setPrimaryColor(prefs.primaryColor);
    setSecondaryColor(prefs.secondaryColor);
    
    toast({
      title: "Segmento atualizado",
      description: `Visual atualizado para o segmento: ${segments.find(s => s.id === value)?.name}`,
    });
  };

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
    localStorage.setItem('primaryColor', e.target.value);
    document.documentElement.style.setProperty('--primary-color', e.target.value);
    
    // Convert to HSL for Tailwind variables
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
    
    const primaryHSL = hexToHSL(e.target.value);
    document.documentElement.style.setProperty('--primary', `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`);
    document.documentElement.style.setProperty('--sidebar-accent', `${e.target.value}15`);
    document.documentElement.style.setProperty('--sidebar-primary', e.target.value);
  };

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryColor(e.target.value);
    localStorage.setItem('secondaryColor', e.target.value);
    document.documentElement.style.setProperty('--secondary-color', e.target.value);
    
    // Convert to HSL for Tailwind variables
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
    
    const secondaryHSL = hexToHSL(e.target.value);
    document.documentElement.style.setProperty('--secondary', `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`);
  };

  const applySegmentColors = () => {
    applySegmentVisuals();
    
    const prefs = getVisualPreferences();
    setPrimaryColor(prefs.primaryColor);
    setSecondaryColor(prefs.secondaryColor);
    
    // Don't change layout priorities when applying colors
    
    toast({
      title: "Cores aplicadas",
      description: "As cores recomendadas para o segmento foram aplicadas com sucesso.",
    });
  };

  const reorganizeLayout = () => {
    // Create a new set of layout priorities based on the selected layout preview
    // This doesn't affect the visual appearance (colors)
    let newPriorities: string[] = [];
    
    switch(layoutPreview) {
      case 'dashboard':
        newPriorities = ['dashboard', 'finances', 'goals', 'calendar'];
        break;
      case 'finances':
        newPriorities = ['finances', 'goals', 'dashboard', 'calendar'];
        break;
      case 'sales':
        newPriorities = ['sales', 'finances', 'dashboard', 'goals'];
        break;
      case 'inventory':
        newPriorities = ['inventory', 'finances', 'dashboard', 'goals'];
        break;
      default:
        newPriorities = ['dashboard', 'finances', 'goals', 'calendar'];
        break;
    }
    
    setLayoutPriorities(newPriorities);
    
    // Store the layout preferences in localStorage (separate from visual preferences)
    localStorage.setItem('layoutPriorities', JSON.stringify(newPriorities));
    
    toast({
      title: "Layout reorganizado",
      description: `Layout priorizado para "${layoutPreview === 'default' ? 'Padrão' : layoutPreview}"`,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Personalização Visual por Segmento</CardTitle>
        <CardDescription>
          Personalize a aparência do sistema com base no seu segmento de negócio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="segment-select">Segmento da Empresa</Label>
          <Select value={currentSegment} onValueChange={handleSegmentChange}>
            <SelectTrigger id="segment-select">
              <SelectValue placeholder="Selecione o segmento" />
            </SelectTrigger>
            <SelectContent>
              {segments.map((segment) => (
                <SelectItem key={segment.id} value={segment.id}>
                  {segment.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Escolha o segmento que melhor representa sua empresa para personalização visual automática
          </p>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Paleta de Cores do Segmento</Label>
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
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="layout-preview">Prioridades de Layout</Label>
            <Button variant="outline" size="sm" onClick={reorganizeLayout}>
              <Sparkles className="mr-2 h-4 w-4" />
              Reorganizar Layout
            </Button>
          </div>
          
          <Select value={layoutPreview} onValueChange={setLayoutPreview}>
            <SelectTrigger id="layout-preview">
              <SelectValue placeholder="Visualizar layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Layout Padrão</SelectItem>
              <SelectItem value="dashboard">Priorizar Dashboard</SelectItem>
              <SelectItem value="finances">Priorizar Finanças</SelectItem>
              <SelectItem value="sales">Priorizar Vendas</SelectItem>
              <SelectItem value="inventory">Priorizar Estoque</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            {layoutPriorities.slice(0, 3).map((priority, index) => (
              <div key={priority} className="border rounded-md p-3 flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                <span className="text-sm capitalize">{priority}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 border rounded-md bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200 mt-3 text-sm flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5" />
          <p>
            As configurações de visualização específicas para o segmento <strong>{segments.find(s => s.id === currentSegment)?.name}</strong> serão aplicadas 
            automaticamente em todo o sistema para melhor experiência de uso. As prioridades de layout são independentes das cores do tema.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationSettings;
