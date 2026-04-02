'use client';

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Palette } from 'lucide-react';

export default function MenuBuilderPage() {
  return (
    <>
      <DashboardHeader />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
            <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <Palette className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Menu Builder</CardTitle>
                    <CardDescription>
                        This page is currently under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        A visual editor for customizing the look and feel of your digital menu will be available here soon.
                    </p>
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
