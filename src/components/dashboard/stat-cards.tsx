import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LayoutGrid,
  Package,
  FileText,
  ShoppingCart,
  ArrowUp,
} from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
};

function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function StatCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Categories"
        value="12"
        change="+2 this month"
        icon={LayoutGrid}
      />
      <StatCard
        title="Active Products"
        value="89"
        change="+5 this week"
        icon={Package}
      />
      <StatCard title="Published Pages" value="4" icon={FileText} />
      <StatCard title="Today's Orders" value="63" icon={ShoppingCart} />
    </div>
  );
}
