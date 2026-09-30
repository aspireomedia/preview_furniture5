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

## Known issue (not fixed — awaiting direction)
- The "Best Seller" / "New Arrivals" / "Special Offer" buttons in the homepage `#products` section are static, non-functional `<button>`s: they carry an `active` class for appearance but do not filter anything, so "Best Seller" appears selected while the grid shows the first 25 catalogue items regardless. The catalogue has 20 badged items (12 Best Seller, 7 New Arrival, 1 Special Offer). Left untouched to stay in scope — needs an explicit decision before wiring.

## Constraints
- Approved Better Space palette: chocolate #37291d, burgundy #461102, olive #5d5b35, cool oatmeal #d5d1bc.
- No temporary Figma asset URLs in production.
- Client-only preview interactions: menu, search, wishlist and cart.
- Commerce and staff error routes are demonstrable UI coverage for this frontend-only preview. They do not imply live payment, inventory, account or upload backends.