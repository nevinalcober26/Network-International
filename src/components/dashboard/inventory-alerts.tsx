import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { AlertTriangle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const lowStockItems = [
  { name: 'Angus Beef Patty', stock: 5 },
  { name: 'Brioche Buns', stock: 12 },
  { name: 'Truffle Aioli', stock: 2 },
];

export function InventoryAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Alerts</CardTitle>
        <CardDescription>Items running low on stock.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Only {item.stock} units left
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Reorder
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Review Full Inventory
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
