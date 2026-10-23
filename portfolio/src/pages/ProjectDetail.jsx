import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { PROJECTS, WHATSAPP } from '../data.js';
import { IconArrow, IconCheck, IconExternal, PageHeading, Reveal } from '../components/ui.jsx';
import Media from '../components/Media.jsx';

export default function ProjectDetail() {
  const { t } = useLang();
  const { slug } = useParams();

  const project = PROJECTS.find((p) => p.slug === slug);
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = index >= 0 ? PROJECTS[(index + 1) % PROJECTS.length] : null;

  if (!project) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-28 text-center md:px-8 lg:px-12">
        <PageHeading className="mb-6">{t("detail.notFound")}</PageHeading>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2.5 border border-[var(--line-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {t("detail.back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
      {/* Kembali */}
      <Reveal>
        <Link
          to="/projects"
          className="group mb-10 inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          <IconArrow className="rotate-180 transition-transform group-hover:-translate-x-1" />
          {t("detail.back")}
        </Link>
      </Reveal>

      {/* Judul */}
      <Reveal delay={0.05}>
        <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          {t(project.category)}
          <span className="mx-2 text-[var(--muted)]">/</span>
          <span className="text-[var(--muted)]">{t(project.type)}</span>
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <PageHeading className="mb-7 max-w-[20ch]">{t(project.title)}</PageHeading>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mb-12 max-w-2xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
          {t(project.description)}
        </p>
      </Reveal>

      {/* Gambar utama */}
      <Reveal delay={0.2}>
        <div className="mb-14 overflow-hidden border border-[var(--line-1)] bg-[var(--surface-3)]">
          <Media
            src={project.image}
            alt={t(project.title)}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Isi */}
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
              {t("detail.overview")}
            </h2>
            <p className="mb-12 text-[15px] leading-[1.85] text-[var(--text-2)] md:text-base">
              {t(project.detail)}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
              {t("detail.scope")}
            </h2>
            <ul className="flex flex-col gap-4">
              {project.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <IconCheck className="mt-1 shrink-0 text-[var(--ok)]" />
                  <span className="text-[15px] leading-[1.7] text-[var(--text-strong)]">{t(point)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Panel samping */}
        <Reveal delay={0.12}>
          <div className="border border-[var(--line-1)] bg-[var(--surface)] p-8">
            <dl className="mb-8 flex flex-col gap-6">
              {[
                { label: t("detail.category"), value: t(project.category) },
                { label: t("detail.type"), value: t(project.type) },
                { label: t("detail.year"), value: project.year },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                    {row.label}
                  </dt>
                  <dd className="text-[15px] font-medium text-[var(--text)]">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              {t("detail.tools")}
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-[var(--line-1)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--text-2)]"
                >
                  {item}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group mb-3 inline-flex w-full items-center justify-center gap-2.5 border border-[var(--line-2)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {t("detail.liveDemo")}
                <IconExternal className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}

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

      {/* Proyek berikutnya */}
      {next && next.slug !== project.slug && (
        <Reveal>
          <Link
            to={`/projects/${next.slug}`}
            className="group mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--line-1)] pt-10"
          >
            <div>
              <p className="mb-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                {t("detail.next")}
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
