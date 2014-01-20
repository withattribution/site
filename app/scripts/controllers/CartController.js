'use strict';

angular.module('aokSiteApp')
  .controller('CartCtrl', function ($scope, $http, CartService) {
    $scope.cart = {};
    $scope.cart.items = CartService.query();

    $scope.cartUpdateQuantity = function(item) {
      CartService.update({id:item.objectId,quantity:parseInt(item.quantity)});
    }

    $scope.cart.incrementItem = function(item) {
      item.quantity++;
      $scope.cartUpdateQuantity(item);
    }

    $scope.cart.decrementItem = function(item) {
      item.quantity--;
      $scope.cartUpdateQuantity(item);
    }

    $scope.cart.addItem = function(name) {
      CartService.add({name:name});
    }

    $scope.cart.removeItem = function(name) {
      /*not implemented */
    }

    $scope.cart.getTotal = function() {
      /*not implemented */
    }

    $scope.cart.getTotalCount = function() {
      /*not implemented */
    }

    $scope.cart.getTotalPrice = function() {
      /*not implemented */
    }

});

// incrementing an item
// decrementing an item


//add item
//remove item
//cart total
