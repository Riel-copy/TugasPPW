# Panduan Pengembangan — Goresan Store

Dokumen ini adalah panduan langkah demi langkah untuk membuat website toko peralatan gambar. Cocok dipakai bersama GitHub Copilot: berikan dokumen ini sebagai acuan, lalu minta Copilot mengerjakan **satu langkah per permintaan**.

## 1. Cakupan dan urutan baca
Website statis (HTML, CSS, JavaScript) tanpa backend. Baca berurutan:
`prd.md` → `tech_stack.md` → `arsitektur.md` → `ui.ux.md`.

Pakai nama merek sementara **Goresan Store** sampai pemilik toko menentukan nama aslinya. Website belum dianggap selesai hanya karena dokumennya ada.

## 2. Prasyarat
- Editor kode (misalnya VS Code dengan Copilot), browser modern, Python 3, dan Git (opsional).
- Node.js (opsional) hanya untuk pengujian otomatis, bukan untuk menjalankan website.
- Data usaha sebelum peluncuran: nomor WhatsApp internasional, alamat toko, jam buka, daftar produk dan harga, foto produk berizin, dan kebijakan retur/tukar.
- Dilarang memakai nomor contoh sebagai tujuan pesanan aktif. Jika nomor asli belum ada, nonaktifkan tombol pesan.

## 3. Langkah implementasi
1. **Siapkan struktur.** Buat berkas dan folder sesuai `arsitektur.md`: `index.html`, `css/styles.css`, folder `js/`, folder `assets/images/`.
2. **Isi konfigurasi** di `js/config.js`: nama toko, kontak, alamat, jam buka. Nomor WhatsApp memakai kode negara dan hanya digit (contoh `6281234567890`), tanpa `+`, spasi, atau awalan 0.
3. **Buat katalog** di `js/data.js`: minimal 10 produk contoh yang mencakup kelima kategori (pensil & arang, kertas & buku sketsa, cat & tinta, kuas & alat lukis, aksesori & penyangga). Tiap produk punya: `id` unik, `name`, `category`, `brand`, `description`, `specification`, `price` (bilangan bulat positif), `image` (path lokal), `imageAlt`. Beri tanda bahwa data masih contoh.
4. **Bangun HTML semantik:** header, hero, katalog, keranjang, formulir, ringkasan, cara pesan, FAQ, kontak, footer, dan `noscript`. Muat `js/app.js` dengan `type="module"`.
5. **Buat CSS mobile-first** (desain untuk ponsel dulu, lalu diperlebar): token warna, tipografi, grid kartu, formulir, status/error, `focus-visible`. Ponsel satu kolom; tambah kolom jika ruang cukup.
6. **Fitur katalog:** pencarian tanpa membedakan huruf besar/kecil, filter kategori, jumlah hasil, keadaan kosong. Pencarian dan filter harus bisa digabung.
7. **Fitur keranjang:** satu sumber state; tambah, ubah, hapus berdasarkan ID; tolak jumlah selain bilangan bulat 1–99. Hitung memakai harga dari katalog.
8. **Fitur cara terima:** pilihan "Ambil di toko" / "Dikirim". Jika dikirim, tampilkan dan wajibkan kolom alamat.
9. **Fitur penyimpanan:** simpan hanya ID, jumlah, dan versi skema ke localStorage (kunci `goresan-store:cart:v1`). Tangani JSON rusak, versi tak dikenal, produk hilang, dan akses storage ditolak tanpa membuat aplikasi crash.
10. **Fitur pengajuan:** validasi nama, nomor, dan alamat sesuai `ui.ux.md`. Tampilkan ringkasan, lalu buat tautan WhatsApp dari state terbaru dengan `encodeURIComponent`. Jika isian berubah setelah pemeriksaan, status pemeriksaan dibatalkan. Jangan kirim otomatis dan jangan kosongkan keranjang.
11. **Lengkapi konten:** aturan konfirmasi stok, estimasi harga, ongkir, retur/tukar, dan penjelasan penggunaan data saat beralih ke WhatsApp. Jangan mengarang alamat, stok, testimoni, atau kebijakan.
12. **Verifikasi:** jalankan pemeriksaan di bagian 6, perbaiki masalah, dan catat hasilnya di `verification.md` sebelum deployment.

## 4. Menjalankan di komputer sendiri
Dari folder proyek:
```bash
python3 -m http.server 5500 --bind 127.0.0.1
```
Buka `http://localhost:5500`. Hentikan dengan Ctrl+C. **Jangan** buka `index.html` langsung (`file://`) karena ES modules butuh dilayani lewat HTTP. Tidak perlu `npm install` atau build.

## 5. Aturan penulisan kode
- Indentasi 2 spasi, UTF-8, nama file huruf kecil. Kelas CSS dan ID HTML pakai kebab-case (`kartu-produk`).
- Variabel dan fungsi JavaScript pakai camelCase. Konstanta konfigurasi pakai UPPER_SNAKE_CASE.
- Pakai `const` secara default, `let` jika perlu diubah. Hindari `var`, variabel global yang tidak perlu, dan `onclick` langsung di HTML.
- Pakai ES modules dengan tugas jelas per file. Fungsi hitung harga dibuat sebagai fungsi murni.
- Pisahkan data, state, logika, dan tampilan. Jangan menghitung total dari teks harga di halaman.
- Format rupiah: `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })`.
- Tampilkan data dinamis dengan `textContent` atau DOM API. Jangan memasukkan input pengguna ke `innerHTML`.
- Tangani kegagalan localStorage dan input salah secara eksplisit. Jangan menulis nama, nomor, atau alamat ke console.
- Komentar menjelaskan *alasan*, bukan mengulang isi kode.
- Pakai gambar lokal dengan nama deskriptif. Catat sumber dan lisensi gambar.
- Jangan simpan token, rahasia, file `.env`, atau data pelanggan di repository.

## 6. Pemeriksaan sebelum rilis
| Skenario | Hasil yang diharapkan |
| --- | --- |
| Katalog dibuka pertama kali | Semua produk tampil, tanpa error console atau gambar hilang |
| Cari nama + pilih kategori | Hasil memenuhi keduanya; reset mengembalikan semua produk |
| Tambah produk yang sama dua kali | Satu baris dengan jumlah 2 |
| Jumlah 0, negatif, desimal, atau 100 | Ditolak dengan pesan jelas |
| 2 pensil Rp15.000 + 1 buku sketsa Rp45.000 | Total Rp75.000 |
| Keranjang kosong | Pengajuan ditolak dengan penjelasan |
| Pilih "Dikirim" tapi alamat kosong | Fokus ke kolom alamat dan ada pesan error |
| Pilih "Ambil di toko" | Alamat tidak diminta |
| Nama atau kontak tidak valid | Fokus ke kolom salah pertama |
| Muat ulang, JSON rusak, atau storage ditolak | Keranjang valid pulih atau aplikasi pulih dengan aman |
| Produk dihapus atau harga diubah di katalog | ID hilang diabaikan; harga terbaru dipakai |
| Nama berisi `<`, `&`, tanda kutip, atau baris baru | Tampil sebagai teks biasa dan URL tetap ter-encode |
| Nomor toko kosong | Tombol pesan nonaktif |
| WhatsApp dibuka | Draf pesan lengkap; pengguna masih harus menekan kirim |
| Keranjang diubah setelah ringkasan | Ringkasan harus diperiksa ulang |
| Lebar 360, 768, 1280 px dan zoom 200% | Konten terbaca, kontrol tidak terpotong |
| Hanya keyboard | Urutan fokus masuk akal dan semua aksi bisa dijalankan |

Periksa juga: tampilan di lebar 320 px, kontras warna, teks `alt` gambar, label formulir, dan reduced motion. Jika ada browser atau perangkat yang tidak tersedia, catat sebagai batasan.

Jika Node.js tersedia, cek sintaks tiap modul:
```bash
node --input-type=module --check < js/app.js
```
Ulangi untuk modul lain. Ini tidak menggantikan pengecekan alur di browser.

## 7. Deployment statis
Rencana hosting: Cloudflare Pages (cek langkah terbaru di situsnya saat akan dipakai). Tidak butuh backend, database, atau environment variable rahasia.

1. Pastikan data usaha benar, gambar berizin, nomor tujuan valid, dan semua pemeriksaan lulus.
2. Siapkan folder paket publik yang hanya berisi `index.html`, `css/`, `js/`, `assets/`. Jangan sertakan dokumen internal, `.git/`, atau data pribadi.
3. Jalankan server lokal dari folder paket dan cek semua tautan serta path gambar. Pakai path relatif.
4. Buat proyek hosting statis dan unggah paketnya (tanpa perintah build).
5. Buka URL HTTPS hasil hosting, lalu lakukan uji cepat: muat halaman, cari produk, tambah ke keranjang, cek total, buka draf WhatsApp **tanpa mengirim** pesan uji ke orang lain.
6. Jika pakai domain sendiri, atur DNS sesuai petunjuk penyedia, cek HTTPS, dan ulangi uji cepat.
7. Catat URL, tanggal rilis, versi/commit, paket yang diunggah, dan hasil pemeriksaan.

## 8. Rollback dan pemeliharaan
Simpan paket rilis sebelumnya. Jika rilis baru bermasalah, pakai fitur rollback penyedia atau unggah ulang paket lama, lalu cek alur utama. Jika domain berubah, localStorage lama tidak ikut pindah. Saat memperbarui katalog: jaga ID produk tetap stabil dan periksa harga. Jika bentuk data di localStorage berubah, naikkan versi skema dan sediakan reset atau migrasi yang aman.

## 9. Definition of Done
Pekerjaan dianggap selesai bila: fitur dan kriteria di `prd.md` terpenuhi, data usaha sudah dikonfirmasi, aksesibilitas dasar sudah dicek, console dan gambar bersih dari error, dan hasil uji tercatat di `verification.md`. Deployment dianggap selesai bila URL hosting bisa dibuka dan uji cepat lulus. Perbarui dokumen jika ada keputusan teknis atau aturan bisnis yang berubah.

## 10. Tips memakai Copilot
- Buka folder proyek di VS Code agar Copilot bisa membaca file `.md` ini.
- Minta satu langkah saja per permintaan. Contoh: "Kerjakan langkah 3 di instruction.md: buat js/data.js dengan 10 produk peralatan gambar."
- Setelah Copilot menulis kode, jalankan server lokal dan coba sendiri sebelum lanjut ke langkah berikutnya.
- Jika hasil menyimpang, ingatkan Copilot untuk mengikuti `arsitektur.md` dan aturan di bagian 5.
