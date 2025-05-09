
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Database, FileText, ShoppingBag, Stethoscope, GraduationCap, Store, Factory, Wallet } from "lucide-react";
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
import { useSupabase } from '@/contexts/SupabaseContext';

interface SegmentSettingsProps {
  segment: string;
  onSegmentChange: (value: string) => void;
  onApplyRecommendations: () => void;
}

export interface SegmentConfig {
  key: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  tables?: string[];
}

const SegmentSettings = ({
  segment,
  onSegmentChange,
  onApplyRecommendations
}: SegmentSettingsProps) => {
  // Get access to Supabase context
  const { isConfigured, switchSegment } = useSupabase();
  
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
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const segmentOptions: SegmentConfig[] = [
    { 
      key: "sales", 
      name: "Vendas", 
      icon: <ShoppingBag size={16} />, 
      description: "Gestão de vendas, produtos e estoque",
      tables: ["produtos", "estoque", "transacoes", "relatorios"]
    },
    { 
      key: "financial", 
      name: "Financeiro", 
      icon: <Wallet size={16} />, 
      description: "Controle financeiro, receitas e despesas",
      tables: ["contas", "transacoes", "categorias"] 
    },
    { 
      key: "health", 
      name: "Saúde", 
      icon: <Stethoscope size={16} />, 
      description: "Gestão de pacientes e consultas",
      tables: ["pacientes", "consultas", "laudos", "exames"]
    },
    { 
      key: "education", 
      name: "Educação", 
      icon: <GraduationCap size={16} />, 
      description: "Cursos, alunos e matrículas",
      tables: ["alunos", "cursos", "matriculas", "certificados"]
    },
    { 
      key: "ecommerce", 
      name: "E-commerce", 
      icon: <Store size={16} />, 
      description: "Loja virtual e pedidos",
      tables: ["produtos", "clientes", "pedidos", "pagamentos"]
    },
    { 
      key: "industrial", 
      name: "Industrial", 
      icon: <Factory size={16} />, 
      description: "Produção e manutenção",
      tables: ["maquinas", "ordens_producao", "manutencoes"]
    },
  ];

  useEffect(() => {
    // If the segment changes, load its configuration for editing
    const config = segmentConfigs[segment] || { url: '', key: '' };
    setEditingUrl(config.url);
    setEditingKey(config.key);
    setActiveAccordion('segment-config');
  }, [segment, segmentConfigs]);

  const handleSaveConfig = async (segKey: string) => {
    if (!editingUrl || !editingKey) {
      alert("URL e chave do Supabase são obrigatórios");
      return;
    }
    
    const newConfigs = {
      ...segmentConfigs,
      [segKey]: {
        url: editingUrl,
        key: editingKey
      }
    };
    
    setSegmentConfigs(newConfigs);
    localStorage.setItem('segmentConfigs', JSON.stringify(newConfigs));
    
    // Try to switch to this segment to test the connection
    await switchSegment(segKey);
  };

  const handleEditConfig = (segKey: string) => {
    const config = segmentConfigs[segKey] || { url: '', key: '' };
    setEditingUrl(config.url);
    setEditingKey(config.key);
    setActiveAccordion('segment-config');
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
      
      <Accordion 
        type="single" 
        collapsible 
        className="w-full mt-4"
        value={activeAccordion || undefined}
        onValueChange={(value) => setActiveAccordion(value)}
      >
        <AccordionItem value="segment-config">
          <AccordionTrigger className="text-sm font-medium">
            Configuração do Supabase por Segmento
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <p className="text-sm text-muted-foreground">
                Configure as credenciais do Supabase para cada segmento de negócio. Cada segmento terá seu próprio banco de dados.
              </p>
              
              <div className="mt-4 border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {segmentOptions.find(opt => opt.key === segment)?.icon}
                    <span className="font-medium">{segmentOptions.find(opt => opt.key === segment)?.name}</span>
                  </div>
                  {isConfigured(segment) && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Configurado
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {segmentOptions.find(opt => opt.key === segment)?.description}
                </p>
                
                <div className="mt-2">
                  <div className="space-y-1 mb-3">
                    <Label htmlFor="supabase-url" className="text-xs">URL do Supabase</Label>
                    <Input
                      id="supabase-url"
                      value={editingUrl}
                      onChange={(e) => setEditingUrl(e.target.value)}
                      placeholder="https://seu-projeto.supabase.co"
                      className="text-xs h-8"
                    />
                    <p className="text-[10px] text-muted-foreground">Ex: https://id-projeto.supabase.co</p>
                  </div>
                  <div className="space-y-1 mb-3">
                    <Label htmlFor="supabase-key" className="text-xs">Chave Anônima do Supabase</Label>
                    <Input
                      id="supabase-key"
                      value={editingKey}
                      onChange={(e) => setEditingKey(e.target.value)}
                      type="password"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="text-xs h-8"
                    />
                    <p className="text-[10px] text-muted-foreground">Encontre na seção API do projeto no Supabase</p>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => handleSaveConfig(segment)}
                    className="w-full mt-2"
                  >
                    Salvar Configuração
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 mt-5">
                <h4 className="text-sm font-medium">Outros Segmentos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {segmentOptions
                    .filter(option => option.key !== segment)
                    .map((option) => {
                      const isConfiguredSegment = isConfigured(option.key);
                      return (
                        <div key={option.key} className="border rounded-md p-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {option.icon}
                              <span className="text-xs font-medium">{option.name}</span>
                            </div>
                            {isConfiguredSegment && (
                              <Badge variant="outline" size="sm" className="text-[10px] bg-green-50 text-green-700 border-green-200">
                                Configurado
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2 text-xs h-7"
                            onClick={() => {
                              onSegmentChange(option.key);
                            }}
                          >
                            {isConfiguredSegment ? "Editar" : "Configurar"}
                          </Button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="segment-tables">
          <AccordionTrigger className="text-sm font-medium">
            Tabelas do Segmento
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <p className="text-sm text-muted-foreground mb-3">
                Cada segmento precisa das seguintes tabelas em seu banco de dados Supabase:
              </p>
              
              <div className="border rounded-md p-3">
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  {segmentOptions.find(opt => opt.key === segment)?.icon}
                  {segmentOptions.find(opt => opt.key === segment)?.name}
                </h4>
                
                <ul className="list-disc list-inside space-y-1">
                  {segmentOptions.find(opt => opt.key === segment)?.tables?.map((table) => (
                    <li key={table} className="text-xs">
                      <code className="bg-muted px-1 rounded">{table}</code>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">
                    Para criar estas tabelas, acesse o Editor SQL do Supabase para este segmento.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SegmentSettings;
