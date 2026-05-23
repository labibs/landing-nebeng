"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./DashboardShowcase.module.css";
import Image from "next/image";

const slides = [
  {
    tag: "Admin 01",
    title: "Dashboard Utama",
    subtitle: "Pantau performa platform secara real-time",
    desc: "Ringkasan data penting mulai dari total pengguna, postingan aktif, hingga analisis pendapatan dalam satu tampilan dashboard yang intuitif.",
    bullets: [
      "📈 Grafik analisis pendapatan otomatis",
      "👥 Monitor jumlah pengguna & deal aktif",
      "🔔 Akses cepat ke notifikasi & bantuan chat",
    ],
    imgSrc: "/screenshots/ss-dashboard-1.png",
    imgAlt: "Dashboard Admin Numpak",
    accent: "#0d9488",
  },
  {
    tag: "Admin 02",
    title: "Manajemen Pengguna",
    subtitle: "Kelola basis data pengguna dengan detail",
    desc: "Sistem tabel yang kuat untuk memantau data pengguna, peran (User/Admin), hingga status verifikasi Clerk ID secara transparan.",
    bullets: [
      "🔍 Pencarian & filter pengguna cepat",
      "🛠️ Ubah peran & kelola akses akun",
      "📋 Log aktivitas pengguna terlacak",
    ],
    imgSrc: "/screenshots/ss-dashboard-2.png",
    imgAlt: "Manajemen Pengguna Admin",
    accent: "#3b82f6",
  },
  {
    tag: "Admin 03",
    title: "Toko & Produk",
    subtitle: "Eksplorasi ekosistem outlet lokal",
    desc: "Kelola daftar toko dan produk yang terdaftar di platform. Pantau siapa pemiliknya, status outlet, hingga detail item yang dijual.",
    bullets: [
      "🏪 Kontrol penuh atas listing outlet",
      "🍱 Pantau stok & detail produk UMKM",
      "✅ Verifikasi status outlet (Kurir/Pemilik)",
    ],
    imgSrc: "/screenshots/ss-dashboard-3.png",
    imgAlt: "Manajemen Toko & Produk",
    accent: "#f59e0b",
  },
  {
    tag: "Admin 04",
    title: "Riwayat Aktivitas & Transaksi",
    subtitle: "Rekam jejak deal & pengiriman",
    desc: "Pantau setiap transaksi dan kesepakatan yang terjadi. Lengkap dengan status pembayaran, rute perjalanan, hingga ekspor data ke PDF.",
    bullets: [
      "💳 Monitor status pembayaran & escrow",
      "📍 Lacak rute deal (Asal → Tujuan)",
      "📄 Ekspor riwayat ke PDF untuk laporan",
    ],
    imgSrc: "/screenshots/ss-dashboard-4.png",
    imgAlt: "Riwayat Transaksi Admin",
    accent: "#8b5cf6",
  },
  {
    tag: "Admin 05",
    title: "Manajemen Postingan",
    subtitle: "Kontrol feed rute & perjalanan",
    desc: "Pantau semua postingan perjalanan yang aktif. Admin dapat melihat detail rute, tipe layanan, hingga menghapus postingan jika melanggar ketentuan.",
    bullets: [
      "📍 Detail rute keberangkatan & tujuan",
      "🚦 Filter tipe: Perjalanan / Cari Boncengan",
      "🗑️ Moderasi postingan secara langsung",
    ],
    imgSrc: "/screenshots/ss-dashboard-5.png",
    imgAlt: "Manajemen Postingan Admin",
    accent: "#ef4444",
  },
];

export default function DashboardShowcase() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

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
    }, 6000);
    return () => clearInterval(t);
  }, [active, go]);

  const slide = slides[active];

  return (
    <section className={styles.section} id="dashboard">
      <div className={styles.header}>
        <div className={styles.eyebrow}>Admin Dashboard</div>
        <h2 className={styles.title}>
          Kendali Penuh di <span className={styles.accent}>Ujung Jari.</span>
        </h2>
        <p className={styles.desc}>
          Sistem manajemen terpusat untuk memantau metrik platform, keamanan
          transaksi, dan pertumbuhan ekosistem Numpak secara efisien.
        </p>
      </div>

      <div className={styles.carousel}>
        <div className={styles.laptopWrap}>
          <div className={styles.blob1} style={{ background: slide.accent }} />
          <div className={styles.blob2} style={{ background: slide.accent }} />

          <div className={styles.laptop}>
            <div className={styles.laptopScreen}>
              <div className={styles.laptopCamera} />
              <div
                className={
                  styles.screenContent +
                  " " +
                  (animating
                    ? direction === "next"
                      ? styles.screenExitLeft
                      : styles.screenExitRight
                    : styles.screenEnter)
                }
              >
                <Image
                  src={slide.imgSrc}
                  alt={slide.imgAlt}
                  fill
                  style={{ objectFit: "contain", background: "#f8fafc" }}
                  priority
                />
              </div>
            </div>
            <div className={styles.laptopBase}>
              <div className={styles.laptopNotch} />
            </div>
          </div>
        </div>

        <div
          className={
            styles.textPane +
            " " +
            (animating
              ? direction === "next"
                ? styles.exitLeft
                : styles.exitRight
              : styles.enter)
          }
          style={{ "--accent": slide.accent } as any}
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
            <button className={styles.navBtn} onClick={prev}>
              ←
            </button>
            <div className={styles.dots}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={
                    styles.dot + (i === active ? " " + styles.dotActive : "")
                  }
                  style={i === active ? { background: slide.accent } : {}}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button className={styles.navBtn} onClick={next}>
              →
            </button>
            <span className={styles.counter}>
              {String(active + 1).padStart(2, "0") +
                " / " +
                String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
