
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DisplaySettings = () => {
  const { darkMode, fontSize, toggleDarkMode, setFontSize } = useTheme();

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <Label>Modo Escuro</Label>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>

          <div className="space-y-2">
            <Label>Tamanho da Fonte</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tamanho da fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequena</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplaySettings;
