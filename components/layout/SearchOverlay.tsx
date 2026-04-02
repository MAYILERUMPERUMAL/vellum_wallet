'use client';

import { useEffect, useRef, useMemo } from 'react';
import { X, Search, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearch } from '@/context/SearchContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/data';

const TRENDING = ['Bifold', 'Minimal wallet', 'Leather wallet', 'Women wallets', 'RFID wallet'];
const QUICK_CATS = ['Men', 'Women', 'Leather', 'Minimal', 'Travel'];

export default function SearchOverlay() {
  const { isOpen, query, closeSearch, setQuery } = useSearch();
  const { addItem } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeSearch]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.material.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col animate-fadeIn"
      style={{ background: 'rgba(8,8,7,0.98)', backdropFilter: 'blur(24px)' }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-4 px-6 md:px-12 h-20 shrink-0"
        style={{ borderBottom: '1px solid var(--ink4)' }}
      >
        <Search size={20} style={{ color: 'var(--gold2)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search wallets, brands, materials…"
          className="flex-1 bg-transparent outline-none text-lg md:text-xl font-light tracking-wide"
          style={{
            color: 'var(--cream)',
            fontFamily: 'var(--font-serif)',
          }}
        />
        {hasQuery && (
          <button
            onClick={() => setQuery('')}
            className="text-xs tracking-widest uppercase px-3 py-1"
            style={{ color: 'var(--stone)', border: '1px solid var(--ink5)' }}
          >
            Clear
          </button>
        )}
        <button
          onClick={closeSearch}
          className="p-2 ml-2 transition-colors duration-200 hover:text-[--gold2]"
          style={{ color: 'var(--mist)' }}
          aria-label="Close search"
        >
          <X size={22} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">

          {/* ── No query: show suggestions ── */}
          {!hasQuery && (
            <div className="animate-fadeUp">
              {/* Trending searches */}
              <div className="mb-10">
                <p
                  className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-2"
                  style={{ color: 'var(--gold2)' }}
                >
                  <TrendingUp size={14} /> Trending Searches
                </p>
                <div className="flex flex-wrap gap-3">
                  {TRENDING.map(t => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="px-4 py-2 text-sm tracking-wide transition-all duration-200"
                      style={{
                        border: '1px solid var(--ink5)',
                        color: 'var(--mist)',
                        background: 'var(--ink3)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold2)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink5)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--mist)';
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse categories */}
              <div className="mb-10">
                <p
                  className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                  style={{ color: 'var(--gold2)' }}
                >
                  Browse Categories
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {QUICK_CATS.map(cat => (
                    <Link
                      key={cat}
                      href={`/shop?category=${cat.toLowerCase()}`}
                      onClick={closeSearch}
                      className="flex items-center justify-between p-4 group transition-all duration-200"
                      style={{
                        background: 'var(--ink3)',
                        border: '1px solid var(--ink5)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--ink5)';
                      }}
                    >
                      <span
                        className="text-sm font-medium tracking-widest uppercase"
                        style={{ color: 'var(--cream)' }}
                      >
                        {cat}
                      </span>
                      <ArrowRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--gold2)' }}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured quick picks */}
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                  style={{ color: 'var(--gold2)' }}
                >
                  Popular Picks
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {products.filter(p => p.isFeatured).slice(0, 4).map(p => (
                    <SearchProductCard key={p.id} product={p} onClose={closeSearch} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Has query: show results ── */}
          {hasQuery && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm" style={{ color: 'var(--stone)' }}>
                  <span style={{ color: 'var(--cream)' }} className="font-semibold">
                    {results.length}
                  </span>{' '}
                  result{results.length !== 1 ? 's' : ''} for &ldquo;
                  <span style={{ color: 'var(--gold2)' }}>{query}</span>&rdquo;
                </p>
                {results.length > 0 && (
                  <Link
                    href={`/shop?q=${encodeURIComponent(query)}`}
                    onClick={closeSearch}
                    className="text-xs tracking-widest uppercase flex items-center gap-2 transition-colors duration-200"
                    style={{ color: 'var(--gold2)' }}
                  >
                    View all in Shop <ArrowRight size={14} />
                  </Link>
                )}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-20 animate-fadeUp">
                  <p
                    className="font-[family-name:var(--font-serif)] italic text-3xl font-light mb-4"
                    style={{ color: 'var(--stone)' }}
                  >
                    No results found
                  </p>
                  <p className="text-sm mb-8" style={{ color: 'var(--stone)' }}>
                    Try a different term or browse our categories
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {TRENDING.map(t => (
                      <button
                        key={t}
                        onClick={() => setQuery(t)}
                        className="px-4 py-2 text-sm tracking-wide"
                        style={{
                          border: '1px solid var(--ink5)',
                          color: 'var(--mist)',
                          background: 'var(--ink3)',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 animate-fadeUp">
                  {results.map(p => (
                    <SearchProductCard key={p.id} product={p} onClose={closeSearch} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer hint */}
      <div
        className="shrink-0 px-6 py-3 flex items-center gap-6 text-xs"
        style={{ borderTop: '1px solid var(--ink4)', color: 'var(--stone)' }}
      >
        <span>
          Press <kbd className="px-1.5 py-0.5 text-xs" style={{ border: '1px solid var(--ink5)', background: 'var(--ink3)', color: 'var(--mist)' }}>ESC</kbd> to close
        </span>
        <span>
          Press <kbd className="px-1.5 py-0.5 text-xs" style={{ border: '1px solid var(--ink5)', background: 'var(--ink3)', color: 'var(--mist)' }}>Enter</kbd> to search all
        </span>
      </div>
    </div>
  );
}

function SearchProductCard({ product, onClose }: { product: (typeof products)[0]; onClose: () => void }) {
  const { addItem } = useCart();
  return (
    <div
      className="group overflow-hidden transition-all duration-300"
      style={{ background: 'var(--ink3)', border: '1px solid var(--ink5)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,150,42,0.4)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--ink5)'; }}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} onClick={onClose}>
        <div className="relative h-44 overflow-hidden" style={{ background: 'var(--ink4)' }}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: 'saturate(0.85)' }}
          />
          {product.badge && (
            <span
              className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 tracking-wider uppercase"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
            >
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      {/* Info */}
      <div className="p-3">
        <Link href={`/product/${product.id}`} onClick={onClose}>
          <p
            className="font-[family-name:var(--font-serif)] text-sm font-light leading-tight mb-1 transition-colors duration-200"
            style={{ color: 'var(--cream)' }}
          >
            {product.name}
          </p>
        </Link>
        <div className="flex items-center justify-between">
          <span
            className="font-[family-name:var(--font-serif)] text-base"
            style={{ color: 'var(--gold2)' }}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => addItem(product)}
            className="text-xs px-2 py-1 tracking-wider uppercase transition-all duration-200"
            style={{
              border: '1px solid var(--ink5)',
              color: 'var(--mist)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--mist)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink5)';
            }}
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}
