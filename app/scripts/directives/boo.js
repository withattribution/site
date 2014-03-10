'use strict';

/*
 *  This is a quick and dirty directive that encapsulates the hiding and showing of 'heavy'
 *  DOM objects, in this example it's a gif that has the following HTML
 *   
 *   <boo peeking="25">
 *     <img class="large-backdrop" src="http://aok-assets.s3.amazonaws.com/aok-site/images/dart.gif">
 *     <img class="large-backdrop" src="http://aok-assets.s3.amazonaws.com/aok-site/images/dartUnderLayer.jpg">
 *   </boo>
 *   
 *  The first <img> tag contains the "heavy" gif and the second is the underlay replacement image
 *  the peeking attribute is the percentage of the heavy element that should be visible before the 
 *  underlay replaces the heavy element. The only other attribute currently is the initialize attribute
 *  which can be set to false if for some reason the initial hide/show logic should not be forcibly triggered
 *  on DOM load.
*/

angular.module('aok-boo',[])
  .directive('boo', ['$window', function($window){
    return {
      restrict: 'E',
      scope: {
        peeking: '@'
      },
      link: function( scope, element, attrs) {

        var first = element[0].firstElementChild, 
            last = element[0].lastElementChild,
            active = first;

        function elementVisibilityMayChange() {
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
          };
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
          // console.log("area: "+(active.height * active.width * .01));
          // console.log("element.height: "+element.height());
            return ( 
              (widthRef > 0 && heightRef > 0) && 
              (widthRef * heightRef * .01) > (active.height * active.width * .01 * percentPeeking) 
            );
        }

        var handler = elementVisibilityMayChange();

        if ( attrs.initialize === undefined || attrs.initialize == true ) { handler(); }

        $(window).on('DOMContentLoaded load resize scroll aok-overlay-exit', handler );

        element.on('$destroy', function() {
          $(window).off('DOMContentLoaded load resize scroll aok-overlay-enter aok-overlay-exit', handler );
        });
        /*
         * optional window events that are used to hide "heavy" elements
         * aok-overlay-enter & aok-overlay-exit
         * when an overlay is covering them ( yes, it is kinda hacky )
         * should use a fancier way to detect if element is visible 
         * like this fellow --> http://jsfiddle.net/AndyE/vGCay/2/
        */
        $(window).on('aok-overlay-enter', function(e){
          angular.element(first).css({'display':'none'});
          angular.element(last).css({'display':'block'});

          active = last;
        });
    }
  }
}]);

