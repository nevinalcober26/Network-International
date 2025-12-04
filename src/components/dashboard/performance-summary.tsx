import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUp, DollarSign, ShoppingBag } from 'lucide-react';

export function PerformanceSummary() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$15,231.89</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
            +20.1% from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$21.50</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
            +5.2% from last week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
