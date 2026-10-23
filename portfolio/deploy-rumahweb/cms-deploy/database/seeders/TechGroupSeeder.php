<?php

namespace Database\Seeders;

use App\Models\TechGroup;
use Illuminate\Database\Seeder;

/** Mengisi Technology Stack dari portfolio/src/data.js (TECH_GROUPS). */
class TechGroupSeeder extends Seeder
{
    public function run(): void
    {
        $groups = [
            [
                'key' => 'network',
                'label' => ['en' => 'Network & Server', 'id' => 'Jaringan & Server'],
                'items' => [
                    ['name' => 'Topologi Jaringan', 'mono' => 'TP', 'bg' => '#122130', 'fg' => '#38bdf8', 'is_main_skill' => true],
                    ['name' => 'Konfigurasi Perangkat', 'mono' => 'CF', 'bg' => '#0f2b1f', 'fg' => '#3ecf8e', 'is_main_skill' => true],
                    ['name' => 'Keamanan Jaringan', 'mono' => 'SC', 'bg' => '#2b1010', 'fg' => '#ff6b6b', 'is_main_skill' => true],
                    ['name' => 'Manajemen Server', 'mono' => 'SV', 'bg' => '#0d0d0d', 'fg' => '#e5e7eb', 'is_main_skill' => true],
                    ['name' => 'Pengkabelan', 'mono' => 'CB', 'bg' => '#2a1f08', 'fg' => '#fbbf24', 'is_main_skill' => true],
                    ['name' => 'Otomasi', 'mono' => 'AT', 'bg' => '#1a1033', 'fg' => '#a879ff', 'is_main_skill' => false],
                    ['name' => 'Monitoring', 'mono' => 'MN', 'bg' => '#0b2d38', 'fg' => '#38bdf8', 'is_main_skill' => true],
                    ['name' => 'Troubleshooting', 'mono' => 'TS', 'bg' => '#171717', 'fg' => '#f97316', 'is_main_skill' => true],
                ],
            ],
            [
                'key' => 'hardware',
                'label' => ['en' => 'Hardware & Field', 'id' => 'Perangkat & Lapangan'],
                'items' => [
                    ['name' => 'Mesin ATM', 'mono' => 'AT', 'bg' => '#0a2540', 'fg' => '#60a5fa', 'is_main_skill' => true],
                    ['name' => 'Mesin CRM', 'mono' => 'CR', 'bg' => '#0a2540', 'fg' => '#60a5fa', 'is_main_skill' => true],
                    ['name' => 'CCTV & DVR', 'mono' => 'CC', 'bg' => '#2a1f08', 'fg' => '#fbbf24', 'is_main_skill' => true],
                    ['name' => 'Merakit PC', 'mono' => 'PC', 'bg' => '#171717', 'fg' => '#e5e7eb', 'is_main_skill' => true],
                    ['name' => 'Instalasi OS', 'mono' => 'OS', 'bg' => '#0f2033', 'fg' => '#38bdf8', 'is_main_skill' => true],
                    ['name' => 'Kelistrikan', 'mono' => 'EL', 'bg' => '#331a00', 'fg' => '#ff9a00', 'is_main_skill' => true],
                    ['name' => 'Perawatan Berkala', 'mono' => 'MT', 'bg' => '#0f2b1f', 'fg' => '#3ecf8e', 'is_main_skill' => true],
                ],
            ],
            [
                'key' => 'creative',
                'label' => ['en' => 'Design & Web', 'id' => 'Desain & Web'],
                'items' => [
                    ['name' => 'CorelDRAW', 'mono' => 'CD', 'bg' => '#0a3d1f', 'fg' => '#7cd992', 'is_main_skill' => true],
                    ['name' => 'Photoshop', 'mono' => 'Ps', 'bg' => '#001e36', 'fg' => '#31a8ff', 'is_main_skill' => true],
                    ['name' => 'Adobe Illustrator', 'mono' => 'Ai', 'bg' => '#330000', 'fg' => '#ff9a00', 'is_main_skill' => true],
                    ['name' => 'Canva', 'mono' => 'C', 'bg' => '#00c4cc', 'fg' => '#0a0e13', 'is_main_skill' => true],
                    ['name' => 'HTML5', 'mono' => '5', 'bg' => '#e34f26', 'fg' => null, 'is_main_skill' => true],
                    ['name' => 'CSS3', 'mono' => '3', 'bg' => '#1572b6', 'fg' => null, 'is_main_skill' => true],
                    ['name' => 'JavaScript', 'mono' => 'JS', 'bg' => '#f7df1e', 'fg' => '#0a0e13', 'is_main_skill' => true],
                    ['name' => 'Apps Script', 'mono' => 'AS', 'bg' => '#0f2b1f', 'fg' => '#4285f4', 'is_main_skill' => true],
                ],
            ],
        ];

        foreach ($groups as $gi => $group) {
            $techGroup = TechGroup::updateOrCreate(
                ['key' => $group['key']],
                ['label' => $group['label'], 'sort_order' => $gi],
            );

            foreach ($group['items'] as $ii => $item) {
                $techGroup->items()->updateOrCreate(
                    ['name' => $item['name']],
                    array_merge($item, [
                        'is_published' => true,
                        'sort_order' => $ii,
                    ]),
                );
            }
        }

        $this->command->info(count($groups) . ' grup teknologi diisi.');
    }
}
