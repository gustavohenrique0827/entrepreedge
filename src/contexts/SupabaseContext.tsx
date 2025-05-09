
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";

// Base URL and key from the main Supabase project
const SUPABASE_URL = "https://zsqffbtheeqenhewyqic.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzcWZmYnRoZWVxZW5oZXd5cWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDE2NzAsImV4cCI6MjA2MjM3NzY3MH0._b8GHi3phGDL-k0R9cvf1vy3g4TqK7mGK93dUpzqYAs";

// Main client for generic operations
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface SegmentConfig {
  url: string;
  key: string;
}

interface SupabaseContextType {
  currentSegment: string | null;
  switchSegment: (segment: string) => Promise<boolean>;
  allSegments: string[];
  isConfigured: (segment: string) => boolean;
  supabaseForSegment: (segment: string) => SupabaseClient | null;
  addSegmentConfig: (segment: string, config: SegmentConfig) => void;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [currentSegment, setCurrentSegment] = useState<string | null>(null);
  const [allSegments, setAllSegments] = useState<string[]>([]);
  const [segmentClients, setSegmentClients] = useState<Record<string, SupabaseClient>>({});
  const [segmentConfigs, setSegmentConfigs] = useState<Record<string, SegmentConfig>>({});
  
  // Initialize from localStorage
  useEffect(() => {
    try {
      // Load segment configs
      const configsStr = localStorage.getItem('segmentConfigs');
      if (configsStr) {
        const configs = JSON.parse(configsStr);
        setSegmentConfigs(configs);
        setAllSegments(Object.keys(configs));
        
        // Initialize clients for all configured segments
        const clients: Record<string, SupabaseClient> = {};
        Object.entries(configs).forEach(([segment, config]) => {
          const { url, key } = config as SegmentConfig;
          if (url && key) {
            clients[segment] = createClient(url, key);
          }
        });
        setSegmentClients(clients);
      }
      
      // Set current segment if saved
      const savedSegment = localStorage.getItem('segment');
      if (savedSegment) {
        setCurrentSegment(savedSegment);
      }
    } catch (err) {
      console.error("Error initializing Supabase context:", err);
    }
  }, []);
  
  // Function to check if a segment is configured
  const isConfigured = (segment: string): boolean => {
    if (!segmentConfigs || !segmentConfigs[segment]) return false;
    const config = segmentConfigs[segment];
    return !!(config?.url && config?.key);
  };
  
  // Function to get a Supabase client for a specific segment
  const supabaseForSegment = (segment: string): SupabaseClient | null => {
    if (segment === 'generic') {
      return supabase;
    }
    
    return segmentClients[segment] || null;
  };
  
  // Function to add or update segment configuration
  const addSegmentConfig = (segment: string, config: SegmentConfig) => {
    // Update local state
    setSegmentConfigs(prev => ({
      ...prev,
      [segment]: config
    }));
    
    // Create a client for this segment
    const newClient = createClient(config.url, config.key);
    setSegmentClients(prev => ({
      ...prev,
      [segment]: newClient
    }));
    
    // Save to localStorage
    const updatedConfigs = {
      ...segmentConfigs,
      [segment]: config
    };
    localStorage.setItem('segmentConfigs', JSON.stringify(updatedConfigs));
    
    // Update all segments list
    if (!allSegments.includes(segment)) {
      const newSegments = [...allSegments, segment];
      setAllSegments(newSegments);
    }
    
    toast({
      title: "Configuração salva",
      description: `Configuração para o segmento ${segment} foi salva com sucesso.`
    });
  };
  
  // Function to switch to a different segment
  const switchSegment = async (segment: string): Promise<boolean> => {
    try {
      // If segment is not configured, cannot switch
      if (!isConfigured(segment) && segment !== 'generic') {
        toast({
          title: "Erro ao alterar segmento",
          description: `O segmento "${segment}" não está configurado.`,
          variant: "destructive"
        });
        return false;
      }
      
      // Update current segment
      setCurrentSegment(segment);
      localStorage.setItem('segment', segment);
      
      toast({
        title: "Segmento alterado",
        description: `Você agora está usando o segmento "${segment}".`
      });
      
      return true;
    } catch (err) {
      console.error("Error switching segment:", err);
      toast({
        title: "Erro ao alterar segmento",
        description: `Não foi possível alternar para o segmento "${segment}".`,
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <SupabaseContext.Provider value={{
      currentSegment,
      switchSegment,
      allSegments,
      isConfigured,
      supabaseForSegment,
      addSegmentConfig
    }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
