const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }
  // static keyword allows you to call fetchAll directly off the Product class itself,
  // vs an instantiated object created with the Product class.
  static fetchAll() {
    return this.products;
  }

}