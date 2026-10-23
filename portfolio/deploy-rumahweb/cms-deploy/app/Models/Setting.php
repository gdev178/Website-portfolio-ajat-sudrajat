<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * Penyimpan teks tetap situs, berbentuk key -> value JSON.
 *
 * Dibaca lewat Setting::get('hero.lead') dan ditulis lewat Setting::put().
 * Hasilnya di-cache karena satu halaman bisa membaca puluhan kunci.
 */
class Setting extends Model
{
    protected $fillable = ['key', 'group', 'value'];

    protected $casts = ['value' => 'array'];

    private const CACHE_KEY = 'settings.all';

    /** Semua pengaturan sebagai [key => value], di-cache */
    public static function all_cached(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            return static::query()->pluck('value', 'key')->toArray();
        });
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        return static::all_cached()[$key] ?? $default;
    }

    public static function put(string $key, mixed $value, string $group = 'umum'): void
    {
        static::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group],
        );

        static::forgetCache();
    }

    public static function forgetCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    protected static function booted(): void
    {
        // Cache dibersihkan otomatis setiap kali admin menyimpan perubahan.
        // api.content ikut dibersihkan supaya Pengaturan/Pengaturan Beranda
        // konsisten dengan resource lain (lihat BustsContentCache) — tanpa
        // ini, perubahan baru tampil di React setelah TTL 5 menit habis.
        static::saved(function () {
            static::forgetCache();
            Cache::forget('api.content');
        });
        static::deleted(function () {
            static::forgetCache();
            Cache::forget('api.content');
        });
    }
}
