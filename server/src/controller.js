import { v4 as uuidV4 } from 'uuid';
import { filterCategory, filterMinPrice, filterMaxPrice } from './util';

/**
 * Controller to handle Product routes
 * 
 * Uses a repository for data access
 */
export default class ProductController {
  #repository
  
  /**
   * Instantiate controller, with a repository implementing ProductRepository
   * @param {ProductRepository} repository 
   */
  constructor(repository) {
    this.#repository = repository
  }

  /**
   * List products endpoint
   * 
   * The endpoint will use query parameters to filter products, as well as provide pagination
   * 
   * @param req request
   * @param res response
   */
  list(req, res) {
    const {
      query
    } = req;

    // Parse url query to get the current page, and amount pr page
    let page = parseInt(query.page) || 1;
    let prPage = parseInt(query.prPage) || 24;

    // Get products, starting at 0, thereby page - 1
    let filter = (x) => filterCategory(x, query.category) && filterMinPrice(x, parseInt(query.minPrice)) && filterMaxPrice(x, parseInt(query.maxPrice));
    let filtered = this.#repository.list(filter);

    // Calculate offset as page - 1 multiplied by the amount pr page to get the element right after the last on the last page
    // Which is the first element on this page
    const offset = (page - 1) * prPage;
    // Calculate target element, which is the last on this page, as the page multiplied by the amount pr page
    // The target element is not included, and is therefore the offset on the next page
    const target = page * prPage;
    let prods = filtered.slice(offset, target);

    // Calculate information for the pagination portion of the response
    const nextPage = page + 1;
    const lastPage = Math.ceil(filtered.length / prPage);

    // Send response with products and pagination information
    res.status(200).send({
      products: prods,
      pagination: {
        prPage,
        page,
        nextPage,
        nextPageUrl: req.url.replace(`page=${page}`, `page=${nextPage}`), // Includes other params
        lastPage,
        lastPageUrl: req.url.replace(`page=${page}`, `page=${lastPage}`), // Includes other params
      }
    });
  }

  /**
   * Create product endpoint
   * 
   * @param req request
   * @param res response
   */
  create(req, res) {
    let body = req.body;

    // Only extract the necessary elements from the body
    let {
      name,
      category,
      price
    } = body;

    // Construct product
    let uuid = uuidV4();
    let product = {
      id: uuid,
      name,
      category,
      price,
    };

    // Add to repository
    this.#repository.create(product);

    // Return the productI
    res.status(200).send({
      product,
    });
  }

  getNNearestInCategoryToId(req, res) {
    const {
      query,
      params
    } = req;

    const n = parseInt(query.n) || 3;
    const products = this.#repository.getNNearestInCategoryToId(params.id, n);

    if (products === undefined) {
      return res.status(404).send({
        msg: 'Product not found',
      });
    }

    res.status(200).send({
      products,
    });
  }
}
