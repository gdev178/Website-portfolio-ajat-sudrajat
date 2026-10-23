<?php

namespace App\Filament\Resources\TechGroups;

use App\Filament\Resources\TechGroups\Pages\CreateTechGroup;
use App\Filament\Resources\TechGroups\Pages\EditTechGroup;
use App\Filament\Resources\TechGroups\Pages\ListTechGroups;
use App\Filament\Resources\TechGroups\Schemas\TechGroupForm;
use App\Filament\Resources\TechGroups\Tables\TechGroupsTable;
use App\Models\TechGroup;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TechGroupResource extends Resource
{
    protected static ?string $model = TechGroup::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCpuChip;

    protected static ?string $navigationLabel = 'Technology Stack';

    protected static ?string $modelLabel = 'kategori teknologi';

    protected static ?string $pluralModelLabel = 'Technology Stack';

    protected static ?int $navigationSort = 16;

    public static function form(Schema $schema): Schema
    {
        return TechGroupForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TechGroupsTable::configure($table);
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
            'index' => ListTechGroups::route('/'),
            'create' => CreateTechGroup::route('/create'),
            'edit' => EditTechGroup::route('/{record}/edit'),
        ];
    }
}
