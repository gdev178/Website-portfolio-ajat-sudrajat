import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ABOUT, ABOUT_PHOTO, CV_FILE, OWNER_NAME } from '../data.js';
import {
  IconArrow,
  IconDownload,
  PageHeading,
  ProfilePhoto,
  Reveal,
  SectionLabel,
} from './ui.jsx';

/**
 * Blok "About Me" — dipakai di halaman Home (di bawah hero)
 * dan di halaman /about.
 */
export default function AboutSection({ index = "01", id }) {
  const { t } = useLang();

  return (
    <section id={id} className="scroll-mt-24">
      <Reveal>
        <SectionLabel index={index} className="mb-6">
          {t("label.about")}
        </SectionLabel>
      </Reveal>

      <Reveal delay={0.06}>
        <PageHeading className="mb-14 max-w-[16ch]">{t(ABOUT.headline)}</PageHeading>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Kiri */}
        <div>
          <Reveal delay={0.1}>
            <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
              {t("about.helloIm")}
            </p>
            <h3 className="mb-7 text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
              {OWNER_NAME}
            </h3>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mb-8 text-[15px] leading-[1.85] text-[var(--text-2)] md:text-base">
              {t(ABOUT.body)}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <blockquote className="mb-9 border-l-2 border-[var(--accent)] bg-[var(--tint-1)] px-6 py-6">
              <p className="text-[15px] leading-[1.8] text-[var(--text-strong)] md:text-lg">
                &ldquo;{t(ABOUT.quote)}&rdquo;
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mb-9 flex flex-wrap items-center gap-4">
              <a
                href={CV_FILE}
                download
                className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--contrast)] px-6 py-3.5 text-sm font-semibold text-[var(--contrast-ink)] transition-transform hover:scale-[1.04]"
              >
                <IconDownload />
                {t("home.cv")}
              </a>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2.5 px-2 py-3.5 text-sm font-semibold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
              >
                {t("about.viewProjects")}
                <IconArrow className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="flex flex-wrap gap-2.5">
              {ABOUT.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-md border border-[var(--line-1)] bg-[var(--tint-1)] px-3.5 py-2 text-[13px] font-medium text-[var(--text-2)]"
                >
                  {t(tag)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Kanan: foto + kartu */}
        <Reveal delay={0.12}>
          <div className="relative lg:pl-10">
            <ProfilePhoto
              src={ABOUT_PHOTO}
              alt={OWNER_NAME}
              className="h-[420px] w-full object-contain object-top md:h-[520px]"
            />

            <div className="relative -mt-16 w-[min(19rem,90%)] border border-[var(--line-1)] bg-[var(--surface-2)] p-6 shadow-2xl shadow-[var(--shadow)] lg:-ml-10">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                {t("about.creativeSupport")}
              </p>
              <p className="text-[15px] leading-[1.7] text-[var(--text-strong)]">
                {t(ABOUT.supportCard)}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
