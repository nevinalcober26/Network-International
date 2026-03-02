'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RotateCcw,
  ShoppingCart,
  DollarSign,
  WalletCards,
  AlertTriangle,
  Ban,
  HelpCircle,
  Smartphone,
  Laptop,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/header';
import { cn } from '@/lib/utils';
import { OrdersPageSkeleton } from '@/components/dashboard/skeletons';
import {
  isWithinInterval,
  subDays,
  endOfDay,
} from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { type DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/dashboard/reports/date-range-picker';
import type { Order } from '@/app/dashboard/orders/types';
import { mockDataStore } from '@/lib/mock-data-store';
import { OrderDetailsSheet } from '@/app/dashboard/orders/order-details-sheet';
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';


type Transaction = {
  id: string;
  orderId: string;
  timestamp: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid' | 'Refunded' | 'Voided';
  paymentMethod: string;
  payers: number;
  branch: string;
  source: 'App to App' | 'POS';
};

const generateTransactionsFromOrders = (orders: Order[]): Transaction[] => {
    return orders.map(order => {
        const paymentStatusMap = {
            'Fully Paid': 'Paid',
            'Partial': 'Partial',
            'Unpaid': 'Unpaid',
            'Voided': 'Voided',
            'Returned': 'Refunded',
        };

        return {
            id: `txn_${order.orderId.replace('#', '')}`,
            orderId: order.orderId,
            timestamp: order.orderTimestamp,
            totalAmount: order.totalAmount,
            paidAmount: order.paidAmount,
            outstandingAmount: order.totalAmount - order.paidAmount,
            paymentStatus: paymentStatusMap[order.paymentState] as Transaction['paymentStatus'] || 'Unpaid',
            paymentMethod: order.payments[0]?.method || '-',
            payers: order.payments.length > 0 ? order.payments.length : 1,
            branch: order.branch,
            source: order.source || 'App to App',
        };
    });
};


const initialFilterState = {
  dateRange: {
    from: subDays(new Date(), 29),
    to: new Date(),
  } as DateRange | undefined,
  branch: 'all',
  paymentStatus: 'all',
};

const KpiCard = ({ icon: Icon, title, value, description, color, tooltipText }: { icon: React.ElementType, title: string, value: string, description: string, color: string, tooltipText: string }) => {
    const colorClasses: Record<string, string> = {
        orange: 'border-orange-500 bg-orange-50 text-orange-600',
        pink: 'border-pink-500 bg-pink-50 text-pink-600',
        green: 'border-green-500 bg-green-50 text-green-600',
        red: 'border-red-500 bg-red-50 text-red-600',
    }
    return (
        <Card className={cn("border-l-4 shadow-sm", colorClasses[color] || 'border-gray-500')}>
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0", colorClasses[color] || 'bg-gray-50 text-gray-600')}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center gap-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
                             <TooltipProvider>
                                <Tooltip>
                                <TooltipTrigger asChild>
                                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/50 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">{tooltipText}</p>
                                </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{value}</p>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function OrderReportPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [filters, setFilters] = useState(initialFilterState);
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const mockOrders = mockDataStore.orders;
      const mockTransactions = generateTransactionsFromOrders(mockOrders);
      setTransactions(mockTransactions);
      setAllOrders(mockOrders);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.dateRange]);
  
  const handleViewDetails = (transaction: Transaction) => {
    const order = allOrders.find(o => o.orderId === transaction.orderId);
    if (order) {
        setSelectedOrder(order);
        setIsSheetOpen(true);
    } else {
        toast({
            variant: 'destructive',
            title: 'Order not found',
            description: `Details for order ${transaction.orderId} are not available.`,
        });
    }
  };

  const handleFilterChange = (
    filterName: string,
    value: string | DateRange | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setFilters(initialFilterState);
    setCurrentPage(1);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.timestamp);
      const matchesDate =
        filters.dateRange?.from && filters.dateRange?.to
          ? isWithinInterval(transactionDate, {
              start: filters.dateRange.from,
              end: endOfDay(filters.dateRange.to),
            })
          : true;
      const matchesBranch =
        filters.branch === 'all' || transaction.branch === filters.branch;
      const matchesStatus =
        filters.paymentStatus === 'all' ||
        transaction.paymentStatus === filters.paymentStatus;

      return (
        matchesDate &&
        matchesBranch &&
        matchesStatus
      );
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [transactions, filters]);

    const kpiData = useMemo(() => {
        const totalOrders = filteredTransactions.length;
        const grossSales = filteredTransactions.reduce((acc, t) => acc + t.totalAmount, 0);
        const paidAmount = filteredTransactions.reduce((acc, t) => acc + t.paidAmount, 0);
        const outstandingAmount = filteredTransactions.reduce((acc, t) => acc + t.outstandingAmount, 0);
        const voidedOrders = filteredTransactions.filter(t => t.paymentStatus === 'Voided').length;

        return [
            { title: 'Total Orders', value: totalOrders.toLocaleString(), description: 'Processed', icon: ShoppingCart, color: 'orange', tooltipText: 'Total number of orders processed within the selected period.' },
            { title: 'Gross Sales', value: `AED ${grossSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, description: 'Before Voids', icon: DollarSign, color: 'pink', tooltipText: 'Total sales value from all orders, including unpaid amounts.' },
            { title: 'Paid Amount', value: `AED ${paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, description: 'Revenue Collected', icon: WalletCards, color: 'green', tooltipText: 'Total revenue successfully collected from customers.' },
            { title: 'Outstanding', value: `AED ${outstandingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, description: 'Revenue at Risk', icon: AlertTriangle, color: 'orange', tooltipText: 'Total amount from orders that has not yet been paid.' },
            { title: 'Voided Orders', value: voidedOrders.toLocaleString(), description: 'Non-Revenue', icon: Ban, color: 'red', tooltipText: 'Total number of orders that were voided and resulted in no revenue.' },
        ]
    }, [filteredTransactions]);

  const totalPages = Math.ceil(
    filteredTransactions.length / itemsPerPage
  );
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredTransactions, currentPage]);

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    
    if (totalPages <= maxPagesToShow + 2) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);
        if (currentPage > 3) {
            pageNumbers.push('...');
        }
        
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if(currentPage <= 2){
            startPage = 2;
            endPage = 3;
        }
        
        if(currentPage >= totalPages - 1){
            startPage = totalPages - 2;
            endPage = totalPages - 1;
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        
        if (currentPage < totalPages - 2) {
            pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
    }
    
    return (
        <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {pageNumbers.map((page, index) =>
              typeof page === 'number' ? (
                <Button
                  key={index}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-2 h-8 flex items-center justify-center">...</span>
              )
            )}
             <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
        </div>
    );
};


  if (isLoading) {
    return <OrdersPageSkeleton view="list" />;
  }

  return (
    <>
      <DashboardHeader />
      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Order Report</h1>
            <p className="text-muted-foreground">
              A financial breakdown of orders, items, and payer information.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-lg border bg-card p-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">OUTLET</p>
                <Select
                value={filters.branch}
                onValueChange={(value) => handleFilterChange('branch', value)}
                >
                <SelectTrigger className="w-full sm:w-[180px] bg-background">
                    <SelectValue placeholder="Branch/Venue" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="Ras Al Khaimah">Bloomsbury's - Ras Al Khaimah</SelectItem>
                    <SelectItem value="Dubai Mall">Bloomsbury's - Dubai Mall</SelectItem>
                </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">PAYMENT STATUS</p>
                <Select
                    value={filters.paymentStatus}
                    onValueChange={(value) => handleFilterChange('paymentStatus', value)}
                >
                    <SelectTrigger className="w-full sm:w-[180px] bg-background">
                    <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Partial">Partially Paid</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                    <SelectItem value="Voided">Voided</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">REPORT PERIOD</p>
                <DateRangePicker
                dateRange={filters.dateRange}
                onDateRangeChange={(range) => handleFilterChange('dateRange', range)}
                />
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={resetAllFilters} className="self-end">
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {kpiData.map(card => <KpiCard key={card.title} {...card} />)}
        </div>

          <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Transactions Summary</CardTitle>
                        <CardDescription>
                            Order → Item → Payer financial breakdown.
                        </CardDescription>
                    </div>
                    <Badge variant="outline">{filteredTransactions.length} Entries</Badge>
                </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Paid Amount</TableHead>
                      <TableHead>Outstanding</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Payers</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTransactions.map((t) => (
                      <TableRow key={t.id} onClick={() => handleViewDetails(t)} className="cursor-pointer">
                          <TableCell className="font-medium">{t.orderId}</TableCell>
                          <TableCell>{new Date(t.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</TableCell>
                          <TableCell className="font-semibold">AED {t.totalAmount.toFixed(2)}</TableCell>
                          <TableCell className="font-semibold text-green-600">AED {t.paidAmount.toFixed(2)}</TableCell>
                          <TableCell className="font-semibold text-red-600">AED {t.outstandingAmount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                t.paymentStatus === 'Paid' ? 'default' : 
                                t.paymentStatus === 'Partial' ? 'secondary' : 
                                'destructive'
                              }
                              className={cn(
                                'capitalize font-bold',
                                t.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                                t.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              )}
                            >
                              {t.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{t.paymentMethod}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                                {t.source === 'POS' ? <Laptop className="h-4 w-4 text-muted-foreground" /> : <Smartphone className="h-4 w-4 text-muted-foreground" />}
                                {t.source}
                            </div>
                          </TableCell>
                          <TableCell>{t.payers}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
               {paginatedTransactions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No transactions found for the selected filters.
                </p>
              )}
            </CardContent>
            {totalPages > 1 && (
                <CardFooter className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                        Showing{' '}
                        <strong>
                        {filteredTransactions.length > 0
                            ? (currentPage - 1) * itemsPerPage + 1
                            : 0}
                        </strong>{' '}
                        to{' '}
                        <strong>
                        {Math.min(
                            currentPage * itemsPerPage,
                            filteredTransactions.length
                        )}
                        </strong>{' '}
                        of <strong>{filteredTransactions.length}</strong>{' '}
                        transactions
                    </div>
                    {renderPagination()}
                </CardFooter>
            )}
          </Card>
      </main>
      <OrderDetailsSheet 
        order={selectedOrder}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
