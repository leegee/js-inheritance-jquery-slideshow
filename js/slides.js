'use strict';

define( ["Slideshow", "jquery"], function (Slideshow, jQuery) {
	jQuery(document).ready( function () {
		new Slideshow ({
			el : '.slideshow',
			uri: 'img'
		});
	});
});
