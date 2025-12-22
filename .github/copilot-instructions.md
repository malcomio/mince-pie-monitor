# AI Coding Instructions for Mince Pie Monitor

## Project Overview
**Mince Pie Monitor** is a statically generated blog built with Next.js 14 (App Router) and Contentful CMS. It showcases a leaderboard of mince pies with ratings, photos, and detailed reviews. Content is managed entirely in Contentful and deployed as a static site.

**Key Stack**: Next.js (App Router), React 18, Contentful GraphQL API, Tailwind CSS, TypeScript, Vercel deployment

## Architecture Patterns

### Data Flow: Contentful → GraphQL → React Pages
1. **Content Source**: Contentful CMS via GraphQL queries (not REST)
2. **Fetching**: `lib/api.ts` handles all Contentful queries with field extraction helpers
3. **Static Generation**: Next.js generates all pages at build time using `generateStaticParams()`
4. **Caching**: ISR uses `revalidateTag("mincePie")` triggered by Contentful webhooks

**Critical Files**:
- `lib/api.ts`: GraphQL query definitions and fetch wrapper
- `app/[route]/page.tsx`: Page components with `generateStaticParams()` calls
- `app/api/revalidate/route.ts`: Webhook endpoint for Contentful-triggered cache revalidation

### Component Organization
- **Page Components** (`app/`): Use App Router structure; fetch data and compose layout
- **UI Components** (`lib/components/`): Presentational components (Score, Leaderboard, Footer)
- **Data Utilities** (`lib/`): API calls, constants, markdown/image utilities

**Pattern Example**:
```typescript
// Page components always include generateStaticParams for ISR
export async function generateStaticParams() {
  const allPies = await getAllPies();
  return allPies.map((pie) => ({ slug: pie.slug }));
}
```

## Content Model (Contentful)
The app expects a **mincePieCollection** with fields:
- `slug`: URL identifier
- `title`: Pie name
- `rating`: 0-5 score (used for ordering)
- `description`: Rich text JSON (rendered via Contentful renderers)
- `image`: Asset with URL
- `year`: Optional year field

See `lib/api.ts` `POST_GRAPHQL_FIELDS` for the exact query schema.

## Critical Workflows

### Local Development
```bash
npm run dev      # Start dev server (hot reload, uses draft content if CONTENTFUL_PREVIEW_ACCESS_TOKEN set)
npm run setup    # Initialize Contentful space structure (requires CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN)
```

### Building & Deployment
```bash
npm run build    # Next.js static export to /out directory
npm run deploy   # Build + rsync /out to production server (159.65.55.89)
```

**Output**: Static HTML files in `/out/` (trailingSlash enabled, so `/pies/pie-name/index.html`)

### Cache Invalidation
Contentful webhooks POST to `/api/revalidate` with header `x-vercel-reval-key` (validated against `CONTENTFUL_REVALIDATE_SECRET`). This revalidates the "mincePie" tag without full rebuild.

## Environment Variables
Required for runtime:
- `CONTENTFUL_SPACE_ID`: Space ID from Contentful
- `CONTENTFUL_ACCESS_TOKEN`: Public API token
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`: Private preview token (optional, for draft mode)
- `CONTENTFUL_REVALIDATE_SECRET`: Webhook validation key

## Project Conventions

### Styling
- **Tailwind CSS** with typography plugin (`@tailwindcss/typography`)
- Classes used inline in components (no separate CSS modules)
- Shadow/rounded utilities for card-like sections (`.shadow-xl`, `.rounded-lg`)

### Rich Text Handling
- Contentful `description` fields are JSON (not markdown)
- Render with `@contentful/rich-text-react-renderer` in page components
- Use `documentToPlainTextString` for metadata/excerpts

### Naming Conventions
- Components: PascalCase functions (e.g., `Leaderboard`, `Footer`)
- APIs: Verb + Noun (e.g., `getPie()`, `getAllPies()`, `getPreviewPostBySlug()`)
- Routes: kebab-case directories (e.g., `/pies/[slug]/`, `/about/`)

## Common Tasks

**Adding a new page**:
1. Create `app/new-page/page.tsx` with `export async function generateStaticParams() { return [{}]; }`
2. Fetch data using functions from `lib/api.ts`
3. Compose with shared components from `lib/components/`

**Modifying Contentful schema**:
1. Update the content model in Contentful dashboard
2. Update `POST_GRAPHQL_FIELDS` in `lib/api.ts` with new fields
3. Update TypeScript types in page components
4. Test with preview token in dev mode

**Fixing broken images**:
- Check `lib/contentful-image.tsx` for image optimization (may be needed for Vercel Image Optimization)
- Ensure Contentful assets have `.url` field populated

## Gotchas
- **Static-only**: Site is fully static HTML. No runtime server-side logic except the revalidate webhook endpoint.
- **Async params**: Pages use `params: Promise<{ slug: string }>` pattern (Next.js 15 convention).
- **Tag revalidation**: The webhook uses tag "mincePie" (not "pies") — see `api/revalidate/route.ts`.
- **Build command**: Uses `output: 'export'` in `next.config.js`, generating `/out/` not `.next/`.
