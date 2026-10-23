<?php

use App\Http\Controllers\ContentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/**
 * Pengganti symlink `public/storage` (lihat public/link-storage.php) untuk
 * file yang BELUM ada di salinan statisnya — symlink() dimatikan di hosting
 * Rumahweb, jadi link-storage.php cuma bikin salinan sekali jalan yang tidak
 * ikut ter-update tiap ada upload baru lewat admin. Route ini menyajikan
 * file langsung dari storage/app/public secara live (selalu up to date),
 * sebagai jaring pengaman kalau .htaccess di public_html/ meneruskan
 * permintaan /storage/... ke sini (artinya file itu tidak ditemukan di
 * salinan statis).
 */
Route::get('/storage/{path}', function (string $path) {
    abort_unless(Storage::disk('public')->exists($path), 404);

    return Storage::disk('public')->response($path);
})->where('path', '.*')->name('storage.local');

/**
 * Menyajikan hasil build React (portfolio/dist, disalin ke storage/app/spa
 * lewat `npm run build:cms` — lihat package.json portfolio) sekaligus
 * menyuntikkan window.__CONTENT__ ke HTML sebelum dikirim ke browser.
 *
 * Kenapa bukan lewat public/index.html langsung: nama file itu akan
 * ditemukan lebih dulu oleh Apache/DirectoryIndex sebelum index.php milik
 * Laravel sempat jalan, jadi /admin dan /api ikut rusak. Disimpan di luar
 * public/ supaya satu-satunya jalan masuk tetap index.php Laravel, dan
 * assets (JS/CSS) dari build disalin ke public/assets/ (path root-relative
 * yang sama seperti yang ditulis Vite di index.html, tidak bentrok dengan
 * public/css /js /fonts milik Filament).
 *
 * Route ini SENGAJA diletakkan paling akhir dan mengecualikan admin/api/
 * storage/livewire/up supaya tidak menelan route bawaan Filament & API.
 */
Route::get('/{any}', function (ContentController $content) {
    $indexPath = storage_path('app/spa/index.html');

    abort_unless(file_exists($indexPath), 404);

    $html = file_get_contents($indexPath);
    $inject = '<script>window.__CONTENT__ = '.json_encode($content->data()).';</script>';
    $html = str_replace('</head>', $inject.'</head>', $html);

    return response($html)->header('Content-Type', 'text/html; charset=UTF-8');
})->where('any', '^(?!admin|api|storage|livewire|up).*$')->name('spa');
