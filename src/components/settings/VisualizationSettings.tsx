
import React from 'react';
import ColorSettings from './ColorSettings';
import DisplaySettings from './DisplaySettings';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Flame } from 'lucide-react';

const VisualizationSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Flame size={24} className="text-[var(--primary-color)]" />
          <div>
            <CardTitle>Personalização da Plataforma Fenix</CardTitle>
            <CardDescription>
              Personalize as cores, modo de exibição e tamanho da fonte do sistema.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      
      <ColorSettings />
      <DisplaySettings />
    </div>
  );
};

export default VisualizationSettings;
