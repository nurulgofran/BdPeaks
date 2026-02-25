

# Bangladesh Mountain & Waterfall Archive — Phase 1

## Overview
Build the foundation of a "Premium Adventure" wiki-archive for Bangladesh's mountains and waterfalls, starting with mock data and the core browsing experience.

## Design System — "Mountain Midnight"
- Dark theme by default: deep gray backgrounds (#111827), emerald accents (#10B981), high-contrast white text
- Smooth page transitions, subtle hover effects on cards
- Mobile-first responsive design throughout

## 1. Responsive Navbar
- Sticky top navigation with site logo/title ("BD Peaks")
- Links: **Home**, **Explore**, **Map**, **Contribute**
- Mobile hamburger menu with slide-out drawer
- Emerald accent on active route, dark translucent background

## 2. Home Page — Cinematic Hero
- Full-viewport hero section with CSS gradient + layered mountain silhouette SVG overlay
- Large headline: "Discover Bangladesh's Hidden Peaks & Waterfalls"
- Global search bar (searches by name, height, or region — UI only for now)
- Below the fold: "Featured Peaks" carousel (3-4 cards) and "Latest Updates" section
- Smooth scroll indicator

## 3. Explore Page (`/explore`)
- **Sidebar filters**: Region (Bandarban, Rangamati, Khagrachari), Altitude Range slider, Category toggle (Peak / Waterfall), Difficulty range (1-10)
- **View toggle**: Switch between card grid and compact table/list view
- **Card view**: Image placeholder, peak name (English + Bengali), altitude badge, difficulty indicator, region tag
- **List view**: Dense table with sortable columns (Name, Altitude, Region, Difficulty)
- 5 dummy mountains with realistic Bangladeshi peak data (e.g., Tahjindong, Keokradong, Mowdok Mual)
- Filters work client-side against the mock data
- Mobile: sidebar collapses into a filter drawer

## 4. Placeholder Pages
- **Map page** (`/map`): Simple placeholder with "3D Map Coming Soon" message
- **Contribute page** (`/contribute`): Placeholder with "Submission Form Coming Soon"
- **Detail page** (`/peak/:slug`): Basic layout stub linked from Explore cards — shows peak name, altitude, and a placeholder for the future Mapbox map

## Mock Data
- 5 mountains with realistic data: name_en, name_bn, slug, altitude_ft, region, lat, lng, difficulty (1-10), prominence, range, and short descriptions
- All data stored in a local TypeScript file for easy future migration to Supabase

