'use strict';

angular.module('aok-boo',[])
  .directive('boo', ['$window', function($window){
    return {
      restrict: 'AE',
      scope: {
        peeking: '&'
      },
      link: function( scope, element, attrs) {

        var first = element[0].firstElementChild, 
            last = element[0].lastElementChild,
            active = first;

        $(window).on('DOMContentLoaded load resize scroll aok-overlay-exit', elementVisibilityMayChange() );

        element.on('$destroy', function() {
          $(window).off('DOMContentLoaded load resize scroll aok-overlay-enter aok-overlay-exit', elementVisibilityMayChange() );
        });
        /*
         * optional window events that are used to hide "heavy" elements
         * when an overlay is covering them ( yes, it is kinda hacky )
         * should use a fancier way to detect if element is visible 
         * like this fellow --> http://jsfiddle.net/AndyE/vGCay/2/
        */
        $(window).on('aok-overlay-enter', function(e){
          angular.element(first).css({'display':'none'});
          angular.element(last).css({'display':'block'});

          active = last;
        });

        function elementVisibilityMayChange () {
          return function () {
            if ( !isElementInViewport() ) {
              angular.element(first).css({'display':'none'});
              angular.element(last).css({'display':'block'});

              active = last;
            }else {
              angular.element(first).css({'display':'block'});
              angular.element(last).css({'display':'none'});

              active = first;
            }
          }
        }

        function isElementInViewport () {
          var rect = active.getBoundingClientRect();

          var widthRef  = (rect.right <= 0) ? rect.left : rect.right,
              heightRef = (rect.top <= 0) ? rect.bottom : rect.top,
              percentPeeking = ( attrs.peeking < 1 ) ? attrs.peeking : (attrs.peeking * .01);
          // console.log("widthRef: "+widthRef); 
          // console.log("heightRef: "+heightRef); 
          // console.dir("peeking: "+attrs.peeking);
          // console.dir("percent: "+percentPeeking);
          // console.log("area: "+(el.height * el.width * .01));
          // console.log("element.height: "+element.height());
            return ( 
              (widthRef > 0 && heightRef > 0) && 
              (widthRef * heightRef * .01) > (active.height * active.width * .01 * percentPeeking) 
            );
        }
    }
  }
}]);

