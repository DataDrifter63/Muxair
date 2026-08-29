# Ductwork Studio

Marketing website for **Ductwork Studio** — a web design and digital marketing
agency that works exclusively with HVAC companies (heating, cooling, air
quality, boilers, AC installers).

Dark, "industrial tech" visual direction with cyan (cooling) and orange
(heating) accents, built as a fast, animated, conversion-focused one-page
site: hero, problem/solution, services, results, portfolio, testimonials, and
a final call-to-action.

## Tech stack

- [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) (file-based routing, SSR)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) components
- [Motion](https://motion.dev/) for animation
- [Vite](https://vitejs.dev/) build tooling, deployed on [Netlify](https://www.netlify.com/) via [Nitro](https://nitro.build/)

## Getting started

Requires Node.js 20+.

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Type-check the project with `tsc` |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format the project with Prettier |

## Project structure

```
src/
  components/
    site/       # Page sections (Hero, Services, Portfolio, ...)
    ui/         # shadcn/ui primitives
  routes/       # File-based routes (TanStack Router) — see src/routes/README.md
  lib/          # Utilities, error reporting, error page
  styles.css    # Tailwind theme + design tokens
public/         # Static assets, favicons, robots.txt, sitemap.xml, OG image
```

## SEO

- `public/robots.txt` and `public/sitemap.xml` — update the domain in both
  (and in `src/routes/index.tsx`'s `SITE_URL`) before going live.
- `public/og-image.png` — social share preview image.
- Page metadata (title, description, Open Graph, Twitter card, JSON-LD
  `ProfessionalService` schema) is set per-route via TanStack Start's `head()`
  API — see `src/routes/__root.tsx` and `src/routes/index.tsx`.

## Deployment

The build produces a **standalone Node.js server** in `.output/` — it is not
tied to any specific hosting platform. Any host that can run Node.js works:
a VPS (DigitalOcean, Hostinger, etc.), Railway, Render, or a Node-enabled
cPanel plan.

```sh
npm run build     # builds to .output/
npm start          # runs the server (defaults to port 3000; set PORT to change)
```

Point your domain / reverse proxy (e.g. Nginx) at the port the server runs
on, or use your host's Node.js app support to run `npm start` directly.

If you later pick a specific platform with its own adapter (Vercel, Netlify,
Cloudflare, etc.), swap the `nitro({ preset: "node-server" })` line in
`vite.config.ts` for that platform's preset — the rest of the app doesn't
need to change.

### Push to GitHub

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

(`node_modules/`, `dist/`, and `.output/` are already excluded via
`.gitignore` — only source files get pushed.)
