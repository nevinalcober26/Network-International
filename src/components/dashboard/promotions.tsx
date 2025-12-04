import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Ticket } from 'lucide-react';

const promotions = [
  { name: '20% Off Burgers', code: 'BURGER20', status: 'Active' },
  { name: 'Free Drink', code: 'FREEDRINK', status: 'Active' },
  { name: 'Expired Summer Deal', code: 'SUMMER10', status: 'Expired' },
];

export function Promotions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotions & Coupons</CardTitle>
        <CardDescription>
          Create and manage promotions for your menu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {promotions.map((promo, index) => (
            <div key={index} className="flex items-center">
              <Ticket className="h-5 w-5 text-muted-foreground mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium">{promo.name}</p>
                <p className="text-xs text-muted-foreground">
                  Code: {promo.code}
                </p>
              </div>
              <Badge
                variant={promo.status === 'Active' ? 'default' : 'secondary'}
                className={
                  promo.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }
              >
                {promo.status}
              </Badge>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Promotion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
