import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import {
  CREATIVE_SLIDES,
  FEATURED_PROJECTS,
  PROCESS,
  TECH_GROUPS,
} from '../data.js';
import { EASE, IconArrow, PageHeading, Reveal, SectionLabel } from './ui.jsx';
import Media from './Media.jsx';
import TechTile from './TechTile.jsx';

/* ============ 04 / Selected Systems ============ */

export function FeaturedProjects() {
  const { t } = useLang();

  return (
    <section>
      <Reveal>
        <SectionLabel index="04" className="mb-6">
          {t("label.systems")}
        </SectionLabel>
      </Reveal>

      <Reveal delay={0.06}>
        <PageHeading as="h2" className="mb-16">{t("home.featuredProjects")}</PageHeading>
      </Reveal>

      <div className="flex flex-col gap-24 md:gap-32">
        {FEATURED_PROJECTS.map((project, i) => {
          const flipped = i % 2 === 1;

          return (
            <div
              key={project.title.en}
              className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16"
            >
              {/* Mockup */}
              <Reveal
                delay={0.05}
                className={flipped ? "lg:order-2" : "lg:order-1"}
              >
                <div className="relative overflow-hidden border border-[var(--line-1)] bg-[var(--surface-3)]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle at 70% 35%, var(--glow-accent), transparent 60%)",
                    }}
                  />
                  <Media
                    src={project.image}
                    alt={t(project.title)}
                    className="relative aspect-[16/11] w-full object-cover"
                  />
                </div>
              </Reveal>

              {/* Keterangan */}
              <Reveal
                delay={0.12}
                className={flipped ? "lg:order-1" : "lg:order-2"}
              >
                <div>
                  <div className="mb-5 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.2em]">
                    <span className="text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[var(--muted)]">/</span>
                    <span className="uppercase text-[var(--accent)]">
                      {t(project.tag)}
                    </span>
                  </div>

                  <h3 className="mb-6 text-4xl font-bold tracking-tight text-[var(--text)] md:text-5xl">
                    {t(project.title)}
                  </h3>

                  <p className="mb-7 max-w-xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
                    {t(project.description)}
                  </p>

                  <div className="mb-8 flex flex-wrap gap-2.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[var(--line-1)] bg-[var(--tint-1)] px-3 py-1.5 font-mono text-[11px] text-[var(--text-2)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={project.href}
                    className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                  >
                    {t("home.caseStudy")}
                    <IconArrow className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============ 05 / Process ============ */

export function Process() {
  const { t } = useLang();

  return (
    <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div>
        <Reveal>
          <SectionLabel index="05" className="mb-6">
            {t("label.process")}
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.06}>
          <PageHeading as="h2" className="mb-6">{t(PROCESS.headline)}</PageHeading>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="max-w-md text-[15px] leading-[1.8] text-[var(--text-2)] md:text-base">
            {t(PROCESS.detail)}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden border border-[var(--line-1)] bg-[var(--tint-3)] sm:grid-cols-2">
        {PROCESS.steps.map((step, i) => (
          <Reveal key={i} delay={(i % 2) * 0.05 + Math.floor(i / 2) * 0.06}>
            <div className="group flex h-full min-h-[130px] flex-col justify-between bg-[var(--surface)] p-6 transition-colors hover:bg-[var(--tint-1)]">
              <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-end justify-between gap-4">
                <h3 className="text-xl font-bold tracking-tight text-[var(--text)] md:text-2xl">
                  {t(step)}
                </h3>
                {/* Kotak indikator, menyala saat hover */}
                <span className="h-6 w-6 shrink-0 border border-[var(--line-2)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_14px_rgba(56,189,248,0.35)]" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ 06 / Toolkit ============ */

export function TechStack() {
  const { t } = useLang();
  const [active, setActive] = useState(TECH_GROUPS[0].key);

  const group = TECH_GROUPS.find((g) => g.key === active) ?? TECH_GROUPS[0];

  return (
    <section>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <SectionLabel index="06" className="mb-6">
              {t("label.toolkit")}
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <PageHeading as="h2">{t("home.techStack")}</PageHeading>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="flex items-center border border-[var(--line-1)]">
            {TECH_GROUPS.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setActive(g.key)}
                aria-pressed={active === g.key}
                className={`px-6 py-3 text-sm font-semibold transition-colors ${
                  active === g.key
                    ? "bg-[var(--contrast)] text-[var(--contrast-ink)]"
                    : "text-[var(--text-3)] hover:text-[var(--text)]"
                }`}
              >
                {t(g.label)}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="grid gap-px overflow-hidden border border-[var(--line-1)] bg-[var(--tint-3)] grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8"
        >
          {group.items.map((item) => (
            <div
              key={item.name}
              className="group bg-[var(--surface)] p-6 transition-colors hover:bg-[var(--tint-1)]"
            >
              <TechTile mono={item.mono} bg={item.bg} fg={item.fg} />
              <h3 className="mt-8 truncate text-[15px] font-semibold text-[var(--text)]">
                {item.name}
              </h3>
              <p className="mt-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                {t(item.level)}
              </p>
            </div>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ============ 07 / Beyond the Browser ============ */

/**
 * Gambar slide. Kalau file belum ada, komponen menghilang
 * sehingga gradasi latar kartu tetap terlihat rapi.
 */
function SlideImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

export function CreativeShowcase() {
  const { t } = useLang();
  const [index, setIndex] = useState(1);

  const total = CREATIVE_SLIDES.length;

  // Geser dengan jari/mouse: cukup lewati sedikit jarak ATAU sentakan cepat
  // supaya terasa responsif, bukan cuma bisa diklik/pakai titik navigasi.
  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (offset.x < -60 || velocity.x < -400) {
      setIndex((i) => Math.min(i + 1, total - 1));
    } else if (offset.x > 60 || velocity.x > 400) {
      setIndex((i) => Math.max(i - 1, 0));
    }
  };

  return (
    <section>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <SectionLabel index="07" className="mb-6">
              {t("label.beyond")}
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <PageHeading as="h2">{t("home.selectedCreative")}</PageHeading>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <Link
            to="/creative-works"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--text)]"
          >
            {t("home.creativeArchive")}
            <IconArrow className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="relative overflow-hidden border border-[var(--line-1)] bg-[var(--field)] px-4 py-14 md:py-20">
          {/* Kartu bergaya coverflow — bisa digeser pakai jari/mouse */}
          <motion.div
            className="relative mx-auto h-[300px] w-full max-w-4xl cursor-grab touch-pan-y active:cursor-grabbing md:h-[420px]"
            style={{ perspective: "1600px" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            {CREATIVE_SLIDES.map((slide, i) => {
              const offset = i - index;
              const distance = Math.abs(offset);
              const isCenter = offset === 0;

              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={t(slide.title)}
                  aria-current={isCenter}
                  animate={{
                    x: `${offset * 46}%`,
                    scale: 1 - distance * 0.13,
                    rotateY: -offset * 24,
                    opacity: distance > 2 ? 0 : 1 - distance * 0.28,
                    zIndex: 10 - distance,
                  }}
                  transition={{ duration: 0.65, ease: EASE }}
                  className="absolute inset-0 mx-auto w-[72%] cursor-pointer overflow-hidden rounded-lg border border-[var(--line-1)] text-left shadow-2xl shadow-[var(--shadow)] md:w-[62%]"
                  style={{ background: slide.gradient, transformStyle: "preserve-3d" }}
                >
                  <SlideImage src={slide.image} alt={t(slide.title)} />

                  {/* Gelap di bawah supaya teks terbaca */}
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <span className="absolute inset-x-0 bottom-0 block p-6 md:p-8">
                    <span className="mb-2.5 block font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/75">
                      {t(slide.category)}
                    </span>
                    <span className="mb-1.5 block text-2xl font-bold tracking-tight text-white md:text-3xl">
                      {t(slide.title)}
                    </span>
                    <span className="block text-sm font-medium text-white/80">
                      {t(slide.subtitle)}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Kontrol */}
          <div className="mt-10 flex flex-col items-center gap-7">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                {CREATIVE_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === index ? "scale-125 bg-[var(--contrast)]" : "bg-[var(--line-2)] hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <Link
                to="/creative-works"
                aria-label={t("home.creativeArchive")}
                className="text-white/50 transition-colors hover:text-white"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIndex((prev) => (prev + 1) % total)}
              className="inline-flex items-center gap-2.5 rounded-lg border border-[var(--line-2)] bg-[var(--tint-2)] px-7 py-3 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--line-2)] hover:bg-[var(--tint-3)]"
            >
              {t("home.seeSimilar")}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
