<?php
/**
 * Pengganti `php artisan migrate` untuk hosting tanpa SSH/Terminal
 * (Rumahweb Unlimited S — lihat bagian 9 CLAUDE.md).
 *
 * Cara pakai sekali jalan:
 *   1. Upload berkas ini ke public_html/cms-deploy/public/ di server.
 *   2. Buka https://ajatsudrajat.my.id/cms-deploy/public/migrate-sekali.php
 *      (lewat jalur folder langsung supaya tidak kena WAF seperti /kelola).
 *   3. Baca hasilnya — migrasi yang sudah pernah jalan otomatis dilewati,
 *      jadi aman dijalankan berkali-kali.
 *   4. HAPUS berkas ini dari server setelah selesai dipakai.
 */

require __DIR__.'/../vendor/autoload.php';

/** @var \Illuminate\Foundation\Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

header('Content-Type: text/plain; charset=utf-8');

echo "=== php artisan migrate:status ===\n";
Illuminate\Support\Facades\Artisan::call('migrate:status');
echo Illuminate\Support\Facades\Artisan::output();

echo "\n=== php artisan migrate --force ===\n";
Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
echo Illuminate\Support\Facades\Artisan::output();

echo "\nSelesai. Sekarang HAPUS berkas migrate-sekali.php ini dari server.\n";
