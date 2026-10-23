<?php

namespace App\Filament\Resources\ContactMessages\Tables;

use App\Models\ContactMessage;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;

class ContactMessagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('created_at')
                    ->label('Masuk')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),

                TextColumn::make('name')
                    ->label('Pengirim')
                    ->searchable()
                    // Pesan belum dibaca ditebalkan supaya langsung kelihatan
                    ->weight(fn ($record) => $record->is_read ? null : 'bold')
                    ->description(fn ($record) => $record->email),

                TextColumn::make('is_read')
                    ->label('')
                    ->badge()
                    ->color('danger')
                    ->formatStateUsing(fn ($state) => $state ? '' : 'BARU'),

                TextColumn::make('subject')
                    ->label('Subjek')
                    ->placeholder('—')
                    ->limit(40),

                TextColumn::make('project_type')
                    ->label('Jenis pekerjaan')
                    ->badge()
                    ->placeholder('—'),

                TextColumn::make('whatsapp')
                    ->label('WhatsApp')
                    ->placeholder('—')
                    ->toggleable(),
            ])
            ->filters([
                TernaryFilter::make('is_read')
                    ->label('Status baca')
                    ->trueLabel('Sudah dibaca')
                    ->falseLabel('Belum dibaca'),
            ])
            ->recordActions([
                ViewAction::make()
                    ->label('Lihat')
                    // Membuka pesan otomatis menandainya sudah dibaca
                    ->after(fn (ContactMessage $record) => $record->update(['is_read' => true])),

                Action::make('balas_whatsapp')
                    ->label('WhatsApp')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->color('success')
                    ->url(fn (ContactMessage $record) => filled($record->whatsapp)
                        ? 'https://wa.me/' . preg_replace('/\D/', '', $record->whatsapp)
                        : null)
                    ->openUrlInNewTab()
                    ->visible(fn (ContactMessage $record) => filled($record->whatsapp)),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('tandai_dibaca')
                        ->label('Tandai sudah dibaca')
                        ->icon('heroicon-o-check')
                        ->deselectRecordsAfterCompletion()
                        ->action(fn (Collection $records) => $records->each->update(['is_read' => true])),
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('Belum ada pesan masuk')
            ->emptyStateDescription('Pesan dari formulir kontak di situs akan muncul di sini.');
    }
}
