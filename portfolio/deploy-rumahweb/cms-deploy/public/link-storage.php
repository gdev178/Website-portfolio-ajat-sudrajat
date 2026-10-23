<?php
/**
 * Pengganti `php artisan storage:link` untuk hosting tanpa SSH/Terminal
 * (Rumahweb Unlimited S — lihat bagian 9 CLAUDE.md).
 *
 * Cara pakai sekali jalan:
 *   1. Upload berkas ini ke public_html/ (folder public Laravel di server).
 *   2. Buka https://ajatsudrajat.my.id/link-storage.php di browser.
 *   3. HAPUS berkas ini dari server segera setelah tampil "Berhasil" —
 *      siapa pun yang tahu URL-nya bisa memicu ulang selama file masih ada.
 *
 * Kalau symlink() dimatikan admin hosting (umum di shared hosting demi
 * keamanan), skrip otomatis jatuh ke salin folder biasa. Konsekuensinya:
 * file baru yang diunggah lewat admin (foto, CV, sertifikat) baru muncul
 * di publik setelah skrip ini dijalankan ulang — bukan realtime seperti
 * symlink asli. Jalankan ulang tiap kali menambah banyak unggahan baru
 * kalau hosting ternyata tidak mendukung symlink().
 */

$target = __DIR__.'/../storage/app/public';
$link = __DIR__.'/storage';

header('Content-Type: text/plain; charset=utf-8');

if (is_link($link) || is_dir($link)) {
    echo "Sudah ada: {$link}\n";
    echo "Kalau mau menyegarkan salinan, hapus folder/symlink 'storage' di public/ lalu jalankan skrip ini lagi.\n";
    exit;
}

if (!is_dir($target)) {
    http_response_code(500);
    echo "Folder sumber tidak ditemukan: {$target}\n";
    exit;
}

if (function_exists('symlink') && @symlink($target, $link)) {
    echo "Berhasil (symlink): {$link} -> {$target}\n";
    echo "Sekarang HAPUS berkas link-storage.php ini dari server.\n";
    exit;
}

// symlink() gagal/dimatikan admin hosting -> salin folder biasa.
function copy_recursive(string $src, string $dst): void
{
    mkdir($dst, 0755, true);
    foreach (scandir($src) as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        $s = $src.'/'.$item;
        $d = $dst.'/'.$item;
        if (is_dir($s)) {
            copy_recursive($s, $d);
        } else {
            copy($s, $d);
        }
    }
}

copy_recursive($target, $link);
echo "Berhasil (salinan biasa, symlink() tidak tersedia di server ini): {$link}\n";
echo "Sekarang HAPUS berkas link-storage.php ini dari server.\n";
echo "Catatan: file yang diunggah lewat admin baru tampil setelah skrip ini dijalankan ulang.\n";
