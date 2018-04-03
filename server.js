// Set up
const util = require('util');
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration

mongoose.connect('mongodb+srv://lorelabaro:lorejairus1!@cluster0-vzk9h.mongodb.net/',{dbName: 'minventory'});
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Product = mongoose.model('products', {
    id: String,
    sku: String,
    name: String,
    price: Number,
    description: String,
    active: String
});
 
// Routes
 
    // Get reviews
    app.get('/api/get/products', function(req, res) {
 
        console.log("fetching products");
 
        // use mongoose to get all reviews in the database
        Product.find(function(err, products) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(products); // return all reviews in JSON format
        });
    });
 
    // create review and send back all reviews after creation
    app.post('/api/add/products', function(req, res) {
        
        console.log('product: '+JSON.stringify(req.body, null, 2));      // your JSON
  // echo the result back

 
        // create a review, information comes from request from Ionic
        Product.create({
          sku: req.body.sku,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          active: req.body.active,
            done : false
        }, function(err, product) {
            if (err)
                res.send(err);
 
            // get and return all the reviews after you create another
            Product.find(function(err, products) {
                if (err)
                    res.send(err)
                res.json(products);
            });
        });
 
    });
    
     app.delete('/api/delete/products/:_id', function(req, res) {
        Product.remove({
            _id : req.params._id
        }, function(err, product) {
 
        });
    });
 

 
 
// listen (start app with node server.js) ======================================
app.listen(8100);
console.log("App listening on port 8100");