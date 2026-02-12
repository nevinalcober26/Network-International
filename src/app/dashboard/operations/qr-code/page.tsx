'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  QrCode, 
  Download, 
  Settings2, 
  ExternalLink, 
  Palette, 
  Info,
  Link as LinkIcon,
  CheckCircle2,
  Sparkles,
  MousePointer2,
  Printer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const BRAND_COLORS = [
  { name: 'Pitch Black', value: '#000000' },
  { name: 'Bloomsbury Teal', value: '#18B4A6' },
  { name: 'Deep Forest', value: '#142424' },
  { name: 'Autumn Orange', value: '#fb923c' },
  { name: 'Royal Purple', value: '#9333ea' },
];

export default function QrCodePage() {
  const [qrColor, setQrColor] = useState('#000000');
  const [isCustomUrl, setIsCustomUrl] = useState(false);
  const [fileType, setFileType] = useState('PNG');
  const [qrType, setQrType] = useState('NORMAL QR');
  const [isHighErrorCorrection, setIsHighErrorCorrection] = useState(false);

  const breadcrumbItems = [
    { label: 'Operations' },
    { label: 'QR Studio' }
  ];

  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-[#F8FAFB] min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Breadcrumbs items={breadcrumbItems} />
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <QrCode className="h-7 w-7" />
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[#142424]">QR Studio</h1>
              </div>
              <p className="text-lg text-muted-foreground font-medium max-w-xl">
                Create beautiful, high-resolution QR codes for your restaurant menu in seconds.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border shadow-sm">
               <div className="px-4 py-2 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-black text-green-700 uppercase tracking-widest">Live Sync Active</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Control Panel */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Destination */}
              <Card className="border-0 shadow-smooth overflow-hidden bg-white rounded-[2rem]">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#142424] text-white font-black text-sm">1</span>
                    <h2 className="text-xl font-black text-[#142424]">Where should it lead?</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">QR Category</Label>
                      <Select value={qrType} onValueChange={setQrType}>
                        <SelectTrigger className="h-14 rounded-2xl border-2 bg-gray-50/50 hover:bg-white hover:border-primary/30 transition-all font-bold text-base">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-2">
                          <SelectItem value="NORMAL QR" className="font-bold py-3">General Menu Link</SelectItem>
                          <SelectItem value="TABLE QR" className="font-bold py-3">Table Specific Scan</SelectItem>
                          <SelectItem value="MENU QR" className="font-bold py-3">Digital Menu Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Custom Endpoint</Label>
                        <Switch 
                          checked={isCustomUrl}
                          onCheckedChange={setIsCustomUrl}
                        />
                      </div>
                      <div className={cn("relative transition-all duration-300", !isCustomUrl && "opacity-40 pointer-events-none")}>
                        <Input 
                          placeholder="https://menu.bloomsburys.com/..." 
                          className="h-14 rounded-2xl border-2 bg-gray-50/50 font-mono text-sm pl-12"
                        />
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Styling */}
              <Card className="border-0 shadow-smooth overflow-hidden bg-white rounded-[2rem]">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#142424] text-white font-black text-sm">2</span>
                    <h2 className="text-xl font-black text-[#142424]">Choose your look</h2>
                  </div>

                  <div className="space-y-6">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Brand Palette</Label>
                    <div className="flex flex-wrap items-center gap-4">
                      {BRAND_COLORS.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setQrColor(color.value)}
                          className={cn(
                            "group relative flex items-center justify-center h-14 w-14 rounded-2xl transition-all duration-300 hover:scale-110",
                            qrColor === color.value ? "ring-4 ring-primary ring-offset-4" : "hover:ring-2 hover:ring-gray-200"
                          )}
                          style={{ backgroundColor: color.value }}
                        >
                          {qrColor === color.value && <CheckCircle2 className="h-6 w-6 text-white" />}
                          <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-black uppercase tracking-widest text-[#142424] whitespace-nowrap">
                            {color.name}
                          </span>
                        </button>
                      ))}
                      
                      <div className="h-10 w-[2px] bg-gray-100 mx-2" />
                      
                      <div className="flex items-center gap-3 bg-gray-50 p-2 pr-5 rounded-2xl border-2 group hover:border-primary/30 transition-all">
                        <div className="relative h-10 w-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                          <input 
                            type="color" 
                            value={qrColor}
                            onChange={(e) => setQrColor(e.target.value)}
                            className="absolute inset-[-50%] h-[200%] w-[200%] cursor-pointer bg-transparent"
                          />
                        </div>
                        <span className="font-mono text-xs font-black text-[#142424] uppercase">{qrColor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                      className={cn(
                        "flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all cursor-pointer",
                        isHighErrorCorrection ? "bg-primary/5 border-primary/20" : "bg-white border-gray-100 hover:border-gray-200"
                      )}
                      onClick={() => setIsHighErrorCorrection(!isHighErrorCorrection)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-colors", isHighErrorCorrection ? "bg-primary text-white" : "bg-gray-100 text-gray-400")}>
                          <Printer className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#142424]">Print Quality</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Best for menus & stands</p>
                        </div>
                      </div>
                      <Switch checked={isHighErrorCorrection} />
                    </div>

                    <div className="flex items-center justify-between p-5 rounded-[1.5rem] border-2 bg-white border-gray-100 opacity-50 cursor-not-allowed">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#142424]">Add Logo</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Coming Soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Section */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button className="h-16 px-12 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-lg uppercase tracking-widest shadow-2xl shadow-primary/30 transition-all active:scale-95 group flex-1 w-full sm:w-auto">
                  <Download className="mr-3 h-6 w-6 transition-transform group-hover:-translate-y-1" />
                  Export QR Code
                </Button>
                
                <div className="bg-white p-2 rounded-[1.5rem] border shadow-sm flex items-center gap-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-3">Format:</Label>
                  <Select value={fileType} onValueChange={setFileType}>
                    <SelectTrigger className="w-28 h-12 border-0 bg-gray-50 rounded-xl shadow-none focus:ring-0 font-black text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="PNG" className="font-black">PNG</SelectItem>
                      <SelectItem value="SVG" className="font-black">SVG</SelectItem>
                      <SelectItem value="PDF" className="font-black text-red-500">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-5 flex flex-col gap-8 sticky top-24">
              
              <div className="relative group">
                {/* Immersive Background Glow */}
                <div 
                  className="absolute inset-0 blur-[100px] opacity-30 transition-all duration-1000 group-hover:opacity-50"
                  style={{ backgroundColor: qrColor }}
                />
                
                <Card className="relative overflow-hidden border-0 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[3rem] bg-white">
                  <CardContent className="p-12 flex flex-col items-center gap-12">
                    
                    {/* The QR Slate */}
                    <div className="relative p-10 bg-gray-50/50 rounded-[3.5rem] border-[1px] border-gray-100 shadow-inner group-hover:scale-[1.03] transition-transform duration-500 ease-out">
                      <div className="bg-white p-6 rounded-[2.5rem] shadow-xl">
                        <QrCode 
                          className="h-64 w-64 transition-all duration-700 ease-in-out" 
                          style={{ color: qrColor }}
                          strokeWidth={1.2}
                        />
                      </div>
                      
                      {/* Interactive Cursor Simulation */}
                      <div className="absolute -bottom-4 -right-4 bg-[#142424] text-white p-3 rounded-2xl shadow-2xl animate-bounce">
                        <MousePointer2 className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Path Visualizer */}
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#142424]">Live Canvas Ready</p>
                        </div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{fileType} • {isHighErrorCorrection ? '300 DPI' : '72 DPI'}</span>
                      </div>
                      
                      <div className="relative flex items-center bg-gray-100 rounded-2xl border-2 border-white shadow-sm overflow-hidden h-14">
                        <div className="flex items-center justify-center h-full aspect-square bg-white border-r text-primary">
                          <ExternalLink className="h-5 w-5" />
                        </div>
                        <div className="flex-1 px-5 overflow-hidden">
                          <p className="text-sm font-black text-[#142424] truncate">
                            {isCustomUrl ? 'your-custom-site.com/orders' : `bloomsburys.menu/table/rak-05`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between p-6 rounded-[2rem] bg-[#142424] text-white shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">Status</p>
                    <p className="text-sm font-bold">Safe for Printing</p>
                  </div>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_12px_#4ade80]" />
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
