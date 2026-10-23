import React, { useLayoutEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import { useLang } from '../i18n.jsx';
import {
  BRAND,
  EMAIL,
  FEATURED_PROJECTS,
  FOOTER_TAGS,
  HERO,
  LOGO_IMAGE,
  OWNER_INITIALS,
  OWNER_NAME,
  ROLE,
  SOCIALS,
  WHATSAPP,
} from '../data.js';
import { EASE } from './ui.jsx';
import {
  IconArrowUp,
  IconChat,
  IconFacebook,
  IconGithub,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconTiktok,
  IconYoutube,
} from './social-icons.jsx';

// Kunci sama seperti SocialLink::ICONS di CMS (app/Models/SocialLink.php)
const SOCIAL_ICON_MAP = {
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
  github: IconGithub,
  youtube: IconYoutube,
  facebook: IconFacebook,
  tiktok: IconTiktok,
};

/**
 * Scroll ke atas setiap ganti halaman.
 *
 * `behavior: "auto"` TIDAK memaksa instan — menurut spesifikasi CSSOM View,
 * "auto" berarti "ikuti nilai CSS `scroll-behavior`", dan index.css punya
 * `scroll-behavior: smooth` global. Akibatnya reset ini malah jadi animasi
 * smooth dari posisi scroll terakhir (bisa lama/terlihat "nyangkut" kalau
 * sebelumnya scroll jauh ke bawah). "instant" memaksa loncat langsung
 * terlepas dari aturan CSS itu. useLayoutEffect (bukan useEffect) supaya
 * ini terjadi sebelum browser sempat menggambar halaman baru di posisi lama.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Sama seperti komponen Logo di Navbar.jsx — pakai foto logo dari CMS kalau
// ada, jatuh ke kotak inisial kalau belum diunggah/gagal dimuat.
function FooterLogo() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = LOGO_IMAGE && !photoFailed;

  if (showPhoto) {
    return (
      <img
        src={LOGO_IMAGE}
        alt={OWNER_INITIALS}
        onError={() => setPhotoFailed(true)}
        className="h-12 w-12 rounded-lg object-cover"
      />
    );
  }

  return (
    <span className="grid h-12 w-12 place-items-center rounded-lg bg-[var(--contrast)] text-[var(--contrast-ink)]">
      <span className="text-lg font-bold tracking-tight">{OWNER_INITIALS}</span>
    </span>
  );
}

const NAV_LINKS = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/projects", key: "nav.projects" },
  { to: "/creative-works", key: "nav.creative" },
  { to: "/certificates", key: "nav.certificates" },
  { to: "/contact", key: "nav.contact" },
];

function Footer({ onReplayIntro }) {
  const { t } = useLang();

  // Ikon mail/chat sudah dapat baris sendiri di bawah (dengan alamat email
  // & nomor WhatsApp tertulis) — tidak diulang di grid ikon ini. Entri tanpa
  // href asli (belum diisi di CMS) disembunyikan, bukan diarahkan ke "#".
  const socialButtons = SOCIALS.filter(
    (s) => s.icon && s.icon !== "mail" && s.icon !== "chat" && s.href
  ).map((s) => ({
    icon: SOCIAL_ICON_MAP[s.icon] ?? IconGithub,
    href: s.href,
    label: s.label,
  }));

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[var(--line-1)] bg-[var(--bg)]">
      {/* Cahaya latar tipis */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* --- Kolom 1: identitas --- */}
          <div>
            <div className="mb-7 flex items-center gap-4">
              <FooterLogo />
              <span>
                <span className="block text-xl font-bold tracking-tight text-[var(--text)]">
                  {OWNER_NAME}
                </span>
                <span className="mt-1 block font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  {t(ROLE)}
                </span>
              </span>
            </div>

            <p className="mb-8 max-w-sm text-[15px] leading-[1.8] text-[var(--text-2)]">
              {t(HERO.sub)}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {FOOTER_TAGS.map((tag, i) => (
                <span
                  key={i}
                  className="border border-[var(--line-1)] bg-[var(--tint-1)] px-3.5 py-2 text-[13px] font-medium text-[var(--text-2)]"
                >
                  {t(tag)}
                </span>
              ))}
            </div>
          </div>

          {/* --- Kolom 2: navigasi --- */}
          <div>
            <h3 className="mb-6 text-lg font-bold tracking-tight text-[var(--text)]">
              {t("footer.navigation")}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[15px] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Kolom 3: pekerjaan unggulan --- */}
          <div>
            <h3 className="mb-6 text-lg font-bold tracking-tight text-[var(--text)]">
              {t("footer.featured")}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {FEATURED_PROJECTS.map((project, i) => (
                <li key={i}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-[15px] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
                  >
                    {t(project.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Kolom 4: kontak --- */}
          <div>
            <h3 className="mb-6 text-lg font-bold tracking-tight text-[var(--text)]">
              {t("footer.connect")}
            </h3>

            <div className="mb-7 flex flex-wrap gap-3">
              {socialButtons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center border border-[var(--line-1)] bg-[var(--tint-1)] text-[var(--text-2)] transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/[0.08] hover:text-[var(--accent)]"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <div className="mb-8 flex flex-col gap-3.5">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 break-all text-[15px] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
              >
                <IconMail className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
                {EMAIL}
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 text-[15px] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
              >
                <IconChat className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
                WhatsApp
              </a>
            </div>

            <h3 className="mb-4 text-lg font-bold tracking-tight text-[var(--text)]">
              {t("footer.creativeLinks")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/creative-works"
                  className="text-[15px] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
                >
                  {t("nav.creative")}
                </Link>
              </li>
              <li>
                <Link
                  to="/certificates"
                  className="text-[15px] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
                >
                  {t("nav.certificates")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Baris bawah --- */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--line-1)] pt-7">
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} {OWNER_NAME}. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onReplayIntro}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            >
              {t("footer.replay")}
            </button>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label={t("footer.toTop")}
              className="grid h-11 w-11 place-items-center border border-[var(--line-2)] text-[var(--text-2)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
            >
              <IconArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ onReplayIntro }) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)]/25">
      <ScrollToTop />
      <Navbar />

      <main className="relative z-10 flex-1">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer onReplayIntro={onReplayIntro} />
    </div>
  );
}
