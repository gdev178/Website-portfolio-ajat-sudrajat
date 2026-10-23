<?php

namespace App\Filament\Resources\ContactMessages\Pages;

use App\Filament\Resources\ContactMessages\ContactMessageResource;
use Filament\Resources\Pages\ListRecords;

class ListContactMessages extends ListRecords
{
    protected static string $resource = ContactMessageResource::class;

    /** Tidak ada tombol "Buat" — pesan hanya datang dari pengunjung */
    protected function getHeaderActions(): array
    {
        return [];
    }
}
