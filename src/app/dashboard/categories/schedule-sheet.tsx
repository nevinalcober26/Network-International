'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import type { Column, Item, ScheduleRule } from './types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const scheduleSchema = z.object({
  weekday: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Everyday']),
  allDay: z.boolean().default(false),
  from: z.string().optional(),
  to: z.string().optional(),
  disableOrder: z.boolean().default(false),
}).refine(data => data.allDay || (data.from && data.to), {
    message: "Start and end times are required if 'All Day' is not checked.",
    path: ['from'],
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface CategoryScheduleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Column | Item | null;
  onSave: (id: UniqueIdentifier, schedules: ScheduleRule[]) => void;
}

const weekdays: ScheduleFormValues['weekday'][] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Everyday'
];

const timeToMinutes = (timeStr: string): number => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 0;
    return hours * 60 + minutes;
};

export function CategoryScheduleSheet({
  open,
  onOpenChange,
  category,
  onSave,
}: CategoryScheduleSheetProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [schedules, setSchedules] = useState<ScheduleRule[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        setCurrentTime(format(new Date(), 'EEEE, do MMMM yyyy h:mm a'));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [open]);

  useEffect(() => {
    if (category?.schedules) {
      setSchedules(category.schedules);
    } else {
      setSchedules([]);
    }
  }, [category]);
  
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      weekday: 'Monday',
      allDay: false,
      from: '09:00',
      to: '17:00',
      disableOrder: false,
    },
  });

  const handleAddHours = (values: ScheduleFormValues) => {
    const newRule: ScheduleRule = {
      id: `sch_${Date.now()}`,
      ...values,
      from: values.allDay ? undefined : values.from,
      to: values.allDay ? undefined : values.to,
    };
    setSchedules(prev => [...prev, newRule]);
    toast({
        title: "Rule Added",
        description: `A new display rule for ${values.weekday} has been added.`
    })
    form.reset();
  };
  
  const handleDeleteRule = (id: string) => {
    setSchedules(prev => prev.filter(rule => rule.id !== id));
  };
  
  const handleSaveChanges = () => {
    if (category) {
        onSave(category.id, schedules);
    }
    onOpenChange(false);
  }

  const allDay = form.watch('allDay');

  // Group schedules by weekday for display
  const displayHours = weekdays.slice(0, 7).map(day => {
    const daySchedules = schedules.filter(s => s.weekday === day || s.weekday === 'Everyday');
    return { day, schedules: daySchedules };
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-4xl w-full p-0">
        <div className="flex flex-col h-full">
            <SheetHeader className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <div>
                        <SheetTitle className="text-xl mb-1">Schedule Category: {category?.name}</SheetTitle>
                        <p className="text-sm text-muted-foreground">Currently: {currentTime}. <span className="font-semibold text-green-600">Displaying</span></p>
                    </div>
                </div>
            </SheetHeader>
            <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-muted/30">
                <Card className="self-start shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-primary text-lg">Add Restrictions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(handleAddHours)} className="space-y-6">
                            <div className="space-y-2">
                                <Label>Weekday*</Label>
                                <Select onValueChange={(val) => form.setValue('weekday', val as ScheduleFormValues['weekday'])} defaultValue={form.getValues('weekday')}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {weekdays.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox id="allDay" checked={allDay} onCheckedChange={(checked) => form.setValue('allDay', !!checked)} />
                                <Label htmlFor="allDay" className="font-normal cursor-pointer">All Day</Label>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="from">From Hour*</Label>
                                    <Input id="from" type="time" disabled={allDay} {...form.register('from')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="to">To Hour*</Label>
                                    <Input id="to" type="time" disabled={allDay} {...form.register('to')} />
                                </div>
                            </div>
                             {form.formState.errors.from && <p className="text-sm text-destructive">{form.formState.errors.from.message}</p>}


                            <div className="flex items-start space-x-3 pt-2">
                                <Checkbox id="disableOrder" {...form.register('disableOrder')} className="mt-1" />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="disableOrder" className="font-normal cursor-pointer">Disable Order</Label>
                                    <p className="text-sm text-muted-foreground">If checked, this category will be displayed, but ordering will be disabled during these hours.</p>
                                </div>
                            </div>
                            
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Add Hours</Button>
                        </form>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-primary text-lg">Menu - Display Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TooltipProvider>
                            <div className="space-y-6">
                                {displayHours.map(({ day, schedules }) => {
                                    const allDayUnavailable = schedules.some(s => s.allDay);
                                    
                                    return (
                                        <div key={day} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold text-card-foreground">{day}</p>
                                                {allDayUnavailable ? (
                                                    <span className="text-xs font-medium text-red-600">Unavailable All Day</span>
                                                ) : schedules.length === 0 ? (
                                                    <span className="text-xs font-medium text-green-600">Available All Day</span>
                                                ) : (
                                                     <span className="text-xs font-medium text-yellow-600">Partially Available</span>
                                                )}
                                            </div>
                                            <div className="relative w-full">
                                                <div className="h-6 w-full rounded-full bg-green-100 overflow-hidden relative">
                                                    {allDayUnavailable ? (
                                                        <div className="absolute inset-0 bg-red-200" />
                                                    ) : (
                                                        schedules.map(rule => {
                                                            if (!rule.from || !rule.to) return null;
                                                            const fromMinutes = timeToMinutes(rule.from);
                                                            const toMinutes = timeToMinutes(rule.to);
                                                            const left = (fromMinutes / 1440) * 100;
                                                            const width = Math.max(0, ((toMinutes - fromMinutes) / 1440) * 100);

                                                            return (
                                                                <Tooltip key={rule.id} delayDuration={100}>
                                                                    <TooltipTrigger asChild>
                                                                        <div
                                                                            className={cn("absolute h-full", rule.disableOrder ? "bg-yellow-300" : "bg-red-300")}
                                                                            style={{ left: `${left}%`, width: `${width}%` }}
                                                                        />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="font-semibold">Unavailable: {rule.from} - {rule.to}</p>
                                                                        {rule.disableOrder && <p className="text-sm text-muted-foreground">Ordering will be disabled</p>}
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1 -mx-1">
                                                    <span>12am</span>
                                                    <span>6am</span>
                                                    <span>12pm</span>
                                                    <span>6pm</span>
                                                    <span>12am</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </TooltipProvider>
                    </CardContent>
                </Card>
            </div>
            <SheetFooter className="p-4 border-t flex justify-end bg-background">
                 <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
                 <Button onClick={handleSaveChanges}>Save Changes</Button>
            </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
