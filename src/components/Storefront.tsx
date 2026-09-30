"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Headphones,
  Heart,
  MapPin,
  Menu,
  PackageCheck,
  Search,
  ShoppingCart,
  Star,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { products } from "@/data/store";

const weeklyProducts = products.slice(0, 4);
const productIds = [
  "sofa-luna-3s",
  "armchair-kirana-wing",
  "bed-frame-evora-queen",
  "dining-table-arka-4seat",
  "desk-aksara-120",
  "cabinet-biru-tall",
  "coffee-table-riko-round",
  "dining-chair-elok-upholstered",
  "mirror-aluna-arch",
  "table-lamp-arli-ceramic",
];
const featuredProducts = productIds
  .map((id) => products.find((product) => product.id === id))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const categoryContent = [
  { slug: "living-room", title: "Living Room", copy: "Modern furniture for relaxing with family.", image: "/images/living.jpg", tone: "cream", position: "right" },
  { slug: "dining-room", title: "Dining Room", copy: "Elegant, functional pieces for every gathering.", image: "/images/dining.jpg", tone: "olive", position: "left" },
  { slug: "storage", title: "Storage", copy: "Minimal solutions for a cleaner home.", image: "/images/storage.jpg", tone: "sand", position: "right" },
  { slug: "bedroom", title: "Premium Bedroom", copy: "Quality beds and mattresses for better rest.", image: "/images/bedroom.jpg", tone: "plum", position: "right", wide: true },
  { slug: "home-decor", title: "Home Decor", copy: "Small touches for a big transformation.", image: "/images/decor.jpg", tone: "oat", position: "left" },
];

function addItem(id: string) {
  try {
    const current = JSON.parse(localStorage.getItem("better-space-cart") || "[]") as Array<{ id: string; quantity: number }>;
    const next = current.some((item) => item.id === id)
      ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { id, quantity: 1 }];
    localStorage.setItem("better-space-cart", JSON.stringify(next));
  } catch {}
}

export function Storefront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const toggleLiked = (id: string) => setLiked((items) => {
    const next = items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
    try { localStorage.setItem("better-space-wishlist", JSON.stringify(next)); } catch {}
    return next;
  });
  const addToCart = (id: string) => { addItem(id); setCartCount((count) => count + 1); };
  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    window.location.href = query ? `/products?search=${encodeURIComponent(query)}` : "/products";
  };

  return <div className="ruma-home">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="ruma-header">
      <div className="ruma-utility"><div className="ruma-shell ruma-utility-inner"><span>Free shipping for orders over Rp 1.000.000</span><nav aria-label="Utility navigation"><a href="#footer-help">Help Center</a><a href="#benefits">Track Order</a><a href="#footer-contact">Store Location</a><button type="button" aria-label="Language: English">EN <ChevronDown size={11}/></button></nav></div></div>
      <div className="ruma-shell ruma-main-header">
        <button type="button" className="ruma-mobile-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
        <Link href="/" className="ruma-brand" aria-label="Better Space home"><strong>Better Space</strong><span>FURNITURE FOR A BETTER LIVING.</span></Link>
        <form className="ruma-search" role="search" onSubmit={onSearch}><label className="sr-only" htmlFor="home-search">Search products</label><Search size={18}/><input id="home-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products / furniture ..."/><label className="sr-only" htmlFor="home-search-category">Category</label><select id="home-search-category" defaultValue="all" aria-label="Search category"><option value="all">All Categories</option><option value="living">Living Room</option><option value="bedroom">Bedroom</option><option value="dining">Dining Room</option></select><button aria-label="Search"><Search size={17}/></button></form>
        <div className="ruma-actions"><button type="button" className="ruma-account" title="Account features are not included in this preview" aria-label="Account features are not included in this preview"><UserRound size={21}/><span>Account</span></button><Link href="/wishlist" aria-label="Wishlist"><Heart size={21}/><span>Wishlist</span></Link><Link className="ruma-cart" href="/cart" aria-label={`Cart, ${cartCount} items`}><ShoppingCart size={21}/><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</Link></div>
      </div>
      <nav className={`ruma-category-nav ${menuOpen ? "is-open" : ""}`} aria-label="Product categories"><div className="ruma-shell"><Link href="/products">All Categories</Link><Link href="/products?room=living-room">Living Room</Link><Link href="/products?room=bedroom">Bedroom</Link><Link href="/products?room=dining-room">Dining Room</Link><Link href="/products?room=home-office">Home Office</Link><Link href="/products?room=storage">Storage</Link><Link href="/products?room=lighting">Lighting</Link><Link href="/products?room=home-decor">Home Decor</Link><a href="#weekly">Sale / Promo</a></div></nav>
    </header>

    <main id="main-content">
      <section id="home" className="ruma-shell ruma-hero" aria-label="Featured collection">
        <Image src="/images/hero.jpg" alt="Bright contemporary living room with a linen sectional sofa" fill priority sizes="(max-width: 1240px) 100vw, 1200px"/>
        <div className="ruma-hero-scrim"/>
        <div className="ruma-hero-copy"><p>BETTER SPACE COLLECTION</p><h1>Make Room<br/>For Living</h1><span>Furniture with thoughtful details for the way your home feels every day.</span><a href="#recommended">Shop Now <ArrowRight size={15}/></a></div>
        <button className="ruma-hero-arrow ruma-hero-prev" type="button" aria-label="Previous collection"><ArrowLeft size={17}/></button><button className="ruma-hero-arrow ruma-hero-next" type="button" aria-label="Next collection"><ArrowRight size={17}/></button><div className="ruma-dots" aria-label="Carousel slide 1 of 3"><i className="active"/><i/><i/></div>
      </section>

      <section id="weekly" className="ruma-shell ruma-weekly" aria-labelledby="weekly-title"><div className="ruma-weekly-intro"><p>CURATED FOR YOU</p><h2 id="weekly-title">Featured Furniture<br/>This Week</h2><span>Small choices that make everyday spaces feel more considered.</span><Link href="/products">View All <ArrowRight size={15}/></Link></div><div className="ruma-weekly-products">{weeklyProducts.map((product) => <ProductCard compact key={product.id} product={product} liked={liked.includes(product.id)} onLike={toggleLiked} onCart={addToCart}/>)}</div></section>

      <section id="rooms" className="ruma-shell ruma-mosaic" aria-label="Shop by room"><div className="ruma-mosaic-top">{categoryContent.slice(0, 3).map((category) => <EditorialCard key={category.slug} {...category}/>)}</div><div className="ruma-mosaic-bottom">{categoryContent.slice(3).map((category) => <EditorialCard key={category.slug} {...category}/>)}</div></section>

      <section id="recommended" className="ruma-shell ruma-recommended" aria-labelledby="recommended-title"><div className="ruma-centered-heading"><p>THE BETTER SPACE EDIT</p><h2 id="recommended-title">Products You May Like</h2><i/></div><div className="ruma-product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} liked={liked.includes(product.id)} onLike={toggleLiked} onCart={addToCart}/>)}</div><Link className="ruma-view-all" href="/products">View All Products <ArrowRight size={15}/></Link></section>

      <section id="inspiration" className="ruma-shell ruma-promo"><Image src="/images/promo.jpg" alt="Warm dining space with a timber table in natural light" fill sizes="(max-width: 1240px) 100vw, 1200px"/><div className="ruma-promo-wash"/><div><p>ROOM TO GATHER</p><h2>Bring Your Home<br/>to Life</h2><span>Save up to 50% on selected furniture collections.</span><Link href="/products?room=dining-room">Shop Now <ArrowRight size={15}/></Link></div></section>

      <section id="benefits" className="ruma-shell ruma-benefits" aria-label="Shopping benefits"><Benefit icon={Truck} title="Free Shipping" copy="Minimum purchase applies"/><Benefit icon={PackageCheck} title="Easy Returns" copy="Up to 14 days"/><Benefit icon={ShoppingCart} title="Secure Payment" copy="Protected checkout"/><Benefit icon={Headphones} title="Customer Support" copy="Available every day"/></section>
    </main>

    <footer id="footer-contact" className="ruma-footer"><div className="ruma-shell ruma-footer-grid"><div className="ruma-footer-brand"><Link href="#home" className="ruma-brand"><strong>Better Space</strong><span>FURNITURE FOR A BETTER LIVING.</span></Link><p>Thoughtfully selected furniture for a more comfortable, functional home.</p><div><a href="#footer-contact" aria-label="Better Space on Instagram">ig</a><a href="#footer-contact" aria-label="Better Space on Facebook">f</a><a href="#footer-contact" aria-label="Store location"><MapPin size={15}/></a></div></div><div><h3>Product Categories</h3><Link href="/products?room=living-room">Living Room</Link><Link href="/products?room=bedroom">Bedroom</Link><Link href="/products?room=dining-room">Dining Room</Link><Link href="/products?room=home-office">Home Office</Link><Link href="/products?room=storage">Storage</Link><Link href="/products?room=lighting">Lighting</Link></div><div id="footer-help"><h3>Customer Service</h3><a href="#benefits">Help Center</a><a href="#benefits">Track Order</a><a href="#benefits">Shipping Info</a><a href="#benefits">Returns</a><a href="#benefits">Warranty</a><a href="#footer-contact">Terms & Privacy</a></div><div className="ruma-newsletter"><h3>Newsletter</h3><p>Subscribe for new arrivals, selected offers, and home ideas.</p><form onSubmit={(event) => { event.preventDefault(); const output = event.currentTarget.querySelector("output"); if (output) output.textContent = "Thank you — you are on the list."; }}><label className="sr-only" htmlFor="ruma-email">Email address</label><input id="ruma-email" type="email" required placeholder="Enter your email"/><button aria-label="Subscribe"><ArrowRight size={16}/></button><output aria-live="polite"/></form><small>Available payments<br/><b>VISA</b> &nbsp; <b>Mastercard</b> &nbsp; <b>GoPay</b></small></div></div><div className="ruma-footer-bottom"><div className="ruma-shell"><span>© 2026 Better Space. All rights reserved.</span><span>BCA &nbsp; Mandiri &nbsp; VISA &nbsp; Mastercard &nbsp; GoPay</span></div></div></footer>
  </div>;
}

function ProductCard({ product, compact = false, liked, onLike, onCart }: { product: (typeof products)[number]; compact?: boolean; liked: boolean; onLike: (id: string) => void; onCart: (id: string) => void }) {
  return <article className={`ruma-product-card ${compact ? "compact" : ""}`}><div className="ruma-product-image"><Link href={`/products/${product.id}`}><Image src={product.image} alt={product.name} fill sizes={compact ? "(max-width: 850px) 50vw, 20vw" : "(max-width: 850px) 50vw, 20vw"}/></Link>{product.badge && <b className="ruma-badge">{product.badge}</b>}<button type="button" aria-label={`Save ${product.name}`} aria-pressed={liked} onClick={() => onLike(product.id)}><Heart size={16} fill={liked ? "currentColor" : "none"}/></button></div><div className="ruma-product-copy"><p>{product.category}</p><h3><Link href={`/products/${product.id}`}>{product.name}</Link></h3><div className="ruma-product-price"><b>{product.price}</b><span><Star size={11} fill="currentColor"/> 4.8</span></div><button type="button" className="ruma-add" onClick={() => onCart(product.id)} aria-label={`Add ${product.name} to cart`}><ShoppingCart size={15}/> Add to cart</button></div></article>;
}

function EditorialCard({ slug, title, copy, image, tone, position, wide }: { slug: string; title: string; copy: string; image: string; tone: string; position: string; wide?: boolean }) {
  return <article className={`ruma-editorial ${tone} ${position} ${wide ? "wide" : ""}`}><div><h2>{title}</h2><p>{copy}</p><Link href={`/products?room=${slug}`}>View Collection <ArrowRight size={14}/></Link></div><Image src={image} alt={`${title} furniture collection`} fill sizes="(max-width: 850px) 100vw, 40vw"/></article>;
}

function Benefit({ icon: Icon, title, copy }: { icon: typeof Truck; title: string; copy: string }) { return <div><i><Icon size={20}/></i><p><b>{title}</b><span>{copy}</span></p></div>; }
