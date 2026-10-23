import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import { CREATIVE_CATEGORIES, CREATIVE_WORKS } from '../data.js';
import { EASE, IconArrow, PageHeading, Reveal } from '../components/ui.jsx';

const ALL = "__all__";

/** Ukuran kartu di grid bento */
const SPAN_CLASS = {
  large: "lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-[620px]",
  wide: "lg:col-span-2 min-h-[300px]",
  normal: "min-h-[300px]",
};

function IconSearch() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Gambar kartu — hilang sendiri kalau file belum ada, gradasi tetap terlihat */
function CardImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
    />
  );
}

export default function CreativeWorks() {
  const { t } = useLang();

  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CREATIVE_WORKS.filter((work) => {
      if (category !== ALL && work.category.en !== category) return false;

      if (q) {
        const haystack = [
          work.title.en,
          work.title.id,
          work.description.en,
          work.description.id,
          ...work.tools,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [category, query]);

  return (
    <>
      {/* ---------- Kepala halaman ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-16 md:px-8 md:pt-24 lg:px-12">
        <Reveal>
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
            {t("creative.archive")}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <PageHeading className="mb-7 max-w-[18ch]">{t("creative.headline")}</PageHeading>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="max-w-2xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
            {t("creative.intro")}
          </p>
        </Reveal>
      </section>

      {/* ---------- Filter ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 border-y border-[var(--line-1)] py-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCategory(ALL)}
              aria-pressed={category === ALL}
              className={`border px-6 py-3.5 text-[15px] font-semibold transition-all ${
                category === ALL
                  ? "border-[var(--contrast)] bg-[var(--contrast)] text-[var(--contrast-ink)]"
                  : "border-[var(--line-1)] bg-[var(--tint-1)] text-[var(--text-2)] hover:border-[var(--line-3)] hover:text-[var(--text)]"
              }`}
            >
              {t("projects.all")}
            </button>

            {CREATIVE_CATEGORIES.map((cat) => (
              <button
                key={cat.en}
                type="button"
                onClick={() => setCategory(category === cat.en ? ALL : cat.en)}
                aria-pressed={category === cat.en}
                className={`border px-6 py-3.5 text-[15px] font-semibold transition-all ${
                  category === cat.en
                    ? "border-[var(--contrast)] bg-[var(--contrast)] text-[var(--contrast-ink)]"
                    : "border-[var(--line-1)] bg-[var(--tint-1)] text-[var(--text-2)] hover:border-[var(--line-3)] hover:text-[var(--text)]"
                }`}
              >
                {t(cat)}
              </button>
            ))}
          </div>

          <label className="relative flex min-w-[280px] items-center xl:max-w-sm xl:flex-1">
            <span className="pointer-events-none absolute left-4 text-[var(--muted)]">
              <IconSearch />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("creative.searchPlaceholder")}
              aria-label={t("creative.searchPlaceholder")}
              className="w-full border border-[var(--line-1)] bg-[var(--tint-1)] py-3.5 pl-11 pr-4 text-[15px] text-[var(--text)] placeholder:text-[var(--text-3)] transition-colors focus:border-[var(--accent)]/60 focus:outline-none"
            />
          </label>
        </div>
      </section>

      {/* ---------- Grid bento ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <div className="grid auto-rows-[300px] grid-flow-dense gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((work, i) => (
            <motion.div
              key={work.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease: EASE }}
              className={SPAN_CLASS[work.span] ?? SPAN_CLASS.normal}
            >
              <Link
                to={`/creative-works/${work.slug}`}
                className="group relative flex h-full flex-col justify-end overflow-hidden border border-[var(--line-1)] transition-colors hover:border-[var(--accent)]/40"
                style={{ background: work.gradient }}
              >
                <CardImage src={work.image} alt={t(work.title)} />

                {/* Gelap di bawah supaya teks terbaca */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="relative p-7 md:p-8">
                  <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#6ee7b7]">
                    {t(work.category)}
                  </p>

                  <h2
                    className="mb-4 font-bold leading-[1.1] tracking-tight text-white"
                    style={{
                      fontSize:
                        work.span === "large"
                          ? "clamp(1.7rem, 3vw, 2.6rem)"
                          : "clamp(1.4rem, 2vw, 1.85rem)",
                    }}
                  >
                    {t(work.title)}
                  </h2>

                  {work.span === "large" && (
                    <p className="mb-5 max-w-md text-[15px] leading-[1.7] text-white/70">
                      {t(work.subtitle)}
                    </p>
                  )}

                  <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-white transition-colors group-hover:text-[var(--accent)]">
                    {t("creative.openWork")}
                    <IconArrow className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="border border-[var(--line-1)] py-20 text-center">
            <p className="mb-5 text-[15px] text-[var(--muted)]">{t("creative.noResults")}</p>
            <button
              type="button"
              onClick={() => {
                setCategory(ALL);
                setQuery("");
              }}
              className="inline-flex items-center gap-2.5 border border-[var(--line-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("projects.clear")}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
