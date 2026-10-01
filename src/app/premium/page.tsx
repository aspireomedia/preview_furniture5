"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Headphones, RefreshCw, Shield, Truck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { PremiumShell, PremiumProductCard, usePremiumStore } from "@/components/premium/PremiumStore";
import { premiumCategories, premiumCollections, premiumHeroSlides, premiumProducts } from "@/data/premium";

const benefits = [
  { icon: Truck, title: "Gratis Ongkir", copy: "Untuk pesanan di atas Rp500.000" },
  { icon: Shield, title: "Keaslian Terjamin", copy: "Produk dipilih dengan cermat" },
  { icon: RefreshCw, title: "Pengembalian 30 Hari", copy: "Sesuai ketentuan produk" },
  { icon: Headphones, title: "Layanan Pelanggan", copy: "Bantuan untuk kebutuhan Anda" },
];
const trendingProducts = premiumProducts.filter((product) => product.badge);
const trendingDisplay = trendingProducts.length > 0 ? trendingProducts.slice(0, 8) : premiumProducts.slice(0, 8);
const newArrivals = [...premiumProducts.filter((product) => product.badge === "New"), ...premiumProducts.filter((product) => !product.badge)].slice(0, 8);
const underBudget = premiumProducts.filter((product) => product.numericPrice < 500000);
const accessibleLuxuryProducts = underBudget.length >= 4 ? underBudget : premiumProducts.filter((product) => product.numericPrice < 900000).slice(0, 8);
const accessibleLuxuryTitle = underBudget.length >= 4 ? "Di Bawah Rp500.000" : "Di Bawah Rp900.000";

export default function PremiumHome() {
  const store = usePremiumStore();
  const [hero, setHero] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => { const timer = setInterval(() => setHero((current) => (current + 1) % premiumHeroSlides.length), 6500); return () => clearInterval(timer); }, []);
  const slide = premiumHeroSlides[hero];
  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubscribed(true); };

  return <PremiumShell cartCount={store.cartCount}><main>
    <section className="premium-hero">
      <Image src={slide.image} alt={slide.title} fill priority sizes="100vw" className="premium-hero-image" />
      <div className="premium-hero-wash" />
      <div className="premium-shell premium-hero-content"><p>{slide.eyebrow}</p><h1>{slide.title}</h1><span>{slide.subtitle}</span><Link href={slide.href} className="premium-hero-cta">{slide.cta} <ChevronRight size={16} /></Link></div>
      <button type="button" className="premium-hero-arrow premium-hero-prev" aria-label="Slide sebelumnya" onClick={() => setHero((hero + premiumHeroSlides.length - 1) % premiumHeroSlides.length)}><ChevronLeft size={18} /></button>
      <button type="button" className="premium-hero-arrow premium-hero-next" aria-label="Slide berikutnya" onClick={() => setHero((hero + 1) % premiumHeroSlides.length)}><ChevronRight size={18} /></button>
      <div className="premium-hero-dots">{premiumHeroSlides.map((_, index) => <button key={index} type="button" aria-label={`Tampilkan slide ${index + 1}`} className={index === hero ? "active" : ""} onClick={() => setHero(index)} />)}</div>
    </section>

    <section className="premium-benefits"><div className="premium-shell premium-benefits-grid">{benefits.map((benefit) => <div className="premium-benefit" key={benefit.title}><span className="premium-benefit-icon"><benefit.icon size={19} /></span><p><b>{benefit.title}</b><span>{benefit.copy}</span></p></div>)}</div></section>
    <section className="premium-section"><div className="premium-shell premium-chips">{premiumCategories.map((category) => <Link key={category.id} href={`/premium/shop?category=${category.id}`} className="premium-chip">{category.name} <small>({category.count})</small></Link>)}</div></section>

    <section className="premium-about-home"><div className="premium-shell premium-about-home-grid"><div><p className="eyebrow">TENTANG BETTER SPACE</p><h2>Better Space.<br/><em>Better Living.</em></h2><Link href="/premium/about" className="premium-about-link">Lihat Selengkapnya <ChevronRight size={15}/></Link></div><div className="premium-about-story"><p>Better Space lahir dari gagasan sederhana bahwa kualitas hidup sering kali dimulai dari ruang yang kita tempati.</p><p>Furniture bukan sekadar pengisi ruangan. Bentuk, fungsi, kenyamanan, dan penataannya memengaruhi cara kita beristirahat, bekerja, berkumpul, dan menjalani hari.</p><div className="premium-about-highlights"><span>Tempat istirahat</span><span>Pusat kebersamaan</span><span>Ruang untuk bertumbuh</span></div><div className="premium-about-essence"><b>ESENSI MEREK</b><span>Perbaikan</span><span>Fungsi</span><span>Kenyamanan</span><span>Hidup Modern</span></div><p className="premium-about-tagline">Make Space Better.<br/>Better Space. Better Living.</p></div></div></section>

    <section className="premium-section"><div className="premium-shell"><SectionHeading eyebrow="Pilihan Favorit" title="Sedang Populer"/><div className="premium-grid">{trendingDisplay.slice(0, 4).map((product) => <PremiumProductCard key={product.id} product={product} wishlisted={store.wishlist.includes(product.id)} onWishlist={store.toggleWishlist} onAdd={store.add} />)}</div></div></section>
    <section className="premium-section" style={{ background: "var(--p-cream)" }}><div className="premium-shell"><SectionHeading eyebrow="Pilihan Untuk Anda" title="Koleksi Pilihan"/><div className="premium-collections-grid">{premiumCollections.map((collection) => <Link key={collection.id} href={`/premium/shop?category=${collection.categorySlug}`} className="premium-collection-card"><Image src={collection.image} alt={collection.name} fill sizes="(max-width: 860px) 100vw, 33vw"/><div className="premium-collection-wash"/><div className="premium-collection-copy"><small>Lihat Koleksi</small><h3>{collection.name}</h3><p>{collection.description}</p><span>Lihat Koleksi <ChevronRight size={13}/></span></div></Link>)}</div></div></section>
    <section className="premium-section"><div className="premium-shell"><SectionHeading eyebrow="Baru Hadir" title="Produk Terbaru"/><div className="premium-rail">{newArrivals.map((product) => <div className="premium-rail-item" key={product.id}><PremiumProductCard product={product} wishlisted={store.wishlist.includes(product.id)} onWishlist={store.toggleWishlist} onAdd={store.add}/></div>)}</div></div></section>

    <section className="premium-faq-promo"><div className="premium-shell premium-faq-promo-inner"><p className="eyebrow">BUTUH BANTUAN?</p><h2>Ada yang ingin<br/>Anda tanyakan?</h2><div><p>Temukan informasi seputar pemesanan, pembayaran, pengiriman, pengembalian, perawatan produk, dan layanan Better Space.</p><Link href="/premium/faq">Lihat FAQ <ChevronRight size={16}/></Link></div></div></section>

    <section className="premium-section" style={{ background: "var(--p-cream)" }}><div className="premium-shell"><SectionHeading eyebrow="Kemewahan yang Terjangkau" title={accessibleLuxuryTitle}/><div className="premium-grid">{accessibleLuxuryProducts.slice(0, 4).map((product) => <PremiumProductCard key={product.id} product={product} wishlisted={store.wishlist.includes(product.id)} onWishlist={store.toggleWishlist} onAdd={store.add}/>)}</div></div></section>
    <section className="premium-newsletter"><div className="premium-shell premium-newsletter-inner"><p className="eyebrow">Dapatkan Inspirasi</p><h2>Bergabung di Better Space Circle</h2><p className="body">Dapatkan kabar koleksi terbaru, penawaran pilihan, dan inspirasi penataan ruang di email Anda.</p>{subscribed ? <p className="premium-newsletter-success">Terima kasih, Anda sudah bergabung.</p> : <form onSubmit={submitNewsletter}><label htmlFor="premium-newsletter-email" className="sr-only">Alamat email</label><input id="premium-newsletter-email" type="email" required placeholder="Alamat email Anda"/><button type="submit">Berlangganan <ChevronRight size={15}/></button></form>}</div></section>
  </main></PremiumShell>;
}
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="premium-section-heading"><div><p>{eyebrow}</p><h2>{title}</h2></div><Link href="/premium/shop">Lihat Selengkapnya →</Link></div>; }
