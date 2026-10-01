"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PremiumShell, usePremiumStore } from "@/components/premium/PremiumStore";

const supportCards = [
  { label: "Beristirahat", copy: "Tempat tidur sebagai awal dan akhir dari hari yang lebih tenang." },
  { label: "Berkumpul", copy: "Sofa sebagai pusat kebersamaan keluarga di rumah." },
  { label: "Bekerja", copy: "Meja kerja sebagai tempat ide dan bisnis berkembang." },
  { label: "Menjalani Hari", copy: "Kebutuhan furniture dan interior yang mengikuti kehidupan penggunanya." },
];

export default function PremiumAboutPage() {
  const store = usePremiumStore();
  return <PremiumShell cartCount={store.cartCount}><main>
    <section className="premium-about-hero"><Image src="/images/living.jpg" alt="Ruang keluarga Better Space yang hangat dan tertata" fill sizes="100vw" priority/><div className="premium-about-hero-wash"/><div className="premium-shell premium-about-hero-copy"><p>TENTANG BETTER SPACE</p><h1>Better Space.<br/>Better Living.</h1></div></section>
    <section className="premium-about-section"><div className="premium-shell premium-about-manifesto"><h2>Better Space dimulai dari keyakinan bahwa kualitas hidup sering kali dimulai dari <em>ruang yang kita tempati.</em></h2><p>Ruang yang bekerja lebih baik dapat membuat keseharian terasa lebih nyaman, tertata, dan dekat dengan cara hidup penggunanya.</p></div></section>
    <section className="premium-about-section alt"><div className="premium-shell premium-about-split"><Image src="/images/bedroom.jpg" alt="Kamar tidur yang ditata untuk istirahat dan kenyamanan" width={800} height={600}/><div><p className="eyebrow">BENTUK, FUNGSI, KENYAMANAN</p><h2>Furniture bukan hanya benda yang mengisi ruangan</h2><p>Pilihan bentuk, fungsi, kenyamanan, dan penataan dapat mengubah cara seseorang beristirahat, bekerja, berkumpul, dan menjalani keseharian. Furniture yang tepat membantu ruang terasa lebih sesuai dengan kebutuhan nyata penggunanya.</p><ul><li>Bentuk</li><li>Fungsi</li><li>Kenyamanan</li><li>Penataan</li></ul></div></div></section>
    <section className="premium-about-section"><div className="premium-shell premium-about-manifesto"><h2>Rumah tidak harus menjadi <em>lebih besar</em> untuk menjadi lebih baik. Ruang kerja tidak harus lebih mewah untuk menjadi lebih nyaman.</h2><p>Perbaikan yang bermakna sering kali dimulai dari memilih furniture yang tepat, lalu menata ruang agar mendukung cara kita hidup.</p></div></section>
    <section className="premium-about-section alt"><div className="premium-shell"><div className="premium-section-heading premium-about-centered"><div><p>RUANG UNTUK KEHIDUPAN</p><h2>Setiap ruang memiliki peran</h2></div></div><div className="premium-about-cards">{supportCards.map((card) => <div className="premium-about-card" key={card.label}><b>{card.label}</b><p>{card.copy}</p></div>)}</div></div></section>
    <section className="premium-about-section premium-about-space"><div className="premium-shell premium-about-space-grid"><div><p className="eyebrow">MAKNA “BETTER”</p><h2>Perbaikan yang terus berjalan</h2><p>Lebih nyaman, lebih fungsional, lebih tertata, dan lebih sesuai dengan kehidupan penggunanya.</p></div><div><p className="eyebrow">MAKNA “SPACE”</p><h2>Lebih dari satu kategori furniture</h2><p>Better Space dapat bertumbuh bersama kebutuhan rumah, bedding, furniture kantor, interior essentials, dan kebutuhan hidup dalam ruang yang lebih luas.</p></div></div></section>
    <section className="premium-about-section"><div className="premium-shell"><p className="premium-essence-label">ESENSI MEREK</p><div className="premium-essence-row"><span>Perbaikan</span><span>Fungsi</span><span>Kenyamanan</span><span>Hidup Modern</span></div></div></section>
    <section className="premium-final-statement"><div className="premium-shell"><h2>Make Space Better.</h2><p>Better Space. Better Living.</p><Link href="/premium/shop">Lihat Koleksi <ChevronRight size={15}/></Link></div></section>
  </main></PremiumShell>;
}
