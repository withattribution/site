'use strict';

angular.module('aokSiteApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'About',
      'link': '#'
    },
    {
      'title': 'Contact',
      'link': '#'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
