"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./ScreenshotShowcase.module.css";
import Image from "next/image";

const slides = [
  {
    tag: "Fitur 01",
    title: "Feed Dalam Perjalanan",
    subtitle: "Temukan orang yang searah",
    desc: "Orang yang sedang berangkat memposting rutenya ke feed. Pengguna tinggal mencari perjalanan yang sesuai untuk bawain barang, beliin sesuatu, boncengan, atau kebutuhan lain, lalu lanjut ke chat dan deal.",
    bullets: [
      "🟢 Rute aktif tampil langsung di feed",
      "⚡ Cocok untuk kebutuhan time-sensitive",
      "📍 Filter by kota asal & tujuan",
    ],
    imgSrc: "/screenshots/ss-fedok.png",
    imgAlt: "Feed Dalam Perjalanan Numpak",
    accent: "#0d9488",
  },
  {
    tag: "Fitur 02",
    title: "Detail Rute & Info Orang Searah",
    subtitle: "Transparan dari asal sampai tujuan",
    desc: "Setiap posting perjalanan menampilkan detail lengkap: nama, tanggal dan jam berangkat, asal keberangkatan, tujuan, hingga estimasi ongkos. Pengguna dapat menilai kecocokan sebelum membuat deal.",
    bullets: [
      "🗺️ Asal & tujuan rute jelas tertera",
      "💸 Ongkos transparan sejak awal",
      "🤝 Tombol DEAL langsung dari feed",
    ],
    imgSrc: "/screenshots/ss-ruteok.png",
    imgAlt: "Detail Rute Perjalanan Numpak",
    accent: "#3b82f6",
    realImg: true,
  },
  {
    tag: "Fitur 03",
    title: "Marketplace Outlet — Nitip Beliin",
    subtitle: "Outlet lokal masuk ekosistem titip beli",
    desc: "Halaman Market menampilkan outlet pilihan dengan kategori Makanan, Obat, Sembako, dan lainnya. Warung yang belum digital tetap bisa masuk lewat model Kurir, Customer, atau Pemilik.",
    bullets: [
      "🏪 Sistem Outlet 3 Model",
      "🍱 Filter kategori: Makanan, Obat, Sembako",
      "📢 Jembatan digitalisasi UMKM informal",
    ],
    imgSrc: "/screenshots/ss-market.jpeg",
    imgAlt: "Marketplace Outlet Numpak",
    accent: "#f59e0b",
    realImg: true,
  },
  {
    tag: "Fitur 04",
    title: "Chat In-App & Konfirmasi Deal",
    subtitle: "Nego tanpa keluar platform",
    desc: "Pengguna dapat berinteraksi lewat chat in-app Numpak. Negosiasi harga, koordinasi titik jemput, hingga konfirmasi barang — semua dalam satu tempat yang aman.",
    bullets: [
      "💬 Chat langsung antar pengguna",
      "🔔 Notifikasi deal offer real-time",
      "🔒 Riwayat chat tersimpan aman",
    ],
    imgSrc: "/screenshots/ss-chat.jpeg",
    imgAlt: "Chat In-App Numpak",
    accent: "#3b82f6",
  },
  {
    tag: "Fitur 05",
    title: "Transaksi Terlacak",
    subtitle: "Status deal jelas dari awal sampai selesai",
    desc: "Setiap transaksi punya status jelas seperti Menunggu Bayar, Ready to Ship, Selesai, atau Dibatalkan. Data transaksi masuk ke dashboard agar admin dapat memantau aktivitas dan menangani sengketa.",
    bullets: [
      "💳 Escrow disiapkan untuk fase produksi",
      "📦 Label OWNER & CARRIER per transaksi",
      "📊 Riwayat lengkap dengan ekspor PDF",
    ],
    imgSrc: "/screenshots/ss-transaction.jpeg",
    imgAlt: "Halaman Transaksi Numpak",
    accent: "#f59e0b",
  },
  {
    tag: "Fitur 06",
    title: "7 Fitur dalam Satu Platform",
    subtitle: "Ekosistem peer-to-peer terlengkap",
    desc: "Dari Nitip Bawain, Nitip Beliin, Nyari Boncengan, Nyari Tukang, Dalam Perjalanan, Jualan Keliling, sampai Outlet — semua tersedia di satu ekosistem mobilitas komunitas.",
    bullets: [
      "🧳 Nitip Bawain & Nitip Beliin",
      "🛵 Nyari Boncengan & Nyari Tukang",
      "🚛 Dalam Perjalanan & Jualan Keliling",
    ],
    imgSrc: "/screenshots/ss-features.jpeg",
    imgAlt: "Menu Fitur Numpak",
    accent: "#8b5cf6",
  },
  {
    tag: "Fitur 07",
    title: "Keranjang Nitip — Titip Belanja Lintas Kota",
    subtitle: "Belanja dari toko manapun via kurir",
    desc: "Pengguna dapat checkout produk dari outlet terdaftar, lalu meminta orang yang memang sedang melewati rute outlet ke lokasi penerima untuk sekalian membelikan.",
    bullets: [
      "🛒 Keranjang nitip multi-outlet",
      "🍱 Dibantu orang yang searah",
      "💰 Estimasi total transparan",
    ],
    imgSrc: "/screenshots/ss-deal.jpeg",
    imgAlt: "Keranjang Nitip Numpak",
    accent: "#0d9488",
  },
  {
    tag: "Fitur 08",
    title: "Profil Verified Pro & Sistem Reputasi",
    subtitle: "Trust by design, bukan sekadar janji",
    desc: "Sistem reputasi Numpak membantu mengurangi risiko transaksi antar orang asing. XP, jumlah postingan, rating, dan galeri aktivitas membangun kepercayaan komunitas secara bertahap.",
    bullets: [
      "⭐ Badge Verified Pro berbasis XP",
      "📈 Review aktif terlacak",
      "🖼️ Galeri aktivitas transparan",
    ],
    imgSrc: "/screenshots/ss-profile.jpeg",
    imgAlt: "Profil Verified Pro Numpak",
    accent: "#f59e0b",
  },
  {
    tag: "Fitur 09",
    title: "Outlet Saya — Sistem Outlet 3 Model",
    subtitle: "Warung offline masuk ekosistem digital",
    desc: "Outlet bisa didaftarkan oleh Kurir, Pemilik, atau Customer setia. Warung konvensional yang pemiliknya belum melek teknologi tetap dapat muncul di marketplace Numpak.",
    bullets: [
      "🏪 3 model: Kurir / Pemilik / Customer",
      "🛍️ Kelola produk & harga langsung",
      "📢 Slot promo Outlet Ads tersedia",
    ],
    imgSrc: "/screenshots/ss-outlet.jpeg",
    imgAlt: "Outlet Saya Numpak",
    accent: "#dc2626",
  },
];

export default function ScreenshotShowcase() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const go = useCallback(
    (idx: number) => {
      if (animating || idx === active) return;
      setDirection(idx > active ? "next" : "prev");
      setAnimating(true);
      setTimeout(() => {
        setActive(idx);
        setAnimating(false);
      }, 350);
    },
    [active, animating],
  );

  const prev = () => go(active === 0 ? slides.length - 1 : active - 1);
  const next = () => go(active === slides.length - 1 ? 0 : active + 1);

  useEffect(() => {
    const t = setInterval(() => {
      go(active === slides.length - 1 ? 0 : active + 1);
    }, 5000);
    return () => clearInterval(t);
  }, [active, go]);

  const slide = slides[active];

  return (
    <section className={styles.section} id="screenshots">
      <div className={styles.header}>
        <div className={styles.eyebrow}>Eksplorasi Antarmuka</div>
        <h2 className={styles.title}>
          Prototype Interaktif.{" "}
          <span className={styles.accent}>Siap diuji.</span>
        </h2>
        <p className={styles.desc}>
          Setiap layar di bawah menggambarkan alur prototype live — dari
          pencarian rute, chat, deal, transaksi, sampai reputasi pengguna.
        </p>
      </div>

      <div className={styles.carousel}>
        <div
          className={`${styles.textPane} ${animating ? (direction === "next" ? styles.exitLeft : styles.exitRight) : styles.enter}`}
          style={{ "--accent": slide.accent } as React.CSSProperties}
        >
          <div
            className={styles.tag}
            style={{ background: slide.accent + "22", color: slide.accent }}
          >
            {slide.tag}
          </div>
          <h3 className={styles.slideTitle}>{slide.title}</h3>
          <p className={styles.slideSubtitle}>{slide.subtitle}</p>
          <p className={styles.slideDesc}>{slide.desc}</p>
          <ul className={styles.bullets}>
            {slide.bullets.map((b, i) => (
              <li key={i} className={styles.bullet}>
                {b}
              </li>
            ))}
          </ul>

          <div className={styles.nav}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label="Sebelumnya"
            >
              ←
            </button>
            <div className={styles.dots}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                  style={i === active ? { background: slide.accent } : {}}
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              className={styles.navBtn}
              onClick={next}
              aria-label="Berikutnya"
            >
              →
            </button>
            <span className={styles.counter}>
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className={styles.phoneWrap}>
          <div className={styles.blob1} style={{ background: slide.accent }} />
          <div className={styles.blob2} style={{ background: slide.accent }} />

          <div className={styles.phone}>
            <div className={styles.phoneChromeTop}>
              <div className={styles.phoneCamera} />
            </div>
            <div
              className={`${styles.phoneScreen} ${animating ? (direction === "next" ? styles.screenExitLeft : styles.screenExitRight) : styles.screenEnter}`}
            >
              <Image
                src={slide.imgSrc}
                alt={slide.imgAlt}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div className={styles.phoneChromeBottom}>
              <div className={styles.homeBar} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
