"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Handshake,
  Languages,
  Package,
  ReceiptText,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

import styles from "./page.module.css";
import ScreenshotShowcase from "./ScreenshotShowcase";
import DashboardShowcase from "./DashboardShowcase";
import Image from "next/image";
import { useLanguage } from "../lib/LanguageContext";

const HERO_PHRASES = [
  "Nitip Beliin.",
  "Nitip Bawain.",
  "Cari Boncengan.",
  "Cari Tukang Lokal.",
  "Dalam Perjalanan.",
  "Jualan Keliling.",
  "Kelola Outlet.",
  "Buat Postingan dengan AI.",
];

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const appCtaLabel = t("Coba Aplikasi");
  const [platformSummary, setPlatformSummary] = useState<{
    users: number;
    posts: number;
    transactionsCount: number;
    revenue: number;
    dealsCount: number;
    outletsCount: number;
    productsCount: number;
    updatedAt: string;
  } | null>(null);
  const [summaryStatus, setSummaryStatus] = useState<"loading" | "ready" | "error">("loading");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const [typedAppLabel, setTypedAppLabel] = useState("");
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
    let cancelled = false;
    const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://labibs.sakte.id/api").replace(/\/$/, "");

    fetch(`${apiBaseUrl}/platform/summary`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Summary request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setPlatformSummary(data);
        setSummaryStatus("ready");
      })
      .catch((error) => {
        console.error("Could not load public platform summary:", error);
        if (!cancelled) setSummaryStatus("error");
      });

    return () => {
      cancelled = true;
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

  useEffect(() => {
    let characterIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeLabel = () => {
      characterIndex += 1;
      setTypedAppLabel(appCtaLabel.slice(0, characterIndex));

      if (characterIndex < appCtaLabel.length) {
        timeout = setTimeout(typeLabel, 85);
        return;
      }

      timeout = setTimeout(() => {
        characterIndex = 0;
        setTypedAppLabel("");
        timeout = setTimeout(typeLabel, 350);
      }, 2600);
    };

    timeout = setTimeout(typeLabel, 500);
    return () => clearTimeout(timeout);
  }, [appCtaLabel]);

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
    { name: "Beranda", href: "#" },
    { name: "Pratinjau Aplikasi", href: "#screenshots" },
    { name: "Fitur Platform", href: "#showcase" },
    { name: "Dashboard Admin", href: "#dashboard" },
    { name: "Asisten di Aplikasi", href: "#ai-assistants" },
    { name: "Cara Kerja", href: "#how" },
    { name: "Fitur yang Tersedia", href: "#business" },
    { name: "Bantuan", href: "#faq" },
  ];
  const numberLocale = language === "en" ? "en-US" : "id-ID";
  const formatCount = (value: number | undefined) =>
    new Intl.NumberFormat(numberLocale).format(value ?? 0);
  const formatCurrency = (value: number | undefined) =>
    new Intl.NumberFormat(numberLocale, {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value ?? 0);
  const summaryChartValues = platformSummary
    ? [platformSummary.users, platformSummary.posts, platformSummary.transactionsCount, platformSummary.dealsCount, platformSummary.outletsCount, platformSummary.productsCount]
    : [];
  const chartMax = Math.max(1, ...summaryChartValues);
  const summaryUpdatedLabel = platformSummary?.updatedAt
    ? new Date(platformSummary.updatedAt).toLocaleTimeString(numberLocale, { hour: "2-digit", minute: "2-digit" })
    : "";

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
          type="button"
          className={styles.languageToggle}
          onClick={() => setLanguage(language === "id" ? "en" : "id")}
          aria-label={language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          title={language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
        >
          <Languages size={16} aria-hidden="true" />
          <span>{language === "id" ? "ID" : "EN"}</span>
        </button>

        <button
          className={styles.menuTrigger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>{t("MENU")}</span>
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
            {t(item.name)}
          </a>
        ))}
        <button
          className={styles.navCta}
          style={{ marginTop: "40px" }}
          onClick={() => window.open("https://numpak.sakte.id/", "_blank")}
        >
          {t("Coba Prototype")}
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
            <h2 className={styles.heroH1}>
              {t("Manfaatkan Perjalanan Searah,")} <br />
              <span className={styles.heroRotator}>
                <span key={heroPhraseIndex} className={styles.heroRotatorText}>
                  {t(HERO_PHRASES[heroPhraseIndex])}
                </span>
              </span>
            </h2>
            <p className={styles.heroDesc}>
              {t("Numpak adalah platform peer-to-peer untuk memanfaatkan perjalanan yang sudah terjadi: bawain barang, beliin sesuatu, cari boncengan, sampai kebutuhan lokal lain. Bisa untuk dalam kota, antar kota, pulang kerja, naik kereta, hingga perjalanan ke luar negeri selama ada orang yang searah.")}
            </p>
            <motion.div
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
            >
              <motion.a
                href="https://numpak.sakte.id/"
                className={styles.btnPrimary}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("Coba Sekarang →")}
              </motion.a>
              <motion.a
                href="#showcase"
                className={styles.btnSecondary}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("Pelajari Fitur")}
              </motion.a>
            </motion.div>
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
                  {t("Aplikasi Numpak")} <strong>numpak.sakte.id</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.trusted}>
        <div className={styles.trustedLabel}>{t("Untuk Semua Perjalanan")}</div>
        <div className={styles.trustedLogos}>
          <span>{t("Kirim Mendesak")}</span>
          <span>{t("Orang yang Searah")}</span>
          <span>{t("Outlet & Layanan Lokal")}</span>
        </div>
      </div>

      <ScreenshotShowcase />
      <DashboardShowcase />

      <section className={styles.showcase} id="showcase">
        <div data-animate>
          <div className={styles.eyebrow}>{t("Platform Fitur")}</div>
          <h2 className={styles.sectionTitle}>{t("Yang Bisa Dilakukan di Numpak")}</h2>
          <p className={styles.sectionDesc}>
            {t("Memetakan kebutuhan time-sensitive ke fitur yang sudah ada di prototype Numpak, tanpa batas profesi, jarak, atau moda.")}
          </p>
        </div>
        <div className={styles.bentoGrid}>
          <div className={styles.bento + " " + styles.bentoA} data-animate>
            <div className={styles.bentoIcon + " " + styles.iconTeal}>📍</div>
            <h3>{t("Nitip Bawain")}</h3>
            <p>
              {t("Menjawab ketiadaan cara terstruktur untuk menemukan orang yang sedang searah. Pengguna memasukkan rute, kebutuhan, dan waktu; orang yang searah muncul di feed untuk lanjut chat dan deal.")}
            </p>
          </div>
          <div
            className={styles.bento + " " + styles.bentoB}
            data-animate
            style={{ transitionDelay: "0.1s" }}
          >
            <div className={styles.bentoIcon + " " + styles.iconAmber}>🛡️</div>
            <h3>{t("Profil & Aktivitas")}</h3>
            <p>
              {t("Lihat informasi profil dan aktivitas yang tersedia untuk mengenal pengguna lain sebelum memulai percakapan atau deal.")}
            </p>
          </div>
          <div
            className={styles.bento + " " + styles.bentoC}
            data-animate
            style={{ transitionDelay: "0.15s" }}
          >
            <div className={styles.bentoIcon + " " + styles.iconBlue}>🛒</div>
            <h3>{t("Nitip Beliin")}</h3>
            <p>
              {t("Jelajahi outlet dan produk di Market, gunakan keranjang, atau tambahkan outlet dan produk melalui aplikasi.")}
            </p>
          </div>
          <div
            className={styles.bento + " " + styles.bentoD}
            data-animate
            style={{ transitionDelay: "0.2s" }}
          >
            <div className={styles.bentoIcon + " " + styles.iconRed}>✨</div>
            <h3>{t("Community-Driven")}</h3>
            <p>
              {t("Mengaktifkan kapasitas perjalanan yang sudah terjadi. Numpak bisa dipakai saat naik kendaraan pribadi, kereta, bus, atau travelling; selama searah, perjalanan dapat sekalian bawain titipan, beliin oleh-oleh, atau bantu kebutuhan lain.")}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.showcase} id="ai-assistants">
        <div data-animate>
          <div className={styles.eyebrow}>{t("Asisten di Aplikasi")}</div>
          <h2 className={styles.sectionTitle}>{t("AI Agent Numpak: dari percakapan ke tindakan")}</h2>
          <p className={styles.sectionDesc}>
            {t("Ceritakan tujuanmu dengan bahasa sehari-hari. AI Agent Numpak memahami jenis kebutuhan, menanyakan informasi yang masih kurang, lalu menyusun postingan terstruktur yang siap ditinjau.")}
          </p>
        </div>
        <div className={styles.bentoGrid}>
          <div className={`${styles.bento} ${styles.bentoA}`} data-animate>
            <div className={`${styles.bentoIcon} ${styles.iconTeal}`}><Sparkles size={24} /></div>
            <h3>{t("Cara kerja AI Agent")}</h3>
            <p>{t("Agent mengenali jenis permintaan, mengumpulkan dan memeriksa kelengkapan detail, kemudian menyiapkan pratinjau dalam format postingan Numpak. Setelah pengguna menyetujui, agent mengirim data untuk membuat postingan di aplikasi.")}</p>
            <p className={styles.aiNote}>{t("Bisa membantu permintaan kirim dan belanja, boncengan, jasa lokal, perjalanan, jualan keliling, serta draf caption konten. AI membalas dalam Bahasa Indonesia; untuk konten, agent menyiapkan caption tanpa mengunggah video. Pengguna tetap memegang kendali sebelum postingan dibuat.")}</p>
          </div>
          <div className={`${styles.bento} ${styles.bentoB}`} data-animate>
            <div className={`${styles.bentoIcon} ${styles.iconBlue}`}><Bot size={24} /></div>
            <h3>{t("Bantuan pencarian di feed")}</h3>
            <p>{t("Demo feed mencocokkan kata kunci dengan postingan yang sudah dimuat dan menampilkan hingga lima rekomendasi.")}</p>
            <p className={styles.aiNote}>{t("Fitur feed ini masih berupa pencocokan kata kunci, bukan AI Agent.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsDashboard} data-animate>
          <div className={styles.statsHeader}>
            <div>
              <div className={styles.statsKicker}>{t("Ringkasan Platform")}</div>
              <h2>{t("Aktivitas Numpak")}</h2>
            </div>
            <div className={styles.statsLive}>
              <span></span>{" "}
              {summaryStatus === "loading"
                ? t("Memuat data...")
                : summaryStatus === "ready"
                  ? `${t("Data aplikasi")}${summaryUpdatedLabel ? ` · ${summaryUpdatedLabel}` : ""}`
                  : t("Data belum tersedia")}
            </div>
          </div>

          <div className={styles.statsMain}>
            <div className={styles.revenuePanel}>
              <div className={styles.panelTopline}>
                <div className={styles.panelIcon}>
                  <WalletCards size={20} strokeWidth={1.8} />
                </div>
                <span>{t("Total Nilai Transaksi")}</span>
                <ArrowUpRight size={19} />
              </div>
              <div className={styles.revenueAmount}>
                {platformSummary ? formatCurrency(platformSummary.revenue) : "—"}
              </div>
              <div className={styles.revenueCaption}>
                {t("Akumulasi gross amount transaksi yang tercatat.")}
              </div>
              <div className={styles.activityChart} aria-label={t("Perbandingan jumlah data platform")}>
                {summaryChartValues.map((value, index) => (
                  <motion.span
                    key={index}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    style={{ height: `${value === 0 ? 3 : Math.max(8, (value / chartMax) * 100)}%` }}
                  />
                ))}
              </div>
              <div className={styles.chartCaption}>
                <TrendingUp size={15} /> {t("Jumlah data platform")}
              </div>
            </div>

            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <Users size={19} />
                <span>{t("Total Pengguna")}</span>
                <strong>{platformSummary ? formatCount(platformSummary.users) : "—"}</strong>
              </div>
              <div className={styles.metricCard}>
                <Package size={19} />
                <span>{t("Total Postingan")}</span>
                <strong>{platformSummary ? formatCount(platformSummary.posts) : "—"}</strong>
              </div>
              <div className={styles.metricCard}>
                <ReceiptText size={19} />
                <span>{t("Total Transaksi")}</span>
                <strong>{platformSummary ? formatCount(platformSummary.transactionsCount) : "—"}</strong>
              </div>
              <div className={styles.metricCard}>
                <Handshake size={19} />
                <span>{t("Total Deal")}</span>
                <strong>{platformSummary ? formatCount(platformSummary.dealsCount) : "—"}</strong>
              </div>
              <div className={styles.metricCard}>
                <Store size={19} />
                <span>{t("Total Toko")}</span>
                <strong>{platformSummary ? formatCount(platformSummary.outletsCount) : "—"}</strong>
              </div>
              <div className={`${styles.metricCard} ${styles.metricCardWide}`}>
                <Package size={19} />
                <span>{t("Total Produk")}</span>
                <strong>{platformSummary ? formatCount(platformSummary.productsCount) : "—"}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.howSection} id="how">
        <div data-animate>
          <div className={styles.eyebrow}>{t("Cara Kerja")}</div>
          <h2 className={styles.sectionTitle}>{t("Dari Postingan ke Transaksi")}</h2>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.step} data-animate>
            <div className={styles.stepNum}>01</div>
            <h3>{t("Buat Postingan & Cari")}</h3>
            <p>
              {t("Buat postingan dengan rute, kebutuhan, dan waktu. Cari postingan yang sesuai di feed.")}
            </p>
          </div>
          <div
            className={styles.step}
            data-animate
            style={{ transitionDelay: "0.1s" }}
          >
            <div className={styles.stepNum}>02</div>
            <h3>{t("Chat & Buat Deal")}</h3>
            <p>
              {t("Bahas detail kebutuhan melalui chat in-app, lalu sepakati deal dan ikuti instruksi transaksi yang tersedia di aplikasi.")}
            </p>
          </div>
          <div
            className={styles.step}
            data-animate
            style={{ transitionDelay: "0.2s" }}
          >
            <div className={styles.stepNum}>03</div>
            <h3>{t("Selesaikan Transaksi")}</h3>
            <p>
              {t("Pantau status transaksi di aplikasi dan selesaikan langkah konfirmasi yang tersedia.")}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.bizSection} id="business">
        <div className={styles.bizInner}>
          <div data-animate>
            <div className={styles.eyebrow}>{t("Fitur yang Tersedia")}</div>
            <h2 className={styles.sectionTitle}>
              {t("Satu Aplikasi untuk Berbagai Kebutuhan")}
            </h2>
            <div className={styles.accordion}>
              <div className={styles.accItem}>
                <div className={styles.accHeader} onClick={toggleAcc}>
                  <span>{t("Permintaan & Bantuan Perjalanan")}</span>
                  <span className={styles.collapseIcon}>+</span>
                </div>
                <div className={styles.accBody}>
                  {t("Buat permintaan untuk mengirim barang, meminta bantuan belanja, mencari boncengan, atau mencari tukang lokal.")}
                </div>
              </div>
              <div className={styles.accItem}>
                <div className={styles.accHeader} onClick={toggleAcc}>
                  <span>{t("Market & Outlet")}</span>
                  <span className={styles.collapseIcon}>+</span>
                </div>
                <div className={styles.accBody}>
                  {t("Jelajahi produk, gunakan keranjang, dan kelola outlet serta produk melalui fitur yang tersedia di aplikasi.")}
                </div>
              </div>
              <div className={styles.accItem}>
                <div className={styles.accHeader} onClick={toggleAcc}>
                  <span>{t("Chat & Transaksi")}</span>
                  <span className={styles.collapseIcon}>+</span>
                </div>
                <div className={styles.accBody}>
                  {t("Hubungi pengguna melalui chat, sepakati detail deal, dan pantau transaksi dari halaman transaksi.")}
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
                <div className={styles.bizCardTitle}>{t("Buat Postingan")}</div>
                <div className={styles.bizCardSub}>
                  {t("Bagikan kebutuhan atau perjalanan")}
                </div>
              </div>
              <div className={styles.bizPct}>01</div>
            </div>
            <div className={styles.bizCard}>
              <div
                className={styles.bizIcon}
                style={{ background: "rgba(245, 158, 11, 0.1)" }}
              >
                🏢
              </div>
              <div>
                <div className={styles.bizCardTitle}>{t("Temukan Kecocokan")}</div>
                <div className={styles.bizCardSub}>{t("Cari post atau produk yang sesuai")}</div>
              </div>
              <div className={styles.bizPct}>02</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.faqInner}>
          <div data-animate>
            <div className={styles.eyebrow}>{t("FAQ")}</div>
            <h2 className={styles.sectionTitle}>
              {t("Pertanyaan Populer")}
            </h2>
          </div>
          <div className={styles.faqList} data-animate>
            <div className={styles.faqItem} onClick={toggleFaq}>
              <div className={styles.faqQ}>
                <span>
                  <span className={styles.faqNum}>01.</span> {t("Bagaimana cara memulai transaksi?")}
                </span>
                <span className={styles.collapseIcon}>+</span>
              </div>
              <div className={styles.faqA}>
                {t("Buat atau pilih postingan, lanjutkan percakapan di chat, lalu ikuti detail deal dan instruksi pembayaran yang muncul di aplikasi.")}
              </div>
            </div>
            <div className={styles.faqItem} onClick={toggleFaq}>
              <div className={styles.faqQ}>
                <span>
                  <span className={styles.faqNum}>02.</span> {t("Fitur apa saja yang tersedia?")}
                </span>
                <span className={styles.collapseIcon}>+</span>
              </div>
              <div className={styles.faqA}>
                {t("Aplikasi saat ini menyediakan feed, postingan, chat, deal, transaksi, Market, outlet, serta fitur terkait perjalanan dan layanan lokal.")}
              </div>
            </div>
            <div className={styles.faqItem} onClick={toggleFaq}>
              <div className={styles.faqQ}>
                <span>
                  <span className={styles.faqNum}>03.</span> {t("Bagaimana cara melihat status transaksi?")}
                </span>
                <span className={styles.collapseIcon}>+</span>
              </div>
              <div className={styles.faqA}>
                {t("Buka halaman Transaksi di aplikasi untuk melihat informasi dan status transaksi yang terkait dengan akunmu.")}
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
              {t("Platform peer-to-peer untuk kirim, beli, bonceng, dan bantu kebutuhan searah melalui perjalanan yang sudah terjadi. Hadir untuk siapa pun yang ingin memanfaatkan perjalanan dengan lebih praktis dan saling membantu.")}
            </p>
          </div>
          <div className={styles.footerCol}>
            <h4>{t("Platform")}</h4>
            <a href="#showcase">{t("Fitur Utama")}</a>
            <a href="#dashboard">{t("Admin Panel")}</a>
            <a href="#how">{t("Alur Kerja")}</a>
          </div>
          <div className={styles.footerCol}>
            <h4>{t("Sumber")}</h4>
            <a href="#business">{t("Fitur yang Tersedia")}</a>
            <a href="#faq">{t("Pusat Bantuan")}</a>
            <a href="https://numpak.sakte.id/" target="_blank" rel="noreferrer">
              {t("Live Demo")}
            </a>
          </div>
          <div className={styles.footerCol}>
            <h4>{t("Perusahaan")}</h4>
            <a href="https://sakte.id" target="_blank">
              SAKTE.ID
            </a>
            <a href="#">{t("Privacy Policy")}</a>
            <a href="#">{t("Terms of Service")}</a>
          </div>
        </div>
        <div
          className={styles.footerBottom}
          onClick={() => window.open("https://sakte.id")}
        >
          <p className={styles.footerCopy}>
            © 2026 sakte.id · PT. Satya Karya Technosolution
          </p>
          <div className={styles.footerBadge}>numpak.sakte.id</div>
        </div>
      </footer>

      <a
        href="https://numpak.sakte.id/"
        className={styles.appBubble}
        target="_blank"
        rel="noreferrer"
        aria-label={t("Coba Aplikasi")}
      >
        <span className={styles.appBubbleIcon} aria-hidden="true">
          <Image
            src="/logoo.png"
            alt=""
            width={92}
            height={30}
            className={styles.appBubbleLogo}
            sizes="92px"
          />
        </span>
        <span className={styles.appBubbleLabel}>
          {typedAppLabel}
          <motion.span
            className={styles.appBubbleCursor}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            |
          </motion.span>
        </span>
      </a>
    </>
  );
}
