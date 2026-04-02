'use client';

export default function MarqueeStrip() {
  const items = [
    'Full-Grain Leather',
    'Hand-Stitched',
    'Made in Chennai',
    'Lifetime Warranty',
    'Premium Craftsmanship',
    'RFID Blocking',
    '12 Years of Excellence',
    'Free Shipping ₹2999+',
    'Veg-Tanned Leather',
    'Luxury Packaging',
  ];
  const text = items.map(i => `${i}  ✦  `).join('');

  return (
    <div
      className="overflow-hidden py-3"
      style={{
        background: 'var(--ink3)',
        borderTop: '1px solid var(--ink4)',
        borderBottom: '1px solid var(--ink4)',
      }}
    >
      <div
        className="inline-flex whitespace-nowrap animate-marquee"
        style={{ animationDuration: '32s' }}
      >
        <span
          className="font-[family-name:var(--font-serif)] italic text-sm tracking-wider"
          style={{ color: 'var(--stone)' }}
        >
          {text}{text}
        </span>
      </div>
    </div>
  );
}
