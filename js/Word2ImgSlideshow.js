'use strict';

define(['Slideshow', 'Word2ImgSlide'], function (Slideshow, Word2ImgSlide) {

	var Word2ImgSlideshow = function (args) {
		console.log('Word2ImgSlideshow.constructor enter ', arguments);
		Slideshow.call(this, args);
		console.log('Word2ImgSlideshow.constructor leave ', this);
	};

	Word2ImgSlideshow.prototype 						= Object.create( Slideshow.prototype );
	Word2ImgSlideshow.prototype.constructor 			= Word2ImgSlideshow;
	Word2ImgSlideshow.prototype.defaults 				= Slideshow.prototype.defaults;
	Word2ImgSlideshow.prototype.defaults.Words2ImgPaths = [];

	Word2ImgSlideshow.prototype.defaults.addSlide = function (args) {
		var slide = new Word2ImgSlide (jQuery.extend(args, {
			Words2ImgPaths : this.Words2ImgPaths
		}));
		slide.onAdd();
		return slide;
	};

	return Word2ImgSlideshow;
});
