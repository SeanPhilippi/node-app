const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  console.log('In another middleware!');
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res) => {
  const products = Product.fetchAll();
  // path.join() is used vs concat because it detects the operating system the app is running on and adjusts for '/' or '\'
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // now using pugfile since view engine in app is set to pug
  res.render('shop', {
    products: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
}