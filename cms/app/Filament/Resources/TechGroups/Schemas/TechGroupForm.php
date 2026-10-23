<?php

namespace App\Filament\Resources\TechGroups\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TechGroupForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Kategori')
                ->description('Muncul di: Beranda, section 06 "Technology Stack" — nama kategori jadi judul kecil di atas sekelompok ubin.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('key')
                        ->label('Kunci internal')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->helperText('Huruf kecil tanpa spasi, mis. "network"'),
                    TextInput::make('sort_order')
                        ->label('Urutan kategori')->numeric()->default(0),
                    TextInput::make('label.id')
                        ->label('Nama kategori (Indonesia)')->required()
                        ->helperText('mis. "Jaringan & Server"'),
                    TextInput::make('label.en')
                        ->label('Nama kategori (Inggris)'),
                ]),

            Section::make('Ubin teknologi')
                ->description('Muncul di: Beranda, section 06 "Technology Stack" — tiap ubin adalah satu logo/nama tools di dalam kategori ini.')
                ->columnSpanFull()
                ->schema([
                    Repeater::make('items')
                        ->relationship()
                        ->label('')
                        ->addActionLabel('Tambah ubin')
                        ->reorderableWithButtons()
                        ->columns(5)
                        ->schema([
                            TextInput::make('name')
                                ->label('Nama')
                                ->required()
                                ->columnSpan(2),
                            TextInput::make('mono')
                                ->label('Singkatan')
                                ->required()
                                ->maxLength(3)
                                ->helperText('1-3 huruf'),
                            ColorPicker::make('bg')
                                ->label('Warna latar')
                                ->required(),
                            ColorPicker::make('fg')
                                ->label('Warna teks')
                                ->helperText('Kosongkan untuk putih'),
                            Toggle::make('is_main_skill')
                                ->label('Keahlian utama')
                                ->default(true)
                                ->helperText('Mati = "Sering dipakai"')
                                ->columnSpan(2),
                            Toggle::make('is_published')
                                ->label('Tampil')
                                ->default(true),
                        ]),
                ]),
        ]);
    }
}
