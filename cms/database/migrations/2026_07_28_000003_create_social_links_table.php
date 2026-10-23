<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tautan sosial (Instagram, LinkedIn, GitHub, YouTube, dst).
 *
 * `href` boleh kosong — kalau kosong, ikon/link disembunyikan di frontend
 * (bukan mengarah ke link mati). Dipakai di footer dan kartu kontak.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_links', function (Blueprint $table) {
            $table->id();
            $table->string('label');   // Instagram, LinkedIn, GitHub, YouTube
            $table->string('icon');    // nama ikon: instagram, linkedin, github, youtube
            $table->string('value');   // teks yang tampil, mis. "@ajatsudrajat"
            $table->string('href')->nullable();

            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_links');
    }
};
