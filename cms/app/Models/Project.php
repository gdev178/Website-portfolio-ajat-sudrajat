<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use \App\Models\Concerns\BustsContentCache;

    protected $fillable = [
        'slug', 'title', 'category', 'type', 'year',
        'description', 'detail', 'points', 'stack', 'image', 'live_url',
        'is_featured', 'is_published', 'is_placeholder', 'sort_order',
    ];

    protected $casts = [
        'title'          => 'array',
        'category'       => 'array',
        'type'           => 'array',
        'description'    => 'array',
        'detail'         => 'array',
        'points'         => 'array',
        'stack'          => 'array',
        'is_featured'    => 'boolean',
        'is_published'   => 'boolean',
        'is_placeholder' => 'boolean',
        'sort_order'     => 'integer',
    ];

    /** Yang boleh tampil di situs publik */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order');
    }

    /** Entri contoh tidak ikut tampil di halaman depan */
    public function scopeReal(Builder $query): Builder
    {
        return $query->where('is_placeholder', false);
    }
}
