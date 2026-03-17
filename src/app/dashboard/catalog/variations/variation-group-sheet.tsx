'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Trash } from 'lucide-react';
import type { VariationGroup } from './types';
import { useToast } from '@/hooks/use-toast';

const variationGroupSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  options: z.array(z.object({
    value: z.string().min(1, 'Option value cannot be empty'),
  })).min(1, 'At least one option is required'),
});

type VariationGroupFormValues = z.infer<typeof variationGroupSchema>;

interface VariationGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: VariationGroup | null;
  onSave: (data: VariationGroup) => void;
}

export function VariationGroupSheet({ open, onOpenChange, group, onSave }: VariationGroupSheetProps) {
  const { toast } = useToast();
  const form = useForm<VariationGroupFormValues>({
    resolver: zodResolver(variationGroupSchema),
    defaultValues: {
      name: '',
      options: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  });

  useEffect(() => {
    if (group) {
      form.reset({
        name: group.name,
        options: group.options.map(opt => ({ value: opt.value })),
      });
    } else {
      form.reset({
        name: '',
        options: [{ value: '' }],
      });
    }
  }, [group, form]);

  const onSubmit = (data: VariationGroupFormValues) => {
    const finalData: VariationGroup = {
      id: group?.id || `group_${Date.now()}`,
      name: data.name,
      options: data.options.map((opt, i) => ({
        id: group?.options[i]?.id || `opt_${Date.now()}_${i}`,
        value: opt.value,
      })),
    };

    onSave(finalData);
    toast({
      title: group ? 'Group Updated' : 'Group Created',
      description: `Variation group "${finalData.name}" has been saved.`,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full">
        <SheetHeader>
          <SheetTitle>{group ? 'Edit' : 'Add'} Variation Group</SheetTitle>
          <SheetDescription>
            Manage variation options that can be applied to products.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-[calc(100%-4rem)]">
            <ScrollArea className="flex-grow p-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Size, Color, Doneness" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <FormLabel>Options</FormLabel>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`options.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Input placeholder={`Option ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ value: '' })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>
              </div>
            </ScrollArea>
            <SheetFooter className="p-6 border-t bg-background">
                <SheetClose asChild><Button variant="ghost">Cancel</Button></SheetClose>
                <Button type="submit">Save Group</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
