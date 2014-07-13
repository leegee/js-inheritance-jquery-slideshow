'use strict';

define([ 'Word2ImgSlideshow', 'QuizSlide', 'Ls', 'jquery'],
function (Word2ImgSlideshow,   QuizSlide,   Ls,   jQuery) {

	var QuizSlideshow = function (properties) {
		console.group('QuizSlideshow.constructor enter ', arguments);

		var self = this;
		properties.Words2ImgPaths = [];

		new Ls({
			uri: properties.uri,
		 	next: function (imagePaths) {
                self.setWords2ImagePaths(imagePaths, properties);
    			Word2ImgSlideshow.call(self, properties);
    		}
        });

        console.groupEnd('Quiz Slideshow.constructor done ', this);
	};

	QuizSlideshow.prototype 			= Object.create( Word2ImgSlideshow.prototype );
	QuizSlideshow.prototype.constructor = QuizSlideshow;

    QuizSlideshow.prototype.keypressed = function (self, e) {
        var self = this;
        // Next slide
        switch (e.keyCode){
            case 13: // enter
                e.preventDefault();
                self.change('next');
                break;
            case 8 : // backspace
            case 46: // del
                e.preventDefault();
                self.change('previous');
                break;
        }
    };

    // Stop wrapping
    QuizSlideshow.prototype.beforeChange = function (nextIndex) {
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

        return nextIndex;
    };

    QuizSlideshow.prototype.beforeShowFinal = function () {
        console.group('QuizSlideshow.beforeShowFinal enter');
        var totals = {
            passed  : 0,
            failed  : 0,
            total   : 0,
            slides  : this.slides.length
        };

        this.slides.forEach( function (slide, index){
            console.log("Slide #%d:", index, slide);
            var score = slide.getScore();
            totals.passed += score.passed;
            totals.failed += score.failed;
            totals.total  += score.total;
        });

        var report = this.slides[ this.slides.length -1].el.find('#report');
        if (report.length == 0){
            report = this.slides[ this.slides.length -1].el.find(':first-child');
            report = jQuery(report[0]).append('<aside id="#report"></aside>');
        }
        report.html(
            'You gave '+(totals.total)+' answers to '+
            totals.slides+' questions'+(totals.slides==1?'':'s')+':<br/>'+
            (totals.passed) +' '+ (totals.passed==1? 'was':'were') + ' correct,<br/>'+
            (totals.failed) +' '+ (totals.failed==1? 'was':'were') + ' incorrect.'
         )
        console.groupEnd('QuizSlideshow.beforeShowFinal leave');
    };

	return QuizSlideshow;
});
