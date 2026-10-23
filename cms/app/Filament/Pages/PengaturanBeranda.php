<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

/**
 * Pengaturan khusus halaman Beranda: Sorotan, Ringkasan, Fokus Utama
 * ("What I Build"), Proses Kerja, dan Ajakan penutup.
 *
 * Pola yang sama seperti Pengaturan.php (Tahap 1): nama field top-level
 * tidak boleh mengandung titik (dianggap state bersarang oleh Livewire).
 * Field DI DALAM Repeater justru sebaliknya — titik di situ AMAN dan
 * memang cara yang benar untuk membuat objek bersarang seperti
 * title.id/title.en, karena repeater sudah array-shaped secara alami.
 */
class PengaturanBeranda extends Page
{
    protected string $view = 'filament.pages.pengaturan-beranda';

    protected static string | BackedEnum | null $navigationIcon = Heroicon::OutlinedHome;

    protected static ?string $navigationLabel = 'Pengaturan Beranda';

    protected static ?string $title = 'Pengaturan Halaman Beranda';

    protected static ?int $navigationSort = 85;

    /** @var array<string, mixed> */
    public array $data = [];

    public function mount(): void
    {
        $this->fillForm();
    }

    public function fillForm(): void
    {
        $highlightCards = Setting::get('highlights.cards', []);
        $highlightFocus = Setting::get('highlights.focus', []);
        $snapshotMetrics = Setting::get('snapshot.metrics', []);
        $buildPoints = Setting::get('build.points', []);
        $processSteps = Setting::get('process.steps', []);
        $activity = Setting::get('snapshot.activity', []);

        $data = [
            // ---- Sorotan ----
            'highlights__cards' => $highlightCards,
            'highlights__focus' => $highlightFocus,

            // ---- Ringkasan ----
            'snapshot__big_value' => Setting::get('snapshot.big_value'),
            'snapshot__metrics' => $snapshotMetrics,
            'snapshot__activity' => is_array($activity) ? implode(',', $activity) : '',

            // ---- Fokus Utama ----
            'build__points' => $buildPoints,

            // ---- Proses ----
            'process__steps' => $processSteps,
        ];

        // bilingualPair() membuat dua field terpisah {fieldName}__id/__en,
        // jadi nilai {en,id} dari Setting harus dipecah, bukan diisi utuh
        foreach ([
            'snapshot__headline'       => 'snapshot.headline',
            'snapshot__big_detail'     => 'snapshot.big_detail',
            'snapshot__activity_label' => 'snapshot.activity_label',
            'build__title'             => 'build.title',
            'build__detail'            => 'build.detail',
            'process__headline'        => 'process.headline',
            'process__detail'          => 'process.detail',
            'cta__final_headline'      => 'cta.final_headline',
            'cta__final_detail'        => 'cta.final_detail',
        ] as $fieldName => $settingKey) {
            $value = Setting::get($settingKey, []);
            $data["{$fieldName}__id"] = $value['id'] ?? '';
            $data["{$fieldName}__en"] = $value['en'] ?? '';
        }

        $this->form->fill($data);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('beranda')
                    ->persistTabInQueryString()
                    ->tabs([
                        Tabs\Tab::make('Sorotan')->schema($this->sorotanFields()),
                        Tabs\Tab::make('Ringkasan')->schema($this->ringkasanFields()),
                        Tabs\Tab::make('Fokus Utama')->schema($this->fokusUtamaFields()),
                        Tabs\Tab::make('Proses')->schema($this->prosesFields()),
                        Tabs\Tab::make('Ajakan')->schema($this->ajakanFields()),
                    ]),
            ])
            ->statePath('data');
    }

    /** @return array<int, mixed> */
    private function sorotanFields(): array
    {
        return [
            Section::make('Kartu sorotan')
                ->description('Muncul di: Beranda, 3 kartu angka tepat di bawah blok About (section 01) — mis. "8+ Tahun Pengalaman". Angka ini JUGA dipakai sebagai statistik 01–04 di halaman /about, jadi kedua halaman selalu sinkron.')
                ->columnSpanFull()
                ->schema([
                    Repeater::make('highlights__cards')
                        ->label('')
                        ->addActionLabel('Tambah kartu')
                        ->reorderableWithButtons()
                        ->schema([
                            Select::make('icon')
                                ->label('Ikon')
                                ->options([
                                    'sparkles'  => 'Kilau',
                                    'briefcase' => 'Tas kerja',
                                    'award'     => 'Medali',
                                    'wrench'    => 'Kunci pas',
                                    'monitor'   => 'Monitor',
                                    'camera'    => 'Kamera',
                                ]),
                            TextInput::make('value')
                                ->label('Angka')
                                ->helperText('mis. "8+", "6", "50+"'),
                            TextInput::make('bar')
                                ->label('Panjang garis (0–1)')
                                ->numeric()
                                ->step(0.05)
                                ->minValue(0)
                                ->maxValue(1)
                                ->default(0.75),
                            TextInput::make('title.id')->label('Judul (Indonesia)'),
                            TextInput::make('title.en')->label('Judul (Inggris)'),
                            TextInput::make('detail.id')->label('Keterangan (Indonesia)'),
                            TextInput::make('detail.en')->label('Keterangan (Inggris)'),
                        ])
                        ->columns(3),
                ]),

            Section::make('Baris fokus')
                ->description('Muncul di: Beranda, 3 baris ringkas di bawah kartu sorotan (section 01) — mis. "Fokus Utama: ATM/CRM & Jaringan".')
                ->columnSpanFull()
                ->schema([
                    Repeater::make('highlights__focus')
                        ->label('')
                        ->addActionLabel('Tambah baris')
                        ->reorderableWithButtons()
                        ->schema([
                            TextInput::make('label.id')->label('Label (Indonesia)'),
                            TextInput::make('label.en')->label('Label (Inggris)'),
                            TextInput::make('value.id')->label('Isi (Indonesia)'),
                            TextInput::make('value.en')->label('Isi (Inggris)'),
                        ])
                        ->columns(2),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private function ringkasanFields(): array
    {
        return [
            $this->bilingualPair('snapshot__headline', 'Judul kartu ringkasan', 'Muncul di: Beranda, section 02 "Snapshot" — judul kartu besar di sebelah blok About.', textarea: true),

            Section::make('Angka besar')
                ->description('Muncul di: Beranda, section 02 "Snapshot" — angka raksasa di kartu Snapshot.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('snapshot__big_value')
                        ->label('Angka besar')
                        ->helperText('mis. "8" — tahun pengalaman'),
                ]),

            $this->bilingualPair('snapshot__big_detail', 'Keterangan angka besar', 'Muncul di: Beranda, section 02 "Snapshot" — keterangan di bawah angka raksasa.', textarea: true),

            Section::make('4 metrik')
                ->description('Muncul di: Beranda, section 02 "Snapshot" — 4 baris kecil di kartu Snapshot.')
                ->columnSpanFull()
                ->schema([
                    Repeater::make('snapshot__metrics')
                        ->label('')
                        ->addActionLabel('Tambah metrik')
                        ->reorderableWithButtons()
                        ->schema([
                            TextInput::make('label.id')->label('Label (Indonesia)'),
                            TextInput::make('label.en')->label('Label (Inggris)'),
                            TextInput::make('value.id')->label('Nilai (Indonesia)'),
                            TextInput::make('value.en')->label('Nilai (Inggris)'),
                            Toggle::make('accent')
                                ->label('Warna aksen (bukan angka besar)')
                                ->helperText('Nyalakan untuk metrik non-angka, mis. "Terbuka untuk proyek"'),
                        ])
                        ->columns(2),
                ]),

            $this->bilingualPair('snapshot__activity_label', 'Label strip aktivitas', 'Muncul di: Beranda, section 02 "Snapshot" — label di atas deretan kotak warna. Mis. "Aktivitas Lapangan".'),

            Section::make('Strip aktivitas')
                ->description('Muncul di: Beranda, section 02 "Snapshot" — deretan kotak warna paling bawah kartu. Angka dipisah koma, 0 = kosong, 1 = biru, 2 = hijau. Jumlah kotak mengikuti jumlah angka.')
                ->columnSpanFull()
                ->schema([
                    TextInput::make('snapshot__activity')
                        ->label('')
                        ->placeholder('2,0,1,1,0,2,1,0,1,1,2,0,1,0,1,2,0,1'),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private function fokusUtamaFields(): array
    {
        return [
            $this->bilingualPair('build__title', 'Judul kartu utama', 'Muncul di: Beranda, section 03 "What I Build" — judul kartu utama di kiri.'),
            $this->bilingualPair('build__detail', 'Keterangan', 'Muncul di: Beranda, section 03 "What I Build" — paragraf di bawah judul kartu utama.', textarea: true),
            $this->repeaterBilingualList('build__points', 'Poin singkat', 'Muncul di: Beranda, section 03 "What I Build" — daftar poin di kartu utama, mis. "Perbaikan di lokasi".'),
        ];
    }

    /** @return array<int, mixed> */
    private function prosesFields(): array
    {
        return [
            $this->bilingualPair('process__headline', 'Judul section Proses', 'Muncul di: Beranda, section 05 "Process".'),
            $this->bilingualPair('process__detail', 'Keterangan', 'Muncul di: Beranda, section 05 "Process" — paragraf di bawah judul section.', textarea: true),
            $this->repeaterBilingualList('process__steps', 'Langkah kerja', 'Muncul di: Beranda, section 05 "Process" — kotak-kotak langkah kerja, mis. "Survei", "Analisis".'),
        ];
    }

    /** @return array<int, mixed> */
    private function ajakanFields(): array
    {
        return [
            $this->bilingualPair('cta__final_headline', 'Judul ajakan penutup', 'Muncul di: Beranda, section 10 "Make It Real" — ajakan penutup paling bawah sebelum footer.'),
            $this->bilingualPair('cta__final_detail', 'Keterangan', 'Muncul di: Beranda, section 10 "Make It Real" — paragraf di bawah judul ajakan penutup.', textarea: true),
        ];
    }

    /** Satu section berisi input Indonesia + Inggris untuk satu kunci */
    private function bilingualPair(
        string $fieldName,
        string $label,
        ?string $helper = null,
        bool $textarea = false,
    ): Section {
        $make = fn (string $lang, string $caption) => $textarea
            ? \Filament\Forms\Components\Textarea::make("{$fieldName}__{$lang}")->label($caption)->rows(3)
            : TextInput::make("{$fieldName}__{$lang}")->label($caption);

        return Section::make($label)
            ->description($helper)
            ->columns(2)
            ->columnSpanFull()
            ->schema([
                $make('id', 'Indonesia'),
                $make('en', 'Inggris'),
            ]);
    }

    /** Repeater untuk daftar string dwibahasa sederhana, mis. langkah proses atau poin singkat */
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

    /** @return array<int, Action> */
    protected function getFormActions(): array
    {
        return [
            Action::make('save')->label('Simpan perubahan')->submit('save'),
        ];
    }

    public function save(): void
    {
        $state = $this->form->getState();

        // ---- Sorotan ----
        Setting::put('highlights.cards', $this->normalizeList($state['highlights__cards'] ?? []), 'highlights');
        Setting::put('highlights.focus', $this->normalizeList($state['highlights__focus'] ?? []), 'highlights');

        // ---- Ringkasan ----
        Setting::put('snapshot.headline', $this->bilingualValue($state, 'snapshot__headline'), 'snapshot');
        Setting::put('snapshot.big_value', $state['snapshot__big_value'] ?? '', 'snapshot');
        Setting::put('snapshot.big_detail', $this->bilingualValue($state, 'snapshot__big_detail'), 'snapshot');
        Setting::put('snapshot.metrics', $this->normalizeList($state['snapshot__metrics'] ?? []), 'snapshot');
        Setting::put('snapshot.activity_label', $this->bilingualValue($state, 'snapshot__activity_label'), 'snapshot');
        Setting::put('snapshot.activity', $this->parseActivity($state['snapshot__activity'] ?? ''), 'snapshot');

        // ---- Fokus Utama ----
        Setting::put('build.title', $this->bilingualValue($state, 'build__title'), 'build');
        Setting::put('build.detail', $this->bilingualValue($state, 'build__detail'), 'build');
        Setting::put('build.points', $this->normalizeList($state['build__points'] ?? []), 'build');

        // ---- Proses ----
        Setting::put('process.headline', $this->bilingualValue($state, 'process__headline'), 'process');
        Setting::put('process.detail', $this->bilingualValue($state, 'process__detail'), 'process');
        Setting::put('process.steps', $this->normalizeList($state['process__steps'] ?? []), 'process');

        // ---- Ajakan ----
        Setting::put('cta.final_headline', $this->bilingualValue($state, 'cta__final_headline'), 'cta');
        Setting::put('cta.final_detail', $this->bilingualValue($state, 'cta__final_detail'), 'cta');

        Notification::make()->title('Pengaturan beranda tersimpan')->success()->send();
    }

    /** Ambil {en, id} dari sepasang field bilingualPair(); EN kosong -> pakai ID */
    private function bilingualValue(array $state, string $fieldName): array
    {
        $id = $state["{$fieldName}__id"] ?? '';
        $en = $state["{$fieldName}__en"] ?? '';

        return ['id' => $id, 'en' => $en !== '' ? $en : $id];
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

    /** "2,0,1" -> [2,0,1]; abaikan yang bukan angka */
    private function parseActivity(string $raw): array
    {
        return array_values(array_filter(
            array_map(fn ($v) => is_numeric(trim($v)) ? (int) trim($v) : null, explode(',', $raw)),
            fn ($v) => $v !== null,
        ));
    }
}
