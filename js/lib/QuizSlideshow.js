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
    QuizSlideshow.prototype.beforeShowFirst = function () {};

    // Stop wrapping
    QuizSlideshow.prototype.nextIndexBeforeChange = function (nextIndex) {
        console.info( this.currentIndex, this.slides.length -1, nextIndex);
        if (this.currentIndex <= 0 && nextIndex >= this.slides.length -1 ) {
            return 0;
        } else if (this.currentIndex >= this.slides.length -1 && nextIndex <= 0){
            return this.slides.length -1;
        }
        return nextIndex;
    };

	return QuizSlideshow;
});
