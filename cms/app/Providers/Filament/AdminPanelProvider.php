<?php

namespace App\Providers\Filament;

use Filament\Enums\ThemeMode;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\View\PanelsRenderHook;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->profile()
            // Mode terang/putih dihapus total — panel dikunci selalu gelap
            // (->darkMode(isForced: true)) supaya kelas .dark Tailwind selalu
            // aktif, karena beberapa komponen Filament pakai literal "bg-white"
            // di mode terang yang TIDAK bisa ditimpa lewat variabel --gray-*.
            // Di atas fondasi gelap yang selalu aktif itu, ada 2 skema warna
            // yang bisa dipilih pengguna lewat tombol kustom di topbar (lihat
            // admin-theme-toggle.blade.php): "Gelap" (default Filament: Zinc +
            // Sky) dan "Spiderman" (merah-hitam, override --gray-*/--primary-*
            // lewat admin-theme-head.blade.php, hanya aktif saat
            // html[data-admin-theme="spiderman"]). Konsisten dengan pasangan
            // Mode Pro / Mode Spiderman di situs publik.
            ->darkMode(true, isForced: true)
            ->defaultThemeMode(ThemeMode::Dark)
            ->colors([
                'primary' => Color::Sky,
            ])
            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn (): string => view('filament.partials.admin-theme-head')->render(),
            )
            ->renderHook(
                PanelsRenderHook::TOPBAR_END,
                fn (): string => view('filament.partials.admin-theme-toggle')->render(),
            )
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
