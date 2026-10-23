{{-- Skema Mode Spiderman untuk admin: skala warna kustom yang menimpa --gray-*
     dan --primary-* Filament, hanya aktif saat html[data-admin-theme="spiderman"].
     Mode "gelap" (default) memakai skema gelap bawaan Filament (Zinc + Sky) —
     tidak disentuh sama sekali di sini. Skrip di bawah dijalankan sebelum
     render supaya tidak ada kedipan warna saat halaman dimuat. --}}
<script>
    (function () {
        var saved = localStorage.getItem('admin-theme') || 'spiderman';
        document.documentElement.dataset.adminTheme = saved;
    })();
</script>
<style>
    html[data-admin-theme="spiderman"] {
        --gray-50: #f7e4e6;
        --gray-100: #eec7cb;
        --gray-200: #d99aa1;
        --gray-300: #b8636d;
        --gray-400: #8a3540;
        --gray-500: #5c2229;
        --gray-600: #3a181d;
        --gray-700: #2a1216;
        --gray-800: #1c0c10;
        --gray-900: #170a0d;
        --gray-950: #0d070a;

        --primary-50: oklch(0.971 0.013 17.38);
        --primary-100: oklch(0.936 0.032 17.717);
        --primary-200: oklch(0.885 0.062 18.334);
        --primary-300: oklch(0.808 0.114 19.571);
        --primary-400: oklch(0.704 0.191 22.216);
        --primary-500: oklch(0.637 0.237 25.331);
        --primary-600: oklch(0.577 0.245 27.325);
        --primary-700: oklch(0.505 0.213 27.518);
        --primary-800: oklch(0.444 0.177 26.899);
        --primary-900: oklch(0.396 0.141 25.723);
        --primary-950: oklch(0.258 0.092 26.042);
    }
</style>
