<?php

/**
 * Pesan validasi berbahasa Indonesia.
 *
 * Laravel tidak menyertakan terjemahan non-Inggris, padahal APP_LOCALE=id.
 * Tanpa berkas ini klien melihat pesan seperti "The name field is required."
 *
 * Hanya aturan yang benar-benar dipakai yang diterjemahkan — sengaja tidak
 * memasang paket terjemahan lengkap supaya jumlah berkas tetap hemat
 * (hosting tujuan punya batas inode).
 */
return [
    'accepted'  => ':attribute wajib disetujui.',
    'after'     => ':attribute harus berisi tanggal setelah :date.',
    'before'    => ':attribute harus berisi tanggal sebelum :date.',
    'boolean'   => ':attribute harus bernilai benar atau salah.',
    'confirmed' => 'Konfirmasi :attribute tidak cocok.',
    'date'      => ':attribute bukan tanggal yang valid.',
    'email'     => ':attribute harus berupa alamat email yang valid.',
    'file'      => ':attribute harus berupa berkas.',
    'filled'    => ':attribute wajib diisi.',
    'image'     => ':attribute harus berupa gambar.',
    'in'        => ':attribute yang dipilih tidak valid.',
    'integer'   => ':attribute harus berupa bilangan bulat.',
    'mimes'     => ':attribute harus berupa berkas berjenis: :values.',
    'numeric'   => ':attribute harus berupa angka.',
    'required'  => ':attribute wajib diisi.',
    'string'    => ':attribute harus berupa teks.',
    'unique'    => ':attribute sudah dipakai.',
    'url'       => 'Format :attribute tidak valid.',

    'max' => [
        'array'   => ':attribute tidak boleh lebih dari :max item.',
        'file'    => ':attribute tidak boleh lebih besar dari :max kilobyte.',
        'numeric' => ':attribute tidak boleh lebih besar dari :max.',
        'string'  => ':attribute tidak boleh lebih dari :max karakter.',
    ],

    'min' => [
        'array'   => ':attribute harus memiliki minimal :min item.',
        'file'    => ':attribute harus berukuran minimal :min kilobyte.',
        'numeric' => ':attribute harus berukuran minimal :min.',
        'string'  => ':attribute harus berisi minimal :min karakter.',
    ],

    'custom' => [],

    'attributes' => [],
];
