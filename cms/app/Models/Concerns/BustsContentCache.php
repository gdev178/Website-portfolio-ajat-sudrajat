<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\Cache;

/**
 * Membersihkan cache GET /api/content setiap kali baris model ini
 * disimpan atau dihapus, supaya perubahan dari admin langsung
 * tampil di situs tanpa menunggu TTL cache habis.
 */
trait BustsContentCache
{
    protected static function bootBustsContentCache(): void
    {
        static::saved(fn () => Cache::forget('api.content'));
        static::deleted(fn () => Cache::forget('api.content'));
    }
}
