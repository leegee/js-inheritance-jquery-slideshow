'use strict';

define(['Slideshow', 'Word2ImgSlide', 'Ls'], function (Slideshow, Word2ImgSlide, Ls) {

	var Word2ImgSlideshow = function (args) {
		console.log('Word2ImgSlideshow.constructor enter ', arguments);
		
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
			
			Slideshow.call(self, args);
			self.setupControls();
			console.log('Word2ImgSlideshow.constructor done ', self);
		}});
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
