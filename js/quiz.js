'use strict';

(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

    require.config({
    	baseUrl: "js/",
    	paths: {
    		"Modernizer": 		 "vendor/modernizr-2.6.2.min",
            "jquery": 			 "vendor/jquery-1.10.2.min",
            "jquery-transit": 	 "vendor/jquery.transit.min",
            "Ls": 				 "Ls",
            "Base": 	 		 "Base",
            "Wod2ImgSlideshow":  "Wod2ImgSlideshow",
            "QuizSlideshow":     "QuizSlideshow",
            "Wod2ImgSlide": 	 "Wod2ImgSlide",
            "QuizSlide": 	     "QuizSlide"
    	},
    	waitSeconds: 1
    });


    require( ["QuizSlideshow", "jquery"], function (QuizSlideshow) {
    	jQuery(document).ready( function () {
    		new QuizSlideshow ({
    			el : '.slideshow',
    			uri: 'img'
    		});
    	});
    });

}());
