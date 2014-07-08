'use strict';

if (typeof console === 'undefined'){
	console = {};
	console.log = console.warn = console.debug = console.info 
		= console.dir = function () {};
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


require( ["Ls", "Word2ImgSlideshow", "jquery"],
  function(Ls, Word2ImgSlideshow ) {

	var main = function (imagePaths) {
		jQuery(document).ready( function () {	
			var Words2ImgPaths = [];
			for (var i=0; i < imagePaths.length; i++){
				var match = imagePaths[i].toLowerCase().match(/(\w+?)\.\w+$/);
				if (match && match[1]){
					Words2ImgPaths[ match[1] ] = imagePaths[i];
				}
			}

			new Word2ImgSlideshow ({ 
				el 				: '.slideshow',
				Words2ImgPaths	: Words2ImgPaths
			}).setupControls();
		});
	};

	new Ls({ 
		uri: 'img',
		next: main
	});
});

