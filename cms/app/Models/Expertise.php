<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Expertise extends Model
{
    use \App\Models\Concerns\BustsContentCache;

    protected $fillable = [
        'key', 'icon', 'accent', 'title', 'years', 'years_short', 'detail', 'points',
        'show_in_build', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'title'         => 'array',
        'years'         => 'array',
        'detail'        => 'array',
        'points'        => 'array',
        'show_in_build' => 'boolean',
        'is_published'  => 'boolean',
        'sort_order'    => 'integer',
    ];

    /** Pilihan ikon yang tersedia di seluruh situs (dipakai form admin) */
    public const ICONS = [
        'wrench'    => 'Kunci pas (servis/perbaikan)',
        'monitor'   => 'Monitor (jaringan/komputer)',
        'camera'    => 'Kamera (CCTV/fotografi)',
        'briefcase' => 'Tas kerja (TKJ/umum)',
        'palette'   => 'Palet (desain)',
        'code'      => 'Kode (web/aplikasi)',
        'sparkles'  => 'Kilau (pengalaman/highlight)',
        'award'     => 'Medali (pencapaian)',
        'layers'    => 'Lapisan (sistem/tumpukan)',
        'film'      => 'Film (video/kreatif)',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order');
    }
}
