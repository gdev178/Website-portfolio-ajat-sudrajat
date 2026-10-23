<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

/**
 * Halaman pengaturan teks tetap situs.
 *
 * Semua nilai tersimpan di tabel `settings` sebagai JSON, dengan kunci
 * bertitik (mis. "hero.lead"). Kunci dwibahasa berisi objek {en, id}
 * supaya bentuknya sama persis dengan yang dibaca frontend React.
 *
 * Field skalar/bilingual sederhana dikelola lewat KEYS/BILINGUAL (pola
 * Tahap 1). Field berbentuk daftar (Repeater) dikelola manual di
 * fillForm()/save() mengikuti pola PengaturanBeranda.php — nama field
 * top-level tidak boleh mengandung titik, tapi titik AMAN dipakai di
 * dalam schema Repeater (mis. title.id/title.en).
 */
class Pengaturan extends Page
{
    protected string $view = 'filament.pages.pengaturan';

    protected static string | BackedEnum | null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static ?string $navigationLabel = 'Pengaturan';

    protected static ?string $title = 'Pengaturan Situs';

    protected static ?int $navigationSort = 90;

    /** @var array<string, mixed> */
    public array $data = [];

    /**
     * Kunci yang dikelola halaman ini: kunci => grup.
     * Dipakai saat memuat maupun menyimpan.
     */
    private const KEYS = [
        'identitas.nama_depan'     => 'identitas',
        'identitas.nama_belakang'  => 'identitas',
        'identitas.inisial'        => 'identitas',
        'identitas.brand'          => 'identitas',
        'identitas.brand_suffix'   => 'identitas',
        'identitas.jabatan'        => 'identitas',
        'identitas.email'          => 'identitas',
        'identitas.telepon'        => 'identitas',
        'identitas.alamat'         => 'identitas',
        'identitas.lokasi_singkat' => 'identitas',
        'identitas.foto'           => 'identitas',
        'identitas.foto_gelap'     => 'identitas',
        'identitas.foto_about'     => 'identitas',
        'identitas.logo'           => 'identitas',
        'identitas.cv'             => 'identitas',

        'hero.judul_atas'  => 'hero',
        'hero.judul_aksen' => 'hero',
        'hero.lead'        => 'hero',
        'hero.sub'         => 'hero',

        'about.judul_halaman'  => 'about',
        'about.judul_blok'     => 'about',
        'about.lead'           => 'about',
        'about.isi'            => 'about',
        'about.kutipan'        => 'about',
        'about.kartu_dukungan' => 'about',

        'practice.headline' => 'practice',
        'practice.detail'   => 'practice',

        'ecosystem.headline'         => 'ecosystem',
        'ecosystem.centre_icon'      => 'ecosystem',
        'ecosystem.centre_title'     => 'ecosystem',
        'ecosystem.centre_subtitle'  => 'ecosystem',

        'values.headline' => 'values',
        'tools.note'       => 'tools',

        'about_cta.headline' => 'about_cta',
        'about_cta.detail'   => 'about_cta',
    ];

    /** Kunci yang nilainya objek dwibahasa {en, id} */
    private const BILINGUAL = [
        'identitas.jabatan',
        'identitas.lokasi_singkat',
        'hero.judul_atas',
        'hero.judul_aksen',
        'hero.lead',
        'hero.sub',
        'about.judul_halaman',
        'about.judul_blok',
        'about.lead',
        'about.isi',
        'about.kutipan',
        'about.kartu_dukungan',
        'practice.headline',
        'practice.detail',
        'ecosystem.headline',
        'ecosystem.centre_title',
        'ecosystem.centre_subtitle',
        'values.headline',
        'tools.note',
        'about_cta.headline',
        'about_cta.detail',
    ];

    /** Opsi ikon yang dipakai di Praktik & Ekosistem */
    private const ICON_OPTIONS = [
        'wrench'    => 'Kunci pas',
        'monitor'   => 'Monitor',
        'camera'    => 'Kamera',
        'briefcase' => 'Tas kerja',
        'palette'   => 'Palet',
        'code'      => 'Kode',
        'sparkles'  => 'Kilau',
        'award'     => 'Medali',
    ];

    public function mount(): void
    {
        $this->fillForm();
    }

    public function fillForm(): void
    {
        $data = [];

        foreach (array_keys(self::KEYS) as $key) {
            $value = Setting::get($key);

            if (in_array($key, self::BILINGUAL, true)) {
                $data[$this->fieldName($key, 'id')] = $value['id'] ?? '';
                $data[$this->fieldName($key, 'en')] = $value['en'] ?? '';
            } else {
                $data[$this->fieldName($key)] = $value ?? '';
            }
        }

        // ---- Field berbentuk daftar (Repeater) ----
        $data['practice__items']    = Setting::get('practice.items', []);
        $data['ecosystem__items']   = Setting::get('ecosystem.items', []);
        $data['values__items']      = Setting::get('values.items', []);
        $data['tools__list']        = Setting::get('tools.list', []);
        $data['experience__entries'] = Setting::get('experience.entries', []);

        $this->form->fill($data);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('pengaturan')
                    ->persistTabInQueryString()
                    ->tabs([
                        Tabs\Tab::make('Identitas')->schema($this->identitasFields()),
                        Tabs\Tab::make('Hero')->schema($this->heroFields()),
                        Tabs\Tab::make('Tentang')->schema($this->aboutFields()),
                        Tabs\Tab::make('Praktik')->schema($this->practiceFields()),
                        Tabs\Tab::make('Ekosistem')->schema($this->ecosystemFields()),
                        Tabs\Tab::make('Nilai & Perkakas')->schema($this->nilaiPerkakasFields()),
                        Tabs\Tab::make('Pengalaman')->schema($this->pengalamanFields()),
                        Tabs\Tab::make('CTA Tentang')->schema($this->ctaTentangFields()),
                    ]),
            ])
            ->statePath('data');
    }

    /** @return array<int, mixed> */
    private function identitasFields(): array
    {
        return [
            Section::make('Nama & Merek')
                ->description('Muncul di: navbar (logo & judul kecil di sampingnya) dan footer di semua halaman.')
                ->columns(2)
                ->schema([
                    TextInput::make($this->fieldName('identitas.nama_depan'))
                        ->label('Nama depan'),
                    TextInput::make($this->fieldName('identitas.nama_belakang'))
                        ->label('Nama belakang'),
                    TextInput::make($this->fieldName('identitas.inisial'))
                        ->label('Inisial logo')->maxLength(3)
                        ->helperText('Muncul di kotak logo, mis. "AS"'),
                    TextInput::make($this->fieldName('identitas.brand'))
                        ->label('Nama merek')
                        ->helperText('Teks besar di navbar, mis. "AJAT"'),
                    TextInput::make($this->fieldName('identitas.brand_suffix'))
                        ->label('Akhiran merek')
                        ->helperText('Teks kecil di bawahnya, mis. "/ TECH"'),
                ]),

            $this->bilingualPair(
                'identitas.jabatan',
                'Jabatan',
                'Muncul di: navbar (di bawah nama merek), footer, dan blok About di halaman Tentang.',
            ),

            Section::make('Kontak')
                ->description('Muncul di: footer, kartu kontak halaman /contact, dan tautan WhatsApp.')
                ->columns(2)
                ->schema([
                    TextInput::make($this->fieldName('identitas.email'))
                        ->label('Email')->email(),
                    TextInput::make($this->fieldName('identitas.telepon'))
                        ->label('Telepon / WhatsApp')
                        ->helperText('Format bebas, mis. 0813-2053-6570'),
                    Textarea::make($this->fieldName('identitas.alamat'))
                        ->label('Alamat lengkap')->rows(2)->columnSpanFull(),
                ]),

            $this->bilingualPair(
                'identitas.lokasi_singkat',
                'Lokasi singkat',
                'Muncul di: kartu kontak halaman /contact dan chip lokasi di blok About, mis. "Kabupaten Bandung, Jawa Barat".',
            ),

            Section::make('Berkas')
                ->description('Muncul di: Beranda (hero paling atas) dan halaman Tentang, kecuali disebutkan lain.')
                ->columns(2)
                ->schema([
                    FileUpload::make($this->fieldName('identitas.foto'))
                        ->label('Foto diri Hero (mode terang)')
                        ->image()
                        ->imageEditor()
                        ->disk('public')
                        ->directory('profil')
                        ->helperText('Muncul di: HANYA foto besar Hero paling atas Beranda, saat situs dalam mode terang.'),
                    FileUpload::make($this->fieldName('identitas.foto_gelap'))
                        ->label('Foto diri Hero (mode gelap)')
                        ->image()
                        ->imageEditor()
                        ->disk('public')
                        ->directory('profil')
                        ->helperText('Muncul di: HANYA foto besar Hero paling atas Beranda, saat situs dalam mode gelap. Kosongkan untuk memakai foto mode terang yang sama.'),
                    FileUpload::make($this->fieldName('identitas.foto_about'))
                        ->label('Foto blok About')
                        ->image()
                        ->imageEditor()
                        ->disk('public')
                        ->directory('profil')
                        ->helperText('Muncul di: blok About Beranda (section 01) dan halaman Tentang — beda dari foto Hero. Kosongkan untuk memakai foto Hero yang sama.'),
                    FileUpload::make($this->fieldName('identitas.logo'))
                        ->label('Logo')
                        ->image()
                        ->imageEditor()
                        ->disk('public')
                        ->directory('logo')
                        ->helperText('Muncul di: kotak logo navbar di semua halaman — beda dari foto diri. Kosongkan untuk pakai inisial.'),
                    FileUpload::make($this->fieldName('identitas.cv'))
                        ->label('Berkas CV')
                        ->acceptedFileTypes(['application/pdf'])
                        ->disk('public')
                        ->directory('berkas')
                        ->helperText('Muncul di: tombol "Unduh CV" di Beranda dan halaman Tentang.'),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private function heroFields(): array
    {
        return [
            $this->bilingualPair('hero.judul_atas', 'Judul baris 1', 'Muncul di: Beranda, judul besar paling atas (Hero) — warna teks utama.'),
            $this->bilingualPair('hero.judul_aksen', 'Judul baris 2', 'Muncul di: Beranda, judul besar paling atas (Hero) — warna aksen biru.'),
            $this->bilingualPair('hero.lead', 'Paragraf utama', 'Muncul di: Beranda, paragraf pertama di bawah judul Hero.', textarea: true),
            $this->bilingualPair('hero.sub', 'Paragraf pendukung', 'Muncul di: Beranda, paragraf kedua (lebih pudar) di bawah paragraf utama Hero.', textarea: true),
        ];
    }

    /** @return array<int, mixed> */
    private function aboutFields(): array
    {
        return [
            $this->bilingualPair('about.judul_halaman', 'Judul halaman Tentang', 'Muncul di: HANYA halaman /about — judul besar paling atas halaman itu (beda dari Hero Beranda).', textarea: true),
            $this->bilingualPair('about.judul_blok', 'Judul blok di beranda', 'Muncul di: Beranda, judul blok "About" (section 01, tepat di bawah Hero).', textarea: true),
            $this->bilingualPair('about.lead', 'Paragraf pembuka', 'Muncul di: Beranda (blok About, section 01) DAN halaman /about (paragraf pembuka).', textarea: true),
            $this->bilingualPair('about.isi', 'Paragraf isi', 'Muncul di: Beranda (blok About, section 01) DAN halaman /about (paragraf isi setelahnya).', textarea: true),
            $this->bilingualPair('about.kutipan', 'Kutipan', 'Muncul di: Beranda dan halaman /about, kutipan bergaris di sisi kartu foto.', textarea: true),
            $this->bilingualPair('about.kartu_dukungan', 'Teks kartu dukungan', 'Muncul di: Beranda dan halaman /about, kartu kecil di bawah foto ("Graphic design and web development...").', textarea: true),
        ];
    }

    /** @return array<int, mixed> */
    private function practiceFields(): array
    {
        return [
            $this->bilingualPair('practice.headline', 'Judul section Praktik', 'Muncul di: HANYA halaman /about, section "My Practice".'),
            $this->bilingualPair('practice.detail', 'Keterangan', 'Muncul di: HANYA halaman /about, section "My Practice".', textarea: true),

            Section::make('Kartu praktik')
                ->description('Muncul di: HANYA halaman /about, 3 kartu section "My Practice" — mis. "Servis Mesin", "Jaringan & Keamanan", "Desain & Web".')
                ->columnSpanFull()
                ->schema([
                    Repeater::make('practice__items')
                        ->label('')
                        ->addActionLabel('Tambah kartu')
                        ->reorderableWithButtons()
                        ->schema([
                            Select::make('icon')->label('Ikon')->options(self::ICON_OPTIONS),
                            TextInput::make('title.id')->label('Judul (Indonesia)'),
                            TextInput::make('title.en')->label('Judul (Inggris)'),
                            TextInput::make('detail.id')->label('Keterangan (Indonesia)'),
                            TextInput::make('detail.en')->label('Keterangan (Inggris)'),
                        ])
                        ->columns(2),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private function ecosystemFields(): array
    {
        return [
            $this->bilingualPair('ecosystem.headline', 'Judul section Ekosistem', 'Muncul di: HANYA halaman /about, section "Capability Ecosystem".'),

            Section::make('Pusat (centre)')
                ->description('Muncul di: HANYA halaman /about — kartu utama di TENGAH diagram section "Capability Ecosystem", mis. "ATM / CRM".')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    Select::make($this->fieldName('ecosystem.centre_icon'))
                        ->label('Ikon')->options(self::ICON_OPTIONS)
                        ->columnSpanFull(),
                    TextInput::make($this->fieldName('ecosystem.centre_title', 'id'))->label('Judul (Indonesia)'),
                    TextInput::make($this->fieldName('ecosystem.centre_title', 'en'))->label('Judul (Inggris)'),
                    TextInput::make($this->fieldName('ecosystem.centre_subtitle', 'id'))->label('Subjudul (Indonesia)'),
                    TextInput::make($this->fieldName('ecosystem.centre_subtitle', 'en'))->label('Subjudul (Inggris)'),
                ]),

            Section::make('Disiplin pendukung')
                ->description('Muncul di: HANYA halaman /about — 5 kartu di SEKELILING pusat diagram "Capability Ecosystem", mis. "Jaringan", "CCTV", "TKJ".')
                ->columnSpanFull()
                ->schema([
                    Repeater::make('ecosystem__items')
                        ->label('')
                        ->addActionLabel('Tambah kartu')
                        ->reorderableWithButtons()
                        ->schema([
                            Select::make('icon')->label('Ikon')->options(self::ICON_OPTIONS),
                            TextInput::make('title.id')->label('Judul (Indonesia)'),
                            TextInput::make('title.en')->label('Judul (Inggris)'),
                            TextInput::make('subtitle.id')->label('Subjudul (Indonesia)'),
                            TextInput::make('subtitle.en')->label('Subjudul (Inggris)'),
                        ])
                        ->columns(2),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private function nilaiPerkakasFields(): array
    {
        return [
            $this->bilingualPair('values.headline', 'Judul section Nilai Kerja', 'Muncul di: HANYA halaman /about, section "Values & Workflow".'),
            $this->repeaterBilingualList('values__items', 'Daftar nilai', 'Muncul di: HANYA halaman /about, 4 poin section "Values & Workflow" — mis. "Perbaiki sebabnya, bukan gejalanya".'),

            Section::make('Daftar perkakas')
                ->description('Muncul di: HANYA halaman /about, panel "Tools I reach for" — ditampilkan sebagai tag singkat, mis. "ATM / CRM", "CorelDRAW", "JavaScript".')
                ->columnSpanFull()
                ->schema([
                    TagsInput::make('tools__list')->label(''),
                ]),

            $this->bilingualPair('tools.note', 'Catatan perkakas', 'Muncul di: HANYA halaman /about, paragraf di bawah daftar perkakas.', textarea: true),
        ];
    }

    /** @return array<int, mixed> */
    private function pengalamanFields(): array
    {
        return [
            Section::make('Riwayat pengalaman')
                ->description('Muncul di: HANYA halaman /about, section "Experience" — urut dari yang terbaru.')
                ->columnSpanFull()
                ->schema([
                    Repeater::make('experience__entries')
                        ->label('')
                        ->addActionLabel('Tambah pengalaman')
                        ->reorderableWithButtons()
                        ->schema([
                            TextInput::make('year.id')->label('Lama (Indonesia)')
                                ->helperText('mis. "8 tahun"'),
                            TextInput::make('year.en')->label('Lama (Inggris)'),
                            TextInput::make('role.id')->label('Peran (Indonesia)'),
                            TextInput::make('role.en')->label('Peran (Inggris)'),
                            TextInput::make('place.id')->label('Tempat (Indonesia)')
                                ->helperText('mis. "Bank Mandiri"'),
                            TextInput::make('place.en')->label('Tempat (Inggris)'),
                            TextInput::make('detail.id')->label('Keterangan (Indonesia)')->columnSpanFull(),
                            TextInput::make('detail.en')->label('Keterangan (Inggris)')->columnSpanFull(),
                        ])
                        ->columns(2),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private function ctaTentangFields(): array
    {
        return [
            $this->bilingualPair('about_cta.headline', 'Judul ajakan di halaman Tentang', 'Muncul di: HANYA halaman /about, ajakan penutup paling bawah (sebelum footer).'),
            $this->bilingualPair('about_cta.detail', 'Keterangan', 'Muncul di: HANYA halaman /about, ajakan penutup paling bawah (sebelum footer).', textarea: true),
        ];
    }

    /** Satu section berisi input Indonesia + Inggris untuk satu kunci */
    private function bilingualPair(
        string $key,
        string $label,
        ?string $helper = null,
        bool $textarea = false,
    ): Section {
        $make = fn (string $lang, string $caption) => $textarea
            ? Textarea::make($this->fieldName($key, $lang))->label($caption)->rows(3)
            : TextInput::make($this->fieldName($key, $lang))->label($caption);

        return Section::make($label)
            ->description($helper)
            ->columns(2)
            ->columnSpanFull()
            ->schema([
                $make('id', 'Indonesia'),
                $make('en', 'Inggris'),
            ]);
    }

    /** Repeater untuk daftar string dwibahasa sederhana, mis. nilai kerja */
    private function repeaterBilingualList(string $fieldName, string $label, ?string $helper = null): Section
    {
        return Section::make($label)
            ->description($helper)
            ->columnSpanFull()
            ->schema([
                Repeater::make($fieldName)
                    ->label('')
                    ->addActionLabel('Tambah')
                    ->reorderableWithButtons()
                    ->columns(2)
                    ->schema([
                        TextInput::make('id')->label('Indonesia'),
                        TextInput::make('en')->label('Inggris'),
                    ]),
            ]);
    }

    /** Titik tidak dipakai di nama field karena dianggap state bersarang */
    private function fieldName(string $key, ?string $lang = null): string
    {
        $name = str_replace('.', '__', $key);

        return $lang ? "{$name}__{$lang}" : $name;
    }

    /** @return array<int, Action> */
    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Simpan perubahan')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        $state = $this->form->getState();

        foreach (self::KEYS as $key => $group) {
            if (in_array($key, self::BILINGUAL, true)) {
                $id = $state[$this->fieldName($key, 'id')] ?? '';
                $en = $state[$this->fieldName($key, 'en')] ?? '';

                // Kalau versi Inggris dikosongkan, pakai versi Indonesia
                $value = ['en' => $en !== '' ? $en : $id, 'id' => $id];
            } else {
                $value = $state[$this->fieldName($key)] ?? null;
            }

            Setting::put($key, $value, $group);
        }

        // ---- Field berbentuk daftar (Repeater) ----
        Setting::put('practice.items', $this->normalizeList($state['practice__items'] ?? []), 'practice');
        Setting::put('ecosystem.items', $this->normalizeList($state['ecosystem__items'] ?? []), 'ecosystem');
        Setting::put('values.items', $this->normalizeList($state['values__items'] ?? []), 'values');
        Setting::put('tools.list', array_values($state['tools__list'] ?? []), 'tools');
        Setting::put('experience.entries', $this->normalizeList($state['experience__entries'] ?? []), 'experience');

        Notification::make()
            ->title('Pengaturan tersimpan')
            ->success()
            ->send();
    }

    /**
     * Repeater mengembalikan array asosiatif berkunci UUID; buang kuncinya
     * dan pastikan tiap sub-objek {id,en} yang kosong EN ikut diisi dari ID.
     */
    private function normalizeList(array $rows): array
    {
        return array_values(array_map(function ($row) {
            foreach ($row as $key => $value) {
                if (is_array($value) && array_key_exists('id', $value) && array_key_exists('en', $value)) {
                    $row[$key]['en'] = $value['en'] !== '' ? $value['en'] : $value['id'];
                }
            }

            return $row;
        }, $rows));
    }
}
