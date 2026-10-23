<?php

namespace App\Filament\Resources\CreativeWorks\Tables;

use App\Models\CreativeWork;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class CreativeWorksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                ImageColumn::make('image')
                    ->label('Gambar')
                    ->disk('public')
                    ->imageWidth(80)
                    ->imageHeight(50),

                TextColumn::make('title.id')
                    ->label('Judul')
                    ->searchable(query: fn ($query, string $search) => $query
                        ->whereRaw('LOWER(title) LIKE ?', ['%' . strtolower($search) . '%']))
                    ->weight('bold')
                    ->description(fn ($record) => $record->slug),

                TextColumn::make('is_placeholder')
                    ->label('')
                    ->badge()
                    ->color('warning')
                    ->formatStateUsing(fn ($state) => $state ? 'CONTOH' : ''),

                TextColumn::make('category.id')
                    ->label('Kategori')
                    ->badge(),

                TextColumn::make('span')
                    ->label('Ukuran')
                    ->formatStateUsing(fn ($state) => CreativeWork::SPANS[$state] ?? $state)
                    ->color('gray'),

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
            ->emptyStateHeading('Belum ada karya')
            ->emptyStateDescription('Tambahkan karya kreatif lewat tombol di kanan atas.');
    }
}
