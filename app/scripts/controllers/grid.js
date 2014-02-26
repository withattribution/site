'use strict';

angular.module('aokSiteApp')
  .controller('GridCtrl', function ($scope, $sce, TumblrService) {

    $scope.grid = {};
    $scope.grid.tumblrPosts = [];

    $scope.show = false;
    $scope.slideIndex = 0;

    $scope.currentTime = 0;
    $scope.totalTime = 0;
    $scope.state = null;
    $scope.volume = 1;
    $scope.isCompleted = false;
    $scope.API = null;

    $scope.onPlayerReady = function(API) {
      $scope.API = API;
    };

    $scope.onCompleteVideo = function() {
      $scope.isCompleted = true;
    };

    $scope.onUpdateState = function(state) {
      $scope.state = state;
    };

    $scope.onUpdateTime = function(currentTime, totalTime) {
      $scope.currentTime = currentTime;
      $scope.totalTime = totalTime;
    };

    $scope.onUpdateVolume = function(newVol) {
      $scope.volume = newVol;
    };

    $scope.onUpdateSize = function(width, height) {
      $scope.config.width = width;
      $scope.config.height = height;
    };

    $scope.stretchModes = [
      {label: "None", value: "none"},
      {label: "Fit", value: "fit"},
      {label: "Fill", value: "fill"}
    ];

    $scope.config = {
      width: 740,
      height: 380,
      autoHide: false,
      autoHideTime: 3000,
      autoPlay: false,
      responsive: false,
      stretch: $scope.stretchModes[1],
      sources: [
        {src: $sce.trustAsResourceUrl("http://vt.tumblr.com/tumblr_n0ya49lolv1tsl9zz.mp4"), type: "video/mp4"}//,
        // {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
        // {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
      ],
      transclude: true,
      theme: {
        url: "bower_components/videogular-themes-default/videogular.css",
        playIcon: "&#xe000;",
        pauseIcon: "&#xe001;",
        volumeLevel3Icon: "&#xe002;",
        volumeLevel2Icon: "&#xe003;",
        volumeLevel1Icon: "&#xe004;",
        volumeLevel0Icon: "&#xe005;",
        muteIcon: "&#xe006;",
        enterFullScreenIcon: "&#xe007;",
        exitFullScreenIcon: "&#xe008;"
      },
      plugins: {
        poster: {
          url: "images/aok-beach.jpg"
        },
      }
    };

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
      if (el != null) {
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
    }

    var handler = elementVisibilityMayChange(document.getElementById('foo'));
    $(window).on('DOMContentLoaded load resize scroll', handler); 
    /* gif visibility test */

});
