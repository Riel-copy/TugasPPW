export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

export function isValidQuantity(quantity) {
  return Number.isInteger(quantity) && quantity >= MIN_QUANTITY && quantity <= MAX_QUANTITY;
}

export function addItem(items, productId) {
  const existing = items.find((item) => item.productId === productId);
  if (existing) {
    if (existing.quantity >= MAX_QUANTITY) throw new RangeError('Jumlah maksimum 99 barang per produk.');
    return items.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
  }
  return [...items, { productId, quantity: 1 }];
}

export function setItemQuantity(items, productId, quantity) {
  if (!isValidQuantity(quantity)) throw new RangeError('Jumlah harus berupa bilangan bulat 1–99.');
  return items.map((item) => item.productId === productId ? { ...item, quantity } : item);
}

export function removeItem(items, productId) {
  return items.filter((item) => item.productId !== productId);
}

export function calculateTotal(items, products) {
  const productById = new Map(products.map((product) => [product.id, product]));
  return items.reduce((total, item) => {
    const product = productById.get(item.productId);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}