import { STORE_CONFIG } from './config.js';
import { CATEGORIES, PRODUCTS } from './data.js';
import { addItem, calculateTotal, removeItem, setItemQuantity } from './cart.js';
import { createWhatsAppUrl, formatCurrency, validateOrder } from './checkout.js';
import { loadCart, saveCart } from './storage.js';

const elements = {
  productGrid: document.querySelector('#product-grid'),
  search: document.querySelector('#search-input'),
  filter: document.querySelector('#category-filter'),
  resultCount: document.querySelector('#result-count'),
  emptyResults: document.querySelector('#empty-results'),
  cartItems: document.querySelector('#cart-items'),
  cartEmpty: document.querySelector('#cart-empty'),
  cartCount: document.querySelector('#cart-count'),
  cartHeadingCount: document.querySelector('#cart-heading-count'),
  cartTotal: document.querySelector('#cart-total'),
  checkoutForm: document.querySelector('#checkout-form'),
  checkoutMessage: document.querySelector('#checkout-message'),
  addressField: document.querySelector('#address-field'),
  address: document.querySelector('#customer-address'),
  review: document.querySelector('#order-review'),
  reviewContent: document.querySelector('#review-content'),
  whatsappButton: document.querySelector('#whatsapp-button'),
  whatsappNote: document.querySelector('#whatsapp-note'),
  appStatus: document.querySelector('#app-status')
};

const money = formatCurrency;
const restored = loadCart(PRODUCTS);
let cartItems = restored.items;
let reviewedOrder = null;
let storageWarningShown = !restored.available;

for (const category of CATEGORIES) {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  elements.filter.append(option);
}

function productById(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}

function announce(message) {
  elements.appStatus.textContent = message;
}

function invalidateReview() {
  reviewedOrder = null;
  elements.review.hidden = true;
  elements.whatsappButton.disabled = true;
}

function persistCart() {
  const saved = saveCart(cartItems);
  if (!saved && !storageWarningShown) {
    announce('Keranjang tetap bisa dipakai, tetapi belum bisa disimpan di browser ini.');
    storageWarningShown = true;
  }
}

function renderProducts() {
  const query = elements.search.value.trim().toLocaleLowerCase('id-ID');
  const category = elements.filter.value;
  const visible = PRODUCTS.filter((product) => {
    const searchable = `${product.name} ${product.brand} ${product.description} ${product.specification}`.toLocaleLowerCase('id-ID');
    return searchable.includes(query) && (!category || product.category === category);
  });
  elements.productGrid.replaceChildren();
  for (const product of visible) {
    const card = document.createElement('article');
    card.className = 'product-card';
    const imageWrap = document.createElement('div');
    imageWrap.className = 'product-card__image';
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.imageAlt;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      image.alt = `${product.imageAlt} (gambar tidak dapat dimuat)`;
      imageWrap.classList.add('image-error');
    }, { once: true });
    imageWrap.append(image);

    const body = document.createElement('div');
    body.className = 'product-card__body';
    const categoryLabel = document.createElement('p');
    categoryLabel.className = 'product-card__category';
    categoryLabel.textContent = product.category;
    const title = document.createElement('h3');
    title.textContent = product.name;
    const brand = document.createElement('p');
    brand.className = 'product-card__brand';
    brand.textContent = [product.brand, product.specification].filter(Boolean).join(' · ');
    brand.hidden = !brand.textContent;
    const description = document.createElement('p');
    description.className = 'product-card__description';
    description.textContent = product.description;
    const bottom = document.createElement('div');
    bottom.className = 'product-card__bottom';
    const price = document.createElement('strong');
    price.className = 'product-card__price';
    price.append(document.createTextNode(money(product.price)));
    const unit = document.createElement('span');
    unit.className = 'product-card__unit';
    unit.textContent = 'per satuan';
    price.append(unit);
    const addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.type = 'button';
    addButton.dataset.productId = product.id;
    addButton.setAttribute('aria-label', `Tambah ${product.name} ke keranjang`);
    addButton.textContent = '+';
    bottom.append(price, addButton);
    body.append(categoryLabel, title, brand, description, bottom);
    card.append(imageWrap, body);
    elements.productGrid.append(card);
  }
  elements.resultCount.textContent = `${visible.length} produk`;
  elements.emptyResults.hidden = visible.length !== 0;
  elements.productGrid.hidden = visible.length === 0;
}

function renderCart() {
  elements.cartItems.replaceChildren();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCount.textContent = String(itemCount);
  elements.cartCount.setAttribute('aria-label', `${itemCount} barang`);
  elements.cartHeadingCount.textContent = `(${itemCount})`;
  elements.cartEmpty.hidden = cartItems.length !== 0;
  for (const item of cartItems) {
    const product = productById(item.productId);
    if (!product) continue;
    const row = document.createElement('div');
    row.className = 'cart-item';
    const details = document.createElement('div');
    const name = document.createElement('p');
    name.className = 'cart-item__name';
    name.textContent = product.name;
    const price = document.createElement('span');
    price.className = 'cart-item__price';
    price.textContent = `${money(product.price)} / satuan`;
    details.append(name, price);
    const subtotal = document.createElement('p');
    subtotal.className = 'cart-item__subtotal';
    subtotal.textContent = money(product.price * item.quantity);
    const controls = document.createElement('div');
    controls.className = 'cart-item__controls';
    const decrease = document.createElement('button');
    decrease.type = 'button';
    decrease.className = 'quantity-button';
    decrease.dataset.action = 'decrease';
    decrease.dataset.productId = product.id;
    decrease.setAttribute('aria-label', `Kurangi ${product.name}`);
    decrease.textContent = '−';
    const quantity = document.createElement('input');
    quantity.className = 'quantity-input';
    quantity.type = 'number';
    quantity.min = '1';
    quantity.max = '99';
    quantity.step = '1';
    quantity.value = String(item.quantity);
    quantity.dataset.action = 'quantity';
    quantity.dataset.productId = product.id;
    quantity.setAttribute('aria-label', `Jumlah ${product.name}`);
    const increase = document.createElement('button');
    increase.type = 'button';
    increase.className = 'quantity-button';
    increase.dataset.action = 'increase';
    increase.dataset.productId = product.id;
    increase.setAttribute('aria-label', `Tambah ${product.name}`);
    increase.textContent = '+';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-button';
    remove.dataset.action = 'remove';
    remove.dataset.productId = product.id;
    remove.textContent = 'Hapus';
    controls.append(decrease, quantity, increase, remove);
    row.append(details, subtotal, controls);
    elements.cartItems.append(row);
  }
  elements.cartTotal.textContent = money(calculateTotal(cartItems, PRODUCTS));
}

function updateCart(nextItems, status) {
  cartItems = nextItems;
  persistCart();
  invalidateReview();
  renderCart();
  announce(status);
}

function getFormValues() {
  return {
    name: document.querySelector('#customer-name').value,
    phone: document.querySelector('#customer-phone').value,
    delivery: document.querySelector('input[name="delivery"]:checked').value,
    address: elements.address.value
  };
}

function clearFieldErrors() {
  for (const field of ['name', 'phone', 'address']) {
    const input = document.querySelector(`#customer-${field}`);
    const error = document.querySelector(`#${field}-error`);
    input.removeAttribute('aria-invalid');
    error.textContent = '';
  }
}

function showReview(validation) {
  clearFieldErrors();
  elements.checkoutMessage.textContent = '';
  if (!validation.valid) {
    const firstInvalid = ['name', 'phone', 'address'].find((field) => validation.errors[field]);
    if (firstInvalid) {
      const input = document.querySelector(`#customer-${firstInvalid}`);
      input.setAttribute('aria-invalid', 'true');
      document.querySelector(`#${firstInvalid}-error`).textContent = validation.errors[firstInvalid];
      input.focus();
    }
    if (validation.errors.cart) {
      elements.checkoutMessage.textContent = validation.errors.cart;
      if (!firstInvalid) document.querySelector('#catalog-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return;
  }

  const formValues = validation.values;
  const delivery = document.querySelector('input[name="delivery"]:checked').value;
  const snapshot = JSON.stringify({ items: cartItems, formValues, delivery });
  reviewedOrder = { snapshot, values: formValues, delivery };
  const fragment = document.createDocumentFragment();
  const customer = document.createElement('p');
  customer.textContent = `${formValues.name} · ${formValues.phone}`;
  fragment.append(customer);
  const mode = document.createElement('p');
  mode.textContent = delivery === 'delivery' ? `Dikirim ke: ${formValues.address}` : 'Ambil di toko';
  fragment.append(mode);
  for (const item of cartItems) {
    const product = productById(item.productId);
    if (!product) continue;
    const line = document.createElement('p');
    line.className = 'review-line';
    const itemText = document.createElement('span');
    itemText.textContent = `${product.name} × ${item.quantity}`;
    const itemTotal = document.createElement('strong');
    itemTotal.textContent = money(product.price * item.quantity);
    line.append(itemText, itemTotal);
    fragment.append(line);
  }
  const total = document.createElement('p');
  total.className = 'review-line';
  const totalLabel = document.createElement('strong');
  totalLabel.textContent = 'Estimasi harga barang';
  const totalAmount = document.createElement('strong');
  totalAmount.textContent = money(calculateTotal(cartItems, PRODUCTS));
  total.append(totalLabel, totalAmount);
  fragment.append(total);
  elements.reviewContent.replaceChildren(fragment);
  elements.review.hidden = false;
  const canOrder = /^\d{8,15}$/.test(STORE_CONFIG.WHATSAPP_NUMBER);
  elements.whatsappButton.disabled = !canOrder;
  elements.whatsappNote.textContent = canOrder
    ? 'Stok dan ongkir akan dikonfirmasi penjual.'
    : 'Pemesanan online belum tersedia sampai nomor WhatsApp toko resmi dikonfigurasi.';
  elements.review.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

elements.productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product-id]');
  if (!button) return;
  try {
    updateCart(addItem(cartItems, button.dataset.productId), `${productById(button.dataset.productId).name} ditambahkan ke keranjang.`);
  } catch (error) {
    announce(error.message);
  }
});

elements.cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const item = cartItems.find((entry) => entry.productId === button.dataset.productId);
  if (!item) return;
  if (button.dataset.action === 'remove') {
    updateCart(removeItem(cartItems, item.productId), `${productById(item.productId).name} dihapus dari keranjang.`);
  } else {
    const quantity = item.quantity + (button.dataset.action === 'increase' ? 1 : -1);
    try {
      updateCart(setItemQuantity(cartItems, item.productId, quantity), 'Jumlah keranjang diperbarui.');
    } catch (error) {
      announce(error.message);
    }
  }
});

elements.cartItems.addEventListener('change', (event) => {
  const input = event.target.closest('input[data-action="quantity"]');
  if (!input) return;
  const quantity = Number(input.value);
  try {
    updateCart(setItemQuantity(cartItems, input.dataset.productId, quantity), 'Jumlah keranjang diperbarui.');
  } catch (error) {
    announce(error.message);
    renderCart();
  }
});

elements.search.addEventListener('input', renderProducts);
elements.filter.addEventListener('change', renderProducts);
document.querySelector('#reset-filters').addEventListener('click', () => {
  elements.search.value = '';
  elements.filter.value = '';
  renderProducts();
  elements.search.focus();
});

document.querySelectorAll('input[name="delivery"]').forEach((input) => {
  input.addEventListener('change', () => {
    elements.addressField.hidden = input.value !== 'delivery';
    elements.address.required = input.value === 'delivery';
    invalidateReview();
  });
});

elements.checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showReview(validateOrder({ ...getFormValues(), items: cartItems }));
});

for (const input of elements.checkoutForm.querySelectorAll('input, textarea')) {
  input.addEventListener('input', invalidateReview);
}

document.querySelector('#edit-order').addEventListener('click', () => {
  invalidateReview();
  document.querySelector('#customer-name').focus();
});

elements.whatsappButton.addEventListener('click', () => {
  if (!reviewedOrder) return;
  const currentValidation = validateOrder({ ...getFormValues(), items: cartItems });
  const currentSnapshot = JSON.stringify({ items: cartItems, formValues: currentValidation.values, delivery: reviewedOrder.delivery });
  if (!currentValidation.valid || currentSnapshot !== reviewedOrder.snapshot) {
    invalidateReview();
    announce('Pesanan berubah. Periksa ringkasan kembali sebelum membuka WhatsApp.');
    return;
  }
  const url = createWhatsAppUrl({
    storeNumber: STORE_CONFIG.WHATSAPP_NUMBER,
    values: reviewedOrder.values,
    delivery: reviewedOrder.delivery,
    items: cartItems,
    products: PRODUCTS
  });
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
});

document.querySelector('#current-year').textContent = String(new Date().getFullYear());
elements.whatsappNote.textContent = 'Pemesanan online belum tersedia sampai nomor WhatsApp toko resmi dikonfigurasi.';
renderProducts();
renderCart();