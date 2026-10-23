import React, { useState } from 'react';

/**
 * Gambar dengan fallback: kalau file belum ada di /public,
 * tampil placeholder yang menyebutkan path yang diharapkan
 * sehingga layout tidak rusak.
 */
export default function Media({ src, alt = "", className = "", frame = "" }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-[var(--ph-from)] to-[var(--ph-to)] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2.5 px-6 text-center text-[var(--text-3)]">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="opacity-60">
            <rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="9.5" r="1.6" fill="currentColor" />
            <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {src && (
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
              {src.replace(/^\//, "public/")}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${frame} ${className}`}
    />
  );
}
