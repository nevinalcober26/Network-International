'use client';
import { MapPin } from 'lucide-react';

/**
 * A highly visible, top-center floating "Management Island" indicator.
 * This location is innovative, avoids corner conflicts, and is extremely 
 * easy for any user to identify the current branch context.
 */
export function BranchIndicator() {
  return (
    <div className="fixed top-[72px] left-1/2 -translate-x-1/2 z-[40] pointer-events-none flex justify-center w-full max-w-xs px-4">
      <div className="pointer-events-auto flex items-center gap-4 bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-2xl px-5 py-2.5 transition-all hover:scale-105 group border-b-primary/30">
        <div className="relative flex items-center justify-center shrink-0">
          <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-gray-900"></span>
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary/90 whitespace-nowrap">Live Context</span>
            <span className="h-1 w-1 rounded-full bg-white/20 shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/40 truncate">Bloomsbury&apos;s</span>
          </div>
          <h4 className="text-base font-black text-white tracking-tight leading-none mt-1 truncate">Ras Al Khaimah</h4>
        </div>
      </div>
    </div>
  );
}
