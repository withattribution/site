'use strict';

angular.module('aokSiteApp')
  .controller('NavCtrl', function ($scope, $location, TumblrService) {

    $scope.menu = {};
    $scope.menu.visible = false;
    $scope.menu.stuff = [];

    var navigationTag = 'stuff';

    $scope.navigate = function(tags) {

    /** this pulls the tumblr tags that we're using to browse through
      * various products. the format we are following is that any product 
      * that will represent the products in the main menu will have the tags
      * 'stuff' and 'the_product_name'. the code below ignores the stuff tag
      * and uses the remaining tag to navigate to the appropriate page.
      **/

      if(tags.length > 2) {
        throw "TooManyTumblrTagsError --> expected 2 found: "+tags.length;
        return;
      }

      var index = tags.indexOf(navigationTag);
      var pageTag = (index > 0) ? tags[0] : tags[1];

      if (isActive("/"+pageTag)) {
        $scope.menu.show();
      }else {
        $location.path(pageTag);
      }
    }

    $scope.about = function (){
      $location.path('/about');
    }

    $scope.menu.show = function() {
      $scope.menu.visible = !$scope.menu.visible;
    }

    var tumblr = TumblrService.instance();

    $scope.stuffTumblr = function () {
      tumblr.query({limit:0, tagged:navigationTag},function(posts){
        $scope.menu.stuff = posts;
      });
    }

    function isActive(route) {
      return route === $location.path();
    };

  });
