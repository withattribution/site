
'use strict'; 
(function (){
  // /* cart service api */
  var Parse = require('parse').Parse;
  Parse.initialize("Npfbhc3MLJHIdvY2Qefx5Zjh8iEG8o0LKcWKGNV5", 
    "LU8EGmgQQBoxzO15xgLX2953odOex3deDVFGHrdI");

  module.exports = function() {
    var methods = {};

    methods.list = function (req, res) {
      methods.initializeCart(req, {
        success: function(cartObject){
          //retreive product list from cart
          var relation = cartObject.relation("products");
          relation.query().find().then(function(list){
            //console.log('list: '+JSON.stringify(list));
            res.json(list);
          },
          function (error) {
            res.json([{'products':[],'error':error.code}]);
          });
        },
        error: function(errorObject){
          res.json([{'products':[],'error':errorObject.code}]);
        } 
      });
    };

    methods.retrieve = function(request, cartRespoonseHandler) {
      console.log('retrieve cart');
      methods.initializeCart(request, {
        success: function(cartObject){
          //retreive product list from cart
          var relation = cartObject.relation("products");
          relation.query().find().then(function(list){
            // console.log('list: '+list[0]['name']);
            cartRespoonseHandler(JSON.stringify(list));
          },
          function (error) {
            cartRespoonseHandler({'products':[],'error':error.code});
          });
        },
        error: function(errorObject){
          cartRespoonseHandler({'products':[],'error':errorObject.code});
        } 
      }); 
    }


    methods.add = function (req, res) {
      methods.initializeCart(req, {
        success: function(cartObject){
          var relation = cartObject.relation('products');
          //console.log("the cart: "+JSON.stringify(cartObject));
          var query = new Parse.Query("AOK_PRODUCT");
          query.equalTo("name",req.body.name);
          query.first()
            .then(function(product){
              var cloned = product.clone();
              cloned.save()
                .then(function(saved){
                  relation.add(saved);
                  cartObject.save();
                  res.send(200);
            });
          },
          function () {
            res.send(500, 'Failed to load product: '+req.body.item);
          });
        },
        error: function(errorObject){
          // console.log("the cart: "+JSON.stringify(errorObject));
          res.send(500, 'Failed to load cart: '+errorObject.description);
        } 
      });
    };

    methods.update = function (req, res) {
      var query = new Parse.Query("AOK_PRODUCT");
      query.get(req.body.id)
        .then(function (result){
          result.set("quantity",req.body.quantity);
          result.save();
          res.send(204);
        },
        function (error) {
          res.send(error.code);
        });
    };

    /* cart utilities */
    /* initialize an anonymous cart */
    methods.initializeCart = function (request, options) {
      options.success = (typeof options.success == "function") ? options.success : function () {};
      options.error = (typeof options.error == "function") ? options.error : function () {};

      request.session.cartId = request.session.cartId || 0;

      var AnonCart = Parse.Object.extend("AOK_Cart");
      if (request.session.cartId == 0) {
        var cart = new AnonCart();
        cart.save({sessionId : request.sessionID})
          .then(function (result){
            request.session.cartId = result.id;
            options.success(result);
          }, 
          function (error) {
            options.error(error);
          });
      } else {
        var query = new Parse.Query(AnonCart);
        query.get(request.session.cartId)
          .then(function (result){
            // console.log('the fucking result: '+JSON.stringify(result));
            options.success(result);
          },
          function (error) {
            options.error(error);
          });
      }
    };

    return {
      List           : methods.list,
      Add            : methods.add,
      Update         : methods.update,
      Retrieve       : methods.retrieve,
      InitializeCart : methods.initializeCart
    }
  
  };

}());

// /* debugging and learning / growing */
// exports.testCookie = function (req, res) {
//   req.session.count = req.session.count || 0;
//   var n = req.session.count++;
//   console.log(req.sessionID);
//   res.json({"views":n, "sessionID":req.sessionID});
// };

// exports.deleteCookie = function (req, res) {
//   req.session = null;
//   res.json({'deleted cookie':req.session});
// };

