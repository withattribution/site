'use strict';

angular.module('aokSiteApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'ngFitText',
  'wu.masonry',
  'infinite-scroll',
  'ngTouch',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'com.2fdevs.videogular.plugins.overlayplay',
  'com.2fdevs.videogular.plugins.buffering',
  'com.2fdevs.videogular.plugins.poster',
  'angular-carousel'
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
