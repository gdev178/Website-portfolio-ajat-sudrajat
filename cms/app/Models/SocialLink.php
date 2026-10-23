<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    use \App\Models\Concerns\BustsContentCache;

    protected $fillable = ['label', 'icon', 'value', 'href', 'is_published', 'sort_order'];

    protected $casts = [
        'is_published' => 'boolean',
        'sort_order'   => 'integer',
    ];

    public const ICONS = [
        'instagram' => 'Instagram',
        'linkedin'  => 'LinkedIn',
        'github'    => 'GitHub',
        'youtube'   => 'YouTube',
        'facebook'  => 'Facebook',
        'tiktok'    => 'TikTok',
        'mail'      => 'Email',
        'chat'      => 'WhatsApp / Chat',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order');
    }
}
