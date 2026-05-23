"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ScreenshotShowcase from "./ScreenshotShowcase";
import DashboardShowcase from "./DashboardShowcase";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    { name: "Fitur Platform", href: "#showcase" },
    { name: "Admin Dashboard", href: "#dashboard" },
    { name: "Cara Kerja", href: "#how" },
    { name: "Model Bisnis", href: "#business" },
    { name: "FAQ & Safety", href: "#faq" },
  ];

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <Image
            src="/logo.png"
            alt="Nebeng Logo"
            width={160}
            height={46}
            className={styles.logoImg}
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
          onClick={() => window.open("https://nebeng.vercel.app")}
        >
          Coba Prototype
        </button>
      </div>

      <header className={styles.hero}>
        <div data-animate className={styles.heroLeft}>
          <div
            className={styles.heroBadge}
            style={{ cursor: "pointer" }}
            onClick={() => window.open("https://sakte.id")}
          >
            <i></i> SAKTE.ID · TEAM ID : P0190
          </div>
          <h2 className={styles.heroH1}>
            Optimalkan Mobilitas, <br />
            <span className={styles.accent}>Sederhanakan Logistik.</span>
          </h2>
          <p className={styles.heroDesc}>
            Nebeng memobilisasi perjalanan komunitas untuk pengiriman yang lebih
            cepat, hemat, dan terpercaya melalui arsitektur marketplace berbasis
            kepercayaan (Escrow & Asuransi OJK).
          </p>
          <div className={styles.heroButtons}>
            <a href="https://nebeng.vercel.app" className={styles.btnPrimary}>
              Coba Sekarang →
            </a>
            <a href="#showcase" className={styles.btnSecondary}>
              Pelajari Fitur
            </a>
          </div>
          <div className={styles.heroTrust}>
            <div className={styles.trustAvatars}>
              <span>LS</span>
              <span>AY</span>
              <span>RS</span>
            </div>
            <div className={styles.trustText}>
              Dipercaya oleh komunitas <strong>UMKM & Traveler</strong> di
              Purwokerto
            </div>
          </div>
        </div>

        <div
          data-animate
          className={styles.heroVisual}
          style={{ transitionDelay: "0.2s" }}
        >
          <Image
            src="/screenshots/hero1.png"
            alt="Hand holding Nebeng App"
            width={1000}
            height={1200}
            className={styles.handImage}
            priority
          />
        </div>
      </header>

      <div className={styles.trusted}>
        <div className={styles.trustedLabel}>Anchor Ecosystem</div>
        <div className={styles.trustedLogos}>
          <span>UMKM Purwokerto</span>
          <span>Mahasiswa UNSOED</span>
          <span>Komunitas Traveler</span>
        </div>
      </div>

      <ScreenshotShowcase />
      <DashboardShowcase />

      <section className={styles.showcase} id="showcase">
        <div data-animate>
          <div className={styles.eyebrow}>Platform Fitur</div>
          <h2 className={styles.sectionTitle}>Problem–Solution Mapping</h2>
          <p className={styles.sectionDesc}>
            Membangun arsitektur kepercayaan berlapis berbasis perjalanan
            komunitas yang efisien dan inklusif.
          </p>
        </div>
        <div className={styles.bentoGrid}>
          <div className={styles.bento + " " + styles.bentoA} data-animate>
            <div className={styles.bentoIcon + " " + styles.iconTeal}>📍</div>
            <h3>Nitip Bawain</h3>
            <p>
              Menjawab mahalnya biaya logistik. Traveler yang melewati rute
              pengirim mengambil titipan tanpa memperpanjang perjalanan. Biaya
              pengiriman dapat ditekan 30–50% dibanding ekspedisi konvensional.
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
              Arsitektur kepercayaan empat lapis: escrow payment, sistem
              Verified Pro berbasis XP, rating dua arah, dan asuransi polis
              digital per transaksi (OJK) — trust by design.
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
              Mengaktifkan aset idle (kendaraan bergerak setiap hari) menjadi
              infrastruktur logistik nyata tanpa investasi kendaraan baru — zero
              incremental carbon footprint.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsInner}>
          <div className={styles.statBlock} data-animate>
            <div className={styles.statLabel}>Deal Aktif</div>
            <div className={styles.statNumber}>
              <span className={styles.accentNum}>30</span>+
            </div>
          </div>
          <div
            className={styles.statBlock}
            data-animate
            style={{ transitionDelay: "0.1s" }}
          >
            <div className={styles.statLabel}>Pertumbuhan</div>
            <div className={styles.statNumber}>
              <span className={styles.accentNum}>12</span>%
            </div>
          </div>
          <div
            className={styles.statBlock}
            data-animate
            style={{ transitionDelay: "0.2s" }}
          >
            <div className={styles.statLabel}>Efisiensi</div>
            <div className={styles.statNumber}>
              <span className={styles.accentNum}>50</span>%
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
              Input rute & kebutuhan. Algoritma Haversine mencocokkan traveler
              searah dengan deviasi ≤10 km secara real-time dari feed aktif.
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
              Negosiasi detail via chat in-app. Pembayaran ditahan sistem escrow
              & polis asuransi digital diterbitkan otomatis per transaksi.
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
              Pencairan dana setelah konfirmasi penerimaan. Perolehan rating &
              XP untuk membangun profil Verified Pro dalam ekosistem komunitas.
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
                  Service Fee per Transaksi
                </div>
                <div className={styles.accBody}>
                  Komisi 8–12% dari setiap transaksi selesai. Menghasilkan
                  estimasi Rp 1.600–9.600 per deal. Platform hanya dapat fee
                  saat transaksi berhasil.
                </div>
              </div>
              <div className={styles.accItem}>
                <div className={styles.accHeader} onClick={toggleAcc}>
                  Premium Membership
                </div>
                <div className={styles.accBody}>
                  Rp 29.000/bulan untuk limit posting rute lebih banyak dan
                  prioritas tampil di feed. Target 10% MAU berlangganan sebagai
                  recurring revenue.
                </div>
              </div>
              <div className={styles.accItem}>
                <div className={styles.accHeader} onClick={toggleAcc}>
                  Outlet Ads
                </div>
                <div className={styles.accBody}>
                  Merchant dapat mempromosikan toko di feed seharga Rp
                  50.000–200.000 per promo per minggu untuk menjangkau lebih
                  banyak kurir dan pelanggan.
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
                  dicairkan ke traveler?
                </span>
              </div>
              <div className={styles.faqA}>
                Dana dicairkan dari sistem escrow ke wallet traveler segera
                setelah penerima mengkonfirmasi barang diterima dengan aman
                lewat aplikasi untuk menjamin keadilan transaksi.
              </div>
            </div>
            <div className={styles.faqItem} onClick={toggleFaq}>
              <div className={styles.faqQ}>
                <span>
                  <span className={styles.faqNum}>02.</span> Bagaimana
                  perlindungan data pribadi?
                </span>
              </div>
              <div className={styles.faqA}>
                Kami mematuhi UU PDP No. 27/2022 secara ketat. Data identitas
                dienkripsi AES-256 dan hanya digunakan secara internal untuk
                verifikasi reputasi Verified Pro komunitas.
              </div>
            </div>
            <div className={styles.faqItem} onClick={toggleFaq}>
              <div className={styles.faqQ}>
                <span>
                  <span className={styles.faqNum}>03.</span> Apa itu Sistem
                  Outlet 3 Model?
                </span>
              </div>
              <div className={styles.faqA}>
                Inovasi inklusi digital dimana warung bisa didaftarkan oleh
                Kurir, Pemilik, atau Customer agar masuk ke ekosistem logistik
                digital Nebeng tanpa harus memiliki perangkat digital sendiri.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerBrand}>
              NEBENG<span>™</span>
            </div>
            <p className={styles.footerDesc}>
              Platform logistik peer-to-peer berbasis komunitas traveler
              Indonesia. Submission Digdaya × Hackathon 2026.
            </p>
            <div className={styles.footerSocials}>
              <a href="#" className={styles.socialLink}>
                𝕏
              </a>
              <a href="#" className={styles.socialLink}>
                IG
              </a>
              <a href="#" className={styles.socialLink}>
                LI
              </a>
            </div>
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
            <a href="https://nebeng.vercel.app">Live Demo</a>
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
        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>
            © 2026 Nebeng Team · PT. Satya Karya Technosolution
          </p>
          <div className={styles.footerBadge}>nebeng.vercel.app</div>
        </div>
      </footer>
    </>
  );
}
