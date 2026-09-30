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

## Constraints
- Approved Better Space palette: chocolate #37291d, burgundy #461102, olive #5d5b35, cool oatmeal #d5d1bc.
- No temporary Figma asset URLs in production.
- Client-only preview interactions: menu, search, wishlist and cart.
- Commerce and staff error routes are demonstrable UI coverage for this frontend-only preview. They do not imply live payment, inventory, account or upload backends.