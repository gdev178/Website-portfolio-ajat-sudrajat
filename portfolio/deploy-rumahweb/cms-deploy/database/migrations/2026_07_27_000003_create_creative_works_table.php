<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Karya kreatif — desain cetak, branding, edit foto, dokumentasi.
 * Ditampilkan sebagai grid bento, jadi punya kolom `span` untuk ukuran kartu.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('creative_works', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();

            $table->json('title');
            $table->json('category');
            $table->json('subtitle')->nullable();
            $table->json('description');
            $table->json('points')->nullable();
            $table->json('tools')->nullable();

            $table->string('image')->nullable();
            $table->string('gradient')->nullable();      // latar cadangan tanpa gambar
            $table->string('span', 10)->default('normal'); // large / wide / normal

            $table->boolean('is_published')->default(true);
            $table->boolean('is_placeholder')->default(false);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('creative_works');
    }
};
