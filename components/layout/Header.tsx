'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSearch } from '@/context/SearchContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/shop?category=leather' },
  { label: 'About', href: '/#about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, items } = useCart();
  const { openSearch } = useSearch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-8 left-0 right-0 z-50 transition-all duration-300"
        style={{
          top: '32px', // below announcement bar
          background: scrolled ? 'rgba(8,8,7,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--ink4)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center h-16 gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-widest shrink-0 transition-colors duration-200"
            style={{ color: 'var(--cream)', letterSpacing: '0.14em' }}
          >
            VELL<span style={{ color: 'var(--gold2)' }}>U</span>M
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 mx-auto">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-medium tracking-widest uppercase transition-colors duration-200 relative group"
                style={{ color: 'var(--mist)' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: 'var(--gold2)' }}
                />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Search */}
            <button
              onClick={() => openSearch()}
              className="p-2 transition-colors duration-200 hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase"
              style={{ color: 'var(--mist)' }}
              aria-label="Search"
            >
              <Search size={18} />
              <span className="hidden lg:inline" style={{ color: 'var(--stone)' }}>Search</span>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 relative transition-colors duration-200"
              style={{ color: 'var(--mist)' }}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: '10px' }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2"
              style={{ color: 'var(--mist)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ background: 'var(--ink)' }}
        >
          <button
            className="absolute top-6 right-6"
            style={{ color: 'var(--mist)' }}
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-serif)] text-4xl font-light tracking-widest transition-colors duration-200"
              style={{ color: 'var(--mist)' }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { setMobileOpen(false); openSearch(); }}
            className="flex items-center gap-2 text-sm tracking-widest uppercase"
            style={{ color: 'var(--gold2)' }}
          >
            <Search size={16} /> Search
          </button>
        </div>
      )}
    </>
  );
}
