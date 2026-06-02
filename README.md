# E-Commerce Frontend (React + Vite + TypeScript)

Frontend web application for the e-commerce platform.

This app provides:

- customer storefront and checkout,
- account/auth screens,
- admin dashboards (users, orders, products, payments),
- delivery management and reporting screens.

## Stack

- React 18
- Vite
- TypeScript
- Redux Toolkit + RTK Query
- React Router
- Tailwind CSS

## Repository Layout

Main source folders:

- `src/pages` - route-level pages (Customer + Admin)
- `src/components` - reusable UI components
- `src/store` - Redux slices and RTK Query APIs
- `src/utils` - API helpers and response helpers
- `src/constants` - app constants and config

## Environment Variables

Copy and edit:

```bash
cp .env.example .env
```

Key variables:

- `VITE_API_BASE_URL` (backend base URL, e.g. `http://localhost:8080`)
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_STRIPE_CURRENCY`
- `VITE_CLOUDINARY_*` (if media upload is used)

## Quick Start

### 1) Install

```bash
npm install
```

### 2) Run Dev Server

```bash
npm run dev
```

Default URL: `http://localhost:5173`

### 3) Build

```bash
npm run build
```

## Scripts

- `npm run dev` - start local development server
- `npm run build` - type-check + production build
- `npm run preview` - preview built output
- `npm run lint` - run ESLint

## API Integration Notes

- Frontend consumes both legacy and versioned backend endpoints.
- RTK Query endpoints are defined in `src/store/shopApi.ts`.
- Base API URL comes from `VITE_API_BASE_URL` via config utilities.
- Auth state is stored and restored from browser storage with token checks.

## Handover Notes (For Next Developer)

1. Confirm backend URL in `.env` before debugging API errors.
2. Prefer RTK Query for new data-fetching paths.
3. Keep admin and customer flows separated by route and shell.
4. Align endpoint changes with backend `/api/v1` contracts.
5. For large new screens, split components early to avoid page bloat.

## Related Repositories

- Backend: [e-commerce-backend-app](https://github.com/josephus-mupanda/e-commerce-backend-app)
