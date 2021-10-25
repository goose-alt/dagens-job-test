import dbProds from '../db';
import { filterCategory } from '../util';
import ProductRepository from './baseRepository';

/**
 * Repository implementation, using an in memory database located in ../../db.js
 */
export default class InMemoryProductRepository extends ProductRepository {
  #products

  constructor() {
    super();

    // Sort products for K-Nearest neighbor, necessary for 
    this.#products = dbProds;

    this.#sortProducts();
  }

  #sortProducts() {
    this.#products.sort((a,b) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });
  }

  /** @inheritdoc */
  list(filter = (x) => true) {
    return this.#products.filter(x => filter(x));
  }

  /** @inheritdoc */
  getById(id) {
    return this.#products.filter(x => x.id == id)[0];
  }

  /** @inheritdoc */
  create(product) {
    this.#products.push(product);

    // Ensure the products are still in order.
    this.#sortProducts();
  }

  /**
   * To implement the nearest neighbor we assume the elements are sorted.
   * 
   * Then loop i=1..N, retrieving elements on either side of the original index, plus an offset,
   * which is increased everytime you retrieve an element on that side.
   * Compare the difference of the 2 retrieved elements, and insert the element with the smallest diff on the corresponding side of the out array.
   * 
   * Example:
   * Imagine an array as so, assuming the second 65 is our target and n=6:
   * <pre>
   *                <- i ->
   * [58, 60, 63, 65, 65, 71, 74] 
   * </pre>
   * <pre>
   * i = 0; Create out = [65], left = 1, right = 1
   * i = 1; Compare 65-65=0 and 71-65=6, insert 65, out = [65, 65], left = 2, right = 1
   * i = 2; Compare 65-63=2 and 71-65=6, insert 63, out = [63, 65, 65] , left = 3, right = 1
   * i = 3; Compare 65-60=5 and 71-65=6, insert 60, out = [60, 63, 65, 65], left = 4, right = 1
   * i = 4; Compare 65-58=7 and 71-65=6, insert 71, out = [60, 63, 65, 65, 71], left = 4, right = 2
   * i = 5; Compare 65-58=7 and 74-65=9, insert 58, out = [58, 60, 63, 65, 65, 71], left = 5, right = 2
   * </pre>
   * 
   * @param {string} id Id of the product to retrieve around
   * @param {number} n Number of elements to retrieve
   * @returns List of n products nearest in price, in the same category as the product with id
   */
  getNNearestInCategoryToId(id, n) {
    const product = this.getById(id);
    if (product === undefined) return undefined;

    const category = product.category;
    const categoryProducts = this.#products.filter(x => filterCategory(x, category));
    const index = categoryProducts.indexOf(product);

    let left = 1;
    let right = 1;

    let products = [product];

    const addLeft = (product) => {
      products.unshift(product);
      left += 1;
    };
    const addRight = (product) => {
      products.push(product);
      right += 1;
    };

    // Start at 1, as we already have the first product
    for (let i = 1; i < n; i++) {
      // Get products on either side of the original product index
      const leftProduct = categoryProducts[index - left];
      const rightProduct = categoryProducts[index + right];

      if (leftProduct === undefined && rightProduct === undefined) {
        // There are no more elements left
        break;
      } else if (leftProduct === undefined) {
        // Reached left side of the array
        addRight(rightProduct);
        continue;
      } else if (rightProduct === undefined) {
        // Reached right side of the array
        addLeft(leftProduct);
        continue;
      }

      // Get diff of product on either side
      const leftDiff = product.price - leftProduct.price; // Price is lower on the left
      const rightDiff = rightProduct.price - product.price; // Price is higher on the right
      
      // Add the side with the smallest diff, prioritising left
      if (leftDiff <= rightDiff) addLeft(leftProduct)
      else addRight(rightProduct);
    }

    return products;
  }

  /** @inheritdoc */
  getCategories() {
    let categories = this.#products.map(x => x.category);

    // Create a set from the categories, thereby getting only the unique categories
    return [...new Set(categories)];
  }
}
