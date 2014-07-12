'use strict';

define( ["QuizSlideshow", "jquery"], function (QuizSlideshow) {
	jQuery(document).ready( function () {
		var o = new QuizSlideshow ({
			el : '.slideshow',
			uri: 'img'
		});
        o.setupControls();
	});
});
