import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { CREATIVE_WORKS, WHATSAPP } from '../data.js';
import { IconArrow, IconCheck, PageHeading, Reveal } from '../components/ui.jsx';

/** Gambar besar — jatuh ke gradasi kalau file belum ada */
function HeroImage({ src, alt, gradient }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--line-1)]"
      style={{ background: gradient }}
    >
      {!failed && src && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default function CreativeDetail() {
  const { t } = useLang();
  const { slug } = useParams();

  const work = CREATIVE_WORKS.find((w) => w.slug === slug);
  const index = CREATIVE_WORKS.findIndex((w) => w.slug === slug);
  const next = index >= 0 ? CREATIVE_WORKS[(index + 1) % CREATIVE_WORKS.length] : null;

  if (!work) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-28 text-center md:px-8 lg:px-12">
        <PageHeading className="mb-6">{t("creative.notFound")}</PageHeading>
        <Link
          to="/creative-works"
          className="inline-flex items-center gap-2.5 border border-[var(--line-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {t("creative.back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
      <Reveal>
        <Link
          to="/creative-works"
          className="group mb-10 inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          <IconArrow className="rotate-180 transition-transform group-hover:-translate-x-1" />
          {t("creative.back")}
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ok)]">
          {t(work.category)}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <PageHeading className="mb-6 max-w-[20ch]">{t(work.title)}</PageHeading>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mb-12 max-w-2xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
          {t(work.subtitle)}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mb-14">
          <HeroImage src={work.image} alt={t(work.title)} gradient={work.gradient} />
        </div>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
              {t("detail.overview")}
            </h2>
            <p className="mb-12 text-[15px] leading-[1.85] text-[var(--text-2)] md:text-base">
              {t(work.description)}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
              {t("detail.scope")}
            </h2>
            <ul className="flex flex-col gap-4">
              {work.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <IconCheck className="mt-1 shrink-0 text-[var(--ok)]" />
                  <span className="text-[15px] leading-[1.7] text-[var(--text-strong)]">{t(point)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="border border-[var(--line-1)] bg-[var(--surface)] p-8">
            <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              {t("detail.category")}
            </p>
            <p className="mb-8 text-[15px] font-medium text-[var(--text)]">{t(work.category)}</p>

            <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              {t("detail.tools")}
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {work.tools.map((item) => (
                <span
                  key={item}
                  className="border border-[var(--line-1)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--text-2)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2.5 bg-[var(--contrast)] px-6 py-3.5 text-sm font-semibold text-[var(--contrast-ink)] transition-transform hover:scale-[1.03]"
            >
              {t("home.discuss")}
              <IconArrow className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>

      {next && next.slug !== work.slug && (
        <Reveal>
          <Link
            to={`/creative-works/${next.slug}`}
            className="group mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--line-1)] pt-10"
          >
            <div>
              <p className="mb-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                {t("creative.nextWork")}
              </p>
              <p className="text-2xl font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                {t(next.title)}
              </p>
            </div>
            <span className="grid h-12 w-12 place-items-center border border-[var(--line-2)] text-[var(--text)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
              <IconArrow />
            </span>
          </Link>
        </Reveal>
      )}
    </div>
  );
}
