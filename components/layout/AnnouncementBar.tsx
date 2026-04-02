'use client';

export default function AnnouncementBar() {
  const messages = [
    '✦ Free shipping on orders above ₹2,999',
    '✦ Handcrafted full-grain leather',
    '✦ 30-day hassle-free returns',
    '✦ Lifetime craftsmanship warranty',
    '✦ New: The Noir Envelope — Limited to 100 pieces',
    '✦ RFID-blocking on all wallets',
  ];
  const text = messages.join('   ');

  return (
    <div
      className="w-full overflow-hidden py-2 text-xs font-semibold tracking-[0.2em] uppercase"
      style={{ backgroundColor: 'var(--gold)', color: 'var(--ink)' }}
    >
      <div
        className="inline-flex whitespace-nowrap animate-marquee"
        style={{ animationDuration: '30s' }}
      >
        <span className="px-4">{text}&nbsp;&nbsp;&nbsp;</span>
        <span className="px-4">{text}&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
