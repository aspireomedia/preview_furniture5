"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PremiumShell, usePremiumStore } from "@/components/premium/PremiumStore";
import { premiumCollections } from "@/data/premium";

export default function PremiumCollectionsPage() {
  const store = usePremiumStore();
  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        <div className="premium-shell premium-page-hero">
          <p className="eyebrow">Explore</p>
          <h1>Our Collections</h1>
          <p className="lede">Thoughtfully curated groupings that bring together complementary pieces for effortless styling.</p>
        </div>
        <div className="premium-shell" style={{ paddingBottom: "88px" }}>
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
      </main>
    </PremiumShell>
  );
}
