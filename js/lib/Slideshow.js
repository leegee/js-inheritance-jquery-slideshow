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

	Slideshow.prototype.addSlide = function (args) {
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
		console.trace();
        console.log('Slideshow.change enter for slide #%d, direction %d', this.currentIndex, directionOrIndex);
		this.slides[ this.currentIndex ].out();
		this.slides[ this.currentIndex ].hide();

		if (directionOrIndex=='next'){
			if (this.slides[ this.currentIndex ].isFinal){
                console.log('Slideshow.change not showing next, Slide.isFinal');
            } else {
                this.direction = 1;
    			this.currentIndex += this.direction;
                console.log('Slideshow.change in not final, direction +1, currentIndex=[%d]', this.currentIndex);
            }
		}
		else if (directionOrIndex=='previous'){
            if (this.slides[ this.currentIndex ].isFirst){
                console.log('Slideshow.change not showing previous, Slide.isFirst');
            } else {
    			this.direction = -1;
    			this.currentIndex += this.direction;
                console.log('Slideshow.change in not first, direction now %d, currentIndex now ', this.direction, this.currentIndex);
            }
		}
		else {
			this.direction = 1;
			this.currentIndex = directionOrIndex;
		}

		if (this.currentIndex >= this.slides.length){
            var nextIndex = 0;
            if (this.slides[ nextIndex ].isFinal){
                console.log('Slideshow.change not setting currentIndex to 0, Slide.isFinal');
            } else {
                console.log('Slideshow.change set currentIndex to 0');
    			this.currentIndex = nextIndex;
            }
		}
		else if (this.currentIndex < 0){
            var nextIndex = this.slides.length - 1;
            if (this.slides[ nextIndex ].isFirst){
               console.log('Slideshow.change not setting currentIndex to the end, Slide.isFinal');
            } else {
    			this.currentIndex = nextIndex;
               console.log('Slideshow.change setting currentIndex to the end');
            }
		}

		console.log('Slideshow.change leave for slide #%d, direction', this.currentIndex, this.direction);
		this.slides[ this.currentIndex ].in( this.direction );
		this.slides[ this.currentIndex ].show();
	}

	return Slideshow;
});
