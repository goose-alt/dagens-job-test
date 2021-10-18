const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const products = require('./db');
const uuidV4 = require('uuid').v4;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

http.createServer(app).listen(3001, () => {
  console.log('Listen on 0.0.0.0:3001');
});

app.get('/', (_, res) => {
  res.status(200).send();
});

// TODO: Extract the following functions
app.get('/products', (req, res) => {
  const { query } = req;

  let page = parseInt(query.page || 1);
  let prPage = parseInt(query.prPage || 24);

  // Get products, starting at 0, thereby page - 1
  let filter = (x) => filterCategory(x, query.category) && filterMinPrice(x, parseInt(query.minPrice)) && filterMaxPrice(x, parseInt(query.maxPrice));
  let filtered = products.filter(x => filter(x));

  let prods = filtered.slice((page - 1) * prPage, page * prPage);

  const nextPage = page + 1;
  const lastPage = Math.ceil(products.length / prPage);

  res.status(200).send({
    products: prods,
    pages: {
      prPage,
      page,
      nextPage,
      nextPageUrl: req.url.replace(`page=${page}`, `page=${nextPage}`), // Includes other params
      lastPage,
      lastPageUrl: req.url.replace(`page=${page}`, `page=${lastPage}`), // Includes other params
    }
  })
});

function filterCategory(product, category) {
  // Not supplied
  if (category === undefined) return true;
  
  // Filter
  if (product.category === category) return true;

  // Default
  return false;
}

function filterMinPrice(product, minPrice) {
  // Not supplied
  if (isNaN(minPrice) || minPrice == undefined) return true;
  
  // Filter
  if (product.price >= minPrice) return true;

  // Default
  return false
}

function filterMaxPrice(product, maxPrice) {
  // Not supplied
  if (isNaN(maxPrice) || maxPrice === undefined) return true;
  
  // Filter
  if (product.price <= maxPrice) return true;

  // Default
  return false
}

app.post('/products', (req, res) => {
  let body = req.body;

  let { name, category, price } = body;
  let uuid = uuidV4();
  
  let product = {
    id: uuid,
    name,
    category,
    price,
  };

  products.push(product);

  res.status(200).send({ product });
});

process.on('SIGINT', function () {
  process.exit();
});
