<?php

namespace App\Filament\Resources\Expertises\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ExpertisesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                ColorColumn::make('accent')->label('Warna'),

                TextColumn::make('title.id')
                    ->label('Judul')
                    ->weight('bold')
                    ->description(fn ($record) => $record->key),

                TextColumn::make('years.id')
                    ->label('Pengalaman')
                    ->placeholder('—'),

                IconColumn::make('show_in_build')
                    ->label('What I Build')
                    ->boolean(),

                ToggleColumn::make('is_published')->label('Tayang'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('Belum ada bidang keahlian');
    }
}
