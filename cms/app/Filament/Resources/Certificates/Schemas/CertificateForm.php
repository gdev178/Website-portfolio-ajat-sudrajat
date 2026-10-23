<?php

namespace App\Filament\Resources\Certificates\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CertificateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Peringatan')
                ->description(
                    'Sertifikat adalah klaim kualifikasi. Isi hanya dengan sertifikat '
                    . 'yang benar-benar dimiliki. Selama datanya belum ada, biarkan '
                    . 'saklar "Tandai sebagai contoh" menyala.'
                )
                ->columnSpanFull()
                ->schema([]),

            Section::make('Sertifikat')
                ->description('Muncul di: halaman /certificates (kartu grid), dan Beranda section 08 "Recognition" kalau ditandai unggulan.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('title.id')
                        ->label('Nama sertifikat (Indonesia)')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(function ($state, $set, $get) {
                            if (blank($get('slug'))) {
                                $set('slug', Str::slug((string) $state));
                            }
                        }),
                    TextInput::make('title.en')
                        ->label('Nama sertifikat (Inggris)')
                        ->helperText('Kosongkan untuk memakai versi Indonesia'),

                    TextInput::make('issuer.id')
                        ->label('Penerbit (Indonesia)')->required()
                        ->helperText('mis. Bank Mandiri, Huawei ICT Academy, BNSP'),
                    TextInput::make('issuer.en')->label('Penerbit (Inggris)'),

                    TextInput::make('category.id')
                        ->label('Kategori (Indonesia)')->required()
                        ->helperText('mis. Jaringan, ATM / CRM, CCTV'),
                    TextInput::make('category.en')->label('Kategori (Inggris)'),

                    TextInput::make('slug')
                        ->label('Slug')->required()->unique(ignoreRecord: true)
                        ->columnSpanFull(),
                ]),

            Section::make('Bukti')
                ->description('Muncul di: kartu sertifikat di halaman /certificates (tanggal, nomor kredensial, tombol verifikasi, dan gambar scan).')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('date')
                        ->label('Tanggal terbit')
                        ->default('—')
                        ->helperText('mis. 2025-11-06, atau "—" kalau belum pasti'),
                    TextInput::make('credential')
                        ->label('Nomor kredensial')
                        ->helperText('Kosongkan kalau tidak ada'),
                    TextInput::make('href')
                        ->label('Tautan verifikasi')
                        ->url()
                        ->helperText('Kalau kosong, tombol verifikasi tidak ditampilkan')
                        ->columnSpanFull(),
                    FileUpload::make('image')
                        ->label('Scan / foto sertifikat')
                        ->image()
                        ->disk('public')
                        ->directory('sertifikat')
                        ->columnSpanFull(),
                ]),

            Section::make('Penayangan')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    Toggle::make('is_published')
                        ->label('Tampilkan di situs')->default(true),
                    Toggle::make('is_featured')
                        ->label('Jadikan sertifikat unggulan')
                        ->helperText('Tampil besar di bagian atas halaman Sertifikat'),
                    Toggle::make('is_placeholder')
                        ->label('Tandai sebagai contoh')
                        ->default(true)
                        ->helperText('Matikan HANYA setelah diisi data sertifikat asli'),
                    TextInput::make('sort_order')
                        ->label('Urutan')->numeric()->default(0),
                ]),
        ]);
    }
}
