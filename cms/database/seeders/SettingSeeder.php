<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * Mengisi tabel settings dengan konten yang saat ini ada di
 * portfolio/src/data.js, supaya admin tidak mulai dari halaman kosong.
 *
 * Aman dijalankan berulang: memakai updateOrCreate lewat Setting::put().
 */
class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // ---------- identitas ----------
            ['identitas.nama_depan', 'Ajat', 'identitas'],
            ['identitas.nama_belakang', 'Sudrajat', 'identitas'],
            ['identitas.inisial', 'AS', 'identitas'],
            ['identitas.brand', 'AJAT', 'identitas'],
            ['identitas.brand_suffix', '/ TECH', 'identitas'],
            ['identitas.email', 'ajatsudrajat.gp@gmail.com', 'identitas'],
            ['identitas.telepon', '0813-2053-6570', 'identitas'],
            ['identitas.alamat', 'Jl. Katapang Andir No.11, Sukamukti, Kec. Katapang, Kabupaten Bandung, Jawa Barat 40921', 'identitas'],
            ['identitas.foto', null, 'identitas'],
            ['identitas.cv', null, 'identitas'],

            ['identitas.jabatan', [
                'en' => 'IT Technician & Network Engineer',
                'id' => 'Teknisi IT & Network Engineer',
            ], 'identitas'],

            ['identitas.lokasi_singkat', [
                'en' => 'Bandung Regency, West Java',
                'id' => 'Kabupaten Bandung, Jawa Barat',
            ], 'identitas'],

            // ---------- hero ----------
            ['hero.judul_atas', [
                'en' => 'IT Technician &',
                'id' => 'Teknisi IT &',
            ], 'hero'],

            ['hero.judul_aksen', [
                'en' => 'Network Engineer',
                'id' => 'Network Engineer',
            ], 'hero'],

            ['hero.lead', [
                'en' => 'I keep ATM/CRM machines, computer networks, and CCTV systems running reliably — from installation and configuration to routine maintenance.',
                'id' => 'Saya menjaga mesin ATM/CRM, jaringan komputer, dan sistem CCTV tetap berjalan andal — mulai dari instalasi, konfigurasi, sampai perawatan berkala.',
            ], 'hero'],

            ['hero.sub', [
                'en' => 'Field technical work is my main focus, supported by graphic design and web & application development.',
                'id' => 'Pekerjaan teknis lapangan adalah fokus utama saya, didukung desain grafis serta pengembangan web dan aplikasi.',
            ], 'hero'],

            // ---------- about ----------
            ['about.judul_halaman', [
                'en' => 'Keeping technical systems running with a hands-on point of view.',
                'id' => 'Menjaga sistem teknis tetap berjalan dengan pendekatan turun tangan.',
            ], 'about'],

            ['about.judul_blok', [
                'en' => 'Keeping technical systems running, from the machine to the network.',
                'id' => 'Menjaga sistem teknis tetap berjalan, dari mesinnya sampai jaringannya.',
            ], 'about'],

            ['about.lead', [
                'en' => 'An IT technician and network engineer who enjoys turning unclear technical problems into systems that run reliably and stay maintained.',
                'id' => 'Teknisi IT dan network engineer yang senang mengubah masalah teknis yang belum jelas menjadi sistem yang berjalan andal dan tetap terawat.',
            ], 'about'],

            ['about.isi', [
                'en' => 'I have spent eight years handling ATM and CRM machines at Bank Mandiri, covering repair, monitoring, and routine service. Alongside that, I work as a network engineer building and securing networks, managing servers, and installing CCTV systems. Graphic design and web development round out the work when a project needs it.',
                'id' => 'Saya menghabiskan delapan tahun menangani mesin ATM dan CRM di Bank Mandiri, mencakup perbaikan, monitoring, dan servis berkala. Selain itu saya bekerja sebagai network engineer: membangun dan mengamankan jaringan, mengelola server, serta memasang sistem CCTV. Desain grafis dan pengembangan web melengkapi pekerjaan ketika sebuah proyek membutuhkannya.',
            ], 'about'],

            ['about.kutipan', [
                'en' => 'A system is only as good as the maintenance behind it.',
                'id' => 'Sebuah sistem hanya sebaik perawatan di baliknya.',
            ], 'about'],

            ['about.kartu_dukungan', [
                'en' => 'Graphic design and web development support the technical work.',
                'id' => 'Desain grafis dan pengembangan web menopang pekerjaan teknis.',
            ], 'about'],

            // ---------- highlights (beranda) ----------
            ['highlights.cards', [
                ['icon' => 'sparkles', 'value' => '8+', 'bar' => 0.85,
                    'title' => ['en' => 'Years of Experience', 'id' => 'Tahun Pengalaman'],
                    'detail' => ['en' => 'Handling ATM/CRM machines in the field', 'id' => 'Menangani mesin ATM/CRM di lapangan']],
                ['icon' => 'briefcase', 'value' => '6', 'bar' => 0.75,
                    'title' => ['en' => 'Areas of Expertise', 'id' => 'Bidang Keahlian'],
                    'detail' => ['en' => 'From machines and networks to design and web', 'id' => 'Dari mesin dan jaringan sampai desain dan web']],
                ['icon' => 'award', 'value' => '50+', 'bar' => 0.65,
                    'title' => ['en' => 'Sites Handled', 'id' => 'Lokasi Ditangani'],
                    'detail' => ['en' => 'Installation, service, and maintenance visits', 'id' => 'Instalasi, servis, dan kunjungan perawatan']],
            ], 'highlights'],

            ['highlights.focus', [
                ['label' => ['en' => 'Main Focus', 'id' => 'Fokus Utama'], 'value' => ['en' => 'ATM/CRM & Networking', 'id' => 'ATM/CRM & Jaringan']],
                ['label' => ['en' => 'Also Handles', 'id' => 'Juga Menangani'], 'value' => ['en' => 'CCTV & TKJ', 'id' => 'CCTV & TKJ']],
                ['label' => ['en' => 'Creative Support', 'id' => 'Dukungan Kreatif'], 'value' => ['en' => 'Design, Web, Apps', 'id' => 'Desain, Web, Aplikasi']],
            ], 'highlights'],

            // ---------- snapshot (beranda) ----------
            ['snapshot.headline', [
                'en' => 'Hands-on technical work, backed by years in the field.',
                'id' => 'Kerja teknis langsung, ditopang pengalaman bertahun-tahun di lapangan.',
            ], 'snapshot'],
            ['snapshot.big_value', '8', 'snapshot'],
            ['snapshot.big_detail', [
                'en' => 'Years of field experience across banking machines, networks, and security systems.',
                'id' => 'Tahun pengalaman lapangan mencakup mesin perbankan, jaringan, dan sistem keamanan.',
            ], 'snapshot'],
            ['snapshot.metrics', [
                ['label' => ['en' => 'Areas of Expertise', 'id' => 'Bidang Keahlian'], 'value' => ['en' => '06', 'id' => '06']],
                ['label' => ['en' => 'Years in Networking', 'id' => 'Tahun di Jaringan'], 'value' => ['en' => '04', 'id' => '04']],
                ['label' => ['en' => 'Years in CCTV', 'id' => 'Tahun di CCTV'], 'value' => ['en' => '02', 'id' => '02']],
                ['label' => ['en' => 'Current Availability', 'id' => 'Ketersediaan Saat Ini'], 'value' => ['en' => 'Open for projects', 'id' => 'Terbuka untuk proyek'], 'accent' => true],
            ], 'snapshot'],
            ['snapshot.activity_label', ['en' => 'Field Activity', 'id' => 'Aktivitas Lapangan'], 'snapshot'],
            ['snapshot.activity', [2, 0, 1, 1, 0, 2, 1, 0, 1, 1, 2, 0, 1, 0, 1, 2, 0, 1], 'snapshot'],

            // ---------- build / fokus utama (beranda) ----------
            ['build.title', [
                'en' => 'ATM/CRM Service & Network Infrastructure',
                'id' => 'Servis ATM/CRM & Infrastruktur Jaringan',
            ], 'build'],
            ['build.detail', [
                'en' => 'Field technical work that keeps banking machines and office networks reliable — repair, configuration, monitoring, and scheduled maintenance.',
                'id' => 'Pekerjaan teknis lapangan yang menjaga mesin perbankan dan jaringan kantor tetap andal — perbaikan, konfigurasi, monitoring, dan perawatan terjadwal.',
            ], 'build'],
            ['build.points', [
                ['en' => 'On-site repair', 'id' => 'Perbaikan di lokasi'],
                ['en' => 'Network configuration', 'id' => 'Konfigurasi jaringan'],
                ['en' => 'Scheduled maintenance', 'id' => 'Perawatan berkala'],
            ], 'build'],

            // ---------- process (beranda) ----------
            ['process.headline', ['en' => 'From Survey to Running System', 'id' => 'Dari Survei ke Sistem Berjalan'], 'process'],
            ['process.detail', [
                'en' => 'A clear working sequence that turns a technical need into a system that runs and stays maintained.',
                'id' => 'Urutan kerja yang jelas untuk mengubah kebutuhan teknis menjadi sistem yang berjalan dan terawat.',
            ], 'process'],
            ['process.steps', [
                ['en' => 'Survey', 'id' => 'Survei'],
                ['en' => 'Analyze', 'id' => 'Analisis'],
                ['en' => 'Plan', 'id' => 'Perencanaan'],
                ['en' => 'Design', 'id' => 'Perancangan'],
                ['en' => 'Install', 'id' => 'Instalasi'],
                ['en' => 'Test', 'id' => 'Pengujian'],
                ['en' => 'Handover', 'id' => 'Serah Terima'],
                ['en' => 'Maintain', 'id' => 'Perawatan'],
            ], 'process'],

            // ---------- cta (beranda) ----------
            ['cta.final_headline', ['en' => "Let's Build Something Reliable.", 'id' => 'Mari Bangun Sesuatu yang Andal.'], 'cta'],
            ['cta.final_detail', [
                'en' => 'A machine that needs service, a network to build, or a site to secure — it can start with a conversation.',
                'id' => 'Mesin yang perlu diservis, jaringan yang perlu dibangun, atau lokasi yang perlu diamankan — semuanya bisa dimulai dari obrolan.',
            ], 'cta'],

            // ---------- practice (about) ----------
            ['practice.headline', [
                'en' => 'A field focus supported by a broader technical toolkit.',
                'id' => 'Fokus lapangan yang ditopang perkakas teknis yang lebih luas.',
            ], 'practice'],
            ['practice.detail', [
                'en' => "I'm most engaged when the work is close to the problem: finding what actually broke, fixing it properly, then setting up the maintenance so it does not come back.",
                'id' => 'Saya paling terlibat ketika pekerjaannya dekat dengan masalahnya: menemukan apa yang benar-benar rusak, memperbaikinya dengan benar, lalu menyiapkan perawatan agar tidak terulang.',
            ], 'practice'],
            ['practice.items', [
                ['icon' => 'wrench', 'title' => ['en' => 'Machine Service', 'id' => 'Servis Mesin'],
                    'detail' => ['en' => 'ATM and CRM repair, monitoring, and preventive service in the field.', 'id' => 'Perbaikan, monitoring, dan servis preventif ATM dan CRM di lapangan.']],
                ['icon' => 'monitor', 'title' => ['en' => 'Network & Security', 'id' => 'Jaringan & Keamanan'],
                    'detail' => ['en' => 'Network build-out, device configuration, server management, and CCTV systems.', 'id' => 'Pembangunan jaringan, konfigurasi perangkat, manajemen server, dan sistem CCTV.']],
                ['icon' => 'palette', 'title' => ['en' => 'Design & Web', 'id' => 'Desain & Web'],
                    'detail' => ['en' => 'Graphic design and web or app development that support the technical work.', 'id' => 'Desain grafis dan pengembangan web atau aplikasi yang menopang pekerjaan teknis.']],
            ], 'practice'],

            // ---------- ecosystem (about) ----------
            ['ecosystem.headline', ['en' => 'One central focus. Five supporting disciplines.', 'id' => 'Satu fokus utama. Lima disiplin pendukung.'], 'ecosystem'],
            ['ecosystem.centre_icon', 'wrench', 'ecosystem'],
            ['ecosystem.centre_title', ['en' => 'ATM / CRM', 'id' => 'ATM / CRM'], 'ecosystem'],
            ['ecosystem.centre_subtitle', ['en' => 'The centre of the practice', 'id' => 'Inti dari praktik ini'], 'ecosystem'],
            ['ecosystem.items', [
                ['icon' => 'monitor', 'title' => ['en' => 'Networking', 'id' => 'Jaringan'], 'subtitle' => ['en' => 'Topology & servers', 'id' => 'Topologi & server']],
                ['icon' => 'camera', 'title' => ['en' => 'CCTV', 'id' => 'CCTV'], 'subtitle' => ['en' => 'Security systems', 'id' => 'Sistem keamanan']],
                ['icon' => 'briefcase', 'title' => ['en' => 'TKJ', 'id' => 'TKJ'], 'subtitle' => ['en' => 'PC & operating systems', 'id' => 'PC & sistem operasi']],
                ['icon' => 'palette', 'title' => ['en' => 'Graphic Design', 'id' => 'Desain Grafis'], 'subtitle' => ['en' => 'Print & branding', 'id' => 'Cetak & branding']],
                ['icon' => 'code', 'title' => ['en' => 'Web & Apps', 'id' => 'Web & Aplikasi'], 'subtitle' => ['en' => 'Tools & automation', 'id' => 'Perkakas & otomasi']],
            ], 'ecosystem'],

            // ---------- values & tools (about) ----------
            ['values.headline', [
                'en' => 'A steady process, from first survey to routine maintenance.',
                'id' => 'Proses yang tertata, dari survei awal sampai perawatan rutin.',
            ], 'values'],
            ['values.items', [
                ['en' => 'Fix the cause, not the symptom', 'id' => 'Perbaiki sebabnya, bukan gejalanya'],
                ['en' => 'Careful with the details', 'id' => 'Teliti pada detail'],
                ['en' => 'Clear communication throughout', 'id' => 'Komunikasi jelas sepanjang pengerjaan'],
                ['en' => 'Maintenance is part of the job', 'id' => 'Perawatan bagian dari pekerjaan'],
            ], 'values'],
            ['tools.list', [
                'ATM / CRM', 'CCTV & DVR', 'Topologi Jaringan', 'Manajemen Server', 'Kelistrikan',
                'CorelDRAW', 'Photoshop', 'Illustrator', 'Apps Script', 'JavaScript',
            ], 'tools'],
            ['tools.note', [
                'en' => 'The equipment changes from site to site. What stays the same is a workflow built around careful diagnosis, tidy installation, and scheduled upkeep.',
                'id' => 'Perangkatnya berbeda di tiap lokasi. Yang tetap sama adalah alur kerja yang berpijak pada diagnosis cermat, instalasi rapi, dan perawatan terjadwal.',
            ], 'tools'],

            // ---------- about_cta ----------
            ['about_cta.headline', ["en" => "Let's create a clear next step.", 'id' => 'Mari susun langkah berikutnya.'], 'about_cta'],
            ['about_cta.detail', [
                'en' => "Whether you are planning an installation, fixing a recurring fault, or setting up maintenance, I'd like to hear the context.",
                'id' => 'Entah sedang merencanakan instalasi, membereskan gangguan yang berulang, atau menyiapkan perawatan, saya ingin mendengar konteksnya.',
            ], 'about_cta'],

            // ---------- experience ----------
            ['experience.entries', [
                ['year' => ['en' => '8 years', 'id' => '8 tahun'], 'role' => ['en' => 'ATM / CRM Machine Technician', 'id' => 'Teknisi Mesin ATM / CRM'],
                    'place' => ['en' => 'Bank Mandiri', 'id' => 'Bank Mandiri'],
                    'detail' => ['en' => 'Repair, monitoring, and routine service of ATM and CRM machines across assigned sites.', 'id' => 'Perbaikan, monitoring, dan servis berkala mesin ATM dan CRM di lokasi-lokasi yang ditangani.']],
                ['year' => ['en' => '4 years', 'id' => '4 tahun'], 'role' => ['en' => 'Network Engineer', 'id' => 'Network Engineer'],
                    'place' => ['en' => 'Network projects', 'id' => 'Proyek jaringan'],
                    'detail' => ['en' => 'Building networks, hardening security, automation and programming, and server management.', 'id' => 'Membangun jaringan, keamanan jaringan, otomasi & pemrograman, serta manajemen server.']],
                ['year' => ['en' => '2 years', 'id' => '2 tahun'], 'role' => ['en' => 'CCTV Installation', 'id' => 'Instalasi CCTV'],
                    'place' => ['en' => 'Installation projects', 'id' => 'Proyek instalasi'],
                    'detail' => ['en' => 'Device installation, electrical work, network integration, troubleshooting, and scheduled maintenance.', 'id' => 'Instalasi perangkat, kelistrikan, jaringan komputer, pemecahan masalah, dan perawatan berkala.']],
            ], 'experience'],
        ];

        foreach ($items as [$key, $value, $group]) {
            Setting::put($key, $value, $group);
        }

        $this->command->info(count($items) . ' pengaturan diisi.');
    }
}
