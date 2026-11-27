"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./DashboardShowcase.module.css";
import Image from "next/image";
import { useLanguage } from "../lib/LanguageContext";

const slides = [
  {
    tag: "Admin 01",
    title: "Dashboard Utama",
    subtitle: "Ringkasan aktivitas aplikasi",
    desc: "Dashboard admin menampilkan ringkasan pengguna, postingan, pendapatan, deal, dan transaksi berdasarkan data aplikasi.",
    bullets: [
      "📈 Ringkasan metrik aplikasi",
      "👥 Lihat pengguna, postingan, dan deal",
      "🧾 Pantau transaksi dan pendapatan",
    ],
    imgSrc: "/screenshots/ssn-dashboard-1.png",
    imgAlt: "Dashboard Admin Numpak",
    accent: "#0d9488",
  },
  {
    tag: "Admin 02",
    title: "Manajemen Pengguna",
    subtitle: "Kelola basis data pengguna dengan detail",
    desc: "Halaman admin menampilkan daftar pengguna dan menyediakan pencarian serta tindakan pengelolaan akun.",
    bullets: [
      "🔍 Pencarian & filter pengguna cepat",
      "🛠️ Pilih tindakan pengelolaan pengguna",
      "📋 Lihat informasi akun",
    ],
    imgSrc: "/screenshots/ssn-dashboard-2.png",
    imgAlt: "Manajemen Pengguna Admin",
    accent: "#3b82f6",
  },
  {
    tag: "Admin 03",
    title: "Toko & Produk",
    subtitle: "Eksplorasi ekosistem outlet lokal",
    desc: "Halaman admin menyediakan daftar outlet dan produk yang terdaftar di platform.",
    bullets: [
      "🏪 Kontrol penuh atas listing outlet",
      "🍱 Lihat informasi produk",
      "✅ Kelola data outlet",
    ],
    imgSrc: "/screenshots/ssn-dashboard-3.png",
    imgAlt: "Manajemen Toko & Produk",
    accent: "#f59e0b",
  },
  {
    tag: "Admin 04",
    title: "Riwayat Aktivitas & Transaksi",
    subtitle: "Lihat transaksi dan deal",
    desc: "Halaman admin menampilkan daftar transaksi dan deal untuk membantu memantau aktivitas yang berjalan.",
    bullets: [
      "💳 Lihat detail transaksi",
      "📍 Periksa status dan rute yang tersedia",
      "🤝 Tinjau daftar deal",
    ],
    imgSrc: "/screenshots/ssn-dashboard-4.png",
    imgAlt: "Riwayat Transaksi Admin",
    accent: "#8b5cf6",
  },
  {
    tag: "Admin 05",
    title: "Manajemen Postingan",
    subtitle: "Kontrol feed rute & perjalanan",
    desc: "Halaman admin menyediakan daftar postingan beserta detail yang dapat ditinjau.",
    bullets: [
      "📍 Detail rute keberangkatan & tujuan",
      "🚦 Filter tipe: Perjalanan / Cari Boncengan",
      "🗑️ Moderasi postingan secara langsung",
    ],
    imgSrc: "/screenshots/ssn-dashboard-5.png",
    imgAlt: "Manajemen Postingan Admin",
    accent: "#ef4444",
  },
];

function ChromeIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <circle cx="12" cy="12" r="4" fill="#4285F4" />
      <path d="M12 8h8.66A10 10 0 0 0 12 2v6z" fill="#EA4335" />
      <path
        d="M4.54 17 .87 10.5A10 10 0 0 0 12 22l3-5.2A4 4 0 0 1 8 12H4.54z"
        fill="#34A853"
      />
      <path
        d="M20.66 10.5H12v3.5a4 4 0 0 1-3 3.8l-3 5.2A10 10 0 0 0 20.66 10.5z"
        fill="#FBBC04"
      />
    </svg>
  );
}

function AppleMonitorMockup({
  slide,
  animating,
  direction,
}: {
  slide: (typeof slides)[0];
  animating: boolean;
  direction: string;
}) {
  const screenAnimClass = animating
    ? direction === "next"
      ? styles.screenExitLeft
      : styles.screenExitRight
    : styles.screenEnter;

  return (
    <div className={styles.monitorWrap}>
      {/* ── MONITOR BEZEL ── */}
      <div className={styles.monitorOuter}>
        <div className={styles.monitorInner}>
          {/* camera */}
          <div className={styles.monitorCamRow}>
            <div className={styles.monitorCam} />
          </div>

          {/* display */}
          <div className={styles.monitorDisplay}>
            {/* macOS menubar */}
            <div className={styles.macMenubar}>
              <div className={styles.trafficLights}>
                <span className={`${styles.tl} ${styles.tlRed}`} />
                <span className={`${styles.tl} ${styles.tlYellow}`} />
                <span className={`${styles.tl} ${styles.tlGreen}`} />
              </div>
              <span className={styles.menubarApple}>&#63743;</span>
              <span className={styles.menubarAppName}>Google Chrome</span>
              <div className={styles.menubarItems}>
                {["File", "Edit", "View", "History", "Bookmarks", "Window"].map(
                  (m) => (
                    <span key={m} className={styles.menubarItem}>
                      {m}
                    </span>
                  ),
                )}
              </div>
              <div className={styles.menubarRight}>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="2"
                >
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <circle cx="12" cy="20" r="1" fill="rgba(255,255,255,0.55)" />
                </svg>
                <svg width="18" height="11" viewBox="0 0 28 14" fill="none">
                  <rect
                    x="1"
                    y="2"
                    width="20"
                    height="10"
                    rx="2"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M22 6v4"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <rect
                    x="3"
                    y="4"
                    width="13"
                    height="6"
                    rx="1"
                    fill="rgba(255,255,255,0.45)"
                    stroke="none"
                  />
                </svg>
                <span className={styles.menubarTime}>9:41 AM</span>
              </div>
            </div>

            {/* Chrome tab bar */}
            <div className={styles.chromeTabBar}>
              <div
                className={styles.chromeTab}
                style={{ borderBottom: `2px solid ${slide.accent}` }}
              >
                <ChromeIcon size={11} />
                <span className={styles.chromeTabTitle}>
                  numpak Admin — Dashboard
                </span>
                <span className={styles.chromeTabClose}>✕</span>
              </div>
              <div className={styles.chromeTabNew}>+</div>
            </div>

            {/* Chrome omnibar */}
            {/*<div className={styles.chromeOmnibar}>
              <div className={styles.chromeNavBtns}>
                <button className={styles.chromeNavBtn} aria-label="back">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2.5"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button className={styles.chromeNavBtn} aria-label="forward">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
                <button className={styles.chromeNavBtn} aria-label="reload">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2.5"
                  >
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                </button>
              </div>

              <div className={styles.chromeAddressBar}>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2.5"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className={styles.chromeUrl}>
                  numpak-admin.vercel.app
                </span>
              </div>

              <div className={styles.chromeOmniRight}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.38)"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <div className={styles.chromeMoreBtn}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>*/}

            {/* screenshot */}
            <div className={styles.screenContent}>
              <div className={`${styles.screenImage} ${screenAnimClass}`}>
                <Image
                  src={slide.imgSrc}
                  alt={slide.imgAlt}
                  fill
                  sizes="(max-width: 1000px) 92vw, 560px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    background: "#f8fafc",
                  }}
                />
              </div>
            </div>

            {/* Chrome status bar */}
            <div className={styles.chromeFooter}>
              {/*<span className={styles.chromeFooterStatus}>
                numpak-admin.vercel.app
              </span>
              <div className={styles.chromeFooterRight}>
                <span className={styles.chromeZoom}>100%</span>
              </div>*/}
            </div>
          </div>
        </div>
      </div>

      {/* ── STAND NECK ── */}
      <div className={styles.standNeck} />

      {/* ── STAND BASE ── */}
      <div className={styles.standBase} />
    </div>
  );
}

export default function DashboardShowcase() {
  const { t } = useLanguage();
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
        <div className={styles.eyebrow}>{t("Dashboard Admin")}</div>
        <h2 className={styles.title}>
          {t("Kendali Penuh di")} <span className={styles.accent}>{t("Ujung Jari.")}</span>
        </h2>
        <p className={styles.desc}>
          {t("Dashboard admin Numpak menyediakan ringkasan dan halaman untuk meninjau pengguna, outlet, produk, postingan, transaksi, dan deal.")}
        </p>
      </div>

      <div className={styles.carousel}>
        {/* ── LEFT: Apple Monitor mockup ── */}
        <div className={styles.laptopWrap}>
          <div className={styles.blob1} style={{ background: slide.accent }} />
          <div className={styles.blob2} style={{ background: slide.accent }} />
          <AppleMonitorMockup
            slide={slide}
            animating={animating}
            direction={direction}
          />
        </div>

        {/* ── RIGHT: text pane ── */}
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
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
