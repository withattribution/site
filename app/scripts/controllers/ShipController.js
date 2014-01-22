'use strict';

angular.module('aokSiteApp')
  .controller('ShipCtrl', function ($scope, $http) {

    $scope.ship = {};
    $scope.formData = {};

    $scope.ship.processShippingForm = function() {

      console.log($scope.shippingForm.$valid);
      // if($scope.shippingForm.$valid) {
        var l = Ladda.create(document.querySelector('#shippingSelection'));
        l.start();
        $http({
              method  : 'POST',
              url     : '/api/ship/rates',
              data    : $.param($scope.formData),  // pass in data as strings
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
          })
            .then(function(response) {
              if (response.data.status == 'success') {
                $scope.ship.rates = response.data.data;
                $('#shippingMethods').modal();
                l.stop();
              };
          }, 
            function(response) { // optional
            // failed
          });
      // }
    }

    $scope.selectService = function(rate){
      $scope.ship.rateId = rate.id;
      $scope.ship.shipId = rate.shipment_id;
    }

    $scope.ship.purchaseShipping = function() {
        $http({
              method  : 'POST',
              url     : '/api/ship/purchase',
              data    : $.param({ship_id:$scope.ship.shipId,rate_id:$scope.ship.rateId}),  // pass in data as strings
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
          })
              .success(function(data) {
                  console.log(data);
                  if (!data.success) {
                    // if not successful, bind errors to error variables
                      // $scope.errorName = data.errors.name;
                      // $scope.errorSuperhero = data.errors.superheroAlias;
                  } else {
                    // if successful, bind success message to message
                      // $scope.message = data.message;
                  }
              });
    }

});

