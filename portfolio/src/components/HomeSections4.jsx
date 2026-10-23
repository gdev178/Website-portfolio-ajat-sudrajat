import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import { EMAIL, FINAL_CTA, GUESTBOOK_PUBLIC, PHONE, SOCIALS, WHATSAPP } from '../data.js';
import { EASE, IconArrow, PageHeading, Reveal, SectionLabel } from './ui.jsx';
import {
  IconMail,
  IconChat,
  IconSend,
  IconGithub,
  IconLinkedIn,
  IconInstagram,
  IconYoutube,
  IconFacebook,
  IconTiktok,
} from './social-icons.jsx';

// Kunci sama seperti SocialLink::ICONS di CMS (app/Models/SocialLink.php)
const SOCIAL_ICON_MAP = {
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
  github: IconGithub,
  youtube: IconYoutube,
  facebook: IconFacebook,
  tiktok: IconTiktok,
};

/* ============ 09 / Start a Conversation ============ */

export function Conversation() {
  const { t } = useLang();

  // Ikon mail/chat sudah dapat baris sendiri di atas — tidak diulang di
  // grid ini. Entri tanpa href asli (belum diisi di CMS) disembunyikan.
  const socialButtons = SOCIALS.filter(
    (s) => s.icon && s.icon !== "mail" && s.icon !== "chat" && s.href
  ).map((s) => ({
    icon: SOCIAL_ICON_MAP[s.icon] ?? IconGithub,
    href: s.href,
    label: s.label,
  }));

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {/* --- Kartu kiri: ajakan kontak --- */}
      <Reveal>
        <div className="flex h-full flex-col border border-[var(--line-1)] bg-[var(--surface)] p-8 md:p-10">
          <SectionLabel index="09" className="mb-6">
            {t("label.conversation")}
          </SectionLabel>

          <PageHeading as="h2" className="mb-6">
            {t("home.conversationTitle")}
          </PageHeading>

          <p className="mb-9 max-w-lg text-[15px] leading-[1.8] text-[var(--text-2)] md:text-base">
            {t("home.conversationDetail")}
          </p>

          <div className="mb-7 flex flex-col gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-3.5 text-[15px] text-[var(--text-strong)] transition-colors hover:text-[var(--text)]"
            >
              <IconMail className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
              {EMAIL}
            </a>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3.5 text-[15px] text-[var(--text-strong)] transition-colors hover:text-[var(--text)]"
            >
              <IconChat className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
              {t("home.whatsappIntro")}
            </a>
          </div>

          <div className="mb-10 flex items-center gap-5">
            {socialButtons.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="text-[var(--muted)] transition-colors hover:text-[var(--text)]"
              >
                <Icon />
              </a>
            ))}
          </div>

          <Link
            to="/contact"
            className="group mt-auto inline-flex w-fit items-center gap-2.5 bg-[var(--contrast)] px-7 py-3.5 text-sm font-semibold text-[var(--contrast-ink)] transition-transform hover:scale-[1.04]"
          >
            {t("home.sendInquiry")}
            <IconSend className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      {/* --- Kartu kanan: testimoni --- */}
      <Reveal delay={0.08}>
        <div className="flex h-full flex-col border border-[var(--line-1)] bg-[var(--surface)] p-8 md:p-10">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.2em]">
              <span className="uppercase text-[var(--accent)]">{t("label.testimonials")}</span>
              <span className="text-[var(--muted)]">/</span>
              <span className="uppercase text-[var(--muted)]">
                {GUESTBOOK_PUBLIC.length} {t("home.testimonialsCount")}
              </span>
            </div>
            <IconChat className="h-5 w-5 shrink-0 text-[var(--accent)]" />
          </div>

          <PageHeading as="h2" className="mb-9">
            {t("home.testimonialsTitle")}
          </PageHeading>

          <div className="flex flex-col">
            {GUESTBOOK_PUBLIC.map((note, i) => (
              <div
                key={note.id ?? i}
                className={`py-6 ${i > 0 ? "border-t border-[var(--line-1)]" : "pt-0"}`}
              >
                <div className="mb-3.5 flex items-center gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/[0.08] font-mono text-[11px] font-semibold text-[var(--accent)]">
                    {note.initials}
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold text-[var(--text)]">
                      {typeof note.name === "string" ? note.name : t(note.name)}
                    </span>
                    {note.role && (
                      <span className="block text-[12px] text-[var(--muted)]">{t(note.role)}</span>
                    )}
                  </span>
                </div>
                <p className="pl-[3.15rem] text-[15px] leading-[1.7] text-[var(--text-2)]">
                  &ldquo;{t(note.message)}&rdquo;
                </p>
              </div>
            ))}

            {GUESTBOOK_PUBLIC.length === 0 && (
              <p className="text-[15px] leading-[1.7] text-[var(--muted)]">
                {t("contact.noComments")}
              </p>
            )}
          </div>

          <Link
            to="/contact"
            className="group mt-auto inline-flex w-fit items-center gap-2.5 pt-8 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--text)]"
          >
            {t("home.visitTestimonials")}
            <IconArrow className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* ============ 10 / Let's Make It Real ============ */

export function FinalCTA() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden border-y border-[var(--line-1)] bg-[var(--surface-2)]">
      {/* Cahaya latar */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.1),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center md:py-32">
        <Reveal>
          <SectionLabel index="10" className="mb-8 justify-center">
            {t("label.makeItReal")}
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            className="mb-7 font-bold leading-[1.02] tracking-tight text-[var(--text)]"
            style={{ fontSize: "clamp(2.3rem, 6vw, 4.6rem)", letterSpacing: "-0.035em" }}
          >
            {t(FINAL_CTA.headline)}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mb-11 max-w-xl text-[15px] leading-[1.8] text-[var(--text-2)] md:text-lg">
            {t(FINAL_CTA.detail)}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="group inline-flex items-center gap-2.5 bg-[var(--contrast)] px-8 py-4 text-sm font-semibold text-[var(--contrast-ink)]"
            >
              {t("home.startProject")}
              <IconArrow className="transition-transform group-hover:translate-x-1" />
            </motion.a>

            <Link
              to="/projects"
              className="border border-[var(--line-2)] bg-[var(--tint-2)] px-8 py-4 text-sm font-semibold text-[var(--text)] backdrop-blur-md transition-colors hover:border-[var(--line-3)] hover:bg-[var(--tint-3)]"
            >
              {t("home.viewAllProjects")}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-9 font-mono text-[11px] tracking-[0.18em] text-[var(--muted)]">
            {PHONE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
