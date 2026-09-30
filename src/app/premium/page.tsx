"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Headphones, RefreshCw, Shield, Truck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { PremiumShell, PremiumProductCard, usePremiumStore } from "@/components/premium/PremiumStore";
import { premiumCategories, premiumCollections, premiumHeroSlides, premiumProducts } from "@/data/premium";

const benefits = [
  { icon: Truck, title: "Free Shipping", copy: "On orders over Rp500.000" },
  { icon: Shield, title: "Authenticity", copy: "Guaranteed genuine" },
  { icon: RefreshCw, title: "30-Day Returns", copy: "Hassle-free policy" },
  { icon: Headphones, title: "Concierge", copy: "Personal styling help" },
];

// Trending Now = products carrying a Premium badge (Best Seller / New / Editor's Pick); falls back to the first 8 if none qualify.
const trendingProducts = premiumProducts.filter((product) => product.badge);
const trendingDisplay = trendingProducts.length > 0 ? trendingProducts.slice(0, 8) : premiumProducts.slice(0, 8);

// New Arrivals = products badged "New", topped up with unbadged pieces so the rail always has a deliberate 8 pieces.
const newArrivals = [...premiumProducts.filter((product) => product.badge === "New"), ...premiumProducts.filter((product) => !product.badge)].slice(0, 8);

// Accessible Luxury = real Premium products under Rp500.000. Only 2 qualify in the seeded catalogue, so the section
// is retitled honestly to reflect real inventory rather than fabricating prices to hit a round number.
const underBudget = premiumProducts.filter((product) => product.numericPrice < 500000);
const accessibleLuxuryProducts = underBudget.length >= 4 ? underBudget : premiumProducts.filter((product) => product.numericPrice < 900000).slice(0, 8);
const accessibleLuxuryTitle = underBudget.length >= 4 ? "Under Rp500.000" : "Under Rp900.000";

export default function PremiumHome() {
  const store = usePremiumStore();
  const [hero, setHero] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setHero((current) => (current + 1) % premiumHeroSlides.length), 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = premiumHeroSlides[hero];
  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        {/* HERO */}
        <section className="premium-hero">
          <Image src={slide.image} alt={slide.title} fill priority sizes="100vw" className="premium-hero-image" />
          <div className="premium-hero-wash" />
          <div className="premium-shell premium-hero-content">
            <p>{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <span>{slide.subtitle}</span>
            <Link href={slide.href} className="premium-hero-cta">
              {slide.cta} <ChevronRight size={16} />
            </Link>
          </div>
          <button type="button" className="premium-hero-arrow premium-hero-prev" aria-label="Previous slide" onClick={() => setHero((hero + premiumHeroSlides.length - 1) % premiumHeroSlides.length)}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="premium-hero-arrow premium-hero-next" aria-label="Next slide" onClick={() => setHero((hero + 1) % premiumHeroSlides.length)}>
            <ChevronRight size={18} />
          </button>
          <div className="premium-hero-dots">
            {premiumHeroSlides.map((_, index) => (
              <button key={index} type="button" aria-label={`Show slide ${index + 1}`} className={index === hero ? "active" : ""} onClick={() => setHero(index)} />
            ))}
          </div>
        </section>

        {/* BENEFIT STRIP */}
        <section className="premium-benefits">
          <div className="premium-shell premium-benefits-grid">
            {benefits.map((benefit) => (
              <div className="premium-benefit" key={benefit.title}>
                <span className="premium-benefit-icon">
                  <benefit.icon size={19} />
                </span>
                <p>
                  <b>{benefit.title}</b>
                  <span>{benefit.copy}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORY CHIPS */}
        <section className="premium-section">
          <div className="premium-shell premium-chips">
            {premiumCategories.map((category) => (
              <Link key={category.id} href={`/premium/shop?category=${category.id}`} className="premium-chip">
                {category.name} <small>({category.count})</small>
              </Link>
            ))}
          </div>
        </section>

        {/* TRENDING NOW */}
        <section className="premium-section">
          <div className="premium-shell">
            <div className="premium-section-heading">
              <div>
                <p>Most Loved</p>
                <h2>Trending Now</h2>
              </div>
              <Link href="/premium/shop">View all →</Link>
            </div>
            <div className="premium-grid">
              {trendingDisplay.slice(0, 4).map((product) => (
                <PremiumProductCard key={product.id} product={product} wishlisted={store.wishlist.includes(product.id)} onWishlist={store.toggleWishlist} onAdd={store.add} />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED COLLECTIONS */}
        <section className="premium-section" style={{ background: "var(--p-cream)" }}>
          <div className="premium-shell">
            <div className="premium-section-heading">
              <div>
                <p>Curated For You</p>
                <h2>Featured Collections</h2>
              </div>
            </div>
            <div className="premium-collections-grid">
              {premiumCollections.map((collection) => (
                <Link key={collection.id} href={`/premium/shop?category=${collection.categorySlug}`} className="premium-collection-card">
                  <Image src={collection.image} alt={collection.name} fill sizes="(max-width: 860px) 100vw, 33vw" />
                  <div className="premium-collection-wash" />
                  <div className="premium-collection-copy">
                    <small>Explore</small>
                    <h3>{collection.name}</h3>
                    <p>{collection.description}</p>
                    <span>
                      Explore <ChevronRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className="premium-section">
          <div className="premium-shell">
            <div className="premium-section-heading">
              <div>
                <p>Just In</p>
                <h2>New Arrivals</h2>
              </div>
              <Link href="/premium/shop">View all →</Link>
            </div>
            <div className="premium-rail">
              {newArrivals.map((product) => (
                <div className="premium-rail-item" key={product.id}>
                  <PremiumProductCard product={product} wishlisted={store.wishlist.includes(product.id)} onWishlist={store.toggleWishlist} onAdd={store.add} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRAND PHILOSOPHY */}
        <section className="premium-statement">
          <div className="premium-shell premium-statement-inner">
            <p className="eyebrow">Our Philosophy</p>
            <h2>
              Where thoughtful furniture meets <em>better everyday living</em>
            </h2>
            <p className="body">
              Better Space begins with a simple belief: the quality of life often starts with the spaces we inhabit. Every piece we select is chosen for how it changes the way you rest, work, gather, and live &mdash; not just how it looks in a room.
            </p>
            <Link href="/premium/about">
              Discover Our Story <ChevronRight size={15} />
            </Link>
          </div>
        </section>

        {/* ACCESSIBLE LUXURY */}
        <section className="premium-section" style={{ background: "var(--p-cream)" }}>
          <div className="premium-shell">
            <div className="premium-section-heading">
              <div>
                <p>Accessible Luxury</p>
                <h2>{accessibleLuxuryTitle}</h2>
              </div>
              <Link href="/premium/shop">View all →</Link>
            </div>
            <div className="premium-grid">
              {accessibleLuxuryProducts.slice(0, 4).map((product) => (
                <PremiumProductCard key={product.id} product={product} wishlisted={store.wishlist.includes(product.id)} onWishlist={store.toggleWishlist} onAdd={store.add} />
              ))}
            </div>
          </div>
        </section>

        {/* BETTER SPACE CIRCLE */}
        <section className="premium-newsletter">
          <div className="premium-shell premium-newsletter-inner">
            <p className="eyebrow">Stay Inspired</p>
            <h2>Join the Better Space Circle</h2>
            <p className="body">Be the first to discover new collections, exclusive offers, and curated design inspiration delivered to your inbox.</p>
            {subscribed ? (
              <p className="premium-newsletter-success">✓ Welcome to the Better Space Circle</p>
            ) : (
              <form onSubmit={submitNewsletter}>
                <label htmlFor="premium-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input id="premium-newsletter-email" type="email" required placeholder="Your email address" />
                <button type="submit">
                  Subscribe <ChevronRight size={15} />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </PremiumShell>
  );
}
