const fs = require('fs');
const path = require('path');

const products = [];
const prods = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = callback => {
    fs.readFile(prods, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.readFile(prods, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
  // static keyword allows you to call fetchAll directly off the Product class itself,
  // vs an instantiated object created with the Product class.
  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
}