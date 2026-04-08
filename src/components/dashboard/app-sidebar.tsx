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

export const EMenuIcon = ({ width = "102", height = "33", className }: { width?: string | number, height?: string | number, className?: string }) => (
  <svg width={width} height={height} viewBox="0 0 102 33" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_2170_1952)">
      <path d="M26.1924 10.3669V10.791C26.1924 10.9497 26.1924 11.0824 26.1785 11.2151H15.7449C15.7587 11.7582 15.8794 12.2629 16.1209 12.7527C16.3624 13.2438 16.6592 13.6406 17.0491 13.999C17.439 14.3437 17.8829 14.6215 18.3935 14.8348C18.9042 15.0332 19.4424 15.1262 20.0071 15.1262C20.8951 15.1262 21.661 14.9278 22.32 14.5558C22.9652 14.1713 23.4632 13.6939 23.8393 13.1508L25.6679 14.5954C24.9548 15.5106 24.1487 16.1864 23.1802 16.6241C22.2395 17.0482 21.1629 17.2603 20.0071 17.2603C18.9985 17.2603 18.098 17.1016 17.2503 16.7692C16.4026 16.4381 15.677 15.9868 15.0582 15.3903C14.4532 14.8075 13.969 14.0907 13.6194 13.2562C13.2698 12.4204 13.0811 11.4929 13.0811 10.4723C13.0811 9.45175 13.2559 8.55024 13.5917 7.68841C13.9275 6.82659 14.4256 6.11108 15.0167 5.51462C15.6216 4.91816 16.3611 4.44075 17.1811 4.10966C18.015 3.77857 18.9155 3.6062 19.8575 3.6062C20.7995 3.6062 21.6861 3.76493 22.4797 4.06998C23.2733 4.37503 23.9449 4.82516 24.4694 5.40922C25.0202 5.99204 25.4378 6.69514 25.7333 7.53093C26.0566 8.4064 26.1899 9.33395 26.1899 10.3681L26.1924 10.3669ZM23.5437 9.33395C23.5299 8.83049 23.4494 8.33943 23.2884 7.8893C23.1274 7.43917 22.8985 7.05351 22.603 6.72242C22.3074 6.39133 21.9175 6.1396 21.4597 5.93996C21.0032 5.74155 20.4788 5.64855 19.86 5.64855C19.3091 5.64855 18.7708 5.74155 18.3005 5.93996C17.8024 6.13836 17.4 6.39009 17.0227 6.72242C16.673 7.05351 16.3775 7.43793 16.1348 7.8893C15.8933 8.33943 15.7587 8.81685 15.7449 9.33395H23.5437Z" fill="#0069B1"/>
      <path d="M52.479 4.00415L49.5071 13.9865L46.2938 4.00415H43.5508L40.3915 13.9865L37.3932 4.00415H34.5697L38.9527 16.9564H41.6554L44.8688 7.23818H44.9229L48.1627 16.9564H50.8792L55.222 4.00415H52.479Z" fill="#0069B1"/>
      <path d="M69.1258 10.4474C69.1258 11.4555 68.951 12.3694 68.5875 13.2052C68.2379 14.041 67.7134 14.7565 67.0946 15.379C66.4633 15.9755 65.7099 16.4665 64.8497 16.7976C63.9756 17.1287 63.0613 17.3011 62.0526 17.3011C61.044 17.3011 60.1158 17.1287 59.2555 16.7976C58.3815 16.4665 57.6419 15.9755 57.0106 15.379C56.3792 14.7826 55.8812 14.0398 55.5316 13.2052C55.1819 12.3694 54.9933 11.4555 54.9933 10.4474C54.9933 9.43923 55.1681 8.52532 55.5316 7.70317C55.8812 6.86739 56.3792 6.16553 57.0106 5.56907C57.6419 4.97261 58.3953 4.49519 59.2555 4.1641C60.1296 3.83301 61.044 3.66064 62.0526 3.66064C63.0613 3.66064 63.9894 3.83301 64.8497 4.1641C65.7238 4.49519 66.4633 4.95897 67.0946 5.56907C67.726 6.17917 68.2379 6.89467 68.5875 7.70317C68.951 8.53896 69.1258 9.45287 69.1258 10.4474ZM66.4092 10.4598C66.4092 9.83728 66.3149 9.25322 66.1137 8.69645C65.9124 8.12603 65.6433 7.64861 65.266 7.22452C64.8899 6.80043 64.4321 6.46933 63.8813 6.19033C63.3304 5.9386 62.7116 5.80591 62.0124 5.80591C61.3131 5.80591 60.6943 5.9386 60.1435 6.19033C59.5926 6.44205 59.1348 6.78679 58.7588 7.22452C58.3827 7.66225 58.1136 8.13967 57.9111 8.69645C57.7099 9.26687 57.6155 9.84968 57.6155 10.4598C57.6155 11.0699 57.7099 11.6663 57.9111 12.2231C58.1123 12.7799 58.3815 13.297 58.7588 13.7211C59.1348 14.1452 59.5926 14.5036 60.1435 14.7553C60.6943 15.007 61.3131 15.1397 62.0124 15.1397C62.7116 15.1397 63.3304 15.007 63.8813 14.7553C64.4321 14.5036 64.8899 14.1588 65.266 13.7211C65.642 13.297 65.9112 12.7935 66.1137 12.2231C66.3287 11.6663 66.4092 11.0835 66.4092 10.4598Z" fill="#0069B1"/>
      <path d="M81.7515 -0.000244141H79.1431V16.9561H81.7515V-0.000244141Z" fill="#0069B1"/>
      <path d="M33.5331 5.96559V4.00385H30.2519V-0.000244141H27.6699V13.1243C27.6699 14.4636 28.0057 15.4705 28.6508 16.16C29.296 16.8358 30.2506 17.1681 31.4882 17.1681C31.9045 17.1681 32.2818 17.1284 32.6716 17.0751C32.981 17.0218 33.2627 16.9561 33.5193 16.8631V14.7414C33.3181 14.8207 33.103 14.874 32.8741 14.9398C32.5911 14.9931 32.3358 15.0191 32.1082 15.0191C31.463 15.0191 30.9788 14.8468 30.6833 14.5157C30.3877 14.1846 30.2531 13.6278 30.2531 12.8453V5.97799L33.5344 5.96435L33.5331 5.96559Z" fill="#0069B1"/>
      <path d="M76.9372 3.65942C76.0493 3.65942 75.2569 3.89751 74.5577 4.36253C73.8446 4.8263 73.2132 5.4364 72.8636 6.20523V4.00416H70.4036V16.9564H73.012V10.1548C73.012 9.61162 73.0925 9.08088 73.227 8.57742C73.3616 8.07397 73.6031 7.64987 73.8999 7.25182C74.1955 6.86741 74.5853 6.576 75.0431 6.33667C75.4997 6.09858 76.0518 5.99194 76.6831 5.99194C77.0994 5.99194 77.4893 6.03162 77.8666 6.12462V3.73879C77.5975 3.67306 77.3019 3.65942 76.9384 3.65942H76.9372Z" fill="#0069B1"/>
      <path d="M11.4159 6.86786C11.2147 6.23172 10.9179 5.68735 10.5154 5.19753C10.0991 4.73376 9.61493 4.3357 8.99615 4.07033C8.39121 3.79132 7.6517 3.64624 6.80403 3.64624C6.33365 3.64624 5.86328 3.69956 5.41932 3.84465C4.9892 3.97733 4.57165 4.1497 4.19561 4.37538C3.81956 4.61347 3.51017 4.86644 3.21462 5.17025C2.91907 5.46166 2.62351 5.79275 2.44869 6.13748V4.01577H0V16.968H2.60842V10.087C2.60842 8.80109 2.94422 7.75325 3.58941 6.99807C4.23459 6.2156 5.08227 5.83119 6.11733 5.83119C6.72228 5.83119 7.22032 5.95023 7.6102 6.16228C8.00008 6.37433 8.29563 6.66574 8.51069 7.03775C8.72575 7.40852 8.88674 7.82022 8.96723 8.29763C9.04772 8.76141 9.08797 9.26486 9.08797 9.7956V16.968H11.7102V8.93377C11.7102 8.19099 11.6159 7.50153 11.4147 6.86538L11.4159 6.86786Z" fill="#0069B1"/>
      <path d="M87.2901 4.00415H90.5035L84.9647 10.5268L90.423 16.9564H87.2096L81.7513 10.5268L87.2901 4.00415Z" fill="#0069B1"/>
      <path d="M96.4826 3.96143H93.2818L98.7992 10.458L93.3623 16.8628H96.5631L102 10.458L96.4826 3.96143Z" fill="#FF2E56"/>
      <path d="M69.3987 30.7437C68.5535 30.7437 67.8153 30.435 67.1839 29.8162C66.5526 29.1974 66.2369 28.3715 66.2369 27.3361C66.2369 26.3007 66.5526 25.4971 67.1839 24.8746C67.8153 24.2521 68.5535 23.9409 69.3987 23.9409C70.44 23.9409 71.2852 24.4034 71.9329 25.3297V21.3914H72.9189V30.6049H71.9329V29.2917C71.2676 30.2589 70.4224 30.7437 69.3987 30.7437ZM69.5785 29.8732C70.2187 29.8732 70.7771 29.6339 71.255 29.154C71.7329 28.6741 71.9719 28.064 71.9719 27.3237C71.9719 26.5834 71.7329 26.0006 71.255 25.5257C70.7771 25.0507 70.2187 24.8126 69.5785 24.8126C68.9384 24.8126 68.3586 25.042 67.9146 25.5009C67.4707 25.9597 67.2493 26.576 67.2493 27.3497C67.2493 28.1235 67.4757 28.7064 67.9272 29.1738C68.38 29.6413 68.9296 29.8745 69.5785 29.8745V29.8732Z" fill="#0069B1"/>
      <path d="M74.5702 22.653V21.5803H75.6971V22.653H74.5702ZM74.6343 30.6041V24.079H75.6204V30.6041H74.6343Z" fill="#0069B1"/>
      <path d="M77.3355 30.6042V24.0791H78.3216V25.2149C78.8422 24.3655 79.5968 23.9402 80.5879 23.9402C81.3727 23.9402 81.9915 24.1783 82.4442 24.6532C82.897 25.1281 83.1221 25.7618 83.1221 26.5529V30.6042H82.1361V26.7923C82.1361 26.1785 81.9764 25.6961 81.6557 25.3476C81.3362 24.9979 80.886 24.8243 80.3049 24.8243C79.7239 24.8243 79.2598 25.0141 78.8837 25.3923C78.5077 25.7705 78.3203 26.2628 78.3203 26.8692V30.6054H77.3343L77.3355 30.6042Z" fill="#0069B1"/>
      <path d="M85.234 27.7397C85.3019 28.4043 85.5559 28.9326 85.9961 29.3232C86.435 29.7151 86.9582 29.9097 87.5644 29.9097C88.358 29.9097 89.0535 29.6022 89.6509 28.9884L90.2659 29.5315C89.5239 30.3475 88.6146 30.7554 87.5393 30.7554C86.6086 30.7554 85.8263 30.438 85.1899 29.8031C84.5536 29.1682 84.2366 28.3498 84.2366 27.3478C84.2366 26.3459 84.5397 25.5919 85.1459 24.931C85.7521 24.27 86.5067 23.9402 87.4123 23.9402C88.3178 23.9402 89.1101 24.2688 89.6648 24.9248C90.2194 25.5808 90.4973 26.4054 90.4973 27.3987C90.4973 27.5251 90.4936 27.638 90.4848 27.7397H85.2365H85.234ZM85.234 26.9572H89.4962C89.4359 26.326 89.2258 25.8027 88.8624 25.3861C88.5001 24.9694 88.0071 24.7611 87.3833 24.7611C86.8199 24.7611 86.3382 24.9669 85.937 25.3799C85.5358 25.7928 85.3006 26.3186 85.2327 26.9572H85.234Z" fill="#0069B1"/>
    </g>
    <defs>
      <clipPath id="clip0_2170_1952">
        <rect width="102" height="32.9032" fill="white"/>
      </clipPath>
    </defs>
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
          <div className="flex w-full items-center justify-center mb-2">
            <div className="group-data-[collapsible=icon]:hidden">
              <EMenuIcon width="120" height="39" />
            </div>
            <div className="hidden group-data-[collapsible=icon]:block">
              <LayoutDashboard className="h-6 w-6" />
            </div>
          </div>

        </SidebarHeader>

        <SidebarContent className="p-0 pb-4">
          <SidebarGroup id="sidebar-nav">
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden uppercase tracking-wider text-[10px] font-bold mt-[10px]">
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
                                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
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
                        <TooltipContent side="right" className="bg-primary text-white border-0 font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl">
                          Check the live menu
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-[11px] font-black uppercase tracking-[0.18em] text-primary">
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
                    <CircleHelp className="h-4 w-4 mr-3 !text-primary" />
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
