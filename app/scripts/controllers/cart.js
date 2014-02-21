'use strict';

angular.module('aokSiteApp')
  .controller('CartCtrl', function ($scope, $http, CheckOutService) {
    $scope.cart = {};
    
    CheckOutService.cart.query(function(items){
      $scope.cart.items = items;
      CheckOutService.updateCartTotal($scope.cart.items);
    });

    $scope.cartUpdateQuantity = function(item) {
      CheckOutService.cart.update({
        id: item.objectId,
        quantity: parseInt(item.quantity)
      },function(){
        CheckOutService.updateCartTotal($scope.cart.items);
      });
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
      CheckOutService.cart.add({name:name});
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
