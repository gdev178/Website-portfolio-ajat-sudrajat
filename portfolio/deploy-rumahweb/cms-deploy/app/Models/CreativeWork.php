<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class CreativeWork extends Model
{
    use \App\Models\Concerns\BustsContentCache;

    protected $fillable = [
        'slug', 'title', 'category', 'subtitle', 'description',
        'points', 'tools', 'image', 'gradient', 'span',
        'is_published', 'is_placeholder', 'sort_order',
    ];

    protected $casts = [
        'title'          => 'array',
        'category'       => 'array',
        'subtitle'       => 'array',
        'description'    => 'array',
        'points'         => 'array',
        'tools'          => 'array',
        'is_published'   => 'boolean',
        'is_placeholder' => 'boolean',
        'sort_order'     => 'integer',
    ];

    /**
     * Pilihan latar untuk kartu tanpa gambar.
     * Label ramah klien, nilainya CSS gradient yang dipakai frontend.
     */
    public const GRADIENTS = [
        'linear-gradient(135deg,#0a3d1f,#0d2a19 60%,#08130d)' => 'Hijau tua',
        'linear-gradient(135deg,#3a2456,#241733 55%,#120c1a)' => 'Ungu',
        'linear-gradient(135deg,#123a5c,#0d2033 60%,#0a1017)' => 'Biru',
        'linear-gradient(135deg,#0f3d3a,#0b2422 60%,#08110f)' => 'Teal',
        'linear-gradient(135deg,#5c3a12,#2b1c0d 60%,#100c08)' => 'Cokelat',
        'linear-gradient(135deg,#1c3a52,#122536 60%,#0a1219)' => 'Biru tua',
    ];

    public const SPANS = [
        'large'  => 'Besar (2 kolom x 2 baris)',
        'wide'   => 'Lebar (2 kolom)',
        'normal' => 'Normal (1 kolom)',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order');
    }

    public function scopeReal(Builder $query): Builder
    {
        return $query->where('is_placeholder', false);
    }
}
