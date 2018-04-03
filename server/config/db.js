const fs        = require("fs");
const path      = require("path");
const mongoose  = require('mongoose');
const config    = require('./config.json');

const models = [
  "products.model"
]

const db = {};

models.forEach((model) => {
  db[model] = require(`./models/${model}`)(mongoose);
});

try {
  mongoose.connect(config.dbLocal, {dbName: config.dbName});
} catch (e) {
  console.log('Error: Could not connect to database.');
  throw e;
}

module.exports = db;