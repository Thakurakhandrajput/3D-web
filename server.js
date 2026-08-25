const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// EJS View Engine सेटअप
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static फाइलों (CSS, JS, Images, 3D Models) के लिए पब्लिक फोल्डर सेटअप
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data'))); 

// --- ROUTES (पेजों के लिंक) ---

// 1. Home Page
app.get('/', (req, res) => {
    res.render('index');
});

// 2. Shop Page (Product Grid)
app.get('/shop', (req, res) => {
    res.render('shop');
});

// 3. Product Page (3D App View)
app.get('/product', (req, res) => {
    res.render('product');
});

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});
