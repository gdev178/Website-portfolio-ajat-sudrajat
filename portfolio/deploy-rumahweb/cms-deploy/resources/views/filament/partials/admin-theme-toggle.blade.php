{{-- Tombol ganti Mode Gelap <-> Mode Spiderman di admin. Terpisah dari
     pengalih terang/gelap bawaan Filament (yang sengaja disembunyikan lewat
     ->darkMode(isForced: true) di AdminPanelProvider) supaya .dark selalu
     aktif dan tidak ada latar putih yang bocor — lihat catatan di provider. --}}
<div
    x-data="{
        theme: localStorage.getItem('admin-theme') || 'spiderman',
        toggle() {
            this.theme = this.theme === 'spiderman' ? 'gelap' : 'spiderman';
            localStorage.setItem('admin-theme', this.theme);
            document.documentElement.dataset.adminTheme = this.theme;
        },
    }"
    class="flex shrink-0 items-center"
>
    <button
        type="button"
        x-on:click="toggle()"
        x-bind:title="theme === 'spiderman' ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Spiderman'"
        x-bind:aria-label="theme === 'spiderman' ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Spiderman'"
        class="fi-icon-btn flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg leading-none outline-hidden transition duration-75 hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-white/5 dark:focus-visible:bg-white/5"
        x-text="theme === 'spiderman' ? '🕷️' : '🌙'"
    ></button>
</div>
