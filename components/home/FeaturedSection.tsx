'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';

interface FeaturedSectionProps {
  products: Product[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="py-20" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p
              className="flex items-center gap-2 text-xs font-medium tracking-[0.32em] uppercase mb-3"
              style={{ color: 'var(--gold2)' }}
            >
              <span className="inline-block w-6 h-px" style={{ background: 'var(--gold2)' }} />
              Best Sellers
            </p>
            <h2
              className="font-[family-name:var(--font-serif)] font-light leading-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--cream)' }}
            >
              Featured{' '}
              <em className="italic" style={{ color: 'var(--gold2)' }}>
                Collection
              </em>
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-xs tracking-widest uppercase transition-all duration-200 pb-px"
            style={{ color: 'var(--gold2)', borderBottom: '1px solid var(--gold)' }}
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>

        {/* Featured grid — bigger hero card on left */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.slice(0, 3).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              className={i === 0 ? 'md:col-span-1 lg:col-span-1' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
