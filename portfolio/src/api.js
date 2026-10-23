/**
 * Alamat dasar API Laravel.
 *
 * Di produksi, Laravel menyajikan build React ini dari domain yang sama,
 * jadi API_BASE kosong (path relatif seperti /api/contact sudah benar).
 * Saat dev (Vite di :5173, Laravel di :8000), diisi lewat VITE_API_URL
 * di .env supaya fetch tetap mengarah ke server yang benar.
 */
export const API_BASE = import.meta.env.VITE_API_URL ?? '';

/** Kirim formulir kontak. Melempar Error kalau ditolak server. */
export async function postContact(payload) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // 422 dari Laravel: { errors: { field: [pesan] } }
    const firstError = data?.errors ? Object.values(data.errors)[0]?.[0] : null;
    throw new Error(firstError || data?.message || `Request failed (${res.status})`);
  }

  return data;
}
