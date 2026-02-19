# Benito Anagua — Interactive Portfolio

A modern, anti-reflow portal showcasing an interdisciplinary creative practice across design, development, and graphic design disciplines. Built with Svelte + TypeScript and a carefully crafted design system rooted in architectural narratives.

## Architecture Overview

### Design System Principles

- **Anti-Reflow Interactions**: All interactive states use GPU-accelerated box-shadow rings and transforms instead of layout-altering borders
- **Modular Boundary System**: `shared-boundary` grid-based layout with 1px gaps for visual cohesion
- **Typography Hierarchy**: Display (Archivo Black), Body (Sora), and Mono (JetBrains Mono) for distinct information layers
- **Responsive Ring Tokens**: `--ring-primary` and `--ring-outline` for consistent focus states across all interactive elements

### Project Structure

```
src/
├── routes/              # Page layouts (home, developer, designer, graphic)
├── lib/
│   ├── components/      # Reusable UI blocks (PortalLayout)
│   ├── data/           # TOML-based content loaders (CV, site metadata)
│   ├── state/          # Reactive stores (language toggle)
│   ├── styles/         # Global design tokens and component styles
│   └── types/          # TypeScript interfaces (CV, Site)
└── static/             # Assets and generated CV files
```

### Content Layer

Content is stored in TOML format for maintainability:

- `cv.en.toml` / `cv.es.toml` — Professional experience, education, skills
- `site.en.toml` / `site.es.toml` — Navigation, metadata, descriptive content

The loaders (`cv-loader.ts`, `site-loader.ts`) parse and type these files at build/render time.

## Development

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Setup

```sh
# Install dependencies
pnpm install

# Start development server with HMR
pnpm run dev

# Open in browser
pnpm run dev -- --open
```

### Building for Production

```sh
# Build static site
pnpm run build

# Preview production build locally
pnpm run preview
```

## Deployment to Cloudflare Pages

This project is configured as a **fully static site** using `@sveltejs/adapter-static`, making it perfect for [Cloudflare Pages](https://pages.cloudflare.com/). No server-side rendering or server-side dependencies needed.

### Quick Setup (Recommended)

1. **Create a Cloudflare Pages project**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Connect your GitHub repository
   - Select branch: `main`
   - Build command: `pnpm install && pnpm run build`
   - Build output directory: `build`
   - Node.js version: 18 LTS
   - Leave environment variables empty for now

2. **Automatic Deployment** (GitHub integrated):
   - Every push to `main` triggers automatic build and deployment
   - Preview URLs are generated for pull requests

### Manual Deployment

Without GitHub integration, you can deploy directly using Cloudflare's CLI:

```sh
# Install Wrangler CLI globally
npm install -g wrangler

# Or use it with pnpm
# pnpm add -D wrangler

# Build the project (generates ./build directory)
pnpm run build

# Deploy directly to Cloudflare Pages
wrangler pages deploy build
```

### Local Testing

```sh
# Build and preview locally
pnpm run build
pnpm run preview
```

### Deployment Workflow

1. **Development** → Push to feature branch
2. **Preview** → Cloudflare auto-generates preview deployment
3. **Production** → Merge to `main` and deploy automatically

### Project Configuration Files

- **`svelte.config.js`** — SvelteKit configuration with `@sveltejs/adapter-static`
- **`wrangler.toml`** — Optional Wrangler CLI configuration for manual deployments
- **`.github/workflows/deploy.yml`** — Optional GitHub Actions CI/CD for automatic deployments
- **`.env.example`** — Template for environment variables (if needed)

## Key Features

### Sections

1. **LOBBY_HERO** — Introductory terminal-style header with name and tagline
2. **SELECT_PATH_MODALITY** — Three-column grid linking to discipline-specific pages
   - Anti-reflow hover states using inset box-shadow accents (dev=pink, ux=primary, gfx=blue)
   - Animated path glyphs in background
3. **CONTACT_CHANNELS & ACADEMIC_RECORD** — Node-based information modules

### Interactive Details

- **Text Selection**: Primary color highlight with accessible contrast
- **Scrollbar**: Custom-styled across Webkit (Chrome, Safari, Edge) and Firefox
- **Focus States**: Ring system provides clear but non-disruptive focus indicators
- **Transitions**: GPU-optimized transforms and box-shadows for smooth performance

## Technologies

- **Framework**: SvelteKit + TypeScript
- **Styling**: Plain CSS with CSS variables (Material Design 3 tokens)
- **Build**: Vite
- **Deployment**: Cloudflare Pages
- **Data**: TOML loaders
- **Icons**: Material Symbols Outlined

## Environment Variables

Optional configuration via `.env.local` (see `.env.example`):

- `VITE_ANALYTICS_ID` — Analytics tracking ID
- `VITE_SITE_URL` — Custom domain URL
- `VITE_API_URL` — External API endpoint

## Troubleshooting

### Build fails with "ENOSPC: No space left on device"

```sh
pnpm store prune
pnpm install
```

### Cloudflare Pages deployment stuck or failing

- Check build logs in Cloudflare Pages dashboard
- Verify Node.js version is 18+ in project settings
- Ensure `build` directory is specified as output directory (not `.svelte-kit`)
- Try clearing cache and rebuilding locally:
  ```sh
  rm -rf .svelte-kit build
  pnpm install
  pnpm run build
  ```

### Development server won't start after installation

```sh
# Clear node_modules and reinstall
rm -rf node_modules .pnpm-store pnpm-lock.yaml
pnpm install
pnpm dev --open
```

### Preview shows blank page

```sh
# Rebuild and preview
rm -rf build
pnpm run build
pnpm run preview
```

---

**Design Philosophy**: Structure as narrative. Every grid intersection, every gap, every color choice tells a story about the work and the maker.
