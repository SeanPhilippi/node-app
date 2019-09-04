const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');
const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
  console.log('products', adminData.products);
  const products = adminData.products;
  // path.join() is used vs concat because it detects the operating system the app is running on and adjusts for '/' or '\'
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // now using pugfile since view engine in app is set to pug
  res.render('shop', { products: products, docTitle: 'Shop' });
});

module.exports = router;