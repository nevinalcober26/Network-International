import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatCardData = {
  title: string;
  value: string;
  change?: string;
  changeDescription?: string;
  icon: React.ElementType;
  color: string;
};

function StatCard({ title, value, change, changeDescription, icon: Icon, color }: StatCardData) {
  return (
    <Card className="relative shadow-sm">
      <div className={cn("absolute right-0 top-0 bottom-0 w-1 rounded-r-lg", `bg-${color}-400`)} />
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          { (change || changeDescription) &&
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              {change && <TrendingUp className={cn("h-4 w-4 mr-1", change.startsWith('+') ? 'text-green-500' : 'text-red-500')} />}
              {change && <span className={cn("font-semibold", change.startsWith('+') ? 'text-green-500' : 'text-red-500')}>{change}</span>}
              <span className="ml-1">{changeDescription}</span>
            </div>
          }
        </div>
        <div className={cn("p-3 rounded-full", `bg-${color}-100`)}>
            <Icon className={cn("h-6 w-6", `text-${color}-600`)}/>
        </div>
      </CardContent>
    </Card>
  );
}


export function StatCards({ cards }: { cards: StatCardData[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
