<?php

namespace App\Filament\Resources\CreativeWorks;

use App\Filament\Resources\CreativeWorks\Pages\CreateCreativeWork;
use App\Filament\Resources\CreativeWorks\Pages\EditCreativeWork;
use App\Filament\Resources\CreativeWorks\Pages\ListCreativeWorks;
use App\Filament\Resources\CreativeWorks\Schemas\CreativeWorkForm;
use App\Filament\Resources\CreativeWorks\Tables\CreativeWorksTable;
use App\Models\CreativeWork;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CreativeWorkResource extends Resource
{
    protected static ?string $model = CreativeWork::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPaintBrush;

    protected static ?string $navigationLabel = 'Karya Kreatif';

    protected static ?string $modelLabel = 'karya kreatif';

    protected static ?string $pluralModelLabel = 'Karya Kreatif';

    protected static ?int $navigationSort = 20;

    public static function getNavigationBadge(): ?string
    {
        return (string) CreativeWork::query()->where('is_published', true)->count();
    }

    public static function form(Schema $schema): Schema
    {
        return CreativeWorkForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CreativeWorksTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCreativeWorks::route('/'),
            'create' => CreateCreativeWork::route('/create'),
            'edit' => EditCreativeWork::route('/{record}/edit'),
        ];
    }
}
