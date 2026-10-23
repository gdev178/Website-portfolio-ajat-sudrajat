<?php

namespace App\Filament\Resources\Testimonials\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class TestimonialsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->weight('bold')
                    ->description(fn ($record) => $record->project_ref),

                TextColumn::make('is_placeholder')
                    ->label('')
                    ->badge()
                    ->color('warning')
                    ->formatStateUsing(fn ($state) => $state ? 'CONTOH' : ''),

                TextColumn::make('message.id')
                    ->label('Testimoni')
                    ->limit(70)
                    ->wrap()
                    ->color('gray'),

                IconColumn::make('is_pinned')
                    ->label('Disematkan')
                    ->boolean(),

                ToggleColumn::make('is_published')
                    ->label('Tayang'),
            ])
            ->filters([
                TernaryFilter::make('is_published')->label('Status tayang'),
                TernaryFilter::make('is_placeholder')->label('Entri contoh'),
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
            ->emptyStateHeading('Belum ada testimoni')
            ->emptyStateDescription('Bagian testimoni otomatis tersembunyi di situs selama kosong.');
    }
}
