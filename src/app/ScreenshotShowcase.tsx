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
    // Slot for actual screenshot — replace src with your image path/import
    imgSrc: "/screenshots/ss-feeed.png",
    imgAlt: "Feed Dalam Perjalanan Nebeng",
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
    imgSrc: "/screenshots/ss-rute.png", // ✅ gambar nyata
    imgAlt: "Detail Rute Perjalanan Nebeng",
    accent: "#3b82f6",
    realImg: true,
  },
  {
    tag: "Fitur 03",
    title: "Marketplace Outlet — Nitip Beliin",
    subtitle: "8 outlet aktif, belanja titip ke kurir",
    desc: "Halaman Market menampilkan outlet pilihan dengan kategori Makanan, Obat, Sembako, dan lainnya. Takumi-ya Express Sushi sudah terdaftar lengkap dengan promo ongkir dan label 'Bisa nitip'.",
    bullets: [
      "🏪 8 outlet aktif terdaftar",
      "🍱 Filter kategori: Makanan, Obat, Sembako",
      "📢 Promo ongkir & diskon 10% live",
    ],
    imgSrc: "/screenshots/ss-market.jpeg", // ✅ gambar nyata
    imgAlt: "Marketplace Outlet Nebeng",
    accent: "#f59e0b",
    realImg: true,
  },
  {
    tag: "Fitur 04",
    title: "Chat In-App & Konfirmasi Deal",
    subtitle: "Nego tanpa keluar platform",
    desc: "7+ pengguna aktif sudah berinteraksi lewat chat in-app Nebeng. Negosiasi harga, koordinasi titik jemput, hingga konfirmasi barang — semua dalam satu tempat yang aman.",
    bullets: [
      "💬 Chat langsung antar traveler & pengirim",
      "🔔 Notifikasi deal offer real-time",
      "🔒 Riwayat chat tersimpan aman",
    ],
    imgSrc: "/screenshots/ss-chat.jpeg",
    imgAlt: "Chat In-App Nebeng",
    accent: "#3b82f6",
  },
  {
    tag: "Fitur 05",
    title: "Transaksi Terlacak & Terlindungi",
    subtitle: "Escrow payment, dana aman",
    desc: "3 transaksi selesai dengan rute nyata: Cipari→Purwokerto, Purwokerto→Kawunganten, dan lebih banyak lagi. Setiap transaksi punya status jelas — Menunggu Bayar, Ready to Ship, atau Dibatalkan.",
    bullets: [
      "💳 Escrow: dana cair setelah konfirmasi",
      "📦 Label OWNER & CARRIER per transaksi",
      "📊 Riwayat lengkap dengan ekspor PDF",
    ],
    imgSrc: "/screenshots/ss-transaction.jpeg",
    imgAlt: "Halaman Transaksi Nebeng",
    accent: "#f59e0b",
  },
  {
    tag: "Fitur 06",
    title: "8 Fitur dalam Satu Platform",
    subtitle: "Ekosistem peer-to-peer terlengkap",
    desc: "Dari Nitip Bawain, Nitip Beliin, Nyari Boncengan, sampai Jualan Keliling — semua tersedia di satu tampilan. Platform yang adaptif untuk berbagai kebutuhan mobilitas komunitas.",
    bullets: [
      "🧳 Nitip Bawain & Nitip Beliin",
      "🛵 Nyari Boncengan & Nyari Tukang",
      "🚛 Dalam Perjalanan & Jualan Keliling",
    ],
    imgSrc: "/screenshots/ss-features.jpeg",
    imgAlt: "Menu 8 Fitur Nebeng",
    accent: "#8b5cf6",
  },
  {
    tag: "Fitur 07",
    title: "Keranjang Nitip — Titip Belanja Lintas Kota",
    subtitle: "Belanja dari toko manapun via kurir",
    desc: "Mau pesan Beef Teriyaki dari Takumi-ya Express Sushi di Purwokerto tapi kamu di luar kota? Tambahkan ke Keranjang Nitip, temukan kurir yang lewat, dan barang sampai ke tanganmu.",
    bullets: [
      "🛒 Keranjang nitip multi-outlet",
      "🍱 Nitip ke Kurir terdekat",
      "💰 Estimasi total transparan",
    ],
    imgSrc: "/screenshots/ss-deal.jpeg",
    imgAlt: "Keranjang Nitip Nebeng",
    accent: "#0d9488",
  },
  {
    tag: "Fitur 08",
    title: "Profil Verified Pro & Sistem Reputasi",
    subtitle: "Trust by design, bukan sekadar janji",
    desc: "Labib S. — dengan 1.2k review dan badge Verified Pro — adalah bukti nyata sistem reputasi Nebeng berjalan. XP, post count, dan galeri aktivitas membangun kepercayaan komunitas organik.",
    bullets: [
      "⭐ Badge Verified Pro berbasis XP",
      "📈 1.2k review aktif terlacak",
      "🖼️ Galeri aktivitas transparan",
    ],
    imgSrc: "/screenshots/ss-profile.jpeg",
    imgAlt: "Profil Verified Pro Nebeng",
    accent: "#f59e0b",
  },
  {
    tag: "Fitur 09",
    title: "Outlet Saya — Sistem Outlet 3 Model",
    subtitle: "Warung offline masuk ekosistem digital",
    desc: "Inovasi unik Nebeng: outlet bisa didaftarkan oleh Kurir, Pemilik, atau Customer setia. 8 outlet sudah aktif — warung yang tidak melek digital pun bisa ikut ekosistem.",
    bullets: [
      "🏪 3 model: Kurir / Pemilik / Customer",
      "🛍️ Kelola produk & harga langsung",
      "📢 Slot promo Outlet Ads tersedia",
    ],
    imgSrc: "/screenshots/ss-outlet.jpeg",
    imgAlt: "Outlet Saya Nebeng",
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

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      go(active === slides.length - 1 ? 0 : active + 1);
    }, 5000);
    return () => clearInterval(t);
  }, [active, go]);

  const slide = slides[active];

  return (
    <section className={styles.section} id="screenshots">
      {/* Section header */}
      <div className={styles.header}>
        <div className={styles.eyebrow}>Tangkapan Layar Nyata</div>
        <h2 className={styles.title}>
          Bukan mockup. <span className={styles.accent}>Platform live.</span>
        </h2>
        <p className={styles.desc}>
          Setiap layar di bawah adalah hasil tangkapan dari nebeng.vercel.app —
          pengguna nyata, transaksi nyata, data nyata.
        </p>
      </div>

      {/* Main carousel */}
      <div className={styles.carousel}>
        {/* LEFT — text */}
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

          {/* Nav */}
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

        {/* RIGHT — phone mockup */}
        <div className={styles.phoneWrap}>
          {/* Decorative blobs */}
          <div className={styles.blob1} style={{ background: slide.accent }} />
          <div className={styles.blob2} style={{ background: slide.accent }} />

          <div className={styles.phone}>
            {/* Phone chrome */}
            <div className={styles.phoneChromeTop}>
              <div className={styles.phoneCamera} />
            </div>
            <div
              className={`${styles.phoneScreen} ${animating ? (direction === "next" ? styles.screenExitLeft : styles.screenExitRight) : styles.screenEnter}`}
            >
              {/*
                Replace the <div> below with an actual <Image> tag from next/image
                once you wire up the real screenshot paths, e.g.:
                <Image src={slide.imgSrc} alt={slide.imgAlt} fill style={{ objectFit: "cover" }} />

                For now we show a labelled placeholder that visually maps to each slide.
              */}
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
