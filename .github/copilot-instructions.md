# Peak Finder BD - AI Agent Instructions

## Project Context
Peak Finder BD is an interactive single-page application focused on exploring peaks, mountains, and waterfalls in Bangladesh. It leverages modern React paradigms and utility-first styling to deliver an animated and map-integrated user experience.

## Tech Stack & Architecture
- **Framework**: React 18+ with Vite (TypeScript + SWC)
- **Styling**: Tailwind CSS + `tailwindcss-animate`
- **UI Components**: Shadcn UI (built on Radix UI primitives)
- **Icons**: Lucide React (`lucide-react`)
- **Routing**: React Router DOM v6 (`react-router-dom`)
- **Animation**: Framer Motion (`framer-motion`)
- **State/Data Fetching**: TanStack Query (`@tanstack/react-query`)
- **Map Integration**: Mapbox GL (`mapbox-gl`)
- **Forms**: React Hook Form with Zod validation (`zod`)

## Project Structure & Data Flow
- `src/App.tsx`: The main entry component. It sets up providers (`QueryClientProvider`, `TooltipProvider`), layout wrappers (Toasters, Navbar, Footer), and heavily relies on animated routes (`<AnimatePresence>`).
- `src/pages/`: Contains all page-level components configured as routes (e.g., `Index.tsx`, `Explore.tsx`, `PeakDetail.tsx`, `MapPage.tsx`).
- `src/components/`: Reusable custom UI components (e.g., `PeakCard.tsx`, `WaterfallCard.tsx`).
- `src/components/ui/`: Auto-generated or imported Shadcn UI and Radix primitives.
- `src/data/mockData.ts`: Central source of truth for mock data (peaks, waterfalls, regions). Queries should resolve data locally from this file until a backend is integrated.
- `src/hooks/`: Custom state management and utility hooks (e.g., `use-mobile.tsx`, `use-toast.ts`).
- `src/lib/`: Application utilities. Use `utils.ts` for Tailwind merge strategies (the `cn()` utility), and `mapbox.ts` / `coordinates.ts` for map-related tasks.

## Developer Workflows
- **Package Manager**: The project includes both `package-lock.json` and `bun.lockb`. Use `npm` or `bun` depending on the developer's global environment for adding packages or running scripts.
- **Development Server**: Run `npm run dev` to start Vite.
- **Build**: Run `npm run build` or `npm run build:dev` for a development-mode build.
- **Testing**: Run `npm run test` or `npm run test:watch` using Vitest.
- **Linting**: Run `npm run lint` with ESLint.

## Specific Implementation Conventions
- **Component Styling**: Always construct class names using the `cn()` utility from `src/lib/utils.ts` to cleanly merge Tailwind CSS and Shadcn UI classes. Do not use plain template literals for conditional classes if `cn()` can handle it effectively.
- **Routing & Animations**: Pages are animated with Framer Motion. When introducing a new page, make sure to wrap its root element in an animation wrapper (like `<PageTransition>`) or configure its Framer Motion props to maintain application-wide transition consistency.
- **Forms & Validation**: Use `react-hook-form` connected to `zod` resolvers (`@hookform/resolvers`) for forms, specifically evident in the Contribute page. Avoid controlled native inputs without React Hook Form integration.
- **Map Interactions**: For handling maps, interact with the Mapbox GL instance configurations wrapped inside `src/lib/mapbox.ts` and `src/lib/coordinates.ts`. Rely on `@types/mapbox-gl` definitions for strict typing.
- **Data Fetching Patterns**: Data is queried using `@tanstack/react-query`. When adding new features, verify if the component maps directly to data in `src/data/mockData.ts` and implement a React Query wrapper around mock async fetching logic before proposing external API endpoints.
