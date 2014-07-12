'use strict';

if (typeof console === 'undefined'){
	console = {};
	console.log = console.warn = console.debug = console.info
		= console.dir = console.trace = function () {};
}

require.config({
	baseUrl: "js/",
	paths: {
		"Modernizer": 		 "vendor/modernizr-2.6.2.min",
        "jquery": 			 "vendor/jquery-1.10.2.min",
        "jquery-transit": 	 "vendor/jquery.transit.min",
        "Plugins": 			 "plugins",
        "Ls": 				 "Ls",
        "Base": 	 		 "Base",
        "Slideshow": 	 	 "Slideshow",
        "Word2ImgSlideshow": "Word2ImgSlideshow",
        "Slide": 		 	 "Slide",
        "Word2ImgSlide": 	 "Word2ImgSlide"
	},
	waitSeconds: 1
});


require( ["Word2ImgSlideshow", "jquery"], function (Word2ImgSlideshow) {
	jQuery(document).ready( function () {
		new Word2ImgSlideshow ({
			el : '.slideshow',
			uri: 'img'
		});
	});
});

