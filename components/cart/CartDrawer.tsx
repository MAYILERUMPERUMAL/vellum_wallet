'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

let drawerOpen = false;
const listeners: Array<(open: boolean) => void> = [];

export function openCartDrawer() {
  drawerOpen = true;
  listeners.forEach(fn => fn(true));
}
export function closeCartDrawer() {
  drawerOpen = false;
  listeners.forEach(fn => fn(false));
}

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  useEffect(() => {
    const fn = (open: boolean) => {
      setIsOpen(open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[150] animate-fadeIn"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
        onClick={close}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-[160] flex flex-col animate-slideRight"
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'var(--ink2)',
          borderLeft: '1px solid var(--ink4)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 shrink-0"
          style={{ borderBottom: '1px solid var(--ink4)' }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} style={{ color: 'var(--gold2)' }} />
            <span
              className="font-[family-name:var(--font-serif)] text-xl font-light tracking-widest"
              style={{ color: 'var(--cream)' }}
            >
              Your Cart
            </span>
            {totalItems > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: 'var(--gold)', color: 'var(--ink)' }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={close}
            className="w-9 h-9 flex items-center justify-center transition-colors duration-200"
            style={{ background: 'var(--ink4)', color: 'var(--mist)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink4)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--mist)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <ShoppingBag size={48} style={{ color: 'var(--ink5)' }} />
              <p className="font-[family-name:var(--font-serif)] italic text-xl font-light" style={{ color: 'var(--stone)' }}>
                Your cart is empty
              </p>
              <Link
                href="/shop"
                onClick={close}
                className="text-xs tracking-widest uppercase px-6 py-3 mt-2 transition-all duration-200"
                style={{ border: '1px solid var(--gold)', color: 'var(--gold2)' }}
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 py-5"
                  style={{ borderBottom: '1px solid var(--ink4)' }}
                >
                  {/* Img */}
                  <Link href={`/product/${item.product.id}`} onClick={close}>
                    <div
                      className="w-20 h-20 overflow-hidden shrink-0"
                      style={{ background: 'var(--ink3)' }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-[family-name:var(--font-serif)] text-sm font-light leading-snug mb-1"
                      style={{ color: 'var(--cream)' }}
                    >
                      {item.product.name}
                    </p>
                    <p className="text-xs mb-3 capitalize" style={{ color: 'var(--stone)' }}>
                      {item.product.brand} · {item.product.color}
                    </p>
                    <div className="flex items-center gap-3">
                      {/* Qty control */}
                      <div
                        className="flex items-center"
                        style={{ border: '1px solid var(--ink5)' }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-lg transition-colors duration-200"
                          style={{ background: 'var(--ink3)', color: 'var(--cream)' }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink3)';
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream)';
                          }}
                        >
                          −
                        </button>
                        <span
                          className="w-9 text-center text-sm font-medium"
                          style={{ color: 'var(--cream)', background: 'var(--ink2)' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-lg transition-colors duration-200"
                          style={{ background: 'var(--ink3)', color: 'var(--cream)' }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink3)';
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream)';
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-[family-name:var(--font-serif)] text-base" style={{ color: 'var(--gold2)' }}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="shrink-0 self-start pt-1 transition-colors duration-200"
                    style={{ color: 'var(--stone)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#e05555'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--stone)'; }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 shrink-0"
            style={{ borderTop: '1px solid var(--ink4)', background: 'var(--ink3)' }}
          >
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--stone)' }}>Subtotal</span>
              <span className="font-[family-name:var(--font-serif)] text-2xl font-light" style={{ color: 'var(--gold2)' }}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="block w-full text-center py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-200 mb-2.5"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)'; }}
            >
              Proceed to Checkout →
            </Link>
            <button
              onClick={close}
              className="block w-full text-center py-2.5 text-xs tracking-widest uppercase transition-all duration-200"
              style={{ color: 'var(--mist)', border: '1px solid var(--ink5)' }}
            >
              Continue Shopping
            </button>
            <p className="text-center text-xs mt-3" style={{ color: 'var(--stone)' }}>
              ✦ Free shipping on orders above ₹2,999
            </p>
          </div>
        )}
      </div>
    </>
  );
}
