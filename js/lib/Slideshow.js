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
		slides 			: []	// Array[<Slide>]
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

        this.change(0);
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

	Slideshow.prototype.change = function (direction) {
        console.log('Slideshow.change enter for slide #%d, direction %d', this.currentIndex, direction);
		this.slides[ this.currentIndex ].out();
		this.slides[ this.currentIndex ].hide();

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
            if (this.slides[ this.slides.length - 1].isFinal){
                console.log('Slideshow.change not changing currentIndex to 0, Slide.isFinal');
            } else {
                console.log('Slideshow.change set currentIndex to 0');
    			this.currentIndex = 0;
            }
		}
		else if (nextIndex < 0){
            if (this.slides[0].isFirst){
               console.log('Slideshow.change not setting currentIndex to the end, Slide.isFinal');
            } else {
    			this.currentIndex = nextIndexthis.slides.length - 1;
                console.log('Slideshow.change setting currentIndex to the end');
            }
		}
        else {
            this.currentIndex = nextIndex;
        }

        if (this.currentIndex == 0){
            this.beforeShowFirst();
        } else if (this.currentIndex == this.slides.length -1){
            this.beforeShowFinal();
        }

		console.log('Slideshow.change leave for slide #%d, direction', this.currentIndex, this.direction);
		this.slides[ this.currentIndex ].in( this.direction );
		this.slides[ this.currentIndex ].show();
	};

    Slideshow.prototype.beforeShowFirst = function () {
    };

    Slideshow.prototype.beforeShowFinal = function () {
        alert(1)
        this.slides.forEach( function (slide, index){
            console.info( index, slide )
        });
    };


	return Slideshow;
});
