'use strict';
  
module.exports = (db) => {
  const Product = db.model('products', {
    id: String,
    sku: String,
    name: String,
    price: Number,
    description: String,
    active: String
  });

  return Product;
};

