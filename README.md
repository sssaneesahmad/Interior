# Atelier Sorel — Luxury Furniture & Architectural Interiors

Production-ready React, TypeScript, Vite, and Tailwind CSS storefront for **Atelier Sorel**, designed for static deployment on Hostinger or any modern static web host.

## Tech Stack

- **React 19** & **TypeScript**
- **Vite 8** (static production bundle to `dist/`)
- **Tailwind CSS v4**
- **Lucide React** icons

## Commands

- **Development server:** `npm run dev`
- **Type check:** `npm run lint`
- **Production build:** `npm run build`
- **Preview production build:** `npm run preview`

## Deploying to Hostinger

1. Run `npm install` followed by `npm run build`.
2. Upload the entire contents of the generated `dist/` directory into your Hostinger domain's `public_html/` folder via File Manager, FTP, or Git deployment.
3. The included `public/.htaccess` file is automatically copied to `dist/.htaccess` to handle SPA routing fallbacks and long-lived static asset caching on Hostinger's Apache/LiteSpeed servers.

## Integrating Live Form & Checkout Endpoints

Client-side validation, persistent local shopping bag (`localStorage`), saved wishlist, and order/consultation reference generation are separated cleanly inside `src/components/`. Connect your preferred form endpoint, headless commerce API, or payment gateway inside `CartDrawer.tsx`, `ConsultationModal.tsx`, and `NewsletterSection.tsx`.
