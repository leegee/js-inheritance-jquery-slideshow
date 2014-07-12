'use strict';

define(['Base', 'Slide', 'jquery'], function (Base, Slide, jQuery) {

	var Slideshow = function (args) {
		console.group('Slideshow.constructor enter ', arguments);
		Base.call(this, args);
		this.addSlides();
		console.groupEnd('Slideshow.constructor leave ', this);
	};

	Slideshow.prototype = Object.create( Base.prototype	 );
	Slideshow.prototype.constructor = Slideshow;
	Slideshow.prototype.defaults = {
		el 				: null,	// HTML element that is the slideshow
		direction		: 1,
		currentIndex 	: 0,
		startIndex 		: 0,
		slides 			: []	// [<Slide>]
	};

	Slideshow.prototype.addSlides = function () {
		var self = this;
		this.el.children().each( function (i, el) {
			self.slides.push(
				self.addSlide({
					el 		: el,
					index 	: i,
					afterChange: function () { /** **/ }
				})
			);
			console.debug('Slideshow.addSlides loaded %d', i);
		});
		this.slides[ this.startIndex ].in( this.direction );
		this.slides[ this.startIndex ].show();
	};

	Slideshow.prototype.defaults.addSlide = function (args) {
		var slide = new Slide(args);
		slide.onAdd();
		return slide;
	};

	Slideshow.prototype.setupControls = function (args) {
		var self = this;
		self.ctrls = jQuery('<div id="controls"><div id="left"></div><div id="right"></div></div>');
		self.ctrls.appendTo( self.el );
		jQuery('#left').on('click', function (e) {
			self.change('previous');
		});
		jQuery('#right').on('click', function (e) {
			self.change('next');
		});
		jQuery(window).keyup( function (e) {
			self.keypressed(self, e);
		});
	}

	Slideshow.prototype.keypressed = function (self, e) {
		var self = this;
		// Next slide
		switch (e.keyCode){
			case 40: // down
			case 39: // right
			case 32: // space
			case 13: // enter
				e.preventDefault();
				self.change('next');
				break;
			case 37: // left
			case 38: // up
			case 8 : // backspace
			case 46: // del
				e.preventDefault();
				self.change('previous');
				break;
		}
	};

	Slideshow.prototype.change = function (directionOrIndex) {
		console.log('Slideshow.change slide #%d out', this.currentIndex);
		this.slides[ this.currentIndex ].out();
		this.slides[ this.currentIndex ].hide();

		if (directionOrIndex=='next'){
			this.direction = 1;
			this.currentIndex += this.direction;
		}
		else if (directionOrIndex=='previous'){
			this.direction = -1;
			this.currentIndex += this.direction;
		}
		else {
			this.direction = 1;
			this.currentIndex = directionOrIndex;
		}

		if (this.currentIndex >= this.slides.length){
			this.currentIndex = 0;
		}
		else if (this.currentIndex < 0){
			this.currentIndex = this.slides.length -1
		}

		console.log('Slideshow.change slide #%d in', this.currentIndex);

		this.slides[ this.currentIndex ].in( this.direction );
		this.slides[ this.currentIndex ].show();
	}

	return Slideshow;
});
