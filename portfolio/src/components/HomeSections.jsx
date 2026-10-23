import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import {
  BUILD_ITEMS,
  BUILD_MAIN,
  HOME_FOCUS,
  HOME_HIGHLIGHTS,
  SNAPSHOT,
} from '../data.js';
import { EASE, IconArrow, PageHeading, Reveal, SectionLabel } from './ui.jsx';
import {
  IconAward,
  IconBriefcase,
  IconCamera,
  IconChevronRight,
  IconCode,
  IconMonitor,
  IconPalette,
  IconSparkles,
  IconWrench,
} from './icons.jsx';

const ICONS = {
  briefcase: IconBriefcase,
  award: IconAward,
  sparkles: IconSparkles,
  monitor: IconMonitor,
  wrench: IconWrench,
  palette: IconPalette,
  camera: IconCamera,
};

/* ---------- Kartu highlight + baris fokus ---------- */

export function Highlights() {
  const { t } = useLang();

  return (
    <section>
      <div className="grid gap-px overflow-hidden border border-[var(--line-1)] bg-[var(--tint-3)] md:grid-cols-3">
        {HOME_HIGHLIGHTS.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group h-full bg-[var(--surface)] px-8 py-9 transition-colors hover:bg-[var(--tint-1)]">
                <Icon className="mb-9 h-6 w-6 text-[var(--accent)]" />

                <p className="mb-3 text-4xl font-bold tracking-tight text-[var(--text)] md:text-5xl">
                  {item.value}
                </p>
                <h3 className="mb-2 text-base font-semibold text-[var(--text)]">
                  {t(item.title)}
                </h3>
                <p className="mb-7 text-sm text-[var(--text-3)]">{t(item.detail)}</p>

                {/* Garis indikator */}
                <div className="h-px w-full bg-[var(--tint-3)]">
                  <motion.div
                    className="h-px bg-[var(--accent)]/70"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: item.bar }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: EASE }}
                    style={{ originX: 0 }}
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {HOME_FOCUS.map((focus, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <p className="text-[15px] text-[var(--text-3)]">
              {t(focus.label)}:{" "}
              <span className="font-medium text-[var(--text)]">{t(focus.value)}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 02 / Snapshot ---------- */

export function Snapshot() {
  const { t } = useLang();

  return (
    <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      {/* Kartu kiri */}
      <Reveal>
        <div className="flex h-full flex-col border border-[var(--line-1)] bg-[var(--surface-2)] p-9">
          <SectionLabel index="02" className="mb-6">
            {t("label.snapshot")}
          </SectionLabel>

          <h2 className="mb-12 text-[28px] font-bold leading-[1.2] tracking-tight text-[var(--text)] md:text-[32px]">
            {t(SNAPSHOT.headline)}
          </h2>

          <p className="mb-4 text-6xl font-bold leading-none tracking-tight text-[var(--accent)] md:text-7xl">
            {SNAPSHOT.bigValue}
          </p>
          <p className="max-w-sm text-[15px] leading-[1.75] text-[var(--text-2)]">
            {t(SNAPSHOT.bigDetail)}
          </p>
        </div>
      </Reveal>

      {/* Metrik kanan */}
      <div className="flex flex-col justify-between gap-10">
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {SNAPSHOT.metrics.map((metric, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div>
                <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  {t(metric.label)}
                </p>
                <p
                  className={`mb-5 font-bold tracking-tight ${
                    metric.accent
                      ? "text-2xl text-[var(--ok)] md:text-[26px]"
                      : "text-4xl text-[var(--text)] md:text-5xl"
                  }`}
                >
                  {typeof metric.value === "string" ? metric.value : t(metric.value)}
                </p>
                <div className="h-px w-full bg-[var(--tint-3)]" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Strip aktivitas */}
        <Reveal delay={0.2}>
          <div className="flex items-center gap-5">
            <span className="shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              {t(SNAPSHOT.activityLabel)}
            </span>
            <div className="flex flex-1 gap-1.5">
              {SNAPSHOT.activity.map((level, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scaleY: 0.3 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease: EASE }}
                  className={`h-2.5 flex-1 rounded-[2px] ${
                    level === 2
                      ? "bg-[#6ee7b7]"
                      : level === 1
                        ? "bg-[#2f7fa8]"
                        : "bg-[var(--tint-3)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 03 / What I Build ---------- */

export function WhatIBuild() {
  const { t } = useLang();

  return (
    <section>
      <Reveal>
        <SectionLabel index="03" className="mb-6">
          {t("label.build")}
        </SectionLabel>
      </Reveal>

      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.06}>
          <PageHeading as="h2" className="max-w-[16ch]">
            {t({
              en: "Development systems, with a visual point of view.",
              id: "Sistem pengembangan, dengan sudut pandang visual.",
            })}
          </PageHeading>
        </Reveal>

        <Reveal delay={0.12}>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--text)]"
          >
            {t("home.discuss")}
            <IconArrow className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        {/* Kartu utama */}
        <Reveal>
          <div className="flex h-full flex-col justify-between border border-[var(--line-1)] bg-[var(--surface-2)] p-9">
            <IconCode className="h-7 w-7 text-[var(--accent)]" />

            <div className="mt-24">
              <h3 className="mb-5 text-[30px] font-bold leading-[1.15] tracking-tight text-[var(--text)] md:text-4xl">
                {t(BUILD_MAIN.title)}
              </h3>
              <p className="mb-8 max-w-md text-[15px] leading-[1.75] text-[var(--text-2)]">
                {t(BUILD_MAIN.detail)}
              </p>
              <div className="flex flex-wrap gap-x-7 gap-y-2.5">
                {BUILD_MAIN.points.map((point, i) => (
                  <span key={i} className="text-sm text-[var(--text-3)]">
                    {t(point)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Empat kartu kecil */}
        <div className="grid gap-5 sm:grid-cols-2">
          {BUILD_ITEMS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={i} delay={(i % 2) * 0.07}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group flex h-full flex-col border border-[var(--line-1)] bg-[var(--surface-2)] p-7 transition-colors hover:border-[var(--accent)]/30"
                >
                  <Icon className="mb-9 h-6 w-6 text-[var(--accent)]" />

                  <h3 className="mb-3 text-lg font-bold tracking-tight text-[var(--text)]">
                    {t(item.title)}
                  </h3>
                  <p className="mb-7 text-sm leading-[1.7] text-[var(--text-3)]">
                    {t(item.detail)}
                  </p>

                  <Link
                    to="/projects"
                    className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]"
                  >
                    {t("home.viewDetails")}
                    <IconChevronRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
