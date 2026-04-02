import { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Shop — VELLUM Luxury Wallets',
  description: 'Browse our complete collection of premium handcrafted leather wallets.',
};

export default function ShopPage() {
  return (
    <>
      <div style={{ paddingTop: '6rem' }}>
        <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--ink)' }} />}>
          <ShopClient />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
