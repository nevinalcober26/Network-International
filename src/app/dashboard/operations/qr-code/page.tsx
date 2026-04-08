'use client';

import React, { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Download, 
  Plus, 
  QrCode as QrCodeIcon, 
  MoreHorizontal, 
  ArrowUpDown,
  List,
  LayoutGrid,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QrTableData {
  id: string;
  table: string;
  status: 'Active' | 'Inactive';
  floor: string;
  lastUpdated: string;
  hasQr: boolean;
}

const mockQrData: QrTableData[] = [
  { id: '1', table: 'T1', status: 'Inactive', floor: 'Booths', lastUpdated: 'Jul 15, 2024 at 1:05 PM', hasQr: false },
  { id: '2', table: 'T2', status: 'Inactive', floor: 'Main Dining', lastUpdated: 'Jul 15, 2024 at 1:05 PM', hasQr: false },
  { id: '3', table: 'T3', status: 'Active', floor: 'Main Dining', lastUpdated: 'Jul 15, 2024 at 1:05 PM', hasQr: true },
  { id: '4', table: 'T4', status: 'Active', floor: 'Bar', lastUpdated: 'Jul 15, 2024 at 1:05 PM', hasQr: true },
  { id: '5', table: 'T5', status: 'Active', floor: 'Booths', lastUpdated: 'Jul 15, 2024 at 1:05 PM', hasQr: true },
  { id: '6', table: 'T6', status: 'Active', floor: 'Booths', lastUpdated: 'Jul 15, 2024 at 1:05 PM', hasQr: true },
  { id: '7', table: 'T7', status: 'Active', floor: 'Booths', lastUpdated: 'Jul 15, 2024 at 1:05 PM', hasQr: true },
];

export default function ManageQrPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');

  const SortableHeader = ({ label }: { label: string }) => (
    <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors group">
      {label}
      <ArrowUpDown className="h-3 w-3 text-muted-foreground/50 group-hover:text-muted-foreground" />
    </div>
  );

  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-6 lg:p-10 bg-[#f8fafc] min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">Manage QR Codes</h1>
              <p className="text-muted-foreground text-sm font-medium">
                Create, edit, and manage QR codes for your tables.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 font-bold text-[#475569] h-10 border-gray-200">
                <Download className="h-4 w-4" />
                Download All
              </Button>
              <Button className="gap-2 font-bold bg-[#016EAF] hover:bg-[#015a8f] h-10 shadow-sm">
                <Plus className="h-4 w-4" />
                Create QR Code
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Tables"
                className="pl-10 border-gray-200 bg-white focus-visible:ring-primary/20 h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <Select defaultValue="rak">
                <SelectTrigger className="w-[180px] h-10 border-gray-200">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rak">Bloomsbury's Ras..</SelectItem>
                  <SelectItem value="dubai">Dubai Mall</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-floors">
                <SelectTrigger className="w-[140px] h-10 border-gray-200">
                  <SelectValue placeholder="Floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-floors">All Floors</SelectItem>
                  <SelectItem value="ground">Ground Floor</SelectItem>
                  <SelectItem value="first">First Floor</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-statuses">
                <SelectTrigger className="w-[140px] h-10 border-gray-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Button variant="outline" className="gap-2 font-bold text-[#016EAF] border-primary/20 hover:bg-primary/5 h-10">
                  <Zap className="h-4 w-4" />
                  Generate Missing QR
                </Button>
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-[#E54360] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  2
                </span>
              </div>

              <div className="flex items-center gap-1 border rounded-lg p-1 bg-gray-50/50">
                <Button 
                  variant={view === 'list' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  className={cn("h-8 w-8", view === 'list' && "bg-white shadow-sm")}
                  onClick={() => setView('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant={view === 'grid' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  className={cn("h-8 w-8", view === 'grid' && "bg-white shadow-sm")}
                  onClick={() => setView('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <Card className="border-0 shadow-sm overflow-hidden rounded-xl">
            <Table>
              <TableHeader className="bg-white">
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="w-12 py-4">
                    <Checkbox className="rounded-sm border-gray-300" />
                  </TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground py-4">
                    <SortableHeader label="Table" />
                  </TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground py-4">
                    <SortableHeader label="QR Preview" />
                  </TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground py-4">
                    <SortableHeader label="Status" />
                  </TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground py-4">
                    <SortableHeader label="Floor" />
                  </TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground py-4">
                    <SortableHeader label="Last updated" />
                  </TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground py-4 text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {mockQrData.map((row) => (
                  <TableRow key={row.id} className="group transition-colors border-b hover:bg-gray-50/50">
                    <TableCell className="py-4">
                      <Checkbox className="rounded-sm border-gray-300" />
                    </TableCell>
                    <TableCell className="font-bold text-sm text-[#1e293b] py-4">
                      {row.table}
                    </TableCell>
                    <TableCell className="py-4">
                      {row.hasQr ? (
                        <div className="h-8 w-8 rounded-md border border-gray-200 bg-white flex items-center justify-center p-1 cursor-pointer hover:border-primary transition-colors">
                          <QrCodeIcon className="h-full w-full text-foreground" />
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-[10px] font-bold uppercase tracking-wider gap-1.5 px-3 border-gray-200 text-[#64748b]"
                        >
                          <LayoutGrid className="h-3 w-3" />
                          Generate
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded-full px-3 py-0.5 text-[10px] font-bold border-none",
                          row.status === 'Active' 
                            ? "bg-[#ecfdf5] text-[#10b981]" 
                            : "bg-[#fff1f2] text-[#f43f5e]"
                        )}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-sm text-[#475569] py-4">
                      {row.floor}
                    </TableCell>
                    <TableCell className="text-sm text-[#64748b] py-4">
                      {row.lastUpdated}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-400">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Footer */}
            <div className="p-4 bg-white border-t flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Select defaultValue="10">
                  <SelectTrigger className="w-[120px] h-9 border-gray-200 text-xs font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="25">25 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-500 font-medium">
                  Showing <strong className="text-gray-900">1 to 6</strong> of <strong className="text-gray-900">124</strong> results
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" className="h-8 w-8 p-0 bg-[#016EAF] font-bold">1</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-gray-600">2</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-gray-600">3</Button>
                <span className="px-1 text-gray-400">...</span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-gray-600">21</Button>
                <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

        </div>
      </main>
    </>
  );
}

function ChevronLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
