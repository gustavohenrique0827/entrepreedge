
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Database, Factory, ShoppingBag, Stethoscope, GraduationCap, Store } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SegmentSettingsProps {
  segment: string;
  onSegmentChange: (value: string) => void;
  onApplyRecommendations: () => void;
}

interface SegmentConfig {
  key: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  supabaseUrl?: string;
  supabaseKey?: string;
}

const SegmentSettings = ({
  segment,
  onSegmentChange,
  onApplyRecommendations
}: SegmentSettingsProps) => {
  // Get stored configurations from localStorage
  const getStoredSegmentConfig = () => {
    try {
      const stored = localStorage.getItem('segmentConfigs');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Error loading segment configurations:", e);
      return {};
    }
  };
  
  const [segmentConfigs, setSegmentConfigs] = useState<Record<string, {url: string, key: string}>>(() => getStoredSegmentConfig());
  const [editingUrl, setEditingUrl] = useState('');
  const [editingKey, setEditingKey] = useState('');

  const segmentOptions: SegmentConfig[] = [
    { 
      key: "sales", 
      name: "Vendas", 
      icon: <ShoppingBag size={16} />, 
      description: "Gestão de vendas, produtos e estoque"
    },
    { 
      key: "financial", 
      name: "Financeiro", 
      icon: <Database size={16} />, 
      description: "Controle financeiro, receitas e despesas" 
    },
    { 
      key: "health", 
      name: "Saúde", 
      icon: <Stethoscope size={16} />, 
      description: "Gestão de pacientes e consultas" 
    },
    { 
      key: "education", 
      name: "Educação", 
      icon: <GraduationCap size={16} />, 
      description: "Cursos, alunos e matrículas" 
    },
    { 
      key: "ecommerce", 
      name: "E-commerce", 
      icon: <Store size={16} />, 
      description: "Loja virtual e pedidos" 
    },
    { 
      key: "industrial", 
      name: "Industrial", 
      icon: <Factory size={16} />, 
      description: "Produção e manutenção" 
    },
  ];

  const handleSaveConfig = (segKey: string) => {
    const newConfigs = {
      ...segmentConfigs,
      [segKey]: {
        url: editingUrl,
        key: editingKey
      }
    };
    setSegmentConfigs(newConfigs);
    localStorage.setItem('segmentConfigs', JSON.stringify(newConfigs));
    
    // Reset editing state
    setEditingUrl('');
    setEditingKey('');
  };

  const handleEditConfig = (segKey: string) => {
    const config = segmentConfigs[segKey] || { url: '', key: '' };
    setEditingUrl(config.url);
    setEditingKey(config.key);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="segment">Segmento de atuação</Label>
        <Select value={segment} onValueChange={onSegmentChange}>
          <SelectTrigger id="segment" className="w-full">
            <SelectValue placeholder="Selecione o segmento" />
          </SelectTrigger>
          <SelectContent>
            {segmentOptions.map((option) => (
              <SelectItem key={option.key} value={option.key} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span>{option.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 w-full" 
          onClick={onApplyRecommendations}
          type="button"
        >
          Aplicar cores recomendadas para este segmento
        </Button>
      </div>
      
      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="segment-config">
          <AccordionTrigger className="text-sm font-medium">
            Configuração Avançada de Segmento
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <p className="text-sm text-muted-foreground">
                Configure os dados de conexão do Supabase para cada segmento de negócio.
              </p>
              
              {segmentOptions.map((segOption) => {
                const hasConfig = segmentConfigs[segOption.key];
                return (
                  <div key={segOption.key} className="border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {segOption.icon}
                        <span className="font-medium">{segOption.name}</span>
                      </div>
                      {hasConfig && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Configurado
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{segOption.description}</p>
                    
                    {segment === segOption.key && (
                      <div className="space-y-3 mt-2">
                        <div className="space-y-1">
                          <Label htmlFor={`supabase-url-${segOption.key}`} className="text-xs">URL do Supabase</Label>
                          <Input 
                            id={`supabase-url-${segOption.key}`}
                            value={editingUrl}
                            onChange={(e) => setEditingUrl(e.target.value)}
                            placeholder="https://seu-projeto.supabase.co"
                            className="text-xs h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`supabase-key-${segOption.key}`} className="text-xs">Chave Anônima do Supabase</Label>
                          <Input 
                            id={`supabase-key-${segOption.key}`}
                            value={editingKey}
                            onChange={(e) => setEditingKey(e.target.value)}
                            type="password"
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            className="text-xs h-8"
                          />
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveConfig(segOption.key)}
                          className="w-full mt-2"
                        >
                          Salvar Configuração
                        </Button>
                      </div>
                    )}
                    
                    {segment !== segOption.key && hasConfig && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          onSegmentChange(segOption.key);
                          handleEditConfig(segOption.key);
                        }}
                        className="w-full mt-2"
                      >
                        Editar Configuração
                      </Button>
                    )}
                    
                    {segment !== segOption.key && !hasConfig && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          onSegmentChange(segOption.key);
                          setEditingUrl('');
                          setEditingKey('');
                        }}
                        className="w-full mt-2"
                      >
                        Configurar
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SegmentSettings;
