## State
- Better Space furniture storefront is deployed and branded at preview5.aspireomedia.com.
- Catalogue reseeded 2026-09-30 with EDI's 100-product furniture dataset (`furniture-catalog/out/preview5-products.ts`): 18 product types, 7 rooms, real distinct Pexels photos per product (zero duplicate images — verified programmatically before and after seeding). Previous 22-item hand-authored catalogue (which had accidental duplicate local images across several "sibling variant" products, e.g. `luna`/`luna-loveseat`/`luna-ottoman` all sharing one JPG) was fully replaced.
- `next.config.ts` now whitelists `images.pexels.com` for `next/image` remote loading.
- A shared product catalogue now powers the homepage, `/products`, `/products/[id]`, `/cart`, and `/wishlist`; browser-local preview state keeps cart and saved items connected across these routes. PDP recommendations are exact product-type matches (for example, sofa → sofas and desk → desks), never mixed room-level items.
- The supplied ecommerce UI-kit Figma file informed only general commerce information architecture (collection, detail gallery, bag and wishlist flows); no reference imagery, copy, product names, or brand assets were used.
- Local furniture/interior assets are stored under public/images.
- Error-state coverage is implemented through the shared `ErrorExperience` component and `/status/[state]`: customer commerce, platform, session/admin and upload rejection states use the existing warm Better Space design tokens. App Router `not-found.tsx`, `error.tsx`, and `global-error.tsx` prevent raw framework error output.

## Homepage grid cap (2026-09-30)
- J Kal flagged that the homepage "Products You May Like" section (`#products` in `src/components/StoreSections.tsx`) rendered the entire 100-product catalogue with no limit.
- Confirmed the ambiguity in the request ("5x5 = 50"): 5x5 is 25, and J Kal confirmed **25** is the intended cap.
- Fix: `HOME_GRID_LIMIT = 25` with `homeGridProducts = products.slice(0, HOME_GRID_LIMIT)`, used only in `ProductGrid`. The rest of the catalogue stays reachable via "View All" → `/products` (still renders all 100 with the category sidebar).
- Verified in real browser: desktop 1440 shows exactly 25 cards in 5 rows x 5 columns; 390px shows 25 cards with no overflow; `/products` still 100; the 25th card's PDP loads with 4 related products; 0 console errors. Re-verified against production after deploy.

## Homepage RUMAIO composition (2026-09-30)
- On J Kal's explicit instruction, rebuilt **only** `/` to the supplied RUMAIO retail blueprint. The new implementation is isolated to `src/components/Storefront.tsx` and route-local `src/app/homepage.css`; `Header.tsx`, `StoreSections.tsx`, global CSS and all non-home route compositions are unchanged.
- Exact desktop order: three-tier commerce header → contained carousel hero → weekly editorial intro + exactly 4 products → asymmetric category mosaic (3 equal cards, then 2 unequal cards) → exactly 10 recommended products (5×2 desktop) → shallow promotion → four benefits → four-column footer + payment strip.
- Removed only from the homepage: circular room-icon strip, equal 3×2 category grid, static product tabs, 25-card grid, oversized dining panel. Full 100-product index remains `/products`.
- Verified production-build browser QA: desktop/mobile no overflow or console errors; 4 weekly cards, mosaic 3+2, 10 recommended cards, zero broken images after lazy-scroll. `/products`, PDP, cart and wishlist all remained HTTP 200 with their existing H1s/layout composition. Working anchor/routing checks: hero Shop Now → `#recommended`, sale nav → `#weekly`, promo → dining products, View All → `/products`, footer categories → respective catalogue routes, add-to-cart increments the badge.

## Premium homepage positioning (2026-10-01)
- `/premium` sequence is intentional: Hero → benefits → category chips → **Tentang Better Space** → **Sedang Populer** → **Koleksi Pilihan** → **Produk Terbaru** → **FAQ** → **Di Bawah Rp900.000** → newsletter → footer.
- About and FAQ are independent sections and must never be adjacent or duplicated. About uses `rgba(93,91,53,.8)` and FAQ uses `rgba(70,17,2,.8)`, with bold, fully opaque oatmeal (`#d5d1bc`) typography.

## Product-listing pagination (2026-10-01)
- J Kal's standing rule: **any page/section intended to display many catalogue products must paginate** — not just one named route. Applied to every long product listing in both Preview5 and Preview6, standard + premium.
- Surfaces covered: P5 `/products` (all rooms + each category), P5 `/premium/shop`, P6 `/products`, P6 `/premium/[room]`.
- Shared pieces (same file copied into both repos): `src/lib/paginate.ts` (pure `paginate<T>()`, `PAGE_SIZE_OPTIONS = [20,40,60,100]`, `parsePageParam`, `parsePageSizeParam`, `buildPageList` collapsing) and `src/components/Pagination.tsx` (`ListingRangeLabel`, `PageSizeSelect`, `Pagination` with prev/next, collapsed numbers, mobile `page / total` indicator, optional scroll-to-listing).
- Ordering is always **filter → sort → count → slice**; the range label and page count are computed from the filtered set, never the raw catalogue.
- URL is the single source of truth for `page` / `limit` (and category where applicable) so filtered+paged views are shareable deep links. Selection state is a local mirror adopted through the **render-time adjustment pattern** (`if (seenUrl.x !== urlX) { setSeenUrl(...); setState(...) }`), never a `useEffect` — an effect here causes both cascading-render lint errors and stale-`searchParams` clobbering.
- **Pitfall (cost real debugging time):** a reset-key derived from the *local* category mirror instead of the already-committed `urlCategory` fires mid-commit against a stale `searchParams` identity, silently reverting a category selection and writing a URL without `category=`. Key the reset off `urlCategory`, and have the category-picking handler keep the `seenUrl` baseline in step.
- **Pitfall:** passing `onPageChange={setPage}` (state only) leaves the URL stale — every paging control must route through the same `pushUrl` writer.
- **Pitfall:** in both `src/app/globals.css` (P5) and `src/app/furniture/furniture.css` (P6) an unscoped `flex-direction:column` rule (intended for mobile) overrode the desktop toolbar row. Mobile toolbar stacking now lives inside `@media (max-width:760px/850px)`.
- Native `<select>` chevrons were replaced with a themed inline-SVG chevron + hover/focus ring per each site's palette (P5 burgundy/chocolate, P6 teal, both premium oatmeal/brown), and duplicate `.page-size-select` rules that fought the cascade were removed.
- Verified with three Playwright suites (137 assertions, 0 failures): core paging behaviour, filter/sort interaction with per-category counts, and a **full-sweep integrity check** asserting every product appears exactly once with no skips at 20/40/60/100 per page on all four surfaces. Page sizes are 20/40/60/100 (J Kal corrected the original 25/50/100: 25 assumes a 5-column grid, but the actual listing grids are 3 and 4 columns, so 20 keeps every row complete). Mobile checked for zero horizontal overflow.

## Constraints
- Approved Better Space palette: chocolate #37291d, burgundy #461102, olive #5d5b35, cool oatmeal #d5d1bc.
- No temporary Figma asset URLs in production.
- Client-only preview interactions: menu, search, wishlist and cart.
- Commerce and staff error routes are demonstrable UI coverage for this frontend-only preview. They do not imply live payment, inventory, account or upload backends.