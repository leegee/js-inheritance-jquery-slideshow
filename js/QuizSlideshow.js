'use strict';

define(['Word2ImgSlideshow', 'QuizSlide', 'Ls'], function (Word2ImgSlideshow, QuizSlide, Ls) {

	var QuizSlideshow = function (args) {
		console.log('QuizSlideshow.constructor enter ', arguments);

		var self = this;
		args.Words2ImgPaths = [];

		new Ls({
			uri: args.uri,
		 	next: function (imagePaths) {
			for (var i=0; i < imagePaths.length; i++){
				// Get the name before the extension:
				var match = imagePaths[i].toLowerCase().match(/(\w+?)\.\w+$/);
				if (match && match[1]){
					args.Words2ImgPaths[ match[1] ] = imagePaths[i];
				}
			}

			if ( args.Words2ImgPaths.length == 0 ){
				console.warn('No images found!', this);
			}

			Word2ImgSlideshow.call(self, args);
			self.setupControls();
			console.log('Slideshow.constructor done ', self);
		}});
	};

	QuizSlideshow.prototype 			= Object.create( Word2ImgSlideshow.prototype );
	QuizSlideshow.prototype.constructor = QuizSlideshow;

	QuizSlideshow.prototype.defaults.addSlide = function (args) {
		var slide = new QuizSlide (jQuery.extend(args, {
			Words2ImgPaths : this.Words2ImgPaths
		}));
		slide.onAdd();
		return slide;
	};

	return QuizSlideshow;
});
