# Panduan UI/UX — Goresan Store

> UI = tampilan. UX = kenyamanan saat memakai.

## 1. Arah desain
Tampilan bersih, hangat, dan kreatif, seperti studio seni yang rapi. Fokus utama: menemukan alat gambar, memahami harga, dan menyusun pesanan dengan mudah. Semua teks (termasuk pesan error) memakai bahasa Indonesia. Nama merek sementara: **Goresan Store**.

## 2. Token visual awal
> Token = nilai tetap (warna, ukuran) yang dipakai berulang agar tampilan konsisten.

| Elemen | Nilai |
| --- | --- |
| Latar utama | `#FBF9F5` |
| Permukaan kartu | `#FFFFFF` |
| Teks utama | `#1F1B2D` |
| Teks sekunder | `#4B4659` |
| Warna utama (tombol) | `#2F3E8F`, teks putih |
| Aksen dekoratif | `#F2B134`, teks gelap jika jadi latar |
| Kesalahan | `#B42318`, selalu disertai teks |
| Font | `system-ui, sans-serif` |
| Teks dasar | 16 px, line-height 1,5–1,6 |
| Radius | Kartu 16 px, input dan tombol 10 px |
| Spasi | Kelipatan 4/8 px; jarak antarbagian 48–80 px |
| Lebar konten | Maksimum 1200 px, padding sisi minimal 16 px |

Warna boleh diganti sesuai selera, tetapi cek kontras (teks mudah dibaca) pada hasil akhir, termasuk saat hover, fokus, dan tombol nonaktif. Warna aksen tidak dipakai sebagai teks kecil di atas latar putih.

## 3. Susunan halaman
Header → hero → katalog → keranjang dan formulir → cara pesan → retur/FAQ → kontak dan footer.
- Desktop: keranjang boleh berada di kolom kanan katalog.
- Ponsel: keranjang di bawah katalog, dengan tombol "Keranjang" di header yang menampilkan jumlah unit.
- Jangan pakai modal (jendela pop-up) di MVP agar keyboard lebih mudah.

## 4. Perjalanan pengguna
| Tahap | Tujuan pengguna | Respons tampilan |
| --- | --- | --- |
| Mengenal | Memastikan toko sesuai | Judul, keterangan toko, tombol "Lihat produk" |
| Menemukan | Memilih alat | Pencarian, filter, gambar, ukuran, harga |
| Menyusun | Mengatur isi pesanan | Tombol tambah, jumlah, hapus, penanda jumlah di keranjang |
| Menghitung | Tahu perkiraan biaya | Rincian subtotal dan total |
| Memeriksa | Menghindari salah pesan | Ringkasan barang, kontak, cara terima |
| Menghubungi | Minta konfirmasi penjual | Tombol "Pesan via WhatsApp" + keterangan bahwa pengguna perlu menekan kirim |

## 5. Wireframe
### Desktop
```text
┌──────────────────────────────────────────────────────────┐
│ Goresan Store       Katalog  Cara pesan  FAQ  Kontak      │
├──────────────────────────────────────────────────────────┤
│ Mulai berkarya dengan alat yang tepat.   Gambar hero      │
│ [Lihat produk]                                            │
├────────────────────────────────────┬─────────────────────┤
│ Katalog                            │ Keranjang (3 unit)  │
│ [Cari alat gambar...]              │ Barang / jumlah     │
│ [Semua] [Pensil] [Kertas] [Cat]... │ Total estimasi      │
│ [Kartu]  [Kartu]  [Kartu]           │ Ambil / Kirim       │
│ [Kartu]  [Kartu]  [Kartu]           │ Nama / WhatsApp     │
│                                    │ [Periksa pesanan]   │
├────────────────────────────────────┴─────────────────────┤
│ Cara pesan → Retur dan FAQ → Kontak → Footer              │
└──────────────────────────────────────────────────────────┘
```
### Ponsel
```text
┌────────────────────────────┐
│ Goresan Store [Keranjang]  │
│ Judul dan deskripsi        │
│ [Lihat produk]             │
│ [Cari alat gambar...]      │
│ [Kategori ▼]               │
│ [Kartu produk]             │
│ [Kartu produk]             │
│ Keranjang dan jumlah       │
│ Total estimasi             │
│ Formulir dan ringkasan     │
│ [Pesan via WhatsApp]       │
│ Cara pesan / FAQ / kontak  │
└────────────────────────────┘
```

## 6. Komponen dan keadaannya
- **Navigasi:** tautan anchor, fokus terlihat, ada "skip link" (lompat ke konten utama).
- **Kartu produk:** gambar rasio tetap, nama, merek, ukuran/isi, harga "Rp15.000 / pcs", tombol "Tambah". Tidak boleh menampilkan klaim "stok tersedia".
- **Pencarian dan filter:** ada label jelas, jumlah hasil, kategori aktif terlihat jelas, dan tombol reset saat hasil kosong.
- **Kontrol jumlah:** tombol kurang dan tambah, plus input angka berlabel nama barang; minimum 1, maksimum 99. Hapus lewat tombol "Hapus".
- **Cara terima:** pilihan "Ambil di toko" atau "Dikirim". Kolom alamat hanya muncul dan wajib jika "Dikirim".
- **Ringkasan:** nama barang, jumlah, harga satuan, subtotal, total estimasi, dan catatan "Ongkir dikonfirmasi penjual".
- **Formulir kontak:**
  - Nama 2–80 karakter setelah trim.
  - Nomor WhatsApp 8–15 digit. Spasi, tanda hubung, kurung, dan `+` di awal dibersihkan. Terima awalan `08` maupun `62`. Jangan mengklaim bahwa nomor pasti terdaftar.
  - Alamat (jika dikirim) 10–200 karakter.
- **Pemeriksaan pesanan:** ringkasan tampil di halaman dengan tombol "Ubah pesanan" dan "Pesan via WhatsApp". Jika keranjang atau isian berubah, pengguna harus memeriksa ulang.
- **Pemberitahuan:** pakai area status untuk info "barang ditambahkan" atau "gagal menyimpan"; jangan merebut fokus.
- **FAQ:** pakai elemen `details` dan `summary` bawaan HTML.

## 7. Contoh teks (microcopy)
- Keranjang kosong: "Belum ada barang. Pilih alat gambar untuk memulai."
- Hasil kosong: "Produk tidak ditemukan. Coba kata lain atau reset filter."
- Alamat kosong: "Alamat pengiriman wajib diisi jika memilih dikirim."
- Gagal menyimpan: "Keranjang tetap bisa dipakai, tetapi belum bisa disimpan di browser ini."
- Sebelum WhatsApp: "Nama, nomor, dan rincian pesanan akan dibuka di WhatsApp. Kirim pesan untuk meminta konfirmasi stok dan ongkir. Total ini hanya estimasi harga barang."
- Belum dikonfigurasi: "Pemesanan online belum tersedia. Silakan gunakan kontak toko yang tercantum." Hanya tampilkan kontak yang benar-benar sudah ada.

## 8. Aksesibilitas
Targetnya mengikuti prinsip WCAG 2.2 tingkat AA. Jangan mengklaim "sudah sesuai" sebelum diperiksa.
- Pakai `lang="id"`, elemen semantik (`header`, `main`, `footer`), satu `h1`, urutan judul logis.
- Semua fungsi bisa dipakai dengan keyboard. Jangan membuat tombol dari `div`.
- Setiap input punya `label`. Error dihubungkan dengan `aria-describedby` dan `aria-invalid`.
- Jika validasi gagal, fokus pindah ke kolom salah pertama. Pembaruan keranjang memakai `aria-live="polite"`.
- Kontras teks biasa minimal 4,5:1, teks besar 3:1, kontrol dan indikator fokus minimal 3:1.
- Target sentuh minimal 44 × 44 px, fokus tidak tertutup elemen sticky.
- Informasi tidak boleh hanya mengandalkan warna atau hover.
- Gambar informatif punya `alt`; gambar hiasan memakai `alt=""`.
- Mendukung zoom 200% dan lebar 320 px tanpa konten terpotong.
- Hormati `prefers-reduced-motion`; animasi tidak boleh jadi syarat memakai website.

## 9. Validasi pengalaman
Coba skenario: tambah beberapa alat, ubah jumlah, pilih "Dikirim" tanpa alamat, perbaiki, cek total, lalu buka WhatsApp. Ulangi dengan keyboard dan layar kecil. Catat kesulitan dari 5 calon pengguna dan perbaiki yang utama sebelum rilis.
