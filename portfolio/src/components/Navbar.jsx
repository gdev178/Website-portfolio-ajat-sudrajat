import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import { useTheme } from '../theme.jsx';
import { BRAND, BRAND_SUFFIX, OWNER_INITIALS, LOGO_IMAGE } from '../data.js';

const NAV_ITEMS = [
  { to: "/", key: "nav.home", end: true },
  { to: "/about", key: "nav.about" },
  { to: "/projects", key: "nav.projects" },
  { to: "/creative-works", key: "nav.creative" },
  { to: "/certificates", key: "nav.certificates" },
  { to: "/contact", key: "nav.contact" },
];

function Logo() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = LOGO_IMAGE && !photoFailed;

  return (
    <Link to="/" className="flex items-center gap-3">
      {showPhoto ? (
        <img
          src={LOGO_IMAGE}
          alt={OWNER_INITIALS}
          onError={() => setPhotoFailed(true)}
          className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-[var(--shadow)] md:h-11 md:w-11"
        />
      ) : (
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--contrast)] text-[var(--contrast-ink)] shadow-lg shadow-[var(--shadow)] md:h-11 md:w-11">
          <span className="text-lg font-bold leading-none tracking-tight md:text-xl">
            {OWNER_INITIALS}
          </span>
        </span>
      )}
      <span className="leading-none">
        <span className="block text-sm font-bold tracking-[0.14em] text-[var(--text)] md:text-base">
          {BRAND}
        </span>
        <span className="mt-1 block text-[9px] font-medium tracking-[0.22em] text-[var(--muted)]">
          {BRAND_SUFFIX}
        </span>
      </span>
    </Link>
  );
}

function IconSun() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tombol ganti Mode Pro / Mode Spiderman. Label menunjukkan mode tujuan. */
function ThemeToggle({ compact = false }) {
  const { t } = useLang();
  const { theme, toggleTheme } = useTheme();

  const goingSpiderman = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={goingSpiderman ? t("nav.themeLight") : t("nav.themeDark")}
      title={goingSpiderman ? t("nav.themeLight") : t("nav.themeDark")}
      className={`flex items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--tint-1)] px-4 py-2 text-[13px] font-medium text-[var(--text-2)] transition-colors hover:border-[var(--line-3)] hover:text-[var(--text)] ${
        compact ? "w-full justify-center" : ""
      }`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="grid place-items-center text-[var(--accent)]"
      >
        {goingSpiderman ? <IconSun /> : <IconMoon />}
      </motion.span>
      {goingSpiderman ? t("nav.themeLight") : t("nav.themeDark")}
    </button>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center rounded-md border border-[var(--line-2)] p-0.5">
      {[
        { code: "en", label: "EN" },
        { code: "id", label: "IND" },
      ].map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          className={`rounded px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] transition-colors ${
            lang === option.code
              ? "bg-[var(--accent)] text-[var(--accent-ink)]"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Tutup menu mobile setiap ganti halaman
  React.useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line-1)] bg-[var(--bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3.5 md:px-8 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-[15px] font-medium transition-colors ${
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-2)] hover:text-[var(--text)]"
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <LangSwitch />
          <Link
            to="/contact"
            className="rounded-lg bg-[var(--contrast)] px-5 py-2.5 text-sm font-semibold text-[var(--contrast-ink)] transition-transform hover:scale-[1.04]"
          >
            {t("nav.contactMe")}
          </Link>
        </div>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={t("nav.menu")}
          className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--line-2)] text-[var(--text)] lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Panel menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--line-1)] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4 md:px-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--tint-2)] text-[var(--accent)]"
                        : "text-[var(--text-2)] hover:bg-[var(--tint-1)] hover:text-[var(--text)]"
                    }`
                  }
                >
                  {t(item.key)}
                </NavLink>
              ))}

              <div className="mt-3 flex items-center justify-between gap-3">
                <LangSwitch />
                <Link
                  to="/contact"
                  className="rounded-lg bg-[var(--contrast)] px-5 py-2.5 text-sm font-semibold text-[var(--contrast-ink)]"
                >
                  {t("nav.contactMe")}
                </Link>
              </div>
              <div className="mt-2">
                <ThemeToggle compact />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
