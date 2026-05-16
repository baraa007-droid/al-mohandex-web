# Migration: React Router → Next.js App Router

## Summary

This project has been fully migrated from React Router (SPA) to Next.js 15 App Router native routing.

---

## What Was Changed

### 1. `src/components/effects/Seo.tsx` — Rewritten
**Before:** Used `react-helmet-async` (`<Helmet>` tags) for client-side head management.  
**After:** Uses `useEffect` to imperatively update `document.title` and meta tags directly — fully compatible with Next.js App Router's client components. The root `src/app/layout.tsx` already exports `metadata` for static SEO at the server level; the `Seo` component handles dynamic per-page overrides on the client (needed because pages are i18n-aware at runtime).

### 2. `src/app/providers.tsx` — Simplified
**Before:**
```tsx
import { HelmetProvider } from 'react-helmet-async';
<HelmetProvider><AuthProvider>{children}</AuthProvider></HelmetProvider>
```
**After:**
```tsx
<AuthProvider>{children}</AuthProvider>
```
`HelmetProvider` removed since `react-helmet-async` is no longer used.

### 3. `src/components/layout/Footer.tsx` — Link fix
**Before:** `<a href="/privacy">` and `<a href="/terms">` (plain anchor tags causing full page reloads)  
**After:** `<Link href="/privacy">` and `<Link href="/terms">` (Next.js client-side navigation)

### 4. `package.json` — Dependency removed
`react-helmet-async` removed from dependencies.

---

## App Router Route Structure (Complete)

```
src/app/
├── layout.tsx                       ← Root layout with Providers + ScrollToTop
├── page.tsx                         ← / (Home)
├── not-found.tsx                    ← 404 page
├── about/page.tsx                   ← /about
├── services/page.tsx                ← /services
├── services/[serviceId]/page.tsx    ← /services/:serviceId
├── portfolio/page.tsx               ← /portfolio
├── portfolio/[id]/page.tsx          ← /portfolio/:id
├── blog/page.tsx                    ← /blog
├── blog/[id]/page.tsx               ← /blog/:id
├── contact/page.tsx                 ← /contact
├── pricing/page.tsx                 ← /pricing
├── privacy/page.tsx                 ← /privacy
├── terms/page.tsx                   ← /terms
├── login/page.tsx                   ← /login
├── admin/page.tsx                   ← /admin
└── start-project/page.tsx          ← /start-project
```

---

## Already-Migrated Items (Pre-existing)

These were already correctly using Next.js APIs before this migration:

| Pattern | Status |
|---|---|
| `import Link from 'next/link'` | ✅ All views |
| `useRouter()` from `next/navigation` | ✅ LoginPage, AdminDashboard |
| `usePathname()` from `next/navigation` | ✅ Navbar, ScrollToTop |
| Dynamic params via `use(params)` | ✅ All `[param]` routes |
| `export const metadata` in layout.tsx | ✅ Root layout |
| `ScrollToTop` using `usePathname` | ✅ scroll-to-top-wrapper.tsx |
| No `BrowserRouter`/`Routes`/`Route` | ✅ Never present |

---

## Build & Run

```bash
npm install
npm run build
npm run dev
```

No TypeScript errors expected. All routes are SEO-friendly via Next.js App Router file-based routing.
