"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { PremiumProduct, premiumNavLinks } from "@/data/premium";

/* ============================================================
   Premium shared client state — cart + wishlist.
   Isolated localStorage keys so Premium never reads/writes the
   Standard storefront's "better-space-cart" / "better-space-wishlist".
   ============================================================ */
const CART_KEY = "premium-cart";
const WISHLIST_KEY = "premium-wishlist";

export type PremiumCartLine = { id: string; quantity: number };

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function usePremiumStore() {
  const [cart, setCart] = useState<PremiumCartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Read persisted state after mount only — avoids SSR/client mismatch (hydration error #418).
    queueMicrotask(() => {
      setCart(readJSON(CART_KEY, [] as PremiumCartLine[]));
      setWishlist(readJSON(WISHLIST_KEY, [] as string[]));
      setHydrated(true);
    });
  }, []);

  const add = (id: string, quantity = 1) =>
    setCart((current) => {
      const next = current.some((line) => line.id === id)
        ? current.map((line) => (line.id === id ? { ...line, quantity: line.quantity + quantity } : line))
        : [...current, { id, quantity }];
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });

  const setQuantity = (id: string, quantity: number) =>
    setCart((current) => {
      const next = quantity < 1 ? current.filter((line) => line.id !== id) : current.map((line) => (line.id === id ? { ...line, quantity } : line));
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });

  const toggleWishlist = (id: string) =>
    setWishlist((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      return next;
    });

  return {
    cart,
    wishlist,
    add,
    setQuantity,
    toggleWishlist,
    hydrated,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
  };
}

export function moneyIDR(value: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

/* ============================================================
   Shell — header, mobile menu, footer. Wraps every /premium page.
   ============================================================ */
export function PremiumShell({ children, cartCount }: { children: ReactNode; cartCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="premium-root">
      <PremiumHeader cartCount={cartCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {children}
      <PremiumFooter />
    </div>
  );
}

function PremiumHeader({ cartCount, menuOpen, setMenuOpen }: { cartCount: number; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <header className="premium-header">
      <div className="premium-shell premium-header-inner">
        <button className="premium-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href="/premium" className="premium-brand" aria-label="Better Space Premium home">
          BETTER SPACE<span>.</span>
        </Link>
        <nav className="premium-nav" aria-label="Premium navigation">
          {premiumNavLinks.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="premium-actions">
          <Link href="/premium/shop" aria-label="Search the Premium collection">
            <Search size={18} />
          </Link>
          <Link href="/premium/wishlist" aria-label="Your wishlist">
            <Heart size={18} />
          </Link>
          <Link href="/premium/cart" aria-label={`Your cart, ${cartCount} items`} className="premium-cart-link">
            <ShoppingBag size={18} />
            {cartCount > 0 && <b>{cartCount}</b>}
          </Link>
        </div>
      </div>
      {menuOpen && (
        <nav className="premium-mobile-menu" aria-label="Premium mobile navigation">
          {premiumNavLinks.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function PremiumFooter() {
  return (
    <footer className="premium-footer">
      <div className="premium-shell premium-footer-grid">
        <div className="premium-footer-brand">
          <Link href="/premium" className="premium-brand">
            BETTER SPACE<span>.</span>
          </Link>
          <p>Curated furniture and home decor for those who appreciate the art of living beautifully.</p>
        </div>
        <div>
          <h3>Shop</h3>
          {[
            ["Living Room", "living-room"],
            ["Bedroom", "bedroom"],
            ["Dining", "dining-room"],
            ["Home Decor", "home-decor"],
            ["Lighting", "lighting"],
            ["Storage", "storage"],
          ].map(([label, slug]) => (
            <Link key={slug} href={`/premium/shop?category=${slug}`}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/premium/about">Our Story</Link>
          <Link href="/premium/collections">Collections</Link>
          <Link href="/premium/contact">Contact</Link>
          <Link href="/premium/faq">FAQ</Link>
        </div>
        <div>
          <h3>Visit</h3>
          <p className="premium-footer-address">
            Menara Karya, Level 18, Jl. H. R. Rasuna Said Blok X-5,
            <br />
            Kuningan, Jakarta Selatan 12950
          </p>
          <p>+62888999888</p>
          <p>hello@betterspace.id</p>
        </div>
      </div>
      <div className="premium-shell premium-footer-bottom">
        <span>© 2026 Better Space. All rights reserved.</span>
        <div>
          <Link href="/premium/faq">Privacy</Link>
          <Link href="/premium/faq">Terms</Link>
          <Link href="/premium/faq">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Product presentation — card + horizontal rail.
   ============================================================ */
export function PremiumProductCard({
  product,
  wishlisted,
  onWishlist,
  onAdd,
}: {
  product: PremiumProduct;
  wishlisted: boolean;
  onWishlist: (id: string) => void;
  onAdd: (id: string) => void;
}) {
  return (
    <article className="premium-card">
      <div className="premium-card-image">
        <Link href={`/premium/product/${product.slug}`}>
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 850px) 50vw, 25vw" />
        </Link>
        {product.badge && <span className="premium-card-badge">{product.badge}</span>}
        <button
          type="button"
          className={wishlisted ? "premium-card-wish active" : "premium-card-wish"}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          onClick={() => onWishlist(product.id)}
        >
          <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="premium-card-copy">
        <div className="premium-card-rating">
          <span>★ {product.rating}</span> <small>({product.reviews})</small>
        </div>
        <h3>
          <Link href={`/premium/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="premium-card-price">
          <b>{product.price}</b>
        </div>
        <button type="button" className="premium-card-add" onClick={() => onAdd(product.id)} aria-label={`Add ${product.name} to cart`}>
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </article>
  );
}

export function PremiumProductRail({
  eyebrow,
  title,
  products,
  wishlist,
  onWishlist,
  onAdd,
}: {
  eyebrow: string;
  title: string;
  products: PremiumProduct[];
  wishlist: string[];
  onWishlist: (id: string) => void;
  onAdd: (id: string) => void;
}) {
  return (
    <section className="premium-section">
      <div className="premium-shell">
        <div className="premium-section-heading">
          <div>
            <p>{eyebrow}</p>
            <h2>{title}</h2>
          </div>
        </div>
      </div>
      <div className="premium-shell">
        <div className="premium-rail">
          {products.map((product) => (
            <div className="premium-rail-item" key={product.id}>
              <PremiumProductCard product={product} wishlisted={wishlist.includes(product.id)} onWishlist={onWishlist} onAdd={onAdd} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
