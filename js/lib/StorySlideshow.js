'use strict';

define([ 'QuizSlideshow', 'QuizSlide', 'Ls', 'jquery'],
function (QuizSlideshow,   QuizSlide,   Ls,   jQuery) {

	var StorySlideshow = function (properties) {
		console.group('StorySlideshow.constructor enter ', arguments);
		QuizSlideshow.call(this, properties);
        console.groupEnd('StorySlideshow.constructor done ', this);
	};

	StorySlideshow.prototype 			= Object.create( QuizSlideshow.prototype );
	StorySlideshow.prototype.constructor = StorySlideshow;

    StorySlideshow.prototype.setupControls = function (args) {
        QuizSlideshow.prototype.setupControls.call(this,args);
    };

    // Stop wrapping
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

	return StorySlideshow;
});
