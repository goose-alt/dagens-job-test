/**
 * Not to be instantiated, only extended
 * 
 * Base class for the product repository, definining necessary methods.
 * 
 * Would be an interface in TypeScript
 */
export default class ProductRepository {
    /**
     * List all products. An optional filter can be provided to filter the products
     * 
     * @param {Function<Product, boolean>} filter Optional filter
     * @returns {Array<Product>} List of filtered products
     */
    list(filter = (x) => true) {}

    /**
     * Get product with the provided id.
     * 
     * @param {string} id Id of the product
     * @returns {Product} Product if found, else undefined
     */
    getById(id) {}

    /**
     * Insert the given product into storage
     * 
     * @param {Product} product Product to insert
     */
    create(product) {}

    /**
     * Retrieve n nearest products, by price, in the same category as the product with the given id.
     * 
     * @param {string} id Id of the product, to get nearest to, in category
     * @param {number} n How many elements to retrieve
     */
    getNNearestInCategoryToId(id, n) {}

    /**
     * Retrieve all available categories
     */
    getCategories() {}
}