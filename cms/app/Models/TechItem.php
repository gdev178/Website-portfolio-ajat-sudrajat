<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TechItem extends Model
{
    use \App\Models\Concerns\BustsContentCache;

    protected $fillable = [
        'tech_group_id', 'name', 'mono', 'bg', 'fg',
        'is_main_skill', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'is_main_skill' => 'boolean',
        'is_published'  => 'boolean',
        'sort_order'    => 'integer',
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(TechGroup::class, 'tech_group_id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order');
    }
}
