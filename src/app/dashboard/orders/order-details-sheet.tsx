'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Calendar as CalendarIcon,
  CreditCard,
  User,
  Info,
  Printer,
} from 'lucide-react';
import type { Order } from './types';
import { getStatusBadgeVariant } from './utils';

interface OrderDetailsSheetProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsSheet({
  order,
  open,
  onOpenChange,
}: OrderDetailsSheetProps) {
  if (!order) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b bg-muted/50">
            <SheetTitle className="text-2xl">Order {order.orderId}</SheetTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{order.orderDate}</span>
            </div>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {order.customerName !== 'Guest' ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage
                      src={order.customerAvatar}
                      alt={order.customerName}
                      data-ai-hint="person face"
                    />
                    <AvatarFallback>
                      {order.customerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customerEmail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground pt-4">
                    No customer details provided for this order.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Branch</span>
                  <span>{order.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Table</span>
                  <span>{order.table}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Type</span>
                  <Badge
                    variant={
                      order.orderType === 'Prepaid' ? 'secondary' : 'outline'
                    }
                  >
                    {order.orderType}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Status</span>
                  <Badge variant={getStatusBadgeVariant(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment State</span>
                  <Badge variant={getStatusBadgeVariant(order.paymentState)}>
                    {order.paymentState}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Items Ordered ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-mono">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (0%)</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span>$0.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>Paid</span>
                    <span>${order.paidAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-red-600">
                    <span>Pending</span>
                    <span>
                      $
                      {(order.totalAmount - order.paidAmount).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Separator className="my-4" />
                <h4 className="font-semibold mb-3">Payment History</h4>
                {order.paymentState === 'Partial' &&
                  order.payments.length > 1 && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Payment has been split by {order.payments.length} guests.
                    </p>
                  )}
                <div className="space-y-4">
                  {order.payments.length > 0 ? (
                    order.payments.map((payment, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-grow">
                          <p className="font-medium">
                            Paid ${payment.amount} via {payment.method}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {payment.guestName} - {payment.date}
                          </p>
                        </div>
                        <Badge variant="default">Success</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No payments have been made for this order yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <SheetFooter className="p-6 border-t bg-background flex-row justify-between w-full">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Print Receipt
            </Button>
            <SheetClose asChild>
              <Button variant="secondary">Close</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
