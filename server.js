const express = require('express');
const path = require('path');
const { products } = require('./data/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    page: 'home',
    featured: products.slice(0, 6),
    productCount: products.length,
  });
});

app.get('/shop', (req, res) => {
  const category = req.query.category || 'All';
  const filtered = category === 'All'
    ? products
    : products.filter((p) => p.category === category);
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  res.render('shop', {
    page: 'shop',
    products: filtered,
    categories,
    activeCategory: category,
    productCount: products.length,
  });
});

app.listen(PORT, () => {
  console.log(`Webglut 3D storefront sample running at http://localhost:${PORT}`);
});
