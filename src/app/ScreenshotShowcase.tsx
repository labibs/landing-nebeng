"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./ScreenshotShowcase.module.css";
import Image from "next/image";
import { useLanguage } from "../lib/LanguageContext";

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
    title: "Market — Nitip Beliin",
    subtitle: "Outlet lokal masuk ekosistem titip beli",
    desc: "Halaman Market menampilkan outlet dan produk berdasarkan kategori. Pengguna dapat mencari barang, membuka detail, dan menambahkan produk ke keranjang.",
    bullets: [
      "🏪 Jelajahi outlet lokal",
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
    desc: "Pengguna dapat berinteraksi lewat chat in-app untuk membahas harga, titik jemput, dan detail deal.",
    bullets: [
      "💬 Chat langsung antar pengguna",
      "🔔 Notifikasi deal offer real-time",
      "🔒 Lihat riwayat percakapan",
    ],
    imgSrc: "/screenshots/ss-chat.jpeg",
    imgAlt: "Chat In-App Numpak",
    accent: "#3b82f6",
  },
  {
    tag: "Fitur 05",
    title: "Transaksi Terlacak",
    subtitle: "Status deal jelas dari awal sampai selesai",
    desc: "Pengguna dapat melihat detail dan status transaksi. Admin memiliki halaman untuk memantau dan mengelola transaksi.",
    bullets: [
      "💳 Cek tahapan pembayaran yang tersedia",
      "📦 Label OWNER & CARRIER per transaksi",
      "📊 Lihat riwayat transaksi",
    ],
    imgSrc: "/screenshots/ss-transaction.jpeg",
    imgAlt: "Halaman Transaksi Numpak",
    accent: "#f59e0b",
  },
  {
    tag: "Fitur 06",
    title: "Beragam Fitur dalam Satu Platform",
    subtitle: "Satu aplikasi untuk berbagai kebutuhan",
    desc: "Buat permintaan kirim atau belanja, cari boncengan atau tukang, bagikan perjalanan, kelola outlet, pantau jualan keliling, atau buat konten.",
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
    title: "Profil Pengguna & Ulasan",
    subtitle: "Kenali pengguna sebelum membuat deal",
    desc: "Halaman profil menampilkan informasi pengguna dan aktivitas yang tersedia untuk membantu pengguna saling mengenal.",
    bullets: [
      "⭐ Lihat informasi profil",
      "📈 Baca ulasan yang tersedia",
      "🖼️ Jelajahi postingan pengguna",
    ],
    imgSrc: "/screenshots/ss-profile.jpeg",
    imgAlt: "Profil Pengguna Numpak",
    accent: "#f59e0b",
  },
  {
    tag: "Fitur 09",
    title: "Outlet Saya — Kelola Outlet",
    subtitle: "Kelola outlet dan produk",
    desc: "Pengguna dapat menambahkan outlet dan mengelola informasi serta produk yang ditampilkan di Market.",
    bullets: [
      "🏪 Tambahkan outlet ke Market",
      "🛍️ Kelola produk & harga langsung",
      "📢 Tampilkan produk outlet di Market",
    ],
    imgSrc: "/screenshots/ss-outlet.jpeg",
    imgAlt: "Outlet Saya Numpak",
    accent: "#dc2626",
  },
];

export default function ScreenshotShowcase() {
  const { t } = useLanguage();
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
        <div className={styles.eyebrow}>{t("Eksplorasi Antarmuka")}</div>
        <h2 className={styles.title}>
          {t("Prototype Interaktif.")} {" "}
          <span className={styles.accent}>{t("Siap diuji.")}</span>
        </h2>
        <p className={styles.desc}>
          {t("Setiap layar di bawah menggambarkan alur prototype live — dari pencarian rute, chat, deal, transaksi, sampai reputasi pengguna.")}
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
            {t(slide.tag)}
          </div>
          <h3 className={styles.slideTitle}>{t(slide.title)}</h3>
          <p className={styles.slideSubtitle}>{t(slide.subtitle)}</p>
          <p className={styles.slideDesc}>{t(slide.desc)}</p>
          <ul className={styles.bullets}>
            {slide.bullets.map((b, i) => (
              <li key={i} className={styles.bullet}>
                {t(b)}
              </li>
            ))}
          </ul>

          <div className={styles.nav}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label={t("Sebelumnya")}
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
              aria-label={t("Berikutnya")}
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
                sizes="(max-width: 900px) 280px, 360px"
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
