'use client';

import { Search, X } from 'lucide-react';

interface ShopSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function ShopSearchBar({ value, onChange }: ShopSearchBarProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 mb-6 transition-all duration-200"
      style={{
        background: 'var(--ink3)',
        border: '1px solid',
        borderColor: value ? 'var(--gold)' : 'var(--ink5)',
      }}
    >
      <Search size={18} style={{ color: 'var(--gold2)', flexShrink: 0 }} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by name, color, material, brand…"
        className="flex-1 bg-transparent outline-none text-sm"
        style={{ color: 'var(--cream)', caretColor: 'var(--gold2)' }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="shrink-0 transition-colors duration-150"
          style={{ color: 'var(--stone)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold2)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--stone)'; }}
        >
          <X size={16} />
        </button>
      )}
      {!value && (
        <span className="text-xs tracking-widest hidden sm:block" style={{ color: 'var(--stone)' }}>
          {/* placeholder hint */}
        </span>
      )}
    </div>
  );
}
