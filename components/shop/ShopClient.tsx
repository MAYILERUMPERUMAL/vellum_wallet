'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import { products, BRANDS, CATEGORIES, COLORS, MATERIALS, MAX_PRICE } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';
import ShopSearchBar from '@/components/shop/ShopSearchBar';

const COLOR_MAP: Record<string, string> = {
  black: '#1a1a1a', brown: '#6B3A2A', tan: '#C4956A',
  navy: '#1E2D4D', green: '#2D4A3A', burgundy: '#6D1A2A',
};

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category') || '';
  const urlQuery    = searchParams.get('q') || '';

  const [search, setSearch]           = useState(urlQuery);
  const [category, setCategory]       = useState(urlCategory);
  const [maxPrice, setMaxPrice]       = useState(MAX_PRICE);
  const [selColors, setSelColors]     = useState<string[]>([]);
  const [selMaterials, setSelMaterials] = useState<string[]>([]);
  const [selBrands, setSelBrands]     = useState<string[]>([]);
  const [sortBy, setSortBy]           = useState<SortOption>('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true, price: true, brand: true, color: true, material: true,
  });

  // Sync URL params on mount
  useEffect(() => {
    if (urlCategory) setCategory(urlCategory);
    if (urlQuery)    setSearch(urlQuery);
  }, [urlCategory, urlQuery]);

  const toggleSection = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleArr = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const clearAll = () => {
    setSearch(''); setCategory(''); setMaxPrice(MAX_PRICE);
    setSelColors([]); setSelMaterials([]); setSelBrands([]); setSortBy('default');
  };

  const activeFilterCount = [
    category, ...selColors, ...selMaterials, ...selBrands,
    maxPrice < MAX_PRICE ? 'price' : '',
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q)) ||
          p.material.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q),
      );
    }
    if (category) result = result.filter(p => p.category === category);
    result = result.filter(p => p.price <= maxPrice);
    if (selColors.length)    result = result.filter(p => selColors.includes(p.color));
    if (selMaterials.length) result = result.filter(p => selMaterials.includes(p.material));
    if (selBrands.length)    result = result.filter(p => selBrands.includes(p.brand));

    switch (sortBy) {
      case 'price-asc':  return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'rating':     return result.sort((a, b) => b.rating - a.rating);
      case 'newest':     return result.sort((a, b) => b.id - a.id);
      default:           return result;
    }
  }, [search, category, maxPrice, selColors, selMaterials, selBrands, sortBy]);

  const SectionHeader = ({ label, skey }: { label: string; skey: string }) => (
    <button
      onClick={() => toggleSection(skey)}
      className="flex items-center justify-between w-full text-xs font-semibold tracking-[0.22em] uppercase py-3 mb-1"
      style={{ color: 'var(--gold2)', borderBottom: '1px solid var(--ink4)' }}
    >
      {label}
      {openSections[skey] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
  );

  const Sidebar = () => (
    <aside className="w-full flex flex-col gap-0">
      {/* Clear */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--cream)' }}>
          Filters
          {activeFilterCount > 0 && (
            <span
              className="ml-2 px-1.5 py-0.5 text-xs rounded-sm font-bold"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
            >
              {activeFilterCount}
            </span>
          )}
        </span>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs tracking-wider underline underline-offset-2 transition-colors duration-200"
            style={{ color: 'var(--stone)' }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <SectionHeader label="Category" skey="category" />
        {openSections.category && (
          <div className="flex flex-col gap-1 mt-2">
            <button
              onClick={() => setCategory('')}
              className={`text-left text-sm px-2 py-1.5 transition-colors duration-150 ${!category ? 'font-medium' : ''}`}
              style={{ color: !category ? 'var(--gold2)' : 'var(--mist)' }}
            >
              All Wallets
              <span className="ml-2 text-xs" style={{ color: 'var(--stone)' }}>
                ({products.length})
              </span>
            </button>
            {CATEGORIES.map(c => {
              const count = products.filter(p => p.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(category === c ? '' : c)}
                  className={`text-left text-sm px-2 py-1.5 capitalize transition-colors duration-150 ${category === c ? 'font-medium' : ''}`}
                  style={{ color: category === c ? 'var(--gold2)' : 'var(--mist)' }}
                >
                  {c === 'men' ? "Men's" : c === 'women' ? "Women's" : c.charAt(0).toUpperCase() + c.slice(1)}
                  <span className="ml-2 text-xs" style={{ color: 'var(--stone)' }}>({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <SectionHeader label="Price Range" skey="price" />
        {openSections.price && (
          <div className="mt-3">
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={100}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs" style={{ color: 'var(--stone)' }}>₹0</span>
              <span
                className="font-[family-name:var(--font-serif)] text-base"
                style={{ color: 'var(--gold2)' }}
              >
                Up to ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="mb-4">
        <SectionHeader label="Brand" skey="brand" />
        {openSections.brand && (
          <div className="flex flex-col gap-1 mt-2">
            {BRANDS.map(b => (
              <label key={b} className="flex items-center gap-2.5 cursor-pointer group py-1">
                <div
                  onClick={() => setSelBrands(prev => toggleArr(prev, b))}
                  className="w-4 h-4 flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer"
                  style={{
                    border: '1px solid',
                    borderColor: selBrands.includes(b) ? 'var(--gold)' : 'var(--ink5)',
                    background: selBrands.includes(b) ? 'var(--gold)' : 'transparent',
                    color: 'var(--ink)',
                    fontSize: '10px',
                  }}
                >
                  {selBrands.includes(b) && '✓'}
                </div>
                <span
                  className="text-sm transition-colors duration-150"
                  style={{ color: selBrands.includes(b) ? 'var(--cream)' : 'var(--mist)' }}
                  onClick={() => setSelBrands(prev => toggleArr(prev, b))}
                >
                  {b}
                </span>
                <span className="ml-auto text-xs" style={{ color: 'var(--stone)' }}>
                  ({products.filter(p => p.brand === b).length})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="mb-4">
        <SectionHeader label="Color" skey="color" />
        {openSections.color && (
          <div className="flex flex-wrap gap-2.5 mt-3">
            {COLORS.map(c => (
              <button
                key={c}
                title={c}
                onClick={() => setSelColors(prev => toggleArr(prev, c))}
                className="w-7 h-7 rounded-full transition-all duration-150"
                style={{
                  background: COLOR_MAP[c] || '#888',
                  border: selColors.includes(c)
                    ? '2px solid var(--gold2)'
                    : '2px solid transparent',
                  outline: selColors.includes(c) ? '1px solid var(--ink5)' : 'none',
                  transform: selColors.includes(c) ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Material */}
      <div className="mb-4">
        <SectionHeader label="Material" skey="material" />
        {openSections.material && (
          <div className="flex flex-col gap-1 mt-2">
            {MATERIALS.map(m => (
              <label key={m} className="flex items-center gap-2.5 cursor-pointer py-1">
                <div
                  onClick={() => setSelMaterials(prev => toggleArr(prev, m))}
                  className="w-4 h-4 flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer"
                  style={{
                    border: '1px solid',
                    borderColor: selMaterials.includes(m) ? 'var(--gold)' : 'var(--ink5)',
                    background: selMaterials.includes(m) ? 'var(--gold)' : 'transparent',
                    color: 'var(--ink)',
                    fontSize: '10px',
                  }}
                >
                  {selMaterials.includes(m) && '✓'}
                </div>
                <span
                  className="text-sm capitalize transition-colors duration-150"
                  style={{ color: selMaterials.includes(m) ? 'var(--cream)' : 'var(--mist)' }}
                  onClick={() => setSelMaterials(prev => toggleArr(prev, m))}
                >
                  {m === 'full-grain' ? 'Full-Grain Leather' : m.charAt(0).toUpperCase() + m.slice(1)}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Page title */}
        <div className="mb-8">
          <p
            className="flex items-center gap-2 text-xs font-medium tracking-[0.32em] uppercase mb-2"
            style={{ color: 'var(--gold2)' }}
          >
            <span className="inline-block w-6 h-px" style={{ background: 'var(--gold2)' }} />
            Explore
          </p>
          <h1
            className="font-[family-name:var(--font-serif)] font-light"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)' }}
          >
            The <em className="italic" style={{ color: 'var(--gold2)' }}>Collection</em>
          </h1>
        </div>

        {/* Search bar (prominent, full width) */}
        <ShopSearchBar value={search} onChange={setSearch} />

        {/* Active filter tags */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {category && (
              <FilterTag label={`Category: ${category}`} onRemove={() => setCategory('')} />
            )}
            {maxPrice < MAX_PRICE && (
              <FilterTag label={`Max: ₹${maxPrice.toLocaleString('en-IN')}`} onRemove={() => setMaxPrice(MAX_PRICE)} />
            )}
            {selColors.map(c => (
              <FilterTag key={c} label={`Color: ${c}`} onRemove={() => setSelColors(prev => prev.filter(x => x !== c))} />
            ))}
            {selMaterials.map(m => (
              <FilterTag key={m} label={`Material: ${m}`} onRemove={() => setSelMaterials(prev => prev.filter(x => x !== m))} />
            ))}
            {selBrands.map(b => (
              <FilterTag key={b} label={`Brand: ${b}`} onRemove={() => setSelBrands(prev => prev.filter(x => x !== b))} />
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <div
            className="hidden lg:block shrink-0 sticky top-24 self-start"
            style={{ width: '240px' }}
          >
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <p className="text-sm" style={{ color: 'var(--stone)' }}>
                <span style={{ color: 'var(--cream)', fontWeight: 500 }}>{filtered.length}</span>{' '}
                wallet{filtered.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-xs tracking-wider uppercase transition-colors duration-200"
                  style={{ border: '1px solid var(--ink5)', color: 'var(--mist)' }}
                >
                  <SlidersHorizontal size={13} /> Filters
                  {activeFilterCount > 0 && (
                    <span
                      className="px-1.5 py-0.5 text-xs font-bold rounded-sm"
                      style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--stone)' }}>Sort</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortOption)}
                    className="text-xs px-3 py-2 outline-none transition-colors duration-200"
                    style={{
                      background: 'var(--ink3)',
                      border: '1px solid var(--ink5)',
                      color: 'var(--cream)',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Best Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <p
                  className="font-[family-name:var(--font-serif)] italic text-2xl font-light"
                  style={{ color: 'var(--stone)' }}
                >
                  No wallets match your filters
                </p>
                <button
                  onClick={clearAll}
                  className="text-xs tracking-widest uppercase px-6 py-2.5 transition-all duration-200"
                  style={{ border: '1px solid var(--gold)', color: 'var(--gold2)' }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-[80] animate-fadeIn"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className="fixed top-0 left-0 h-full z-[90] overflow-y-auto p-6 animate-fadeIn"
            style={{ width: '300px', background: 'var(--ink2)', borderRight: '1px solid var(--ink4)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--cream)' }}>
                Filters
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center"
                style={{ background: 'var(--ink4)', color: 'var(--mist)' }}
              >
                <X size={16} />
              </button>
            </div>
            <Sidebar />
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-full py-3 mt-4 text-sm font-semibold tracking-widest uppercase"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
            >
              Apply Filters ({filtered.length} results)
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1.5 px-3 py-1 text-xs transition-all duration-150"
      style={{
        background: 'rgba(201,150,42,0.1)',
        border: '1px solid rgba(201,150,42,0.25)',
        color: 'var(--gold2)',
      }}
    >
      <X size={11} /> {label}
    </button>
  );
}
