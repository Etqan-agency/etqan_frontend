# ETQAN — Website

Marketing site for ETQAN, a software development and digital marketing agency.

Built with Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, GSAP and Lenis.

## Development

```bash
cp .env.example .env.local   # points the site at the Django API
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Content & the API

Services, portfolio projects, the hero/about text and contact details come from
the Django API (`etqan_backend`) and are edited in the dashboard (`etqan_dashboard`).
Pages re-read the API at most every 60 seconds. If the API is unreachable, the
site falls back to the built-in content in `src/lib/data.ts`, so it never breaks.

The contact form posts to `POST /api/contact/`; messages appear in the dashboard Inbox.

## Where things live

- `src/lib/api.ts` — reads content from the Django API
- `src/lib/data.ts` — fallback content and the process steps
- `src/components/` — page sections (one file per section)
- `public/images/` — service photos and project screenshots (WebP)
- `public/videos/` — hero background videos
- `public/brand/` — ETQAN logos
