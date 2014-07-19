'use strict';

/** A StorySlideshow is a slideshow navigated only
    by internal hyperlinks to the slide elements.
    Thus all slides must be supplied with an element
    tha thas an id attribute.
*/
define([ 'QuizSlideshow', 'QuizSlide', 'jquery'],
function (QuizSlideshow,   QuizSlide,   jQuery) {

	var StorySlideshow = function (properties) {
		console.group('StorySlideshow.constructor enter ', arguments);
		QuizSlideshow.prototype.parent.call(this, properties);
        console.groupEnd('StorySlideshow.constructor done ', this);
	};

	StorySlideshow.prototype 			 = Object.create( QuizSlideshow.prototype );
	StorySlideshow.prototype.constructor = StorySlideshow;
    StorySlideshow.prototype.parent      = QuizSlideshow;

    StorySlideshow.prototype.setupControls = function () {};

    // Stop wrapping ...because...?
    // Does this need to exist?
    StorySlideshow.prototype.beforeChange = function (nextIndex) {
        if (this.currentIndex <= 0 && nextIndex >= this.slides.length -1 ) {
            nextIndex = 0;
        } else if (this.currentIndex >= this.slides.length -1 && nextIndex <= 0){
            nextIndex = this.slides.length -1;
        }

        if (nextIndex <= 0){
            this.controls.previous.hide();
            this.controls.next.show();
        } else if (nextIndex >= this.slides.length -1){
            this.controls.previous.show();
            this.controls.next.hide();
        } else {
            this.controls.previous.show();
            this.controls.next.show();
        }

        this.progress( nextIndex );
        return nextIndex;
    };

/** This subclass is as the superclass, but
    does not allow 'previous' and 'next' as arguments.
    @args nextIndex [integer] Index of a slide
    @return Void
    @throws TypeError If the parameter is invalid.
*/
    StorySlideshow.prototype.change = function (nextIndex) {
        console.log('StorySlideshow.change enter for slide #%d, nextIndex %d', this.currentIndex, nextIndex);

        if (parseInt(nextIndex) !== nextIndex || parseInt(nextIndex) < 0){
            console.trace();
            throw new TypeError('Parameter must be a slide index, hence a positive integer you supplied a '
                +(typeof nextIndex) +" — ["+ nextIndex +"]"
            );
        }

        info( this.parent )
        info( this.parent.prorotype )
        this.parent.call(this, properties);
    };


	return StorySlideshow;
});
