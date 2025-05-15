
import React, { useState, useEffect } from 'react';
import { Cloud, CloudOff, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api, syncWithServer } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast'; // Changed from component import to hooks import

export const SyncStatus = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const { toast } = useToast(); // Use toast from hooks
  
  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      const newOnlineStatus = navigator.onLine;
      setIsOnline(newOnlineStatus);
      
      // Show toast when connection status changes
      if (newOnlineStatus !== isOnline) {
        if (newOnlineStatus) {
          toast({
            title: "Conexão restaurada",
            description: "Você está online novamente. Sincronizando dados...",
            variant: "success",
            duration: 3000,
          });
        } else {
          toast({
            title: "Sem conexão",
            description: "Você está offline. Suas alterações serão salvas localmente.",
            variant: "warning",
            duration: 5000,
          });
        }
      }
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    // Initial check
    handleOnlineStatus();
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [isOnline, toast]);
  
  // Periodically sync data when online
  useEffect(() => {
    if (!isOnline) return;
    
    const syncData = async () => {
      if (isSyncing) return;
      
      setIsSyncing(true);
      try {
        await syncWithServer();
        setLastSync(new Date());
      } catch (error) {
        console.error('Sync failed:', error);
        toast({
          title: "Sincronização falhou",
          description: "Não foi possível sincronizar seus dados. Tentando novamente em breve.",
          variant: "warning",
          duration: 4000,
        });
      } finally {
        setIsSyncing(false);
      }
    };
    
    syncData();
    const interval = setInterval(syncData, 5 * 60 * 1000); // Sync every 5 minutes
    
    return () => clearInterval(interval);
  }, [isOnline, isSyncing, toast]);
  
  return (
    <div className="flex items-center gap-2 text-xs">
      <div 
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full",
          isOnline 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
        )}
      >
        {isOnline ? (
          isSyncing ? (
            <Cloud size={12} className="animate-pulse" />
          ) : (
            <Check size={12} />
          )
        ) : (
          <CloudOff size={12} />
        )}
        <span>
          {isOnline 
            ? isSyncing 
              ? "Sincronizando..." 
              : "Dados sincronizados" 
            : "Offline"
          }
        </span>
      </div>
      
      {lastSync && (
        <span className="text-muted-foreground">
          Última sincronização: {lastSync.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

export default SyncStatus;
