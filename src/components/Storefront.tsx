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
  { slug: "living-room", title: "Ruang Keluarga", copy: "Furniture modern untuk bersantai bersama keluarga.", image: "/images/living.jpg", tone: "cream", position: "right" },
  { slug: "dining-room", title: "Ruang Makan", copy: "Pilihan elegan dan fungsional untuk setiap momen berkumpul.", image: "/images/dining.jpg", tone: "olive", position: "left" },
  { slug: "storage", title: "Penyimpanan", copy: "Solusi ringkas untuk rumah yang lebih tertata.", image: "/images/storage.jpg", tone: "sand", position: "right" },
  { slug: "bedroom", title: "Kamar Tidur Premium", copy: "Tempat tidur dan matras berkualitas untuk istirahat yang lebih baik.", image: "/images/bedroom.jpg", tone: "plum", position: "right", wide: true },
  { slug: "home-decor", title: "Dekorasi Rumah", copy: "Sentuhan kecil yang membuat ruang lebih hidup.", image: "/images/decor.jpg", tone: "oat", position: "left" },
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
    <a className="skip-link" href="#main-content">Lewati ke konten</a>
    <header className="ruma-header">
      <div className="ruma-utility"><div className="ruma-shell ruma-utility-inner"><span>Gratis ongkir untuk pesanan di atas Rp 1.000.000</span><nav aria-label="Navigasi bantuan"><a href="#footer-help">Pusat Bantuan</a><a href="#benefits">Lacak Pesanan</a><a href="#footer-contact">Lokasi Toko</a></nav></div></div>
      <div className="ruma-shell ruma-main-header">
        <button type="button" className="ruma-mobile-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
        <Link href="/" className="ruma-brand" aria-label="Beranda Better Space"><strong>Better Space</strong><span>FURNITURE FOR A BETTER LIVING.</span></Link>
        <form className="ruma-search" role="search" onSubmit={onSearch}><label className="sr-only" htmlFor="home-search">Cari produk</label><Search size={18}/><input id="home-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari produk atau furniture..."/><label className="sr-only" htmlFor="home-search-category">Kategori</label><select id="home-search-category" defaultValue="all" aria-label="Kategori pencarian"><option value="all">Semua Kategori</option><option value="living">Ruang Keluarga</option><option value="bedroom">Kamar Tidur</option><option value="dining">Ruang Makan</option></select><button aria-label="Cari"><Search size={17}/></button></form>
        <div className="ruma-actions"><button type="button" className="ruma-account" title="Fitur akun belum tersedia pada preview ini" aria-label="Fitur akun belum tersedia pada preview ini"><UserRound size={21}/><span>Akun</span></button><Link href="/wishlist" aria-label="Daftar keinginan"><Heart size={21}/><span>Favorit</span></Link><Link className="ruma-cart" href="/cart" aria-label={`Keranjang, ${cartCount} produk`}><ShoppingCart size={21}/><span>Keranjang</span>{cartCount > 0 && <b>{cartCount}</b>}</Link></div>
      </div>
      <nav className={`ruma-category-nav ${menuOpen ? "is-open" : ""}`} aria-label="Kategori produk"><div className="ruma-shell"><Link href="/products">Semua Kategori</Link><Link href="/products?room=living-room">Ruang Keluarga</Link><Link href="/products?room=bedroom">Kamar Tidur</Link><Link href="/products?room=dining-room">Ruang Makan</Link><Link href="/products?room=home-office">Ruang Kerja</Link><Link href="/products?room=storage">Penyimpanan</Link><Link href="/products?room=lighting">Pencahayaan</Link><Link href="/products?room=home-decor">Dekorasi Rumah</Link><a href="#weekly">Promo</a></div></nav>
    </header>

    <main id="main-content">
      <section id="home" className="ruma-shell ruma-hero" aria-label="Featured collection">
        <Image src="/images/hero.jpg" alt="Bright contemporary living room with a linen sectional sofa" fill priority sizes="(max-width: 1240px) 100vw, 1200px"/>
        <div className="ruma-hero-scrim"/>
        <div className="ruma-hero-copy"><p>KOLEKSI BETTER SPACE</p><h1>Ruang untuk<br/>Menjalani Hari</h1><span>Furniture dengan detail yang dipilih untuk membuat rumah terasa lebih nyaman setiap hari.</span><a href="#recommended">Belanja Sekarang <ArrowRight size={15}/></a></div>
        <button className="ruma-hero-arrow ruma-hero-prev" type="button" aria-label="Koleksi sebelumnya"><ArrowLeft size={17}/></button><button className="ruma-hero-arrow ruma-hero-next" type="button" aria-label="Koleksi berikutnya"><ArrowRight size={17}/></button><div className="ruma-dots" aria-label="Slide carousel 1 dari 3"><i className="active"/><i/><i/></div>
      </section>

      <section id="weekly" className="ruma-shell ruma-weekly" aria-labelledby="weekly-title"><div className="ruma-weekly-intro"><p>PILIHAN UNTUK ANDA</p><h2 id="weekly-title">Furniture Pilihan<br/>Minggu Ini</h2><span>Pilihan kecil yang membuat ruang sehari-hari terasa lebih tertata.</span><Link href="/products">Lihat Selengkapnya <ArrowRight size={15}/></Link></div><div className="ruma-weekly-products">{weeklyProducts.map((product) => <ProductCard compact key={product.id} product={product} liked={liked.includes(product.id)} onLike={toggleLiked} onCart={addToCart}/>)}</div></section>

      <section id="rooms" className="ruma-shell ruma-mosaic" aria-label="Shop by room"><div className="ruma-mosaic-top">{categoryContent.slice(0, 3).map((category) => <EditorialCard key={category.slug} {...category}/>)}</div><div className="ruma-mosaic-bottom">{categoryContent.slice(3).map((category) => <EditorialCard key={category.slug} {...category}/>)}</div></section>

      <section id="recommended" className="ruma-shell ruma-recommended" aria-labelledby="recommended-title"><div className="ruma-centered-heading"><p>PILIHAN BETTER SPACE</p><h2 id="recommended-title">Produk yang Mungkin Anda Suka</h2><i/></div><div className="ruma-product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} liked={liked.includes(product.id)} onLike={toggleLiked} onCart={addToCart}/>)}</div><Link className="ruma-view-all" href="/products">Lihat Selengkapnya <ArrowRight size={15}/></Link></section>

      <section id="inspiration" className="ruma-shell ruma-promo"><Image src="/images/promo.jpg" alt="Ruang makan hangat dengan meja kayu dan cahaya alami" fill sizes="(max-width: 1240px) 100vw, 1200px"/><div className="ruma-promo-wash"/><div><p>RUANG UNTUK BERKUMPUL</p><h2>Hidupkan<br/>Ruang Anda</h2><span>Pilihan furniture untuk momen berkumpul yang lebih bermakna.</span><Link href="/products?room=dining-room">Lihat Koleksi <ArrowRight size={15}/></Link></div></section>

      <section id="benefits" className="ruma-shell ruma-benefits" aria-label="Keunggulan belanja"><Benefit icon={Truck} title="Gratis Ongkir" copy="Dengan minimum pembelian"/><Benefit icon={PackageCheck} title="Pengembalian Mudah" copy="Sesuai ketentuan produk"/><Benefit icon={ShoppingCart} title="Pembayaran Aman" copy="Pilihan pembayaran terlindungi"/><Benefit icon={Headphones} title="Layanan Pelanggan" copy="Siap membantu setiap hari"/></section>
    </main>

    <footer id="footer-contact" className="ruma-footer"><div className="ruma-shell ruma-footer-grid"><div className="ruma-footer-brand"><Link href="#home" className="ruma-brand"><strong>Better Space</strong><span>FURNITURE FOR A BETTER LIVING.</span></Link><p>Furniture pilihan untuk rumah yang lebih nyaman dan fungsional.</p><div><a href="#footer-contact" aria-label="Better Space di Instagram">ig</a><a href="#footer-contact" aria-label="Better Space di Facebook">f</a><a href="#footer-contact" aria-label="Lokasi toko"><MapPin size={15}/></a></div></div><div><h3>Kategori Produk</h3><Link href="/products?room=living-room">Ruang Keluarga</Link><Link href="/products?room=bedroom">Kamar Tidur</Link><Link href="/products?room=dining-room">Ruang Makan</Link><Link href="/products?room=home-office">Ruang Kerja</Link><Link href="/products?room=storage">Penyimpanan</Link><Link href="/products?room=lighting">Pencahayaan</Link></div><div id="footer-help"><h3>Layanan Pelanggan</h3><a href="#benefits">Pusat Bantuan</a><a href="#benefits">Lacak Pesanan</a><a href="#benefits">Informasi Pengiriman</a><a href="#benefits">Pengembalian</a><a href="#benefits">Garansi</a><a href="#footer-contact">Ketentuan & Privasi</a></div><div className="ruma-newsletter"><h3>Newsletter</h3><p>Dapatkan kabar produk terbaru, penawaran pilihan, dan inspirasi rumah.</p><form onSubmit={(event) => { event.preventDefault(); const output = event.currentTarget.querySelector("output"); if (output) output.textContent = "Terima kasih, Anda sudah terdaftar."; }}><label className="sr-only" htmlFor="ruma-email">Alamat email</label><input id="ruma-email" type="email" required placeholder="Masukkan email Anda"/><button aria-label="Berlangganan"><ArrowRight size={16}/></button><output aria-live="polite"/></form><small>Pembayaran tersedia<br/><b>VISA</b> &nbsp; <b>Mastercard</b> &nbsp; <b>GoPay</b></small></div></div><div className="ruma-footer-bottom"><div className="ruma-shell"><span>© 2026 Better Space. Hak cipta dilindungi.</span><span>BCA &nbsp; Mandiri &nbsp; VISA &nbsp; Mastercard &nbsp; GoPay</span></div></div></footer>
  </div>;
}

function ProductCard({ product, compact = false, liked, onLike, onCart }: { product: (typeof products)[number]; compact?: boolean; liked: boolean; onLike: (id: string) => void; onCart: (id: string) => void }) {
  return <article className={`ruma-product-card ${compact ? "compact" : ""}`}><div className="ruma-product-image"><Link href={`/products/${product.id}`}><Image src={product.image} alt={product.name} fill sizes="(max-width: 850px) 50vw, 20vw"/></Link>{product.badge && <b className="ruma-badge">{product.badge === "New Arrival" ? "Produk Baru" : product.badge}</b>}<button type="button" aria-label={`Simpan ${product.name}`} aria-pressed={liked} onClick={() => onLike(product.id)}><Heart size={16} fill={liked ? "currentColor" : "none"}/></button></div><div className="ruma-product-copy"><p>{product.category}</p><h3><Link href={`/products/${product.id}`}>{product.name}</Link></h3><div className="ruma-product-price"><b>{product.price}</b><span><Star size={11} fill="currentColor"/> 4.8</span></div><button type="button" className="ruma-add" onClick={() => onCart(product.id)} aria-label={`Tambah ${product.name} ke keranjang`}><ShoppingCart size={15}/> Tambah ke Keranjang</button></div></article>;
}

function EditorialCard({ slug, title, copy, image, tone, position, wide }: { slug: string; title: string; copy: string; image: string; tone: string; position: string; wide?: boolean }) {
  return <article className={`ruma-editorial ${tone} ${position} ${wide ? "wide" : ""}`}><div><h2>{title}</h2><p>{copy}</p><Link href={`/products?room=${slug}`}>Lihat Koleksi <ArrowRight size={14}/></Link></div><Image src={image} alt={`Koleksi furniture ${title}`} fill sizes="(max-width: 850px) 100vw, 40vw"/></article>;
}

function Benefit({ icon: Icon, title, copy }: { icon: typeof Truck; title: string; copy: string }) { return <div><i><Icon size={20}/></i><p><b>{title}</b><span>{copy}</span></p></div>; }
