'use strict';

angular.module('aokSiteApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngFitText',
  'wu.masonry',
  'ngTouch'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/cart', {
        templateUrl: 'partials/cart'
      })
      .when('/about', {
        templateUrl: 'partials/about'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });