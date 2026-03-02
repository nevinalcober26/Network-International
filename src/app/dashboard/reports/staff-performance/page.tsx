'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  BarChart as RechartsBarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Info,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  WalletCards,
  HandCoins,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { StatCardData } from '@/components/dashboard/stat-cards';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { subDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';

import type { Order } from '@/app/dashboard/orders/types';
import { mockDataStore } from '@/lib/mock-data-store';
import { OrdersPageSkeleton } from '@/components/dashboard/skeletons';

type Transaction = {
  id: string;
  orderId: string;
  timestamp: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid' | 'Refunded';
  paymentMethod: string;
  payers: number;
  branch: 'Ras Al Khaimah' | 'Dubai Mall' | string;
  table: string;
  splitMethod?: 'Equal' | 'Item-based' | 'Custom';
  lastPaymentAttempt: number;
  closeType: 'Auto' | 'Manual';
  staffName: string;
  tipAmount?: number;
  tipType?: 'Preset' | 'Custom';
  serviceChargeAmount?: number;
};

const generateTransactionsFromOrders = (orders: Order[]): Transaction[] => {
    return orders.map(order => {
        const paymentStatusMap = {
            'Fully Paid': 'Paid',
            'Partial': 'Partial',
            'Unpaid': 'Unpaid',
            'Voided': 'Unpaid',
            'Returned': 'Refunded',
        };

        const tipAmount = order.payments.reduce((acc, p) => acc + (p.tip || 0), 0);

        return {
            id: `txn_${order.orderId.replace('#', '')}`,
            orderId: order.orderId,
            timestamp: order.orderTimestamp,
            totalAmount: order.totalAmount,
            paidAmount: order.paidAmount,
            outstandingAmount: order.totalAmount - order.paidAmount,
            paymentStatus: paymentStatusMap[order.paymentState] as Transaction['paymentStatus'] || 'Unpaid',
            paymentMethod: order.payments[0]?.method || 'Credit Card',
            payers: order.payments.length > 0 ? order.payments.length : 1,
            branch: order.branch,
            table: order.table,
            splitMethod: order.splitType === 'equally' ? 'Equal' : order.splitType === 'byItem' ? 'Item-based' : undefined,
            lastPaymentAttempt: order.orderTimestamp + Math.random() * 3600000,
            closeType: Math.random() > 0.5 ? 'Auto' : 'Manual',
            staffName: order.staffName,
            tipAmount: tipAmount > 0 ? tipAmount : undefined,
            tipType: 'Custom',
            serviceChargeAmount: Math.random() > 0.5 ? order.totalAmount * 0.1 : undefined,
        };
    });
};

const osDistributionData = [
  { name: 'iOS', value: 52, color: '#14b8a6' },
  { name: 'Android', value: 38, color: '#3b82f6' },
  { name: 'macOS', value: 6, color: '#f59e0b' },
  { name: 'Windows', value: 4, color: '#ef4444' },
];

const webEntryData = [
  { name: 'Safari', value: 62, color: '#14b8a6' },
  { name: 'Chrome', value: 38, color: '#3b82f6' },
  { name: 'Firefox', value: 6, color: '#f59e0b' },
  { name: 'Edge', value: 4, color: '#ef4444' },
];

const paymentPulseConfig = {
  Paid: { label: 'Paid' },
  Partial: { label: 'Partial' },
  Pending: { label: 'Pending' },
  Failed: { label: 'Failed' },
};
const volumeConfig = { value: { label: 'Orders', color: '#14b8a6' } };
const revenueConfig = { value: { label: 'Revenue', color: '#14b8a6' } };
const osConfig = {
  iOS: { label: 'iOS' },
  Android: { label: 'Android' },
  macOS: { label: 'macOS' },
  Windows: { label: 'Windows' },
};
const webEntryConfig = {
  Safari: { label: 'Safari' },
  Chrome: { label: 'Chrome' },
  Firefox: { label: 'Firefox' },
  Edge: { label: 'Edge' },
};

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [branchFilter, setBranchFilter] = useState('all');

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
        const mockOrders = mockDataStore.orders;
        const mockTransactions = generateTransactionsFromOrders(mockOrders);
        setTransactions(mockTransactions);
        setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let daysToSubtract = 7;
    if (timeRange === '30d') daysToSubtract = 30;
    if (timeRange === '90d') daysToSubtract = 90;
    
    const startDate = subDays(now, daysToSubtract - 1);
    const dateRange = { from: startOfDay(startDate), to: endOfDay(now) };

    return transactions.filter(t => {
        const transactionDate = new Date(t.timestamp);
        const matchesDate = isWithinInterval(transactionDate, dateRange);
        const matchesBranch = branchFilter === 'all' || t.branch === branchFilter;
        return matchesDate && matchesBranch;
    });
  }, [transactions, timeRange, branchFilter]);

  const kpiData: StatCardData[] = useMemo(() => {
    const totalOrders = filteredTransactions.length;
    const totalRevenue = filteredTransactions.reduce((acc, t) => acc + t.totalAmount, 0);
    const pendingAmount = filteredTransactions.reduce((acc, t) => acc + t.outstandingAmount, 0);
    const billPaid = filteredTransactions.reduce((acc, t) => acc + t.paidAmount, 0);
    const tipsCollected = filteredTransactions.reduce((acc, t) => acc + (t.tipAmount || 0), 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    return [
        {
            title: 'Total Orders',
            value: totalOrders.toLocaleString(),
            icon: ShoppingCart,
            color: 'teal',
            changeDescription: `Last ${timeRange.replace('d', '')} days`,
        },
        {
            title: 'Average Order Value',
            value: `AED ${avgOrderValue.toFixed(2)}`,
            icon: DollarSign,
            color: 'orange',
            changeDescription: `Last ${timeRange.replace('d', '')} days`,
        },
        {
            title: 'Pending Amount',
            value: `AED ${pendingAmount.toFixed(2)}`,
            icon: AlertTriangle,
            color: 'pink',
            changeDescription: 'from open orders',
        },
        {
            title: 'Bill Paid',
            value: `AED ${billPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: WalletCards,
            color: 'green',
            changeDescription: `Last ${timeRange.replace('d', '')} days`,
        },
        {
            title: 'Tips Collected',
            value: `AED ${tipsCollected.toFixed(2)}`,
            icon: HandCoins,
            color: 'purple',
            changeDescription: `Last ${timeRange.replace('d', '')} days`,
        },
    ];
  }, [filteredTransactions, timeRange]);
  
  const { paymentPulseData, totalPayments, successRate, volumeData, revenueData, totalVolume, totalGrossRevenue } = useMemo(() => {
    const pulseData: Record<string, number> = { 'Paid': 0, 'Partial': 0, 'Pending': 0, 'Failed': 0 };
    filteredTransactions.forEach(t => {
      let status = t.paymentStatus;
      if (status === 'Unpaid') status = 'Pending';
      if(status === 'Paid' || status === 'Partial' || status === 'Pending' || status === 'Failed') {
        pulseData[status] = (pulseData[status] || 0) + 1;
      }
    });
    
    const paymentPulseData = [
      { name: 'Paid', value: pulseData['Paid'], color: '#14b8a6' },
      { name: 'Partial', value: pulseData['Partial'], color: '#f59e0b' },
      { name: 'Pending', value: pulseData['Pending'], color: '#f59e0b' },
      { name: 'Failed', value: pulseData['Failed'], color: '#ef4444' },
    ];
    
    const totalPayments = paymentPulseData.reduce((acc, item) => acc + item.value, 0);
    const successRateNum = totalPayments > 0 ? ((pulseData['Paid'] / totalPayments) * 100) : 0;
    const successRate = successRateNum.toFixed(0);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const volData: { [key: string]: number } = { Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0, Sun:0 };
    const revData: { [key: string]: number } = { Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0, Sun:0 };
    
    filteredTransactions.forEach(t => {
        const dayIndex = new Date(t.timestamp).getDay();
        const dayName = days[(dayIndex + 6) % 7];
        volData[dayName] = (volData[dayName] || 0) + 1;
        revData[dayName] = (revData[dayName] || 0) + t.totalAmount;
    });

    const volumeData = days.map(day => ({ name: day, value: volData[day] }));
    const revenueData = days.map(day => ({ name: day, value: revData[day] }));

    const totalVolume = volumeData.reduce((sum, item) => sum + item.value, 0);
    const totalGrossRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
    
    return { paymentPulseData, totalPayments, successRate, volumeData, revenueData, totalVolume, totalGrossRevenue };
}, [filteredTransactions]);

  if (isLoading) {
      return <OrdersPageSkeleton view="list"/>
  }

  return (
    <>
      <DashboardHeader />
      <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-muted/30 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Monitor your outlet's real-time performance, track sales trends, and analyze customer payment behavior.
            </p>
          </div>

          {/* Filter Bar */}
          <Card className="p-4 mb-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground px-1">OUTLET</Label>
                    <Select value={branchFilter} onValueChange={setBranchFilter}>
                        <SelectTrigger className="w-[200px] bg-background border-border font-semibold">
                            <SelectValue placeholder="Select Outlet" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Outlets</SelectItem>
                            {mockDataStore.branches.map(branch => (
                              <SelectItem key={branch.id} value={branch.name}>{branch.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
                <Button variant={timeRange === '7d' ? 'default' : 'ghost'} size="sm" className={cn("shadow-sm font-semibold", timeRange === '7d' && "bg-white text-foreground hover:bg-white")} onClick={() => setTimeRange('7d')}>1W</Button>
                <Button variant={timeRange === '30d' ? 'default' : 'ghost'} size="sm" className={cn("shadow-sm font-semibold", timeRange === '30d' && "bg-white text-foreground hover:bg-white")} onClick={() => setTimeRange('30d')}>1M</Button>
                <Button variant={timeRange === '90d' ? 'default' : 'ghost'} size="sm" className={cn("shadow-sm font-semibold", timeRange === '90d' && "bg-white text-foreground hover:bg-white")} onClick={() => setTimeRange('90d')}>3M</Button>
                <div className="flex items-center gap-2 pl-4">
                  <Label htmlFor="compare-switch" className="text-xs font-semibold text-muted-foreground">COMPARE</Label>
                  <Switch id="compare-switch" />
                </div>
              </div>
            </div>
          </Card>
          
          {/* Performance Metrics */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Performance Metrics</h2>
                <span className="text-xs font-medium text-muted-foreground">LAST {timeRange.replace('d', '')} DAYS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {kpiData.map(card => (
                    <Card key={card.title} className="shadow-sm">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold text-muted-foreground">{card.title}</CardTitle>
                                <card.icon className={cn('h-5 w-5', `text-${card.color}-500`)} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{card.value}</p>
                            <p className="text-xs text-muted-foreground">{card.changeDescription}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-1">
              <Card className="h-full shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold">Payment Pulse</CardTitle>
                      <CardDescription className="text-xs">Distribution by transaction state</CardDescription>
                    </div>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <ChartContainer config={paymentPulseConfig} className="h-48 w-48 relative">
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie data={paymentPulseData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="75%" outerRadius="95%" startAngle={90} endAngle={450} paddingAngle={4}>
                        {paymentPulseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Success Rate</p>
                      <p className="text-4xl font-bold text-foreground mt-1">{successRate}%</p>
                    </div>
                  </ChartContainer>
                  <div className="w-full mt-6">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      {paymentPulseData.map(item => (
                        <div key={item.name} className="flex items-center text-sm">
                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t pt-4">
                        {paymentPulseData.map(item => (
                            <div key={`${item.name}-value`}>
                                <p className="text-xs text-muted-foreground uppercase">{item.name}</p>
                                <p className="text-lg font-bold">{item.value.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="xl:col-span-2">
                <Card className="h-full shadow-sm">
                    <CardHeader>
                         <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold">Growth Trends</CardTitle>
                                <CardDescription className="text-xs">Volume and revenue analysis</CardDescription>
                            </div>
                            <Badge variant="outline" className="text-xs">RANGE: {timeRange.replace('d', '')}D</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="font-semibold text-sm">Volume (Orders)</h3>
                                    <p className="text-xl font-bold">{totalVolume} <span className="text-xs font-semibold text-muted-foreground">UNITS</span></p>
                                </div>
                                <ChartContainer config={volumeConfig} className="h-[200px] w-full">
                                    <RechartsBarChart data={volumeData} margin={{ top: 5, right: 0, left: -20, bottom: -10 }}>
                                        <ChartTooltip
                                            cursor={{ fill: "hsl(var(--muted))" }}
                                            content={<ChartTooltipContent />}
                                        />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="var(--color-value)" />
                                    </RechartsBarChart>
                                </ChartContainer>
                            </div>
                            <div>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="font-semibold text-sm">Gross Revenue</h3>
                                    <p className="text-xl font-bold">AED <span className="text-xl font-bold">{totalGrossRevenue.toLocaleString('en-US', {maximumFractionDigits: 0})}</span></p>
                                </div>
                                <ChartContainer config={revenueConfig} className="h-[200px] w-full">
                                    <AreaChart data={revenueData} margin={{ top: 5, right: 0, left: -20, bottom: -10 }}>
                                        <defs>
                                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <ChartTooltip
                                            cursor={{ fill: "hsl(var(--muted))" }}
                                            content={<ChartTooltipContent />}
                                        />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
                                        <Area type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} fill="url(#revenueGradient)" />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </div>
                        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3 text-xs text-yellow-800">
                            <Info className="h-4 w-4 shrink-0" />
                            <p>Visualizing performance for Al Quoz within the TW window. Data is updated in real-time from your linked POS terminals.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
          
          {/* Bottom Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-sm">
                  <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                          <CardTitle className="text-base font-bold">OS Distribution</CardTitle>
                          <CardDescription className="text-xs">Breakdown of guest operating systems</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">DEVICE USAGE</Badge>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 items-center">
                      <ChartContainer config={osConfig} className="h-48 relative">
                          <PieChart>
                                <ChartTooltip
                                  cursor={false}
                                  content={<ChartTooltipContent hideLabel />}
                                />
                              <Pie data={osDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" startAngle={90} endAngle={450} paddingAngle={2}>
                                  {osDistributionData.map((entry) => (
                                      <Cell key={`cell-${entry.name}`} fill={entry.color} stroke={entry.color} />
                                  ))}
                              </Pie>
                          </PieChart>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">MOBILE</p>
                              <p className="text-xl font-bold">{osDistributionData.reduce((max, item) => item.value > max.value ? item : max, osDistributionData[0]).name}</p>
                          </div>
                      </ChartContainer>
                      <div>
                          <ul className="space-y-2 text-sm">
                              {osDistributionData.map(item => (
                                  <li key={item.name} className="flex items-center justify-between">
                                      <div className="flex items-center">
                                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                          <span>{item.name}</span>
                                      </div>
                                      <span className="font-semibold">{item.value}%</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </CardContent>
              </Card>
              <Card className="shadow-sm">
                  <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                          <CardTitle className="text-base font-bold">Web Entry</CardTitle>
                          <CardDescription className="text-xs">Breakdown of guest web browsers</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">TOP BROWSER</Badge>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 items-center">
                      <ChartContainer config={webEntryConfig} className="h-48 relative">
                          <PieChart>
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                              />
                              <Pie data={webEntryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" startAngle={90} endAngle={450} paddingAngle={2}>
                                  {webEntryData.map((entry) => (
                                      <Cell key={`cell-${entry.name}`} fill={entry.color} stroke={entry.color} />
                                  ))}
                              </Pie>
                          </PieChart>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">TOP</p>
                              <p className="text-xl font-bold">{webEntryData.reduce((max, item) => item.value > max.value ? item : max, webEntryData[0]).name}</p>
                          </div>
                      </ChartContainer>
                      <div>
                          <ul className="space-y-2 text-sm">
                              {webEntryData.map(item => (
                                  <li key={item.name} className="flex items-center justify-between">
                                      <div className="flex items-center">
                                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                          <span>{item.name}</span>
                                      </div>
                                      <span className="font-semibold">{item.value}%</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </CardContent>
              </Card>
            </div>
        </div>
      </main>
    </>
  );
}
