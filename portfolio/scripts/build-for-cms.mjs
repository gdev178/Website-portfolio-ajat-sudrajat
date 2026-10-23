// Menyalin hasil `vite build` ke tempat yang dibaca routes/web.php di CMS.
//
// index.html -> cms/storage/app/spa/index.html (di luar public/, lihat
//   komentar di routes/web.php untuk alasannya)
// assets/*   -> cms/public/assets/ (path root-relative yang sama seperti
//   yang ditulis Vite di index.html)
//
// Dijalankan lewat `npm run build:cms`, dipakai sebelum upload manual ke
// hosting (lihat bagian 9 CLAUDE.md — tidak ada Node di server tujuan).

import { existsSync, rmSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const portfolioRoot = join(here, '..');
const distDir = join(portfolioRoot, 'dist');
const cmsRoot = join(portfolioRoot, '..', 'cms');

if (!existsSync(distDir)) {
  console.error('dist/ tidak ada — jalankan `npm run build` dulu (script ini dipanggil otomatis lewat `npm run build:cms`).');
  process.exit(1);
}
if (!existsSync(cmsRoot)) {
  console.error(`Folder cms tidak ditemukan di ${cmsRoot}. Skrip ini asumsikan struktur B-CLIENT/portfolio + B-CLIENT/cms.`);
  process.exit(1);
}

const spaDir = join(cmsRoot, 'storage', 'app', 'spa');
const assetsDestDir = join(cmsRoot, 'public', 'assets');
const assetsSrcDir = join(distDir, 'assets');

mkdirSync(spaDir, { recursive: true });
rmSync(assetsDestDir, { recursive: true, force: true });
mkdirSync(assetsDestDir, { recursive: true });

if (existsSync(assetsSrcDir)) {
  cpSync(assetsSrcDir, assetsDestDir, { recursive: true });
}

const html = readFileSync(join(distDir, 'index.html'), 'utf8');
writeFileSync(join(spaDir, 'index.html'), html, 'utf8');

console.log('Build disalin ke cms/storage/app/spa/index.html dan cms/public/assets/.');
