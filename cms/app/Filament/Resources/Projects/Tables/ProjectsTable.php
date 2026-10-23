<?php

namespace App\Filament\Resources\Projects\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ProjectsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')      // urutan bisa digeser langsung di tabel
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

                // Kolom terpisah: badge() hanya mengubah gaya kolom,
                // tidak bisa dipakai untuk menambahkan label tambahan
                TextColumn::make('is_placeholder')
                    ->label('')
                    ->badge()
                    ->color('warning')
                    ->formatStateUsing(fn ($state) => $state ? 'CONTOH' : '')
                    ->tooltip(fn ($state) => $state
                        ? 'Entri contoh — tidak tampil di beranda'
                        : null),

                TextColumn::make('category.id')
                    ->label('Kategori')
                    ->badge(),

                TextColumn::make('type.id')
                    ->label('Jenis')
                    ->color('gray'),

                TextColumn::make('year')
                    ->label('Tahun'),

                ToggleColumn::make('is_published')
                    ->label('Tayang'),

                ToggleColumn::make('is_featured')
                    ->label('Beranda'),
            ])
            ->filters([
                TernaryFilter::make('is_published')->label('Status tayang'),
                TernaryFilter::make('is_featured')->label('Tampil di beranda'),
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
            ->emptyStateHeading('Belum ada proyek')
            ->emptyStateDescription('Tambahkan pekerjaan pertama lewat tombol di kanan atas.');
    }
}
