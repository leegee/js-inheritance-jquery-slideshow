'use strict';

define( ["StorySlideshow", "StorySlide", "jquery"],
function (QuizSlideshow,   QuizSlide,   Query ) {
	jQuery(document).ready( function () {
		var o = new StorySlideshow ({
			el : '.slideshow',
			uri: 'img',
            slideModule  : StorySlide
		});
	});
});
