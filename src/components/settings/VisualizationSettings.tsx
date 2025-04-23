
import React from 'react';
import ColorSettings from './ColorSettings';
import DisplaySettings from './DisplaySettings';

const VisualizationSettings = () => {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h3>Configurações de Visualização</h3>
        <p>Personalize as cores, modo de exibição e tamanho da fonte do sistema.</p>
      </div>
      
      <ColorSettings />
      <DisplaySettings />
    </div>
  );
};

export default VisualizationSettings;
