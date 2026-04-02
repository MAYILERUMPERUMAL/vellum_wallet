'use client';

import { Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function TestimonialsSection() {
  return (
    <section className="py-20" style={{ background: 'var(--ink2)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.32em] uppercase mb-3"
            style={{ color: 'var(--gold2)' }}
          >
            <span className="inline-block w-6 h-px" style={{ background: 'var(--gold2)' }} />
            What They Say
            <span className="inline-block w-6 h-px" style={{ background: 'var(--gold2)' }} />
          </p>
          <h2
            className="font-[family-name:var(--font-serif)] font-light"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)' }}
          >
            Loved by <em className="italic" style={{ color: 'var(--gold2)' }}>Thousands</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="p-7 transition-all duration-300"
              style={{
                background: 'var(--ink)',
                border: '1px solid var(--ink4)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(201,150,42,0.25)';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4), 0 0 20px rgba(201,150,42,0.07)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'var(--ink4)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Quote */}
              <div
                className="font-[family-name:var(--font-serif)] italic text-5xl leading-none mb-3"
                style={{ color: 'rgba(201,150,42,0.18)', fontStyle: 'italic' }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    fill={j < t.rating ? 'var(--gold)' : 'transparent'}
                    stroke={j < t.rating ? 'var(--gold)' : 'var(--stone)'}
                  />
                ))}
              </div>

              {/* Text */}
              <p
                className="font-[family-name:var(--font-serif)] italic font-light leading-relaxed mb-6 text-base"
                style={{ color: 'var(--mist)', lineHeight: '1.8' }}
              >
                {t.text}
              </p>

              {/* Footer */}
              <div
                className="flex items-center gap-3 pt-5"
                style={{ borderTop: '1px solid var(--ink4)' }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-[family-name:var(--font-serif)] text-lg"
                  style={{
                    background: 'var(--ink3)',
                    border: '1.5px solid rgba(201,150,42,0.35)',
                    color: 'var(--gold2)',
                  }}
                >
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>
                    {t.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--stone)' }}>
                    {t.role}
                  </p>
                </div>
                {t.verified && (
                  <span
                    className="text-xs px-2 py-0.5 shrink-0"
                    style={{
                      background: 'rgba(201,150,42,0.1)',
                      color: 'var(--gold2)',
                      border: '1px solid rgba(201,150,42,0.2)',
                    }}
                  >
                    ✓ Verified
                  </span>
                )}
              </div>

              {/* Product tag */}
              <div className="mt-3">
                <span className="text-xs" style={{ color: 'var(--stone)' }}>
                  Reviewed: <span style={{ color: 'var(--mist)' }}>{t.product}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
