import React, { createContext, useContext, useEffect, useState } from 'react';

/** Helper: bikin nilai dwibahasa -> L("English", "Indonesia") */
export const L = (en, id) => ({ en, id });

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "id" ? "id" : "en";
  }, [lang]);

  /** t(key) untuk string UI, t(obj) untuk objek {en, id} dari data.js */
  const t = (input) => {
    if (input && typeof input === "object") return input[lang] ?? input.en;
    const entry = UI[input];
    if (!entry) return input;
    return entry[lang] ?? entry.en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang harus dipakai di dalam <LanguageProvider>");
  return ctx;
}

/** Kamus string UI */
const UI = {
  // Navigasi
  "nav.home": L("Home", "Beranda"),
  "nav.about": L("About", "Tentang"),
  "nav.projects": L("Projects", "Proyek"),
  "nav.creative": L("Creative Works", "Karya Kreatif"),
  "nav.certificates": L("Certificates", "Sertifikat"),
  "nav.contact": L("Contact", "Kontak"),
  "nav.contactMe": L("Contact Me", "Hubungi Saya"),
  "nav.themeLight": L("Spiderman Mode", "Mode Spiderman"),
  "nav.themeDark": L("Pro Mode", "Mode Pro"),
  "nav.menu": L("Menu", "Menu"),

  // Intro
  "intro.tagline": L(
    "Field technician portfolio covering ATM/CRM machines, networking, CCTV, computer engineering, graphic design, and web development.",
    "Portofolio teknisi lapangan mencakup mesin ATM/CRM, jaringan, CCTV, teknik komputer, desain grafis, dan pengembangan web."
  ),
  "intro.skip": L("Skip Intro", "Lewati Intro"),
  "intro.loading": L("Loading Technical Works", "Memuat Karya Teknis"),

  // Home
  "home.explore": L("Explore Work", "Lihat Pekerjaan"),
  "home.cv": L("Download CV", "Unduh CV"),
  "home.based": L("Bandung, Indonesia", "Bandung, Indonesia"),
  "home.available": L("Available for projects", "Terbuka untuk proyek"),
  "home.scroll": L("Scroll to explore", "Gulir untuk menjelajah"),

  "home.discuss": L("Discuss a project", "Diskusikan proyek"),
  "home.viewDetails": L("View details", "Lihat detail"),

  // Label section
  "label.about": L("About Me", "Tentang Saya"),
  "label.snapshot": L("Snapshot", "Ringkasan"),
  "label.build": L("What I Build", "Yang Saya Bangun"),
  "label.systems": L("Selected Systems", "Sistem Terpilih"),
  "label.process": L("Process", "Proses"),
  "label.toolkit": L("Toolkit", "Perkakas"),
  "label.beyond": L("Beyond the Browser", "Di Luar Browser"),
  "label.recognition": L("Recognition", "Pengakuan"),
  "label.conversation": L("Start a Conversation", "Mulai Obrolan"),
  "label.testimonials": L("Testimonials", "Testimoni"),
  "label.makeItReal": L("Let's Make It Real", "Mari Wujudkan"),

  // Section 09 & 10
  "home.conversationTitle": L(
    "Have a technical project in mind?",
    "Punya kebutuhan teknis?"
  ),
  "home.conversationDetail": L(
    "I'm available for machine service, network build-outs, CCTV installation, and supporting design or web work.",
    "Saya terbuka untuk servis mesin, pembangunan jaringan, instalasi CCTV, serta pekerjaan desain dan web pendukung."
  ),
  "home.whatsappIntro": L("WhatsApp for a quick introduction", "WhatsApp untuk perkenalan cepat"),
  "home.sendInquiry": L("Send inquiry", "Kirim permintaan"),
  "home.testimonialsTitle": L("What clients say", "Kata klien"),
  "home.testimonialsCount": L("testimonials", "testimoni"),
  "home.visitTestimonials": L("Visit Contact page", "Kunjungi halaman Kontak"),
  "home.startProject": L("Start a Project", "Mulai Proyek"),
  "home.viewAllProjects": L("View All Projects", "Lihat Semua Proyek"),

  // Footer
  "footer.navigation": L("Navigation", "Navigasi"),
  "footer.featured": L("Featured Work", "Pekerjaan Unggulan"),
  "footer.connect": L("Connect", "Terhubung"),
  "footer.creativeLinks": L("Creative Links", "Tautan Kreatif"),
  "footer.toTop": L("Back to top", "Kembali ke atas"),

  // Keadaan kosong
  "empty.certificates": L(
    "No certificates listed yet.",
    "Belum ada sertifikat yang dicantumkan."
  ),
  "empty.creative": L(
    "No creative works listed yet.",
    "Belum ada karya kreatif yang dicantumkan."
  ),

  // Section Home lanjutan
  "home.featuredProjects": L("Featured Technical Work", "Pekerjaan Teknis Unggulan"),
  "home.caseStudy": L("View details", "Lihat detail"),
  "home.techStack": L("Technology Stack", "Teknologi yang Dipakai"),
  "home.selectedCreative": L("Selected Design Works", "Karya Desain Terpilih"),
  "home.creativeArchive": L("Explore creative archive", "Jelajahi arsip kreatif"),
  "home.seeSimilar": L("See similar", "Lihat serupa"),
  "home.certsTitle": L("Certificates & achievements", "Sertifikat & pencapaian"),
  "home.certsDetail": L(
    "Training records that back up the technical practice in the field.",
    "Catatan pelatihan yang menopang praktik teknis di lapangan."
  ),
  "home.certArchive": L("View certificate archive", "Lihat arsip sertifikat"),
  "home.viewCert": L("View Certificate", "Lihat Sertifikat"),
  "home.featured": L("Featured", "Unggulan"),
  "label.projects": L("Projects", "Proyek"),
  "label.creative": L("Creative Works", "Karya Kreatif"),
  "label.certificates": L("Certificates", "Sertifikat"),
  "label.contact": L("Contact", "Kontak"),

  // About
  "about.helloIm": L("Hello, I'm", "Halo, saya"),
  "about.viewProjects": L("View Projects", "Lihat Proyek"),
  "about.creativeSupport": L("Creative Support", "Dukungan Kreatif"),
  "about.skills": L("Skills & Tools", "Keahlian & Peralatan"),
  "about.experience": L("Experience", "Pengalaman"),
  "about.practice": L("My Practice", "Praktik Saya"),
  "about.ecosystem": L("Capability Ecosystem", "Ekosistem Keahlian"),
  "about.values": L("Values & Workflow", "Nilai & Alur Kerja"),
  "about.tools": L("Tools I reach for", "Perkakas yang saya pakai"),

  // Projects
  "projects.all": L("All", "Semua"),
  "projects.empty": L("No projects in this category yet.", "Belum ada proyek di kategori ini."),
  "projects.view": L("View project", "Lihat proyek"),
  "projects.archive": L("Project Archive", "Arsip Proyek"),
  "projects.headline": L(
    "Field systems, networks, and technical installations.",
    "Sistem lapangan, jaringan, dan instalasi teknis."
  ),
  "projects.intro": L(
    "Filter by category or technology to inspect the work from several angles. Each entry opens into a dedicated detail page.",
    "Saring berdasarkan kategori atau teknologi untuk melihat pekerjaan dari beberapa sudut. Tiap entri terbuka ke halaman detail tersendiri."
  ),
  "projects.allWork": L("All Work", "Semua Pekerjaan"),
  "projects.allTech": L("All Tech", "Semua Teknologi"),
  "projects.searchPlaceholder": L("Search projects...", "Cari proyek..."),
  "projects.clear": L("Clear", "Reset"),
  "projects.openCase": L("Open detail", "Buka detail"),
  "projects.noResults": L(
    "No projects match these filters.",
    "Tidak ada proyek yang cocok dengan filter ini."
  ),
  "projects.ctaTitle": L(
    "Need similar technical work?",
    "Butuh pekerjaan teknis serupa?"
  ),
  "projects.ctaDetail": L(
    "Machine service, network build-outs, CCTV installation, or supporting design and web work — tell me what you need.",
    "Servis mesin, pembangunan jaringan, instalasi CCTV, atau pekerjaan desain dan web pendukung — sampaikan kebutuhanmu."
  ),

  // Detail proyek
  "detail.back": L("Back to projects", "Kembali ke proyek"),
  "detail.overview": L("Overview", "Ringkasan"),
  "detail.scope": L("Scope of work", "Lingkup pekerjaan"),
  "detail.tools": L("Tools & technology", "Perkakas & teknologi"),
  "detail.category": L("Category", "Kategori"),
  "detail.type": L("Type", "Jenis"),
  "detail.year": L("Year", "Tahun"),
  "detail.next": L("Next project", "Proyek berikutnya"),
  "detail.notFound": L("Project not found.", "Proyek tidak ditemukan."),
  "detail.liveDemo": L("View Live Demo", "Lihat Live Demo"),

  // Creative works
  "creative.empty": L("No works in this category yet.", "Belum ada karya di kategori ini."),
  "creative.archive": L("Creative Archive", "Arsip Kreatif"),
  "creative.headline": L(
    "Visual work that supports the technical practice.",
    "Karya visual yang menopang praktik teknis."
  ),
  "creative.intro": L(
    "A compact archive for print design, branding, photo editing, and field documentation. Technical work stays the focus; this side supports how it is presented.",
    "Arsip ringkas untuk desain cetak, branding, edit foto, dan dokumentasi lapangan. Pekerjaan teknis tetap jadi fokus; sisi ini menopang cara menyajikannya."
  ),
  "creative.searchPlaceholder": L("Search creative works...", "Cari karya kreatif..."),
  "creative.openWork": L("Open work", "Buka karya"),
  "creative.noResults": L(
    "No works match these filters.",
    "Tidak ada karya yang cocok dengan filter ini."
  ),
  "creative.back": L("Back to creative works", "Kembali ke karya kreatif"),
  "creative.nextWork": L("Next work", "Karya berikutnya"),
  "creative.notFound": L("Work not found.", "Karya tidak ditemukan."),

  // Certificates
  "cert.issued": L("Issued", "Diterbitkan"),
  "cert.credential": L("Credential", "Kredensial"),
  "cert.detailsHeading": L("Certificate Details", "Rincian Sertifikat"),
  "cert.issuerLabel": L("Issuer", "Penerbit"),
  "cert.dateLabel": L("Issue Date", "Tanggal Penerbitan"),
  "cert.credentialLabel": L("Credential ID", "ID Kredensial"),
  "cert.close": L("Close", "Tutup"),
  "cert.viewDetails": L("View details", "Lihat detail"),
  "cert.headline": L(
    "Certificates and learning milestones.",
    "Sertifikat dan capaian pembelajaran."
  ),
  "cert.intro": L(
    "A concise archive of learning credentials that support the technical practice in the field.",
    "Arsip ringkas kredensial pembelajaran yang menopang praktik teknis di lapangan."
  ),
  "cert.featured": L("Featured certificate", "Sertifikat unggulan"),
  "cert.searchPlaceholder": L("Search certificates...", "Cari sertifikat..."),
  "cert.verify": L("View credential", "Lihat kredensial"),
  "cert.sample": L("Sample", "Contoh"),
  "cert.notice": L(
    "The certificates below are empty samples, shown only so the page layout can be reviewed. Replace them with real certificate data before this site goes public.",
    "Sertifikat di bawah ini masih contoh kosong, ditampilkan hanya agar tata letak halaman bisa ditinjau. Ganti dengan data sertifikat asli sebelum situs ini dipublikasikan."
  ),
  "cert.noResults": L(
    "No certificates match these filters.",
    "Tidak ada sertifikat yang cocok dengan filter ini."
  ),

  // Contact
  "contact.label": L("Contact / Collaboration", "Kontak / Kolaborasi"),
  "contact.headline": L(
    "Let's build something reliable.",
    "Mari bangun sesuatu yang andal."
  ),
  "contact.intro": L(
    "Have a machine that needs service, a network to build, or a site to secure? Share the context and the next step can start clearly.",
    "Punya mesin yang perlu diservis, jaringan yang perlu dibangun, atau lokasi yang perlu diamankan? Sampaikan konteksnya agar langkah berikutnya jelas."
  ),
  "contact.hlResponse": L("Response", "Respons"),
  "contact.hlResponseValue": L("Clear brief", "Brief jelas"),
  "contact.hlFocus": L("Focus", "Fokus"),
  "contact.hlFocusValue": L("Field first", "Lapangan dulu"),
  "contact.hlSupport": L("Support", "Dukungan"),
  "contact.hlSupportValue": L("Maintained", "Terawat"),
  "contact.projectContext": L("Project context", "Konteks proyek"),
  "contact.sendMessage": L("Send Message", "Kirim Pesan"),
  "contact.projectType": L("Project Type", "Jenis Pekerjaan"),
  "contact.budget": L("Budget Range", "Rentang Anggaran"),
  "contact.sending": L("Sending...", "Mengirim..."),
  "contact.sentSuccess": L(
    "Message sent. I'll get back to you soon.",
    "Pesan terkirim. Saya akan membalas secepatnya."
  ),
  "contact.sentError": L(
    "Could not send right now. Please try WhatsApp instead.",
    "Belum bisa terkirim. Coba lewat WhatsApp saja."
  ),
  "contact.orWhatsapp": L("Send via WhatsApp instead", "Atau kirim lewat WhatsApp"),
  "contact.testimonialsHeading": L("Client Testimonials", "Testimoni Klien"),
  "contact.testimonialsIntro": L(
    "Notes from people I've worked with directly.",
    "Catatan dari orang-orang yang pernah bekerja sama langsung."
  ),
  "contact.pinned": L("Pinned", "Disematkan"),
  "contact.noComments": L("No testimonials yet.", "Belum ada testimoni."),
  "contact.testimonialsNotice": L(
    "The testimonials below are empty samples, shown only so the page layout can be reviewed. Replace them with real testimonials before this site goes public.",
    "Testimoni di bawah ini masih contoh kosong, ditampilkan hanya agar tata letak halaman bisa ditinjau. Ganti dengan testimoni asli sebelum situs ini dipublikasikan."
  ),

  // Contact
  "contact.title": L("Have a project?", "Punya proyek?"),
  "contact.titleAccent": L("Let's talk.", "Mari ngobrol."),
  "contact.name": L("Name", "Nama"),
  "contact.email": L("Email", "Email"),
  "contact.subject": L("Subject", "Subjek"),
  "contact.message": L("Message", "Pesan"),
  "contact.send": L("Send Message", "Kirim Pesan"),
  "contact.namePlaceholder": L("Your name", "Nama kamu"),
  "contact.emailPlaceholder": L("you@email.com", "kamu@email.com"),
  "contact.subjectPlaceholder": L("What is this about?", "Tentang apa ini?"),
  "contact.messagePlaceholder": L("Tell me about your project...", "Ceritakan proyekmu..."),
  "contact.direct": L("Or reach me directly", "Atau hubungi langsung"),

  // Footer
  "footer.rights": L("All rights reserved.", "Seluruh hak cipta dilindungi."),
  "footer.replay": L("Replay Intro", "Putar Ulang Intro"),
  "footer.builtWith": L("Built with React & Tailwind", "Dibangun dengan React & Tailwind"),
};
