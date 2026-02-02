'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DashboardPageSkeleton } from '@/components/dashboard/skeletons';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This code runs only on the client-side
    try {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!loggedIn) {
        router.push('/');
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      // If localStorage is not available or throws an error, redirect to login
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <DashboardPageSkeleton />;
  }

  if (!isAuthenticated) {
    // This will show a blank screen briefly during redirection
    return null;
  }

  return <>{children}</>;
}
