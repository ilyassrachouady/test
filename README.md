# HYB Prévention Conseil — reusable Next.js template

Next.js landing page with the original KlinUp-inspired layout, motion and responsive breakpoints, adapted for HYB Prévention Conseil.

## Run locally
npm install
npm run dev

## Reuse for another business
- Edit lib/site.ts for company name, contact, services, FAQ and expertise.
- Edit section text in components/landing-page.tsx, keeping classes, animations and layout unchanged.
- Replace public/hyb-mark.svg and app/icon.svg with the customer's approved logo.
- Change --brand-accent and --brand-accent-deep in app/globals.css to set brand colors.
- Replace all inherited cleaning photos in public/images with approved customer images.
- Update app/layout.tsx SEO details. Keep noindex until customer approval.

## Email delivery
Add RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in Vercel. Otherwise the form opens a mailto draft.

The blue color is provisional; the SVG badge is a custom template mark, not the official HYB logo.
Sources: hybpreventionconseil.ca (accueil, à propos, services).
