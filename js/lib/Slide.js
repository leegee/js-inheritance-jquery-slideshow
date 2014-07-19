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
		index		    : null,     // Index within the slideshow
		fx_speeds_default : 5000,
		transitions : {             // jquery.transition params
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

/** @return void */
    Slide.prototype.beforeHide  = function () {};

/** Hides the element.
    @return void
*/
    Slide.prototype.afterHide   = function () {
        this.el.hide();
    };

/** Hides the element.
    @return void
*/
    Slide.prototype.beforeShow   = function () {
        this.el.show();
    };

/** @return void */
    Slide.prototype.afterShow    = function () {};

/** @return void */
    Slide.prototype.beforeIn     = function () {};

/** @return void */
    Slide.prototype.afterIn      = function () {};

/** @return void */
    Slide.prototype.beforeOut    = function () {};

/** @return void */
    Slide.prototype.afterOut     = function () {};

/** To allow vertical alignment of the slide,
    the element in `this.el` is wrapped in a container,
    all the attributes of the wrapped element are transfered
    to the wrapper.
    @return Void
*/
    Slide.prototype.onAdd = function () {
        if ( this.el.length == 0){
            console.warn('Slide.el cannot be an empty element.');
            return;
        }

        this.el.show();

        // Store the clone's attributes, including style:
        var wrapper = jQuery('<section class="slide"></section>');
        wrapper.attr('data-slide', this.index );
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
    };

/** Applies to `this.el` the transition defined in `this.transitions.show`
    @event beforeShow
    @event afterShow
    @return Void
*/
	Slide.prototype.show = function () {
        this.beforeShow();
		this.el.transition( this.transitions.show );
        this.afterShow();
	};

/** Applies to `this.el` the transition defined in `this.transitions.hide`
    @event beforeHide
    @event afterHide
    @return Void
*/
	Slide.prototype.hide = function () {
        this.beforeHide();
		this.el.transition( this.transitions.hide );
        this.afterHide();
	};

/** Applies to `this.el` the transition defined in `this.transitions.out`
    @event beforeOut
    @event afterOut
    @return Void
*/
	Slide.prototype.out = function () {
        this.beforeOut();
		this.el.transition( this.transitions.out );
        this.afterOut();
	};

/** Applies to `this.el` the transition defined in `this.transitions.in`
    @event beforeIn
    @event afterIn
    @return Void
*/
	Slide.prototype.in = function () {
        this.beforeIn();
        this.el.transition( this.transitions.in );
        this.afterIn();
	};

	return Slide;
});

