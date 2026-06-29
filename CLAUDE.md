# EventEase — Claude Code Context

## What this project is
Zimbabwe's first AI-powered event planning and vendor marketplace platform. Owner: Vimbai S Chari, EventEase (Pvt) Ltd.

## Tech stack
- **Next.js 16** App Router · TypeScript · Tailwind CSS
- **Supabase** — Postgres DB, Auth, Storage, Realtime
- **Anthropic Claude API** (`claude-sonnet-4-6`) — all AI features
- **GSAP** (ScrollTrigger, DrawSVG, Physics2D) — premium animations
- **Anime.js v4** — SVG bloom/line animations, particle bursts
- **Framer Motion** — page transitions
- **Resend + React Email** — transactional email
- **Vercel** — deployment

## Brand
- Teal `#006D77` (dark mode: `#00c4ce`) — primary
- Gold `#C9A84C` (dark mode: `#e4b94f`) — accent
- Navy `#1A1A2E` — dark text
- Fonts: **Poppins** (headings, buttons) / **Inter** (body)
- Dark mode via `[data-theme="dark"]` on `<html>`

## Dev commands
```bash
npm run dev     # Start dev server on :3000
npm run build   # Production build
npm run lint    # ESLint
```

## Environment variables
Copy `.env.local.example` to `.env.local` and fill in:
- `ANTHROPIC_API_KEY` — for all AI features
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — database
- `RESEND_API_KEY` — email

## Key directories
```
src/
  app/
    (auth)/login, register      — Auth pages
    (dashboard)/dashboard       — User dashboard
    (dashboard)/events          — My events list
    (dashboard)/events/new      — AI event creation wizard
    vendors/                    — Public vendor marketplace
    pricing/                    — Pricing page
    api/ai/                     — Claude AI endpoints
  components/
    layout/                     — Navbar, Footer, ThemeProvider, DashboardLayout
    home/                       — All homepage sections
  lib/utils.ts                  — cn(), formatCurrency(), formatDate()
  types/index.ts                — All shared TypeScript types
  app/globals.css               — Full design system (CSS variables, buttons, etc.)
```

## Animation conventions
- Animations use dynamic import('gsap') / import('animejs') inside useEffect for SSR safety
- prefers-reduced-motion is handled globally in globals.css
- Bloom SVG lines use .bloom-line class
- Magnetic buttons: data-magnetic attribute + GSAP

## Payment model
Manual verification — EcoCash, InnBucks, bank transfer. Users upload proof, admin approves. No payment gateway needed at launch.
