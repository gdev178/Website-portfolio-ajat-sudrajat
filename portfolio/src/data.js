import { L } from './i18n.jsx';

/* =========================================================
   JEMBATAN KE CMS
   ========================================================= *
 * Laravel menyuntikkan `window.__CONTENT__` ke HTML saat halaman dimuat
 * (lihat CLAUDE.md bagian 9 "Cara menyambungkan React"). Kalau nilainya
 * belum ada — situs dijalankan lepas dari Laravel, atau modul CMS untuk
 * bagian itu belum dibangun — setiap konstanta di bawah jatuh ke data
 * statis yang sama seperti sebelum CMS ada. Jangan hapus fallback-nya.
 *
 * CATATAN SEMENTARA (mode uji CMS): seluruh fallback teks di bawah ini
 * sengaja diganti jadi "Lorem Ipsum" generik supaya jelas terlihat kapan
 * sebuah field benar-benar dibaca dari admin vs masih kosong. Teks asli
 * (deskripsi layanan turunan dari EXPERTISE, dst.) ada di
 * `data.js.backup-before-lorem` di root proyek — kembalikan dari situ
 * setelah pengujian selesai.
 */
const CMS = (typeof window !== 'undefined' && window.__CONTENT__) || null;

const cmsIdentitas = CMS?.identitas ?? {};
const cmsHero = CMS?.hero ?? {};
const cmsAbout = CMS?.about ?? {};
const cmsHighlights = CMS?.highlights ?? {};
const cmsSnapshot = CMS?.snapshot ?? {};
const cmsBuild = CMS?.build ?? {};
const cmsProcess = CMS?.process ?? {};
const cmsCta = CMS?.cta ?? {};
const cmsPractice = CMS?.practice ?? {};
const cmsEcosystem = CMS?.ecosystem ?? {};
const cmsValues = CMS?.values ?? {};
const cmsTools = CMS?.tools ?? {};
const cmsAboutCta = CMS?.aboutCta ?? {};

/* ---------- Lorem ipsum generik, dipakai berulang di bawah ---------- */
const LOREM_S = L("Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet.");
const LOREM_M = L(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
);
const LOREM_L = L(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
);
const LOREM_WORD = L("Lorem Ipsum", "Lorem Ipsum");

/* =========================================================
   IDENTITAS  — data asli klien
   ========================================================= */

export const OWNER_FIRST = cmsIdentitas.namaDepan ?? "Lorem";
export const OWNER_LAST = cmsIdentitas.namaBelakang ?? "Ipsum";
export const OWNER_NAME = `${OWNER_FIRST} ${OWNER_LAST}`;
export const OWNER_INITIALS = cmsIdentitas.inisial ?? "LI";
export const BRAND = cmsIdentitas.brand ?? "LOREM";
export const BRAND_SUFFIX = cmsIdentitas.brandSuffix ?? "/ IPSUM";

export const EMAIL = cmsIdentitas.email ?? "lorem@ipsum.test";
export const PHONE = cmsIdentitas.telepon ?? "0000-0000-0000";

/** "0813-2053-6570" -> "6281320536570", supaya tautan wa.me selalu benar */
function toWhatsAppNumber(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}
export const PHONE_INTL = toWhatsAppNumber(PHONE);
export const WHATSAPP = `https://wa.me/${PHONE_INTL}`;

export const ADDRESS = cmsIdentitas.alamat ?? LOREM_M.id;
export const LOCATION_SHORT = cmsIdentitas.lokasiSingkat ?? L("Lorem, Ipsum", "Lorem, Ipsum");

export const ROLE = cmsIdentitas.jabatan ?? LOREM_WORD;

/** Foto profil (mode terang) — taruh file di public/profile.jpg kalau belum diisi lewat admin */
export const PROFILE_PHOTO = cmsIdentitas.foto ?? "/profile.jpg";
/** Foto Hero khusus mode gelap — jatuh ke PROFILE_PHOTO kalau belum diisi terpisah */
export const PROFILE_PHOTO_DARK = cmsIdentitas.fotoGelap ?? PROFILE_PHOTO;
/** Foto blok About (Beranda section 01 + halaman /about) — beda dari foto Hero. Jatuh ke PROFILE_PHOTO kalau belum diisi terpisah */
export const ABOUT_PHOTO = cmsIdentitas.fotoAbout ?? PROFILE_PHOTO;
/** Logo navbar — beda dari foto profil; null kalau belum diisi (jatuh ke inisial) */
export const LOGO_IMAGE = cmsIdentitas.logo ?? null;
/** CV — taruh file di public/cv.pdf kalau belum diisi lewat admin */
export const CV_FILE = cmsIdentitas.cv ?? "/cv.pdf";

/** Chip yang tampil di layar intro */
export const INTRO_CATEGORIES = [
  "ATM / CRM",
  "Networking",
  "CCTV",
  "TKJ",
  "Desain Grafis",
  "Web & Apps",
];

/* =========================================================
   HERO
   ========================================================= */

export const HERO = {
  headlineTop: cmsHero.judulAtas ?? LOREM_WORD,
  headlineAccent: cmsHero.judulAksen ?? LOREM_WORD,
  lead: cmsHero.lead ?? LOREM_L,
  sub: cmsHero.sub ?? LOREM_M,
};

/* =========================================================
   ABOUT
   ========================================================= */

export const ABOUT = {
  headline: cmsAbout.judulBlok ?? LOREM_M,
  body: cmsAbout.isi ?? LOREM_L,
  quote: cmsAbout.kutipan ?? LOREM_S,
  supportCard: cmsAbout.kartuDukungan ?? LOREM_M,
  tags: [ROLE, LOCATION_SHORT, L("Available for projects", "Terbuka untuk proyek")],

  /* ---- khusus halaman /about ---- */
  heroHeadline: cmsAbout.judulHalaman ?? LOREM_M,
  lead: cmsAbout.lead ?? LOREM_L,
};

/* ---------- My Practice ---------- */

export const PRACTICE = {
  headline: cmsPractice.headline ?? LOREM_M,
  detail: cmsPractice.detail ?? LOREM_L,
  items: cmsPractice.items?.length ? cmsPractice.items : [
    { icon: "wrench", title: LOREM_WORD, detail: LOREM_M },
    { icon: "monitor", title: LOREM_WORD, detail: LOREM_M },
    { icon: "palette", title: LOREM_WORD, detail: LOREM_M },
  ],
};

/* ---------- Ekosistem keahlian ---------- */

export const ECOSYSTEM = {
  headline: cmsEcosystem.headline ?? LOREM_M,
  centre: cmsEcosystem.centre?.title ? cmsEcosystem.centre : {
    icon: "wrench",
    title: LOREM_WORD,
    subtitle: LOREM_S,
  },
  items: cmsEcosystem.items?.length ? cmsEcosystem.items : [
    { icon: "monitor", title: LOREM_WORD, subtitle: LOREM_S },
    { icon: "camera", title: LOREM_WORD, subtitle: LOREM_S },
    { icon: "briefcase", title: LOREM_WORD, subtitle: LOREM_S },
    { icon: "palette", title: LOREM_WORD, subtitle: LOREM_S },
    { icon: "code", title: LOREM_WORD, subtitle: LOREM_S },
  ],
};

/* ---------- Nilai kerja ---------- */

export const VALUES = {
  headline: cmsValues.headline ?? LOREM_M,
  items: cmsValues.items?.length ? cmsValues.items : [LOREM_S, LOREM_S, LOREM_S, LOREM_S],
};

export const TOOLS_LIST = cmsTools.list?.length ? cmsTools.list : [
  "Lorem", "Ipsum", "Dolor", "Sit", "Amet",
];

export const TOOLS_NOTE = cmsTools.note ?? LOREM_L;

export const ABOUT_CTA = {
  headline: cmsAboutCta.headline ?? LOREM_M,
  detail: cmsAboutCta.detail ?? LOREM_M,
};

/* =========================================================
   ENAM BIDANG KEAHLIAN  — sumber utama konten
   ========================================================= */

const EXPERTISE_FALLBACK = [
  {
    key: "atm",
    icon: "wrench",
    accent: "#38bdf8",
    title: L("Lorem Ipsum 1", "Lorem Ipsum 1"),
    years: LOREM_S,
    yearsShort: "8",
    detail: LOREM_M,
    points: [LOREM_S, LOREM_S],
  },
  {
    key: "network",
    icon: "monitor",
    accent: "#34d399",
    title: L("Lorem Ipsum 2", "Lorem Ipsum 2"),
    years: LOREM_S,
    yearsShort: "4",
    detail: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S],
  },
  {
    key: "cctv",
    icon: "camera",
    accent: "#fbbf24",
    title: L("Lorem Ipsum 3", "Lorem Ipsum 3"),
    years: LOREM_S,
    yearsShort: "2",
    detail: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S, LOREM_S],
  },
  {
    key: "tkj",
    icon: "briefcase",
    accent: "#a78bfa",
    title: L("Lorem Ipsum 4", "Lorem Ipsum 4"),
    detail: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S, LOREM_S, LOREM_S],
  },
  {
    key: "design",
    icon: "palette",
    accent: "#f472b6",
    title: L("Lorem Ipsum 5", "Lorem Ipsum 5"),
    detail: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S],
  },
  {
    key: "web",
    icon: "code",
    accent: "#22d3ee",
    title: L("Lorem Ipsum 6", "Lorem Ipsum 6"),
    detail: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S],
  },
];

/** CMS jadi sumber begitu punya bidang keahlian terbit; sebelum itu, pakai fallback */
export const EXPERTISE = CMS?.expertise?.length ? CMS.expertise : EXPERTISE_FALLBACK;

/* =========================================================
   HOME — highlight, snapshot, what I build
   ========================================================= */

export const HOME_HIGHLIGHTS = cmsHighlights.cards?.length ? cmsHighlights.cards : [
  { icon: "sparkles", value: "8+", title: LOREM_WORD, detail: LOREM_S, bar: 0.85 },
  { icon: "briefcase", value: "6", title: LOREM_WORD, detail: LOREM_S, bar: 0.75 },
  { icon: "award", value: "50+", title: LOREM_WORD, detail: LOREM_S, bar: 0.65 },
];

export const HOME_FOCUS = cmsHighlights.focus?.length ? cmsHighlights.focus : [
  { label: LOREM_WORD, value: LOREM_S },
  { label: LOREM_WORD, value: LOREM_S },
  { label: LOREM_WORD, value: LOREM_S },
];

export const SNAPSHOT = {
  headline: cmsSnapshot.headline ?? LOREM_M,
  bigValue: cmsSnapshot.bigValue ?? "8",
  bigDetail: cmsSnapshot.bigDetail ?? LOREM_M,
  metrics: cmsSnapshot.metrics?.length ? cmsSnapshot.metrics : [
    { label: LOREM_WORD, value: "06" },
    { label: LOREM_WORD, value: "04" },
    { label: LOREM_WORD, value: "02" },
    { label: LOREM_WORD, value: LOREM_S, accent: true },
  ],
  activityLabel: cmsSnapshot.activityLabel ?? LOREM_WORD,
  activity: cmsSnapshot.activity?.length ? cmsSnapshot.activity : [2, 0, 1, 1, 0, 2, 1, 0, 1, 1, 2, 0, 1, 0, 1, 2, 0, 1],
};

export const BUILD_MAIN = {
  title: cmsBuild.title ?? LOREM_M,
  detail: cmsBuild.detail ?? LOREM_L,
  points: cmsBuild.points?.length ? cmsBuild.points : [LOREM_S, LOREM_S, LOREM_S],
};

/** Empat kartu di section "What I Build" — diambil dari EXPERTISE */
export const BUILD_ITEMS = EXPERTISE.filter((e) =>
  ["network", "cctv", "tkj", "design"].includes(e.key)
).map((e) => ({ icon: e.icon, title: e.title, detail: e.detail }));

/* =========================================================
   PROYEK — sumber tunggal untuk halaman /projects,
   halaman detail, section 04 di Home, dan footer.
   ========================================================= */

export const PROJECT_TYPES = [
  L("Client Work", "Pekerjaan Klien"),
  L("Company Project", "Proyek Perusahaan"),
  L("Personal Project", "Proyek Pribadi"),
];

export const PROJECT_CATEGORIES = [
  L("ATM / CRM", "ATM / CRM"),
  L("Networking", "Jaringan"),
  L("CCTV", "CCTV"),
  L("TKJ", "TKJ"),
  L("Graphic Design", "Desain Grafis"),
  L("Web & Apps", "Web & Aplikasi"),
];

/** Dipakai kalau CMS belum menyala atau belum ada proyek terbit */
const PROJECTS_FALLBACK = [
  {
    slug: "atm-crm-field-service",
    featured: true,
    title: L("Lorem Ipsum 1", "Lorem Ipsum 1"),
    category: L("ATM / CRM", "ATM / CRM"),
    type: L("Company Project", "Proyek Perusahaan"),
    year: "—",
    description: LOREM_M,
    detail: LOREM_L,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S],
    stack: ["ATM", "CRM", "Monitoring", "Preventive Service"],
    image: "/projects/atm-service.jpg",
  },
  {
    slug: "office-network-build-out",
    featured: true,
    title: L("Lorem Ipsum 2", "Lorem Ipsum 2"),
    category: L("Networking", "Jaringan"),
    type: L("Client Work", "Pekerjaan Klien"),
    year: "—",
    description: LOREM_M,
    detail: LOREM_L,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S, LOREM_S],
    stack: ["Topologi", "Firewall", "Server", "Cabling"],
    image: "/projects/network-build.jpg",
  },
  {
    slug: "cctv-system-installation",
    featured: true,
    title: L("Lorem Ipsum 3", "Lorem Ipsum 3"),
    category: L("CCTV", "CCTV"),
    type: L("Client Work", "Pekerjaan Klien"),
    year: "—",
    description: LOREM_M,
    detail: LOREM_L,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S, LOREM_S],
    stack: ["CCTV", "DVR", "Kelistrikan", "Jaringan"],
    image: "/projects/cctv-install.jpg",
  },
  {
    slug: "pc-workstation-setup",
    title: L("Lorem Ipsum 4", "Lorem Ipsum 4"),
    category: L("TKJ", "TKJ"),
    type: L("Client Work", "Pekerjaan Klien"),
    year: "—",
    description: LOREM_M,
    detail: LOREM_L,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S],
    stack: ["Merakit PC", "Instalasi OS", "Troubleshooting"],
    image: "/projects/pc-setup.jpg",
  },
  {
    slug: "print-branding-design",
    title: L("Lorem Ipsum 5", "Lorem Ipsum 5"),
    category: L("Graphic Design", "Desain Grafis"),
    type: L("Personal Project", "Proyek Pribadi"),
    year: "—",
    description: LOREM_M,
    detail: LOREM_L,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S],
    stack: ["CorelDRAW", "Photoshop", "Illustrator", "Canva"],
    image: "/projects/design-print.jpg",
  },
  {
    slug: "apps-script-automation",
    title: L("Lorem Ipsum 6", "Lorem Ipsum 6"),
    category: L("Web & Apps", "Web & Aplikasi"),
    type: L("Personal Project", "Proyek Pribadi"),
    year: "—",
    description: LOREM_M,
    detail: LOREM_L,
    points: [LOREM_S, LOREM_S, LOREM_S, LOREM_S],
    stack: ["Apps Script", "JavaScript", "HTML & CSS"],
    image: "/projects/apps-script.jpg",
  },
];

/** CMS jadi sumber begitu punya proyek terbit; sebelum itu, pakai fallback */
export const PROJECTS = CMS?.projects?.length ? CMS.projects : PROJECTS_FALLBACK;

/** Daftar teknologi unik untuk dropdown filter */
export const PROJECT_TECHS = [...new Set(PROJECTS.flatMap((p) => p.stack))].sort();

/**
 * Proyek bertanda `featured` (diatur lewat admin) yang muncul di section 04
 * Home dan footer. Kalau belum ada satu pun yang ditandai, jatuh ke tiga
 * teratas supaya section itu tidak pernah kosong.
 */
export const FEATURED_PROJECTS = (
  PROJECTS.some((p) => p.featured) ? PROJECTS.filter((p) => p.featured) : PROJECTS.slice(0, 3)
).map((p) => ({
  ...p,
  tag: p.category,
  href: `/projects/${p.slug}`,
}));

/* =========================================================
   05 / Proses
   ========================================================= */

export const PROCESS = {
  headline: cmsProcess.headline ?? LOREM_M,
  detail: cmsProcess.detail ?? LOREM_L,
  steps: cmsProcess.steps?.length ? cmsProcess.steps : [
    LOREM_WORD, LOREM_WORD, LOREM_WORD, LOREM_WORD,
    LOREM_WORD, LOREM_WORD, LOREM_WORD, LOREM_WORD,
  ],
};

/* =========================================================
   06 / Perkakas
   ========================================================= */

const MAIN = L("Main skill", "Keahlian utama");
const FREQ = L("Frequently used", "Sering dipakai");

const TECH_GROUPS_FALLBACK = [
  {
    key: "network",
    label: LOREM_WORD,
    items: [
      { name: "Lorem", mono: "TP", bg: "#122130", fg: "#38bdf8", level: MAIN },
      { name: "Ipsum", mono: "CF", bg: "#0f2b1f", fg: "#3ecf8e", level: MAIN },
      { name: "Dolor", mono: "SC", bg: "#2b1010", fg: "#ff6b6b", level: MAIN },
      { name: "Sit", mono: "SV", bg: "#0d0d0d", fg: "#e5e7eb", level: MAIN },
      { name: "Amet", mono: "CB", bg: "#2a1f08", fg: "#fbbf24", level: MAIN },
      { name: "Consectetur", mono: "AT", bg: "#1a1033", fg: "#a879ff", level: FREQ },
      { name: "Adipiscing", mono: "MN", bg: "#0b2d38", fg: "#38bdf8", level: MAIN },
      { name: "Elit", mono: "TS", bg: "#171717", fg: "#f97316", level: MAIN },
    ],
  },
  {
    key: "hardware",
    label: LOREM_WORD,
    items: [
      { name: "Lorem", mono: "AT", bg: "#0a2540", fg: "#60a5fa", level: MAIN },
      { name: "Ipsum", mono: "CR", bg: "#0a2540", fg: "#60a5fa", level: MAIN },
      { name: "Dolor", mono: "CC", bg: "#2a1f08", fg: "#fbbf24", level: MAIN },
      { name: "Sit", mono: "PC", bg: "#171717", fg: "#e5e7eb", level: MAIN },
      { name: "Amet", mono: "OS", bg: "#0f2033", fg: "#38bdf8", level: MAIN },
      { name: "Consectetur", mono: "EL", bg: "#331a00", fg: "#ff9a00", level: MAIN },
      { name: "Adipiscing", mono: "MT", bg: "#0f2b1f", fg: "#3ecf8e", level: MAIN },
    ],
  },
  {
    key: "creative",
    label: LOREM_WORD,
    items: [
      { name: "Lorem", mono: "CD", bg: "#0a3d1f", fg: "#7cd992", level: MAIN },
      { name: "Ipsum", mono: "Ps", bg: "#001e36", fg: "#31a8ff", level: MAIN },
      { name: "Dolor", mono: "Ai", bg: "#330000", fg: "#ff9a00", level: MAIN },
      { name: "Sit", mono: "C", bg: "#00c4cc", fg: "#0a0e13", level: MAIN },
      { name: "Amet", mono: "5", bg: "#e34f26", level: MAIN },
      { name: "Consectetur", mono: "3", bg: "#1572b6", level: MAIN },
      { name: "Adipiscing", mono: "JS", bg: "#f7df1e", fg: "#0a0e13", level: MAIN },
      { name: "Elit", mono: "AS", bg: "#0f2b1f", fg: "#4285f4", level: MAIN },
    ],
  },
];

/** CMS jadi sumber begitu punya Technology Stack terbit; sebelum itu, pakai fallback */
export const TECH_GROUPS = CMS?.techGroups?.length ? CMS.techGroups : TECH_GROUPS_FALLBACK;

/* =========================================================
   KARYA KREATIF — sumber tunggal untuk halaman
   /creative-works, halaman detailnya, dan carousel di Home.
   ========================================================= */

export const CREATIVE_CATEGORIES = [
  L("Print Design", "Desain Cetak"),
  L("Branding", "Branding"),
  L("Photo Editing", "Edit Foto"),
  L("Social Media", "Media Sosial"),
  L("Documentation", "Dokumentasi"),
];

/** Dipakai kalau CMS belum menyala atau belum ada karya terbit */
const CREATIVE_WORKS_FALLBACK = [
  {
    slug: "banner-signage",
    title: L("Lorem Ipsum 1", "Lorem Ipsum 1"),
    category: L("Print Design", "Desain Cetak"),
    subtitle: LOREM_S,
    description: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S],
    tools: ["CorelDRAW", "Photoshop"],
    gradient: "linear-gradient(135deg,#0a3d1f,#0d2a19 60%,#08130d)",
    image: "/creative/print.jpg",
    span: "large",
  },
  {
    slug: "logo-identity",
    title: L("Lorem Ipsum 2", "Lorem Ipsum 2"),
    category: L("Branding", "Branding"),
    subtitle: LOREM_S,
    description: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S],
    tools: ["Adobe Illustrator", "CorelDRAW"],
    gradient: "linear-gradient(135deg,#3a2456,#241733 55%,#120c1a)",
    image: "/creative/branding.jpg",
    span: "normal",
  },
  {
    slug: "photo-retouching",
    title: L("Lorem Ipsum 3", "Lorem Ipsum 3"),
    category: L("Photo Editing", "Edit Foto"),
    subtitle: LOREM_S,
    description: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S],
    tools: ["Photoshop"],
    gradient: "linear-gradient(135deg,#123a5c,#0d2033 60%,#0a1017)",
    image: "/creative/retouch.jpg",
    span: "normal",
  },
  {
    slug: "content-templates",
    title: L("Lorem Ipsum 4", "Lorem Ipsum 4"),
    category: L("Social Media", "Media Sosial"),
    subtitle: LOREM_S,
    description: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S],
    tools: ["Canva", "Photoshop"],
    gradient: "linear-gradient(135deg,#0f3d3a,#0b2422 60%,#08110f)",
    image: "/creative/social.jpg",
    span: "wide",
  },
  {
    slug: "field-documentation",
    title: L("Lorem Ipsum 5", "Lorem Ipsum 5"),
    category: L("Documentation", "Dokumentasi"),
    subtitle: LOREM_S,
    description: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S],
    tools: ["Photoshop", "Canva"],
    gradient: "linear-gradient(135deg,#5c3a12,#2b1c0d 60%,#100c08)",
    image: "/creative/field.jpg",
    span: "normal",
  },
  {
    slug: "brochure-layout",
    title: L("Lorem Ipsum 6", "Lorem Ipsum 6"),
    category: L("Print Design", "Desain Cetak"),
    subtitle: LOREM_S,
    description: LOREM_M,
    points: [LOREM_S, LOREM_S, LOREM_S],
    tools: ["CorelDRAW", "Adobe Illustrator"],
    gradient: "linear-gradient(135deg,#1c3a52,#122536 60%,#0a1219)",
    image: "/creative/brochure.jpg",
    span: "normal",
  },
];

/** CMS jadi sumber begitu punya karya terbit; sebelum itu, pakai fallback */
export const CREATIVE_WORKS = CMS?.creativeWorks?.length ? CMS.creativeWorks : CREATIVE_WORKS_FALLBACK;

/** Slide carousel di Home diambil dari karya yang sama */
export const CREATIVE_SLIDES = CREATIVE_WORKS.slice(0, 5);

/* =========================================================
   08 / Sertifikat
   ========================================================= */

/**
 * Sertifikat.
 *
 * PENTING: semua entri di bawah bertanda `placeholder: true` — isinya
 * kosong dan hanya ada supaya tata letak halaman bisa dilihat.
 * Kartu bertanda contoh akan menampilkan label "CONTOH" dan
 * TIDAK ikut tampil di halaman depan.
 */
const CERTIFICATES_FALLBACK = [
  {
    slug: "sertifikat-1",
    title: L("Certificate title", "Judul sertifikat"),
    issuer: L("Issuing organisation", "Nama penerbit"),
    category: L("Networking", "Jaringan"),
    date: "—",
    credential: "—",
    image: "/certificates/sertifikat-1.jpg",
    href: null,
    featured: true,
    placeholder: true,
  },
  {
    slug: "sertifikat-2",
    title: L("Certificate title", "Judul sertifikat"),
    issuer: L("Issuing organisation", "Nama penerbit"),
    category: L("ATM / CRM", "ATM / CRM"),
    date: "—",
    credential: "—",
    image: "/certificates/sertifikat-2.jpg",
    href: null,
    placeholder: true,
  },
  {
    slug: "sertifikat-3",
    title: L("Certificate title", "Judul sertifikat"),
    issuer: L("Issuing organisation", "Nama penerbit"),
    category: L("CCTV", "CCTV"),
    date: "—",
    credential: "—",
    image: "/certificates/sertifikat-3.jpg",
    href: null,
    placeholder: true,
  },
  {
    slug: "sertifikat-4",
    title: L("Certificate title", "Judul sertifikat"),
    issuer: L("Issuing organisation", "Nama penerbit"),
    category: L("Graphic Design", "Desain Grafis"),
    date: "—",
    credential: "—",
    image: "/certificates/sertifikat-4.jpg",
    href: null,
    placeholder: true,
  },
];

/** CMS jadi sumber begitu punya sertifikat terbit; sebelum itu, pakai fallback */
export const CERTIFICATES = CMS?.certificates?.length ? CMS.certificates : CERTIFICATES_FALLBACK;

/** Kategori filter, diambil dari daftar sertifikat */
export const CERTIFICATE_CATEGORIES = CERTIFICATES.reduce((acc, cert) => {
  if (!acc.some((c) => c.en === cert.category.en)) acc.push(cert.category);
  return acc;
}, []);

/**
 * Sertifikat unggulan untuk Home — hanya yang asli (tanpa placeholder).
 * Diprioritaskan yang ditandai `featured` lewat admin; kalau belum ada
 * yang ditandai, jatuh ke dua teratas.
 */
const CERTIFICATES_REAL = CERTIFICATES.filter((c) => !c.placeholder);
export const FEATURED_CERTIFICATES = (
  CERTIFICATES_REAL.some((c) => c.featured)
    ? CERTIFICATES_REAL.filter((c) => c.featured)
    : CERTIFICATES_REAL.slice(0, 2)
);

/** Dipakai untuk menampilkan peringatan di halaman sertifikat */
export const CERTIFICATES_ARE_PLACEHOLDER = CERTIFICATES.every((c) => c.placeholder);

/* =========================================================
   09 / Testimoni
   ========================================================= */

/**
 * Testimoni (dulu buku tamu — sekarang diisi dari admin, bukan pengunjung;
 * lihat CMS-SKEMA.md). Nama GUESTBOOK dipertahankan supaya komponen yang
 * memakainya tidak perlu diganti.
 *
 * PENTING: entri di bawah bertanda `placeholder: true` — ini BUKAN
 * testimoni asli, hanya contoh kosong supaya tata letaknya terlihat.
 * Entri contoh tidak ikut tampil di halaman depan.
 */
const GUESTBOOK_FALLBACK = [
  {
    id: "contoh-1",
    name: L("Visitor name", "Nama pengunjung"),
    initials: "—",
    date: "—",
    message: L(
      "Visitor comment will appear here.",
      "Komentar pengunjung akan tampil di sini."
    ),
    role: null,
    projectRef: null,
    pinned: true,
    placeholder: true,
  },
  {
    id: "contoh-2",
    name: L("Visitor name", "Nama pengunjung"),
    initials: "—",
    date: "—",
    message: L(
      "Visitor comment will appear here.",
      "Komentar pengunjung akan tampil di sini."
    ),
    role: null,
    projectRef: null,
    pinned: false,
    placeholder: true,
  },
];

/** CMS jadi sumber begitu punya testimoni terbit; sebelum itu, pakai fallback */
export const GUESTBOOK = CMS?.testimonials?.length ? CMS.testimonials : GUESTBOOK_FALLBACK;

export const GUESTBOOK_IS_PLACEHOLDER = GUESTBOOK.every((g) => g.placeholder);

/** Testimoni asli saja — dipakai di halaman depan */
export const GUESTBOOK_PUBLIC = GUESTBOOK.filter((g) => !g.placeholder);

/* ---------- Pilihan pada formulir kontak ---------- */

export const PROJECT_TYPE_OPTIONS = [
  L("ATM / CRM service", "Servis ATM / CRM"),
  L("Network installation", "Instalasi jaringan"),
  L("CCTV installation", "Instalasi CCTV"),
  L("PC / workstation setup", "Perakitan PC / workstation"),
  L("Graphic design", "Desain grafis"),
  L("Web & application", "Web & aplikasi"),
  L("Other", "Lainnya"),
];

export const BUDGET_OPTIONS = [
  L("Not decided yet", "Belum ditentukan"),
  L("Under Rp1 million", "Di bawah Rp1 juta"),
  L("Rp1 – 5 million", "Rp1 – 5 juta"),
  L("Rp5 – 15 million", "Rp5 – 15 juta"),
  L("Above Rp15 million", "Di atas Rp15 juta"),
];

/* ---------- Kartu kanal kontak ---------- */

export const CONTACT_CHANNELS = [
  {
    icon: "mail",
    label: L("Direct project inquiry", "Permintaan proyek langsung"),
    title: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: "chat",
    label: L("Quick introduction", "Perkenalan cepat"),
    title: "WhatsApp",
    value: PHONE,
    href: WHATSAPP,
  },
  {
    icon: "linkedin",
    label: L("Professional profile", "Profil profesional"),
    title: "LinkedIn",
    value: "—",
    href: null,
  },
  {
    icon: "instagram",
    label: L("Visual practice", "Praktik visual"),
    title: "Instagram",
    value: "—",
    href: null,
  },
];

/* =========================================================
   10 / Ajakan penutup
   ========================================================= */

export const FINAL_CTA = {
  headline: cmsCta.headline ?? LOREM_M,
  detail: cmsCta.detail ?? LOREM_M,
};

/* =========================================================
   PENGALAMAN & STATISTIK
   ========================================================= */

export const EXPERIENCE = CMS?.experience?.length ? CMS.experience : [
  { year: L("8 years", "8 tahun"), role: L("Lorem Ipsum 1", "Lorem Ipsum 1"), place: LOREM_WORD, detail: LOREM_M },
  { year: L("4 years", "4 tahun"), role: L("Lorem Ipsum 2", "Lorem Ipsum 2"), place: LOREM_WORD, detail: LOREM_M },
  { year: L("2 years", "2 tahun"), role: L("Lorem Ipsum 3", "Lorem Ipsum 3"), place: LOREM_WORD, detail: LOREM_M },
];

/**
 * Statistik diturunkan dari HOME_HIGHLIGHTS supaya angka di halaman
 * depan dan halaman /about tidak pernah berbeda.
 */
export const STATS = HOME_HIGHLIGHTS.map((h) => ({
  value: h.value,
  label: h.title,
}));

/** Dipakai di halaman /about — diturunkan dari EXPERTISE */
export const SKILLS = EXPERTISE.map((e) => ({
  group: e.title,
  items: e.points.map((p) => p),
}));

/* =========================================================
   TAUTAN
   ========================================================= */

export const SOCIALS = CMS?.socials?.length ? CMS.socials : [
  { label: "WhatsApp", icon: "chat", value: PHONE, href: WHATSAPP },
  { label: "Email", icon: "mail", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Instagram", icon: "instagram", value: "—", href: "" },
  { label: "LinkedIn", icon: "linkedin", value: "—", href: "" },
];

export const FOOTER_TAGS = [
  L("Available for projects", "Terbuka untuk proyek"),
  L("Indonesia / GMT+7", "Indonesia / GMT+7"),
  L("Professional Mode", "Mode Profesional"),
];

/* Alias lama supaya komponen yang belum diperbarui tetap jalan */
export const DEVELOPER_NAME = OWNER_FIRST;
export const DEVELOPER_SURNAME = OWNER_LAST;
export const DEVELOPER_FULL_NAME = OWNER_NAME;
