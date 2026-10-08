import React from 'react';
import { WifiOff, Database } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-xl bg-stone-900/90 text-stone-100 px-4 py-2.5 text-xs font-medium shadow-lg backdrop-blur-xs border border-stone-700 animate-slide-up">
      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
      <WifiOff className="w-4 h-4 text-amber-300" />
      <span>Modo sin conexión activo — Tus progresos y glosario se guardan en local</span>
      <Database className="w-3.5 h-3.5 text-stone-400 ml-1" />
    </div>
  );
};
