import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import { postContact } from '../api.js';
import {
  ADDRESS,
  BUDGET_OPTIONS,
  CONTACT_CHANNELS,
  GUESTBOOK,
  LOCATION_SHORT,
  PHONE,
  PROJECT_TYPE_OPTIONS,
  WHATSAPP,
} from '../data.js';
import { EASE, PageHeading, Reveal } from '../components/ui.jsx';
import {
  IconChat,
  IconGithub,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconSend,
  IconYoutube,
} from '../components/social-icons.jsx';

const CHANNEL_ICONS = {
  mail: IconMail,
  chat: IconChat,
  linkedin: IconLinkedIn,
  github: IconGithub,
  instagram: IconInstagram,
  youtube: IconYoutube,
};

const fieldClass =
  "w-full border border-[var(--line-1)] bg-[var(--field)] px-4 py-3.5 text-[15px] text-[var(--text)] placeholder:text-[var(--text-3)] transition-colors focus:border-[var(--accent)]/60 focus:outline-none";

const labelClass = "mb-2.5 block text-[15px] font-semibold text-[var(--text)]";

function IconAt() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M16 8v5.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.6 7.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 15.5 19.3 17.7 21.5 18.5 19.3 19.3 18.5 21.5 17.7 19.3 15.5 18.5 17.7 17.7 18.5 15.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPinLarge() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconArrowOut() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================= Formulir pesan ================= */

function MessageForm() {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    projectType: PROJECT_TYPE_OPTIONS[0].en,
    budget: BUDGET_OPTIONS[0].en,
    message: "",
    website: "", // honeypot - kolom tersembunyi, manusia tidak mengisi ini
  });
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await postContact({
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        subject: form.subject,
        project_type: form.projectType,
        budget: form.budget,
        message: form.message,
        website: form.website,
      });
      setStatus("sent");
      setForm((f) => ({ ...f, subject: "", message: "" }));
    } catch {
      setStatus("error");
    }
  };

  // Cadangan kalau API tidak terjangkau: buka WhatsApp dengan isi yang sudah lengkap
  const whatsappFallback = () => {
    const lines = [
      form.subject || `Permintaan dari ${form.name}`,
      "",
      form.message,
      "",
      `${t("contact.name")}: ${form.name}`,
      `${t("contact.email")}: ${form.email}`,
    ].join("\n");
    window.open(`${WHATSAPP}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  return (
    <div className="relative overflow-hidden border border-[var(--line-1)] bg-[var(--surface)] p-8 md:p-10">
      <div className="mb-9 flex items-start justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {t("contact.projectContext")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
            {t("contact.sendMessage")}
          </h2>
        </div>
        <span className="grid h-14 w-14 shrink-0 place-items-center border border-[var(--accent)]/25 bg-[var(--accent)]/[0.08] text-[var(--accent)]">
          <IconSend />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label>
            <span className={labelClass}>{t("contact.name")}</span>
            <input required type="text" value={form.name} onChange={update("name")} className={fieldClass} />
          </label>
          <label>
            <span className={labelClass}>{t("contact.email")}</span>
            <input required type="email" value={form.email} onChange={update("email")} className={fieldClass} />
          </label>
          <label>
            <span className={labelClass}>WhatsApp</span>
            <input type="tel" value={form.whatsapp} onChange={update("whatsapp")} className={fieldClass} />
          </label>
          <label>
            <span className={labelClass}>{t("contact.subject")}</span>
            <input type="text" value={form.subject} onChange={update("subject")} className={fieldClass} />
          </label>
          <label>
            <span className={labelClass}>{t("contact.projectType")}</span>
            <select value={form.projectType} onChange={update("projectType")} className={fieldClass}>
              {PROJECT_TYPE_OPTIONS.map((opt) => (
                <option key={opt.en} value={opt.en}>
                  {t(opt)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelClass}>{t("contact.budget")}</span>
            <select value={form.budget} onChange={update("budget")} className={fieldClass}>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.en} value={opt.en}>
                  {t(opt)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          <span className={labelClass}>{t("contact.message")}</span>
          <textarea
            required
            rows={8}
            value={form.message}
            onChange={update("message")}
            placeholder={t("contact.messagePlaceholder")}
            className={`${fieldClass} resize-y`}
          />
        </label>

        {/* Honeypot: kolom tersembunyi dari mata manusia, bot mengisinya */}
        <label className="absolute -left-[9999px]" aria-hidden="true">
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update("website")}
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex w-fit items-center gap-2.5 bg-[var(--contrast)] px-7 py-3.5 text-sm font-semibold text-[var(--contrast-ink)] transition-transform hover:scale-[1.04] disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "sending" ? t("contact.sending") : t("contact.send")}
            <IconSend className="transition-transform group-hover:translate-x-1" />
          </button>

          {status === "error" && (
            <button
              type="button"
              onClick={whatsappFallback}
              className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {t("contact.orWhatsapp")}
            </button>
          )}
        </div>

        {status === "sent" && (
          <p className="text-[14px] font-medium text-[var(--ok)]">{t("contact.sentSuccess")}</p>
        )}
        {status === "error" && (
          <p className="text-[14px] font-medium text-[#f87171]">{t("contact.sentError")}</p>
        )}
      </form>
    </div>
  );
}

/* ================= Testimoni ================= */

/**
 * Read-only dengan sengaja: testimoni diisi dari admin CMS, bukan
 * ditulis pengunjung. Tidak ada endpoint tulis publik untuk ini
 * (lihat CMS-SKEMA.md) — jadi tidak ada form kirim, Like, atau Reply.
 */
function Testimonials() {
  const { t } = useLang();

  return (
    <div className="border border-[var(--line-1)] bg-[var(--surface)] p-8 md:p-10">
      <div className="mb-2">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {t("label.testimonials")}
        </p>
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
          {t("contact.testimonialsHeading")}
        </h2>
        <p className="text-[14px] text-[var(--text-3)]">{t("contact.testimonialsIntro")}</p>
      </div>

      <div className="mt-8 flex flex-col">
        {GUESTBOOK.map((entry, i) => (
          <div
            key={entry.id}
            className={`py-6 ${i > 0 ? "border-t border-[var(--line-1)]" : "pt-0"}`}
          >
            <div className="mb-3.5 flex flex-wrap items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/[0.08] font-mono text-[11px] font-semibold text-[var(--accent)]">
                {entry.initials}
              </span>
              <span>
                <span className="block text-[15px] font-bold text-[var(--text)]">
                  {typeof entry.name === "string" ? entry.name : t(entry.name)}
                </span>
                {entry.role && (
                  <span className="block text-[12px] text-[var(--muted)]">{t(entry.role)}</span>
                )}
              </span>

              {entry.placeholder && (
                <span className="border border-[var(--warn)]/40 bg-[var(--warn)]/[0.1] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--warn)]">
                  {t("cert.sample")}
                </span>
              )}
              {entry.pinned && (
                <span className="ml-auto border border-[var(--accent)]/35 bg-[var(--accent)]/[0.08] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--accent)]">
                  {t("contact.pinned")}
                </span>
              )}
            </div>

            <p className="pl-[3.25rem] text-[15px] leading-[1.75] text-[var(--text-2)]">
              &ldquo;{typeof entry.message === "string" ? entry.message : t(entry.message)}&rdquo;
            </p>

            {entry.projectRef && (
              <p className="mt-2 pl-[3.25rem] text-[13px] text-[var(--muted)]">
                {entry.projectRef}
              </p>
            )}
          </div>
        ))}

        {GUESTBOOK.length === 0 && (
          <p className="py-8 text-[15px] text-[var(--muted)]">{t("contact.noComments")}</p>
        )}
      </div>
    </div>
  );
}

/* ================= Halaman ================= */

export default function Contact() {
  const { t } = useLang();

  const highlights = [
    { icon: IconChat, label: t("contact.hlResponse"), title: t("contact.hlResponseValue") },
    { icon: IconAt, label: t("contact.hlFocus"), title: t("contact.hlFocusValue") },
    { icon: IconSpark, label: t("contact.hlSupport"), title: t("contact.hlSupportValue") },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
      {/* ---------- Kepala halaman ---------- */}
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="mb-7 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
              {t("contact.label")}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <PageHeading className="mb-7 max-w-[16ch]">{t("contact.headline")}</PageHeading>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
              {t("contact.intro")}
            </p>
          </Reveal>
        </div>

        {/* Tiga kolom ringkas */}
        <Reveal delay={0.18}>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-[var(--line-1)] bg-[var(--tint-3)] sm:grid-cols-3">
            {highlights.map(({ icon: Icon, label, title }) => (
              <div key={label} className="bg-[var(--surface)] p-6">
                <span className="mb-9 block text-[var(--accent)]">
                  <Icon />
                </span>
                <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                  {label}
                </p>
                <p className="text-[17px] font-bold tracking-tight text-[var(--text)]">{title}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="my-14 h-px w-full bg-[var(--tint-3)]" />

      {/* ---------- Formulir + buku tamu ---------- */}
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <Reveal>
            <MessageForm />
          </Reveal>

          {/* Kartu kanal kontak */}
          <div className="grid gap-6 sm:grid-cols-2">
            {CONTACT_CHANNELS.map((channel, i) => {
              const Icon = CHANNEL_ICONS[channel.icon] ?? IconMail;
              const Wrapper = channel.href ? "a" : "div";
              const linkProps = channel.href
                ? {
                    href: channel.href,
                    target: channel.href.startsWith("http") ? "_blank" : undefined,
                    rel: channel.href.startsWith("http") ? "noreferrer" : undefined,
                  }
                : {};

              return (
                <Reveal key={channel.title} delay={(i % 2) * 0.06}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.35, ease: EASE }}>
                    <Wrapper
                      {...linkProps}
                      className="group block h-full border border-[var(--line-1)] bg-[var(--surface)] p-7 transition-colors hover:border-[var(--accent)]/40"
                    >
                      <div className="mb-9 flex items-start justify-between">
                        <span className="grid h-12 w-12 place-items-center border border-[var(--accent)]/25 bg-[var(--accent)]/[0.08] text-[var(--accent)]">
                          <Icon />
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--muted)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                        {t(channel.label)}
                      </p>
                      <p className="mb-2 text-2xl font-bold tracking-tight text-[var(--text)]">
                        {channel.title}
                      </p>

                      <div className="flex items-end justify-between gap-4">
                        <span className="break-all text-[15px] text-[var(--text-2)]">
                          {channel.value}
                        </span>
                        {channel.href && (
                          <span className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                            <IconArrowOut />
                          </span>
                        )}
                      </div>
                    </Wrapper>
                  </motion.div>
                </Reveal>
              );
            })}

            {/* Kartu lokasi */}
            <Reveal delay={0.12} className="sm:col-span-2">
              <div className="border border-[var(--line-1)] bg-[var(--surface)] p-7">
                <div className="mb-9 flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center border border-[var(--accent)]/25 bg-[var(--accent)]/[0.08] text-[var(--accent)]">
                    <IconPinLarge />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--muted)]">
                    GMT+7
                  </span>
                </div>

                <p className="mb-2 text-2xl font-bold tracking-tight text-[var(--text)]">
                  {t(LOCATION_SHORT)}
                </p>
                <p className="mb-4 text-[15px] leading-[1.7] text-[var(--text-2)]">{ADDRESS}</p>
                <p className="text-[15px] text-[var(--ok)]">{t("home.available")}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.08}>
          <Testimonials />
        </Reveal>
      </div>
    </div>
  );
}
