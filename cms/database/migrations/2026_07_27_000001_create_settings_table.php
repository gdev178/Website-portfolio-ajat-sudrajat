<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel key-value untuk seluruh teks tetap situs.
 *
 * Nilainya disimpan sebagai JSON supaya bisa menampung apa saja:
 * string biasa, objek dwibahasa {en, id}, maupun array kartu.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('group')->index();   // untuk mengelompokkan tab di admin
            $table->json('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
