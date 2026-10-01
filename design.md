# Better Space furniture store preview

## Purpose
A polished Better Space home-living ecommerce homepage that turns visitors into furniture collection browsers. Figma node `1:1411` from the Gadget Store file informed ecommerce hierarchy and responsive section structure only.

## Users and conversion objective
Indonesian home and workspace shoppers seeking warm, modern furniture. Primary conversion: browse collection and add products to a local preview cart. Secondary: navigate room collections and subscribe for updates.

## Journey and IA
Home-only retail journey: utility notice → ecommerce header/search/category navigation → contained lifestyle hero → weekly featured furniture → asymmetric editorial room mosaic → ten-product recommendation grid → compact lifestyle promotion → service reassurance → commerce footer. The linked commerce layer extends this into `/products` (room-filtered catalogue), `/products/[id]` (gallery, product detail, quantity, reviews and related furniture), `/cart`, and `/wishlist`. These routes use one furniture catalogue and the same local device preview state so product, cart and saved-piece actions stay connected.

The 2026-09-30 homepage composition is deliberately isolated in `src/components/Storefront.tsx` and `src/app/homepage.css`; it does not alter shared `Header`, `Footer`, `StoreSections`, or global CSS used by non-home routes. Homepage anchors are functional: hero → `#recommended`, sale navigation → `#weekly`, promotional dining CTA → `/products?room=dining-room`, catalogue/footer category links → their relevant `/products` routes.

## Visual language
Warm Better Space editorial retail using the approved palette: chocolate #37291d frames the utility bar and footer, burgundy #461102 marks primary purchase and promotion moments, olive #5d5b35 carries secondary shopping controls, and cool oatmeal #d5d1bc supports service surfaces. White and warm white remain the dominant shopping canvas. Cormorant Garamond creates the elegant furniture-editorial display voice; DM Sans supports compact shopping UI. Natural daylight interiors, pale timber, soft linen, ceramics and greenery are used as the repeated identity motif.

Dials: ENERGY 2 / RHYTHM 3 / MOTION 1. The hero and editorial dining banner are full visual pauses; category imagery and dense product browsing create deliberately different rhythms. Motion is reserved for buttons/cards and the mobile menu, so browsing remains calm.

## Major visual decisions
- Chocolate frames permanent brand zones, burgundy is restricted to decisive purchase and promotion actions, olive supports secondary product actions, and oatmeal gives service surfaces warmth without muddying the white retail canvas.
- Serif headings sit over uncluttered or scrimmed photo regions, preserving editorial hierarchy and text contrast.
- Category cards use a bottom scrim strictly to make white photography captions legible.
- Product cards are flat, white and lightly bordered so product imagery, not decorative surfaces, remains the focus.
- Local Unsplash-derived images are stored under `public/images`; production markup never references temporary Figma URLs or embeds the reference screenshot.

## Architecture
Next.js 16, TypeScript, App Router, Tailwind CSS base plus component-focused CSS. Client interactivity is contained in `Storefront.tsx`. Page metadata is in `src/app/layout.tsx`; page composition uses focused Header, Hero, CategoryNavigation, CategoryGrid, ProductGrid, CollectionBanner, ServiceFeatures and Footer components.

## Data and integrations
Product catalogue is a 100-item furniture dataset seeded from EDI's catalogue pack (`/home/ubuntu/aspireomedia/furniture-catalog/`), covering 18 furniture types across 7 rooms. Names, descriptions, materials, dimensions and prices are authored demo content — realistic but not real inventory or real prices. Photography is real, licensed Pexels stock, hotlinked from `images.pexels.com` (whitelisted in `next.config.ts` remotePatterns); each product has a distinct photo with zero duplicates verified across the full catalogue. Every PDP recommendation is selected by exact product type—not just by room—so sofa PDPs show sofas, desk PDPs show desks, dining-table PDPs show dining tables, and bed-frame PDPs show bed frames. Product controls update client state only. No backend, auth, checkout, external analytics, payment, or database connection is included.

The homepage "Products You May Like" section is deliberately capped at **25 products** (5 rows x 5 columns on the desktop grid; `HOME_GRID_LIMIT` in `src/components/StoreSections.tsx`). The remainder of the catalogue is reached through "View All" → `/products`, which is the full 100-item browsable index with a room sidebar. Any future growth of the catalogue should not lengthen the homepage grid.

## Security
No credentials or private operational data in the app. No checkout or payment claims. User email newsletter control shows an honest local confirmation state only.

## Performance
Local optimized JPEG source assets; Next Image with responsive `sizes`, priority only for hero. Fonts load via Google font integration.

## Accessibility
Semantic landmarks, descriptive image alt text, skip link, labeled icon controls, buttons rather than clickable divs, visible focus styles, keyboard-closing mobile menu/search, and contrast-protected photo overlays.

## SEO
Title, description, Open Graph metadata, semantic heading hierarchy and meaningful alt labels are included.

## Deployment
GitHub repository `aspireomedia/preview_furniture5-preview5` (renamed from `preview_furniture5` on 2026-09-30 per J Kal), Vercel project `preview5-furniture-store`, requested domain `preview5.aspireomedia.com`.

## Premium storefront (2026-09-30)
Preview 5 now serves two storefronts. `/` remains the existing Standard marketplace (RUMAIO-composition homepage, `Storefront.tsx`, `StoreSections.tsx`, `CommercePages.tsx`, `src/data/store.ts`) and is completely unmodified by this work.

`/premium` is a new, isolated Premium storefront ported from the Preview 4 reference implementation (`/home/ubuntu/samples/aspire-furniture-v1`, a React/Vite/React-Router project) into Next.js App Router components. Its editorial sequence deliberately places the independent olive brand philosophy statement immediately after category chips and before Trending Now, while the independent burgundy FAQ gateway remains after New Arrivals and immediately before Accessible Luxury. Both use 80% alpha backgrounds with fully opaque, bold oatmeal text so the sections read as distinct narrative and support moments, not a paired block. The remaining rhythm (hero carousel, benefit strip, category chips, Trending Now, Featured Collections, New Arrivals, Accessible Luxury, Better Space Circle newsletter, footer) and PDP layout (gallery, rating, quantity, tabs, related pieces) follow that reference, restyled with the Preview 5 Better Space palette (chocolate `#37291d`, burgundy `#461102`, olive `#5d5b35`, oatmeal `#d5d1bc`) in place of Preview 4's amber/gold accent.

Isolation:
- Routes: `/premium`, `/premium/shop`, `/premium/collections`, `/premium/product/[slug]`, `/premium/about`, `/premium/contact`, `/premium/faq`, `/premium/cart`, `/premium/wishlist` — all under `src/app/premium/`.
- Components: `src/components/premium/PremiumStore.tsx` (shell, header, footer, product card/rail, cart+wishlist hook). Never imported by Standard routes.
- Styles: `src/app/premium/premium.css`, every selector scoped under `.premium-root`. Standard's `globals.css`/`homepage.css` untouched.
- Data: `src/data/premium.ts` — a logically separate "Premium database" module (not a real DB; Preview 5 has no database of any kind for either storefront today, confirmed during inspection). Seeded once from Preview 5's own 100-product `src/data/store.ts` catalogue (same products, own records/ratings/reviews/slugs), so it can diverge from Standard going forward without touching Standard's array. J Kal approved this logical-separation approach over provisioning new infrastructure.
- Client state: separate `localStorage` keys `premium-cart` / `premium-wishlist`, verified never colliding with Standard's `better-space-cart` / `better-space-wishlist`.
- Accessible Luxury section: seeded catalogue only had 2 products under Rp500.000, so the section honestly retitles to "Under Rp900.000" when the strict threshold doesn't have enough real inventory, rather than fabricating prices.
- FAQ content follows only what the project actually supports (client-side preview cart/wishlist, no live payment) — no invented delivery-time or warranty guarantees.

Verified: production build passes; all 9 Premium routes plus Standard's 6 routes return HTTP 200 with zero horizontal overflow and zero console errors at 1440/768/390px; Premium nav/footer links resolve only within `/premium`; Standard's add-to-cart and localStorage keys remain unaffected by Premium's existence.

## Error-state coverage
A shared `ErrorExperience` provides short, branded recovery screens for routing, unavailable/timeout, payment, order, inventory, cart/search, validation/rate-limit, session/role, and product-upload states. Dynamic `/status/[state]` routes make the states independently testable; App Router `not-found.tsx`, `error.tsx`, and `global-error.tsx` prevent framework output from reaching customers. The component uses the existing burgundy decision action, olive supporting label, warm ivory canvas, Cormorant heading, and DM Sans UI copy. This is intentionally calm, with no decorative motion, so recovery decisions stay clear. All states explicitly say whether payment was made and give one primary next action.

## Exclusions
No real inventory, price synchronization, account, checkout, payment processing, customer support workflow, or third-party tracking. Error routes demonstrate the UX contract only and do not claim that these integrations exist.