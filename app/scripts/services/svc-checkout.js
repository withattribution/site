'use strict';

angular.module('aokSiteApp')
  .value('version', '0.1')
  .service('CheckOutService', function ($resource, $rootScope) {
    // var cartTotal = 0;
    // var shippingTotal = 0; 
    return {
        updateShippingTotal : function(selected) {
          // shippingTotal = selected.rate;
          $rootScope.$broadcast('shipping-total-updated', parseFloat(selected.rate));
        },
        updateCartTotal : function(items) {
          var total = 0;
          angular.forEach(items, function(value, key){
            total += items[key].price * items[key].quantity;
          });
          // cartTotal += shippingTotal;
          $rootScope.$broadcast('cart-total-updated', total);
        },
        cart : $resource('/api/cart/', null, {
            query : {method:'GET', isArray:true},
              add : {method:'POST', params:{name:'@name'},url:'/api/cart/add/:name'},
           update : {method:'PUT', params:{id:'@id',quantity:'@quantity'},url:'/api/cart/:id/:quantity'}
        })
    };
  }
);