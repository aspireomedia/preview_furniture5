"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Minus, Plus, RefreshCw, Shield, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { PremiumShell, PremiumProductCard, moneyIDR, usePremiumStore } from "@/components/premium/PremiumStore";
import { PremiumProduct, premiumRelatedProducts } from "@/data/premium";

export function PremiumProductDetail({ product }: { product: PremiumProduct }) {
  const store = usePremiumStore();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"details" | "features" | "dimensions">("details");
  const related = premiumRelatedProducts(product);
  const wishlisted = store.wishlist.includes(product.id);

  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        <nav className="premium-shell premium-breadcrumb" aria-label="Breadcrumb">
          <Link href="/premium">Home</Link>
          <span>/</span>
          <Link href="/premium/shop">Shop</Link>
          <span>/</span>
          <b>{product.name}</b>
        </nav>

        <section className="premium-shell premium-pdp">
          <div className="premium-pdp-gallery">
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 850px) 100vw, 50vw" priority />
            {product.badge && <span className="premium-pdp-badge">{product.badge}</span>}
          </div>

          <div className="premium-pdp-copy">
            <div className="premium-pdp-rating">
              <span>★ {product.rating}</span>
              <span style={{ color: "var(--p-muted)", fontWeight: 400 }}>({product.reviews} reviews)</span>
            </div>
            <h1>{product.name}</h1>
            <div className="premium-pdp-price">
              <b>{product.price}</b>
            </div>
            <p className="desc">{product.description}</p>

            <div className="premium-quantity-row">
              <span style={{ fontSize: 13, fontWeight: 600 }}>Quantity</span>
              <div className="premium-quantity-control">
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity">
                  <Minus size={15} />
                </button>
                <b>{quantity}</b>
                <button type="button" onClick={() => setQuantity((current) => Math.min(20, current + 1))} aria-label="Increase quantity">
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="premium-purchase-row">
              <button type="button" className="premium-add-to-cart" onClick={() => store.add(product.id, quantity)}>
                <ShoppingBag size={17} /> Add to Cart &mdash; {moneyIDR(product.numericPrice * quantity)}
              </button>
              <button
                type="button"
                className={wishlisted ? "premium-save-button active" : "premium-save-button"}
                onClick={() => store.toggleWishlist(product.id)}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="premium-perks">
              <div className="premium-perk">
                <Truck size={16} /> Free shipping on orders over Rp500.000
              </div>
              <div className="premium-perk">
                <RefreshCw size={16} /> 30-day hassle-free returns
              </div>
              <div className="premium-perk">
                <Shield size={16} /> Authenticity guaranteed
              </div>
            </div>

            <div className="premium-tabs">
              <button type="button" className={tab === "details" ? "active" : ""} onClick={() => setTab("details")}>
                Details
              </button>
              <button type="button" className={tab === "features" ? "active" : ""} onClick={() => setTab("features")}>
                Features
              </button>
              <button type="button" className={tab === "dimensions" ? "active" : ""} onClick={() => setTab("dimensions")}>
                Dimensions
              </button>
            </div>
            <div className="premium-tab-panel">
              {tab === "details" && (
                <p>
                  <strong>Material:</strong> {product.material}
                  <br />
                  {product.description}
                </p>
              )}
              {tab === "features" && (
                <p>
                  Every Better Space Premium piece is inspected for finish, structural integrity, and true-to-photo color before it ships. {product.name} is made from {product.material.toLowerCase()}.
                </p>
              )}
              {tab === "dimensions" && (
                <p>
                  <strong>Dimensions:</strong> {product.dimensions}
                </p>
              )}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="premium-shell premium-related">
            <div className="premium-section-heading">
              <div>
                <p>Related Pieces</p>
                <h2>You May Also Like</h2>
              </div>
              <Link href={`/premium/shop?category=${product.categorySlug}`}>
                View all {product.category.toLowerCase()} <ChevronRight size={13} />
              </Link>
            </div>
            <div className="premium-grid">
              {related.map((item) => (
                <PremiumProductCard key={item.id} product={item} wishlisted={store.wishlist.includes(item.id)} onWishlist={store.toggleWishlist} onAdd={store.add} />
              ))}
            </div>
          </section>
        )}
      </main>
    </PremiumShell>
  );
}
