'use strict';

define(['Base', 'jquery', 'jquery-transit'], function (Base, jQuery) {
	var Slide = function (args) {
		console.log('Slide.constructor enter ', arguments);
		var self = this;
		Base.call(this, args);
		if ( ! this.el instanceof jQuery){
			throw new TypeError('Expected arguments[el] to be an instanceof jQuery');
		}

		jQuery.fx.speeds._default = this.fx_speeds_default; 

		this.onAdd = function () {
			// Store the clone's attributes, including style:
			var wrapper = jQuery('<section></section>');
			var attributes = self.el.prop("attributes");
			jQuery.each(attributes, function () {
				if (typeof this != 'undefined'){
					wrapper.attr( this.name, this.value );
					self.el.removeAttr( this.name );
				}
			});

			var clone = self.el.clone(true,true); // event and data deep copy
			wrapper.append( clone );

			self.el.replaceWith( wrapper );
			self.el = wrapper;

			self.el.addClass('slide');
			self.el.attr('data-slide', self.index );
		};
		console.log('Slide.constructor leave ', this);
	};

	Slide.prototype = Object.create( Base.prototype );
	Slide.prototype.constructor = Slide; // .prototype.constructor;
	Slide.prototype.defaults = {
		el 			: null, 	// HTML element that is the slide 
		index		: null,		// Index within the slideshow
		onChange 	: function () {},
		fx_speeds_default : 5000,
		transitions : {
			show : {
				queue:    false,
				opacity:  1,
				scale: 	  1,
				duration: 1000,
				complete: function() { /* ... */ }
			},
			hide : {
				queue:    false,
				opacity:  0,
				scale: 	  2,
				duration: 1000,
				complete: function() { /* ... */ }
			},
			in : {
				queue:    false,
				easing:   'in',
				duration: 2000,
				complete: function() { /* ... */ }
			},
			out : {
				queue: false,
				easing: 'in',
				duration: 2000,
				complete: function() { /* ... */ }
			}
		}
	};

	Slide.prototype.show = function () {
		this.el.transition( this.transitions.show );
		this.onChange.call(this);
	}

	Slide.prototype.hide = function () {
		this.el.transition( this.transitions.hide );
	    this.onChange.call(this);
	}

	Slide.prototype.out = function () {
		this.el.transition( this.transitions.out );
		this.onChange.call(this);
	}

	Slide.prototype.in = function () {
		this.el.transition( this.transitions.in );
	    this.onChange.call(this);
	}

	return Slide;
});

