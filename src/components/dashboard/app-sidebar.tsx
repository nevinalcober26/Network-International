'use client';
import {
  PieChart,
  Settings,
  Briefcase,
  ClipboardList,
  Plug,
  Plus,
  Minus,
  LayoutDashboard,
  Search,
  Rocket,
  CircleHelp,
  ChevronDown,
  PlusCircle,
  Loader2,
  BarChart,
  TrendingUp,
  Palette,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { mockBranches, type Branch } from '@/lib/mock-data-store';
import { useToast } from '@/hooks/use-toast';

export const EMenuIcon = () => (
  <svg width="182" height="32" viewBox="0 0 280 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M264.841 12.0977H256.034L271.193 30.1607L256.217 47.9996H265.023L280 30.1607L264.841 12.0977Z" fill="#E54360"/>
    <path d="M67.0306 15.1225C65.5301 13.5123 63.7071 12.266 61.5616 11.4119C59.402 10.5578 57.0181 10.1237 54.3817 10.1237C51.7454 10.1237 49.2913 10.5858 47.0196 11.5239C44.7478 12.4621 42.7706 13.7503 41.1018 15.4306C39.4331 17.1109 38.1289 19.0992 37.1894 21.4516C36.2498 23.79 35.7871 26.3104 35.7871 29.1389C35.7871 31.9673 36.2638 34.5298 37.2174 36.8681C38.171 39.1925 39.4892 41.1809 41.1579 42.8191C42.8267 44.4574 44.818 45.7316 47.1458 46.6418C49.4596 47.5519 51.9838 48 54.7183 48C57.9015 48 60.7903 47.3979 63.3986 46.1937C66.0069 44.9895 68.2506 43.1272 70.1718 40.5788L65.1655 36.5601C64.1559 38.0723 62.7676 39.3606 61.0007 40.4247C59.2337 41.4889 57.1443 42.007 54.7183 42.007C53.1477 42.007 51.6753 41.741 50.287 41.1809C48.8987 40.6348 47.6647 39.8646 46.6129 38.8845C45.5472 37.9043 44.7058 36.7561 44.0747 35.4259C43.4437 34.0957 43.1071 32.6814 43.051 31.1692H71.6162C71.6582 30.7631 71.6863 30.3571 71.6863 29.965V28.7468C71.6863 25.8763 71.2796 23.2859 70.4663 20.9895C69.6529 18.6931 68.503 16.7468 67.0166 15.1225H67.0306ZM43.0651 25.8763C43.1632 24.4621 43.5278 23.1459 44.1589 21.8997C44.7759 20.6954 45.5892 19.6033 46.5849 18.6791C47.5665 17.769 48.7304 17.0548 50.0626 16.5228C51.3948 15.9907 52.8252 15.7246 54.3397 15.7246C56.0084 15.7246 57.4528 15.9907 58.7009 16.5228C59.9349 17.0548 60.9726 17.783 61.814 18.6791C62.6554 19.5893 63.2864 20.6674 63.7071 21.8997C64.1418 23.1319 64.3802 24.4621 64.4223 25.8763H43.0651ZM31.2576 19.0432C31.7905 20.8075 32.0569 22.7118 32.0569 24.7281V46.9918H24.9331V27.0805C24.9331 25.6243 24.821 24.224 24.5966 22.9218C24.3722 21.6196 23.9515 20.4434 23.3485 19.4352C22.7455 18.4271 21.9041 17.6149 20.8524 17.0128C19.7866 16.4107 18.4264 16.1027 16.7577 16.1027C13.925 16.1027 11.6112 17.1809 9.83022 19.3232C8.03526 21.4656 7.13778 24.3361 7.13778 27.9207V47.0058H0V11.1179H6.74513C6.74513 11.1179 6.28237 17.979 6.74513 17.0128C7.20789 16.0607 8.04928 15.1505 8.83458 14.3244C9.61987 13.4842 10.5174 12.7561 11.527 12.126C12.5367 11.4959 13.6585 11.0058 14.8645 10.6558C16.0705 10.3057 17.3326 10.1237 18.6508 10.1237C20.9786 10.1237 22.9699 10.5158 24.6387 11.2859C26.3074 12.07 27.6957 13.1202 28.8035 14.4224C29.9114 15.7386 30.7387 17.2789 31.2716 19.0432H31.2576ZM82.7786 11.1039H91.7394V16.5368H82.7786V35.5799C82.7786 37.7363 83.1853 39.2905 83.9846 40.2147C84.7839 41.1389 86.074 41.6149 87.8409 41.6149C88.5 41.6149 89.2012 41.5449 89.9725 41.4049C90.6175 41.2929 91.1925 41.1109 91.7394 40.8868V46.7678C91.0102 46.9918 90.2529 47.1879 89.4115 47.3279C88.3738 47.5099 87.294 47.5939 86.1862 47.5939C82.8066 47.5939 80.2124 46.6558 78.4174 44.7935C76.6224 42.9172 75.725 40.1167 75.725 36.3921V0H82.7646V11.1039H82.7786ZM183.577 15.4306C181.838 13.7643 179.777 12.4621 177.407 11.5239C175.037 10.5858 172.485 10.1237 169.75 10.1237C167.016 10.1237 164.477 10.5858 162.107 11.5239C159.724 12.4621 157.676 13.7503 155.965 15.4306C154.255 17.0969 152.894 19.0712 151.913 21.3816C150.931 23.6779 150.44 26.2124 150.44 28.9848C150.44 31.7573 150.931 34.3057 151.913 36.6301C152.894 38.9545 154.241 40.9568 155.965 42.6511C157.69 44.3314 159.724 45.6476 162.107 46.5858C164.477 47.5239 167.03 47.986 169.75 47.986C172.471 47.986 175.023 47.5239 177.407 46.5858C179.791 45.6476 181.838 44.3454 183.577 42.6511C185.316 40.9568 186.69 38.9545 187.672 36.6301C188.653 34.3057 189.144 31.7573 189.144 28.9848C189.144 26.2124 188.653 23.6779 187.672 21.3816C186.69 19.0852 185.33 17.1109 183.577 15.4306ZM180.913 33.9137C180.38 35.4679 179.608 36.8541 178.599 38.0583C177.589 39.2625 176.327 40.2287 174.841 40.9288C173.354 41.6289 171.629 41.993 169.708 41.993C167.787 41.993 166.076 41.6429 164.576 40.9288C163.075 40.2287 161.827 39.2625 160.817 38.0583C159.794 36.8541 159.022 35.4679 158.49 33.9137C157.957 32.3594 157.69 30.7211 157.69 29.0128C157.69 27.3046 157.957 25.6663 158.49 24.112C159.022 22.5578 159.794 21.1855 160.817 19.9953C161.827 18.8051 163.089 17.867 164.576 17.1669C166.062 16.4667 167.787 16.1027 169.708 16.1027C171.629 16.1027 173.34 16.4527 174.841 17.1669C176.327 17.867 177.589 18.8191 178.599 19.9953C179.622 21.1855 180.38 22.5438 180.913 24.112C181.445 25.6803 181.712 27.3046 181.712 29.0128C181.712 30.7211 181.445 32.3594 180.913 33.9137ZM210.501 10.1237C211.455 10.1237 212.282 10.2077 212.983 10.3617V17.0128C211.974 16.7748 210.894 16.6488 209.744 16.6488C208.033 16.6488 206.533 16.9568 205.285 17.5869C204.009 18.217 202.971 19.0712 202.144 20.1214C201.302 21.1855 200.685 22.4037 200.278 23.79C199.872 25.1762 199.675 26.6324 199.675 28.1447V46.9918H192.552V11.1179H199.297V17.1669C200.307 15.0385 202.003 13.3442 203.953 12.056C205.902 10.7678 208.075 10.1237 210.515 10.1237H210.501ZM223.655 0V46.9918H216.531V0H223.655ZM151.113 11.1039L139.222 46.9918H131.803L122.941 20.0373H122.787L113.994 46.9918H106.562L94.6001 11.1039H102.327L110.516 38.7445L119.155 11.1039H126.657L135.449 38.7445L143.625 11.1039H151.127H151.113ZM232.462 29.1669L247.438 47.0058H238.632L223.655 29.1669L238.814 11.1039H247.621L232.462 29.1669Z" fill="#016EAF"/>
  </svg>
);

interface SidebarItem {
  label: string;
  id: string;
  path?: string;
  icon: any;
  items?: { label: string; path: string }[];
  tooltip?: string;
}

const OVERVIEW: SidebarItem[] = [
  { label: 'Dashboard', id: 'dashboard', path: '/dashboard', icon: PieChart },
  { label: 'Analytics', id: 'analytics', path: '/dashboard/reports/analytics', icon: BarChart },
  { 
    label: 'Reports', 
    id: 'reports', 
    icon: TrendingUp, 
    items: [
      { label: 'Order Report', path: '/dashboard/reports/payments' },
      { label: 'Split Bill Report', path: '/dashboard/reports/split-bills' },
      { label: 'Tips Report', path: '/dashboard/reports/tips-and-charges' },
      { label: 'Staff Performance', path: '/dashboard/reports/staff-performance' },
    ] 
  },
];

const MANAGEMENT: SidebarItem[] = [
  {
    label: 'Catalog',
    id: 'catalog',
    icon: Briefcase,
    items: [
        { label: 'Categories', path: '/dashboard/catalog/categories' },
        { label: 'Products', path: '/dashboard/products' },
        { label: 'Variations', path: '/dashboard/catalog/variations' },
        { label: 'Properties', path: '/dashboard/catalog/properties' },
        { label: 'Combo Groups', path: '/dashboard/catalog/combo-groups' },
    ],
  },
  {
    label: 'Menu Builder',
    id: 'menu-builder',
    path: '/dashboard/menu-builder',
    icon: Palette,
    tooltip: 'Currently under construction',
  },
  {
    label: 'Operations',
    id: 'operations',
    icon: Briefcase,
    items: [{ label: 'QR Code', path: '/dashboard/operations/qr-code' }],
  },
  {
    label: 'Orders',
    id: 'orders',
    icon: ClipboardList,
    items: [{ label: 'All Orders', path: '/dashboard/orders' }],
  },
  {
    label: 'Settings',
    id: 'settings',
    icon: Settings,
    items: [{ label: 'Manage Restaurants', path: '/dashboard/categories' }],
  },
];

const CONNECTIONS: SidebarItem[] = [
  { 
    label: 'Integration', 
    id: 'integration', 
    icon: Plug, 
    items: [
      { label: 'POS', path: '/dashboard/integration/pos' },
      { label: 'Payment Gateway', path: '/dashboard/integration/payment-gateway' },
    ] 
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenus, setActiveMenu] = useState<string[]>([]);
  const [isBranchSwitcherOpen, setIsBranchSwitcherOpen] = useState(false);
  const [isBranchSearching, setIsBranchSearching] = useState(false);
  const [branchSearchQuery, setBranchSearchQuery] = useState('');
  const [activeBranch, setActiveBranch] = useState(mockBranches[0]);
  const [isBranchLoading, setIsBranchLoading] = useState(false);

  useEffect(() => {
    // Initial load from local storage
    const savedBranch = localStorage.getItem('activeBranch');
    if (savedBranch) {
      try {
        const branchData = JSON.parse(savedBranch);
        const match = mockBranches.find(b => b.id === branchData.id);
        if (match) setActiveBranch(match);
      } catch (e) {
        // Fallback to default
      }
    }

    // Sync when branch is changed from Manage Restaurant page
    const syncBranch = () => {
      setIsBranchLoading(true);
      const updatedBranch = localStorage.getItem('activeBranch');
      if (updatedBranch) {
        try {
          const branchData = JSON.parse(updatedBranch);
          const match = mockBranches.find(b => b.id === branchData.id);
          if (match) setActiveBranch(match);
        } catch (e) {}
      }
      setTimeout(() => setIsBranchLoading(false), 800);
    };

    window.addEventListener('branch-changed', syncBranch);
    return () => window.removeEventListener('branch-changed', syncBranch);
  }, []);

  useEffect(() => {
    const allGroups = [...OVERVIEW, ...MANAGEMENT, ...CONNECTIONS];
    const currentGroup = allGroups.find(group => 
      group.items?.some(sub => pathname.startsWith(sub.path))
    );
    if (currentGroup) {
      setActiveMenu([currentGroup.id]);
    }
  }, [pathname]);

  const handleMenuToggle = (menu: string) => {
    setActiveMenu((prev) => 
      prev.includes(menu) ? [] : [menu]
    );
  };

  const sortedAndFilteredBranches = useMemo(() => {
    const filtered = mockBranches.filter((branch) =>
      branch.name.toLowerCase().includes(branchSearchQuery.toLowerCase()) ||
      branch.type.toLowerCase().includes(branchSearchQuery.toLowerCase())
    );
    
    // Sort so the currently selected branch is always first
    return [...filtered].sort((a, b) => {
      if (a.id === activeBranch.id) return -1;
      if (b.id === activeBranch.id) return 1;
      return 0;
    });
  }, [branchSearchQuery, activeBranch.id]);

  const renderSidebarItem = (item: SidebarItem) => {
    const isExpanded = activeMenus.includes(item.id);
    const hasSubItems = item.items && item.items.length > 0;
    const isActiveGroup = hasSubItems && item.items.some(sub => pathname.startsWith(sub.path));

    return (
      <SidebarMenuItem key={item.id}>
        {hasSubItems ? (
          <Collapsible
            open={isExpanded}
            onOpenChange={() => handleMenuToggle(item.id)}
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                isActive={isActiveGroup}
                className={cn(
                  "w-full transition-colors",
                  isActiveGroup && "bg-sidebar-primary text-primary font-semibold"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={cn("h-4 w-4", isActiveGroup && "text-primary")} />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.label}
                    </span>
                  </div>
                  <div className="h-5 w-5 border flex items-center justify-center rounded-sm bg-background/50 group-data-[collapsible=icon]:hidden">
                    {isExpanded ? (
                      <Minus className="h-3 w-3" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                  </div>
                </div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="animate-collapsible">
              <SidebarMenuSub className="relative ml-6 border-l pl-0">
                {item.items?.map((subItem) => {
                  const isActive = pathname.startsWith(subItem.path);
                  return (
                    <SidebarMenuSubItem key={subItem.label} className="flex items-center">
                      <div className="relative flex items-center w-full h-9">
                        <div className={cn(
                          "absolute left-[-1.5px] top-1/2 -translate-y-1/2 w-[3px] h-3 rounded-full transition-colors",
                          isActive ? "bg-primary" : "bg-transparent"
                        )} />
                        <NextLink 
                          href={subItem.path} 
                          className={cn(
                            "flex-1 px-6 text-sm transition-colors",
                            isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {subItem.label}
                        </NextLink>
                      </div>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <SidebarMenuButton
            asChild
            isActive={pathname === item.path}
            tooltip={item.tooltip || item.label}
          >
            <NextLink href={item.path || '#'}>
              <item.icon />
              <span className="group-data-[collapsible=icon]:hidden">
                {item.label}
              </span>
            </NextLink>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-[45] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out pointer-events-none",
          isBranchSwitcherOpen ? "opacity-100" : "opacity-0"
        )} 
      />

      <Sidebar variant="sidebar" collapsible="icon" className="border-r">
        <SidebarHeader className="relative flex h-auto flex-col items-center justify-center gap-4 p-4 pb-2">
          <div className="flex w-full items-center justify-center">
            <div className="group-data-[collapsible=icon]:hidden">
              <EMenuIcon />
            </div>
            <div className="hidden group-data-[collapsible=icon]:block">
              <LayoutDashboard className="h-6 w-6" />
            </div>
          </div>

        </SidebarHeader>

        <SidebarContent className="p-0 pb-4">
          <SidebarGroup id="sidebar-nav">
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden uppercase tracking-wider text-[10px] font-bold">
              Overview
            </SidebarGroupLabel>
            <SidebarMenu>
              {OVERVIEW.map(renderSidebarItem)}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarSeparator className="mx-4 my-4 group-data-[collapsible=icon]:hidden opacity-50" />

          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden uppercase tracking-wider text-[10px] font-bold">
              Management
            </SidebarGroupLabel>
            <SidebarMenu>
              {MANAGEMENT.map(renderSidebarItem)}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarSeparator className="mx-4 my-4 group-data-[collapsible=icon]:hidden opacity-50" />

          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden uppercase tracking-wider text-[10px] font-bold">
              Connections
            </SidebarGroupLabel>
            <SidebarMenu>
              {CONNECTIONS.map(renderSidebarItem)}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="flex flex-col gap-2 p-4 bg-[#0a1414] rounded-tl-[24px] rounded-tr-[24px] relative z-[50]">
          <div className="group-data-[collapsible=icon]:hidden" id="branch-switcher">
            <DropdownMenu 
              open={isBranchSwitcherOpen} 
              onOpenChange={(open) => {
                setIsBranchSwitcherOpen(open);
                if (!open) {
                  setIsBranchSearching(false);
                  setBranchSearchQuery('');
                }
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex h-auto w-full items-center justify-between gap-2 rounded-xl bg-[#142424] p-3 text-left text-white hover:bg-[#1a2e2e] border border-white/5 transition-all shadow-xl",
                    isBranchLoading && "animate-pulse"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <TooltipProvider>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <div className="relative shrink-0 cursor-pointer">
                            <div 
                              className="h-11 w-11 rounded-full p-[2px] flex items-center justify-center transition-transform hover:scale-105"
                              style={{ background: 'conic-gradient(from 0deg, #016EAF, #3b82f6, #60a5fa, #016EAF)' }}
                            >
                              <div className="h-full w-full rounded-full bg-[#142424] p-[1.5px] flex items-center justify-center overflow-hidden">
                                {isBranchLoading ? (
                                  <Loader2 className="h-5 w-5 text-[#18B4A6] animate-spin" />
                                ) : (
                                  <Image
                                    src="https://picsum.photos/seed/brand/100/100"
                                    width={40}
                                    height={40}
                                    alt="Brand logo"
                                    className="rounded-full object-cover grayscale brightness-110"
                                  />
                                )}
                              </div>
                            </div>
                            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-[#142424]"></span>
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-[#18B4A6] text-white border-0 font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl">
                          Check the live menu
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-[11px] font-black uppercase tracking-[0.18em] text-[#18B4A6]">
                        BLOOMSBURY&apos;S
                      </span>
                      <h4 className="truncate text-[17px] font-black text-white tracking-tight leading-tight">
                        {isBranchLoading ? "Loading..." : activeBranch.name.replace("Bloomsbury's - ", "")}
                      </h4>
                    </div>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-white/40 transition-transform duration-200", isBranchSwitcherOpen && "rotate-180")} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent
                  align="start"
                  side="top"
                  className="mb-4 w-[280px] border-gray-200 bg-white text-gray-900 p-0 overflow-hidden shadow-2xl rounded-2xl animate-in slide-in-from-bottom-2 duration-300"
                >
                  <div 
                    className="p-5 border-b bg-gray-50/50 flex items-center justify-between min-h-[73px]"
                    onMouseLeave={() => {
                      setIsBranchSearching(false);
                      setBranchSearchQuery('');
                    }}
                  >
                    {!isBranchSearching ? (
                      <>
                        <DropdownMenuLabel className="p-0 text-xl font-black tracking-tight text-gray-900">Select a Branch</DropdownMenuLabel>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full hover:bg-gray-200 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsBranchSearching(true);
                          }}
                        >
                          <Search className="h-4 w-4 text-gray-500" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center w-full gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                        <Search className="h-4 w-4 text-gray-400 shrink-0" />
                        <Input
                          autoFocus
                          placeholder="Search branches..."
                          value={branchSearchQuery}
                          onChange={(e) => setBranchSearchQuery(e.target.value)}
                          className="h-9 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-400 font-bold"
                        />
                      </div>
                    )}
                  </div>
                  
                  <ScrollArea className="h-[220px]">
                    <div className="p-2">
                      {sortedAndFilteredBranches.length > 0 ? (
                        sortedAndFilteredBranches.map((branch) => (
                          <DropdownMenuItem 
                            key={branch.id} 
                            onClick={() => {
                              if (branch.id === activeBranch.id) {
                                setIsBranchSwitcherOpen(false);
                                return;
                              }

                              setActiveBranch(branch);
                              setIsBranchSwitcherOpen(false);
                              localStorage.setItem('activeBranch', JSON.stringify({
                                id: branch.id,
                                name: branch.name.replace("Bloomsbury's - ", ""),
                                type: branch.type
                              }));
                              window.dispatchEvent(new CustomEvent('branch-changed'));
                            }}
                            className={cn(
                              "cursor-pointer focus:bg-primary/5 p-3 rounded-xl flex items-center justify-between transition-all group mb-1",
                              branch.id === activeBranch.id ? "bg-primary/5 border border-primary/10" : "border border-transparent"
                            )}
                          >
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-sm text-gray-900 truncate group-hover:text-primary transition-colors">{branch.name}</span>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 truncate">{branch.type}</span>
                            </div>
                            {branch.id === activeBranch.id && (
                              <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(24,180,166,0.5)]" />
                            )}
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                          No branches found matching &quot;{branchSearchQuery}&quot;
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="p-2 bg-gray-50/80 border-t">
                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-white p-3 rounded-xl flex items-center gap-3 text-primary font-black text-sm border border-transparent hover:border-primary/20 transition-all">
                      <NextLink href="/dashboard/categories/new">
                        <PlusCircle className="h-5 w-5" />
                        <span>Add New Branch</span>
                      </NextLink>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>
          <div className="hidden group-data-[collapsible=icon]:block">
            <NextLink href="#">
              <div className="relative">
                <div 
                  className="h-9 w-9 rounded-full p-[1.5px] flex items-center justify-center"
                  style={{ background: 'conic-gradient(from 0deg, #016EAF, #3b82f6, #60a5fa, #016EAF)' }}
                >
                  <div className="h-full w-full rounded-full bg-[#142424] flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://picsum.photos/seed/brand/100/100"
                      width={32}
                      height={32}
                      alt="Restaurant logo"
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 border border-gray-800"></span>
                </span>
              </div>
            </NextLink>
          </div>

          <div className="group-data-[collapsible=icon]:hidden mt-2 border-t border-white/5 pt-2">
            <SidebarMenu className="px-0">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Help"
                  size="sm"
                  className="h-9 justify-start text-white/70 hover:text-white hover:bg-white/5 font-medium transition-colors"
                >
                  <NextLink href="#">
                    <CircleHelp className="h-4 w-4 mr-3 !text-[#18B4A6]" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Help Center
                    </span>
                  </NextLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
