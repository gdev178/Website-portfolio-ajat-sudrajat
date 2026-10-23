import React from 'react';
import { motion } from 'framer-motion';
import RainbowBeam from './RainbowBeam.jsx';
import {
  INTRO_CATEGORIES,
  OWNER_FIRST,
  OWNER_LAST,
  OWNER_NAME,
  BRAND,
  ROLE,
} from '../data.js';
import { useLang } from '../i18n.jsx';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Layar intro / loading. Dikunci tepat 1 layar penuh, tidak ada scroll.
 */
export default function IntroScreen({ progress, onSkip }) {
  const { t } = useLang();

  return (
    <motion.div
      key="intro"
      exit={{ opacity: 0, filter: "blur(8px)", scale: 1.04 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed inset-0 h-[100svh] w-full overflow-hidden bg-[#050505] text-white"
    >
      <RainbowBeam intensity={1} gradientId="intro-grad" />

      <main className="relative z-10 flex h-full flex-col px-5 py-5 md:px-10 md:py-7">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between">
          <motion.span
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="text-[9px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-[#a1a1aa]"
          >
            {BRAND} PORTFOLIO
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="text-[9px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-[#a1a1aa]"
          >
            {BRAND} / TECH
          </motion.span>
        </header>

        {/* Konten tengah */}
        <section className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-3 flex items-center gap-3 text-[8px] md:text-[10px] font-medium uppercase tracking-[0.22em] text-[#a1a1aa] md:mb-5"
          >
            <span>{OWNER_NAME}</span>
            <span className="h-px w-6 bg-white/25 md:w-10" />
            <span>{t(ROLE)}</span>
          </motion.div>

          <h1
            className="mb-3 font-bold leading-[0.88] tracking-tight text-white md:mb-5"
            style={{
              fontSize: "clamp(2.2rem, 8.2vw, 8.5rem)",
              letterSpacing: "-0.035em",
            }}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
              >
                {OWNER_FIRST}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.32, ease: EASE }}
              >
                {OWNER_LAST}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mb-5 max-w-2xl text-[13px] font-medium leading-relaxed text-[#a1a1aa] md:mb-7 md:text-base"
          >
            {t("intro.tagline")}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
            className="mb-5 flex max-w-3xl flex-wrap justify-center gap-2 md:mb-7 md:gap-3"
          >
            {INTRO_CATEGORIES.map((category) => (
              <motion.span
                key={category}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="cursor-default rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#d4d4d8] backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.07] hover:text-white md:px-4 md:py-2 md:text-sm"
              >
                {category}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
            className="flex flex-col items-center gap-4 md:gap-6"
          >
            <div className="flex items-center gap-2 rounded-full border border-[#00ff99]/25 bg-[#00ff99]/[0.06] px-4 py-1.5 backdrop-blur-md shadow-[0_0_18px_rgba(0,255,153,0.08)] md:px-5 md:py-2">
              <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff99] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff99] md:h-2.5 md:w-2.5" />
              </span>
              <span className="text-[11px] font-medium tracking-wide text-[#00ff99] md:text-sm">
                {t("home.available")}
              </span>
            </div>

            <motion.button
              type="button"
              onClick={onSkip}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-7 py-2.5 backdrop-blur-md transition-colors hover:bg-white/10 md:px-8 md:py-3"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 text-[13px] font-semibold tracking-wide text-white md:text-sm">{t("intro.skip")}</span>
            </motion.button>
          </motion.div>
        </section>

        {/* Loader di bawah */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto flex w-full max-w-md shrink-0 flex-col items-center gap-2.5"
        >
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#a1a1aa] md:text-[10px]">
            {t("intro.loading")}
          </p>
          <div className="relative h-px w-full overflow-hidden bg-white/10">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.15 }}
            />
          </div>
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#a1a1aa] opacity-60 md:text-[10px]">
            {BRAND} / TECH
          </p>
        </motion.footer>
      </main>
    </motion.div>
  );
}
