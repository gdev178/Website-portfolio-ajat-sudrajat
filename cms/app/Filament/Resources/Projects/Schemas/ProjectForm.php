<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('proyek')
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
                ->description('Muncul di: halaman /projects (kartu daftar), halaman detail /projects/<slug>, dan Beranda kalau ditandai unggulan.')
                ->columns(2)
                ->schema([
                    TextInput::make('title.id')
                        ->label('Judul (Indonesia)')
                        ->required()
                        ->live(onBlur: true)
                        // Slug diisi otomatis dari judul, tetap bisa diubah manual
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
                        ->helperText('Alamat halaman: /projects/<slug>')
                        ->columnSpanFull(),
                ]),

            Section::make('Ringkasan')
                ->description('Muncul di: kartu di halaman /projects, kartu proyek unggulan di Beranda, dan footer.')
                ->columns(2)
                ->schema([
                    Textarea::make('description.id')
                        ->label('Ringkasan (Indonesia)')->rows(4)->required(),
                    Textarea::make('description.en')
                        ->label('Ringkasan (Inggris)')->rows(4),
                ]),

            Section::make('Penjelasan lengkap')
                ->description('Muncul di: HANYA halaman detail /projects/<slug>, paragraf panjang di bawah ringkasan.')
                ->columns(2)
                ->schema([
                    Textarea::make('detail.id')
                        ->label('Penjelasan (Indonesia)')->rows(5),
                    Textarea::make('detail.en')
                        ->label('Penjelasan (Inggris)')->rows(5),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private static function rincian(): array
    {
        return [
            Section::make('Penggolongan')
                ->description('Muncul di: badge kategori/jenis/tahun di kartu dan halaman detail; kategori & jenis juga jadi pilihan dropdown filter di halaman /projects.')
                ->columns(2)
                ->schema([
                    TextInput::make('category.id')
                        ->label('Kategori (Indonesia)')->required()
                        ->helperText('mis. Jaringan, CCTV, ATM / CRM'),
                    TextInput::make('category.en')
                        ->label('Kategori (Inggris)'),
                    TextInput::make('type.id')
                        ->label('Jenis (Indonesia)')->required()
                        ->helperText('mis. Pekerjaan Klien, Proyek Pribadi'),
                    TextInput::make('type.en')
                        ->label('Jenis (Inggris)'),
                    TextInput::make('year')
                        ->label('Tahun')
                        ->default('—')
                        ->helperText('Isi "—" kalau belum pasti'),
                ]),

            Section::make('Lingkup pekerjaan')
                ->description('Muncul di: HANYA halaman detail /projects/<slug> — daftar bercentang.')
                ->schema([
                    Repeater::make('points')
                        ->label('')
                        ->addActionLabel('Tambah poin')
                        ->columns(2)
                        ->reorderable()
                        // Mulai kosong: kalau ada baris bawaan, field wajibnya
                        // memblokir penyimpanan padahal poin memang opsional
                        ->defaultItems(0)
                        ->schema([
                            TextInput::make('id')->label('Indonesia')->required(),
                            TextInput::make('en')->label('Inggris'),
                        ]),
                ]),

            Section::make('Teknologi & perangkat')
                ->description('Muncul di: tag kecil di kartu dan halaman detail; juga jadi pilihan dropdown teknologi di halaman /projects.')
                ->schema([
                    TagsInput::make('stack')
                        ->label('')
                        ->placeholder('Ketik lalu tekan Enter')
                        ->helperText('mis. ATM, CRM, Monitoring — tidak diterjemahkan'),
                ]),
        ];
    }

    /** @return array<int, mixed> */
    private static function tampilan(): array
    {
        return [
            Section::make('Gambar')
                ->description('Muncul di: kartu daftar proyek, kartu unggulan Beranda, dan bagian atas halaman detail.')
                ->schema([
                    FileUpload::make('image')
                        ->label('')
                        ->image()
                        ->imageEditor()
                        ->disk('public')
                        ->directory('proyek')
                        ->helperText('Rasio 16:10 paling pas. Boleh dikosongkan — kartunya tetap rapi.'),
                ]),

            Section::make('Live Demo')
                ->description('Muncul di: tombol "Live Demo" di halaman detail /projects/<slug> — hanya tampil kalau diisi.')
                ->schema([
                    TextInput::make('live_url')
                        ->label('URL situs/aplikasi asli')
                        ->url()
                        ->placeholder('https://...')
                        ->helperText('Kosongkan kalau proyek ini tidak punya situs/aplikasi yang bisa diakses publik.'),
                ]),

            Section::make('Penayangan')
                ->columns(2)
                ->schema([
                    Toggle::make('is_published')
                        ->label('Tampilkan di situs')
                        ->default(true),
                    Toggle::make('is_featured')
                        ->label('Tampilkan di beranda')
                        ->helperText('Tiga teratas muncul di section Pekerjaan Unggulan'),
                    Toggle::make('is_placeholder')
                        ->label('Tandai sebagai contoh')
                        ->helperText('Penanda internal: proyek ini masih uraian umum, belum data pekerjaan spesifik. Tetap tampil di situs - matikan setelah diisi detail asli.'),
                    TextInput::make('sort_order')
                        ->label('Urutan')
                        ->numeric()
                        ->default(0)
                        ->helperText('Angka kecil tampil lebih dulu'),
                ]),
        ];
    }
}
