'use strict';

define( ["Slideshow", "Slide", "jquery"], function (Slideshow, Slide, jQuery) {
	jQuery(document).ready( function () {
		var o = new Slideshow ({
			el           : '.slideshow',
			uri          : 'img',
            slideModule  : Slide
		});
	});
});
