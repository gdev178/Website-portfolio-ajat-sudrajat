<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Sebelum mengisi')
                ->description(
                    'Testimoni harus benar-benar dari orang yang bersangkutan dan sudah '
                    . 'mendapat izin untuk dipublikasikan. Selama belum ada testimoni asli, '
                    . 'biarkan saklar "Tandai sebagai contoh" menyala — bagian ini otomatis '
                    . 'tersembunyi di situs kalau isinya kosong.'
                )
                ->columnSpanFull()
                ->schema([]),

            Section::make('Pemberi testimoni')
                ->description('Muncul di: halaman /contact, daftar testimoni.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('name')
                        ->label('Nama')
                        ->required()
                        ->helperText('Ditampilkan apa adanya. Boleh disingkat, mis. "Budi S."'),
                    TextInput::make('project_ref')
                        ->label('Pekerjaan terkait')
                        ->helperText('mis. "Instalasi CCTV 2024" — boleh dikosongkan'),
                    TextInput::make('role.id')
                        ->label('Jabatan / instansi (Indonesia)')
                        ->helperText('mis. "Manajer Operasional, Kantor X"'),
                    TextInput::make('role.en')
                        ->label('Jabatan / instansi (Inggris)'),
                ]),

            Section::make('Isi testimoni')
                ->description('Muncul di: halaman /contact, isi kutipan testimoni.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    Textarea::make('message.id')
                        ->label('Testimoni (Indonesia)')->rows(5)->required()->maxLength(500),
                    Textarea::make('message.en')
                        ->label('Testimoni (Inggris)')->rows(5)->maxLength(500)
                        ->helperText('Kosongkan untuk memakai versi Indonesia'),
                ]),

            Section::make('Penayangan')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    Toggle::make('is_published')
                        ->label('Tampilkan di situs')->default(true),
                    Toggle::make('is_pinned')
                        ->label('Sematkan di atas'),
                    Toggle::make('is_placeholder')
                        ->label('Tandai sebagai contoh')
                        ->default(true)
                        ->helperText('Matikan HANYA setelah diisi testimoni asli beserta izinnya'),
                    TextInput::make('sort_order')
                        ->label('Urutan')->numeric()->default(0),
                ]),
        ]);
    }
}
