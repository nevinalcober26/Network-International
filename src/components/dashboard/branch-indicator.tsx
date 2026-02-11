'use client';
import { MapPin } from 'lucide-react';

/**
 * An innovative floating context indicator that informs the user
 * exactly which restaurant branch they are managing.
 */
export function BranchIndicator() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] group pointer-events-none">
      <div className="pointer-events-auto bg-white dark:bg-gray-900 border-2 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl p-4 flex items-center gap-4 transition-all hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] cursor-default">
        <div className="relative">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <MapPin className="h-6 w-6" />
          </div>
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white dark:border-gray-900"></span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Management Context</span>
          </div>
          <h4 className="text-xl font-black tracking-tighter text-foreground leading-none">Ras Al Khaimah</h4>
          <p className="text-xs font-bold text-muted-foreground mt-1">Bloomsbury&apos;s Outlet</p>
        </div>
      </div>
    </div>
  );
}
