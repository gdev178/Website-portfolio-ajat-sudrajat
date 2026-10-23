<?php

namespace Database\Seeders;

use App\Models\SocialLink;
use Illuminate\Database\Seeder;

/**
 * Mengisi Tautan Sosial dari portfolio/src/data.js (SOCIALS).
 * Instagram & LinkedIn belum ada URL asli — href dikosongkan agar
 * ikon disembunyikan di frontend, bukan mengarah ke link mati.
 */
class SocialLinkSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['icon' => 'chat', 'label' => 'WhatsApp', 'value' => '0813-2053-6570', 'href' => 'https://wa.me/6281320536570'],
            ['icon' => 'mail', 'label' => 'Email', 'value' => 'ajatsudrajat.gp@gmail.com', 'href' => 'mailto:ajatsudrajat.gp@gmail.com'],
            ['icon' => 'instagram', 'label' => 'Instagram', 'value' => '—', 'href' => null],
            ['icon' => 'linkedin', 'label' => 'LinkedIn', 'value' => '—', 'href' => null],
        ];

        foreach ($items as $i => $item) {
            SocialLink::updateOrCreate(
                ['label' => $item['label']],
                array_merge($item, [
                    'is_published' => true,
                    'sort_order' => $i,
                ]),
            );
        }

        $this->command->info(count($items) . ' tautan sosial diisi.');
    }
}
