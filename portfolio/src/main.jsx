import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { loadContent } from './content-bootstrap.js';

/**
 * App.jsx (dan lewat itu data.js) baru diimpor SETELAH loadContent()
 * selesai — dynamic import() menjamin urutan ini secara eksplisit,
 * beda dengan static import biasa yang tidak bisa dipastikan menunggu
 * modul sibling ber-top-level-await selesai lebih dulu di semua kondisi.
 */
async function bootstrap() {
  await loadContent();

  const { default: App } = await import('./App.jsx');

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
