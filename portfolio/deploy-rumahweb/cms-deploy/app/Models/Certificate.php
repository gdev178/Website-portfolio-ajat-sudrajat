<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use \App\Models\Concerns\BustsContentCache;

    protected $fillable = [
        'slug', 'title', 'issuer', 'category', 'date', 'credential',
        'image', 'href', 'is_featured', 'is_published', 'is_placeholder', 'sort_order',
    ];

    protected $casts = [
        'title'          => 'array',
        'issuer'         => 'array',
        'category'       => 'array',
        'is_featured'    => 'boolean',
        'is_published'   => 'boolean',
        'is_placeholder' => 'boolean',
        'sort_order'     => 'integer',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order');
    }

    /**
     * Sertifikat contoh tidak boleh tampil di beranda — isinya klaim
     * kualifikasi, jadi hanya yang asli yang boleh jadi bahan promosi.
     */
    public function scopeReal(Builder $query): Builder
    {
        return $query->where('is_placeholder', false);
    }
}
