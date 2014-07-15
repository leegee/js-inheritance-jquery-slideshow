'use strict';

define( ["StorySlideshow", "StorySlide", "jquery"],
function (StorySlideshow,   StorySlide,  jQuery ) {
	jQuery(document).ready( function () {
		var o = new StorySlideshow ({
			el : '.slideshow',
			uri: 'img',
            slideModule  : StorySlide
		});
	});
});
