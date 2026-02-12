'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { DashboardHeader } from '@/components/dashboard/header';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  QrCode, 
  Download, 
  ExternalLink, 
  CheckCircle2,
  Printer,
  FileText,
  Upload,
  X,
  FileImage,
  Layers,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const BRAND_COLORS = [
  { name: 'Classic Black', value: '#000000' },
  { name: 'Ocean Teal', value: '#18B4A6' },
  { name: 'Midnight', value: '#142424' },
  { name: 'Sunrise Orange', value: '#fb923c' },
  { name: 'Royal Purple', value: '#9333ea' },
];

export default function QrCodePage() {
  const { toast } = useToast();
  const [qrColor, setQrColor] = useState('#000000');
  const [qrType, setQrType] = useState('NORMAL QR');
  const [isHighErrorCorrection, setIsHighErrorCorrection] = useState(false);
  const [isBrandingEnabled, setIsBrandingEnabled] = useState(true);
  const [coupon, setCoupon] = useState('none');
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const breadcrumbItems = [
    { label: 'Operations' },
    { label: 'QR Studio' }
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const clearLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = (format: string) => {
    setIsDownloadModalOpen(false);
    toast({
      title: "Creating your QR Code",
      description: `Your ${format} file is being prepared for download.`,
    });
  };

  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-muted/20 min-h-[calc(100vh-4rem)]">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-1">
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="text-3xl font-bold tracking-tight text-foreground">QR Studio</h1>
              <p className="text-muted-foreground">
                Design and export branded QR codes for your menu or tables.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Destination */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-lg font-bold">Destination</h2>
                </div>
                
                <Card className="border shadow-sm overflow-hidden">
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">QR Type</Label>
                        <Select value={qrType} onValueChange={setQrType}>
                          <SelectTrigger className="h-10 bg-muted/30 border-muted">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NORMAL QR">Normal (Menu Link)</SelectItem>
                            <SelectItem value="TABLE QR">Specific Table</SelectItem>
                            <SelectItem value="ROOM QR">Specific Room</SelectItem>
                            <SelectItem value="ALPHANUMERIC QR">Custom Alphanumeric</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Auto-Apply Coupon</Label>
                        <Select value={coupon} onValueChange={setCoupon}>
                          <SelectTrigger className="h-10 bg-muted/30 border-muted">
                            <SelectValue placeholder="Select a coupon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Coupon</SelectItem>
                            <SelectItem value="welcome10">WELCOME10 (10% Off)</SelectItem>
                            <SelectItem value="summer25">SUMMER25 (25% Off)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Step 2: Styling */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-lg font-bold">Look & Feel</h2>
                </div>

                <Card className="border shadow-sm overflow-hidden">
                  <CardContent className="p-6 space-y-8">
                    {/* Color Section */}
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Brand Colors</Label>
                      <div className="flex flex-wrap items-center gap-3">
                        {BRAND_COLORS.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setQrColor(color.value)}
                            title={color.name}
                            className={cn(
                              "h-10 w-10 rounded-full transition-all border-2",
                              qrColor === color.value ? "border-primary scale-110 shadow-md" : "border-transparent hover:border-muted"
                            )}
                            style={{ backgroundColor: color.value }}
                          >
                            {qrColor === color.value && <CheckCircle2 className="mx-auto h-4 w-4 text-white" />}
                          </button>
                        ))}
                        <div className="h-8 w-px bg-border mx-1" />
                        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border">
                          <div className="relative h-6 w-6 rounded-full overflow-hidden border shadow-sm">
                            <input 
                              type="color" 
                              value={qrColor}
                              onChange={(e) => setQrColor(e.target.value)}
                              className="absolute inset-[-50%] h-[200%] w-[200%] cursor-pointer"
                            />
                          </div>
                          <span className="font-mono text-xs font-bold uppercase">{qrColor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* High Durability Card */}
                      <div className={cn(
                        "flex flex-col p-5 rounded-xl border transition-all",
                        isHighErrorCorrection ? "bg-primary/5 border-primary/30" : "bg-card border-border"
                      )}>
                        <div className="flex items-center justify-between mb-3">
                          <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", isHighErrorCorrection ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
                            <Printer className="h-5 w-5" />
                          </div>
                          <Switch checked={isHighErrorCorrection} onCheckedChange={setIsHighErrorCorrection} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-sm">High Durability</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">Better for stickers or physical cards that may get scratched.</p>
                        </div>
                      </div>

                      {/* Add Branding Card */}
                      <div className={cn(
                        "flex flex-col p-5 rounded-xl border transition-all",
                        isBrandingEnabled ? "bg-primary/5 border-primary/30" : "bg-card border-border"
                      )}>
                        <div className="flex items-center justify-between mb-3">
                          <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", isBrandingEnabled ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <Switch checked={isBrandingEnabled} onCheckedChange={setIsBrandingEnabled} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-sm">Add Branding</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">Overlay your restaurant logo in the center.</p>
                        </div>

                        {isBrandingEnabled && (
                          <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg border bg-white flex items-center justify-center overflow-hidden">
                                {customLogo ? (
                                  <Image src={customLogo} alt="Logo" width={40} height={40} className="object-contain" />
                                ) : (
                                  <Upload className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <span className="text-xs font-semibold">{customLogo ? 'Logo Ready' : 'Empty'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                              <Button variant="outline" size="sm" className="h-8 text-xs font-semibold px-3" onClick={triggerUpload}>
                                {customLogo ? 'Change' : 'Upload'}
                              </Button>
                              {customLogo && (
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={clearLogo}>
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Step 3: Action */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-lg font-bold">Export</h2>
                </div>
                <Button 
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="h-14 px-8 rounded-xl font-bold text-base transition-all shadow-md w-full"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Generate & Download QR Code
                </Button>
              </div>

            </div>

            {/* Preview Area */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-4">
                <Card className="overflow-hidden border shadow-lg bg-white rounded-2xl">
                  <div className="bg-muted/50 px-5 py-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Live Preview</span>
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground bg-background px-2 py-0.5 rounded border">
                      {isHighErrorCorrection ? '300 DPI' : '72 DPI'}
                    </span>
                  </div>
                  
                  <CardContent className="p-8 flex flex-col items-center gap-8">
                    <div className="relative p-6 bg-white rounded-xl border border-dashed border-muted group transition-all">
                      <QrCode 
                        className="h-56 w-56 transition-colors duration-500" 
                        style={{ color: qrColor }}
                        strokeWidth={1.5}
                      />
                      {isBrandingEnabled && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white p-1 rounded-lg shadow-sm border border-muted animate-in fade-in zoom-in duration-300">
                            <div className="h-12 w-12 rounded-md overflow-hidden relative bg-white flex items-center justify-center">
                              <Image
                                src={customLogo || "https://picsum.photos/seed/brand/100/100"}
                                fill
                                alt="Logo"
                                className={cn("object-cover", !customLogo && "grayscale opacity-20")}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Path</span>
                      </div>
                      <div className="flex items-center bg-muted/30 rounded-lg border px-4 h-12">
                        <ExternalLink className="h-4 w-4 text-primary shrink-0 mr-3" />
                        <p className="text-xs font-semibold truncate text-muted-foreground">
                          bloomsburys.menu/qr/rak-table-05{coupon !== 'none' ? `?c=${coupon}` : ''}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 rounded-xl border bg-primary/5 flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary shrink-0" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-primary">Pro Tip:</strong> Adding your restaurant logo makes your table displays look much more professional and increases guest trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border shadow-2xl rounded-2xl">
          <div className="p-8 space-y-6">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold">Choose Format</DialogTitle>
              <DialogDescription className="text-sm">
                Select the high-resolution file type that best suits your needs.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'PNG', label: 'Image', type: 'WEB READY', icon: FileImage, color: 'text-blue-600', bg: 'bg-blue-50' },
                { id: 'SVG', label: 'Vector', type: 'PRINT READY', icon: Layers, color: 'text-teal-600', bg: 'bg-teal-50' },
                { id: 'PDF', label: 'Document', type: 'SHAREABLE', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleDownload(item.id)}
                  className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 bg-card hover:border-primary hover:bg-primary/5 transition-all group outline-none"
                >
                  <div className={cn("h-14 w-14 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110", item.bg, item.color)}>
                    <item.icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{item.id}</p>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">{item.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-muted/20 border-t flex justify-center">
            <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest h-10 px-6" onClick={() => setIsDownloadModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
