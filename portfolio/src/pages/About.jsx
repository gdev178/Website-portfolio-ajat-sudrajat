import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import {
  ABOUT,
  ABOUT_CTA,
  ABOUT_PHOTO,
  CV_FILE,
  ECOSYSTEM,
  EXPERIENCE,
  OWNER_NAME,
  PRACTICE,
  SKILLS,
  STATS,
  TOOLS_LIST,
  TOOLS_NOTE,
  VALUES,
} from '../data.js';
import {
  EASE,
  IconArrow,
  IconDownload,
  PageHeading,
  ProfilePhoto,
  Reveal,
  SectionLabel,
} from '../components/ui.jsx';
import {
  IconBriefcase,
  IconCamera,
  IconCode,
  IconLayers,
  IconMonitor,
  IconPalette,
  IconSparkles,
  IconWrench,
} from '../components/icons.jsx';

const ICONS = {
  wrench: IconWrench,
  monitor: IconMonitor,
  palette: IconPalette,
  camera: IconCamera,
  briefcase: IconBriefcase,
  code: IconCode,
  layers: IconLayers,
};

export default function About() {
  const { t } = useLang();
  const CentreIcon = ICONS[ECOSYSTEM.centre.icon] ?? IconWrench;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-12 md:px-8 md:pt-16 lg:px-12">
        <Reveal>
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
            {t("label.about")}
            <span className="mx-2 text-[var(--muted)]">/</span>
            <span className="text-[var(--muted)]">{OWNER_NAME}</span>
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <PageHeading className="mb-14 max-w-[16ch]">{t(ABOUT.heroHeadline)}</PageHeading>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Foto */}
          <Reveal delay={0.1}>
            <div className="relative">
              <ProfilePhoto
                src={ABOUT_PHOTO}
                alt={OWNER_NAME}
                className="h-[420px] w-full object-contain object-top md:h-[540px]"
              />

              {/* Badge lokasi */}
              <span className="absolute -bottom-5 right-5 border border-[var(--line-1)] bg-[var(--surface)] px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                Indonesia / GMT+7
              </span>
            </div>
          </Reveal>

          {/* Keterangan */}
          <div className="lg:pt-4">
            <Reveal delay={0.14}>
              <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
                {t("about.helloIm")}
              </p>
              <h2 className="mb-7 text-3xl font-bold tracking-tight text-[var(--text)] md:text-[40px]">
                {OWNER_NAME}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mb-6 text-[17px] leading-[1.75] text-[var(--text-strong)] md:text-lg">
                {t(ABOUT.lead)}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="mb-9 text-[15px] leading-[1.85] text-[var(--text-3)] md:text-base">
                {t(ABOUT.body)}
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <blockquote className="mb-9 border-l-2 border-[var(--accent)] bg-[var(--tint-1)] px-7 py-7">
                <p className="text-[15px] leading-[1.8] text-[var(--text-strong)] md:text-lg">
                  &ldquo;{t(ABOUT.quote)}&rdquo;
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={CV_FILE}
                  download
                  className="inline-flex items-center gap-2.5 bg-[var(--contrast)] px-6 py-3.5 text-sm font-semibold text-[var(--contrast-ink)] transition-transform hover:scale-[1.04]"
                >
                  <IconDownload />
                  {t("home.cv")}
                </a>
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2.5 border border-[var(--line-2)] bg-[var(--tint-1)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--line-3)] hover:bg-[var(--tint-2)]"
                >
                  {t("about.viewProjects")}
                  <IconArrow className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= MY PRACTICE ================= */}
      <section className="border-t border-[var(--line-1)] bg-[var(--surface-3)]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24 lg:px-12">
          <Reveal>
            <p className="mb-8 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
              {t("about.practice")}
            </p>
          </Reveal>

          <div className="mb-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={0.06}>
              <PageHeading as="h2" className="max-w-[16ch]">
                {t(PRACTICE.headline)}
              </PageHeading>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-[15px] leading-[1.9] text-[var(--text-2)] md:text-lg lg:pt-3">
                {t(PRACTICE.detail)}
              </p>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden border border-[var(--line-1)] bg-[var(--tint-3)] md:grid-cols-3">
            {PRACTICE.items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? IconCode;
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="h-full bg-[var(--surface)] p-8 transition-colors hover:bg-[var(--tint-1)]">
                    <Icon className="mb-14 h-7 w-7 text-[var(--accent)]" />
                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-[var(--text)]">
                      {t(item.title)}
                    </h3>
                    <p className="text-[15px] leading-[1.75] text-[var(--text-3)]">
                      {t(item.detail)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= EKOSISTEM ================= */}
      <section className="border-t border-[var(--line-1)]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24 lg:px-12">
          <Reveal>
            <p className="mb-8 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
              {t("about.ecosystem")}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <PageHeading as="h2" className="mb-14">
              {t(ECOSYSTEM.headline)}
            </PageHeading>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            {/* Panel pusat */}
            <Reveal>
              <div
                className="relative grid min-h-[420px] place-items-center border border-[var(--line-1)] p-8 lg:min-h-[500px]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="border border-[var(--accent)]/40 bg-[var(--surface-2)] px-12 py-10 text-center shadow-[0_0_50px_rgba(56,189,248,0.08)]"
                >
                  <CentreIcon className="mx-auto mb-5 h-7 w-7 text-[var(--accent)]" />
                  <p className="mb-2 text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
                    {t(ECOSYSTEM.centre.title)}
                  </p>
                  <p className="text-[15px] text-[var(--text-3)]">
                    {t(ECOSYSTEM.centre.subtitle)}
                  </p>
                </motion.div>
              </div>
            </Reveal>

            {/* Disiplin pendukung */}
            <div className="flex flex-col gap-4">
              {ECOSYSTEM.items.map((item, i) => {
                const Icon = ICONS[item.icon] ?? IconLayers;
                return (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="group flex flex-1 items-center gap-5 border border-[var(--line-1)] bg-[var(--surface)] px-6 py-5 transition-colors hover:border-[var(--accent)]/35">
                      <Icon className="h-6 w-6 shrink-0 text-[var(--accent)]" />
                      <div>
                        <p className="text-[19px] font-bold tracking-tight text-[var(--text)]">
                          {t(item.title)}
                        </p>
                        <p className="mt-0.5 text-[14px] text-[var(--text-3)]">
                          {t(item.subtitle)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= NILAI & PERKAKAS ================= */}
      <section className="border-t border-[var(--line-1)] bg-[var(--surface-3)]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {/* Nilai */}
            <div>
              <Reveal>
                <p className="mb-8 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
                  {t("about.values")}
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <PageHeading as="h2" className="mb-14 max-w-[18ch]">
                  {t(VALUES.headline)}
                </PageHeading>
              </Reveal>

              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {VALUES.items.map((item, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="border-b border-[var(--line-1)] pb-5">
                      <p className="mb-4 font-mono text-[11px] font-medium tracking-[0.18em] text-[var(--accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="text-[19px] font-bold tracking-tight text-[var(--text)]">
                        {t(item)}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Perkakas */}
            <Reveal delay={0.12}>
              <div className="h-full border border-[var(--line-1)] bg-[var(--surface)] p-8 md:p-10">
                <p className="mb-7 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {t("about.tools")}
                </p>

                <div className="mb-9 flex flex-wrap gap-3">
                  {TOOLS_LIST.map((tool) => (
                    <span
                      key={tool}
                      className="border border-[var(--line-1)] bg-[var(--tint-1)] px-4 py-2.5 text-[15px] font-medium text-[var(--text-2)] transition-colors hover:border-[var(--line-3)] hover:text-[var(--text)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <p className="text-[15px] leading-[1.85] text-[var(--text-3)] md:text-base">
                  {t(TOOLS_NOTE)}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Statistik */}
          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--line-1)] bg-[var(--tint-3)] md:grid-cols-3">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="h-full bg-[var(--surface)] px-8 py-9">
                  <p className="mb-2 text-5xl font-bold tracking-tight text-[var(--accent)] md:text-6xl">
                    {stat.value}
                  </p>
                  <p className="text-[15px] text-[var(--text-2)]">{t(stat.label)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PENGALAMAN ================= */}
      <section className="border-t border-[var(--line-1)]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24 lg:px-12">
          <Reveal>
            <SectionLabel index="05" className="mb-10">
              {t("about.experience")}
            </SectionLabel>
          </Reveal>

          <div className="border-t border-[var(--line-1)]">
            {EXPERIENCE.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="grid gap-3 border-b border-[var(--line-1)] py-8 md:grid-cols-[200px_1fr] md:gap-10">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--accent)] md:pt-1.5">
                    {t(item.year)}
                  </p>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--text)] md:text-2xl">
                      {t(item.role)}
                    </h3>
                    <p className="mb-3 text-sm text-[var(--muted)]">{t(item.place)}</p>
                    <p className="max-w-2xl text-[15px] leading-[1.8] text-[var(--text-2)]">
                      {t(item.detail)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Rincian keahlian */}
          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--line-1)] bg-[var(--tint-3)] md:grid-cols-2 xl:grid-cols-3">
            {SKILLS.map((skill, i) => (
              <Reveal key={i} delay={(i % 3) * 0.06}>
                <div className="h-full bg-[var(--surface)] p-7">
                  <h3 className="mb-5 text-lg font-bold tracking-tight text-[var(--text)]">
                    {t(skill.group)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, j) => (
                      <span
                        key={j}
                        className="border border-[var(--line-1)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--text-2)]"
                      >
                        {t(item)}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="border-t border-[var(--line-1)] bg-[var(--surface-3)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center md:py-32">
          <Reveal>
            <IconSparkles className="mb-9 h-8 w-8 text-[var(--accent)]" />
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              className="mb-7 font-bold leading-[1.05] tracking-tight text-[var(--text)]"
              style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)", letterSpacing: "-0.03em" }}
            >
              {t(ABOUT_CTA.headline)}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mb-11 max-w-xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
              {t(ABOUT_CTA.detail)}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-[var(--contrast)] px-8 py-4 text-sm font-semibold text-[var(--contrast-ink)] transition-transform hover:scale-[1.04]"
              >
                {t("nav.contactMe")}
              </Link>
              <Link
                to="/projects"
                className="border border-[var(--line-2)] bg-[var(--tint-1)] px-8 py-4 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--line-3)] hover:bg-[var(--tint-2)]"
              >
                {t("about.viewProjects")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
