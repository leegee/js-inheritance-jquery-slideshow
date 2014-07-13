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
        console.groupEnd('Slide.constructor leave ', this);
	};

	Slide.prototype = Object.create( Base.prototype );
	Slide.prototype.constructor = Slide; // .prototype.constructor;
	Slide.prototype.defaults = {
		el 			    : null, 	// HTML element that is the slide
		index		    : null,		// Index within the slideshow
		fx_speeds_default : 5000,
		transitions : {
			show : {
				queue:    false,
				opacity:  1,
				scale: 	  1,
				duration: 1000,
				complete: function () {}
			},
			hide : {
				queue:    false,
				opacity:  0,
				scale: 	  2,
				duration: 1000,
				complete: function () {}
			},
			in : {
				queue:    false,
				easing:   'in',
				duration: 2000,
				complete: function () {}
			},
			out : {
				queue: false,
				easing: 'in',
				duration: 2000,
				complete: function () {}
			}
		}
	};

    Slide.prototype.beforeHide  = function () {};
    Slide.prototype.afterHide   = function () {
        this.el.hide();
    };
    Slide.prototype.beforeShow   = function () {
        this.el.show();
    };
    Slide.prototype.afterShow    = function () {};
    Slide.prototype.beforeIn     = function () {};
    Slide.prototype.afterIn      = function () {};
    Slide.prototype.beforeOut    = function () {};
    Slide.prototype.afterOut     = function () {};

    Slide.prototype.onAdd = function () {
        console.info(this)
        this.el.show();

        // Store the clone's attributes, including style:
        var wrapper = jQuery('<section></section>');

        for (var attributes = this.el.get(0).attributes,
                 i = 0;
                 i < attributes.length;
                 i ++
        ){
            if (typeof attributes[i] !== 'undefined'){
                wrapper.attr( attributes[i].nodeName, attributes[i].nodeValue );
                this.el.removeAttr( attributes[i].nodeName );
            }
        }

        wrapper.attr('id', this.el.attr('id'));
        this.el.removeAttr('id');

        var clone = this.el.clone(true,true); // event and data deep copy
        wrapper.append( clone );

        this.el.replaceWith( wrapper );
        this.el = wrapper;

        this.el.hide();
        this.el.addClass('slide');
        this.el.attr('data-slide', this.index );
    };

	Slide.prototype.show = function () {
        this.beforeShow();
		this.el.transition( this.transitions.show );
        this.afterShow();
	};

	Slide.prototype.hide = function () {
        this.beforeHide();
		this.el.transition( this.transitions.hide );
        this.afterHide();
	};

	Slide.prototype.out = function () {
        this.beforeOut();
		this.el.transition( this.transitions.out );
        this.afterOut();
	};

	Slide.prototype.in = function () {
        this.beforeIn();
        this.el.transition( this.transitions.in );
        this.afterIn();
	};

	return Slide;
});

