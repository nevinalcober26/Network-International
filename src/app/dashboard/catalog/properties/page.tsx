'use client';

import { useState } from 'react';
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import type { Property } from './types';
import { PropertySheet } from './property-sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const initialPropertiesData: Omit<Property, 'id'>[] = [
  { name: 'Algae', imageUrl: null },
  { name: 'Celery', imageUrl: null },
  { name: 'Cocoa', imageUrl: 'https://picsum.photos/seed/cocoa/96' },
  { name: 'Dairy', imageUrl: 'https://picsum.photos/seed/dairy/96' },
  { name: 'Egg', imageUrl: 'https://picsum.photos/seed/egg/96' },
  { name: 'Fish', imageUrl: 'https://picsum.photos/seed/fish/96' },
  { name: 'Gluten', imageUrl: null },
  { name: 'Legume', imageUrl: null },
  { name: 'Milk', imageUrl: 'https://picsum.photos/seed/milk/96' },
  { name: 'Mushroom', imageUrl: 'https://picsum.photos/seed/mushroom/96' },
  { name: 'Nuts', imageUrl: 'https://picsum.photos/seed/nuts/96' },
  { name: 'Seeds', imageUrl: 'https://picsum.photos/seed/seeds/96' },
  { name: 'Shellfish', imageUrl: 'https://picsum.photos/seed/shellfish/96' },
  { name: 'Soy', imageUrl: 'https://picsum.photos/seed/soy/96' },
  { name: 'Vegan', imageUrl: 'https://picsum.photos/seed/vegan/96' },
  { name: 'Vegetarian', imageUrl: 'https://picsum.photos/seed/vegetarian/96' },
  { name: 'Spicy', imageUrl: 'https://picsum.photos/seed/spicy/96' },
  { name: 'Halal', imageUrl: null },
].sort((a,b) => a.name.localeCompare(b.name));

const initialProperties: Property[] = initialPropertiesData.map((p, i) => ({
  id: `prop_${i + 1}`,
  ...p,
}));


export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);
    const { toast } = useToast();

    const handleAdd = () => {
        setEditingProperty(null);
        setIsSheetOpen(true);
    }
    
    const handleEdit = (prop: Property) => {
        setEditingProperty(prop);
        setIsSheetOpen(true);
    }
    
    const handleDelete = () => {
        if (!deleteTarget) return;
        setProperties(props => props.filter(p => p.id !== deleteTarget.id));
        toast({
          variant: 'destructive',
          title: 'Property Deleted',
          description: `The "${deleteTarget.name}" property has been removed.`,
        });
        setDeleteTarget(null);
    }
    
    const handleSave = (data: Property) => {
        setProperties(props => {
            const index = props.findIndex(p => p.id === data.id);
            if (index > -1) {
                const newProps = [...props];
                newProps[index] = data;
                return newProps;
            }
            return [data, ...props].sort((a,b) => a.name.localeCompare(b.name));
        });
    }

    return (
        <>
            <DashboardHeader />
            <main className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Product Properties</h1>
                    <p className="text-muted-foreground">
                        Manage special tags for your products, like allergens or dietary needs, each with its own icon.
                    </p>
                  </div>
                  <Button onClick={handleAdd}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Property
                  </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Properties</CardTitle>
                        <CardDescription>
                            A list of all available properties in your restaurant.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Icon</TableHead>
                                    <TableHead>Property Name</TableHead>
                                    <TableHead className="text-right w-[250px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {properties.length > 0 ? (
                                    properties.map(prop => (
                                        <TableRow key={prop.id}>
                                            <TableCell>
                                                <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center border overflow-hidden">
                                                    {prop.imageUrl ? (
                                                        <Image src={prop.imageUrl} alt={prop.name} width={48} height={48} className="object-contain" />
                                                    ) : (
                                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium text-base">{prop.name}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="outline" size="sm" onClick={() => handleEdit(prop)}>
                                                        <Edit className="h-4 w-4 mr-2" /> Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/5" onClick={() => setDeleteTarget(prop)}>
                                                        <Trash className="h-4 w-4 mr-2" /> Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            No properties found. Get started by adding a new one.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
            
            <PropertySheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                property={editingProperty}
                onSave={handleSave}
            />
            
            <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the <strong>{deleteTarget?.name}</strong> property.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
