<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Technology Stack — ubin logo/monogram teknologi yang dikelompokkan
 * per kategori (Jaringan & Server / Perangkat & Lapangan / Desain & Web).
 *
 * Dua tabel: `tech_groups` menyimpan nama kategori (supaya labelnya tidak
 * berulang di tiap baris), `tech_items` menyimpan ubin di dalamnya.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tech_groups', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // network, hardware, creative
            $table->json('label');           // {en, id}
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('tech_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tech_group_id')->constrained()->cascadeOnDelete();

            $table->string('name');       // nama produk, tidak diterjemahkan
            $table->string('mono', 3);    // 1-3 huruf di ubin
            $table->string('bg', 9);      // warna latar ubin
            $table->string('fg', 9)->nullable(); // warna teks ubin

            $table->boolean('is_main_skill')->default(true); // true=Keahlian utama, false=Sering dipakai
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tech_items');
        Schema::dropIfExists('tech_groups');
    }
};
