<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sertifikat & pelatihan.
 *
 * `is_placeholder` penting di sini: sertifikat adalah klaim kualifikasi,
 * jadi entri contoh wajib ditandai dan tidak boleh tampil di beranda.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();

            $table->json('title');
            $table->json('issuer');
            $table->json('category');

            $table->string('date', 30)->default('—');
            $table->string('credential')->nullable();
            $table->string('image')->nullable();
            $table->string('href')->nullable();      // tautan verifikasi

            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->boolean('is_placeholder')->default(false);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
