import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import { FEATURED_CERTIFICATES } from '../data.js';
import { EASE, IconArrow, PageHeading, Reveal, SectionLabel } from './ui.jsx';
import { IconAward } from './icons.jsx';
import Media from './Media.jsx';

/* ============ 08 / Recognition ============ */

export function Recognition() {
  const { t } = useLang();

  // Sembunyikan section selama belum ada sertifikat
  if (FEATURED_CERTIFICATES.length === 0) return null;

  return (
    <section>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <SectionLabel index="08" className="mb-6">
              {t("label.recognition")}
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <PageHeading as="h2" className="mb-5">
              {t("home.certsTitle")}
            </PageHeading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-[15px] leading-[1.8] text-[var(--text-2)]">
              {t("home.certsDetail")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <Link
            to="/certificates"
            className="group inline-flex items-center gap-2.5 border-b border-[var(--accent)]/40 pb-1 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--contrast)] hover:text-[var(--text)]"
          >
            {t("home.certArchive")}
            <IconArrow className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {FEATURED_CERTIFICATES.map((cert, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <motion.a
              href={cert.href}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="group flex h-full flex-col border border-[var(--line-1)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)]"
            >
              {/* Pratinjau sertifikat */}
              <div className="relative border-b border-[var(--line-1)] p-7">
                <span className="absolute left-7 top-7 z-10 grid h-10 w-10 place-items-center border border-[var(--accent)]/35 bg-[var(--accent)]/[0.08] text-[var(--accent)]">
                  <IconAward className="h-5 w-5" />
                </span>
                <span className="absolute right-7 top-7 z-10 font-mono text-[10px] tracking-[0.18em] text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Media
                  src={cert.image}
                  alt={t(cert.title)}
                  className="mx-auto aspect-[1/1.35] w-[58%] border border-[var(--line-1)] bg-white object-contain"
                />
              </div>

              {/* Keterangan */}
              <div className="flex flex-1 flex-col p-7">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                    {t(cert.category)}
                  </span>
                  <span className="border border-[var(--accent)]/35 bg-[var(--accent)]/[0.08] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                    {t("home.featured")}
                  </span>
                  <span className="ml-auto font-mono text-[11px] tracking-[0.18em] text-[var(--muted)]">
                    {cert.date}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold leading-snug tracking-tight text-[var(--text)] md:text-[26px]">
                  {t(cert.title)}
                </h3>
                <p className="mb-6 text-[15px] text-[var(--text-2)]">{t(cert.issuer)}</p>

                <span className="mb-7 w-fit border border-[var(--line-1)] px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-[var(--text-2)]">
                  {cert.credential}
                </span>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-[var(--line-1)] pt-5">
                  <span className="text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                    {t("home.viewCert")}
                  </span>
                  <span className="grid h-9 w-9 place-items-center border border-[var(--line-2)] text-[var(--text)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                    <IconArrow />
                  </span>
                </div>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
