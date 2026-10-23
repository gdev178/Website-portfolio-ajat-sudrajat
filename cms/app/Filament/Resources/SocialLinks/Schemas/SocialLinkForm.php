<?php

namespace App\Filament\Resources\SocialLinks\Schemas;

use App\Models\SocialLink;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SocialLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Tautan Sosial')
                ->description('Muncul di: footer (kolom "Connect") di semua halaman, dan ikon navbar/pojok kanan atas untuk Instagram & LinkedIn.')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    Select::make('icon')
                        ->label('Platform')
                        ->options(SocialLink::ICONS)
                        ->required()
                        ->live()
                        ->afterStateUpdated(function ($state, $set, $get) {
                            if (blank($get('label'))) {
                                $set('label', SocialLink::ICONS[$state] ?? '');
                            }
                        }),
                    TextInput::make('label')
                        ->label('Label tampilan')
                        ->required()
                        ->helperText('mis. "Instagram"'),
                    TextInput::make('value')
                        ->label('Teks yang tampil')
                        ->required()
                        ->helperText('mis. "@ajatsudrajat"'),
                    TextInput::make('href')
                        ->label('URL tautan')
                        ->url()
                        ->helperText('Kosongkan kalau belum ada — ikon disembunyikan otomatis, bukan mengarah ke link mati'),
                ]),

            Section::make('Penayangan')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    Toggle::make('is_published')
                        ->label('Tampilkan di situs')->default(true),
                    TextInput::make('sort_order')
                        ->label('Urutan')->numeric()->default(0),
                ]),
        ]);
    }
}
