'use strict';

define(['Word2ImgSlideshow', 'QuizSlide', 'Ls'], function (Word2ImgSlideshow, QuizSlide, Ls) {

	var QuizSlideshow = function (properties) {
		console.group('QuizSlideshow.constructor enter ', arguments);

		var self = this;
		properties.Words2ImgPaths = [];

		new Ls({
			uri: properties.uri,
		 	next: function (imagePaths) {
                self.setWords2ImagePaths(imagePaths, properties);
    			Word2ImgSlideshow.call(self, properties);
    		}
        });

        console.groupEnd('Quiz Slideshow.constructor done ', this);
	};

	QuizSlideshow.prototype 			= Object.create( Word2ImgSlideshow.prototype );
	QuizSlideshow.prototype.constructor = QuizSlideshow;

	return QuizSlideshow;
});
