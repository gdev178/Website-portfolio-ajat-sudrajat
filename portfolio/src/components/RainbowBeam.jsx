import React from 'react';
import { motion } from 'framer-motion';

// Beberapa bentuk kurva yang di-morph bergantian supaya pelanginya "hidup"
const PATHS = [
  "M-200 250 C 400 -50, 1000 450, 1640 150",
  "M-200 300 C 400 60, 1000 320, 1640 80",
  "M-200 190 C 400 -110, 1000 520, 1640 210",
  "M-200 270 C 400 20, 1000 380, 1640 120",
];

// Nilai awal eksplisit supaya framer-motion tidak sempat menulis d="undefined"
const MORPH_INITIAL = { d: PATHS[0] };

const MORPH = {
  d: [...PATHS, PATHS[0]],
};

const MORPH_TRANSITION = {
  duration: 18,
  repeat: Infinity,
  ease: "easeInOut",
  times: [0, 0.25, 0.5, 0.75, 1],
};

/**
 * Beam pelangi animasi.
 * - Kurva di-morph terus menerus (framer-motion)
 * - Gradasi warnanya mengalir kiri-kanan (SMIL <animate>, aman di semua browser modern)
 * - Seluruh beam melayang naik-turun pelan
 */
export default function RainbowBeam({
  intensity = 1,
  gradientId = "rainbow-grad",
  className = "",
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Vignette lembut */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: [0, -26, 6, 0], rotate: [0, 0.6, -0.6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full h-[52vh] mt-[18vh]">
          {/* Halo warna yang sangat blur */}
          <svg
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[150%] max-w-none h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl mix-blend-screen"
            style={{ opacity: 0.7 * intensity }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                {/* Gradasi bergerak: titik awal & akhir digeser terus */}
                <animate
                  attributeName="x1"
                  values="-60%;40%;-60%"
                  dur="9s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="x2"
                  values="60%;160%;60%"
                  dur="9s"
                  repeatCount="indefinite"
                />
                <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                <stop offset="22%" stopColor="rgba(120,190,255,0.65)" />
                <stop offset="45%" stopColor="rgba(0,255,150,0.55)" />
                <stop offset="68%" stopColor="rgba(255,120,50,0.6)" />
                <stop offset="86%" stopColor="rgba(255,40,40,0.5)" />
                <stop offset="100%" stopColor="rgba(150,60,255,0.45)" />
              </linearGradient>
            </defs>

            <motion.path
              initial={MORPH_INITIAL}
              animate={MORPH}
              transition={MORPH_TRANSITION}
              d={PATHS[0]}
              stroke={`url(#${gradientId})`}
              strokeWidth="130"
              strokeLinecap="round"
            />
          </svg>

          {/* Lapisan warna tengah, lebih tajam */}
          <svg
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[150%] max-w-none h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl mix-blend-screen"
            style={{ opacity: 0.75 * intensity }}
          >
            <motion.path
              initial={MORPH_INITIAL}
              animate={MORPH}
              transition={MORPH_TRANSITION}
              d={PATHS[0]}
              stroke={`url(#${gradientId})`}
              strokeWidth="46"
              strokeLinecap="round"
            />
          </svg>

          {/* Garis inti putih terang */}
          <svg
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[150%] max-w-none h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[7px] mix-blend-plus-lighter"
            style={{ opacity: 0.9 * intensity }}
          >
            <motion.path
              initial={MORPH_INITIAL}
              animate={MORPH}
              transition={MORPH_TRANSITION}
              d={PATHS[0]}
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
