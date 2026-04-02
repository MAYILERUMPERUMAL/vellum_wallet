'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

const COLOR_MAP: Record<string, string> = {
  black: '#1a1a1a',
  brown: '#6B3A2A',
  tan: '#C4956A',
  navy: '#1E2D4D',
  green: '#2D4A3A',
  burgundy: '#6D1A2A',
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < product.rating ? '★' : '☆').join('');
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: 'var(--ink2)',
        border: '1px solid var(--ink4)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,150,42,0.28)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,150,42,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--ink4)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div
          className="relative overflow-hidden"
          style={{ height: '260px', background: 'var(--ink3)' }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.08]"
            style={{ filter: 'saturate(0.8)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.8)'; }}
          />

          {/* Badge */}
          {product.badge && (
            <span
              className="absolute top-2.5 left-2.5 text-xs font-semibold px-2.5 py-1 tracking-wider uppercase z-10"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
            >
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span
              className="absolute top-2.5 right-2.5 text-xs font-bold px-2 py-1"
              style={{ background: 'rgba(8,8,7,0.7)', color: 'var(--gold2)', border: '1px solid var(--ink5)' }}
            >
              -{discount}%
            </span>
          )}

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(8,8,7,0.62)' }}
          >
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 translate-y-2 group-hover:translate-y-0"
              style={{
                background: added ? 'var(--gold2)' : 'var(--gold)',
                color: 'var(--ink)',
                transitionDelay: '0.05s',
              }}
            >
              <ShoppingBag size={14} />
              {added ? 'Added!' : 'Add to Cart'}
            </button>
            <Link
              href={`/product/${product.id}`}
              className="flex items-center gap-2 px-5 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200 translate-y-2 group-hover:translate-y-0"
              style={{
                background: 'transparent',
                color: 'var(--cream)',
                border: '1px solid rgba(255,255,255,0.3)',
                transitionDelay: '0.1s',
              }}
            >
              <Eye size={14} />
              View Details
            </Link>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4" style={{ borderTop: '1px solid var(--ink4)' }}>
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold2)' }}>
          {product.brand}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3
            className="font-[family-name:var(--font-serif)] text-base font-light leading-snug mb-3 tracking-wide transition-colors duration-200"
            style={{ color: 'var(--cream)' }}
          >
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            {product.oldPrice && (
              <span className="text-xs line-through mr-2" style={{ color: 'var(--stone)' }}>
                ₹{product.oldPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span
              className="font-[family-name:var(--font-serif)] text-lg font-light"
              style={{ color: 'var(--gold2)' }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--gold2)' }}>{stars}</span>
            <span className="text-xs" style={{ color: 'var(--stone)' }}>({product.reviews})</span>
          </div>
        </div>
        {/* Color dot */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-full border"
            style={{
              background: COLOR_MAP[product.color] || '#888',
              borderColor: 'var(--ink5)',
            }}
            title={product.color}
          />
          <span className="text-xs capitalize" style={{ color: 'var(--stone)' }}>{product.color}</span>
          <span className="text-xs mx-1" style={{ color: 'var(--ink5)' }}>·</span>
          <span className="text-xs capitalize" style={{ color: 'var(--stone)' }}>{product.material}</span>
        </div>
      </div>
    </div>
  );
}
