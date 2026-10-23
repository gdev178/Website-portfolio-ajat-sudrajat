<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Bidang keahlian (ATM/CRM, Network, CCTV, TKJ, Desain, Web).
 *
 * Sumber untuk section "What I Build" & "Capability Ecosystem" di Home,
 * dan "Skills & Tools" di halaman About. Frontend menurunkan BUILD_ITEMS
 * dan SKILLS dari tabel ini — jangan duplikasi di tempat lain.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expertises', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // atm, network, cctv, tkj, design, web
            $table->string('icon');          // nama ikon: wrench, monitor, camera, dst
            $table->string('accent', 9);     // warna hex

            $table->json('title');
            $table->json('years')->nullable();  // mis. "8 tahun di Bank Mandiri"
            $table->string('years_short', 10)->nullable(); // mis. "8"
            $table->json('detail');
            $table->json('points')->nullable(); // array {en, id} — dipakai di kartu About

            $table->boolean('show_in_build')->default(true); // tampil di "What I Build"
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expertises');
    }
};
