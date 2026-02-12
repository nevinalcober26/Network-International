'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
  Plus, 
  ExternalLink, 
  Palette, 
  Info,
  Link as LinkIcon
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
  { name: 'Green Pulse', value: '#4ade80' },
  { name: 'Autumn Orange', value: '#fb923c' },
];

export default function QrCodePage() {
  const [qrColor, setQrColor] = useState('#000000');
  const [isCustomUrl, setIsCustomUrl] = useState(false);
  const [fileType, setFileType] = useState('PNG');
  const [qrType, setQrType] = useState('NORMAL QR');
  const [isHighErrorCorrection, setIsHighErrorCorrection] = useState(false);

  const breadcrumbItems = [
    { label: 'Operations' },
    { label: 'QR Code' }
  ];

  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F8FAFB] min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="text-4xl font-black tracking-tight text-[#142424]">QR Studio</h1>
              <p className="text-muted-foreground font-medium">
                Design and deploy high-resolution QR codes for your digital ecosystem.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 font-bold border-2 hover:bg-white transition-all">
                <Settings2 className="h-4 w-4" />
                Global Config
              </Button>
              <Button className="gap-2 font-black bg-[#142424] hover:bg-[#1a2e2e] text-white shadow-xl shadow-black/10">
                <Plus className="h-5 w-5" />
                Batch Generate
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Configuration Form */}
            <Card className="lg:col-span-7 border-0 shadow-smooth overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="p-8 space-y-10">
                  {/* Design Header */}
                  <div className="flex items-center gap-3 border-b pb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-[#142424] uppercase tracking-wider">Visual Identity</h2>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest opacity-60">Customize the look and feel</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* QR Type & Link */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">QR Category</Label>
                        <Select value={qrType} onValueChange={setQrType}>
                          <SelectTrigger className="h-12 border-2 bg-gray-50/50 hover:bg-white transition-all font-bold">
                            <SelectValue placeholder="Select QR type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NORMAL QR" className="font-bold">Standard Redirect</SelectItem>
                            <SelectItem value="TABLE QR" className="font-bold">Table-Specific (POS)</SelectItem>
                            <SelectItem value="MENU QR" className="font-bold">Digital Menu Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Custom Endpoint</Label>
                          <Checkbox 
                            id="custom-url" 
                            checked={isCustomUrl}
                            onCheckedChange={(checked) => setIsCustomUrl(!!checked)}
                          />
                        </div>
                        <div className={cn("relative transition-opacity", !isCustomUrl && "opacity-40 pointer-events-none")}>
                          <Input 
                            placeholder="https://menu.bloomsburys.com/..." 
                            className="h-12 border-2 bg-gray-50/50 font-mono text-sm"
                          />
                          <LinkIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Color Section */}
                    <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Brand Colors</Label>
                      <div className="flex flex-wrap gap-3">
                        {BRAND_COLORS.map((color) => (
                          <TooltipProvider key={color.value}>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => setQrColor(color.value)}
                                  className={cn(
                                    "h-10 w-10 rounded-full border-2 transition-all hover:scale-110",
                                    qrColor === color.value ? "ring-2 ring-primary ring-offset-2 border-white" : "border-transparent"
                                  )}
                                  style={{ backgroundColor: color.value }}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="font-bold text-[10px] uppercase tracking-wider">{color.name}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                        <div className="h-10 w-[2px] bg-gray-100 mx-2" />
                        <div className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full border-2">
                          <input 
                            type="color" 
                            value={qrColor}
                            onChange={(e) => setQrColor(e.target.value)}
                            className="h-7 w-7 rounded-full border-0 cursor-pointer bg-transparent overflow-hidden"
                          />
                          <span className="font-mono text-xs font-bold text-muted-foreground uppercase">{qrColor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#142424]/5 border-2 border-dashed border-[#142424]/10">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center border shadow-sm">
                          <Info className="h-4 w-4 text-[#142424]" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#142424]">High Error Correction</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Best for printed materials</p>
                        </div>
                      </div>
                      <Checkbox 
                        id="error-correction" 
                        checked={isHighErrorCorrection}
                        onCheckedChange={(checked) => setIsHighErrorCorrection(!!checked)}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 flex items-center gap-4">
                    <Button className="h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95">
                      <Download className="mr-2 h-5 w-5" />
                      Export Assets
                    </Button>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 px-1">Format</Label>
                      <Select value={fileType} onValueChange={setFileType}>
                        <SelectTrigger className="w-24 h-10 border-0 bg-transparent shadow-none focus:ring-0 font-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PNG" className="font-black">PNG</SelectItem>
                          <SelectItem value="SVG" className="font-black">SVG</SelectItem>
                          <SelectItem value="PDF" className="font-black">PDF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Preview Container */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
              <div className="relative group">
                {/* Background Mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5 rounded-[40px] blur-3xl opacity-50 transition-opacity group-hover:opacity-80" />
                
                <Card className="relative overflow-hidden border-0 shadow-2xl rounded-[40px] bg-white/80 backdrop-blur-xl">
                  <CardContent className="p-12 flex flex-col items-center gap-10">
                    {/* Phone-like QR Container */}
                    <div className="relative p-8 bg-white rounded-[48px] shadow-inner border-[12px] border-gray-50 transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="bg-white p-2">
                        <QrCode 
                          className="h-64 w-64 transition-all duration-500 ease-out" 
                          style={{ color: qrColor }}
                          strokeWidth={1.5}
                        />
                      </div>
                      
                      {/* Logo Overlay Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="h-16 w-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white overflow-hidden">
                           <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                              <span className="text-[10px] font-black text-primary">LOGO</span>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Link Indicator */}
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#142424]">Live Context Preview</p>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gray-100/50 p-4 rounded-2xl border-2 border-white shadow-sm">
                        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center border shadow-sm shrink-0">
                          <ExternalLink className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground opacity-60 leading-none mb-1">Target Path</p>
                          <p className="text-sm font-bold text-[#142424] truncate">
                            {isCustomUrl ? 'custom-endpoint.com/v1' : `bloomsburys.menu/table/rak-05`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between px-6 py-4 rounded-3xl bg-white border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#142424]">Ready for Export</span>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">300 DPI • Vector</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
