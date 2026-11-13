# HYB Prévention — reusable cleaning-services Next.js template

A responsive cleaning-services landing page based on the original KlinUp-inspired layout, rebranded as HYB Prévention with custom SVG identity, Lucide icons, and motion animations.

## Run locally
```bash
npm install
npm run dev
```

## Reuse for another business
- Edit `lib/site.ts` for company information, service cards, FAQs, and service-detail cards.
- Edit the hero, about, steps, before/after, and contact copy in `components/landing-page.tsx` while keeping the existing classes, animations, and structure.
- Replace `public/hyb-mark.svg` and `app/icon.svg` with the new client's approved SVG marks.
- Update `--brand-accent` and `--brand-accent-deep` in `app/globals.css` for brand colors.
- Replace the photos in `public/images` with licensed company-approved images.
- Update `app/layout.tsx` and keep `noindex` until the copy, business details, and offerings are approved.
- Keep the service select options in `components/landing-page.tsx` synchronized with `app/api/contact/route.ts`.

## Contact form
Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in Vercel to enable email submission. Without those values, the form opens an email draft via `mailto:`.

## Publication note
This **cleaning-services concept is unverified as an offering of HYB Prévention Conseil**. The publicly listed company associated with Hygo Bisimwa specializes in SST, RH, and training. Confirm that the HYB name, telephone number, email, and proposed cleaning services may be used together before public advertising. The current SVG and blue accent are provisional, not verified official brand assets.
