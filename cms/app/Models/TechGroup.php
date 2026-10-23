<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TechGroup extends Model
{
    use \App\Models\Concerns\BustsContentCache;

    protected $fillable = ['key', 'label', 'sort_order'];

    protected $casts = [
        'label'      => 'array',
        'sort_order' => 'integer',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(TechItem::class)->orderBy('sort_order');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order');
    }
}
