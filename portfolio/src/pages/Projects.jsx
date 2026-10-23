import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_TECHS,
  PROJECT_TYPES,
} from '../data.js';
import { EASE, IconArrow, PageHeading, Reveal } from '../components/ui.jsx';
import Media from '../components/Media.jsx';

const ALL = "__all__";

function IconSearch() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconFilter() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

/** Tombol filter berbentuk pil */
function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-6 py-3.5 text-[15px] font-semibold transition-all ${
        active
          ? "border-[var(--contrast)] bg-[var(--contrast)] text-[var(--contrast-ink)]"
          : "border-[var(--line-1)] bg-[var(--tint-1)] text-[var(--text-2)] hover:border-[var(--line-3)] hover:text-[var(--text)]"
      }`}
    >
      {children}
    </button>
  );
}

export default function Projects() {
  const { t } = useLang();

  const [category, setCategory] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [tech, setTech] = useState(ALL);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROJECTS.filter((p) => {
      if (category !== ALL && p.category.en !== category) return false;
      if (type !== ALL && p.type.en !== type) return false;
      if (tech !== ALL && !p.stack.includes(tech)) return false;

      if (q) {
        const haystack = [
          p.title.en,
          p.title.id,
          p.description.en,
          p.description.id,
          ...p.stack,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [category, type, tech, query]);

  const isFiltered = category !== ALL || type !== ALL || tech !== ALL || query !== "";

  const clearAll = () => {
    setCategory(ALL);
    setType(ALL);
    setTech(ALL);
    setQuery("");
  };

  return (
    <>
      {/* ---------- Kepala halaman ---------- */}
      <section className="border-b border-[var(--line-1)]">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
              {t("projects.archive")}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <PageHeading className="mb-7 max-w-[20ch]">
              {t("projects.headline")}
            </PageHeading>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-2xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
              {t("projects.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Baris filter ---------- */}
      <section className="border-b border-[var(--line-1)]">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8 lg:px-12">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            {/* Pil kategori + tipe */}
            <div className="flex flex-wrap gap-3">
              <FilterPill active={category === ALL && type === ALL} onClick={clearAll}>
                {t("projects.allWork")}
              </FilterPill>

              {PROJECT_CATEGORIES.map((cat) => (
                <FilterPill
                  key={cat.en}
                  active={category === cat.en}
                  onClick={() => setCategory(category === cat.en ? ALL : cat.en)}
                >
                  {t(cat)}
                </FilterPill>
              ))}

              {PROJECT_TYPES.map((item) => (
                <FilterPill
                  key={item.en}
                  active={type === item.en}
                  onClick={() => setType(type === item.en ? ALL : item.en)}
                >
                  {t(item)}
                </FilterPill>
              ))}
            </div>

            {/* Pencarian + teknologi + reset */}
            <div className="flex flex-wrap items-stretch gap-3">
              <label className="relative flex min-w-[240px] flex-1 items-center">
                <span className="pointer-events-none absolute left-4 text-[var(--muted)]">
                  <IconSearch />
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("projects.searchPlaceholder")}
                  aria-label={t("projects.searchPlaceholder")}
                  className="w-full border border-[var(--line-1)] bg-[var(--tint-1)] py-3.5 pl-11 pr-4 text-[15px] text-[var(--text)] placeholder:text-[var(--text-3)] transition-colors focus:border-[var(--accent)]/60 focus:outline-none"
                />
              </label>

              <select
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                aria-label={t("projects.allTech")}
                className="min-w-[170px] border border-[var(--line-1)] bg-[var(--tint-1)] px-4 py-3.5 text-[15px] text-[var(--text)] transition-colors focus:border-[var(--accent)]/60 focus:outline-none"
              >
                <option value={ALL}>{t("projects.allTech")}</option>
                {PROJECT_TECHS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={clearAll}
                disabled={!isFiltered}
                className="inline-flex items-center gap-2.5 border border-[var(--line-1)] px-6 py-3.5 text-[15px] font-medium text-[var(--text-2)] transition-colors hover:border-[var(--line-3)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconFilter />
                {t("projects.clear")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Daftar proyek ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group flex h-full flex-col border border-[var(--line-1)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)]/35"
              >
                {/* Mockup */}
                <Link to={`/projects/${project.slug}`} className="block overflow-hidden">
                  <Media
                    src={project.image}
                    alt={t(project.title)}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </Link>

                {/* Keterangan */}
                <div className="flex flex-1 flex-col p-7">
                  <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                    {t(project.category)}
                    <span className="mx-2 text-[var(--muted)]">/</span>
                    <span className="text-[var(--muted)]">{t(project.type)}</span>
                  </p>

                  <h2 className="mb-3.5 text-2xl font-bold tracking-tight text-[var(--text)]">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="transition-colors hover:text-[var(--accent)]"
                    >
                      {t(project.title)}
                    </Link>
                  </h2>

                  <p className="mb-6 text-[15px] leading-[1.75] text-[var(--text-2)]">
                    {t(project.description)}
                  </p>

                  <div className="mb-7 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-[var(--line-1)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--text-2)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="mt-auto inline-flex w-fit items-center gap-2.5 text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]"
                  >
                    {t("projects.openCase")}
                    <IconArrow className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="border border-[var(--line-1)] py-20 text-center">
            <p className="mb-5 text-[15px] text-[var(--muted)]">{t("projects.noResults")}</p>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2.5 border border-[var(--line-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <IconFilter />
              {t("projects.clear")}
            </button>
          </div>
        )}
      </section>

      {/* ---------- Ajakan penutup ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-8 lg:px-12">
        <Reveal>
          <div className="border border-[var(--line-1)] bg-[var(--surface)] p-9 md:p-12">
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
              {t("projects.ctaTitle")}
            </h2>
            <p className="mb-9 max-w-xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-base">
              {t("projects.ctaDetail")}
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 bg-[var(--contrast)] px-7 py-3.5 text-sm font-semibold text-[var(--contrast-ink)] transition-transform hover:scale-[1.04]"
            >
              {t("home.discuss")}
              <IconArrow className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
