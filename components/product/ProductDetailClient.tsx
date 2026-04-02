'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Star, ShoppingBag, Zap, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ui/ProductCard';

const MOCK_REVIEWS = [
  { name: 'A. Krishnan', initials: 'AK', text: 'Absolutely stunning quality. The leather smells incredible.', rating: 5, date: 'Feb 2025' },
  { name: 'R. Mehta', initials: 'RM', text: 'Perfect gift. Beautifully packaged and arrived in 2 days.', rating: 5, date: 'Jan 2025' },
  { name: 'D. Patel', initials: 'DP', text: 'Very slim, very premium. Exactly as described.', rating: 4, date: 'Mar 2025' },
  { name: 'S. Nair', initials: 'SN', text: 'Bought this for my dad — he absolutely loves it.', rating: 5, date: 'Mar 2025' },
];

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < product.rating ? '★' : '☆').join('');
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--stone)' }}>
          <Link href="/" className="transition-colors duration-150 hover:text-[--gold2]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="transition-colors duration-150 hover:text-[--gold2]">Shop</Link>
          <span>/</span>
          <span style={{ color: 'var(--cream)' }}>{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Gallery */}
          <div>
            {/* Main image */}
            <div
              className="relative overflow-hidden mb-3 cursor-zoom-in"
              style={{ height: '520px', background: 'var(--ink3)', border: '1px solid var(--ink4)' }}
            >
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                style={{ filter: 'saturate(0.9)' }}
              />
              {product.badge && (
                <span
                  className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 tracking-wider uppercase"
                  style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                >
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span
                  className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1"
                  style={{ background: 'rgba(8,8,7,0.8)', color: 'var(--gold2)', border: '1px solid var(--ink5)' }}
                >
                  -{discount}% OFF
                </span>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="w-20 h-20 overflow-hidden transition-all duration-150"
                    style={{
                      border: '1.5px solid',
                      borderColor: activeImg === i ? 'var(--gold2)' : 'var(--ink5)',
                      background: 'var(--ink3)',
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--gold2)' }}>
              {product.brand} · {product.category}
            </p>
            <h1
              className="font-[family-name:var(--font-serif)] font-light leading-none mb-4"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--cream)' }}
            >
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill={i < product.rating ? 'var(--gold)' : 'transparent'} stroke={i < product.rating ? 'var(--gold)' : 'var(--stone)'} />
                ))}
              </div>
              <span className="text-sm" style={{ color: 'var(--mist)' }}>{product.rating}.0</span>
              <span className="text-sm" style={{ color: 'var(--stone)' }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div
              className="flex items-baseline gap-3 mb-5 pb-5"
              style={{ borderBottom: '1px solid var(--ink4)' }}
            >
              <span
                className="font-[family-name:var(--font-serif)] font-light"
                style={{ fontSize: '2.4rem', color: 'var(--gold2)' }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg line-through" style={{ color: 'var(--stone)' }}>
                    ₹{product.oldPrice.toLocaleString('en-IN')}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 font-semibold"
                    style={{ background: 'rgba(201,150,42,0.15)', color: 'var(--gold2)' }}
                  >
                    Save ₹{(product.oldPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-loose mb-6" style={{ color: 'var(--stone)', lineHeight: '1.9' }}>
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--cream)' }}>
                Features
              </p>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--mist)' }}>
                    <span style={{ color: 'var(--gold2)', fontSize: '10px', marginTop: '5px', flexShrink: 0 }}>◆</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs table */}
            <div className="mb-7" style={{ border: '1px solid var(--ink4)' }}>
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="grid grid-cols-2" style={{ borderBottom: '1px solid var(--ink4)' }}>
                  <div
                    className="px-4 py-2.5 text-xs tracking-wider uppercase"
                    style={{ color: 'var(--stone)', background: 'var(--ink3)', borderRight: '1px solid var(--ink4)' }}
                  >
                    {key}
                  </div>
                  <div className="px-4 py-2.5 text-sm" style={{ color: 'var(--mist)' }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--stone)' }}>Qty</p>
              <div className="flex items-center" style={{ border: '1px solid var(--ink5)' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg transition-colors duration-150"
                  style={{ background: 'var(--ink3)', color: 'var(--cream)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink3)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream)'; }}
                >
                  −
                </button>
                <span
                  className="w-12 text-center font-medium"
                  style={{ background: 'var(--ink2)', color: 'var(--cream)' }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg transition-colors duration-150"
                  style={{ background: 'var(--ink3)', color: 'var(--cream)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink3)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream)'; }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap mb-7">
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
                style={{ background: added ? 'var(--gold2)' : 'var(--gold)', color: 'var(--ink)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 28px rgba(201,150,42,0.35)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}
              >
                <ShoppingBag size={16} />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-200"
                style={{ background: 'transparent', color: 'var(--gold2)', border: '1px solid var(--gold)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold2)'; }}
              >
                <Zap size={15} /> Buy Now
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Truck size={15} />, label: 'Free Delivery', sub: 'On orders above ₹2,999' },
                { icon: <RotateCcw size={15} />, label: '30-Day Returns', sub: 'Hassle-free returns' },
                { icon: <Shield size={15} />, label: 'Lifetime Warranty', sub: 'On craftsmanship' },
                { icon: <ShoppingBag size={15} />, label: 'Secure Checkout', sub: 'SSL encrypted' },
              ].map(b => (
                <div
                  key={b.label}
                  className="flex items-start gap-2.5 p-3"
                  style={{ background: 'var(--ink3)', border: '1px solid var(--ink4)' }}
                >
                  <span style={{ color: 'var(--gold2)', marginTop: '2px', flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--cream)' }}>{b.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--stone)' }}>{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-[family-name:var(--font-serif)] font-light text-2xl"
              style={{ color: 'var(--cream)' }}
            >
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-2xl" style={{ color: 'var(--gold2)' }}>{stars}</span>
              <span className="text-sm" style={{ color: 'var(--stone)' }}>Based on {product.reviews} reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_REVIEWS.map((r, i) => (
              <div
                key={i}
                className="p-5 transition-all duration-200"
                style={{ background: 'var(--ink2)', border: '1px solid var(--ink4)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,150,42,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--ink4)'; }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{ background: 'var(--ink4)', border: '1.5px solid rgba(201,150,42,0.25)', color: 'var(--gold2)' }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>{r.name}</p>
                    <p className="text-xs" style={{ color: 'var(--stone)' }}>{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill={j < r.rating ? 'var(--gold)' : 'transparent'} stroke={j < r.rating ? 'var(--gold)' : 'var(--stone)'} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--stone)' }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2
              className="font-[family-name:var(--font-serif)] font-light text-2xl mb-6"
              style={{ color: 'var(--cream)' }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
