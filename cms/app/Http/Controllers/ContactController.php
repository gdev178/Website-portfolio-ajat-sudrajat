<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Menerima kiriman formulir kontak dari situs.
     *
     * Satu-satunya endpoint tulis publik di aplikasi ini. Karena itu
     * dibatasi ketat: panjang isian dibatasi, ada jebakan honeypot,
     * dan pembatasan laju diatur di routes/api.php.
     */
    public function store(Request $request): JsonResponse
    {
        // Honeypot: bot mengisi semua field, manusia tidak melihat yang ini.
        // Dijawab seolah berhasil supaya bot tidak mencoba variasi lain.
        if (filled($request->input('website'))) {
            return response()->json(['ok' => true]);
        }

        $data = $request->validate([
            'name'         => ['required', 'string', 'max:120'],
            'email'        => ['required', 'email', 'max:160'],
            'whatsapp'     => ['nullable', 'string', 'max:40'],
            'subject'      => ['nullable', 'string', 'max:160'],
            'project_type' => ['nullable', 'string', 'max:80'],
            'budget'       => ['nullable', 'string', 'max:80'],
            'message'      => ['required', 'string', 'max:5000'],
        ]);

        ContactMessage::create($data + ['ip_address' => $request->ip()]);

        return response()->json([
            'ok'      => true,
            'message' => 'Pesan terkirim. Terima kasih.',
        ], 201);
    }
}
