'use client';

export default function AboutSection() {
  const pillars = [
    { icon: '🌿', name: 'Full-Grain Leather', desc: 'Only the finest hide, sourced from certified tanneries worldwide.' },
    { icon: '🧵', name: 'Hand-Stitched', desc: 'Saddle-stitched by artisans with 10+ years of experience.' },
    { icon: '♻️', name: 'Sustainable', desc: 'Responsible sourcing and zero-waste finishing process.' },
    { icon: '🔖', name: 'Lifetime Warranty', desc: 'We stand behind every product we ship — for life.' },
  ];

  return (
    <section id="about" className="py-20" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image stack */}
          <div className="relative">
            <div
              className="overflow-hidden"
              style={{ height: '520px', border: '1px solid var(--ink4)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85"
                alt="VELLUM craftsmanship"
                className="w-full h-full object-cover transition-all duration-500"
                style={{ filter: 'saturate(0.7)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.7)'; }}
              />
            </div>
            {/* Inset image */}
            <div
              className="absolute bottom-[-1.5rem] right-[-1.5rem] w-44 h-52 overflow-hidden hidden md:block"
              style={{ border: '3px solid var(--ink)', background: 'var(--ink3)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=85"
                alt="Leather detail"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Deco */}
            <div
              className="absolute top-6 -left-4 w-20 h-20 pointer-events-none hidden md:block"
              style={{ border: '1px solid rgba(201,150,42,0.15)' }}
            />
          </div>

          {/* Text */}
          <div>
            <p
              className="flex items-center gap-2 text-xs font-medium tracking-[0.32em] uppercase mb-4"
              style={{ color: 'var(--gold2)' }}
            >
              <span className="inline-block w-6 h-px" style={{ background: 'var(--gold2)' }} />
              Our Story
            </p>
            <h2
              className="font-[family-name:var(--font-serif)] font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--cream)' }}
            >
              Built with{' '}
              <em className="italic" style={{ color: 'var(--gold2)' }}>
                Purpose
              </em>
            </h2>

            <p className="text-sm leading-loose mb-5" style={{ color: 'var(--stone)', lineHeight: '1.95' }}>
              VELLUM was born in 2012 in the leather quarters of Chennai. What started as a single craftsman&apos;s obsession with quality grew into India&apos;s most beloved luxury leather goods brand.
            </p>

            <blockquote
              className="font-[family-name:var(--font-serif)] italic font-light text-xl leading-relaxed my-7"
              style={{
                color: 'var(--cream)',
                borderLeft: '2px solid var(--gold)',
                paddingLeft: '1.4rem',
                lineHeight: '1.65',
              }}
            >
              &ldquo;A wallet is not just an accessory. It&apos;s a companion that carries your life.&rdquo;
            </blockquote>

            <p className="text-sm leading-loose mb-8" style={{ color: 'var(--stone)', lineHeight: '1.95' }}>
              Every hide is selected by hand. Every stitch set by eye. We refuse shortcuts because our customers deserve nothing less than perfection that lasts decades.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {pillars.map(p => (
                <div
                  key={p.name}
                  className="p-4 transition-all duration-200"
                  style={{ background: 'var(--ink2)', border: '1px solid var(--ink4)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(201,150,42,0.25)';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'var(--ink4)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <p
                    className="font-[family-name:var(--font-serif)] text-sm font-light mb-1"
                    style={{ color: 'var(--gold2)' }}
                  >
                    {p.name}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--stone)' }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
