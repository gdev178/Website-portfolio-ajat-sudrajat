<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Pesan yang masuk lewat formulir kontak di situs.
 *
 * Read-only di admin — tidak ada form tambah, karena isinya
 * hanya boleh datang dari pengunjung.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('email');
            $table->string('whatsapp')->nullable();
            $table->string('subject')->nullable();
            $table->string('project_type')->nullable();
            $table->string('budget')->nullable();
            $table->text('message');

            $table->boolean('is_read')->default(false);
            $table->string('ip_address', 45)->nullable();

            $table->timestamps();

            $table->index(['is_read', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
