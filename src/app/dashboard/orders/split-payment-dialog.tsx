
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Package, ArrowLeft, CheckCircle, Minus, Plus } from 'lucide-react';
import type { Order, OrderItem, Payment } from './types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SplitPaymentDialogProps {
  order: Order | null;
  totalWithTax: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateOrder: (updatedOrder: Order) => void;
}

// --- Internal Components for each step ---

const SelectMethodStep = ({ onSelect }: { onSelect: (method: 'equally' | 'byItem') => void }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer text-center" onClick={() => onSelect('equally')}>
            <CardContent className="p-8">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg">Split Equally</h3>
                <p className="text-sm text-muted-foreground mt-1">Divide the bill evenly among a number of people.</p>
            </CardContent>
        </Card>
        <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer text-center" onClick={() => onSelect('byItem')}>
            <CardContent className="p-8">
                <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg">Split by Item</h3>
                <p className="text-sm text-muted-foreground mt-1">Let each person pay for their specific items.</p>
            </CardContent>
        </Card>
    </div>
);

const SplitEquallyView = ({ order, totalWithTax, onBack, onUpdateOrder, onOpenChange }: Omit<SplitPaymentDialogProps, 'open' | 'order'> & { order: Order; onBack: () => void }) => {
    const { toast } = useToast();
    const [numSplits, setNumSplits] = useState(2);
    
    const amountPerPerson = numSplits > 0 ? totalWithTax / numSplits : 0;

    const handleSetupSplit = () => {
        const newPayments: Payment[] = [];
        for (let i = 0; i < numSplits; i++) {
            newPayments.push({
                amount: amountPerPerson.toFixed(2),
                guestName: `Payer ${i + 1}`,
                status: 'Pending',
                transactionId: `split_${order.orderId}_${i}_${Date.now()}`
            });
        }
    
        const updatedOrder: Order = {
            ...order,
            payments: newPayments,
            paidAmount: 0,
            paymentState: 'Unpaid',
            splitType: 'equally',
        };
    
        onUpdateOrder(updatedOrder);
        onOpenChange(false);
        toast({ title: "Split Setup", description: `Bill has been split ${numSplits} ways.` });
    };

    return (
        <div className="py-6 space-y-6 relative">
            <div className="grid grid-cols-2 gap-4 items-end">
                <div className="space-y-1.5">
                    <Label>Number of People</Label>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg"
                            onClick={() => setNumSplits(s => Math.max(2, s - 1))}
                            disabled={numSplits <= 2}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex h-10 w-16 items-center justify-center rounded-lg border bg-background text-lg font-bold">
                            {numSplits}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-lg"
                            onClick={() => setNumSplits(s => Math.min(20, s + 1))}
                            disabled={numSplits >= 20}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="text-right pb-2">
                    <p className="text-sm text-muted-foreground">Amount per person</p>
                    <p className="text-2xl font-bold font-mono">${amountPerPerson.toFixed(2)}</p>
                </div>
            </div>
            <Separator />
            <ScrollArea className="h-64">
                <div className="space-y-3 pr-4">
                    {Array.from({ length: numSplits }).map((_, index) => (
                        <Card key={index} className="p-4 flex justify-between items-center bg-card">
                            <p className="font-semibold">Payer {index + 1}</p>
                            <p className="font-mono font-semibold">${amountPerPerson.toFixed(2)}</p>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
             <DialogFooter>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button onClick={handleSetupSplit}>Setup Split</Button>
            </DialogFooter>
        </div>
    );
};

const SplitByItemView = ({ order, totalWithTax, onBack, onUpdateOrder, onOpenChange }: Omit<SplitPaymentDialogProps, 'open' | 'order'> & { order: Order; onBack: () => void }) => {
    const { toast } = useToast();
    const [payers, setPayers] = useState<{ id: number; items: Set<string> }[]>([{ id: 1, items: new Set() }]);
    const [nextPayerId, setNextPayerId] = useState(2);

    const unassignedItems = useMemo(() => {
        const assignedItemIds = new Set(payers.flatMap(p => Array.from(p.items)));
        return order.items.filter(item => !assignedItemIds.has(item.id));
    }, [payers, order.items]);

    const handleToggleItem = (payerId: number, itemId: string) => {
        setPayers(prevPayers => {
            const newPayers = prevPayers.map(p => ({ ...p, items: new Set(p.items) })); // Deep copy sets
            const itemIsAssigned = newPayers.some(p => p.items.has(itemId));

            const targetPayer = newPayers.find(p => p.id === payerId);
            if (!targetPayer) return prevPayers;

            if (itemIsAssigned) { // If item is assigned anywhere
                newPayers.forEach(p => p.items.delete(itemId)); // Remove from all payers
                if (!targetPayer.items.has(itemId)) { // If it wasn't in the target payer, add it back
                    targetPayer.items.add(itemId);
                }
            } else { // Item is unassigned
                targetPayer.items.add(itemId);
            }
            
            return newPayers.filter(p => p.items.size > 0 || p.id === 1 || newPayers.length === 1);
        });
    };

    const addPayer = () => {
        setPayers(prev => [...prev, { id: nextPayerId, items: new Set() }]);
        setNextPayerId(prev => prev + 1);
    };
    
    const handleSetupSplit = () => {
        const newPayments: Payment[] = payers
            .filter(payer => payer.items.size > 0)
            .map((payer, index) => {
                const itemsForPayer = order.items.filter(item => payer.items.has(item.id));
                const amount = itemsForPayer.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                return {
                    amount: amount.toFixed(2),
                    guestName: `Payer ${index + 1}`,
                    status: 'Pending',
                    transactionId: `split_item_${order.orderId}_${payer.id}_${Date.now()}`,
                    items: itemsForPayer.map(it => ({ name: it.name, quantity: it.quantity })),
                };
            });

        if (newPayments.length === 0) {
            toast({ variant: 'destructive', title: "No items selected", description: "Please assign items to at least one payer." });
            return;
        }

        const updatedOrder: Order = {
            ...order,
            payments: newPayments,
            paidAmount: 0,
            paymentState: 'Unpaid',
            splitType: 'byItem',
        };

        onUpdateOrder(updatedOrder);
        onOpenChange(false);
        toast({ title: "Split Setup", description: `Bill has been split by items for ${newPayments.length} payer(s).` });
    };

    return (
        <div className="py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Unassigned Items</h4>
                        <ScrollArea className="h-80">
                            <div className="space-y-2 pr-4">
                                {unassignedItems.map(item => (
                                    <div key={item.id} className="text-sm p-2 bg-card rounded-md border">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-muted-foreground font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                                {unassignedItems.length === 0 && <p className="text-sm text-muted-foreground p-2">All items assigned.</p>}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
                <div className="space-y-4">
                    {payers.map((payer, index) => {
                        const payerItems = order.items.filter(item => payer.items.has(item.id));
                        const payerTotal = payerItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

                        return (
                            <Card key={payer.id}>
                                <CardContent className="p-4">
                                    <h4 className="font-semibold mb-2">Payer {index + 1} - <span className="font-mono">${payerTotal.toFixed(2)}</span></h4>
                                    <ScrollArea className="h-40">
                                        <div className="space-y-2 pr-4">
                                            {order.items.map(item => {
                                                const isAssignedToThisPayer = payer.items.has(item.id);
                                                const isAssignedElsewhere = !isAssignedToThisPayer && payers.some(p => p.id !== payer.id && p.items.has(item.id));
                                                return (
                                                     <div key={item.id} onClick={() => handleToggleItem(payer.id, item.id)} className={cn("flex items-center gap-2 p-2 rounded-md cursor-pointer border", isAssignedToThisPayer ? 'bg-primary/10 border-primary/50' : 'bg-card', isAssignedElsewhere && 'opacity-40')}>
                                                        <Checkbox checked={isAssignedToThisPayer} />
                                                        <div className="flex-1 text-sm">
                                                            <p className="font-medium">{item.name}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        )
                    })}
                    <Button variant="outline" onClick={addPayer} className="w-full">Add Payer</Button>
                </div>
            </div>
             <DialogFooter>
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button onClick={handleSetupSplit}>Setup Split</Button>
            </DialogFooter>
        </div>
    );
};

// --- Main Dialog Component ---

export function SplitPaymentDialog({ order, totalWithTax, open, onOpenChange, onUpdateOrder }: SplitPaymentDialogProps) {
  const [step, setStep] = useState<'select' | 'equally' | 'byItem'>('select');

  useEffect(() => {
    if (open) {
      setStep('select');
    }
  }, [open]);

  const handleBack = () => setStep('select');
  
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {step !== 'select' && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            )}
            <div>
                <DialogTitle className="text-xl">Split Payment</DialogTitle>
                <DialogDescription>
                    {step === 'select' && "Choose how you want to split the bill."}
                    {step === 'equally' && `Splitting bill for Order ${order.orderId} equally.`}
                    {step === 'byItem' && `Splitting bill for Order ${order.orderId} by items.`}
                </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {step === 'select' && <SelectMethodStep onSelect={setStep} />}
        {step === 'equally' && <SplitEquallyView order={order} totalWithTax={totalWithTax} onBack={handleBack} onUpdateOrder={onUpdateOrder} onOpenChange={onOpenChange} />}
        {step === 'byItem' && <SplitByItemView order={order} totalWithTax={totalWithTax} onBack={handleBack} onUpdateOrder={onUpdateOrder} onOpenChange={onOpenChange} />}
      </DialogContent>
    </Dialog>
  );
}
