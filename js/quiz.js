'use strict';

define( ["QuizSlideshow", "QuizSlide", "jquery"],
function (QuizSlideshow,   QuizSlide,   Query
) {
	jQuery(document).ready( function () {
		var o = new QuizSlideshow ({
			el : '.slideshow',
			uri: 'img',
            slideModule  : QuizSlide
		});
	});
});
