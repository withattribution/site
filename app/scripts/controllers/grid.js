'use strict';

angular.module('aokSiteApp')
  .controller('GridCtrl', function ($scope, TumblrService) {

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
      responsive: true,
      stretch: $scope.stretchModes[2],
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

    var overlayEnter = new Event('aok-overlay-enter');
    var overlayExit = new Event('aok-overlay-exit');

    $scope.setShown = function(selectedIndex) {
        ($scope.show) ? window.dispatchEvent(overlayExit) : window.dispatchEvent(overlayEnter);
        $scope.show = !$scope.show;
        $scope.slideIndex = selectedIndex || 0;

        // if ($scope.show) {
        //   // $('body').css('position','fixed');
        // }
    }

});
