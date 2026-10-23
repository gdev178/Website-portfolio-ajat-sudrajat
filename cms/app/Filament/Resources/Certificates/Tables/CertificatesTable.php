<?php

namespace App\Filament\Resources\Certificates\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class CertificatesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                ImageColumn::make('image')
                    ->label('Scan')
                    ->disk('public')
                    ->imageWidth(44)
                    ->imageHeight(58),

                TextColumn::make('title.id')
                    ->label('Nama sertifikat')
                    ->searchable(query: fn ($query, string $search) => $query
                        ->whereRaw('LOWER(title) LIKE ?', ['%' . strtolower($search) . '%']))
                    ->weight('bold')
                    ->wrap(),

                TextColumn::make('is_placeholder')
                    ->label('')
                    ->badge()
                    ->color('warning')
                    ->formatStateUsing(fn ($state) => $state ? 'CONTOH' : ''),

                TextColumn::make('issuer.id')
                    ->label('Penerbit'),

                TextColumn::make('category.id')
                    ->label('Kategori')
                    ->badge(),

                TextColumn::make('date')
                    ->label('Terbit'),

                TextColumn::make('credential')
                    ->label('Kredensial')
                    ->fontFamily('mono')
                    ->placeholder('—')
                    ->toggleable(),

                ToggleColumn::make('is_published')->label('Tayang'),
                ToggleColumn::make('is_featured')->label('Unggulan'),
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
            ->emptyStateHeading('Belum ada sertifikat')
            ->emptyStateDescription('Isi hanya dengan sertifikat yang benar-benar dimiliki.');
    }
}
