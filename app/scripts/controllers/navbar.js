'use strict';

angular.module('aokSiteApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': '',
      'link': '/',
      'class': 'brand-logo-aok'
    },
    {
      'title': ' | ',
      'link': '/cart',
      'class': ''
    },
    {
      'title': 'ABOUT',
      'link': '#',
      'class': ''
    }];
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
