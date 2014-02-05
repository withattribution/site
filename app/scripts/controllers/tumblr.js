'use strict';

angular.module('aokSiteApp')
  .controller('TumblrCtrl', function ($scope, $http) {
    console.info('should reach out and grab tumblr posts for a tag');

    $scope.tumblr = {};
    
    $http({
        url: '/api/grid', 
        method: "GET",
        params: {tag: ''}
     }).then(function(response){
        // console.log('super success: '+JSON.stringify(response.data));

        $scope.tumblr.items = response.data;

     }, function(response){
        console.log('fucking tumblr fail right?');
     });
  });
