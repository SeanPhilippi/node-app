const fs = require('fs');
const path = require('path');

const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err)
      });
    });
  }
  // static keyword allows you to call fetchAll directly off the Product class itself,
  // vs an instantiated object created with the Product class.
  static fetchAll(callback) {
    const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      }
      // fileContent is returned as text, so it has to be parsed into json
      callback(JSON.parse(fileContent));
    })
    return products;
  }
}