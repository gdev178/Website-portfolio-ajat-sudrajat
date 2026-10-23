<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Testimoni.
 *
 * Menggantikan rencana buku tamu: TIDAK ADA endpoint tulis publik.
 * Hanya admin yang mengisi, jadi tidak perlu captcha, moderasi,
 * kolom is_approved, maupun ip_address.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->json('role')->nullable();       // jabatan / instansi
            $table->json('message');
            $table->string('project_ref')->nullable(); // pekerjaan terkait

            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_published')->default(true);
            $table->boolean('is_placeholder')->default(false);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
