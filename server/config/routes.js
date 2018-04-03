/**
 * Routes
 */

'use strict';

module.exports = function (app, db) {
    const basePath = "/api";

    app.use(basePath + "/products", require("./../api/products")(app, db));

    // All other routes should return 404
    app.route("/*").get(function (req, res) {
        res.sendStatus(404);
    });
};