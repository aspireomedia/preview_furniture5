"use client";

import Link from "next/link";
import { PremiumShell, usePremiumStore } from "@/components/premium/PremiumStore";

const faqGroups = [
  { title: "Pemesanan", items: [
    ["Bagaimana cara melakukan pemesanan?", "Pilih produk di koleksi Premium, masukkan ke keranjang, lalu lanjutkan ke tahap pengiriman. Preview ini belum memproses pembayaran langsung."],
    ["Apakah saya dapat mengubah atau membatalkan pesanan?", "Hubungi tim kami sesegera mungkin setelah pesanan dibuat. Perubahan mungkin tidak dapat dilakukan jika pesanan sudah masuk tahap persiapan atau pengiriman."],
    ["Bagaimana cara mengecek status pesanan?", "Hubungi kami dengan informasi pesanan Anda untuk mendapatkan pembaruan status."],
  ]},
  { title: "Pembayaran", items: [
    ["Metode pembayaran apa saja yang tersedia?", "Pilihan pembayaran akan ditampilkan saat integrasi pembayaran sudah tersedia. Preview ini belum memproses pembayaran langsung."],
    ["Apakah informasi pembayaran saya aman?", "Informasi pembayaran akan diproses melalui penyedia pembayaran saat integrasi pembayaran tersedia. Better Space tidak menyimpan data pembayaran pada preview ini."],
  ]},
  { title: "Pengiriman", items: [
    ["Ke mana saja Better Space melakukan pengiriman?", "Ketersediaan pengiriman bergantung pada cakupan mitra logistik dan akan dikonfirmasi saat proses pesanan."],
    ["Berapa biaya pengiriman?", "Biaya pengiriman bergantung pada lokasi dan detail pesanan. Informasi biaya akan dikonfirmasi pada proses pesanan."],
    ["Berapa lama proses pengiriman?", "Waktu pengiriman bergantung pada ketersediaan produk dan tujuan. Estimasi akan dikonfirmasi oleh tim kami."],
    ["Bagaimana cara melacak pesanan?", "Informasi pelacakan akan dibagikan ketika pesanan telah dikirim, bila tersedia dari mitra pengiriman."],
  ]},
  { title: "Pengembalian & Penukaran", items: [
    ["Apakah produk dapat dikembalikan?", "Kelayakan pengembalian mengikuti kondisi produk dan ketentuan yang dikonfirmasi saat pemesanan. Hubungi tim kami untuk memulai peninjauan."],
    ["Berapa lama batas waktu pengajuan pengembalian?", "Batas waktu dan kelayakan pengembalian akan dikonfirmasi oleh tim kami sesuai detail pesanan dan kondisi produk."],
    ["Bagaimana proses pengembalian dana?", "Jika pengembalian disetujui, proses berikutnya akan dikonfirmasi oleh tim kami sesuai metode pembayaran yang digunakan."],
  ]},
  { title: "Produk", items: [
    ["Apakah warna produk sama persis dengan foto?", "Kami berupaya menampilkan foto produk seakurat mungkin. Namun tampilan layar dapat memengaruhi persepsi warna."],
    ["Bagaimana cara memastikan ukuran produk?", "Dimensi tersedia pada halaman setiap produk. Kami menyarankan Anda mengukur ruang sebelum memesan."],
    ["Apa yang terjadi jika produk habis?", "Produk yang tidak tersedia akan ditandai pada halaman produk. Hubungi kami untuk mengetahui ketersediaan berikutnya."],
    ["Apakah produk memiliki garansi?", "Informasi garansi, bila berlaku, akan dikonfirmasi pada halaman produk atau saat pemesanan."],
  ]},
  { title: "Perawatan", items: [
    ["Bagaimana cara merawat furniture?", "Ikuti panduan perawatan sesuai material produk dan hindari paparan langsung terhadap kelembapan atau panas berlebih."],
    ["Di mana saya dapat menemukan panduan perawatan?", "Catatan material dan perawatan tersedia pada halaman produk di bagian Detail."],
  ]},
  { title: "Layanan Pelanggan", items: [
    ["Bagaimana cara menghubungi Better Space?", "Anda dapat menghubungi kami melalui halaman Kontak atau email yang tercantum di footer."],
    ["Informasi apa yang perlu disiapkan saat menghubungi tim kami?", "Siapkan nomor pesanan jika ada, nama produk, serta ringkasan pertanyaan agar tim kami dapat membantu dengan lebih tepat."],
  ]},
] as const;

export default function PremiumFaqPage() {
 const store = usePremiumStore();
 return <PremiumShell cartCount={store.cartCount}><main><nav className="premium-shell premium-breadcrumb"><Link href="/premium">Beranda</Link><span>/</span><b>FAQ</b></nav><div className="premium-shell premium-page-hero"><p className="eyebrow">FAQ</p><h1>Pertanyaan yang Sering Diajukan</h1><p className="lede">Informasi seputar belanja, produk, pengiriman, perawatan, dan layanan Better Space.</p></div><div className="premium-shell premium-faq-groups">{faqGroups.map((group) => <section className="premium-faq-group" key={group.title}><h2>{group.title}</h2>{group.items.map(([question, answer]) => <details className="premium-faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>)}</div></main></PremiumShell>;
}
