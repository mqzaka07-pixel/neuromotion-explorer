# NeuroMotion Explorer — Digital Human Body Explorer

Website edukasi interaktif untuk tugas IPAS **Sistem Saraf dan Gerak pada Manusia** (Kelas 10 PPLG, SMK Raden Umar Said Kudus) oleh Muhammad Qodli Zaka.

## Fitur
- **Beranda** — hero dengan model 3D tubuh manusia, kartu materi, dan identitas proyek.
- **Materi** — sistem saraf (otak, sumsum tulang belakang, saraf tepi) dengan sorotan bagian pada model 3D, bagian-bagian otak (otak besar, otak kecil, batang otak), jenis tulang berdasarkan bentuk (pipa, pipih, pendek, tidak beraturan, sesamoid), jenis sendi (engsel, peluru, putar), jenis otot (rangka, polos, jantung) beserta tabel perbandingan, dan otot lengan biseps–triseps — semuanya dengan model 3D.
- **Kelainan** — model 3D skoliosis, kifosis, lordosis, **fisura** (retak tulang, dibandingkan dengan tulang normal dan fraktur, plus mode rontgen) dan **artritis** (lutut normal vs radang sendi dengan tulang rawan menipis, taji tulang, dan pembengkakan).
- **Simulasi Alur** — animasi langkah demi langkah gerak sadar vs gerak refleks, lengkap dengan model 3D jalur impuls.
- **Kuis** — 17 soal dengan umpan balik langsung, skor otomatis, dan skor terbaik tersimpan di browser.

## Teknologi
HTML5, CSS3 (Flexbox/Grid), JavaScript murni, dan [Three.js r128](https://threejs.org) dari CDN untuk grafik 3D. Bentuk kerangka, organ, otak, dan otot berasal dari data anatomi asli **BodyParts3D** (© 2008 Life Science Integrated Database Center, CC BY-SA 2.1 JP) — lihat `models/ATTRIBUTION.md`.

## File
- `saraf.html` — struktur halaman
- `saraf.css` — tampilan
- `saraf.js` — logika navigasi, simulasi, kuis, dan model 3D
- `models/*.bin` — data mesh anatomi 3D (dimuat oleh `saraf.js`)

## Menjalankan
Jalankan lewat server web (misalnya Netlify atau `npx serve`), karena model 3D dimuat dengan `fetch` dan tidak bisa dibuka langsung dari file lokal (butuh internet untuk memuat Three.js dan font). Di Netlify, `saraf.html` otomatis tampil sebagai halaman utama.
