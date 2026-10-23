import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import { useTheme } from '../theme.jsx';
import { CV_FILE, EMAIL, HERO, OWNER_NAME, PROFILE_PHOTO, PROFILE_PHOTO_DARK, WHATSAPP } from '../data.js';
import {
  EASE,
  IconArrow,
  IconCheck,
  IconDownload,
  IconPin,
  ProfilePhoto,
} from '../components/ui.jsx';
import AboutSection from '../components/AboutSection.jsx';
import { Highlights, Snapshot, WhatIBuild } from '../components/HomeSections.jsx';
import {
  CreativeShowcase,
  FeaturedProjects,
  Process,
  TechStack,
} from '../components/HomeSections2.jsx';
import { Recognition } from '../components/HomeSections3.jsx';
import { Conversation, FinalCTA } from '../components/HomeSections4.jsx';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: EASE },
});

/** Dekorasi jaring laba-laba untuk Mode Spiderman — hanya di Hero */
function SpiderWeb() {
  const rings = [60, 115, 170, 225, 280, 335];
  const spokeCount = 11;
  const spokes = Array.from({ length: spokeCount }, (_, i) => (360 / spokeCount) * i);
  const maxR = rings[rings.length - 1];

  // Titik aksen kecil di beberapa persimpangan, mis. reference-nya
  const nodes = [
    { ring: 1, spoke: 1 },
    { ring: 2, spoke: 4 },
    { ring: 2, spoke: 8 },
    { ring: 3, spoke: 2 },
    { ring: 4, spoke: 6 },
    { ring: 4, spoke: 9 },
    { ring: 5, spoke: 3 },
  ];
  const point = (r, deg) => [r * Math.cos((deg * Math.PI) / 180), r * Math.sin((deg * Math.PI) / 180)];

  return (
    <svg
      className="absolute right-[-14%] top-1/2 h-[85vh] w-[85vh] -translate-y-1/2 opacity-45 md:right-[-4%]"
      viewBox={`${-maxR - 10} ${-maxR - 10} ${(maxR + 10) * 2} ${(maxR + 10) * 2}`}
      fill="none"
      aria-hidden="true"
    >
      {spokes.map((deg) => {
        const [x, y] = point(maxR, deg);
        return (
          <line key={deg} x1="0" y1="0" x2={x} y2={y} stroke="#ef4444" strokeWidth="1" />
        );
      })}
      {rings.map((r) => (
        <polygon
          key={r}
          points={spokes.map((deg) => point(r, deg).join(",")).join(" ")}
          stroke="#ef4444"
          strokeWidth="1"
        />
      ))}
      {nodes.map(({ ring, spoke }, i) => {
        const [x, y] = point(rings[ring], spokes[spoke]);
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#ef4444" />;
      })}
    </svg>
  );
}

export default function Home() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isSpiderman = theme === "spiderman";
  const heroPhoto = isSpiderman ? PROFILE_PHOTO_DARK : PROFILE_PHOTO;

  const textPrimary = isSpiderman ? "text-white" : "text-[var(--text)]";
  const textStrong = isSpiderman ? "text-white/90" : "text-[var(--text-strong)]";
  const textSecondary = isSpiderman ? "text-white/70" : "text-[var(--text-2)]";
  const textMuted = isSpiderman ? "text-white/45" : "text-[var(--text-3)]";
  const accentText = isSpiderman ? "text-red-500" : "text-[var(--accent)]";
  const dotColor = isSpiderman ? "bg-red-500" : "bg-[var(--ok)]";
  const heroBg = isSpiderman ? "bg-[rgb(13,7,10)]" : "";

  return (
    <>
    <section className={`relative flex min-h-[calc(100svh-73px)] items-center overflow-hidden ${heroBg}`}>
      {/* Cahaya latar */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute right-[-10%] top-[-20%] h-[70vh] w-[70vw] rounded-full blur-3xl"
          style={{
            background: isSpiderman
              ? "radial-gradient(circle, rgba(72,13,24,0.55), transparent 65%)"
              : "radial-gradient(circle, var(--glow-accent), transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-[-30%] left-[-15%] h-[60vh] w-[60vw] rounded-full blur-3xl"
          style={{
            background: isSpiderman
              ? "radial-gradient(circle, rgba(13,7,10,0.9), transparent 65%)"
              : "radial-gradient(circle, var(--glow-deep), transparent 65%)",
          }}
        />
      </div>

      {isSpiderman && <SpiderWeb />}

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-6 lg:gap-y-0 lg:px-12 lg:py-8">
        {/* ---- Kolom kiri, bagian atas: judul & paragraf ---- */}
        <div className="lg:col-start-1 lg:row-start-1">
          <motion.div
            {...fadeUp(0.05)}
            className={`mb-7 flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${textSecondary}`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${dotColor}`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`} />
            </span>
            {t("about.helloIm")}
          </motion.div>

          <motion.p
            {...fadeUp(0.12)}
            className={`mb-3 text-lg font-medium md:text-xl ${textSecondary}`}
          >
            {OWNER_NAME}
          </motion.p>

          <h1
            className="mb-7 font-bold leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 6.2vw, 5.5rem)", letterSpacing: "-0.035em" }}
          >
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className={`block ${textPrimary}`}
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.18, ease: EASE }}
              >
                {t(HERO.headlineTop)}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className={`block ${accentText}`}
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
              >
                {t(HERO.headlineAccent)}
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...fadeUp(0.5)}
            className={`mb-5 max-w-xl text-base leading-[1.75] md:text-xl ${textStrong}`}
          >
            {t(HERO.lead)}
          </motion.p>

          <motion.p
            {...fadeUp(0.58)}
            className={`mb-9 max-w-lg text-sm leading-[1.75] md:text-base ${textMuted}`}
          >
            {t(HERO.sub)}
          </motion.p>
        </div>

        {/* ---- Kolom kanan: foto (di mobile tampil di antara paragraf & tombol) ---- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end"
        >
          <div className="relative">
            {/* Halo di belakang foto */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 scale-125 rounded-full blur-2xl"
              style={{
                background: isSpiderman
                  ? "radial-gradient(circle, rgba(72,13,24,0.7), transparent 62%)"
                  : "radial-gradient(circle, rgba(56,189,248,0.18), transparent 62%)",
              }}
            />
            <ProfilePhoto
              key={theme}
              src={heroPhoto}
              alt={OWNER_NAME}
              className="h-[42vh] w-auto max-w-full object-contain object-bottom drop-shadow-[0_25px_60px_var(--shadow)] sm:h-[52vh] lg:h-[74vh]"
            />
            {/* Fade lembut di kaki foto */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent"
              style={{ '--tw-gradient-from': isSpiderman ? 'rgb(13,7,10)' : 'var(--bg)' }}
            />
          </div>
        </motion.div>

        {/* ---- Kolom kiri, bagian bawah: tombol & info kontak singkat ---- */}
        <div className="lg:col-start-1 lg:row-start-2">
          <motion.div {...fadeUp(0.66)} className="mb-10 flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className={`group inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.04] ${
                isSpiderman
                  ? "bg-red-600 text-white hover:bg-red-500"
                  : "bg-[var(--contrast)] text-[var(--contrast-ink)]"
              }`}
            >
              {t("home.explore")}
              <IconArrow className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className={`rounded-lg border px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition-colors ${
                isSpiderman
                  ? "border-red-500/25 bg-white/5 text-white hover:bg-white/10"
                  : "border-[var(--line-2)] bg-[var(--tint-2)] text-[var(--text)] hover:border-[var(--line-2)] hover:bg-[var(--tint-3)]"
              }`}
            >
              {t("nav.contactMe")}
            </Link>

            <a
              href={CV_FILE}
              download
              className={`inline-flex items-center gap-2.5 px-3 py-3.5 text-sm font-medium transition-colors ${textSecondary} ${isSpiderman ? "hover:text-white" : "hover:text-[var(--text)]"}`}
            >
              <IconDownload />
              {t("home.cv")}
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(0.74)}
            className={`flex flex-wrap items-center gap-x-7 gap-y-3 text-sm ${textMuted}`}
          >
            <span className="inline-flex items-center gap-2">
              <IconPin className={textMuted} />
              {t("home.based")}
            </span>
            <span className="inline-flex items-center gap-2">
              <IconCheck className={isSpiderman ? "text-red-500" : "text-[var(--ok)]"} />
              {t("home.available")}
            </span>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${isSpiderman ? "hover:text-white" : "hover:text-[var(--text)]"}`}
            >
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} className={`transition-colors ${isSpiderman ? "hover:text-white" : "hover:text-[var(--text)]"}`}>
              Email
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indikator scroll -> lanjut ke halaman About */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center lg:flex"
      >
        <a
          href="#about"
          className="pointer-events-auto inline-flex items-center gap-4 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--text-3)] transition-colors hover:text-[var(--text)]"
        >
          <span className="h-px w-12 bg-[var(--line-2)]" />
          {t("home.scroll")}
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--accent)]"
            aria-hidden="true"
          >
            <path d="M12 4v14m0 0 6-6m-6 6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </a>
      </motion.div>
    </section>

    {/* ---- Section di bawah hero ---- */}
    <div className="mx-auto flex max-w-[1400px] flex-col gap-24 px-5 pb-24 pt-8 md:gap-32 md:px-8 md:pb-32 lg:px-12">
      <AboutSection id="about" index="01" />
      <Highlights />
      <Snapshot />
      <WhatIBuild />
      <FeaturedProjects />
      <Process />
      <TechStack />
      <CreativeShowcase />
      <Recognition />
      <Conversation />
    </div>

    {/* Ajakan penutup — melebar penuh */}
    <FinalCTA />
    </>
  );
}
