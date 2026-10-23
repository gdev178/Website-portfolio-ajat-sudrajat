<?php
/**
 * Alat diagnosa sekali-pakai buat cek kenapa file storage 404.
 * HAPUS SETELAH DIPAKAI — jangan dibiarkan nongkrong di server.
 */

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

header('Content-Type: text/plain; charset=utf-8');

use Illuminate\Support\Facades\Storage;

$path = 'proyek/01KYRHGX4DB8TPZMKPTEVJABMJ.jpeg';

echo "=== Konfigurasi disk 'public' ===\n";
echo "Root: " . config('filesystems.disks.public.root') . "\n";
echo "URL : " . config('filesystems.disks.public.url') . "\n\n";

echo "=== Cek file: {$path} ===\n";
echo "Storage::disk('public')->exists() : " . (Storage::disk('public')->exists($path) ? 'YA' : 'TIDAK') . "\n";

$fullPath = storage_path('app/public/'.$path);
echo "Path fisik seharusnya: {$fullPath}\n";
echo "file_exists() langsung: " . (file_exists($fullPath) ? 'YA' : 'TIDAK') . "\n\n";

echo "=== Isi folder storage/app/public/proyek/ ===\n";
$dir = storage_path('app/public/proyek');
if (is_dir($dir)) {
    foreach (scandir($dir) as $f) {
        if ($f === '.' || $f === '..') continue;
        echo " - {$f}\n";
    }
} else {
    echo "FOLDER TIDAK ADA: {$dir}\n";
}

echo "\n=== Isi folder public/storage/proyek/ (salinan lama) ===\n";
$dir2 = __DIR__.'/storage/proyek';
if (is_dir($dir2)) {
    foreach (scandir($dir2) as $f) {
        if ($f === '.' || $f === '..') continue;
        echo " - {$f}\n";
    }
} else {
    echo "FOLDER TIDAK ADA: {$dir2}\n";
}

echo "\nSelesai. HAPUS berkas cek-storage.php ini dari server sekarang.\n";
