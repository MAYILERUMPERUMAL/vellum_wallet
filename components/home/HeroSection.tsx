'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';

export default function HeroSection() {
  const { openSearch } = useSearch();

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '6rem' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 65% 50%, rgba(201,150,42,0.07) 0%, transparent 60%), linear-gradient(160deg, #0d0c0a 0%, #080807 55%, #0f0e0c 100%)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(201,150,42,0.018) 80px, rgba(201,150,42,0.018) 81px), repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(201,150,42,0.018) 80px, rgba(201,150,42,0.018) 81px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">

          {/* Text */}
          <div>
            <p
              className="flex items-center gap-3 text-xs font-medium tracking-[0.38em] uppercase mb-6 animate-fadeUp"
              style={{ color: 'var(--gold2)' }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ background: 'var(--gold2)' }}
              />
              The Onyx Collection 2025
            </p>

            <h1
              className="font-[family-name:var(--font-serif)] leading-[0.92] tracking-tight mb-7 animate-fadeUp delay-200"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', color: 'var(--cream)', fontWeight: 300 }}
            >
              Crafted for
              <br />
              <em
                className="italic block"
                style={{ color: 'var(--gold2)', fontSize: '1.08em' }}
              >
                Style &amp;
              </em>
              Utility
            </h1>

            <p
              className="text-base font-light leading-relaxed mb-10 max-w-md animate-fadeUp delay-300"
              style={{ color: 'var(--stone)', lineHeight: '1.9' }}
            >
              Each wallet is born from premium full-grain leather, hand-stitched by master artisans in Chennai. Designed to age beautifully. Built to last a lifetime.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fadeUp delay-400">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
                style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold2)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 28px rgba(201,150,42,0.35)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                Shop Collection
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => openSearch()}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-200"
                style={{
                  background: 'transparent',
                  color: 'var(--gold2)',
                  border: '1px solid var(--gold)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold2)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                Search Wallets
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex gap-8 pt-8 animate-fadeUp delay-500"
              style={{ borderTop: '1px solid var(--ink4)' }}
            >
              {[
                { num: '15K+', label: 'Customers' },
                { num: '48', label: 'Styles' },
                { num: '12yr', label: 'Craftsmanship' },
                { num: '4.9★', label: 'Avg Rating' },
              ].map(s => (
                <div key={s.label}>
                  <p
                    className="font-[family-name:var(--font-serif)] text-2xl font-light leading-none mb-1"
                    style={{ color: 'var(--gold2)' }}
                  >
                    {s.num}
                  </p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--stone)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fadeUp delay-200 hidden lg:block">
            <div
              className="relative overflow-hidden"
              style={{
                height: '640px',
                border: '1px solid var(--ink4)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=1000&q=90"
                alt="VELLUM luxury wallet"
                className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.75)' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, var(--ink) 0%, transparent 20%, transparent 80%, var(--ink) 100%), linear-gradient(to bottom, transparent 70%, rgba(8,8,7,0.5) 100%)',
                }}
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute top-8 -left-5 px-5 py-4 text-center min-w-[110px]"
              style={{
                background: 'var(--ink3)',
                border: '1px solid rgba(201,150,42,0.25)',
              }}
            >
              <p className="font-[family-name:var(--font-serif)] text-2xl font-light leading-none" style={{ color: 'var(--gold2)' }}>
                100%
              </p>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--stone)' }}>
                Full Grain
                <br />
                Leather
              </p>
            </div>

            {/* Deco border */}
            <div
              className="absolute -bottom-4 -right-4 w-40 h-40 pointer-events-none"
              style={{ border: '1px solid rgba(201,150,42,0.15)' }}
            />

            {/* Review pill */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-3 flex items-center gap-3"
              style={{
                background: 'rgba(8,8,7,0.85)',
                border: '1px solid var(--ink5)',
                backdropFilter: 'blur(12px)',
                whiteSpace: 'nowrap',
              }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="var(--gold)" stroke="none" />
                ))}
              </div>
              <span className="text-xs" style={{ color: 'var(--cream)' }}>
                4.9 · Trusted by 15,000+ customers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
