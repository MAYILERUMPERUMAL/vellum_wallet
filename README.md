# VELLUM — Luxury Wallet E-Commerce (Next.js 14)

A production-ready, dark-themed luxury e-commerce site for a leather wallet brand.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **State**: React Context API (Cart + Search)
- **Persistence**: localStorage (cart survives refresh)
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond (serif) + DM Sans (body) via Google Fonts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
vellum/
├── app/
│   ├── page.tsx              # Home page
│   ├── shop/page.tsx         # Shop with filters
│   ├── product/[id]/page.tsx # Product detail
│   ├── cart/page.tsx         # Cart page
│   └── checkout/page.tsx     # Checkout page
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Sticky header with search + cart
│   │   ├── Footer.tsx
│   │   ├── AnnouncementBar.tsx
│   │   └── SearchOverlay.tsx # Full-screen search (ESC to close)
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── CategoryRow.tsx   # Horizontal scroll per category
│   │   ├── FeaturedSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── MarqueeStrip.tsx
│   ├── shop/
│   │   ├── ShopClient.tsx    # Filters + sort + grid
│   │   └── ShopSearchBar.tsx
│   ├── product/
│   │   └── ProductDetailClient.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx    # Slide-in cart
│   │   ├── CartPageClient.tsx
│   │   └── CheckoutClient.tsx
│   └── ui/
│       └── ProductCard.tsx   # Reusable card
├── context/
│   ├── CartContext.tsx       # Cart state + localStorage
│   └── SearchContext.tsx     # Search open/close/query state
├── lib/
│   └── data.ts               # 14 products + testimonials
└── types/
    └── index.ts              # TypeScript interfaces
```

## Key Features

### 🔍 Full-Screen Search
- Click search icon in header → full dark overlay opens
- Shows trending searches + category shortcuts + popular picks when empty
- Live results as you type — filters by name, brand, color, material, tags
- Press ESC or × to close and return to the page you were on
- "View all in Shop" link passes the query to Shop page

### 🛍 Shop Page Filters
- **Search bar** — real-time text search
- **Category** — Men / Women / Leather / Minimal / Travel
- **Price range** — slider up to ₹8,000
- **Brand** — VELLUM / FOLIO
- **Color swatches** — Black / Brown / Tan / Navy / Green / Burgundy
- **Material** — Full-Grain / Genuine / Synthetic / Canvas
- **Sort** — Default / Price ↑↓ / Rating / Newest
- Active filter tags with individual × to remove
- Mobile sidebar drawer for filters

### 🏠 Homepage Category Rows
- 4 horizontal-scroll category rows: Men's / Women's / Leather / Minimal
- Chevron navigation buttons
- Each links to Shop page pre-filtered to that category

### 🛒 Cart
- Persistent via localStorage
- Add from product card hover, detail page, or search overlay
- Cart drawer (slide from right) + full cart page
- Quantity update, remove, free shipping threshold indicator

## Design Tokens (globals.css)
All colors are CSS custom properties:
- `--ink` `--ink2` `--ink3` `--ink4` `--ink5` — dark backgrounds
- `--gold` `--gold2` `--gold3` — accent gold/yellow
- `--cream` `--mist` `--stone` — text shades
