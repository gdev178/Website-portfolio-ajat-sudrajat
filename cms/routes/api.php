<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContentController;
use Illuminate\Support\Facades\Route;

/*
 * Endpoint publik untuk frontend React.
 *
 * Sengaja hanya ada satu endpoint tulis. Buku tamu tidak jadi dibuat
 * (diganti modul Testimoni yang diisi dari admin), jadi tidak ada
 * jalur lain bagi pengunjung untuk menulis ke database.
 */

Route::get('/content', [ContentController::class, 'index'])
    ->name('api.content');

Route::post('/contact', [ContactController::class, 'store'])
    // 5 kiriman per menit per IP - cukup untuk manusia, menyulitkan bot
    ->middleware('throttle:5,1')
    ->name('api.contact');
