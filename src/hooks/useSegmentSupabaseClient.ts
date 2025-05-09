
import { useState, useEffect } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useSupabase } from '@/contexts/SupabaseContext';

// This hook manages segment-specific Supabase client instances
export function useSegmentSupabaseClient() {
  const { currentSegment } = useSupabase();
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initClient = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get the configuration for the current segment
        const configsStr = localStorage.getItem('segmentConfigs');
        if (!configsStr) {
          setError("Nenhuma configuração de segmento encontrada");
          setIsLoading(false);
          return;
        }
        
        const configs = JSON.parse(configsStr);
        
        if (!currentSegment || !configs[currentSegment]) {
          setError(`Configuração para o segmento "${currentSegment}" não encontrada`);
          setIsLoading(false);
          return;
        }
        
        const { url, key } = configs[currentSegment];
        
        if (!url || !key) {
          setError("Configuração de Supabase incompleta para este segmento");
          setIsLoading(false);
          return;
        }
        
        // Create a new Supabase client for this segment
        const newClient = createClient(url, key);
        setClient(newClient);
        
        // Test the connection to make sure it's working
        const { error: testError } = await newClient
          .from('test_connection')
          .select('*')
          .limit(1)
          .maybeSingle();
        
        // PGRST116 error (relation does not exist) is expected if the table doesn't exist
        if (testError && testError.code !== 'PGRST116') {
          console.error("Error testing connection:", testError);
          setError(`Erro ao conectar: ${testError.message}`);
        }
      } catch (err) {
        console.error("Error initializing Supabase client:", err);
        setError("Falha ao inicializar cliente Supabase");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (currentSegment) {
      initClient();
    }
  }, [currentSegment]);

  return { client, isLoading, error };
}
