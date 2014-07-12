'use strict';

define( ["Word2ImgSlideshow", "jquery"], function (Word2ImgSlideshow) {
	jQuery(document).ready( function () {
		var o = new Word2ImgSlideshow ({
			el : '.slideshow',
			uri: 'img'
		});
        o.setupControls();
	});
});

