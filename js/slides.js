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
        "Slide": 	         "Slide"
	},
	waitSeconds: 1
});


require( ["Slideshow", "jquery"], function (Slideshow) {
	jQuery(document).ready( function () {
		new Slideshow ({
			el : '.slideshow',
			uri: 'img'
		});
	});
});

