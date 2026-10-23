<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

/**
 * Dipakai oleh aksi "Lihat". Semua field dikunci — pesan datang dari
 * pengunjung dan tidak boleh diubah dari admin.
 */
class ContactMessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Pengirim')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('name')->label('Nama')->disabled(),
                    TextInput::make('email')->label('Email')->disabled(),
                    TextInput::make('whatsapp')->label('WhatsApp')->disabled()->placeholder('—'),
                    TextInput::make('created_at')->label('Waktu masuk')->disabled(),
                ]),

            Section::make('Kebutuhan')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('subject')->label('Subjek')->disabled()->placeholder('—'),
                    TextInput::make('project_type')->label('Jenis pekerjaan')->disabled()->placeholder('—'),
                    TextInput::make('budget')->label('Rentang anggaran')->disabled()->placeholder('—'),
                ]),

            Section::make('Pesan')
                ->columnSpanFull()
                ->schema([
                    Textarea::make('message')->label('')->rows(8)->disabled(),
                ]),
        ]);
    }
}
