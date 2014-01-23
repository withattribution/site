'use strict';

angular.module('aokSiteApp')
  .controller('ChargeCtrl', function ($scope, $http, CheckOutService) {
    $scope.charge = {};
    $scope.charge.total = 0;

    Stripe.setPublishableKey('pk_test_oYSLNWTJQrkTKne7rHQkSS8N');

    $scope.$on('cart-total-updated',function(event, total) {
      $scope.charge.total = total;
    });

    $scope.$on('shipping-total-updated',function(event, rate) {
      $scope.charge.shipping = rate;
    });

    $scope.isValidCard = function() {
      $scope.charge.validCard = Stripe.card.validateCardNumber($scope.charge.cardNumber);
    }

    $scope.sanitizeEXP = function() {
      if ($scope.charge.exp) {
        if ($scope.charge.exp.length == 1 && parseInt($scope.charge.exp) > 1) {
          var keep = $scope.charge.exp;
          $scope.charge.exp = '0'+keep;
        }

        if($scope.charge.exp.length == 2 && $scope.charge.exp.indexOf("/") == -1 && event.keyCode != 8 ) {
          $scope.charge.exp += ' / ';
        }

        if($scope.charge.exp.length == 6 && event.keyCode == 8) {
          $scope.charge.exp = $scope.charge.exp.substr(0,3);
        }
      }
    }

    $scope.isValidEXP = function() {
      if ($scope.charge.exp) {
        $scope.charge.exp = $scope.charge.exp.replace(/[^0-9\" \/ \"]/g,"");

        $scope.charge.month = $scope.charge.exp.substr(0,2).trim();
        $scope.charge.year = $scope.charge.exp.substr(5).trim();

        if ($scope.charge.year.toString().length < 4) {
          var y = $scope.charge.year;
          $scope.charge.year = '20'+y;
        }
        // console.log('month: '+month+'  year: '+year);
        $scope.charge.validEXP = Stripe.card.validateExpiry($scope.charge.month,$scope.charge.year);
      }
    }

    $scope.isValidCVC = function() {
      if ($scope.charge.cvc)
        $scope.charge.cvc = $scope.charge.cvc.replace(/[^0-9]/g,"");

      $scope.charge.validCVC = Stripe.card.validateCVC($scope.charge.cvc);
    }

    $scope.charge.getToken = function() {
      if($scope.chargeForm.$valid) {
        Stripe.card.createToken({
              number: $scope.charge.cardNumber,
                 cvc: $scope.charge.cvc,
           exp_month: $scope.charge.month,
            exp_year: $scope.charge.year
          },
           stripeResponseHandler);
      }
    }

    function stripeResponseHandler(status, response) {
      if (response.error) {
        console.log('errrorrrrrr    -->     '+JSON.stringify(response));
      } else {
        $scope.charge.token = response['id'];
        // console.log('you chose wisely: '+JSON.stringify(response));
        // console.log('token: '+response['id']);
      }
    }

    $scope.charge.checkout = function() {
      console.log('pushing a buton checkout');
      $http.post('/api/charge', {stripeToken : $scope.charge.token, email : $scope.charge.email})
        .success(function(response){
          console.log('response for checkout: '+response);
        }
      );
    }

});

// // Stripe.card.cardType('4242-4242-4242-4242') // "Visa"
// // Stripe.card.cardType('378282246310005')     // "American Express"
// // Stripe.card.cardType('1234')                // "Unknown"
