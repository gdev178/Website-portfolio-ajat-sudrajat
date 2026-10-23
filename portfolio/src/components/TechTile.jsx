import React from 'react';

/**
 * Ubin logo teknologi — monogram dengan warna khas tiap tools.
 * Sengaja digambar sendiri supaya tidak perlu aset eksternal.
 */
export default function TechTile({ mono, bg, fg = "#ffffff", border }) {
  return (
    <span
      className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-[13px] font-bold leading-none"
      style={{
        backgroundColor: bg,
        color: fg,
        border: border ? `1px solid ${border}` : "1px solid rgba(255,255,255,0.08)",
      }}
      aria-hidden="true"
    >
      {mono}
    </span>
  );
}
