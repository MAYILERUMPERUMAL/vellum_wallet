import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { SearchProvider } from '@/context/SearchContext';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchOverlay from '@/components/layout/SearchOverlay';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'VELLUM — Luxury Leather Wallets',
  description: 'Premium handcrafted leather wallets. Rooted in Chennai, loved worldwide.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <SearchProvider>
            <AnnouncementBar />
            <Header />
            <SearchOverlay />
            <CartDrawer />
            <main>{children}</main>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
