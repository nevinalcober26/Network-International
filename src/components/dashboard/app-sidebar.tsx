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
  <svg width="91" height="16" viewBox="0 0 91 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M85.1907 3.8916H82.3579L87.2341 9.70188L82.4166 15.4401H85.2493L90.0668 9.70188L85.1907 3.8916Z" fill="#E54360"/>
    <path d="M21.5616 4.86442C21.0789 4.34645 20.4925 3.94558 19.8023 3.67084C19.1077 3.39609 18.3409 3.25646 17.4928 3.25646C16.6448 3.25646 15.8554 3.40509 15.1247 3.70687C14.3939 4.00864 13.7579 4.42302 13.2211 4.96351C12.6843 5.504 12.2648 6.14358 11.9626 6.90027C11.6604 7.65245 11.5115 8.46319 11.5115 9.37302C11.5115 10.2828 11.6649 11.1071 11.9716 11.8593C12.2784 12.607 12.7024 13.2465 13.2392 13.7735C13.7759 14.3005 14.4165 14.7104 15.1653 15.0031C15.9095 15.2959 16.7215 15.44 17.6011 15.44C18.625 15.44 19.5543 15.2464 20.3933 14.859C21.2323 14.4716 21.954 13.8726 22.572 13.0529L20.9616 11.7602C20.6368 12.2466 20.1903 12.661 19.6219 13.0033C19.0536 13.3456 18.3814 13.5123 17.6011 13.5123C17.0959 13.5123 16.6222 13.4267 16.1757 13.2465C15.7291 13.0709 15.3322 12.8232 14.9938 12.5079C14.651 12.1926 14.3804 11.8232 14.1774 11.3954C13.9744 10.9675 13.8662 10.5126 13.8481 10.0261H23.0366C23.0501 9.89549 23.0591 9.76487 23.0591 9.63876V9.2469C23.0591 8.32356 22.9283 7.49031 22.6667 6.75163C22.4051 6.01296 22.0352 5.38689 21.557 4.86442H21.5616ZM13.8526 8.32356C13.8842 7.86865 14.0015 7.44526 14.2045 7.0444C14.4029 6.65705 14.6646 6.30573 14.9848 6.00846C15.3006 5.71569 15.675 5.48598 16.1035 5.31483C16.532 5.14367 16.9921 5.0581 17.4793 5.0581C18.0161 5.0581 18.4807 5.14367 18.8821 5.31483C19.2791 5.48598 19.6129 5.7202 19.8835 6.00846C20.1542 6.30123 20.3572 6.64804 20.4925 7.0444C20.6323 7.44076 20.709 7.86865 20.7225 8.32356H13.8526ZM10.0545 6.12557C10.2259 6.69308 10.3117 7.30564 10.3117 7.95423V15.1157H8.02018V8.71091C8.02018 8.24249 7.98409 7.79208 7.91192 7.3732C7.83974 6.95432 7.70442 6.57597 7.51046 6.25168C7.31649 5.92739 7.04585 5.66615 6.70754 5.47247C6.36472 5.2788 5.92717 5.17971 5.39039 5.17971C4.47921 5.17971 3.73493 5.52652 3.16206 6.21565C2.58468 6.90477 2.29599 7.82811 2.29599 8.98116V15.1202H0V3.57625H2.16969C2.16969 3.57625 2.02083 5.78325 2.16969 5.47247C2.31854 5.16619 2.58919 4.87343 2.84179 4.60769C3.0944 4.33744 3.38309 4.10323 3.70787 3.90054C4.03264 3.69786 4.3935 3.54022 4.78143 3.42761C5.16936 3.31501 5.57533 3.25646 5.99934 3.25646C6.74813 3.25646 7.38867 3.38257 7.92545 3.6303C8.46223 3.88253 8.9088 4.22033 9.26515 4.63922C9.6215 5.0626 9.88764 5.55805 10.059 6.12557H10.0545ZM26.6272 3.57175H29.5096V5.31933H26.6272V11.4449C26.6272 12.1385 26.758 12.6385 27.0151 12.9358C27.2722 13.233 27.6872 13.3862 28.2556 13.3862C28.4676 13.3862 28.6931 13.3636 28.9412 13.3186C29.1487 13.2826 29.3336 13.224 29.5096 13.1519V15.0437C29.275 15.1157 29.0314 15.1788 28.7608 15.2238C28.427 15.2824 28.0796 15.3094 27.7233 15.3094C26.6362 15.3094 25.8017 15.0076 25.2243 14.4086C24.6469 13.805 24.3582 12.9042 24.3582 11.7061V0H26.6227V3.57175H26.6272ZM59.0507 4.96351C58.4913 4.42752 57.8283 4.00864 57.0659 3.70687C56.3036 3.40509 55.4827 3.25646 54.6031 3.25646C53.7234 3.25646 52.907 3.40509 52.1447 3.70687C51.3778 4.00864 50.7193 4.42302 50.1689 4.96351C49.6186 5.4995 49.1811 6.13457 48.8653 6.87775C48.5496 7.61642 48.3917 8.43166 48.3917 9.32347C48.3917 10.2153 48.5496 11.035 48.8653 11.7827C49.1811 12.5304 49.6141 13.1745 50.1689 13.7195C50.7238 14.26 51.3778 14.6833 52.1447 14.9851C52.907 15.2869 53.728 15.4355 54.6031 15.4355C55.4781 15.4355 56.2991 15.2869 57.0659 14.9851C57.8328 14.6833 58.4913 14.2645 59.0507 13.7195C59.61 13.1745 60.0521 12.5304 60.3678 11.7827C60.6836 11.035 60.8415 10.2153 60.8415 9.32347C60.8415 8.43166 60.6836 7.61642 60.3678 6.87775C60.0521 6.13908 59.6145 5.504 59.0507 4.96351ZM58.1936 10.9089C58.0222 11.4089 57.7741 11.8548 57.4494 12.2421C57.1246 12.6295 56.7186 12.9403 56.2405 13.1655C55.7623 13.3907 55.2075 13.5078 54.5895 13.5078C53.9715 13.5078 53.4212 13.3952 52.9386 13.1655C52.4559 12.9403 52.0545 12.6295 51.7297 12.2421C51.4004 11.8548 51.1523 11.4089 50.9809 10.9089C50.8095 10.409 50.7238 9.88198 50.7238 9.33248C50.7238 8.78298 50.8095 8.256 50.9809 7.75605C51.1523 7.25609 51.4004 6.81469 51.7297 6.43184C52.0545 6.049 52.4604 5.74722 52.9386 5.52202C53.4167 5.29681 53.9715 5.17971 54.5895 5.17971C55.2075 5.17971 55.7578 5.29231 56.2405 5.52202C56.7186 5.74722 57.1246 6.0535 57.4494 6.43184C57.7786 6.81469 58.0222 7.25159 58.1936 7.75605C58.365 8.26051 58.4507 8.78298 58.4507 9.33248C58.4507 9.88198 58.365 10.409 58.1936 10.9089ZM67.7114 3.25646C68.0181 3.25646 68.2843 3.28348 68.5098 3.33303V5.47247C68.185 5.3959 67.8377 5.35537 67.4678 5.35537C66.9175 5.35537 66.4348 5.45446 66.0334 5.65714C65.6229 5.85982 65.2891 6.13457 65.023 6.47238C64.7523 6.81469 64.5538 7.20655 64.423 7.65245C64.2922 8.09836 64.2291 8.56678 64.2291 9.05323V15.1157H61.9376V3.57625H64.1073V5.52202C64.432 4.8374 64.9779 4.2924 65.6049 3.87802C66.2319 3.46365 66.931 3.25646 67.7159 3.25646H67.7114ZM71.9425 0V15.1157H69.651V0H71.9425ZM48.6082 3.57175L44.7831 15.1157H42.3969L39.546 6.44536H39.4964L36.6682 15.1157H34.2775L30.4298 3.57175H32.9152L35.5495 12.4628L38.3281 3.57175H40.7414L43.5697 12.4628L46.1995 3.57175H48.6127H48.6082ZM74.7753 9.38202L79.5928 15.1202H76.76L71.9425 9.38202L76.8187 3.57175H79.6514L74.7753 9.38202Z" fill="#016EAF"/>
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
                              style={{ background: 'conic-gradient(from 0deg, #18B4A6, #4ade80, #facc15, #fb923c, #18B4A6)' }}
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
                  style={{ background: 'conic-gradient(from 0deg, #18B4A6, #4ade80, #facc15, #fb923c, #18B4A6)' }}
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
