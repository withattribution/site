'use strict';

angular.module('aokSiteApp')
  .controller('TumblrCtrl', function ($scope, $http) {
    $scope.tumblr = {};
    $scope.tumblr.items = [];

    $scope.tumblr.offset = 0;
    $scope.tumblr.limit = 5;
    $scope.busy = false;
    $scope.endOf = false;

    $scope.addTumblrPosts = function() {
        if ($scope.busy || $scope.endOf) return;

        $scope.busy = true;

        $http({
            url: '/api/grid', 
            method: "GET",
            params: { limit:$scope.tumblr.limit, tag:'', offset:$scope.tumblr.offset }
         }).then(function(response){
            if (response.data.length > 0) {
              for (var i = 0; i < response.data.length; i++) 
              {
                $scope.tumblr.items.push(response.data[i]);
              }
              $scope.tumblr.offset += $scope.tumblr.limit;
            }else {
              /* service has run dry -- no more requests please */
              $scope.endOf = true; 
            }
            $scope.busy = false;
         }, function(response){
            $scope.busy = false;
            console.log('fucking tumblr fail right?');
         });
    }

    var init = function() {
      $http({
          url: '/api/grid', 
          method: "GET",
          params: { limit:$scope.tumblr.limit, tag:'' }
       }).then(function(response){

          for (var i = 0; i < response.data.length; i++) 
          {
            $scope.tumblr.items.push(response.data[i]);
          }

          $scope.tumblr.offset += $scope.tumblr.limit;

       }, function(response){
          console.log('fucking tumblr fail right?');
       });
    };

    init();
});
