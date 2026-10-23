import React from 'react';

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function IconBriefcase(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7" />
      <path d="M2.5 12.5h19" />
    </svg>
  );
}

export function IconAward(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.8-1.2 7L12 18.6l4.7 2.2-1.2-7" />
    </svg>
  );
}

export function IconSparkles(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5Z" />
      <path d="M18.5 15.5 19.3 17.7 21.5 18.5 19.3 19.3 18.5 21.5 17.7 19.3 15.5 18.5 17.7 17.7 18.5 15.5Z" />
    </svg>
  );
}

export function IconCode(props) {
  return (
    <svg {...base} {...props}>
      <path d="m8.5 8-5 4 5 4M15.5 8l5 4-5 4M13.5 4.5l-3 15" />
    </svg>
  );
}

export function IconMonitor(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8.5 20.5h7M12 17v3.5" />
    </svg>
  );
}

export function IconWrench(props) {
  return (
    <svg {...base} {...props}>
      <path d="M15.2 3.4a5.5 5.5 0 0 0-6.6 7.1l-5.1 5.1a2 2 0 0 0 0 2.8l2.1 2.1a2 2 0 0 0 2.8 0l5.1-5.1a5.5 5.5 0 0 0 7.1-6.6l-3.3 3.3-3.4-3.4 3.3-3.3Z" />
    </svg>
  );
}

export function IconPalette(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2a8.8 8.8 0 0 0 0 17.6c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.8-1.7h1.6a4.6 4.6 0 0 0 4.6-4.6c0-4-3.9-7.2-8.8-7.2Z" />
      <circle cx="7.8" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.2" cy="8.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCamera(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 8.5h2.6l1.4-2.4h9l1.4 2.4h2.6a1 1 0 0 1 1 1v8.4a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13.6" r="3.4" />
    </svg>
  );
}

export function IconLayers(props) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3.5 12.5 8.5 4.7 8.5-4.7M3.5 16.8l8.5 4.7 8.5-4.7" />
    </svg>
  );
}

export function IconFilm(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M8 4.5v15M16 4.5v15M3 12h18M3 8.2h5M3 15.8h5M16 8.2h5M16 15.8h5" />
    </svg>
  );
}

export function IconChevronRight({ className = "" }) {
  return (
    <svg {...base} width="14" height="14" className={className}>
      <path d="m9.5 5.5 6 6.5-6 6.5" />
    </svg>
  );
}
