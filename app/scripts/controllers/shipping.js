'use strict';

angular.module('aokSiteApp')
  .controller('ShipCtrl', function ($scope, $http, CheckOutService) {

    $scope.ship = {};
    $scope.formData = {};
    $scope.ship.total = 0;

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
      $scope.ship.selectedRate = rate;
      CheckOutService.updateShippingTotal($scope.ship.selectedRate);
    }

    $scope.ship.purchaseShipping = function() {
        $http({
              method  : 'POST',
              url     : '/api/ship/purchase',
              data    : $.param({ship_id:$scope.ship.selectedRate.shipment_id,rate_id:$scope.ship.selectedRate.id}),  // pass in data as strings
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

