module.exports = function(app) {
  app.directive('scaleBox',['$window','uuid4','$timeout', function($window, uuid4, $timeout){
    var dir = function (scope, element, attr) {
      var win = angular.element($window);
      var viewbox_elm = element; // outer element that viewbox directive is applied to

      var element_to_scale = element.find('div.main').first(); // may not be present in DOM yet

      var scale_element_to_viewbox = function(){
        element_to_scale = element.find('div.main').first(); // re-search for element since DOM has mutated
        if (!element_to_scale[0]) return;
        viewbox_elm.height(viewbox_elm.parent().height());
        viewbox_elm.width(viewbox_elm.parent().width());
        var transform_origin = '0 0';
        var w = element_to_scale[0].clientWidth; // padding so border doesn't get cut off
        var h = element_to_scale[0].clientHeight; // padding so border doesn't get cut off
        var bw = viewbox_elm[0].clientWidth;
        var bh = viewbox_elm[0].clientHeight;
        console.log('h',h);
        console.log('bh',bh);

        var wRatio = bw / w;
        var hRatio = bh / h;
        // console.log('wRatio',wRatio);
        console.log('hRatio',hRatio);
        var mRatio = Math.min(wRatio, hRatio);
        var transX = Math.abs(bw - (w * mRatio)) / 2;
        var transY = Math.abs(bh - (h * mRatio)) / 2;

        var reversed_width = w/(w * mRatio);
        var reversed_height = h/(h * mRatio);
        var reversedScaleRatio = Math.max(reversed_width, reversed_height);
        scope.reversedScaleRatio = reversedScaleRatio;

        if(mRatio > 1){
          mRatio = 1;
          transX = Math.abs(bw - (w * mRatio)) / 2;
          transY = Math.abs(bh - (h * mRatio)) / 2;
          scope.reversedScaleRatio = 1;
        }

        scope.scaleRatio = mRatio;

        element_to_scale.css({
          'transform': 'scale(' + mRatio + ')',
          'transform-origin': transform_origin
        });

        scaleCanvasWrapper(element_to_scale, mRatio);
      };

      // resize parent wrapper element to fit the scaled canvas 
      // because canvas is transform:scaled which doesn't change pixel size in the dom
      function scaleCanvasWrapper(canvasElement, mRatio) {
        var wrapper = canvasElement.closest('.scale-wrapper');
        var newHeight = canvasElement.height() * mRatio;
        var newWidth = canvasElement.width() * mRatio;
        wrapper.height(newHeight);
        wrapper.width(newWidth);
      }

      win.bind('resize', scale_element_to_viewbox);

      $timeout(scale_element_to_viewbox, 0);

    };

    return {
      scope: false,
      link: dir
    };
  }]);
};
