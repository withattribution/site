'use strict';

var Stripe = require('stripe')(process.env.AOK_TEST_STRIPE);
var cart  = require('./cart')();

function validateChargeForm(request) {
  request.checkBody('email', 'email is required').isEmail();
  request.checkBody('stripeToken', 'stripeToken is required').notEmpty();
  return request.validationErrors();
};

exports.checkout = function(req, res) {
  var errors = validateChargeForm(req);
  if(errors) {
    // console.log('errors');
    res.json(400, errors);
    return;
  }

  cart.Retrieve(req, function(result){
    var cartResult = JSON.parse(result);
    
    if(cartResult['error']) {
      res.json(400,cartResult);
      return;
    }

    var chargeAmount = 0;
    
    for (var product in cartResult) {
      if (cartResult.hasOwnProperty(product)) {
        chargeAmount += cartResult[product].quantity * cartResult[product].price;
      }
    }
    // console.log("charge amount: "+chargeAmount);
    if (chargeAmount > 0) {
      var charge = {
        amount : chargeAmount * 100,
        currency : 'USD',
        card : req.body.stripeToken
      }

      Stripe.charges.create(charge).then(function(charge){
        var myObject = JSON.stringify(charge);
        console.log("charge! : "+myObject);
        res.json(200,{'success':cartResult});
      }, function() {
        res.json(200,{'failed':cartResult});
      });
    }else {
      res.json(200,{'failed':cartResult});
    }

  });
};
