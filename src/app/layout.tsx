import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider, CartProvider, OrderProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'eMenu Digital Hub',
  description: 'The central hub for managing your eMenu.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="%23016EAF"/><path d="M11 7l10 9-10 9" fill="none" stroke="%23E54360" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn('font-body antialiased', 'min-h-screen bg-background font-sans')}
        suppressHydrationWarning
      >
        <FirebaseClientProvider>
          <CartProvider>
            <OrderProvider>
              {children}
              <Toaster />
            </OrderProvider>
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
