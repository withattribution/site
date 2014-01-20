'use strict';

angular.module('aokSiteApp')
  .controller('ShipCtrl', function ($scope, $http) {

    $scope.ship = {};
    $scope.formData = {};

    $scope.ship.processForm = function() {
      console.log($scope.shippingForm.$valid);
      // if($scope.shippingForm.$valid) {
        $http({
              method  : 'POST',
              url     : '/api/ship/rates',
              data    : $.param($scope.formData),  // pass in data as strings
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
          }).then(function(response) {
              // success
              console.log('you have found success in life');
              console.log(response);
              $scope.ship.rates = response.data;
          }, 
            function(response) { // optional
            // failed
          });
      // }
    }

    $scope.setService = function(rate){
      console.log("the id: "+rate.id);
      $scope.ship.service = rate.id;
      $scope.ship.shipment = rate.shipment_id;
      $scope.bundle = {
        ship_id:$scope.ship.shipment,
        rate_id:$scope.ship.service
      }
    }

    $scope.ship.test = function() {
        $http({
              method  : 'POST',
              url     : '/api/ship/purchase',
              data    : $.param($scope.bundle),  // pass in data as strings
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

