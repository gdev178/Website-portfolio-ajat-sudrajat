<?php

namespace App\Filament\Resources\Expertises\Schemas;

use App\Models\Expertise;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ExpertiseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Identitas')
                ->description('Muncul di: halaman /about, daftar "Bidang Keahlian" — ikon dan warna aksen tampil di kartu masing-masing keahlian.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('key')
                        ->label('Kunci internal')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->helperText('Huruf kecil tanpa spasi, mis. "atm", "network" — dipakai sistem, tidak tampil ke pengunjung'),
                    Select::make('icon')
                        ->label('Ikon')
                        ->options(Expertise::ICONS)
                        ->required(),
                    ColorPicker::make('accent')
                        ->label('Warna aksen')
                        ->required(),
                ]),

            Section::make('Judul & Pengalaman')
                ->description('Muncul di: halaman /about, daftar "Bidang Keahlian" (judul & lama pengalaman); "Angka ringkas" dipakai di kartu Sorotan Beranda kalau relevan.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('title.id')
                        ->label('Judul (Indonesia)')->required(),
                    TextInput::make('title.en')
                        ->label('Judul (Inggris)'),
                    TextInput::make('years.id')
                        ->label('Lama pengalaman (Indonesia)')
                        ->helperText('mis. "8 tahun di Bank Mandiri"'),
                    TextInput::make('years.en')
                        ->label('Lama pengalaman (Inggris)'),
                    TextInput::make('years_short')
                        ->label('Angka ringkas')
                        ->helperText('mis. "8" — dipakai di kartu highlight ringkas'),
                ]),

            Section::make('Deskripsi')
                ->description('Muncul di: halaman /about, paragraf deskripsi di kartu keahlian ini.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    Textarea::make('detail.id')
                        ->label('Deskripsi (Indonesia)')->rows(3)->required(),
                    Textarea::make('detail.en')
                        ->label('Deskripsi (Inggris)')->rows(3),
                ]),

            Section::make('Poin keahlian')
                ->description('Muncul di: halaman /about — daftar bercentang di kartu keahlian ini, mis. "Perbaikan ATM / CRM".')
                ->columnSpanFull()
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

            Section::make('Penayangan')
                ->columns(3)
                ->columnSpanFull()
                ->schema([
                    Toggle::make('is_published')
                        ->label('Tampilkan di situs')->default(true),
                    Toggle::make('show_in_build')
                        ->label('Tampil di "What I Build"')
                        ->default(true)
                        ->helperText('Section 03 di beranda hanya menampilkan 4 kartu'),
                    TextInput::make('sort_order')
                        ->label('Urutan')->numeric()->default(0),
                ]),
        ]);
    }
}
