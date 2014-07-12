'use strict';

define( ["Word2ImgSlideshow", "Word2ImgSlide", "jquery"],
function (Word2ImgSlideshow, Word2ImgSlide, jQuery) {

	jQuery(document).ready( function () {
		var o = new Word2ImgSlideshow ({
			el          : '.slideshow',
			uri         : 'img',
            slideModule : Word2ImgSlide
		});
	});

});
