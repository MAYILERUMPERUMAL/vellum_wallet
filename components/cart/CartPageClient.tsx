'use client';

import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPageClient() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6" style={{ background: 'var(--ink)' }}>
        <ShoppingBag size={56} style={{ color: 'var(--ink5)' }} />
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-serif)] italic text-3xl font-light mb-2" style={{ color: 'var(--stone)' }}>
            Your cart is empty
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--stone)' }}>Discover our premium leather wallets</p>
        </div>
        <Link
          href="/shop"
          className="px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
          style={{ background: 'var(--gold)', color: 'var(--ink)' }}
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 2999 ? 0 : 199;

  return (
    <div className="min-h-screen" style={{ background: 'var(--ink)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--gold2)' }}>
              <span className="inline-block w-5 h-px" style={{ background: 'var(--gold2)' }} />
              Your Cart
            </p>
            <h1 className="font-[family-name:var(--font-serif)] font-light text-4xl" style={{ color: 'var(--cream)' }}>
              {totalItems} Item{totalItems !== 1 ? 's' : ''}
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs tracking-widest uppercase underline underline-offset-2 transition-colors duration-150"
            style={{ color: 'var(--stone)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#e05555'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--stone)'; }}
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            {items.map(item => (
              <div
                key={item.product.id}
                className="flex gap-5 py-6"
                style={{ borderBottom: '1px solid var(--ink4)' }}
              >
                <Link href={`/product/${item.product.id}`}>
                  <div className="w-24 h-24 overflow-hidden shrink-0" style={{ background: 'var(--ink3)' }}>
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold2)' }}>{item.product.brand}</p>
                  <Link href={`/product/${item.product.id}`}>
                    <h3 className="font-[family-name:var(--font-serif)] text-lg font-light mb-1 leading-snug transition-colors duration-150" style={{ color: 'var(--cream)' }}>
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs mb-4 capitalize" style={{ color: 'var(--stone)' }}>
                    {item.product.color} · {item.product.material}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center" style={{ border: '1px solid var(--ink5)' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-lg transition-colors duration-150"
                        style={{ background: 'var(--ink3)', color: 'var(--cream)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink3)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream)'; }}
                      >−</button>
                      <span className="w-10 text-center text-sm font-medium" style={{ background: 'var(--ink2)', color: 'var(--cream)' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-lg transition-colors duration-150"
                        style={{ background: 'var(--ink3)', color: 'var(--cream)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink3)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream)'; }}
                      >+</button>
                    </div>
                    <span className="font-[family-name:var(--font-serif)] text-xl" style={{ color: 'var(--gold2)' }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="self-start shrink-0 p-1 transition-colors duration-150"
                  style={{ color: 'var(--stone)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#e05555'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--stone)'; }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="p-6 sticky top-24" style={{ background: 'var(--ink2)', border: '1px solid var(--ink4)' }}>
              <h2 className="font-[family-name:var(--font-serif)] font-light text-xl mb-5 pb-4" style={{ color: 'var(--cream)', borderBottom: '1px solid var(--ink4)' }}>
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm" style={{ color: 'var(--stone)' }}>
                  <span>Subtotal</span>
                  <span style={{ color: 'var(--cream)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: 'var(--stone)' }}>
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? 'var(--gold2)' : 'var(--cream)' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>
              {totalPrice < 2999 && (
                <p className="text-xs mb-4 p-3" style={{ background: 'rgba(201,150,42,0.08)', color: 'var(--gold2)', border: '1px solid rgba(201,150,42,0.15)' }}>
                  Add ₹{(2999 - totalPrice).toLocaleString('en-IN')} more for free shipping
                </p>
              )}
              <div className="flex justify-between items-center py-4 mb-5" style={{ borderTop: '1px solid var(--ink4)' }}>
                <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--stone)' }}>Total</span>
                <span className="font-[family-name:var(--font-serif)] text-3xl font-light" style={{ color: 'var(--gold2)' }}>
                  ₹{(totalPrice + shipping).toLocaleString('en-IN')}
                </span>
              </div>
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200 mb-3"
                style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)'; }}
              >
                Checkout <ArrowRight size={15} />
              </Link>
              <Link
                href="/shop"
                className="block text-center py-2.5 text-xs tracking-widest uppercase transition-colors duration-150"
                style={{ color: 'var(--mist)', border: '1px solid var(--ink5)' }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
