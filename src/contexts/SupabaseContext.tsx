
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";

interface SupabaseContextType {
  supabase: SupabaseClient | null;
  loadingSupabase: boolean;
  currentSegment: string | null;
  switchSegment: (segment: string) => Promise<boolean>;
  isConfigured: (segment: string) => boolean;
  // Propriedades adicionadas para compatibilidade
  setSession: (session: Session | null) => void;
  setCompanyName: (name: string) => void;
  setIsConfigured: (isConfigured: boolean) => void;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [currentSegment, setCurrentSegment] = useState<string | null>(null);
  const [loadingSupabase, setLoadingSupabase] = useState<boolean>(false);
  const [session, setSessionState] = useState<Session | null>(null);

  // Função para definir a sessão
  const setSession = (newSession: Session | null) => {
    setSessionState(newSession);
    if (newSession) {
      localStorage.setItem('supabaseSession', JSON.stringify(newSession));
    } else {
      localStorage.removeItem('supabaseSession');
    }
  };

  // Função para definir o nome da empresa
  const setCompanyName = (name: string) => {
    localStorage.setItem('companyName', name);
  };

  // Função para definir se está configurado
  const setIsConfigured = (isConfigured: boolean) => {
    localStorage.setItem('isConfigured', isConfigured ? 'true' : 'false');
  };

  // Load segment configurations from localStorage
  const getSegmentConfigs = () => {
    try {
      const stored = localStorage.getItem('segmentConfigs');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Error loading segment configurations:", e);
      return {};
    }
  };

  // Check if a segment has been configured
  const isConfigured = (segment: string) => {
    const configs = getSegmentConfigs();
    return Boolean(configs[segment]?.url && configs[segment]?.key);
  };

  // Initialize or switch Supabase client based on segment
  const switchSegment = async (segment: string): Promise<boolean> => {
    setLoadingSupabase(true);
    
    try {
      const configs = getSegmentConfigs();
      const segmentConfig = configs[segment];
      
      if (!segmentConfig?.url || !segmentConfig?.key) {
        toast({
          title: "Configuração incompleta",
          description: `O segmento "${segment}" não possui configurações do Supabase. Configure-o nas preferências.`,
          variant: "destructive"
        });
        setLoadingSupabase(false);
        return false;
      }
      
      // Create new Supabase client with segment-specific credentials
      const newClient = createClient(segmentConfig.url, segmentConfig.key);
      
      // Test the connection
      const { error } = await newClient.from('test_connection').select('*').limit(1).maybeSingle();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "relation does not exist" which is fine - just means table doesn't exist
        if (error.code === 'PGRST401') {
          toast({
            title: "Erro de autenticação",
            description: "A chave do Supabase parece inválida. Verifique as configurações.",
            variant: "destructive"
          });
        } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
          toast({
            title: "Erro de conexão",
            description: "Não foi possível conectar ao Supabase. Verifique a URL e sua conexão.",
            variant: "destructive"
          });
        } else if (error.code !== 'PGRST116') {
          toast({
            title: "Erro ao conectar",
            description: `${error.message}`,
            variant: "destructive"
          });
        }
      }
      
      setSupabase(newClient);
      setCurrentSegment(segment);
      
      toast({
        title: "Segmento alternado",
        description: `Conectado ao banco de dados do segmento: ${segment}`,
      });
      
      return true;
    } catch (error) {
      console.error("Error switching Supabase client:", error);
      toast({
        title: "Erro",
        description: "Não foi possível conectar ao banco de dados. Verifique as configurações.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoadingSupabase(false);
    }
  };

  // Initialize Supabase client on mount if a segment is saved in localStorage
  useEffect(() => {
    const savedSegment = localStorage.getItem('currentSegment');
    if (savedSegment) {
      switchSegment(savedSegment).then(success => {
        if (!success) {
          setCurrentSegment(null);
        }
      });
    }
  }, []);

  // Save current segment to localStorage whenever it changes
  useEffect(() => {
    if (currentSegment) {
      localStorage.setItem('currentSegment', currentSegment);
    }
  }, [currentSegment]);

  return (
    <SupabaseContext.Provider value={{
      supabase,
      loadingSupabase,
      currentSegment,
      switchSegment,
      isConfigured,
      setSession,
      setCompanyName,
      setIsConfigured
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
