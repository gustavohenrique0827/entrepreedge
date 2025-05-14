
import React, { useState, useEffect } from 'react';
import { Cloud, CloudOff, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api, syncWithServer } from '@/services/apiService';

export const SyncStatus = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  
  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
  
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
      } finally {
        setIsSyncing(false);
      }
    };
    
    syncData();
    const interval = setInterval(syncData, 5 * 60 * 1000); // Sync every 5 minutes
    
    return () => clearInterval(interval);
  }, [isOnline, isSyncing]);
  
  return (
    <div className="flex items-center gap-2 text-xs">
      <div 
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full",
          isOnline 
            ? "bg-green-100 text-green-800" 
            : "bg-amber-100 text-amber-800"
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
