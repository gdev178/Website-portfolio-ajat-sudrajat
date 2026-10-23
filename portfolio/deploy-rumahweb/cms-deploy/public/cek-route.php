<?php
/**
 * Alat diagnosa sekali-pakai — cek apakah route di-cache dan daftar route aktif.
 * HAPUS SETELAH DIPAKAI.
 */

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

header('Content-Type: text/plain; charset=utf-8');

echo "=== Apakah route di-cache? ===\n";
echo (app()->routesAreCached() ? 'YA — INI MASALAHNYA' : 'Tidak') . "\n\n";

echo "=== File cache yang mungkin ada ===\n";
$files = [
    'bootstrap/cache/routes-v7.php',
    'bootstrap/cache/config.php',
];
foreach ($files as $f) {
    $full = base_path($f);
    echo "{$f}: " . (file_exists($full) ? 'ADA' : 'tidak ada') . "\n";
}

echo "\n=== Route yang cocok untuk /storage/... ===\n";
$routes = app('router')->getRoutes();
foreach ($routes as $route) {
    $uri = $route->uri();
    if (str_contains($uri, 'storage') || $uri === '{any}') {
        echo "- {$uri}  (methods: " . implode(',', $route->methods()) . ", name: " . ($route->getName() ?? '-') . ")\n";
    }
}

echo "\nSelesai. HAPUS berkas cek-route.php ini dari server.\n";
