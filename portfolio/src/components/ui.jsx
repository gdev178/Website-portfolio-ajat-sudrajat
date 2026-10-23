import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE_PHOTO } from '../data.js';

export const EASE = [0.16, 1, 0.3, 1];

/** Muncul saat masuk viewport */
export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 46, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Label section bergaya "01 / ABOUT ME" */
export function SectionLabel({ index, children, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.2em] ${className}`}>
      <span className="text-[var(--accent)]">{index}</span>
      <span className="text-[var(--muted)]">/</span>
      <span className="uppercase text-[var(--muted)]">{children}</span>
    </div>
  );
}

/**
 * Judul besar. Default <h1> untuk judul halaman;
 * pakai as="h2" untuk section di dalam halaman.
 */
export function PageHeading({ children, className = "", as: Tag = "h1" }) {
  return (
    <Tag
      className={`font-bold leading-[1.05] tracking-tight text-[var(--text)] ${className}`}
      style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.9rem)", letterSpacing: "-0.03em" }}
    >
      {children}
    </Tag>
  );
}

/**
 * Foto profil. Kalau public/profile.jpg belum ada,
 * otomatis jatuh ke placeholder siluet agar layout tetap utuh.
 */
export function ProfilePhoto({ className = "", grayscale = false, alt = "", src = PROFILE_PHOTO }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-b from-[var(--ph-from)] to-[var(--ph-to)] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-3 px-6 text-center text-[var(--text-3)]">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="opacity-45">
            <circle cx="12" cy="8" r="4" fill="currentColor" />
            <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" fill="currentColor" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            public/profile.jpg
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${grayscale ? "grayscale" : ""} ${className}`}
    />
  );
}

/** Ikon-ikon kecil */
export function IconArrow({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDownload({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPin({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function IconExternal({ className = "" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 17 17 7m0 0h-7m7 0v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m4 12.5 5 5L20 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
