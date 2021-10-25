import express from 'express';
import http from 'http';
import cors from 'cors';

import InMemoryProductRepository from './db/inMemoryRepository';
import ProductController from './controller';

const app = express();

const repository = new InMemoryProductRepository();
const controller = new ProductController(repository);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

http.createServer(app).listen(3001, () => {
  console.log('Listening on 0.0.0.0:3001');
});

app.get('/products',     (req, res) => controller.list(req, res));
app.post('/products',    (req, res) => controller.create(req, res));
app.get('/products/:id', (req, res) => controller.getNNearestInCategoryToId(req, res));
app.get('/categories',   (req, res) => controller.getCategories(req, res));

process.on('SIGINT', function () {
  process.exit();
});
