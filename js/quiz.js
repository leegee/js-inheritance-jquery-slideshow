'use strict';

define( ["QuizSlideshow", "jquery"], function (QuizSlideshow) {
	jQuery(document).ready( function () {
		new QuizSlideshow ({
			el : '.slideshow',
			uri: 'img'
		});
	});
});
