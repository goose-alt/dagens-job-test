import dbProds from '../db';
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
}
