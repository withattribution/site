'use strict';

var api = require('./controllers/api'),
    cart  = require('./controllers/cart')(),
    charge = require('./controllers/charge'),
    ship = require('./controllers/ship'),
    grid = require('./controllers/grid'),
    webhooks = require('./controllers/webhooks'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
/* cart end points */
// app.get('/api/test/cookie',cart.testCookie);
// app.get('/api/test/delete',cart.deleteCookie);
  app.get('/api/cart',cart.List);
  app.post('/api/cart/add/:name',cart.Add);
  app.put('/api/cart/:id/:quantity',cart.Update);
  // app.delete('/api/cart/:id',cart.deleteItem);

/* tumblr grid endpoint */
  app.get('/api/grid',grid.tumblr);

  /* purchase end points */
  app.post('/api/charge',charge.checkout);

  /* shipping end points */
  app.post('/api/ship/rates',ship.rates);
  app.post('/api/ship/purchase',ship.purchase);

  /* webhooks! */
  app.post('/webhooks/stripe',webhooks.stripe);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};