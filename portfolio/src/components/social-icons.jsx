import React from 'react';

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function IconMail({ className = "" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" {...line} className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconChat({ className = "" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" {...line} className={className}>
      <path d="M20.5 12a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l.9-4.7A8.5 8.5 0 1 1 20.5 12Z" />
    </svg>
  );
}

export function IconSend({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...line} className={className}>
      <path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
    </svg>
  );
}

export function IconGithub({ className = "" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function IconLinkedIn({ className = "" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-.95 1.82-1.96 3.75-1.96 4 0 4.4 2.5 4.4 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4V9Z" />
    </svg>
  );
}

export function IconInstagram({ className = "" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" {...line} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconYoutube({ className = "" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.5 7.2a2.7 2.7 0 0 0-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 0 0 1.5 7.2C1 8.9 1 12 1 12s0 3.1.5 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9c.5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
    </svg>
  );
}

export function IconTiktok({ className = "" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.5 2h-3.2v13.6a2.9 2.9 0 1 1-2.9-3c.2 0 .4 0 .6.05V9.5a6.1 6.1 0 1 0 5.5 6.1V8.4a7.8 7.8 0 0 0 4.6 1.5V6.7a4.6 4.6 0 0 1-4.6-4.6Z" />
    </svg>
  );
}

export function IconFacebook({ className = "" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.6c0-.9.25-1.55 1.6-1.55h1.7V3.2C16.5 3.15 15.5 3 14.35 3c-2.4 0-4.05 1.45-4.05 4.15v2.55H7.6v3.2h2.7V21h3.2Z" />
    </svg>
  );
}

export function IconArrowUp({ className = "" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...line} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16V8m0 0-3.5 3.5M12 8l3.5 3.5" />
    </svg>
  );
}
