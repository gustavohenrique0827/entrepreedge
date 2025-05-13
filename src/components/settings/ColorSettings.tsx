
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { HexColorPicker } from 'react-colorful';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const ColorSettings = () => {
  const { primaryColor, secondaryColor, updateThemeColors } = useTheme();

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
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
      </CardContent>
    </Card>
  );
};

export default ColorSettings;
