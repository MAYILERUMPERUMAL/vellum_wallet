'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink2)', borderTop: '1px solid var(--ink4)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-serif)] text-3xl font-semibold tracking-widest block mb-4"
              style={{ color: 'var(--cream)', letterSpacing: '0.14em' }}
            >
              VELL<span style={{ color: 'var(--gold2)' }}>U</span>M
            </Link>
            <p className="text-sm leading-loose mb-6 max-w-xs" style={{ color: 'var(--stone)', lineHeight: '1.85' }}>
              Premium leather goods, hand-crafted with reverence for material and time. Rooted in Chennai, loved worldwide.
            </p>
            <div className="flex gap-2">
              {['📸', '📌', '🐦', '▶'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center text-sm transition-all duration-200"
                  style={{ background: 'var(--ink4)', color: 'var(--stone)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--ink4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.28em] uppercase mb-5 pb-3"
              style={{ color: 'var(--gold2)', borderBottom: '1px solid var(--ink4)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop All', href: '/shop' },
                { label: 'Men\'s Wallets', href: '/shop?category=men' },
                { label: 'Women\'s Wallets', href: '/shop?category=women' },
                { label: 'New Arrivals', href: '/shop?category=minimal' },
              ].map(l => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm transition-all duration-200 inline-block"
                    style={{ color: 'var(--stone)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold2)';
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '4px';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--stone)';
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0';
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.28em] uppercase mb-5 pb-3"
              style={{ color: 'var(--gold2)', borderBottom: '1px solid var(--ink4)' }}
            >
              Help & Support
            </h3>
            <ul className="space-y-3">
              {['Shipping Policy', 'Returns & Refunds', 'Care Instructions', 'Warranty', 'FAQ', 'Contact Us'].map(l => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm transition-all duration-200 inline-block"
                    style={{ color: 'var(--stone)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold2)';
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '4px';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--stone)';
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0';
                    }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.28em] uppercase mb-5 pb-3"
              style={{ color: 'var(--gold2)', borderBottom: '1px solid var(--ink4)' }}
            >
              Contact
            </h3>
            <div className="space-y-4">
              {[
                { icon: '📍', text: '12 Leather Market Lane, T. Nagar, Chennai — 600 017' },
                { icon: '📞', text: '+91 98765 43210' },
                { icon: '✉️', text: 'hello@vellum.in' },
                { icon: '🕐', text: 'Mon–Sat: 10am – 7pm IST' },
              ].map((c, i) => (
                <div key={i} className="flex gap-3 text-sm" style={{ color: 'var(--stone)' }}>
                  <span className="shrink-0 mt-0.5" style={{ color: 'var(--gold2)' }}>{c.icon}</span>
                  <span style={{ lineHeight: '1.6' }}>{c.text}</span>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="mt-5 h-24 flex items-center justify-center text-xs tracking-widest uppercase"
              style={{
                background: 'var(--ink4)',
                border: '1px solid var(--ink5)',
                color: 'var(--stone)',
              }}
            >
              📍 Chennai, India
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 py-5"
          style={{ borderTop: '1px solid var(--ink4)' }}
        >
          <p className="text-xs tracking-wide" style={{ color: 'var(--stone)' }}>
            © 2025 <span style={{ color: 'var(--gold2)' }}>VELLUM</span> — All rights reserved.
          </p>
          <p className="text-xs tracking-wide" style={{ color: 'var(--stone)' }}>
            Crafted with care in <span style={{ color: 'var(--gold2)' }}>India</span> ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
