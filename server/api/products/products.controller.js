'use strict';

module.exports = function (db) {
	class ProductsController {
		getProducts (req, res) {
      db['products.model']
        .find()
        .then((err, products) => {
          if (err) {
            res.send(err)
          } else {
            res.json(products); // return all reviews in JSON format
          }
      });
    };
    
    addProduct (req, res) {
      db['products.model']
      .create({
        sku: req.body.sku,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        active: req.body.active,
        done : false })
      .then((err, product) => {
        if (err) {
          res.send(err);
        } else {
          // get and return all the reviews after you create another
          db['products.model']
          .find()
          .then((err, products) => {
            if (err) {
              res.send(err)
            } else {
              res.send(products);
            }
          });
        }
      });
    }

    updateProduct (req, res) {
      db['products.model']
        .update({_id: req.body._id}, {
          sku: req.body.sku,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          active: req.body.active,
          done : false })
        .then((err, product) => {
            if (err) {
              res.send(err);
            } else {
              res.send(product);       
            }         
      });
    }

    deleteProduct (req, res) {
      db['products.model']
        .remove({
          _id : req.params._id })
        .then((err, product) => {
          if (err) {
            res.send(err);
          } else {
            res.send(product);       
          }
      });
    }
	}

	return new ProductsController();
};