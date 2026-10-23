<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

/**
 * Dua entri testimoni KOSONG bertanda contoh.
 *
 * Testimoni karangan pernah ada di data.js ("Aulia R.", "Muhammad Rizky",
 * "Nadia S.") dan sudah dihapus. Jangan diisi ulang dengan karangan:
 * testimoni palsu di situs jasa merusak kepercayaan yang justru
 * ingin dibangun situs ini.
 */
class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([1, 2] as $i) {
            Testimonial::updateOrCreate(
                ['name' => "Nama pengunjung {$i}"],
                [
                    'role'    => ['en' => 'Role / organisation', 'id' => 'Jabatan / instansi'],
                    'message' => [
                        'en' => 'Visitor comment will appear here.',
                        'id' => 'Komentar pengunjung akan tampil di sini.',
                    ],
                    'project_ref'    => null,
                    'is_pinned'      => $i === 1,
                    'is_placeholder' => true,
                    'sort_order'     => $i - 1,
                ],
            );
        }

        $this->command->warn('2 testimoni CONTOH diisi - ganti dengan testimoni asli beserta izinnya.');
    }
}
