/**
 * Jembatan konten CMS untuk mode pengembangan.
 *
 * Di produksi (Tahap 6), Laravel menyajikan index.html dan menyuntikkan
 * `window.__CONTENT__` lewat <script> sebelum bundle ini jalan — lihat
 * CLAUDE.md bagian 9. Di situ, fungsi ini langsung selesai tanpa fetch
 * karena window.__CONTENT__ sudah terisi.
 *
 * Saat `npm run dev`, tidak ada Laravel yang menyuntikkan apa pun, jadi
 * fungsi ini mengambilnya sendiri lewat fetch. main.jsx MENUNGGU promise
 * ini selesai sebelum mengimpor App.jsx secara dinamis — bukan lewat
 * top-level await di modul terpisah, yang ternyata tidak menjamin urutan
 * evaluasi antar-modul-sibling di Vite dev (data.js sempat jalan duluan
 * dengan window.__CONTENT__ masih kosong, padahal fetch-nya sendiri sudah
 * benar). Dynamic import() menjamin urutan itu secara eksplisit.
 */
export async function loadContent() {
  if (!(import.meta.env.DEV && typeof window !== 'undefined' && !window.__CONTENT__)) {
    return;
  }

  const base = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

  try {
    const res = await fetch(`${base}/api/content`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      window.__CONTENT__ = await res.json();
    } else {
      console.warn(`[content-bootstrap] CMS merespons ${res.status}, memakai data statis.`);
    }
  } catch (err) {
    console.warn('[content-bootstrap] CMS tidak terjangkau, memakai data statis.', err);
  }
}
