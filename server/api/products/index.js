'use strict';

var express = require("express");

var router = express.Router();

module.exports = function (app, db) {

	var controller = require("./products.controller")(db);

  router.get("/get", controller.getProducts);
  router.post("/add", controller.addProduct);
  router.put("/update", controller.updateProduct);
  router.delete("/delete/:_id", controller.deleteProduct);

	return router;
};