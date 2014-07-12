'use strict';

define(['Slideshow', 'Ls'], function (Slideshow, Ls) {
	var Word2ImgSlideshow = function (properties) {
		console.group('Word2ImgSlideshow.constructor enter ', arguments);

		var self = this;
		properties.Words2ImgPaths = [];

		new Ls({
			uri: properties.uri,
		 	next: function (imagePaths) {
                console.group('Ls.next enter');
    			self.setWords2ImagePaths(imagePaths, properties);
    			Slideshow.call(self, properties);
                console.groupEnd('Ls.next leave');
            }
        });
        console.groupEnd('Word2ImgSlideshow.constructor done ', self);
	};

	Word2ImgSlideshow.prototype 						= Object.create( Slideshow.prototype );
	Word2ImgSlideshow.prototype.constructor 			= Word2ImgSlideshow;
	Word2ImgSlideshow.prototype.defaults 				= Slideshow.prototype.defaults;
	Word2ImgSlideshow.prototype.defaults.Words2ImgPaths = [];

    Word2ImgSlideshow.prototype.setWords2ImagePaths = function (imagePaths, properties) {
        console.group('Word2ImgSlideshow.setWords2ImagePaths enter');
        for (var i=0; i < imagePaths.length; i++){
            // Get the name before the extension:
            var match = imagePaths[i].toLowerCase().match(/(\w+?)\.\w+$/);
            if (match && match[1]){
                properties.Words2ImgPaths[ match[1] ] = imagePaths[i];
                console.log('Added [%s] as [%s]', match[1], imagePaths[i] )
            }
        }

        if (Object.keys( properties.Words2ImgPaths ).length == 0 ){
            console.warn('No properties.Words2ImgPaths found!', properties, imagePaths);
        }
        console.groupEnd('Word2ImgSlideshow.setWords2ImagePaths leave');
    };

	Word2ImgSlideshow.prototype.addSlide = function (properties) {
        properties.Words2ImgPaths = this.Words2ImgPaths;
        return Slideshow.prototype.addSlide.call(this, properties);
	};

	return Word2ImgSlideshow;
});
