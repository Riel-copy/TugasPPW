# Catatan Verifikasi — Goresan Store

Tanggal pemeriksaan: _belum ada_
Status: **Belum ada implementasi, belum ada pemeriksaan.** Isi dokumen ini setelah website dibuat dan diuji. Jangan tulis "lulus" untuk sesuatu yang belum benar-benar dicoba.

Cara mengisi kolom Status: `Belum`, `Lulus`, atau `Gagal` (tulis alasan di Catatan).

## 1. Pemeriksaan fungsi
| No | Skenario | Status | Catatan |
| --- | --- | --- | --- |
| 1 | Katalog menampilkan semua produk tanpa error console | Belum | |
| 2 | Pencarian + filter kategori bekerja bersamaan; reset berfungsi | Belum | |
| 3 | Produk yang sama ditambah dua kali → satu baris, jumlah 2 | Belum | |
| 4 | Jumlah 0, negatif, desimal, atau 100 ditolak | Belum | |
| 5 | 2 pensil Rp15.000 + 1 buku sketsa Rp45.000 = Rp75.000 | Belum | |
| 6 | Keranjang kosong tidak bisa diajukan | Belum | |
| 7 | "Dikirim" tanpa alamat ditolak; "Ambil di toko" tidak minta alamat | Belum | |
| 8 | Nama dan nomor tidak valid ditolak, fokus ke kolom pertama yang salah | Belum | |
| 9 | Muat ulang memulihkan keranjang; JSON rusak dan storage ditolak tidak membuat crash | Belum | |
| 10 | Nama berisi `<`, `&`, tanda kutip tampil sebagai teks; URL ter-encode | Belum | |
| 11 | Nomor toko kosong → tombol WhatsApp nonaktif | Belum | |
| 12 | Perubahan keranjang setelah ringkasan → harus diperiksa ulang | Belum | |
| 13 | Draf WhatsApp lengkap, dan pengguna masih harus menekan kirim | Belum | |

## 2. Pemeriksaan tampilan dan aksesibilitas
| No | Skenario | Status | Catatan |
| --- | --- | --- | --- |
| 1 | Tidak ada gulir horizontal di lebar 320, 360, 768, 1280 px | Belum | |
| 2 | Zoom 200% tetap terbaca | Belum | |
| 3 | Semua aksi bisa dilakukan hanya dengan keyboard | Belum | |
| 4 | Kontras warna memenuhi target (4,5:1 teks biasa) | Belum | |
| 5 | Semua gambar punya `alt` yang tepat | Belum | |
| 6 | Semua input punya label | Belum | |
| 7 | `prefers-reduced-motion` dihormati | Belum | |

## 3. Pemeriksaan teknis
| No | Skenario | Status | Catatan |
| --- | --- | --- | --- |
| 1 | Sintaks semua modul JavaScript lolos `node --check` | Belum | |
| 2 | Pengujian otomatis (jika dibuat) lulus | Belum | |
| 3 | Semua gambar berhasil dimuat (HTTP 200) | Belum | |
| 4 | Paket publik tidak memuat dokumen internal atau data pribadi | Belum | |

## 4. Batas verifikasi dan kesiapan rilis
Isi bagian ini dengan jujur setelah pemeriksaan. Hal yang biasanya masih perlu dicatat:
- Browser atau perangkat yang belum diuji (Safari, Firefox, HP asli).
- Uji coba ke 5 calon pengguna belum dilakukan.
- Data usaha asli (nomor WhatsApp, alamat, jam buka, kebijakan retur, harga) belum diisi.
- Gambar produk masih contoh atau belum berizin.
- Belum ada URL hosting.

## 5. Catatan rilis
| Item | Isi |
| --- | --- |
| URL | |
| Tanggal rilis | |
| Versi/commit | |
| Paket yang diunggah | |
| Hasil uji cepat setelah rilis | |
