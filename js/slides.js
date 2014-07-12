'use strict';

define( ["Slideshow", "jquery"], function (Slideshow, jQuery) {
	jQuery(document).ready( function () {
		var o = new Slideshow ({
			el : '.slideshow',
			uri: 'img'
		});
        o.setupControls();
	});
});
