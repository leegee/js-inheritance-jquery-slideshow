'use strict';

define(['QuizSlide'], function (QuizSlide) {

	var QuizSlide = function (properties) {
		console.group('StorySlide.constructor enter ', arguments);
        var self = this;

        if ( ! args.el instanceof jQuery){
            throw new TypeError('Expected arguments[el] to be an instanceof jQuery');
        }
        if ( ! args.el.attr('id')){
            throw new TypeError('Argument "el" has no "id" attribute');
        }

		QuizSlide.call(this, properties);
	    // this.el.html(
	    // 	this.walkDOM( this.el.get(0) )
	    // );
	    console.groupEnd('StorySlide.constructor leave');
	};

	StorySlide.prototype = Object.create( QuizSlide.prototype );
	StorySlide.prototype.constructor = StorySlide;

	StorySlide.prototype.addSlide = function (args) {
		if ( ! args instanceof Object){
			throw new TypeError('arguments[0] should be an instanceof Object');
		}
        QuizSlide.addSlide.call(this, args);
		console.log('QuizSlide.addSlide [%d]', this.startIndex);
	};

    StorySlide.prototype.defaults = QuizSlide.prototype.defaults;
    StorySlide.prototype.defaults.correctAttr = 'data-correct';

	return QuizSlide;
});
