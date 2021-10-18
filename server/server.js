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
})

process.on('SIGINT', function () {
  process.exit();
});
