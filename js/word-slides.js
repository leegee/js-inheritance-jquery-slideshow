'use strict';

define( ["Word2ImgSlideshow", "jquery"], function (Word2ImgSlideshow) {
	jQuery(document).ready( function () {
		new Word2ImgSlideshow ({
			el : '.slideshow',
			uri: 'img'
		});
	});
});

