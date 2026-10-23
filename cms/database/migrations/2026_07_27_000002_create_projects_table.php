<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Proyek / pekerjaan teknis.
 *
 * Kolom bertipe JSON berisi objek dwibahasa {en, id} supaya bentuknya
 * sama persis dengan yang dibaca frontend React lewat t().
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();

            $table->json('title');
            $table->json('category');
            $table->json('type');
            $table->string('year', 20)->default('—');

            $table->json('description');        // ringkasan untuk kartu
            $table->json('detail')->nullable(); // paragraf di halaman detail
            $table->json('points')->nullable(); // lingkup pekerjaan
            $table->json('stack')->nullable();  // daftar teknologi

            $table->string('image')->nullable();

            $table->boolean('is_featured')->default(false);    // tampil di beranda
            $table->boolean('is_published')->default(true);
            $table->boolean('is_placeholder')->default(false); // memicu badge CONTOH
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
