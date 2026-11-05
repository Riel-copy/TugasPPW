export const CART_STORAGE_KEY = 'goresan-store:cart:v1';
const SCHEMA_VERSION = 1;

export function loadCart(products) {
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return { items: [], available: true };
    const parsed = JSON.parse(saved);
    if (parsed?.schemaVersion !== SCHEMA_VERSION || !Array.isArray(parsed.items)) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return { items: [], available: true };
    }
    const knownIds = new Set(products.map((product) => product.id));
    const items = parsed.items.filter((item) => (
      item && typeof item.productId === 'string' && knownIds.has(item.productId)
      && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 99
    ));
    return { items, available: true };
  } catch {
    return { items: [], available: false };
  }
}

export function saveCart(items) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ schemaVersion: SCHEMA_VERSION, items }));
    return true;
  } catch {
    return false;
  }
}