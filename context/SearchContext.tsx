'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SearchContextType {
  isOpen: boolean;
  query: string;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
  setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQueryState] = useState('');

  const openSearch = useCallback((initialQuery = '') => {
    setQueryState(initialQuery);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQueryState('');
    document.body.style.overflow = '';
  }, []);

  const setQuery = useCallback((q: string) => {
    setQueryState(q);
  }, []);

  return (
    <SearchContext.Provider value={{ isOpen, query, openSearch, closeSearch, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
}
