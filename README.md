# Goresan Store

Website toko peralatan gambar memakai HTML, CSS, dan JavaScript murni, tanpa proses build dan tanpa dependensi saat berjalan.

> **Status: dalam perencanaan.** Dokumen sudah siap, kode website belum dibuat. Ikuti `instruction.md` untuk mengerjakannya (misalnya dengan bantuan GitHub Copilot).

## Rencana isi proyek

- Minimal 10 produk contoh dari 5 kategori: pensil & arang, kertas & buku sketsa, cat & tinta, kuas & alat lukis, aksesori & penyangga.
- Pencarian dan filter kategori yang bisa digabung.
- Keranjang yang tersimpan di browser (jumlah 1–99) dan estimasi total harga.
- Formulir pemesan (nama, nomor WhatsApp, ambil di toko atau dikirim), ringkasan pesanan, dan draf pesan WhatsApp.
- Panduan cara pesan, FAQ, tampilan responsif, dan dukungan keyboard.

Nama, harga, dan spesifikasi adalah data contoh. Stok dan ongkir dikonfirmasi manual oleh penjual. Tidak ada akun, backend, database, pembayaran online, atau pesanan otomatis.

## Menjalankan (setelah kode dibuat)

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Buka http://localhost:5500. Jangan buka lewat `file://` karena aplikasi memakai ES modules.

## Konfigurasi usaha

Edit `js/config.js` untuk mengisi nomor WhatsApp internasional (digit saja), alamat, dan jam buka yang asli. Nomor kosong membuat tombol WhatsApp nonaktif. Jangan memasukkan nomor contoh sebagai tujuan aktif. Ubah katalog di `js/data.js` dan nama merek di HTML sebelum peluncuran.

Nama, kontak, dan alamat pemesan tidak disimpan di localStorage. Saat WhatsApp dibuka, data tersebut masuk ke URL layanan WhatsApp; pengguna tetap harus menekan kirim sendiri.

## Daftar dokumen

| Dokumen | Isi |
| --- | --- |
| [prd.md](prd.md) | Kebutuhan dan aturan bisnis |
| [tech_stack.md](tech_stack.md) | Teknologi yang dipakai |
| [arsitektur.md](arsitektur.md) | Struktur file, data, dan alur kerja |
| [ui.ux.md](ui.ux.md) | Desain dan aksesibilitas |
| [instruction.md](instruction.md) | Langkah pengerjaan, aturan kode, deployment |
| [verification.md](verification.md) | Catatan hasil pemeriksaan |
