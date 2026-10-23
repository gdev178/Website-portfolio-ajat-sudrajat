import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import {
  CERTIFICATES,
  CERTIFICATE_CATEGORIES,
} from '../data.js';
import { EASE, IconArrow, PageHeading, Reveal } from '../components/ui.jsx';
import { IconAward } from '../components/icons.jsx';
import Media from '../components/Media.jsx';

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const ALL = "__all__";

function IconSearch() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Label kecil penanda entri contoh */
function SampleBadge({ className = "" }) {
  const { t } = useLang();
  return (
    <span
      className={`border border-[var(--warn)]/40 bg-[var(--warn)]/[0.1] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--warn)] ${className}`}
    >
      {t("cert.sample")}
    </span>
  );
}

/** Modal rincian sertifikat — muncul saat kartu diklik */
function CertificateModal({ cert, onClose }) {
  const { t } = useLang();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm md:items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl border border-[var(--line-1)] bg-[var(--surface)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-[var(--line-1)] p-6 md:p-8">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t(cert.category)}
              </p>
              {cert.placeholder && <SampleBadge />}
            </div>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-[var(--text)] md:text-3xl">
              {t(cert.title)}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("cert.close")}
            className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--line-1)] text-[var(--text-2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <IconClose />
          </button>
        </div>

        {/* Isi */}
        <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
          <div className="flex items-center justify-center bg-[var(--surface-3)] p-6">
            <Media
              src={cert.image}
              alt={t(cert.title)}
              className="aspect-[1/1.35] w-full max-w-sm border border-[var(--line-1)] bg-white object-contain"
            />
          </div>

          <div>
            <p className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              {t("cert.detailsHeading")}
            </p>

            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-1 text-[13px] text-[var(--muted)]">{t("cert.issuerLabel")}</p>
                <p className="text-[15px] font-semibold text-[var(--text)]">{t(cert.issuer)}</p>
              </div>

              <div>
                <p className="mb-1 text-[13px] text-[var(--muted)]">{t("cert.dateLabel")}</p>
                <p className="text-[15px] font-semibold text-[var(--text)]">{cert.date}</p>
              </div>

              {cert.credential && cert.credential !== "—" && (
                <div>
                  <p className="mb-1 text-[13px] text-[var(--muted)]">{t("cert.credentialLabel")}</p>
                  <p className="text-[15px] font-semibold text-[var(--text)]">{cert.credential}</p>
                </div>
              )}

              {cert.href && (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-2 inline-flex w-fit items-center gap-2.5 text-sm font-semibold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                >
                  {t("cert.verify")}
                  <IconArrow className="transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Certificates() {
  const { t } = useLang();

  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  // Hormati sertifikat yang ditandai unggulan lewat admin; kalau belum
  // ada yang ditandai, tampilkan yang pertama supaya blok ini tidak kosong.
  const featured = CERTIFICATES.find((c) => c.featured) ?? CERTIFICATES[0];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CERTIFICATES.filter((cert) => {
      if (category !== ALL && cert.category.en !== category) return false;

      if (q) {
        const haystack = [
          cert.title.en,
          cert.title.id,
          cert.issuer.en,
          cert.issuer.id,
          cert.credential,
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
      <section className="mx-auto max-w-[1400px] px-5 pb-10 pt-14 md:px-8 md:pt-20 lg:px-12">
        <Reveal>
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
            {t("label.recognition")}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <PageHeading className="mb-7 max-w-[16ch]">{t("cert.headline")}</PageHeading>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="max-w-2xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
            {t("cert.intro")}
          </p>
        </Reveal>

      </section>

      {/* ---------- Sertifikat unggulan ---------- */}
      {featured && (
        <section className="mx-auto max-w-[1400px] px-5 pb-14 md:px-8 lg:px-12">
          <Reveal>
            <div className="grid items-stretch gap-0 border border-[var(--line-1)] bg-[var(--surface-2)] lg:grid-cols-[1.1fr_1fr]">
              {/* Keterangan */}
              <div className="flex flex-col justify-center p-9 md:p-12">
                <span className="mb-10 grid h-11 w-11 place-items-center text-[var(--accent)]">
                  <IconAward className="h-7 w-7" />
                </span>

                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {t("cert.featured")}
                  </p>
                  {featured.placeholder && <SampleBadge />}
                </div>

                <h2 className="mb-5 text-3xl font-bold leading-[1.15] tracking-tight text-[var(--text)] md:text-[42px]">
                  {t(featured.title)}
                </h2>

                <p className="text-[15px] text-[var(--text-2)] md:text-lg">
                  {t(featured.issuer)}
                  <span className="mx-2 text-[var(--muted)]">/</span>
                  {featured.date}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => setSelected(featured)}
                    className="group inline-flex w-fit items-center gap-2.5 text-sm font-semibold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                  >
                    {t("cert.viewDetails")}
                    <IconArrow className="transition-transform group-hover:translate-x-1" />
                  </button>

                  {featured.href && (
                    <a
                      href={featured.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex w-fit items-center gap-2.5 text-sm font-semibold text-[var(--text-2)] transition-colors hover:text-[var(--accent)]"
                    >
                      {t("cert.verify")}
                      <IconArrow className="transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* Gambar sertifikat */}
              <div className="flex items-center justify-center bg-[var(--surface)] p-8 md:p-10">
                <Media
                  src={featured.image}
                  alt={t(featured.title)}
                  className="aspect-[1/1.35] w-full max-w-sm border border-[var(--line-1)] bg-white object-contain"
                />
              </div>
            </div>
          </Reveal>
        </section>
      )}

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

            {CERTIFICATE_CATEGORIES.map((cat) => (
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
              placeholder={t("cert.searchPlaceholder")}
              aria-label={t("cert.searchPlaceholder")}
              className="w-full border border-[var(--line-1)] bg-[var(--tint-1)] py-3.5 pl-11 pr-4 text-[15px] text-[var(--text)] placeholder:text-[var(--text-3)] transition-colors focus:border-[var(--accent)]/60 focus:outline-none"
            />
          </label>
        </div>
      </section>

      {/* ---------- Daftar sertifikat ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((cert, i) => (
            <Reveal key={cert.slug} delay={(i % 3) * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-full"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(cert)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(cert);
                    }
                  }}
                  className="group flex h-full cursor-pointer flex-col border border-[var(--line-1)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)]"
                >
                  {/* Gambar */}
                  <div className="flex items-center justify-center bg-[var(--surface-3)] p-8">
                    <Media
                      src={cert.image}
                      alt={t(cert.title)}
                      className="aspect-[1/1.35] w-[68%] border border-[var(--line-1)] bg-white object-contain"
                    />
                  </div>

                  {/* Keterangan */}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                        {t(cert.category)}
                      </p>
                      {cert.placeholder && <SampleBadge />}
                    </div>

                    <h2 className="mb-3.5 text-2xl font-bold leading-snug tracking-tight text-[var(--text)]">
                      {t(cert.title)}
                    </h2>

                    <p className="text-[15px] text-[var(--text-2)]">
                      {t(cert.issuer)}
                      <span className="mx-2 text-[var(--muted)]">/</span>
                      {cert.date}
                    </p>

                    {cert.credential && cert.credential !== "—" && (
                      <span className="mt-5 w-fit border border-[var(--line-1)] px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-[var(--text-2)]">
                        {cert.credential}
                      </span>
                    )}

                    <div className="mt-auto flex flex-wrap items-center gap-5 pt-6">
                      <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                        {t("cert.viewDetails")}
                        <IconArrow className="transition-transform group-hover:translate-x-1" />
                      </span>

                      {cert.href && (
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm font-semibold text-[var(--text-2)] transition-colors hover:text-[var(--accent)]"
                        >
                          {t("cert.verify")}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="border border-[var(--line-1)] py-20 text-center">
            <p className="mb-5 text-[15px] text-[var(--muted)]">{t("cert.noResults")}</p>
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

      <AnimatePresence>
        {selected && <CertificateModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
