<?php

namespace App\Filament\Resources\CreativeWorks\Pages;

use App\Filament\Resources\CreativeWorks\CreativeWorkResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCreativeWorks extends ListRecords
{
    protected static string $resource = CreativeWorkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
