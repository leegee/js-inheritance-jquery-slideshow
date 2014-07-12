'use strict';

define(['Base', 'jquery'], function (Base, jQuery) {

	var Slideshow = function (args) {
		console.group('Slideshow.constructor enter ', arguments);
		Base.call(this, args);

        if (this.slideModule === 'undefined'){
            throw new TypeError ('this.slideModule must be an object (AMD "Slide" module)');
        }
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
        slideModule     : null,
		slides 			: []	// Array[<Slide>]
	};

	Slideshow.prototype.addSlides = function () {
		var self = this;
		this.el.children().each( function (index, el) {
			self.slides.push(
				self.addSlide({
                    el: el,
                    index: index
                })
			);
			console.debug('Slideshow.addSlides loaded %d', index);
		});
        this.slides[ this.currentIndex ].in( this.direction );
        this.slides[ this.currentIndex ].show();
        this.setupControls();
	};

    Slideshow.prototype.addSlide = function (properties) {
        var slide = new this.slideModule (properties);
        slide.onAdd();
        return slide;
    };

	Slideshow.prototype.setupControls = function (args) {
		var self = this;
        self.controls = {};
        self.controls.el = jQuery('<nav id="controls"><div id="left"></div><div id="right"></div></nav>');
		self.controls.el.appendTo( self.el );
		self.controls.left  = jQuery('#left');
        self.controls.right = jQuery('#right');
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

	Slideshow.prototype.change = function (direction) {
        console.log('Slideshow.change enter for slide #%d, direction %d', this.currentIndex, direction);

		if (direction=='next'){
            this.direction = 1;
            console.log('Slideshow.change direction +1, currentIndex now [%d]', this.currentIndex);
		}
		else if (direction=='previous'){
			this.direction = -1;
            console.log('Slideshow.change direction -1, currentIndex now [%d]', this.direction, this.currentIndex);
		}
		else {
			this.direction = parseInt( direction );
		}

        var nextIndex  = this.currentIndex + this.direction;
		if (nextIndex == this.slides.length){
            console.log('Slideshow.change set currentIndex to 0');
			nextIndex = 0;
		}
		else if (nextIndex < 0){
			nextIndex = this.slides.length - 1;
            console.log('Slideshow.change setting currentIndex to the end');
		}

        var possNextIndex = this.nextIndexBeforeChange(nextIndex);
        if (possNextIndex !== this.currentIndex){
            this.slides[ this.currentIndex ].out();
            this.slides[ this.currentIndex ].hide();

            this.currentIndex = possNextIndex;
            if (this.currentIndex == 0){
                this.beforeShowFirst();
            } else if (this.currentIndex == this.slides.length -1){
                this.beforeShowFinal();
            }

    		console.log('Slideshow.change leave for slide #%d, direction', this.currentIndex, this.direction);
    		this.slides[ this.currentIndex ].in( this.direction );
    		this.slides[ this.currentIndex ].show();
        }
	};

    Slideshow.prototype.nextIndexBeforeChange = function (nextIndex) {
        return nextIndex;
    };

    Slideshow.prototype.afterChange = function () {};

    Slideshow.prototype.beforeShowFirst = function () {};
    Slideshow.prototype.beforeShowFinal = function () {};

	return Slideshow;
});
