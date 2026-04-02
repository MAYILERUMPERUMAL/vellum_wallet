'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

type PayMethod = 'cod' | 'upi' | 'card';

export default function CheckoutClient() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [payMethod, setPayMethod] = useState<PayMethod>('cod');
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const shipping = totalPrice >= 2999 ? 0 : 199;
  const grandTotal = totalPrice + shipping;

  const placeOrder = async () => {
    if (!items.length) return;
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1400));
    clearCart();
    setPlacing(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6" style={{ background: 'var(--ink)' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{ background: 'var(--gold)', color: 'var(--ink)' }}
        >
          ✓
        </div>
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-serif)] text-4xl font-light mb-3" style={{ color: 'var(--cream)' }}>
            Order Placed!
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--stone)' }}>
            Thank you for your order. You&apos;ll receive a confirmation shortly.
          </p>
        </div>
        <Link
          href="/"
          className="px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
          style={{ background: 'var(--gold)', color: 'var(--ink)' }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const Input = ({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) => (
    <div>
      <label className="block text-xs font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ color: 'var(--stone)' }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm outline-none transition-all duration-150"
        style={{ background: 'var(--ink3)', border: '1px solid var(--ink5)', color: 'var(--cream)' }}
        onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--gold)'; }}
        onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--ink5)'; }}
      />
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--ink)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="flex items-center gap-2 text-xs font-medium tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--gold2)' }}>
            <span className="inline-block w-5 h-px" style={{ background: 'var(--gold2)' }} />
            Almost There
          </p>
          <h1 className="font-[family-name:var(--font-serif)] font-light text-4xl" style={{ color: 'var(--cream)' }}>
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Delivery */}
            <div className="p-7" style={{ background: 'var(--ink2)', border: '1px solid var(--ink4)' }}>
              <h2 className="text-xs font-semibold tracking-[0.25em] uppercase mb-5 pb-4" style={{ color: 'var(--gold2)', borderBottom: '1px solid var(--ink4)' }}>
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="First name" />
                <Input label="Last Name" placeholder="Last name" />
                <Input label="Email" placeholder="you@email.com" type="email" />
                <Input label="Phone" placeholder="+91 98765 43210" type="tel" />
                <div className="sm:col-span-2">
                  <Input label="Address" placeholder="Street address, apartment, etc." />
                </div>
                <Input label="City" placeholder="City" />
                <Input label="Pincode" placeholder="600 001" />
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ color: 'var(--stone)' }}>
                    State
                  </label>
                  <select
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-150"
                    style={{ background: 'var(--ink3)', border: '1px solid var(--ink5)', color: 'var(--cream)', cursor: 'pointer' }}
                    onFocus={e => { (e.currentTarget as HTMLSelectElement).style.borderColor = 'var(--gold)'; }}
                    onBlur={e => { (e.currentTarget as HTMLSelectElement).style.borderColor = 'var(--ink5)'; }}
                  >
                    <option>Tamil Nadu</option>
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Telangana</option>
                    <option>Kerala</option>
                    <option>Andhra Pradesh</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="p-7" style={{ background: 'var(--ink2)', border: '1px solid var(--ink4)' }}>
              <h2 className="text-xs font-semibold tracking-[0.25em] uppercase mb-5 pb-4" style={{ color: 'var(--gold2)', borderBottom: '1px solid var(--ink4)' }}>
                Payment Method
              </h2>
              <div className="flex flex-col gap-3">
                {([
                  { id: 'cod' as PayMethod, icon: '💵', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                  { id: 'upi' as PayMethod, icon: '📱', label: 'UPI / GPay / PhonePe', desc: 'Instant payment via UPI' },
                  { id: 'card' as PayMethod, icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                ] as const).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setPayMethod(opt.id)}
                    className="flex items-center gap-4 p-4 text-left transition-all duration-150"
                    style={{
                      border: '1px solid',
                      borderColor: payMethod === opt.id ? 'var(--gold)' : 'var(--ink5)',
                      background: payMethod === opt.id ? 'rgba(201,150,42,0.05)' : 'transparent',
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{ borderColor: payMethod === opt.id ? 'var(--gold)' : 'var(--ink5)' }}
                    >
                      {payMethod === opt.id && (
                        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
                      )}
                    </div>
                    <span className="text-lg">{opt.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>{opt.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--stone)' }}>{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="p-6 sticky top-24" style={{ background: 'var(--ink2)', border: '1px solid var(--ink4)' }}>
              <h2 className="font-[family-name:var(--font-serif)] font-light text-xl mb-5 pb-4" style={{ color: 'var(--cream)', borderBottom: '1px solid var(--ink4)' }}>
                Order Summary
              </h2>

              {items.length === 0 ? (
                <p className="text-sm text-center py-4" style={{ color: 'var(--stone)' }}>Your cart is empty</p>
              ) : (
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between gap-2 text-sm pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: 'var(--stone)', flex: 1 }}>
                        {item.product.name} × {item.quantity}
                      </span>
                      <span style={{ color: 'var(--cream)', flexShrink: 0 }}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2 mb-4 text-sm" style={{ color: 'var(--stone)' }}>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span style={{ color: 'var(--cream)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? 'var(--gold2)' : 'var(--cream)' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 mb-5" style={{ borderTop: '1px solid var(--ink4)' }}>
                <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--stone)' }}>Total</span>
                <span className="font-[family-name:var(--font-serif)] text-2xl font-light" style={{ color: 'var(--gold2)' }}>
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={placeOrder}
                disabled={placing || items.length === 0}
                className="w-full py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-60"
                style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                onMouseEnter={e => { if (!placing) (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)'; }}
              >
                {placing ? 'Placing Order…' : 'Place Order →'}
              </button>
              <p className="text-center text-xs mt-3" style={{ color: 'var(--stone)' }}>
                🔒 SSL-encrypted secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
