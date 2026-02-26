# Peak Finder BD — AI Agent Instructions

## Project Overview

BD Peaks (`bdpeaks.info`) is a geographic archive of Bangladesh's mountains and waterfalls. It consists of two independently deployed services:

| Service | Stack | Port | Deploy URL |
|---------|-------|------|------------|
| **Frontend** | Vite + React 18 + TypeScript | 8080 | `bdpeaks.info` |
| **Backend API** | Express + Prisma + SQLite | 3000 | `api.bdpeaks.info` |

Both live on a single VPS (159.203.93.43) managed by **Coolify**. Pushing to `main` triggers auto-deploy for both services.

## Architecture & Data Flow

```
src/data/mockData.ts  ──→  React pages  ──→  Mapbox GL (map rendering)
                                              ↕
backend/server.js     ──→  /api/contributions (SQLite via Prisma)
                                              ↕
                      Admin Dashboard  ←──  PATCH /api/contributions/:id
```

- **All peak/waterfall data lives in `src/data/mockData.ts`** (~3300 lines). No database migration needed for data changes — just edit the arrays.
- The backend only handles user-submitted **contributions** (crowdsourced coordinate suggestions). The main database is the TypeScript file.
- The `VITE_API_URL` env var connects the frontend to the API (`https://api.bdpeaks.info` in production).

## Key Data Structures

### Mountain (in `mockData.ts`)
```typescript
{
  id: string, name_en: string, name_bn: string, alt_name: string,
  slug: string,                    // URL-safe identifier, used in routes
  altitude_ft: number, altitude_m: number,
  height_source: "gps" | "gearth", // gps = verified, gearth = estimate
  region: "Bandarban" | "Rangamati" | "Khagrachari" | "Chittagong" | "Sylhet",
  lat: number, lng: number,        // 0,0 = coordinates unknown
  coordinates_pending?: boolean,    // true = shown with "pending" badge, no map pin
  category: "peak",
  extended?: MountainExtended,      // detailed survey data for major peaks
}
```

### Waterfall (in `mockData.ts`)
```typescript
{
  id: "w1"–"w30",                   // prefixed with "w" to distinguish from peaks
  slug: string,                     // used in /waterfall/:slug routes
  nearby_peak_slugs: string[],      // cross-references to related peaks
  hydrology: WaterfallHydrology | null,
}
```

### Coordinate Updates Pattern
When updating coordinates from `lat: 0, lng: 0` to real values:
1. Set `lat` and `lng` to decimal degrees (e.g., `21.3831`)
2. Remove `coordinates_pending: true` (or set to `false` for waterfalls)
3. If source is GPS, change `height_source` from `"gearth"` to `"gps"`

## Frontend Details

- **Routing**: `src/App.tsx` — all pages except `Index` are lazy-loaded with `React.lazy()` + `Suspense`
- **Pages**: `src/pages/` — `Index`, `Explore`, `PeakDetail`, `WaterfallDetail`, `MapPage`, `RegionDetail`, `Contribute`, `AdminDashboard`, `NotFound`
- **UI library**: Shadcn UI (Radix primitives) in `src/components/ui/`
- **Animations**: All pages wrap their root in `<PageTransition>` (Framer Motion)
- **Styling**: Always use `cn()` from `src/lib/utils.ts` for conditional class merging
- **Map token**: Hardcoded in `src/lib/mapbox.ts` — used by `MapPage`, `PeakDetail`, `WaterfallDetail`, and `ContributionForm`
- **Mapbox container**: Must use explicit `width: 100%; height: 100%` — never `absolute inset-0` (Mapbox overrides `position` to `relative`)

### Build Optimization
`vite.config.ts` uses `manualChunks` to split heavy vendors:
- `vendor-core`: react, react-dom, react-router-dom
- `vendor-map`: mapbox-gl (~1.7MB, lazy-loaded only on Map page)
- `vendor-motion`: framer-motion
- `vendor-ui`: recharts, react-query

## Backend Details

- **Single file**: `backend/server.js` (Express, no TypeScript)
- **Database**: SQLite via Prisma, schema at `backend/prisma/schema.prisma`
- **Data dir**: `/data` in Docker (volume-mounted for persistence, NOT `/app/prisma`)
- **Endpoints**:
  - `POST /api/contributions` — submit new contribution
  - `GET /api/contributions` — list all (admin)
  - `PATCH /api/contributions/:id` — approve/reject `{ status: "APPROVED" | "REJECTED" }`
  - `GET /health` — Coolify health check
- **CORS**: Allows `bdpeaks.info`, `www.bdpeaks.info`, `localhost:8080`, `localhost:5173`

## Deployment

- **Coolify** at `coolify.nurulgofran.dev` — auto-deploys on push to `main`
- **Frontend Docker**: Multi-stage build → Nginx serving static files with gzip (`nginx.conf`)
- **Backend Docker**: Node 20 Alpine, runs Prisma generate + migrate on start
- **Backend env**: `DATABASE_URL=file:/data/dev.db`, `PORT=3000`
- **Frontend build var**: `VITE_API_URL=https://api.bdpeaks.info`

## Developer Commands

```bash
# Frontend
npm run dev          # Vite dev server on :8080
npm run build        # Production build (check chunk sizes)
npm run test         # Vitest
npm run lint         # ESLint

# Backend (from /backend)
node server.js       # Start API server
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma db push   # Apply schema to SQLite
```

## SEO & Static Assets

- `public/sitemap.xml` — auto-generated, lists all peaks + waterfalls
- `public/robots.txt` — points to sitemap, blocks `/admin`
- `public/og-image.png` — Open Graph preview image
- `index.html` — contains OG tags, Twitter cards, canonical URL, theme-color
