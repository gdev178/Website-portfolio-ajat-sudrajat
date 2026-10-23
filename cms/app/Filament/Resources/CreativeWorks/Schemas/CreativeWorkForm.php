<?php

namespace App\Filament\Resources\CreativeWorks\Schemas;

use App\Models\CreativeWork;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CreativeWorkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('karya')
                ->columnSpanFull()
                ->tabs([
                    Tabs\Tab::make('Isi')->schema(self::isi()),
                    Tabs\Tab::make('Rincian')->schema(self::rincian()),
                    Tabs\Tab::make('Tampilan')->schema(self::tampilan()),
                ]),
        ]);
    }

    /** @return array<int, mixed> */
    private static function isi(): array
    {
        return [
            Section::make('Judul')
                ->description('Muncul di: halaman /creative-works (kartu bento), carousel section 07 di Beranda, dan halaman detail.')
                ->columns(2)
                ->schema([
                    TextInput::make('title.id')
                        ->label('Judul (Indonesia)')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(function ($state, $set, $get) {
                            if (blank($get('slug'))) {
                                $set('slug', Str::slug((string) $state));
                            }
                        }),
                    TextInput::make('title.en')
                        ->label('Judul (Inggris)')
                        ->helperText('Kosongkan untuk memakai versi Indonesia'),
                    TextInput::make('slug')
                        ->label('Slug URL')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->helperText('Alamat halaman: /creative-works/<slug>')
                        ->columnSpanFull(),
                ]),

            Section::make('Subjudul')
                ->description('Muncul di: satu baris pendek di bawah judul pada kartu (halaman /creative-works dan carousel Beranda).')
                ->columns(2)
                ->schema([
                    TextInput::make('subtitle.id')->label('Subjudul (Indonesia)'),
                    TextInput::make('subtitle.en')->label('Subjudul (Inggris)'),
                ]),

            Section::make('Penjelasan')
                ->description('Muncul di: HANYA halaman detail /creative-works/<slug>.')
                ->columns(2)
                ->schema([
                    Textarea::make('description.id')
                        ->label('Penjelasan (Indonesia)')->rows(5)->required(),
                    Textarea::make('description.en')
                        ->label('Penjelasan (Inggris)')->rows(5),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private static function rincian(): array
    {
        return [
            Section::make('Kategori')
                ->description('Muncul di: badge kategori di kartu, dan jadi pilihan dropdown filter di halaman /creative-works.')
                ->columns(2)
                ->schema([
                    TextInput::make('category.id')
                        ->label('Kategori (Indonesia)')->required()
                        ->helperText('mis. Desain Cetak, Branding, Edit Foto'),
                    TextInput::make('category.en')->label('Kategori (Inggris)'),
                ]),

            Section::make('Lingkup pekerjaan')
                ->description('Muncul di: HANYA halaman detail /creative-works/<slug> — daftar bercentang.')
                ->schema([
                    Repeater::make('points')
                        ->label('')
                        ->addActionLabel('Tambah poin')
                        ->columns(2)
                        ->reorderable()
                        ->defaultItems(0)
                        ->schema([
                            TextInput::make('id')->label('Indonesia')->required(),
                            TextInput::make('en')->label('Inggris'),
                        ]),
                ]),

            Section::make('Perkakas')
                ->description('Muncul di: tag kecil di kartu dan halaman detail.')
                ->schema([
                    TagsInput::make('tools')
                        ->label('')
                        ->placeholder('Ketik lalu tekan Enter')
                        ->helperText('mis. CorelDRAW, Photoshop — tidak diterjemahkan'),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private static function tampilan(): array
    {
        return [
            Section::make('Gambar')
                ->description('Muncul di: kartu daftar, carousel Beranda, dan halaman detail.')
                ->schema([
                    FileUpload::make('image')
                        ->label('')
                        ->image()
                        ->imageEditor()
                        ->disk('public')
                        ->directory('karya')
                        ->helperText('Kalau dikosongkan, kartu memakai gradasi warna di bawah'),
                ]),

            Section::make('Tata letak kartu')
                ->description('Muncul di: HANYA halaman /creative-works — ukuran & warna kartu bento.')
                ->columns(2)
                ->schema([
                    Select::make('span')
                        ->label('Ukuran kartu')
                        ->options(CreativeWork::SPANS)
                        ->default('normal')
                        ->required()
                        ->helperText('Satu karya sebaiknya Besar sebagai penarik perhatian'),
                    Select::make('gradient')
                        ->label('Warna latar cadangan')
                        ->options(CreativeWork::GRADIENTS)
                        ->helperText('Dipakai kalau gambar belum diunggah'),
                ]),

            Section::make('Penayangan')
                ->columns(2)
                ->schema([
                    Toggle::make('is_published')
                        ->label('Tampilkan di situs')
                        ->default(true),
                    Toggle::make('is_placeholder')
                        ->label('Tandai sebagai contoh')
                        ->helperText('Penanda internal: karya ini masih contoh umum, belum karya spesifik. Tetap tampil di situs - matikan setelah diisi karya asli.'),
                    TextInput::make('sort_order')
                        ->label('Urutan')->numeric()->default(0)
                        ->helperText('Angka kecil tampil lebih dulu'),
                ]),
        ];
    }
}
