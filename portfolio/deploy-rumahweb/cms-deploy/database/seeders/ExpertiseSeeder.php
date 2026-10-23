<?php

namespace Database\Seeders;

use App\Models\Expertise;
use Illuminate\Database\Seeder;

/** Mengisi 6 bidang keahlian dari portfolio/src/data.js (EXPERTISE). */
class ExpertiseSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'key' => 'atm', 'icon' => 'wrench', 'accent' => '#38bdf8',
                'title' => ['en' => 'ATM / CRM Machine Technician', 'id' => 'Teknisi Mesin ATM / CRM'],
                'years' => ['en' => '8 years at Bank Mandiri', 'id' => '8 tahun di Bank Mandiri'],
                'years_short' => '8',
                'detail' => ['en' => 'Repair, monitoring, and routine service for ATM and CRM machines in the field.', 'id' => 'Perbaikan, monitoring, dan servis berkala mesin ATM dan CRM di lapangan.'],
                'points' => [
                    ['en' => 'ATM / CRM repair', 'id' => 'Perbaikan ATM / CRM'],
                    ['en' => 'Monitoring', 'id' => 'Monitoring'],
                ],
                'show_in_build' => false,
            ],
            [
                'key' => 'network', 'icon' => 'monitor', 'accent' => '#34d399',
                'title' => ['en' => 'Network Engineer', 'id' => 'Network Engineer'],
                'years' => ['en' => '4 years experience', 'id' => 'Pengalaman 4 tahun'],
                'years_short' => '4',
                'detail' => ['en' => 'Building networks, hardening security, automating tasks, and managing servers.', 'id' => 'Membangun jaringan, mengamankan, melakukan otomasi, dan mengelola server.'],
                'points' => [
                    ['en' => 'Network build-out', 'id' => 'Membangun jaringan'],
                    ['en' => 'Network security', 'id' => 'Keamanan jaringan'],
                    ['en' => 'Automation & programming', 'id' => 'Otomasi & pemrograman'],
                    ['en' => 'Server management', 'id' => 'Manajemen server'],
                ],
                'show_in_build' => true,
            ],
            [
                'key' => 'cctv', 'icon' => 'camera', 'accent' => '#fbbf24',
                'title' => ['en' => 'CCTV Installation', 'id' => 'Instalasi CCTV'],
                'years' => ['en' => '2 years experience', 'id' => 'Pengalaman 2 tahun'],
                'years_short' => '2',
                'detail' => ['en' => 'End-to-end CCTV work: devices, electrical, networking, and scheduled maintenance.', 'id' => 'Pekerjaan CCTV menyeluruh: perangkat, kelistrikan, jaringan, dan perawatan terjadwal.'],
                'points' => [
                    ['en' => 'Device installation', 'id' => 'Instalasi perangkat'],
                    ['en' => 'Electrical work', 'id' => 'Kelistrikan'],
                    ['en' => 'Computer networking', 'id' => 'Jaringan komputer'],
                    ['en' => 'Troubleshooting', 'id' => 'Pemecahan masalah'],
                    ['en' => 'Scheduled maintenance', 'id' => 'Perawatan berkala'],
                ],
                'show_in_build' => true,
            ],
            [
                'key' => 'tkj', 'icon' => 'briefcase', 'accent' => '#a78bfa',
                'title' => ['en' => 'Computer & Network Engineering (TKJ)', 'id' => 'Teknik Komputer & Jaringan (TKJ)'],
                'years' => null,
                'years_short' => null,
                'detail' => ['en' => 'PC assembly, operating systems, cabling, and network device configuration.', 'id' => 'Perakitan PC, sistem operasi, pengkabelan, dan konfigurasi perangkat jaringan.'],
                'points' => [
                    ['en' => 'PC assembly', 'id' => 'Merakit PC'],
                    ['en' => 'Troubleshooting', 'id' => 'Troubleshooting'],
                    ['en' => 'OS installation', 'id' => 'Instalasi OS'],
                    ['en' => 'Cabling', 'id' => 'Pengkabelan'],
                    ['en' => 'Network topology', 'id' => 'Topologi jaringan'],
                    ['en' => 'Device configuration', 'id' => 'Konfigurasi perangkat'],
                ],
                'show_in_build' => true,
            ],
            [
                'key' => 'design', 'icon' => 'palette', 'accent' => '#f472b6',
                'title' => ['en' => 'Graphic Design', 'id' => 'Desain Grafis'],
                'years' => null,
                'years_short' => null,
                'detail' => ['en' => 'Visual design work for print and digital needs.', 'id' => 'Pekerjaan desain visual untuk kebutuhan cetak dan digital.'],
                'points' => [
                    ['en' => 'CorelDRAW', 'id' => 'CorelDRAW'],
                    ['en' => 'Photoshop', 'id' => 'Photoshop'],
                    ['en' => 'Adobe Illustrator', 'id' => 'Adobe Illustrator'],
                    ['en' => 'Canva', 'id' => 'Canva'],
                ],
                'show_in_build' => true,
            ],
            [
                'key' => 'web', 'icon' => 'code', 'accent' => '#22d3ee',
                'title' => ['en' => 'Web & Application Development', 'id' => 'Pengembangan Web & Aplikasi'],
                'years' => null,
                'years_short' => null,
                'detail' => ['en' => 'Building web pages and internal tools, including Google Apps Script automation.', 'id' => 'Membangun halaman web dan perkakas internal, termasuk otomasi Google Apps Script.'],
                'points' => [
                    ['en' => 'Apps Script', 'id' => 'Apps Script'],
                    ['en' => 'HTML & CSS', 'id' => 'HTML & CSS'],
                    ['en' => 'JavaScript', 'id' => 'JavaScript'],
                    ['en' => 'Application development', 'id' => 'Pembuatan aplikasi'],
                ],
                'show_in_build' => false,
            ],
        ];

        foreach ($items as $i => $item) {
            Expertise::updateOrCreate(
                ['key' => $item['key']],
                array_merge($item, [
                    'is_published' => true,
                    'sort_order' => $i,
                ]),
            );
        }

        $this->command->info(count($items) . ' bidang keahlian diisi.');
    }
}
