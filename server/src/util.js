/**
 * Function intended to be given to array Array.prototype.filter
 *
 * @param {Product} product Product to check category of
 * @param {string} category Category to check against
 * @returns {boolean} true if product.category matches given category, else false
 */
export function filterCategory(product, category) {
  // Not supplied
  if (category === undefined) return true;

  // Filter
  if (product.category === category) return true;

  // Default
  return false;
}

/**
 * Function intended to be given to array Array.prototype.filter
 *
 * @param {Product} product Product to check price against
 * @param {number} minPrice The lower bound price to check against
 * @returns {boolean} true if product.price is above or equal to minPrice, else false
 *
 */
export function filterMinPrice(product, minPrice) {
  // Not supplied
  if (isNaN(minPrice) || minPrice === undefined) return true;

  // Filter
  if (product.price >= minPrice) return true;

  // Default
  return false
}

/**
 * Function intended to be given to array Array.prototype.filter
 *
 * @param {Product} product Product to check price against
 * @param {number} maxPrice The upper bound price to check against
 * @returns {boolean} true if product.price is below or equal to maxPrice, else false
 *
 */
export function filterMaxPrice(product, maxPrice) {
  // Not supplied
  if (isNaN(maxPrice) || maxPrice === undefined) return true;

  // Filter
  if (product.price <= maxPrice) return true;

  // Default
  return false
}
