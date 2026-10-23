<?php

namespace App\Filament\Resources\Expertises;

use App\Filament\Resources\Expertises\Pages\CreateExpertise;
use App\Filament\Resources\Expertises\Pages\EditExpertise;
use App\Filament\Resources\Expertises\Pages\ListExpertises;
use App\Filament\Resources\Expertises\Schemas\ExpertiseForm;
use App\Filament\Resources\Expertises\Tables\ExpertisesTable;
use App\Models\Expertise;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ExpertiseResource extends Resource
{
    protected static ?string $model = Expertise::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedWrenchScrewdriver;

    protected static ?string $navigationLabel = 'Bidang Keahlian';

    protected static ?string $modelLabel = 'bidang keahlian';

    protected static ?string $pluralModelLabel = 'Bidang Keahlian';

    protected static ?int $navigationSort = 15;

    public static function getNavigationBadge(): ?string
    {
        return (string) Expertise::query()->where('is_published', true)->count();
    }

    public static function form(Schema $schema): Schema
    {
        return ExpertiseForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ExpertisesTable::configure($table);
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
            'index' => ListExpertises::route('/'),
            'create' => CreateExpertise::route('/create'),
            'edit' => EditExpertise::route('/{record}/edit'),
        ];
    }
}
