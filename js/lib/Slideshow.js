'use strict';

define( [ 'Base', 'jquery' ], function ( Base, jQuery ) {

	var Slideshow = function ( args ) {
		console.group( 'Slideshow.constructor enter ', arguments );
		Base.call( this, args );

		if ( this.slideModule === 'undefined' ) {
			throw new TypeError( 'this.slideModule must be an object/prototype that suppoerts the interface in Slide.' );
		}
		this.addSlides();
		console.groupEnd( 'Slideshow.constructor leave ', this );
	};

	Slideshow.prototype = Object.create( Base.prototype );
	Slideshow.prototype.constructor = Slideshow;
	Slideshow.prototype.moduleName = 'Slideshow';
	Slideshow.prototype.defaults = {
		el: null, // HTML element that is the slideshow
		direction: 1,
		currentIndex: 0,
		startIndex: 0,
		slideModule: null,
		slides: [] // Array[<Slide>]
	};

	/** Adds the children of `this.el` as slides via `this.addSlide()`
    @return Void
*/
	Slideshow.prototype.addSlides = function () {
		var self = this;
		this.el.children().each( function ( index, el ) {
			self.slides.push(
				self.addSlide( {
					el: el,
					index: index
				} )
			);
			console.debug( 'Slideshow.addSlides loaded %d', index );
		} );
		this.slides[ this.currentIndex ].in( this.direction );
		this.slides[ this.currentIndex ].show();
		this.afterSlidesAdded();
	};

	/** @return Void */
	Slideshow.prototype.afterSlidesAdded = function () {
		this.setupControls();
	};

	/** @return An object of the prototype in `slideModule` */
	Slideshow.prototype.addSlide = function ( properties ) {
		var slide = new this.slideModule( properties );
		slide.onAdd();
		return slide;
	};

	/** @return Void */
	Slideshow.prototype.setupControls = function () {
		var self = this;
		self.controls = {};
		self.controls.el = jQuery( '<nav id="controls"><div class="previous"></div><div class="next"></div></nav>' );
		self.controls.el.appendTo( self.el );
		self.controls.previous = jQuery( '#controls > .previous' );
		self.controls.previous.on( 'click', function ( e ) {
			self.change( 'previous' );
		} );
		self.controls.previous.show();
		self.controls.next = jQuery( '#controls > .next' );
		self.controls.next.on( 'click', function ( e ) {
			self.change( 'next' );
		} );
		jQuery( window ).keyup( function ( e ) {
			self.keypressed( e );
		} );
		self.beforeChange( 0 );
	}

	/** Respond to a keyboard event.
    @param e [Event] - The key event.
    @return Void
*/
	Slideshow.prototype.keypressed = function ( e ) {
		var self = this;
		// Next slide
		switch ( e.keyCode ) {
		case 40: // down
		case 39: // right
		case 13: // enter
			e.preventDefault();
			self.change( 'next' );
			break;
		case 37: // left
		case 38: // up
		case 8: // backspace
		case 46: // del
			e.preventDefault();
			self.change( 'previous' );
			break;
		}
	};

	/** @param direction [int|string] - If an int, let it be the index of a slide. If a string, let it be 'previous' or 'next'.
    @return Void
*/
	Slideshow.prototype.change = function ( nextIndex ) {
		console.log( 'Slideshow.change enter for slide #%s, nextIndex [%s]', this.currentIndex, nextIndex );

		if ( nextIndex == 'next' ) {
			nextIndex = this.direction = 1;
			this.currentIndex + this.direction;
			console.log( 'Slideshow.change nextIndex +1, currentIndex now [%d]', this.currentIndex );
		} else if ( nextIndex == 'previous' ) {
			nextIndex = this.direction = -1;
			this.currentIndex + this.direction;
			console.log( 'Slideshow.change nextIndex -1, currentIndex now [%d]', this.nextIndex, this.currentIndex );
		} else {
			nextIndex = this.currentIndex + parseInt( nextIndex );
			this.direction = nextIndex > this.currentIndex ? 1 : -1;
			console.log( 'Slideshow.change set direction to ', this.direction );
		}

		if ( nextIndex >= this.slides.length ) {
			console.log( 'Slideshow.change currentIndex wraps to the start' );
			nextIndex = 0;
		} else if ( nextIndex < 0 ) {
			nextIndex = this.slides.length - 1;
			console.log( 'Slideshow.change currentIndex wraps to the end' );
		}

		this.changeToSlideIndex( nextIndex );
	};

	/** @param nextIndex [int] - The index of the slide to show.
    @event beforeChange - Accepts the input parameter, whose effective value it may change.
    @event beforeShowFirst
    @event beforeShowFinal
    @event afterChange
    @return Void
*/
	Slideshow.prototype.changeToSlideIndex = function ( nextIndex ) {
		console.log( 'Slideshow.changeToSlideIndex enter with nextIndex of ', nextIndex );
		var nextIndex = this.beforeChange( nextIndex );
		if ( nextIndex !== this.currentIndex ) {
			console.log( 'Slideshow.changeToSlideIndex nextIndex now ', nextIndex );
			this.slides[ this.currentIndex ].out();
			this.slides[ this.currentIndex ].hide();

			this.currentIndex = nextIndex;

			if ( this.currentIndex == 0 ) {
				this.beforeShowFirst();
			} else if ( this.currentIndex == this.slides.length - 1 ) {
				this.beforeShowFinal();
			}

			console.log( 'Slideshow.changeToSlideIndex prepare for slide number %d, direction', this.currentIndex, this.direction );
			this.slides[ this.currentIndex ].in( this.direction );
			this.slides[ this.currentIndex ].show();
			this.afterChange();
			console.log( 'Slideshow.changeToSlideIndex leave for slide #%d, direction', this.currentIndex, this.direction );
		}
	};

	/** No-op event.
    @param nextIndex [int] The index of the slide about to be shown.
    @return [int] The index of the slide to show next — 
    ie a value that will be assigned to `this.currentIndex`.
*/
	Slideshow.prototype.beforeChange = function ( nextIndex ) {
		return nextIndex;
	};

	/** No-op event.
    @return Void
*/
	Slideshow.prototype.afterChange = function () {};

	/** No-op event.
    @return Void
*/
	Slideshow.prototype.beforeShowFirst = function () {};

	/** No-op event.
    @return Void
*/
	Slideshow.prototype.beforeShowFinal = function () {};

	return Slideshow;
} );
