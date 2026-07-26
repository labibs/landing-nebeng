"use client";

import { useEffect, useState, useRef } from "react";

import styles from "./page.module.css";
import ScreenshotShowcase from "./ScreenshotShowcase";
import DashboardShowcase from "./DashboardShowcase";
import Image from "next/image";

const HERO_PHRASES = [
  "Nitip Beli Sesuatu.",
  "Nitip Kirim Barang.",
  "Cari Boncengan.",
  "Cari Tukang Lokal.",
  "Tanpa Armada Baru.",
  "Tanpa Gudang.",
  "Tanpa Sortir.",
  "Tanpa Transit.",
  "Tanpa Biaya Balik.",
  "Langsung ke Tujuan.",
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavVisible(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      // Auto-hide after 1.5 seconds of NO scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        if (window.scrollY > 20) {
          setIsNavVisible(false);
        }
      }, 1500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setHeroPhraseIndex((current) => (current + 1) % HERO_PHRASES.length);
    }, 2400);

    return () => clearInterval(phraseTimer);
  }, []);

  const toggleAcc = (e: React.MouseEvent<HTMLDivElement>) => {
    const header = e.currentTarget;
    const isOpen = header.classList.contains(styles.open);
    document.querySelectorAll("." + styles.accHeader).forEach((h) => {
      h.classList.remove(styles.open);
      h.nextElementSibling?.classList.remove(styles.open);
    });
    if (!isOpen) {
      header.classList.add(styles.open);
      header.nextElementSibling?.classList.add(styles.open);
    }
  };

  const toggleFaq = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;
    const isOpen = item.classList.contains(styles.open);
    document
      .querySelectorAll("." + styles.faqItem)
      .forEach((i) => i.classList.remove(styles.open));
    if (!isOpen) item.classList.add(styles.open);
  };

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Preview App", href: "#screenshots" },
    { name: "Fitur Platform", href: "#showcase" },
    { name: "Admin Dashboard", href: "#dashboard" },
    { name: "Cara Kerja", href: "#how" },
    { name: "Model Bisnis", href: "#business" },
    { name: "FAQ & Safety", href: "#faq" },
  ];

  return (
    <>
      <nav
        className={`${styles.nav} ${!isNavVisible && !isMenuOpen ? styles.navHidden : ""}`}
      >
        <div className={styles.navLogo}>
          <Image
            src="/logoo.png"
            alt="Numpak Logo"
            width={160}
            height={46}
            className={styles.logoImg}
            sizes="160px"
            priority
          />
        </div>

        <button
          className={styles.menuTrigger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>MENU</span>
          <div
            className={
              styles.hamburger + (isMenuOpen ? " " + styles.hamburgerOpen : "")
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      <div
        className={
          styles.mobileMenu + (isMenuOpen ? " " + styles.mobileMenuOpen : "")
        }
      >
        {menuItems.map((item, idx) => (
          <a key={idx} href={item.href} onClick={() => setIsMenuOpen(false)}>
            {item.name}
          </a>
        ))}
        <button
          className={styles.navCta}
          style={{ marginTop: "40px" }}
          onClick={() => window.open("https://numpak.vercel.app")}
        >
          Coba Prototype
        </button>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/herook.png"
            alt="Numpak Hero Background"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center bottom" }}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>

        <div data-animate className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div
              className={styles.heroBadge}
              style={{ cursor: "pointer" }}
              onClick={() => window.open("https://sakte.id")}
            >
              <i></i> SAKTE.ID · TEAM ID : P0190
            </div>
            <h2 className={styles.heroH1}>
              Manfaatkan Perjalanan Searah, <br />
              <span className={styles.heroRotator}>
                <span key={heroPhraseIndex} className={styles.heroRotatorText}>
                  {HERO_PHRASES[heroPhraseIndex]}
                </span>
              </span>
            </h2>
            <p className={styles.heroDesc}>
              Numpak adalah platform peer-to-peer untuk memanfaatkan perjalanan
              yang sudah terjadi: bawain barang, beliin sesuatu, cari
              boncengan, sampai kebutuhan lokal lain. Bisa untuk dalam kota,
              antar kota, pulang kerja, naik kereta, hingga perjalanan ke luar
              negeri selama ada orang yang searah.
            </p>
            <div className={styles.heroButtons}>
              <a href="https://numpak.vercel.app" className={styles.btnPrimary}>
                Coba Sekarang →
              </a>
              <a href="#showcase" className={styles.btnSecondary}>
                Pelajari Fitur
              </a>
            </div>
            <div className={styles.heroTrust}>
              <div className={styles.trustBadge}>
                <div className={styles.trustIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>

                <div className={styles.trustText}>
                  Prototype live <strong>numpak.vercel.app</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.trusted}>
        <div className={styles.trustedLabel}>Untuk Semua Perjalanan</div>
        <div className={styles.trustedLogos}>
          <span>Kirim Mendesak</span>
          <span>Orang yang Searah</span>
          <span>Outlet & Layanan Lokal</span>
        </div>
      </div>

      <ScreenshotShowcase />
      <DashboardShowcase />

      <section className={styles.showcase} id="showcase">
        <div data-animate>
          <div className={styles.eyebrow}>Platform Fitur</div>
          <h2 className={styles.sectionTitle}>Problem–Solution Mapping</h2>
          <p className={styles.sectionDesc}>
            Memetakan kebutuhan time-sensitive ke fitur yang sudah ada di
            prototype Numpak, tanpa batas profesi, jarak, atau moda.
          </p>
        </div>
        <div className={styles.bentoGrid}>
          <div className={styles.bento + " " + styles.bentoA} data-animate>
            <div className={styles.bentoIcon + " " + styles.iconTeal}>📍</div>
            <h3>Nitip Bawain</h3>
            <p>
              Menjawab ketiadaan cara terstruktur untuk menemukan orang yang
              sedang searah. Pengguna memasukkan rute, kebutuhan, dan waktu;
              orang yang searah muncul di feed untuk lanjut chat dan deal.
            </p>
          </div>
          <div
            className={styles.bento + " " + styles.bentoB}
            data-animate
            style={{ transitionDelay: "0.1s" }}
          >
            <div className={styles.bentoIcon + " " + styles.iconAmber}>🛡️</div>
            <h3>Trust Architecture</h3>
            <p>
              Kepercayaan dibangun melalui escrow payment, rating dua arah,
              badge Verified Pro berbasis XP, dan rencana polis digital per
              transaksi bersama mitra asuransi berlisensi OJK.
            </p>
          </div>
          <div
            className={styles.bento + " " + styles.bentoC}
            data-animate
            style={{ transitionDelay: "0.15s" }}
          >
            <div className={styles.bentoIcon + " " + styles.iconBlue}>🛒</div>
            <h3>Nitip Beliin</h3>
            <p>
              Titip belanja lintas area dengan Sistem Outlet 3 Model. Membawa
              warung offline yang tidak melek digital sekalipun masuk ke
              ekosistem logistik via kurir atau pelanggan setianya.
            </p>
          </div>
          <div
            className={styles.bento + " " + styles.bentoD}
            data-animate
            style={{ transitionDelay: "0.2s" }}
          >
            <div className={styles.bentoIcon + " " + styles.iconRed}>✨</div>
            <h3>Community-Driven</h3>
            <p>
              Mengaktifkan kapasitas perjalanan yang sudah terjadi. Numpak
              bisa dipakai saat naik kendaraan pribadi, kereta, bus, atau
              travelling; selama searah, perjalanan dapat sekalian bawain
              titipan, beliin oleh-oleh, atau bantu kebutuhan lain.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsInner}>
          <div className={styles.statBlock} data-animate>
            <div className={styles.statLabel}>Deal Uji Coba</div>
            <div className={styles.statNumber}>
              <span className={styles.accentNum}>30</span>+
            </div>
          </div>
          <div
            className={styles.statBlock}
            data-animate
            style={{ transitionDelay: "0.1s" }}
          >
            <div className={styles.statLabel}>Akun Uji Coba</div>
            <div className={styles.statNumber}>
              <span className={styles.accentNum}>9</span>
            </div>
          </div>
          <div
            className={styles.statBlock}
            data-animate
            style={{ transitionDelay: "0.2s" }}
          >
            <div className={styles.statLabel}>Nilai Transaksi</div>
            <div className={styles.statNumber}>
              <span className={styles.accentNum}>110</span>K
            </div>
          </div>
        </div>
      </section>

      <section className={styles.howSection} id="how">
        <div data-animate>
          <div className={styles.eyebrow}>Cara Kerja</div>
          <h2 className={styles.sectionTitle}>Mekanisme Solusi End-to-End</h2>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.step} data-animate>
            <div className={styles.stepNum}>01</div>
            <h3>Input & Matching</h3>
            <p>
              Pengguna memasukkan rute, detail kebutuhan, ukuran atau kapasitas,
              dan waktu. Sistem menampilkan posting perjalanan yang searah
              berdasarkan asal, tujuan, waktu, kapasitas, dan rating.
            </p>
          </div>
          <div
            className={styles.step}
            data-animate
            style={{ transitionDelay: "0.1s" }}
          >
            <div className={styles.stepNum}>02</div>
            <h3>Transaksi Escrow</h3>
            <p>
              Negosiasi detail via chat in-app. Midtrans sudah berada di
              sandbox; saat produksi, dana ditahan escrow dan asuransi
              transaksi dapat diaktifkan saat checkout.
            </p>
          </div>
          <div
            className={styles.step}
            data-animate
            style={{ transitionDelay: "0.2s" }}
          >
            <div className={styles.stepNum}>03</div>
            <h3>Output & Reputasi</h3>
            <p>
              Setelah barang diterima, status deal selesai, dana dilepas ke
              orang yang membantu, dan rating dua arah membangun reputasi
              komunitas.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.bizSection} id="business">
        <div className={styles.bizInner}>
          <div data-animate>
            <div className={styles.eyebrow}>Model Bisnis</div>
            <h2 className={styles.sectionTitle}>
              Revenue Streams & Sustainability
            </h2>
            <div className={styles.accordion}>
              <div className={styles.accItem}>
                <div className={styles.accHeader} onClick={toggleAcc}>
                  <span>Service Fee per Transaksi</span>
                  <span className={styles.collapseIcon}>+</span>
                </div>
                <div className={styles.accBody}>
                  Komisi 8–12% dari setiap transaksi selesai. Menghasilkan
                  estimasi Rp 3.200–4.800 pada rata-rata transaksi Rp 40.000.
                  Platform hanya mendapat fee saat transaksi berhasil.
                </div>
              </div>
              <div className={styles.accItem}>
                <div className={styles.accHeader} onClick={toggleAcc}>
                  <span>Premium Membership</span>
                  <span className={styles.collapseIcon}>+</span>
                </div>
                <div className={styles.accBody}>
                  {" "}
                  Rp 29.000/bulan untuk limit posting rute lebih banyak dan
                  prioritas tampil di feed. Target 10% MAU berlangganan sebagai
                  recurring revenue.
                </div>
              </div>
              <div className={styles.accItem}>
                <div className={styles.accHeader} onClick={toggleAcc}>
                  <span>Outlet Ads</span>
                  <span className={styles.collapseIcon}>+</span>
                </div>
                <div className={styles.accBody}>
                  Merchant dapat mempromosikan toko di feed seharga Rp
                  50.000–200.000 per promo per minggu untuk menjangkau lebih
                  banyak orang yang searah dan pelanggan.
                </div>
              </div>
            </div>
          </div>
          <div data-animate className={styles.bizRight}>
            <div className={styles.bizCard}>
              <div
                className={styles.bizIcon}
                style={{ background: "rgba(13, 148, 136, 0.1)" }}
              >
                💸
              </div>
              <div>
                <div className={styles.bizCardTitle}>Service Fee</div>
                <div className={styles.bizCardSub}>
                  Target 60% Total Revenue
                </div>
              </div>
              <div className={styles.bizPct}>8-12%</div>
            </div>
            <div className={styles.bizCard}>
              <div
                className={styles.bizIcon}
                style={{ background: "rgba(245, 158, 11, 0.1)" }}
              >
                🏢
              </div>
              <div>
                <div className={styles.bizCardTitle}>B2B Enterprise</div>
                <div className={styles.bizCardSub}>Post-MVP UMKM Solution</div>
              </div>
              <div className={styles.bizPct}>Custom</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.faqInner}>
          <div data-animate>
            <div className={styles.eyebrow}>FAQ</div>
            <h2 className={styles.sectionTitle}>
              Pertanyaan Populer & Keamanan
            </h2>
          </div>
          <div className={styles.faqList} data-animate>
            <div className={styles.faqItem} onClick={toggleFaq}>
              <div className={styles.faqQ}>
                <span>
                  <span className={styles.faqNum}>01.</span> Kapan dana
                  dicairkan ke orang yang membantu?
                </span>
                <span className={styles.collapseIcon}>+</span>
              </div>
              <div className={styles.faqA}>
                Pada versi produksi, dana escrow dicairkan ke orang yang
                membantu setelah penerima mengonfirmasi kebutuhan selesai.
                Integrasi payment saat ini sudah disiapkan di sandbox untuk
                pilot berikutnya.
              </div>
            </div>
            <div className={styles.faqItem} onClick={toggleFaq}>
              <div className={styles.faqQ}>
                <span>
                  <span className={styles.faqNum}>02.</span> Bagaimana
                  perlindungan data pribadi?
                </span>
                <span className={styles.collapseIcon}>+</span>
              </div>
              <div className={styles.faqA}>
                Prototype menggunakan Clerk untuk autentikasi, two-step
                verification, device tracking, dan Supabase Row Level Security.
                Verifikasi KTP otomatis dan audit keamanan disiapkan untuk fase
                produksi.
              </div>
            </div>
            <div className={styles.faqItem} onClick={toggleFaq}>
              <div className={styles.faqQ}>
                <span>
                  <span className={styles.faqNum}>03.</span> Apa itu Sistem
                  Outlet 3 Model?
                </span>
                <span className={styles.collapseIcon}>+</span>
              </div>
              <div className={styles.faqA}>
                Inovasi inklusi digital dimana warung bisa didaftarkan oleh
                Kurir, Pemilik, atau Customer agar masuk ke ekosistem logistik
                digital Numpak tanpa harus memiliki perangkat digital sendiri.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerBrand}>
              <Image
                src="/logoo.png"
                alt="numpak Logo"
                width={190}
                height={55}
                className={styles.footerLogoImg}
                sizes="190px"
              />
            </div>
            <p className={styles.footerDesc}>
              Platform peer-to-peer untuk kirim, beli, bonceng, dan bantu
              kebutuhan searah melalui perjalanan yang sudah terjadi. Prototype
              fungsional dan uji coba lapangan P0190 Bank Indonesia & YPPI
              Hackathon 2026.
            </p>
          </div>
          <div className={styles.footerCol}>
            <h4>Platform</h4>
            <a href="#showcase">Fitur Utama</a>
            <a href="#dashboard">Admin Panel</a>
            <a href="#how">Alur Kerja</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Resources</h4>
            <a href="#business">Model Bisnis</a>
            <a href="#faq">Pusat Bantuan</a>
            <a href="https://numpak.vercel.app">Live Demo</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Corporate</h4>
            <a href="https://sakte.id" target="_blank">
              SAKTE.ID
            </a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div
          className={styles.footerBottom}
          onClick={() => window.open("https://sakte.id")}
        >
          <p className={styles.footerCopy}>
            © 2026 sakte.id · PT. Satya Karya Technosolution
          </p>
          <div className={styles.footerBadge}>numpak.vercel.app</div>
        </div>
      </footer>
    </>
  );
}
