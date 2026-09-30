# Handover: Preview5 "Better Space" Furniture Ecommerce

**Date:** 2026-09-30
**Project:** Better Space furniture ecommerce preview (Preview5)
**Prepared by:** Reo (Aspireo Media Lead Full-Stack/Creative Web Designer agent)
**Requested by:** J Kal

---

## 1. What this project is

A Next.js furniture/home-living ecommerce **preview** (no real backend/payment) branded as **Better Space**, tagline `FURNITURE FOR A BETTER LIVING.` It started as a homepage-only preview and was expanded in this session into a fully linked mini-storefront: catalogue, product detail pages (PDP), cart, and wishlist, all sharing one product data source.

- **Source root:** `/home/ubuntu/aspireomedia/preview5-furniture-store`
- **GitHub:** https://github.com/aspireomedia/preview_furniture5 (branch `main`)
- **Vercel project:** `preview5-furniture-store` (org `aspireomedias-projects`, team id `team_2obvx4VwCZ9S7paqViyGTHzw`)
- **Branded production URL:** https://preview5.aspireomedia.com
- **Latest deployment at handover time:** https://preview5-furniture-store-8cceqo7x7-aspireomedias-projects.vercel.app
- **Latest commit:** `bf4abc3` — "Match PDP recommendations by product type"
- **Design source of truth:** `design.md` in project root (kept up to date through this session)
- **Operational notes:** `.reo/context.md` in project root (kept up to date through this session)

Related sibling project (not touched this session, do not confuse the two): **Preview6** "Rumaio"/Better Space marketplace at `/home/ubuntu/aspireomedia/preview6-rumaio-ecommerce`, branded URL `https://preview6.aspireomedia.com`.

---

## 2. Original request chain (chronological)

1. **Original ask (multi-session, compacted history):** "for preview 5, continue adjusting the colors, product, and style to be furniture like the home page for ALL pages" — use a supplied Figma ecommerce UI-kit file **only for structure/hierarchy**, never its images or naming; use Preview5's existing furniture-oriented homepage as the source of truth for product types, colors, text, and names; make sure products are all linked together (category → listing → PDP → cart/wishlist → related).
2. **This session's explicit ask:** "once done, do another pass to ensure recommended product list/you may like/other products usually shown in the PDP are NOT random but related to the product's category. PDP about sofa → recommended shows sofas. PDP about desks → recommended shows desks. and so on."
3. **Current ask:** produce this handover document.

Both (1) and (2) were completed and deployed in this session. This document is the (3) deliverable.

---

## 3. What was actually built (this session)

### 3.1 Shared furniture catalogue (`src/data/store.ts`)
- Rewrote the product model to add a **`productType`** field (e.g. `Sofa`, `Dining Table`, `Bed Frame`, `Desk`, `Office Chair`, `Sideboard`, `Coffee Table`, `Bookshelf`, `Wardrobe`, `Rug`, `Table Lamp`) **separate from `category`** (the room, e.g. `Living Room`, `Bedroom`).
- Expanded the catalogue from 10 to **22 products**, specifically adding sibling variants for the 4 product types the PDP-relation requirement needed to demonstrate meaningfully:
  - **Sofa** (4): Luna 3-Seater Sofa, Luna 2-Seater Sofa, Luna Chaise Sofa, Luna Ottoman
  - **Dining Table** (4): Arika Dining Table Set, Arika Round Dining Table, Arika Extendable Dining Table, Arika Dining Bench
  - **Bed Frame** (4): Evara Bed Frame, Evara Queen Bed Frame, Evara Platform Bed, Evara Storage Bed
  - **Desk** (4): Atlas Work Desk, Atlas Compact Desk, Atlas Corner Desk, Atlas Writing Desk
  - Everything else (Office Chair, Sideboard, Coffee Table, Bookshelf, Wardrobe, Rug, Table Lamp) kept at 1 product each (carried over from the original 10-product catalogue).
- All names/copy/products are original — nothing copied from the reference Figma file.
- New helper: `relatedProducts(product)` — returns up to 4 other products with the **exact same `productType`**, excluding the current product. This is the single source of truth PDP related-products now uses.
- `productsForCategory(slug)` still filters by room (`category`) for the `/products` listing page and room navigation.

### 3.2 New connected routes (`src/components/CommercePages.tsx` + new `app/` route files)
- `/products` (`src/app/products/page.tsx`) — full catalogue with room sidebar filter (reads `?room=` query param) and price sort.
- `/products/[id]` (`src/app/products/[id]/page.tsx`) — PDP: gallery, price, material/dimensions, quantity stepper, add-to-cart, save/wishlist, description tabs, static review copy, and a **"More {productType}s you may like"** related-products section driven by `relatedProducts()`.
- `/cart` (`src/app/cart/page.tsx`) — bag view with quantity controls, remove line, subtotal/delivery/total, empty state.
- `/wishlist` (`src/app/wishlist/page.tsx`) — saved items grid, empty state.
- All four routes share one `useStore()` hook (in `CommercePages.tsx`) backed by **`localStorage`** (`better-space-cart`, `better-space-wishlist`) so cart/wishlist state is consistent across pages within the same browser. This is a **client-only preview mechanism**, not a real backend — see Known Limitations.
- Homepage (`src/components/Storefront.tsx`) and shared sections (`src/components/StoreSections.tsx`, `src/components/Header.tsx`) were updated so hero/category/product-grid links use real Next.js `<Link>` routing into `/products`, `/products/[id]`, `/cart`, `/wishlist` instead of the old same-page `#anchor` scroll links.

### 3.3 Styling
- All new pages/components reuse the **existing approved Better Space palette** (chocolate `#37291d`, burgundy `#461102`, olive `#5d5b35`, cool oatmeal `#d5d1bc`) and existing typography/spacing tokens — no new palette introduced.
- New CSS block appended to `src/app/globals.css` (breadcrumbs, catalogue grid/sidebar, PDP gallery/detail, cart/bag, wishlist, empty states) with matching mobile breakpoints at `850px` and `390px`.

### 3.4 Fixes made during implementation (see Section 5 for root causes)
- Fixed a React Compiler ESLint rule violation (`react-hooks/set-state-in-effect`) twice — once in `Storefront.tsx`, once in `CommercePages.tsx` — by using lazy `useState` initializers / `queueMicrotask` deferral instead of synchronous `setState` inside `useEffect`.
- Fixed a hydration mismatch on `/cart` and `/wishlist` (server renders empty state, client then reads `localStorage` and renders populated state) by adding a `hydrated` flag to `useStore()` and rendering an explicit "Preparing your bag / shortlist" loading state until the client-only read completes.
- Changed the product-card badge/label from `product.category` (room) to `product.productType` so the visible UI label matches what "related" actually means (previously cards showed "Living Room" even inside a Sofa-only related rail, which was confusing).

---

## 4. Verification performed (this session, both passes)

All verification was done with **real command execution and a real headless browser** (Playwright Chromium — see Section 6 for why Playwright and not the usual browser-harness/Camofox tools). Nothing here is inferred from source reading alone.

- `npm run lint` — pass (ESLint / React Compiler rules)
- `npx tsc --noEmit` — pass
- `npm run build` (Next.js 16 production build, Turbopack) — pass; route manifest confirms `/`, `/products`, `/products/[id]`, `/cart`, `/wishlist`, `/status/[state]` all compile
- `git diff --check` — pass (no whitespace errors)
- Local dev server smoke test on port `3010` (pre-existing dev server, PID owned by another session — see Section 5.3) for `/`, `/products`, `/products/luna`, `/cart`, `/wishlist`:
  - HTTP 200 on all routes
  - No broken images (`naturalWidth` check)
  - No horizontal overflow at desktop (1440px) and mobile (390px) viewports
  - No console errors (after hydration-mismatch fix)
- Functional flow test: opened `/products/luna` → clicked "Add to cart" → navigated to `/cart` → confirmed line item "Luna 3-Seater Sofa" present with correct subtotal `Rp 7.499.000`. Repeated for wishlist save → `/wishlist` shows saved item.
- **Category-relation verification (the actual ask):** scripted Playwright check asserting that `/products/luna`, `/products/atlas`, `/products/arika`, `/products/evara` each render exactly 3 related-product cards, and **100% of those cards' visible type label equals the source product's `productType`** (`Sofa`, `Desk`, `Dining Table`, `Bed Frame` respectively). This passed only after the fix in Section 3.4 that switched card labels from `category` to `productType` — before that fix the underlying data relation was already correct, but the visible label was misleading.
- Production verification after deploy: re-ran the same Playwright checks against `https://preview5.aspireomedia.com` directly (not just localhost) for `/products`, `/products/luna`, `/cart`, `/wishlist` — HTTP 200, no console errors, no broken images, no overflow.

---

## 5. Issues encountered and how they were resolved

### 5.1 `react-hooks/set-state-in-effect` ESLint failures (blocked build twice)
Next.js 16's React Compiler-aware ESLint config flags any `setState` call made synchronously inside a bare `useEffect(() => { ... }, [])`. This tripped twice:
- In `Storefront.tsx` when hydrating `liked`/`cartCount` from `localStorage` on mount.
- In `CommercePages.tsx`'s `useStore()` hook, same pattern for `cart`/`wishlist`.

**Fix applied:** removed the `useEffect` entirely in `Storefront.tsx` (lazy `useState(() => ...)` initializer reads localStorage directly, which is fine since that component doesn't need to distinguish server/client render). In `CommercePages.tsx`, kept the `useEffect` (needed there because we deliberately want a distinguishable "not yet hydrated" state) but deferred the `setState` calls into a `queueMicrotask` callback, which satisfies the lint rule since the state write is no longer synchronous within the effect body.

**If this recurs:** the rule wants effects to either (a) subscribe to something external and call setState from a callback, or (b) not need an effect at all — prefer lazy `useState` init for read-once-on-mount patterns, and reserve `useEffect` + deferred setState only when you need an explicit pre/post-hydration state distinction.

### 5.2 Hydration mismatch on `/cart` and `/wishlist`
Because cart/wishlist content depends on `localStorage`, the server-rendered HTML (which has no access to the browser's localStorage) initially differs from what the client renders once it reads real data. React logged a hydration mismatch error and had to discard and re-render the tree client-side.

**Fix applied:** added a `hydrated` boolean to `useStore()`, defaulting to `false` until the deferred `localStorage` read completes. `CartPage` and `WishlistPage` render an explicit lightweight "Preparing your bag / shortlist" placeholder while `hydrated === false`, then render the real content once hydration finishes. This makes the server/client markup match on first paint (both render the loading placeholder) and avoids the console error.

**Residual note:** this is a standard SSR + localStorage tradeoff; it's fully resolved for correctness (no console errors, verified), but it does mean cart/wishlist pages briefly flash a loading state on first load rather than the final content — acceptable for a preview, would need a proper session/cookie or server-side cart for production.

### 5.3 Product-card label showed room, not product type (data was already correct, UI was misleading)
After wiring up `relatedProducts()` by `productType`, the actual related items returned were correct (e.g. Luna PDP → 3 other sofas), but the product card component was still displaying `product.category` (the room, e.g. "Living Room") as its visible type label. This made it *look* like related products were still room-based rather than type-based, even though the underlying filter was already type-exact.

**Fix applied:** changed `ProductCard`'s label from `product.category` to `product.productType` everywhere it's used (catalogue grid, PDP related rail, wishlist grid, cart is unaffected since it uses `product.category` intentionally for a different context line). Re-ran the Playwright verification script after this change to confirm the visible labels now match.

### 5.4 Catalogue needed expansion before the category-relation fix could be demonstrated
The original 10-product catalogue had **at most one product per specific product type** in several cases (e.g. only one sofa, one desk, one dining table, one bed frame existed). A "related by exact product type" algorithm applied to a catalogue like that would return **zero related products** for most PDPs — technically not "random" but not a meaningful demonstration of the requirement either.

**Fix applied:** added 3 additional variants each for Sofa, Dining Table, Bed Frame, and Desk (using the same product family name — e.g. "Luna", "Arika", "Evara", "Atlas" — with different sub-names, prices, dimensions, and descriptions) so each of those 4 product types has 4 members and PDP related-rails have real, non-empty, correctly-scoped content to show.

**This was a judgment call, not an explicit instruction** — flagging it clearly so a future session/model knows why the catalogue grew from 10 to 22 items. See Section 7, item 1, for the residual consequence (7 product types still have only 1 member each).

### 5.5 Tooling: browser-harness (Chromium) and Camofox (Firefox-based) were unavailable/incompatible for this session's QA
- `browser-harness`'s underlying Chromium daemon was not running in this session (`fatal: chrome-not-running`), so the standard `BrowserExec` tool could not be used directly for QA in this session.
- Camofox (the team's usual headless-browser fallback, Firefox/Camoufox-based) was confirmed healthy and running (`{"running":true,"tabs":[]}` on port `9377`) but is a **different, unrelated service** from what this task needed — it was not actually required or used for this task's QA (that concern is left over from an earlier Figma-capture task in this project's history, see `.reo/context.md` and prior session summary — Camofox is fundamentally incompatible with Figma's `captureForDesign` API due to a Chromium-only clipboard permission requirement, which is irrelevant to this task but worth knowing if a future session sees Camofox mentioned in this project's history).
- **Resolution used this session:** installed/used the project's own `playwright-chromium` dependency (already present in `node_modules`) directly via a Node script to drive real Chromium for all QA in this session (page loads, click-through flows, category-relation assertions, mobile viewport checks). This worked reliably. **Recommend this as the default QA method for this project** if `browser-harness`'s Chromium daemon is not running — it needs no extra setup since `playwright-chromium` is already a project dependency.

### 5.6 Pre-existing dev server on port 3010 owned by a different PID/session
When starting a temporary dev server for QA (`npm run dev -- --port 3012`), Next.js detected another dev server for the **same project directory** already running on port `3010` (PID `2772151`) and refused to start a second one (by design — Next.js locks one dev server per project directory via a lockfile). QA in this session was run against the existing port-3010 server instead of killing/restarting it, to avoid disrupting whatever other session/process owns it.

**Caveat for future sessions:** do not assume port 3010 is free or that its dev server reflects the very latest commit unless you confirm it was restarted after the latest `git pull`/edit. It was reused as-is for QA convenience only.

### 5.7 Out-of-band background-process notifications (unrelated, informational only)
During this session, three background-process watch-pattern notifications fired and were explicitly investigated and reported to J Kal as informational/no-action-needed:
- `proc_d5045d372dd7` (Camofox `npm start`) — healthy; the "error" pattern match was just the literal substring `/help/error?state=payment-declined` inside a QA URL path, not an actual failure.
- `proc_80654d9930a6` (a temporary `npm run dev -- --port 3012` for this project) — printed "Ready" then exited immediately because of the port-3010 lock (Section 5.6); confirmed not running and confirmed it did not affect production.

These are **not open issues** — documented here only so a future session doesn't waste time re-investigating them if they appear again in transcript history.

### 5.8 `.vercel/project.json` exists but Vercel CLI scope resolution needs the team ID
`vercel ls --scope aspireomedia` fails with "You cannot set your Personal Account as the scope." The working invocation is `vercel ls --scope team_2obvx4VwCZ9S7paqViyGTHzw` (team ID, not the human-readable org slug `aspireomedias-projects`). Project is linked via `.vercel/project.json` (`projectId: prj_lGiZg2JsN9WTlYVWe8Y5O2eMrSYP`, `orgId: team_2obvx4VwCZ9S7paqViyGTHzw`), and deployment itself happens automatically via **GitHub push → Vercel auto-deploy**, not via `vercel deploy` CLI — the CLI was only used read-only here to confirm deployment status/URLs.

---

## 6. Known limitations / things NOT done (by design, scope, or explicit exclusion)

These are already documented in `design.md`'s "Exclusions" section but repeated here for handover completeness:

- **No real backend, database, authentication, or checkout/payment.** Cart and wishlist are `localStorage`-only, scoped to one browser. Nothing survives a cleared cache or transfers between devices.
- **No real inventory or price sync.** All 22 products are static, hand-authored fixtures.
- **Reviews are static placeholder copy** ("4.8 out of 5 from 34 verified-style preview reviews", two fixed review quotes) — not a real reviews system.
- **No search backend** — the header search panel scrolls to `#products` on the homepage; it does not query the new `/products` catalogue or filter results.
- **`/status/[state]` error-state pages** (pre-existing, not touched this session) are UI-only demonstrations of recovery copy; they don't reflect real payment/inventory/session systems.
- **The Figma reference file** (`0SzpXe5ng7xaKgpTk3Lhk9`) was used only for hierarchy/IA inspiration per explicit instruction — no images, copy, or naming from it appear anywhere in the codebase. This was true before this session and remains true.

---

## 7. What remains / recommended next steps

1. **Catalogue depth is uneven.** 4 product types (Sofa, Dining Table, Bed Frame, Desk) have 4 members each and demonstrate the related-products requirement well. The other 7 types (Office Chair, Sideboard, Coffee Table, Bookshelf, Wardrobe, Rug, Table Lamp) still have **exactly 1 product each**, meaning their PDPs currently render an **empty related-products section** (not broken, not random — just empty, because there is nothing else of that exact type to relate to). If J Kal wants every PDP to show related items, the next task is either:
   - add 2–3 sibling variants for each of those 7 types (same pattern used for Sofa/Desk/etc. in this session), or
   - decide on a documented fallback rule for single-member types (e.g. "if fewer than N products share this exact type, fall back to same-category items, clearly and consistently, not randomly") and implement that fallback explicitly in `relatedProducts()` in `src/data/store.ts`.
   
   **This was not requested explicitly and was not done — flagging as the most likely next ask.**

2. **Search does not use the new catalogue.** If/when asked to make search functional, it should query `products` from `src/data/store.ts` and link into `/products?room=...` or directly to `/products/[id]`, following the same data source used everywhere else.

3. **Cart/wishlist persistence is a known preview-only tradeoff.** If this project ever needs multi-device or server-verified cart state, that requires an actual backend decision (see `design.md` Exclusions) — out of scope for a "preview" but worth flagging before anyone demos this as if it were transactional.

4. **No outstanding build/lint/type errors, no open QA failures, no known broken links.** Everything described as "done" in Sections 3–4 is deployed and verified live at the branded URL as of this handover.

5. **Vercel deployment note:** the project has accumulated ~11 production deployments in the Vercel dashboard from this project's history (visible via `vercel ls --scope team_2obvx4VwCZ9S7paqViyGTHzw`). None were cleaned up in this session since they don't affect the live branded URL, but housekeeping could be considered if deployment list clutter becomes a problem.

---

## 8. Quick reference for resuming this project in a new session/model

```bash
cd /home/ubuntu/aspireomedia/preview5-furniture-store

# Read context first
cat design.md
cat .reo/context.md

# Confirm current state
git log --oneline -5
git status

# Local QA (Chromium via Playwright, already a project dependency — no daemon needed)
# If port 3010 already has a dev server running, just point Playwright at it instead of starting a new one.
node -e "require('playwright-chromium')"   # sanity check the dependency is present

# Standard verification loop before any deploy
npm run lint
npx tsc --noEmit
npm run build
git diff --check

# Deploy (GitHub push auto-triggers Vercel — no CLI deploy needed)
git config user.name aspireomedia
git config user.email aspireomedia@gmail.com
git add -A && git commit -m "..." && git push origin main

# Confirm production
curl -sS -o /dev/null -w '%{http_code}\n' https://preview5.aspireomedia.com/products/luna
vercel ls --scope team_2obvx4VwCZ9S7paqViyGTHzw   # read-only deployment status check
```

**Key files to know:**
- `src/data/store.ts` — single source of truth for all products, categories, and the `relatedProducts()` relation logic. Start here for any catalogue or recommendation-logic change.
- `src/components/CommercePages.tsx` — `/products`, `/products/[id]`, `/cart`, `/wishlist` page bodies + the shared `useStore()` localStorage hook.
- `src/components/StoreSections.tsx` / `Storefront.tsx` / `Header.tsx` — homepage sections and site chrome, already wired to link into the commerce routes.
- `src/app/globals.css` — all styling, including the commerce-pages block appended this session (search for the comment `/* Connected commerce pages: ... */`).
- `design.md` — architecture/decisions source of truth, kept current through this session.
- `.reo/context.md` — compact operational state, kept current through this session.

**Do not confuse with Preview6** (`preview6-rumaio-ecommerce`, `preview6.aspireomedia.com`) — separate project, separate repo, not touched this session.
