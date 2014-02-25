'use strict';

angular.module('aokSiteApp')
  .controller('GridCtrl', function ($scope, TumblrService) {

    $scope.grid = {};
    $scope.grid.tumblrPosts = [];

    $scope.show = false;
    $scope.slideIndex = 0;
    
    var tumblr = TumblrService.instance();

    $scope.addTumblrPosts = function() {
      tumblr.query(function(posts){
        $scope.grid.tumblrPosts = posts;
      });
    }

    $scope.setShown = function(selectedIndex) {
        // console.log("selected: "+selectedIndex);
        $scope.show = !$scope.show;
        $scope.slideIndex = selectedIndex;
    }

    /* gif visibility test */
    var foo = document.getElementById('foo');

    var $largeGif = $('img#foo');

    function elementVisibilityMayChange (el) {
        return function () {
            if ( !isElementInViewport(el) ) {
                // console.log('is not visible now');
                $largeGif.css({opacity:0});
            }else {
              $largeGif.css({opacity:1});
              // console.log('super visible now!');
            }
        }
    }

    function isElementInViewport (el) {
      var rect = el.getBoundingClientRect();
      var stuff = -1*(0.85)*(window.innerHeight || document.documentElement.clientHeight);
      // console.log("top: "+rect.top);
      // console.log("bottom: "+rect.bottom);
      return (
          rect.top >= -1*(0.85)*(window.innerHeight || document.documentElement.clientHeight) &&
          rect.left >= 0 &&
          /* rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && */ /*or $(window).height() */
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
      );
    }

    var handler = elementVisibilityMayChange(document.getElementById('foo'));
    $(window).on('DOMContentLoaded load resize scroll', handler); 
    /* gif visibility test */

});
