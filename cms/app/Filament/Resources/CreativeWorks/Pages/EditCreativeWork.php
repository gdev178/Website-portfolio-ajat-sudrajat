<?php

namespace App\Filament\Resources\CreativeWorks\Pages;

use App\Filament\Resources\CreativeWorks\CreativeWorkResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCreativeWork extends EditRecord
{
    protected static string $resource = CreativeWorkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
