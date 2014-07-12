'use strict';

define(['Base', 'jquery', 'jquery-transit'], function (Base, jQuery) {
	var Slide = function (args) {
		console.group('Slide.constructor enter ', arguments);
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
		console.groupEnd('Slide.constructor leave ', this);
	};

	Slide.prototype = Object.create( Base.prototype );
	Slide.prototype.constructor = Slide; // .prototype.constructor;
	Slide.prototype.defaults = {
		el 			: null, 	// HTML element that is the slide
		index		: null,		// Index within the slideshow
		beforeChange 	: function () {},
        afterChange     : function () {},
        beforeHide      : function () {},
        afterHide       : function () {},
        beforeShow      : function () {},
        afterShow       : function () {},
        beforeIn        : function () {},
        afterIn         : function () {},
        beforeOut       : function () {},
        afterOut        : function () {},
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
        this.beforeChange.call(this);
        this.beforeShow.call(this);
		this.el.transition( this.transitions.show );
        this.afterShow.call(this);
        this.afterChange.call(this);
	}

	Slide.prototype.hide = function () {
        this.beforeChange.call(this);
        this.beforeHide.call(this);
		this.el.transition( this.transitions.hide );
        this.afterHide.call(this);
        this.afterChange.call(this);
	}

	Slide.prototype.out = function () {
        this.beforeChange.call(this);
        this.beforeOut.call(this);
		this.el.transition( this.transitions.out );
        this.afterOut.call(this);
		this.afterChange.call(this);
	}

	Slide.prototype.in = function () {
        this.beforeChange.call(this);
        this.beforeIn.call(this);
        this.el.transition( this.transitions.in );
        this.afterIn.call(this);
	    this.afterChange.call(this);
	}

	return Slide;
});

