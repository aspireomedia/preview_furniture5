# Better Space furniture store preview

## Purpose
A polished Better Space home-living ecommerce homepage that turns visitors into furniture collection browsers. Figma node `1:1411` from the Gadget Store file informed ecommerce hierarchy and responsive section structure only.

## Users and conversion objective
Indonesian home and workspace shoppers seeking warm, modern furniture. Primary conversion: browse collection and add products to a local preview cart. Secondary: navigate room collections and subscribe for updates.

## Journey and IA
Utility notice → Better Space header/search/menu → lifestyle hero → shop by room → visual room categories → recommended products → dining collection campaign → service reassurance → brand/footer links.

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
Static product/category data intended for preview only. Product controls update client state only. No backend, auth, checkout, external analytics, payment, or database connection is included.

## Security
No credentials or private operational data in the app. No checkout or payment claims. User email newsletter control shows an honest local confirmation state only.

## Performance
Local optimized JPEG source assets; Next Image with responsive `sizes`, priority only for hero. Fonts load via Google font integration.

## Accessibility
Semantic landmarks, descriptive image alt text, skip link, labeled icon controls, buttons rather than clickable divs, visible focus styles, keyboard-closing mobile menu/search, and contrast-protected photo overlays.

## SEO
Title, description, Open Graph metadata, semantic heading hierarchy and meaningful alt labels are included.

## Deployment
GitHub repository `aspireomedia/preview_furniture5`, Vercel project `preview5-furniture-store`, requested domain `preview5.aspireomedia.com`.

## Exclusions
No real inventory, price synchronization, account, checkout, payment processing, customer support workflow, or third-party tracking.