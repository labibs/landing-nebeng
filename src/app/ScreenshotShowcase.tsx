"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./ScreenshotShowcase.module.css";
import Image from "next/image";

const slides = [
  {
    tag: "Fitur 01",
    title: "Feed Perjalanan Real-Time",
    subtitle: "Scroll rute aktif seperti TikTok",
    desc: "Traveler memposting perjalanan aktif mereka ke feed. Pengirim tinggal scroll, temukan kurir yang searah, dan langsung deal — semuanya real-time tanpa perlu cari manual ke sana-sini.",
    bullets: [
      "🟢 Rute aktif tampil langsung di feed",
      "⚡ Rata-rata deal dalam 3 menit",
      "📍 Filter by kota asal & tujuan",
    ],
    imgSrc: "/screenshots/ss-fedok.png",
    imgAlt: "Feed Dalam Perjalanan Numpak",
    accent: "#0d9488",
  },
  {
    tag: "Fitur 02",
    title: "Detail Rute & Info Traveler",
    subtitle: "Transparan dari asal sampai tujuan",
    desc: "Setiap posting perjalanan menampilkan detail lengkap: nama traveler, tanggal & jam berangkat, asal keberangkatan, hingga ongkos titipan. Deal bisa langsung diklik dari halaman ini.",
    bullets: [
      "🗺️ Asal & tujuan rute jelas tertera",
      "💸 Ongkos transparan sejak awal — Rp 20.000",
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
    subtitle: "Berbagai outlet aktif, belanja titip ke kurir",
    desc: "Halaman Market menampilkan outlet pilihan dengan kategori Makanan, Obat, Sembako, dan lainnya. Berbagai merchant populer sudah terdaftar lengkap dengan promo ongkir dan label 'Bisa nitip'.",
    bullets: [
      "🏪 Berbagai outlet aktif terdaftar",
      "🍱 Filter kategori: Makanan, Obat, Sembako",
      "📢 Promo ongkir & diskon menarik",
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
      "💬 Chat langsung antar traveler & pengirim",
      "🔔 Notifikasi deal offer real-time",
      "🔒 Riwayat chat tersimpan aman",
    ],
    imgSrc: "/screenshots/ss-chat.jpeg",
    imgAlt: "Chat In-App Numpak",
    accent: "#3b82f6",
  },
  {
    tag: "Fitur 05",
    title: "Transaksi Terlacak & Terlindungi",
    subtitle: "Escrow payment, dana aman",
    desc: "Contoh transaksi dengan rute populer: Area A→Area B, Kota X→Kota Y, dan lebih banyak lagi. Setiap transaksi punya status jelas — Menunggu Bayar, Ready to Ship, atau Dibatalkan.",
    bullets: [
      "💳 Escrow: dana cair setelah konfirmasi",
      "📦 Label OWNER & CARRIER per transaksi",
      "📊 Riwayat lengkap dengan ekspor PDF",
    ],
    imgSrc: "/screenshots/ss-transaction.jpeg",
    imgAlt: "Halaman Transaksi Numpak",
    accent: "#f59e0b",
  },
  {
    tag: "Fitur 06",
    title: "Fitur dalam Satu Platform",
    subtitle: "Ekosistem peer-to-peer terlengkap",
    desc: "Dari Nitip Bawain, Nitip Beliin, Nyari Boncengan, sampai Jualan Keliling — semua tersedia di satu tampilan. Platform yang adaptif untuk berbagai kebutuhan mobilitas komunitas.",
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
    desc: "Mau pesan makanan favorit dari merchant populer di kotamu tapi kamu sedang sibuk? Tambahkan ke Keranjang Nitip, temukan kurir yang lewat, dan barang sampai ke tanganmu.",
    bullets: [
      "🛒 Keranjang nitip multi-outlet",
      "🍱 Nitip ke Kurir terdekat",
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
    desc: "Sistem reputasi Numpak memastikan setiap profil memiliki kredibilitas yang terverifikasi. XP, jumlah postingan, dan galeri aktivitas membangun kepercayaan komunitas secara organik.",
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
    desc: "Inovasi unik Numpak: outlet bisa didaftarkan oleh Kurir, Pemilik, atau Customer setia. Berbagai outlet telah bergabung — warung konvensional pun kini bisa terhubung ke ekosistem digital.",
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
          Setiap layar di bawah adalah gambaran alur kerja aplikasi — dari
          pencarian rute hingga penyelesaian transaksi.
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
