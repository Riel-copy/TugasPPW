# Tech Stack — Goresan Store

> Tech stack = daftar teknologi yang dipakai untuk membuat website.

## Prinsip
Website dibuat **sesederhana mungkin**: satu halaman statis, tanpa server sendiri, tanpa database, dan tanpa proses build. Cocok untuk belajar dan mudah dibantu Copilot.

## Teknologi yang dipakai
| Bagian | Pilihan | Penjelasan sederhana |
| --- | --- | --- |
| Struktur halaman | HTML5 | Kerangka isi website (judul, tombol, formulir) |
| Tampilan | CSS3 | Warna, ukuran, tata letak, tampilan di ponsel |
| Logika | JavaScript (ES modules) | Membuat pencarian, keranjang, dan hitungan bisa jalan; dipecah ke beberapa file |
| Penyimpanan | localStorage | Tempat kecil di browser untuk menyimpan keranjang |
| Pemesanan | Tautan WhatsApp (`wa.me`) | Membuka chat WhatsApp dengan pesan yang sudah terisi |
| Data produk | Berkas `js/data.js` | Daftar produk ditulis langsung di file, tanpa database |
| Gambar | WebP lokal di `assets/images/` | Format gambar ringan; disimpan di dalam proyek |
| Server lokal | `python3 -m http.server` | Untuk mencoba website di komputer sendiri |
| Pengujian (opsional) | Node.js dengan `node:test` | Untuk mengecek fungsi hitung secara otomatis |
| Hosting | Cloudflare Pages (rencana) | Tempat menaruh website agar bisa dibuka lewat internet (HTTPS) |
| Kontrol versi | Git (opsional) | Menyimpan riwayat perubahan |

## Yang sengaja TIDAK dipakai
- Framework (React, Vue, Angular) — belum perlu.
- Backend dan database — pesanan diurus manual lewat WhatsApp.
- Pembayaran online, akun pengguna, analitik — di luar MVP.
- Library dari internet (CDN) — semua file disimpan lokal agar aman dan cepat.

## Aturan pilihan teknologi
- Tidak ada `npm install` yang wajib untuk menjalankan website.
- Tidak ada rahasia (token, password) di dalam kode.
- Browser yang dituju: versi terbaru Chrome, Edge, Firefox, Safari.
