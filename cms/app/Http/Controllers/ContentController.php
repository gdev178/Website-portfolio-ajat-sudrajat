<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\CreativeWork;
use App\Models\Expertise;
use App\Models\Project;
use App\Models\Setting;
use App\Models\SocialLink;
use App\Models\TechGroup;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

/**
 * Satu endpoint yang menggabungkan seluruh konten terbit.
 *
 * Bentuk JSON-nya sengaja dirancang supaya portfolio/src/data.js bisa
 * membacanya langsung tanpa transformasi tambahan — lihat bagian
 * "Cara menyambungkan React" di CLAUDE.md. Kalau field di sini berubah
 * nama, sesuaikan juga pemetaan di data.js.
 */
class ContentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json($this->data());
    }

    /**
     * Dipakai juga oleh route SPA (routes/web.php) untuk menyuntikkan
     * window.__CONTENT__ langsung ke HTML — lihat catatan Tahap 6 di
     * CLAUDE.md kenapa ini dipisah dari index().
     *
     * @return array<string, mixed>
     */
    public function data(): array
    {
        return Cache::remember('api.content', now()->addMinutes(5), fn () => [
            'identitas'     => $this->identitas(),
            'hero'          => $this->hero(),
            'about'         => $this->about(),
            'projects'      => $this->projects(),
            'creativeWorks' => $this->creativeWorks(),
            'certificates'  => $this->certificates(),
            'testimonials'  => $this->testimonials(),
            'expertise'     => $this->expertise(),
            'techGroups'    => $this->techGroups(),
            'socials'       => $this->socials(),
            'highlights'    => $this->highlights(),
            'snapshot'      => $this->snapshot(),
            'build'         => $this->build(),
            'process'       => $this->process(),
            'cta'           => $this->cta(),
            'practice'      => $this->practice(),
            'ecosystem'     => $this->ecosystem(),
            'values'        => $this->values(),
            'tools'         => $this->tools(),
            'aboutCta'      => $this->aboutCta(),
            'experience'    => $this->experience(),
        ]);
    }

    /** @return array<string, mixed> */
    private function identitas(): array
    {
        return [
            'namaDepan'    => Setting::get('identitas.nama_depan'),
            'namaBelakang' => Setting::get('identitas.nama_belakang'),
            'inisial'      => Setting::get('identitas.inisial'),
            'brand'        => Setting::get('identitas.brand'),
            'brandSuffix'  => Setting::get('identitas.brand_suffix'),
            'jabatan'      => Setting::get('identitas.jabatan'),
            'email'        => Setting::get('identitas.email'),
            'telepon'      => Setting::get('identitas.telepon'),
            'alamat'       => Setting::get('identitas.alamat'),
            'lokasiSingkat'=> Setting::get('identitas.lokasi_singkat'),
            'foto'         => $this->fileUrl(Setting::get('identitas.foto')),
            'fotoGelap'    => $this->fileUrl(Setting::get('identitas.foto_gelap')),
            'fotoAbout'    => $this->fileUrl(Setting::get('identitas.foto_about')),
            'logo'         => $this->fileUrl(Setting::get('identitas.logo')),
            'cv'           => $this->fileUrl(Setting::get('identitas.cv')),
        ];
    }

    /** @return array<string, mixed> */
    private function hero(): array
    {
        return [
            'judulAtas'  => Setting::get('hero.judul_atas'),
            'judulAksen' => Setting::get('hero.judul_aksen'),
            'lead'       => Setting::get('hero.lead'),
            'sub'        => Setting::get('hero.sub'),
        ];
    }

    /** @return array<string, mixed> */
    private function about(): array
    {
        return [
            'judulHalaman'   => Setting::get('about.judul_halaman'),
            'judulBlok'      => Setting::get('about.judul_blok'),
            'lead'           => Setting::get('about.lead'),
            'isi'            => Setting::get('about.isi'),
            'kutipan'        => Setting::get('about.kutipan'),
            'kartuDukungan'  => Setting::get('about.kartu_dukungan'),
        ];
    }

    /**
     * Semua proyek terbit dikirim apa adanya, TANPA menyaring is_placeholder.
     *
     * Beda dengan sertifikat/testimoni: isi proyek yang belum final masih
     * berupa uraian layanan turunan dari daftar keahlian (boleh tampil per
     * CLAUDE.md 4.1), bukan klaim yang bisa menyesatkan. Frontend memang
     * tidak pernah memberi badge CONTOH untuk kartu proyek/karya — kalau
     * difilter di sini, situs akan tampak kosong padahal seharusnya tidak.
     *
     * @return array<int, array<string, mixed>>
     */
    private function projects(): array
    {
        return Project::published()->get()->map(fn (Project $p) => [
            'slug'        => $p->slug,
            'title'       => $p->title,
            'category'    => $p->category,
            'type'        => $p->type,
            'year'        => $p->year,
            'description' => $p->description,
            'detail'      => $p->detail,
            'points'      => $p->points ?? [],
            'stack'       => $p->stack ?? [],
            'image'       => $this->fileUrl($p->image),
            'liveUrl'     => $p->live_url,
            'featured'    => $p->is_featured,
        ])->all();
    }

    /**
     * Sama seperti projects() — tidak menyaring is_placeholder. Lihat
     * catatan di atas method projects() untuk alasannya.
     *
     * @return array<int, array<string, mixed>>
     */
    private function creativeWorks(): array
    {
        return CreativeWork::published()->get()->map(fn (CreativeWork $w) => [
            'slug'        => $w->slug,
            'title'       => $w->title,
            'category'    => $w->category,
            'subtitle'    => $w->subtitle,
            'description' => $w->description,
            'points'      => $w->points ?? [],
            'tools'       => $w->tools ?? [],
            'gradient'    => $w->gradient,
            'image'       => $this->fileUrl($w->image),
            'span'        => $w->span,
        ])->all();
    }

    /**
     * Semua sertifikat (termasuk contoh) dikirim apa adanya — frontend
     * sendiri yang menyaring FEATURED_CERTIFICATES dan memasang badge
     * CONTOH, persis seperti pada data statisnya.
     *
     * @return array<int, array<string, mixed>>
     */
    private function certificates(): array
    {
        return Certificate::published()->get()->map(fn (Certificate $c) => [
            'slug'        => $c->slug,
            'title'       => $c->title,
            'issuer'      => $c->issuer,
            'category'    => $c->category,
            'date'        => $c->date,
            'credential'  => $c->credential,
            'image'       => $this->fileUrl($c->image),
            'href'        => $c->href,
            'featured'    => $c->is_featured,
            'placeholder' => $c->is_placeholder,
        ])->all();
    }

    /**
     * Dipetakan ke bentuk GUESTBOOK lama (id, name, initials, date, message,
     * reply, likes, pinned, placeholder) supaya Contact.jsx dan
     * HomeSections4.jsx tidak perlu diubah bentuk datanya.
     *
     * @return array<int, array<string, mixed>>
     */
    private function testimonials(): array
    {
        return Testimonial::published()->get()->map(fn (Testimonial $t) => [
            'id'          => $t->id,
            'name'        => $t->name,
            'initials'    => $t->initials,
            'date'        => $t->created_at?->format('Y-m-d') ?? '—',
            'message'     => $t->message,
            'role'        => $t->role,
            'projectRef'  => $t->project_ref,
            'pinned'      => $t->is_pinned,
            'placeholder' => $t->is_placeholder,
        ])->all();
    }

    /** @return array<int, array<string, mixed>> */
    private function expertise(): array
    {
        return Expertise::published()->get()->map(fn (Expertise $e) => [
            'key'        => $e->key,
            'icon'       => $e->icon,
            'accent'     => $e->accent,
            'title'      => $e->title,
            'years'      => $e->years,
            'yearsShort' => $e->years_short,
            'detail'     => $e->detail,
            'points'     => $e->points ?? [],
        ])->all();
    }

    /** @return array<int, array<string, mixed>> */
    private function techGroups(): array
    {
        return TechGroup::ordered()->with(['items' => fn ($q) => $q->published()])->get()
            ->map(fn (TechGroup $g) => [
                'key'   => $g->key,
                'label' => $g->label,
                'items' => $g->items->map(fn ($i) => [
                    'name'  => $i->name,
                    'mono'  => $i->mono,
                    'bg'    => $i->bg,
                    'fg'    => $i->fg,
                    'level' => $i->is_main_skill
                        ? ['en' => 'Main skill', 'id' => 'Keahlian utama']
                        : ['en' => 'Frequently used', 'id' => 'Sering dipakai'],
                ])->all(),
            ])->all();
    }

    /** @return array<int, array<string, mixed>> */
    private function socials(): array
    {
        return SocialLink::published()->get()->map(fn (SocialLink $s) => [
            'label' => $s->label,
            'icon'  => $s->icon,
            'value' => $s->value,
            'href'  => $s->href,
        ])->all();
    }

    /** @return array<string, mixed> */
    private function highlights(): array
    {
        return [
            'cards' => Setting::get('highlights.cards', []),
            'focus' => Setting::get('highlights.focus', []),
        ];
    }

    /** @return array<string, mixed> */
    private function snapshot(): array
    {
        return [
            'headline'      => Setting::get('snapshot.headline'),
            'bigValue'      => Setting::get('snapshot.big_value'),
            'bigDetail'     => Setting::get('snapshot.big_detail'),
            'metrics'       => Setting::get('snapshot.metrics', []),
            'activityLabel' => Setting::get('snapshot.activity_label'),
            'activity'      => Setting::get('snapshot.activity', []),
        ];
    }

    /** @return array<string, mixed> */
    private function build(): array
    {
        return [
            'title'  => Setting::get('build.title'),
            'detail' => Setting::get('build.detail'),
            'points' => Setting::get('build.points', []),
        ];
    }

    /** @return array<string, mixed> */
    private function process(): array
    {
        return [
            'headline' => Setting::get('process.headline'),
            'detail'   => Setting::get('process.detail'),
            'steps'    => Setting::get('process.steps', []),
        ];
    }

    /** @return array<string, mixed> */
    private function cta(): array
    {
        return [
            'headline' => Setting::get('cta.final_headline'),
            'detail'   => Setting::get('cta.final_detail'),
        ];
    }

    /** @return array<string, mixed> */
    private function practice(): array
    {
        return [
            'headline' => Setting::get('practice.headline'),
            'detail'   => Setting::get('practice.detail'),
            'items'    => Setting::get('practice.items', []),
        ];
    }

    /** @return array<string, mixed> */
    private function ecosystem(): array
    {
        return [
            'headline' => Setting::get('ecosystem.headline'),
            'centre'   => [
                'icon'     => Setting::get('ecosystem.centre_icon'),
                'title'    => Setting::get('ecosystem.centre_title'),
                'subtitle' => Setting::get('ecosystem.centre_subtitle'),
            ],
            'items' => Setting::get('ecosystem.items', []),
        ];
    }

    /** @return array<string, mixed> */
    private function values(): array
    {
        return [
            'headline' => Setting::get('values.headline'),
            'items'    => Setting::get('values.items', []),
        ];
    }

    /** @return array<string, mixed> */
    private function tools(): array
    {
        return [
            'list' => Setting::get('tools.list', []),
            'note' => Setting::get('tools.note'),
        ];
    }

    /** @return array<string, mixed> */
    private function aboutCta(): array
    {
        return [
            'headline' => Setting::get('about_cta.headline'),
            'detail'   => Setting::get('about_cta.detail'),
        ];
    }

    /** @return array<int, array<string, mixed>> */
    private function experience(): array
    {
        return Setting::get('experience.entries', []);
    }

    private function fileUrl(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        // FileUpload Filament menyimpan path relatif terhadap disk "public"
        return Storage::disk('public')->url($path);
    }
}
