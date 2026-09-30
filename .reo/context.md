## State
- Better Space furniture storefront is deployed and branded at preview5.aspireomedia.com.
- Catalogue reseeded 2026-09-30 with EDI's 100-product furniture dataset (`furniture-catalog/out/preview5-products.ts`): 18 product types, 7 rooms, real distinct Pexels photos per product (zero duplicate images — verified programmatically before and after seeding). Previous 22-item hand-authored catalogue (which had accidental duplicate local images across several "sibling variant" products, e.g. `luna`/`luna-loveseat`/`luna-ottoman` all sharing one JPG) was fully replaced.
- `next.config.ts` now whitelists `images.pexels.com` for `next/image` remote loading.
- A shared product catalogue now powers the homepage, `/products`, `/products/[id]`, `/cart`, and `/wishlist`; browser-local preview state keeps cart and saved items connected across these routes. PDP recommendations are exact product-type matches (for example, sofa → sofas and desk → desks), never mixed room-level items.
- The supplied ecommerce UI-kit Figma file informed only general commerce information architecture (collection, detail gallery, bag and wishlist flows); no reference imagery, copy, product names, or brand assets were used.
- Local furniture/interior assets are stored under public/images.
- Error-state coverage is implemented through the shared `ErrorExperience` component and `/status/[state]`: customer commerce, platform, session/admin and upload rejection states use the existing warm Better Space design tokens. App Router `not-found.tsx`, `error.tsx`, and `global-error.tsx` prevent raw framework error output.

## Constraints
- Approved Better Space palette: chocolate #37291d, burgundy #461102, olive #5d5b35, cool oatmeal #d5d1bc.
- No temporary Figma asset URLs in production.
- Client-only preview interactions: menu, search, wishlist and cart.
- Commerce and staff error routes are demonstrable UI coverage for this frontend-only preview. They do not imply live payment, inventory, account or upload backends.