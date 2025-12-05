'use client';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
