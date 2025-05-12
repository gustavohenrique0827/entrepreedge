
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useSegment, BusinessSegmentType } from '@/contexts/SegmentContext';
import { useSupabase } from '@/contexts/SupabaseContext';

interface ModuleContainerProps {
  requiredSegment: BusinessSegmentType;
  children?: React.ReactNode;
}

export const ModuleContainer: React.FC<ModuleContainerProps> = ({ 
  requiredSegment, 
  children 
}) => {
  const { currentSegment } = useSegment();
  const { isConfigured } = useSupabase();
  const navigate = useNavigate();

  // Check if the current segment matches the required segment
  const isCorrectSegment = currentSegment === requiredSegment;
  
  // Check if the segment is properly configured
  const isSegmentConfigured = isConfigured(requiredSegment);
  
  // If not the correct segment or not configured, show an error
  if (!isCorrectSegment || !isSegmentConfigured) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Acesso restrito</h2>
          <p className="text-muted-foreground mb-4">
            {!isCorrectSegment 
              ? `Este módulo está disponível apenas para o segmento "${requiredSegment}".` 
              : `O segmento "${requiredSegment}" não está configurado corretamente.`}
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Voltar para a seleção de segmentos
          </button>
        </Card>
      </div>
    );
  }

  // If correct segment, show the module content
  return (
    <>
      {children || <Outlet />}
    </>
  );
};
