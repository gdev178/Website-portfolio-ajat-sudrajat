<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Testimonial extends Model
{
    use \App\Models\Concerns\BustsContentCache;

    protected $fillable = [
        'name', 'role', 'message', 'project_ref',
        'is_pinned', 'is_published', 'is_placeholder', 'sort_order',
    ];

    protected $casts = [
        'role'           => 'array',
        'message'        => 'array',
        'is_pinned'      => 'boolean',
        'is_published'   => 'boolean',
        'is_placeholder' => 'boolean',
        'sort_order'     => 'integer',
    ];

    /** Inisial untuk avatar bulat di situs, mis. "Ajat Sudrajat" -> "AS" */
    public function getInitialsAttribute(): string
    {
        $parts = preg_split('/\s+/', trim($this->name)) ?: [];
        $huruf = array_map(fn ($p) => Str::upper(Str::substr($p, 0, 1)), array_slice($parts, 0, 2));

        return implode('', $huruf) ?: '—';
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->orderByDesc('is_pinned')
            ->orderBy('sort_order');
    }

    /** Testimoni contoh tidak tampil di beranda */
    public function scopeReal(Builder $query): Builder
    {
        return $query->where('is_placeholder', false);
    }
}
