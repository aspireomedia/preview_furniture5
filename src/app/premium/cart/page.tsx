"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PremiumShell, moneyIDR, usePremiumStore } from "@/components/premium/PremiumStore";
import { PremiumProduct, premiumProductBySlug } from "@/data/premium";

export default function PremiumCartPage() {
  const store = usePremiumStore();

  if (!store.hydrated) {
    return (
      <PremiumShell cartCount={0}>
        <main>
          <nav className="premium-shell premium-breadcrumb">
            <Link href="/premium">Home</Link> <span>/</span> <b>Cart</b>
          </nav>
          <div className="premium-shell premium-empty-state">
            <ShoppingBag size={30} />
            <h2>Preparing your cart</h2>
            <p>Loading your saved pieces.</p>
          </div>
        </main>
      </PremiumShell>
    );
  }

  const lines = store.cart
    .map((line) => ({ ...line, product: premiumProductBySlug(line.id) }))
    .filter((line): line is { id: string; quantity: number; product: PremiumProduct } => Boolean(line.product));
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.product.numericPrice, 0);

  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        <nav className="premium-shell premium-breadcrumb">
          <Link href="/premium">Home</Link> <span>/</span> <b>Cart</b>
        </nav>
        <div className="premium-shell premium-cart-layout">
          <div>
            <div className="premium-section-heading">
              <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: 28, fontWeight: 600, margin: 0 }}>Your Cart</h1>
              <Link href="/premium/shop">
                <ChevronLeft size={14} style={{ display: "inline", verticalAlign: "-2px" }} /> Continue shopping
              </Link>
            </div>
            {lines.length ? (
              <div className="premium-cart-lines">
                {lines.map(({ product, quantity }) => (
                  <div className="premium-cart-line" key={product.id}>
                    <Link href={`/premium/product/${product.slug}`}>
                      <Image src={product.image} alt={product.name} width={96} height={96} style={{ objectFit: "cover" }} />
                    </Link>
                    <div>
                      <h3>
                        <Link href={`/premium/product/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <b>{product.price}</b>
                    </div>
                    <div className="premium-quantity-control">
                      <button type="button" onClick={() => store.setQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.name}`}>
                        <Minus size={14} />
                      </button>
                      <b>{quantity}</b>
                      <button type="button" onClick={() => store.setQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.name}`}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button type="button" className="premium-cart-remove" onClick={() => store.setQuantity(product.id, 0)} aria-label={`Remove ${product.name}`}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="premium-empty-state">
                <ShoppingBag size={30} />
                <h2>Your cart is empty</h2>
                <p>Choose furniture that helps your everyday spaces feel better.</p>
                <Link href="/premium/shop" className="premium-hero-cta" style={{ marginTop: 8 }}>
                  Browse furniture
                </Link>
              </div>
            )}
          </div>
          <aside className="premium-order-summary">
            <h2>Order Summary</h2>
            <p>
              <span>Subtotal</span> <b>{moneyIDR(subtotal)}</b>
            </p>
            <p>
              <span>Shipping</span> <b>{subtotal >= 500000 ? "Complimentary" : "Calculated later"}</b>
            </p>
            <hr />
            <p className="premium-order-total">
              <span>Total</span> <span>{moneyIDR(subtotal)}</span>
            </p>
            <button type="button" className="premium-add-to-cart" style={{ width: "100%", marginTop: 8 }} disabled={!lines.length}>
              Continue to Delivery
            </button>
            <p style={{ fontSize: 11, color: "var(--p-muted)", textAlign: "center", marginTop: 10 }}>Preview only &mdash; no payment is collected.</p>
          </aside>
        </div>
      </main>
    </PremiumShell>
  );
}
