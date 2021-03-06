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
  'aok-boo',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'com.2fdevs.videogular.plugins.overlayplay',
  'com.2fdevs.videogular.plugins.buffering',
  'com.2fdevs.videogular.plugins.poster',
  'angular-carousel'
])
  .config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
    $routeProvider
      .when('/:pageName', {
        templateUrl: function(params) {
          return 'partials/' + params.pageName;
        }
      })
      .otherwise({
        redirectTo: '/about'
      });

    $locationProvider.html5Mode(true);

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://vt.tumblr.com/tumblr_**.mp4']);
     // The blacklist overrides the whitelist
     // $sceDelegateProvider.resourceUrlBlacklist([]);
  }).run(function() {
    FastClick.attach(document.body);
  });
