<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

/**
 * Empat entri sertifikat KOSONG bertanda contoh.
 *
 * Sengaja tidak diisi nama sertifikat karangan: sertifikat adalah klaim
 * kualifikasi seseorang, jadi memalsukannya jauh lebih berisiko daripada
 * sekadar menulis uraian layanan. Entri ini hanya supaya tata letak
 * halaman bisa ditinjau, dan tidak tampil di beranda.
 */
class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $kategori = [
            ['en' => 'Networking', 'id' => 'Jaringan'],
            ['en' => 'ATM / CRM', 'id' => 'ATM / CRM'],
            ['en' => 'CCTV', 'id' => 'CCTV'],
            ['en' => 'Graphic Design', 'id' => 'Desain Grafis'],
        ];

        foreach ($kategori as $i => $cat) {
            $n = $i + 1;

            Certificate::updateOrCreate(
                ['slug' => "sertifikat-{$n}"],
                [
                    'title'  => ['en' => 'Certificate title', 'id' => 'Judul sertifikat'],
                    'issuer' => ['en' => 'Issuing organisation', 'id' => 'Nama penerbit'],
                    'category'       => $cat,
                    'date'           => '—',
                    'credential'     => null,
                    'href'           => null,
                    'is_featured'    => $i === 0,
                    'is_placeholder' => true,
                    'sort_order'     => $i,
                ],
            );
        }

        $this->command->warn(count($kategori) . ' sertifikat CONTOH diisi - ganti dengan data asli.');
    }
}
