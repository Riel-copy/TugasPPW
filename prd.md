# Product Requirement Document — Goresan Store

Status: **Rencana. Website belum dibuat.** Nama "Goresan Store", harga contoh, alamat toko, dan nomor WhatsApp hanyalah asumsi. Semuanya harus diganti dengan data usaha yang asli sebelum website diluncurkan.

> Catatan sederhana: PRD (Product Requirement Document) adalah dokumen yang menjelaskan *website ini untuk apa* dan *harus bisa melakukan apa*.

## 1. Visi produk
Membantu pelajar, mahasiswa, dan seniman menemukan peralatan gambar yang cocok dengan kebutuhan dan anggaran mereka, lewat website berbahasa Indonesia yang ringan dan nyaman dibuka di ponsel.

## 2. Masalah yang ingin diselesaikan
- Pembeli sulit membandingkan peralatan gambar (jenis, ukuran, merek, harga) tanpa bertanya satu per satu.
- Pesanan lewat chat sering kurang lengkap (jumlah barang atau alamat tidak jelas).
- Pembeli tidak tahu perkiraan total harga sebelum menghubungi penjual.
- Penjual butuh pesanan yang rapi supaya cepat dicek stoknya dan dibalas.

## 3. Target pengguna
| Pengguna | Kebutuhan utama |
| --- | --- |
| Pelajar dan mahasiswa (tugas seni, arsitektur, desain) | Melihat fungsi, ukuran, dan harga dengan jelas |
| Seniman dan ilustrator | Mencari bahan tertentu (kuas, cat, kertas) dengan cepat |
| Pemula yang baru belajar menggambar | Memahami alat mana yang cocok untuk mulai |
| Pemilik toko | Menerima ringkasan pesanan untuk cek stok dan ongkir |

## 4. Ruang lingkup MVP
> MVP (Minimum Viable Product) = versi paling sederhana yang sudah berguna.

1. Beranda: penjelasan toko, tombol ke katalog, cara memesan, dan kontak.
2. Katalog produk: nama, kategori, merek, deskripsi, ukuran/isi, gambar lokal, dan harga satuan.
3. Pencarian berdasarkan nama dan filter kategori: **pensil & arang**, **kertas & buku sketsa**, **cat & tinta**, **kuas & alat lukis**, **aksesori & penyangga** (penghapus, rautan, easel, penggaris, dll).
4. Keranjang: tambah barang, ubah jumlah, hapus barang, tampil subtotal.
5. Formulir pemesan: nama, nomor WhatsApp, pilihan **ambil di toko** atau **dikirim**, dan alamat (hanya jika dikirim).
6. Ringkasan pesanan yang bisa diperiksa sebelum membuka WhatsApp toko.
7. Keranjang disimpan di browser (localStorage) dan bisa pulih dengan aman bila datanya rusak.
8. Informasi cara pesan, kebijakan retur/tukar, FAQ, dan pemberitahuan bahwa stok serta ongkir dikonfirmasi penjual.
9. Tampilan responsif dan bisa dipakai hanya dengan keyboard.

### Di luar MVP (tidak dikerjakan dulu)
Akun pengguna, panel admin, stok real-time, pembayaran online, hitung ongkir otomatis, unggah identitas, ulasan pelanggan, database pesanan. Penjual mengubah katalog lewat berkas sumber (`js/data.js`).

## 5. Aturan bisnis
- Mata uang rupiah (IDR). Harga disimpan sebagai **bilangan bulat** (contoh `15000`) dan ditampilkan dengan format Indonesia (Rp15.000).
- Jumlah per barang: 1 sampai 99. Batas ini bukan informasi stok.
- Subtotal barang = harga satuan × jumlah. Total barang = jumlah semua subtotal.
- Tidak ada tanggal atau durasi (ini toko jual beli, bukan sewa).
- **Ongkos kirim tidak dihitung website.** Penjual menyebutkan ongkir setelah menerima pesanan.
- Total di website adalah **estimasi harga barang**. Stok, ongkir, dan biaya lain dikonfirmasi penjual.
- Mengirim pesan WhatsApp **bukan** pesanan yang pasti. Pesanan baru sah setelah penjual mengecek stok dan kedua pihak sepakat (termasuk pembayaran, dilakukan manual).
- Pengguna harus menekan tombol kirim sendiri di WhatsApp. Website tidak bisa tahu pesan terkirim atau tidak.

## 6. Alur utama
Buka beranda → lihat katalog → cari/filter → tambah barang → atur jumlah → pilih ambil/kirim → isi nama dan nomor → periksa ringkasan → buka WhatsApp → kirim pesan → penjual konfirmasi stok, ongkir, dan pembayaran.

## 7. Kriteria penerimaan
> Kriteria penerimaan = daftar syarat supaya sebuah fitur dianggap "sudah benar".

- Pencarian dan filter bisa dipakai bersamaan. Jika hasil kosong, tampil pesan dan tombol reset.
- Barang dengan ID sama digabung dalam satu baris keranjang.
- Keranjang kosong tidak bisa diajukan. Jumlah tidak valid ditolak dengan pesan jelas.
- Contoh hitung: 2 pensil @ Rp15.000 + 1 buku sketsa @ Rp45.000 = **Rp75.000**.
- Jika pilih "dikirim", alamat wajib diisi. Jika "ambil di toko", alamat tidak diminta.
- Pesan WhatsApp berisi: nama, kontak, cara terima, alamat (jika kirim), daftar barang dan jumlah, rincian harga, total estimasi, dan permintaan konfirmasi stok serta ongkir.
- Jika nomor toko belum diisi, tombol WhatsApp nonaktif.
- Muat ulang halaman memulihkan keranjang yang valid. Jika localStorage gagal, katalog tetap bisa dipakai.
- Pada lebar 360 px tidak ada gulir horizontal, dan semua kontrol utama bisa dipakai dengan keyboard.

## 8. Metrik keberhasilan
Ini target awal, bukan hasil yang sudah diukur.

| Metrik | Target awal | Cara ukur |
| --- | --- | --- |
| Keberhasilan tugas | Minimal 4 dari 5 orang bisa menyusun pesanan tanpa bantuan | Uji coba ke calon pengguna |
| Waktu menyusun pesanan | Median 3 menit atau kurang | Uji dari katalog sampai ringkasan |
| Kelengkapan pesanan | Minimal 90% pesan berisi barang, jumlah, dan kontak | Catatan manual penjual 30 hari |
| Akurasi hitungan | 100% skenario hitung lulus | Uji kasus hitung sebelum rilis |
| Nyaman di ponsel | Alur utama berhasil di lebar 360, 768, 1280 px | Pemeriksaan responsif |

Website tidak memasang analitik atau pelacak.

## 9. Risiko dan ketergantungan
- Katalog bisa tidak sama dengan stok asli → tampilkan penjelasan konfirmasi manual.
- WhatsApp bergantung pada layanan pihak lain dan perangkat pengguna.
- Penjual harus menyediakan: foto produk asli (atau berizin), nomor WhatsApp, alamat, jam buka, daftar harga, dan kebijakan retur/tukar sebelum rilis.
