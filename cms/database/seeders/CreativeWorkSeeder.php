<?php

namespace Database\Seeders;

use App\Models\CreativeWork;
use Illuminate\Database\Seeder;

/**
 * Enam karya kreatif dari portfolio/src/data.js.
 * Semuanya ditandai contoh sampai klien mengirim karya asli + gambarnya.
 */
class CreativeWorkSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->data() as $i => $row) {
            CreativeWork::updateOrCreate(
                ['slug' => $row['slug']],
                $row + ['sort_order' => $i, 'is_placeholder' => true],
            );
        }

        $this->command->info(count($this->data()) . ' karya kreatif diisi.');
    }

    /** @return array<int, array<string, mixed>> */
    private function data(): array
    {
        return [
            [
                'slug'     => 'banner-signage',
                'title'    => ['en' => 'Banner & Signage', 'id' => 'Banner & Signage'],
                'category' => ['en' => 'Print Design', 'id' => 'Desain Cetak'],
                'subtitle' => ['en' => 'Print work built in CorelDRAW', 'id' => 'Karya cetak dibuat di CorelDRAW'],
                'description' => [
                    'en' => 'Large-format print material prepared to spec: correct bleed, colour mode, and resolution so the result matches on the press.',
                    'id' => 'Materi cetak format besar yang disiapkan sesuai standar: bleed, mode warna, dan resolusi yang tepat agar hasil cetaknya sesuai.',
                ],
                'points' => [
                    ['en' => 'Print-ready artwork setup', 'id' => 'Penyiapan artwork siap cetak'],
                    ['en' => 'CMYK colour handling', 'id' => 'Penanganan warna CMYK'],
                    ['en' => 'Layout for large format', 'id' => 'Tata letak format besar'],
                ],
                'tools'    => ['CorelDRAW', 'Photoshop'],
                'gradient' => 'linear-gradient(135deg,#0a3d1f,#0d2a19 60%,#08130d)',
                'span'     => 'large',
            ],
            [
                'slug'     => 'logo-identity',
                'title'    => ['en' => 'Logo & Identity', 'id' => 'Logo & Identitas'],
                'category' => ['en' => 'Branding', 'id' => 'Branding'],
                'subtitle' => ['en' => 'Marks drawn in Illustrator', 'id' => 'Logo digambar di Illustrator'],
                'description' => [
                    'en' => 'Vector marks and simple identity sets — logo variations, colour rules, and usage that stays readable at any size.',
                    'id' => 'Logo vektor dan set identitas sederhana — variasi logo, aturan warna, dan penggunaan yang tetap terbaca di ukuran apa pun.',
                ],
                'points' => [
                    ['en' => 'Vector logo construction', 'id' => 'Pembuatan logo vektor'],
                    ['en' => 'Logo variations', 'id' => 'Variasi logo'],
                    ['en' => 'Colour and usage rules', 'id' => 'Aturan warna dan penggunaan'],
                ],
                'tools'    => ['Adobe Illustrator', 'CorelDRAW'],
                'gradient' => 'linear-gradient(135deg,#3a2456,#241733 55%,#120c1a)',
                'span'     => 'normal',
            ],
            [
                'slug'     => 'photo-retouching',
                'title'    => ['en' => 'Photo Retouching', 'id' => 'Retouch Foto'],
                'category' => ['en' => 'Photo Editing', 'id' => 'Edit Foto'],
                'subtitle' => ['en' => 'Clean-up and composition in Photoshop', 'id' => 'Perapihan dan komposisi di Photoshop'],
                'description' => [
                    'en' => 'Cleaning up and correcting photos — exposure, colour, background removal, and compositing for print or social use.',
                    'id' => 'Merapikan dan mengoreksi foto — eksposur, warna, penghapusan latar, dan compositing untuk kebutuhan cetak atau media sosial.',
                ],
                'points' => [
                    ['en' => 'Exposure and colour correction', 'id' => 'Koreksi eksposur dan warna'],
                    ['en' => 'Background removal', 'id' => 'Penghapusan latar'],
                    ['en' => 'Compositing', 'id' => 'Compositing'],
                ],
                'tools'    => ['Photoshop'],
                'gradient' => 'linear-gradient(135deg,#123a5c,#0d2033 60%,#0a1017)',
                'span'     => 'normal',
            ],
            [
                'slug'     => 'content-templates',
                'title'    => ['en' => 'Content Templates', 'id' => 'Template Konten'],
                'category' => ['en' => 'Social Media', 'id' => 'Media Sosial'],
                'subtitle' => ['en' => 'Fast turnaround with Canva', 'id' => 'Pengerjaan cepat dengan Canva'],
                'description' => [
                    'en' => 'Reusable social media templates so posts stay consistent and can be updated quickly without starting from scratch.',
                    'id' => 'Template media sosial yang bisa dipakai ulang agar unggahan tetap konsisten dan cepat diperbarui tanpa mulai dari nol.',
                ],
                'points' => [
                    ['en' => 'Reusable template sets', 'id' => 'Set template pakai ulang'],
                    ['en' => 'Consistent visual style', 'id' => 'Gaya visual konsisten'],
                    ['en' => 'Multi-size export', 'id' => 'Ekspor berbagai ukuran'],
                ],
                'tools'    => ['Canva', 'Photoshop'],
                'gradient' => 'linear-gradient(135deg,#0f3d3a,#0b2422 60%,#08110f)',
                'span'     => 'wide',
            ],
            [
                'slug'     => 'field-documentation',
                'title'    => ['en' => 'Field Documentation', 'id' => 'Dokumentasi Lapangan'],
                'category' => ['en' => 'Documentation', 'id' => 'Dokumentasi'],
                'subtitle' => ['en' => 'Installation records and reports', 'id' => 'Catatan dan laporan instalasi'],
                'description' => [
                    'en' => 'Visual records of installation work — before and after shots, cable routing, and device placement compiled into clear reports.',
                    'id' => 'Rekaman visual pekerjaan instalasi — foto sebelum dan sesudah, jalur kabel, dan penempatan perangkat yang disusun jadi laporan yang jelas.',
                ],
                'points' => [
                    ['en' => 'Before and after documentation', 'id' => 'Dokumentasi sebelum dan sesudah'],
                    ['en' => 'Cable routing records', 'id' => 'Catatan jalur kabel'],
                    ['en' => 'Report layout', 'id' => 'Tata letak laporan'],
                ],
                'tools'    => ['Photoshop', 'Canva'],
                'gradient' => 'linear-gradient(135deg,#5c3a12,#2b1c0d 60%,#100c08)',
                'span'     => 'normal',
            ],
            [
                'slug'     => 'brochure-layout',
                'title'    => ['en' => 'Brochure & Flyer Layout', 'id' => 'Tata Letak Brosur & Flyer'],
                'category' => ['en' => 'Print Design', 'id' => 'Desain Cetak'],
                'subtitle' => ['en' => 'Structured layouts for print', 'id' => 'Tata letak terstruktur untuk cetak'],
                'description' => [
                    'en' => 'Multi-page and folded print layouts with a clear reading order, consistent typography, and disciplined use of white space.',
                    'id' => 'Tata letak cetak multi-halaman dan lipat dengan urutan baca yang jelas, tipografi konsisten, dan pemakaian ruang kosong yang tertata.',
                ],
                'points' => [
                    ['en' => 'Multi-page layout', 'id' => 'Tata letak multi-halaman'],
                    ['en' => 'Typography hierarchy', 'id' => 'Hierarki tipografi'],
                    ['en' => 'Fold and margin planning', 'id' => 'Perencanaan lipatan dan margin'],
                ],
                'tools'    => ['CorelDRAW', 'Adobe Illustrator'],
                'gradient' => 'linear-gradient(135deg,#1c3a52,#122536 60%,#0a1219)',
                'span'     => 'normal',
            ],
        ];
    }
}
