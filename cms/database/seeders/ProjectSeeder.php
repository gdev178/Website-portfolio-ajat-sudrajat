<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

/**
 * Memindahkan enam proyek yang ada di portfolio/src/data.js ke database.
 *
 * CATATAN: isinya masih uraian layanan, bukan pekerjaan spesifik dengan
 * nama klien dan tahun. Karena itu semuanya ditandai is_placeholder = true
 * sampai klien mengirim data asli.
 *
 * Aman dijalankan berulang (updateOrCreate berdasarkan slug).
 */
class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->data() as $i => $row) {
            Project::updateOrCreate(
                ['slug' => $row['slug']],
                $row + ['sort_order' => $i, 'is_placeholder' => true],
            );
        }

        $this->command->info(count($this->data()) . ' proyek diisi.');
    }

    /** @return array<int, array<string, mixed>> */
    private function data(): array
    {
        return [
            [
                'slug'  => 'atm-crm-field-service',
                'title' => ['en' => 'ATM / CRM Field Service', 'id' => 'Servis Lapangan ATM / CRM'],
                'category' => ['en' => 'ATM / CRM', 'id' => 'ATM / CRM'],
                'type' => ['en' => 'Company Project', 'id' => 'Proyek Perusahaan'],
                'year' => '—',
                'description' => [
                    'en' => 'Repair, monitoring, and routine service of ATM and CRM machines, keeping downtime short and transactions running.',
                    'id' => 'Perbaikan, monitoring, dan servis berkala mesin ATM dan CRM, menjaga downtime tetap singkat dan transaksi tetap berjalan.',
                ],
                'detail' => [
                    'en' => 'Handling ATM and CRM units in the field: diagnosing faults, replacing modules, clearing jams, and running scheduled preventive service. Machine status is monitored so problems are caught before they interrupt service.',
                    'id' => 'Menangani unit ATM dan CRM di lapangan: mendiagnosis kerusakan, mengganti modul, mengatasi macet, dan menjalankan servis preventif terjadwal. Status mesin dipantau agar masalah tertangani sebelum mengganggu layanan.',
                ],
                'points' => [
                    ['en' => 'Fault diagnosis and module replacement', 'id' => 'Diagnosis kerusakan dan penggantian modul'],
                    ['en' => 'Machine status monitoring', 'id' => 'Monitoring status mesin'],
                    ['en' => 'Scheduled preventive service', 'id' => 'Servis preventif terjadwal'],
                    ['en' => 'Incident reporting', 'id' => 'Pelaporan insiden'],
                ],
                'stack' => ['ATM', 'CRM', 'Monitoring', 'Preventive Service'],
                'is_featured' => true,
            ],
            [
                'slug'  => 'office-network-build-out',
                'title' => ['en' => 'Office Network Build-Out', 'id' => 'Pembangunan Jaringan Kantor'],
                'category' => ['en' => 'Networking', 'id' => 'Jaringan'],
                'type' => ['en' => 'Client Work', 'id' => 'Pekerjaan Klien'],
                'year' => '—',
                'description' => [
                    'en' => 'Designing and building office networks: topology, cabling, device configuration, security hardening, and server management.',
                    'id' => 'Merancang dan membangun jaringan kantor: topologi, pengkabelan, konfigurasi perangkat, pengamanan, dan manajemen server.',
                ],
                'detail' => [
                    'en' => 'From site survey to a running network: mapping the topology, running structured cabling, configuring routers and switches, hardening access, and setting up server management so the team can work without interruption.',
                    'id' => 'Dari survei lokasi sampai jaringan berjalan: memetakan topologi, memasang pengkabelan terstruktur, mengonfigurasi router dan switch, mengamankan akses, serta menyiapkan manajemen server agar tim bisa bekerja tanpa gangguan.',
                ],
                'points' => [
                    ['en' => 'Topology design and site survey', 'id' => 'Perancangan topologi dan survei lokasi'],
                    ['en' => 'Structured cabling', 'id' => 'Pengkabelan terstruktur'],
                    ['en' => 'Router and switch configuration', 'id' => 'Konfigurasi router dan switch'],
                    ['en' => 'Security hardening', 'id' => 'Pengamanan jaringan'],
                    ['en' => 'Server management', 'id' => 'Manajemen server'],
                ],
                'stack' => ['Topologi', 'Firewall', 'Server', 'Cabling'],
                'is_featured' => true,
            ],
            [
                'slug'  => 'cctv-system-installation',
                'title' => ['en' => 'CCTV System Installation', 'id' => 'Instalasi Sistem CCTV'],
                'category' => ['en' => 'CCTV', 'id' => 'CCTV'],
                'type' => ['en' => 'Client Work', 'id' => 'Pekerjaan Klien'],
                'year' => '—',
                'description' => [
                    'en' => 'Full CCTV installation covering device mounting, electrical work, network integration, and a scheduled maintenance plan.',
                    'id' => 'Instalasi CCTV menyeluruh mencakup pemasangan perangkat, kelistrikan, integrasi jaringan, dan rencana perawatan berkala.',
                ],
                'detail' => [
                    'en' => 'Camera placement planning, mounting and wiring, DVR/NVR setup, network integration for remote viewing, and a maintenance schedule so footage stays reliable over time.',
                    'id' => 'Perencanaan titik kamera, pemasangan dan pengkabelan, penyiapan DVR/NVR, integrasi jaringan untuk akses jarak jauh, serta jadwal perawatan agar rekaman tetap andal.',
                ],
                'points' => [
                    ['en' => 'Camera placement planning', 'id' => 'Perencanaan titik kamera'],
                    ['en' => 'Mounting and electrical wiring', 'id' => 'Pemasangan dan instalasi kelistrikan'],
                    ['en' => 'DVR / NVR configuration', 'id' => 'Konfigurasi DVR / NVR'],
                    ['en' => 'Remote access setup', 'id' => 'Penyiapan akses jarak jauh'],
                    ['en' => 'Scheduled maintenance', 'id' => 'Perawatan berkala'],
                ],
                'stack' => ['CCTV', 'DVR', 'Kelistrikan', 'Jaringan'],
                'is_featured' => true,
            ],
            [
                'slug'  => 'pc-workstation-setup',
                'title' => ['en' => 'PC & Workstation Setup', 'id' => 'Perakitan PC & Workstation'],
                'category' => ['en' => 'TKJ', 'id' => 'TKJ'],
                'type' => ['en' => 'Client Work', 'id' => 'Pekerjaan Klien'],
                'year' => '—',
                'description' => [
                    'en' => 'Assembling and preparing workstations: hardware build, operating system installation, and troubleshooting.',
                    'id' => 'Merakit dan menyiapkan workstation: perakitan perangkat keras, instalasi sistem operasi, dan troubleshooting.',
                ],
                'detail' => [
                    'en' => 'Building PCs to fit the workload, installing and configuring the operating system and required software, connecting them to the network, and resolving hardware or software issues as they appear.',
                    'id' => 'Merakit PC sesuai kebutuhan kerja, memasang dan mengonfigurasi sistem operasi beserta perangkat lunak yang diperlukan, menghubungkannya ke jaringan, serta menyelesaikan masalah perangkat keras maupun lunak yang muncul.',
                ],
                'points' => [
                    ['en' => 'Hardware assembly', 'id' => 'Perakitan perangkat keras'],
                    ['en' => 'OS installation and configuration', 'id' => 'Instalasi dan konfigurasi OS'],
                    ['en' => 'Network connection', 'id' => 'Penyambungan jaringan'],
                    ['en' => 'Hardware and software troubleshooting', 'id' => 'Troubleshooting perangkat keras dan lunak'],
                ],
                'stack' => ['Merakit PC', 'Instalasi OS', 'Troubleshooting'],
                'is_featured' => false,
            ],
            [
                'slug'  => 'print-branding-design',
                'title' => ['en' => 'Print & Branding Design', 'id' => 'Desain Cetak & Branding'],
                'category' => ['en' => 'Graphic Design', 'id' => 'Desain Grafis'],
                'type' => ['en' => 'Personal Project', 'id' => 'Proyek Pribadi'],
                'year' => '—',
                'description' => [
                    'en' => 'Visual design for print and digital needs — banners, signage, logos, and social media material.',
                    'id' => 'Desain visual untuk kebutuhan cetak dan digital — banner, signage, logo, dan materi media sosial.',
                ],
                'detail' => [
                    'en' => 'Design work produced in CorelDRAW, Photoshop, Illustrator, and Canva, covering print-ready artwork through to social media templates.',
                    'id' => 'Pekerjaan desain yang dikerjakan di CorelDRAW, Photoshop, Illustrator, dan Canva, mencakup artwork siap cetak sampai template media sosial.',
                ],
                'points' => [
                    ['en' => 'Print-ready artwork', 'id' => 'Artwork siap cetak'],
                    ['en' => 'Logo and identity', 'id' => 'Logo dan identitas'],
                    ['en' => 'Photo retouching', 'id' => 'Retouch foto'],
                    ['en' => 'Social media templates', 'id' => 'Template media sosial'],
                ],
                'stack' => ['CorelDRAW', 'Photoshop', 'Illustrator', 'Canva'],
                'is_featured' => false,
            ],
            [
                'slug'  => 'apps-script-automation',
                'title' => ['en' => 'Apps Script Automation', 'id' => 'Otomasi Apps Script'],
                'category' => ['en' => 'Web & Apps', 'id' => 'Web & Aplikasi'],
                'type' => ['en' => 'Personal Project', 'id' => 'Proyek Pribadi'],
                'year' => '—',
                'description' => [
                    'en' => 'Internal tools and automation built on Google Apps Script to cut down repetitive manual work.',
                    'id' => 'Perkakas internal dan otomasi berbasis Google Apps Script untuk memangkas pekerjaan manual berulang.',
                ],
                'detail' => [
                    'en' => 'Scripted workflows on top of Google Sheets and Forms — automatic recap, scheduled notifications, and simple web interfaces so data entry and reporting no longer have to be done by hand.',
                    'id' => 'Alur kerja terprogram di atas Google Sheets dan Forms — rekap otomatis, notifikasi terjadwal, dan antarmuka web sederhana sehingga pencatatan dan pelaporan tidak lagi manual.',
                ],
                'points' => [
                    ['en' => 'Spreadsheet automation', 'id' => 'Otomasi spreadsheet'],
                    ['en' => 'Scheduled notifications', 'id' => 'Notifikasi terjadwal'],
                    ['en' => 'Simple web interfaces', 'id' => 'Antarmuka web sederhana'],
                    ['en' => 'Automatic reporting', 'id' => 'Pelaporan otomatis'],
                ],
                'stack' => ['Apps Script', 'JavaScript', 'HTML & CSS'],
                'is_featured' => false,
            ],
        ];
    }
}
