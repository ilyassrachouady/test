# KlinUp — Next.js + Motion rebuild

A high-fidelity, Framer-inspired cleaning website built with Next.js App Router, React 19, TypeScript, Motion, and plain CSS. **Vercel-ready.**

## Run

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New Project**, import the repo, and use the automatically detected **Next.js** settings.
3. Optional for working contact submissions: set environment variables shown in `.env.example` in Vercel → Project → Settings → Environment Variables. Use a verified sending domain in Resend.
4. Deploy and point your custom domain to the project.

## Features

- Motion-based entry transitions, hover physics, viewport reveals, card stagger, counters, marquee, scroll progress and animated mobile navigation
- Adjustable before/after comparison slider and working FAQ accordion
- Contact form with server route, validation, bot honeypot and optional Resend integration
- Responsive, mobile-first layout, optimized local WebP photos, keyboard-friendly controls and reduced-motion support
- Editable content in `lib/site.ts`, shared styles in `app/globals.css`

## IMPORTANT before commercial launch

This is a **demo rebuild**, not an official KlinUp property. The sample visuals came from the HTML reference supplied for this project. Obtain the necessary rights or replace them before commercial use. Replace the sample company details, telephone number, testimonials, star rating, metrics and brand references with genuine information. Do not publish unverified claims. The form **will not send** until the optional Resend variables are configured; the UI gracefully offers an email fallback. Set your own privacy policy, contact info, and social links before publishing.

There are no bundled font files; the typography uses browser/system fonts for fast loading and portability.
