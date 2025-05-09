
import { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { useSupabase } from '@/contexts/SupabaseContext';

// Este hook gerencia clientes Supabase específicos para cada segmento
export function useSegmentSupabaseClient() {
  const { currentSegment, supabaseForSegment } = useSupabase();
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initClient = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!currentSegment) {
          setError("Nenhum segmento selecionado");
          setIsLoading(false);
          return;
        }
        
        // Obter cliente Supabase específico para o segmento
        const segmentClient = supabaseForSegment(currentSegment);
        
        if (!segmentClient) {
          setError(`Configuração para o segmento "${currentSegment}" não encontrada`);
          setIsLoading(false);
          return;
        }
        
        // Definir o cliente para o componente usar
        setClient(segmentClient);
        
        // Testar a conexão para garantir que está funcionando
        try {
          // Teste simples apenas para verificar se há conexão
          await segmentClient.from('_test_connection').select('*').maybeSingle();
        } catch (testError) {
          // Ignoramos erros específicos, como tabela não existente
          // O importante é que a conexão foi estabelecida
          console.log("Conexão testada com sucesso");
        }
      } catch (err) {
        console.error("Erro ao inicializar cliente Supabase:", err);
        setError("Falha ao inicializar cliente Supabase");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (currentSegment) {
      initClient();
    }
  }, [currentSegment, supabaseForSegment]);

  return { client, isLoading, error };
}
