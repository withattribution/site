'use strict';

angular.module('aokSiteApp')
  .controller('TumblrCtrl', function ($scope, $http) {
    $scope.tumblr = {};
    $scope.tumblr.items = [];

    $scope.tumblr.offset = 0;
    $scope.tumblr.limit = 5;
    $scope.busy = false;
    $scope.endOf = false;

    $scope.overlayIsEnabled = false;
    $scope.selectedGridElement = false;

    $scope.addTumblrPosts = function() {
        if ($scope.busy || $scope.endOf) return;

        $scope.busy = true;

        $http({
            url : '/api/grid', 
            method : "GET",
            params : { limit:$scope.tumblr.limit, tag:'', offset:$scope.tumblr.offset }
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

    var $window = $(window),
        $body = $('BODY');

    var winsize = getWindowSize();

    $scope.gridOverlay = function (item,event) {
      
      if ($scope.overlayIsEnabled) {
        //ignore non-targeted clicks
        return false;
      }
      
      $scope.overlayIsEnabled = true;

      var $selected = $(event.currentTarget),
          $close = $selected.find('button.close'),
          $overlay = $selected.children('div.grid-overlay');

      $scope.selectedGridElement = $selected;

      var layoutProp = getItemLayoutProp( $selected ),
        clipPropFirst = 'rect(' + layoutProp.top + 'px ' + ( layoutProp.left + layoutProp.width ) + 'px ' + ( layoutProp.top + layoutProp.height ) + 'px ' + layoutProp.left + 'px)',
        clipPropLast = 'rect(0px ' + winsize.width + 'px ' + winsize.height + 'px 0px)';

        $overlay.css({
          clip : clipPropFirst,
          transition : 'opacity 0.2s ease',
          opacity : 1,
          zIndex : 999,
          pointerEvents : 'auto'
        });

        $overlay.on('transitionend', function() {
          $overlay.off('transitionend');
            setTimeout( function() {
              $overlay.css({
                clip : clipPropLast,
                transition : 'all 0.2s ease'
              })
              .on('transitionend', function() {
                $overlay.off( 'transitionend' );
                $body.css({'overflow-y' : 'hidden'});
              });
            }, 25 );
        });

        $close.on('click', function() {
          
          $body.css('overflow-y','auto');

          var layoutProp = getItemLayoutProp( $selected ),
            clipPropFirst = 'rect(' + layoutProp.top + 'px ' + ( layoutProp.left + layoutProp.width ) + 'px ' + ( layoutProp.top + layoutProp.height ) + 'px ' + layoutProp.left + 'px)',
            clipPropLast = 'auto';

          $overlay.css( {
            clip : clipPropFirst,
            transition : 'all 0.2s ease',
            opacity : 1,
            pointerEvents : 'none'
          });

          $overlay.on('transitionend', function() {
            $overlay.off('transitionend');
            setTimeout(function() {
              $overlay.css({
                  opacity : 0
                })
                .on('transitionend', function() {
                  $overlay.off('transitionend')
                    .css({ 
                      clip : clipPropLast,
                      zIndex : -1
                    });
                  $scope.selectedGridElement = false;
              });
            }, 25 );
          });

        $scope.overlayIsEnabled = false;
        return false;
      });
    }

    function getItemLayoutProp( $selected ) {
      var scrollT = $window.scrollTop(),
          scrollL = $window.scrollLeft(),
          itemOffset = $selected.offset();

      return {
        left : itemOffset.left - scrollL,
        top : itemOffset.top - scrollT,
        width : $selected.outerWidth(),
        height : $selected.outerHeight()
      };
    }

    $(window).on('resize', function() { 
      winsize = getWindowSize();
      if( $scope.selectedGridElement ) {
        // $scope.selectedGridElement.children( 'div.grid-overlay' ).css( 'clip', 'rect(0px ' + winsize.width + 'px ' + winsize.height + 'px 0px)' );
      $scope.selectedGridElement.children('div.grid-overlay').css({ 
        clip : 'rect(0px ' + winsize.width + 'px ' + winsize.height + 'px 0px)',
        width : winsize.width+'px',
        height : winsize.height+'px' 
       });
      }
    });

    function getWindowSize() {
      $body.css( 'overflow-y', 'hidden' );
      var w = $window.width(), h =  $window.height();
      if( $scope.selectedGridElement === false ) {
        $body.css( 'overflow-y', 'auto' );
      }
      return { width : w, height : h };
    }
});
