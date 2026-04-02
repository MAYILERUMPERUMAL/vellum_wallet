'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';

interface CategoryRowProps {
  title: string;
  subtitle: string;
  products: Product[];
  category: string;
  bgAlt?: boolean;
}

export default function CategoryRow({
  title,
  subtitle,
  products,
  category,
  bgAlt = false,
}: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  };

  return (
    <section
      className="py-16"
      style={{
        background: bgAlt ? 'var(--ink2)' : 'var(--ink)',
        borderBottom: '1px solid var(--ink3)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p
              className="flex items-center gap-2 text-xs font-medium tracking-[0.32em] uppercase mb-2"
              style={{ color: 'var(--gold2)' }}
            >
              <span className="inline-block w-6 h-px" style={{ background: 'var(--gold2)' }} />
              Category
            </p>
            <h2
              className="font-[family-name:var(--font-serif)] font-light leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', color: 'var(--cream)' }}
            >
              <em className="italic" style={{ color: 'var(--gold2)' }}>{subtitle}</em>{' '}
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs tracking-widest" style={{ color: 'var(--stone)' }}>
              {products.length} wallets
            </span>
            <Link
              href={`/shop?category=${category}`}
              className="flex items-center gap-1.5 text-xs tracking-widest uppercase pb-px transition-all duration-200"
              style={{ color: 'var(--gold2)', borderBottom: '1px solid var(--gold)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '0.75rem'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '0.375rem'; }}
            >
              View All <ArrowRight size={13} />
            </Link>
            {/* Scroll buttons */}
            <div className="flex gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'var(--ink4)',
                  border: '1px solid var(--ink5)',
                  color: 'var(--mist)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink4)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--mist)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink5)';
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'var(--ink4)',
                  border: '1px solid var(--ink5)',
                  color: 'var(--mist)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink4)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--mist)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink5)';
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-2"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className="shrink-0"
              style={{ width: '270px', scrollSnapAlign: 'start' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
