import { calculateTotal } from './cart.js';

const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

export function normalizePhone(value) {
  if (/[^\d\s()+-]/.test(value)) return '';
  return value.replace(/[\s()+-]/g, '');
}

export function validateOrder({ name, phone, delivery, address, items }) {
  const cleanName = name.trim();
  const cleanPhone = normalizePhone(phone);
  const cleanAddress = address.trim();
  const errors = {};
  if (items.length === 0) errors.cart = 'Keranjang masih kosong. Pilih produk sebelum memeriksa pesanan.';
  if (cleanName.length < 2 || cleanName.length > 80) errors.name = 'Nama harus terdiri dari 2–80 karakter.';
  if (!/^\d{8,15}$/.test(cleanPhone)) errors.phone = 'Masukkan nomor dengan 8–15 digit, misalnya 08... atau 62...';
  if (delivery === 'delivery' && (cleanAddress.length < 10 || cleanAddress.length > 200)) {
    errors.address = 'Alamat pengiriman wajib diisi, 10–200 karakter.';
  }
  return { valid: Object.keys(errors).length === 0, errors, values: { name: cleanName, phone: cleanPhone, address: cleanAddress } };
}

export function formatCurrency(amount) {
  return currency.format(amount);
}

export function createWhatsAppUrl({ storeNumber, values, delivery, items, products }) {
  let recipient = storeNumber.replace(/\D/g, '');
  if (recipient.startsWith('0')) recipient = `62${recipient.slice(1)}`;
  if (!/^\d{8,15}$/.test(recipient)) return '';
  const productById = new Map(products.map((product) => [product.id, product]));
  const lines = [
    'Halo, saya ingin menanyakan pesanan di Goresan Store.',
    '',
    `Nama: ${values.name}`,
    `Nomor WhatsApp: ${values.phone}`,
    `Cara menerima: ${delivery === 'delivery' ? 'Dikirim' : 'Ambil di toko'}`
  ];
  if (delivery === 'delivery') lines.push(`Alamat: ${values.address}`);
  lines.push('', 'Rincian barang:');
  for (const item of items) {
    const product = productById.get(item.productId);
    if (product) lines.push(`- ${product.name} (${item.quantity} x ${formatCurrency(product.price)}) = ${formatCurrency(product.price * item.quantity)}`);
  }
  lines.push('', `Estimasi harga barang: ${formatCurrency(calculateTotal(items, products))}`, 'Mohon konfirmasi stok, ongkir, dan biaya lainnya. Terima kasih.');
  return `https://wa.me/${recipient}?text=${encodeURIComponent(lines.join('\n'))}`;
}