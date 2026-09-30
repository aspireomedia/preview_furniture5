"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { PremiumShell, PremiumProductCard, usePremiumStore } from "@/components/premium/PremiumStore";
import { premiumProducts } from "@/data/premium";

export default function PremiumWishlistPage() {
  const store = usePremiumStore();

  if (!store.hydrated) {
    return (
      <PremiumShell cartCount={0}>
        <main>
          <div className="premium-shell premium-empty-state">
            <Heart size={30} />
            <h2>Preparing your shortlist</h2>
            <p>Loading your saved pieces.</p>
          </div>
        </main>
      </PremiumShell>
    );
  }

  const saved = premiumProducts.filter((product) => store.wishlist.includes(product.id));

  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        <nav className="premium-shell premium-breadcrumb">
          <Link href="/premium">Home</Link> <span>/</span> <b>Saved Pieces</b>
        </nav>
        <div className="premium-shell">
          <div className="premium-section-heading">
            <div>
              <p>Your Shortlist</p>
              <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: 28, fontWeight: 600, margin: 0 }}>Saved Pieces</h1>
            </div>
            <Link href="/premium/shop">Browse more furniture</Link>
          </div>
          {saved.length ? (
            <div className="premium-grid" style={{ paddingBottom: 88 }}>
              {saved.map((product) => (
                <PremiumProductCard key={product.id} product={product} wishlisted onWishlist={store.toggleWishlist} onAdd={store.add} />
              ))}
            </div>
          ) : (
            <div className="premium-empty-state" style={{ paddingBottom: 88 }}>
              <Heart size={30} />
              <h2>Save the pieces that feel right</h2>
              <p>Your shortlist stays here on this device while you compare rooms and materials.</p>
              <Link href="/premium/shop" className="premium-hero-cta" style={{ marginTop: 8 }}>
                Explore the collection
              </Link>
            </div>
          )}
        </div>
      </main>
    </PremiumShell>
  );
}
