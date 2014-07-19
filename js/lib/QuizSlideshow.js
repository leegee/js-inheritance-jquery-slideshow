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
                console.group('Ls.next enter');
                self.setWords2ImagePaths(imagePaths, properties);
                Word2ImgSlideshow.prototype.parent.call(self,properties);
                self.createReportEl();
                console.groupEnd('Ls.next leave');
            }
        });

        console.groupEnd('QuizSlideshow.constructor done ', this);
	};

	QuizSlideshow.prototype 			= Object.create( Word2ImgSlideshow.prototype );
	QuizSlideshow.prototype.constructor = QuizSlideshow;
    QuizSlideshow.prototype.parent      = Word2ImgSlideshow;

    QuizSlideshow.prototype.keypressed = function (e) {
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

    QuizSlideshow.prototype.createReportEl = function () {
        this.el.append( '<section id="report-slide"><figure id="report"></figure></section>' );
        this.slides.push(
            this.addSlide({
                el: jQuery('#report-slide'),
                index: this.slides.length // xxx get rid of index
            })
        );
        this.reportEl = jQuery('#report');
    }

    QuizSlideshow.prototype.setupControls = function (args) {
        Word2ImgSlideshow.prototype.setupControls.call(this,args);
        var holder = jQuery('<div class="progress-bar"><span class="progress"></span></div>');
        this.el.append(holder);
        this._progressEl = jQuery('.progress-bar > *');
        this.progress();
    };

    QuizSlideshow.prototype.progress = function () {
        if (typeof this._progressEl !== 'undefined'){
            var self = this;
            console.assert( typeof this.currentIndex === 'number' );
            this._progressEl.each( function () {
                jQuery(this).css('width',
                    (100 / (self.slides.length / (1 + self.currentIndex) ))
                    + '%'
                 );
            });
        }
    };

/** Behaves like the superclass except does not 'wrap'
    the last and first slides.
    @param nextIndex [int] The index of the slide about to be shown.
    @return [int] The index of the slide to show next.
*/
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

    QuizSlideshow.prototype.afterChange = function (nextIndex) {
        this.progress();
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

        this.reportEl.append(
            '<p>'+
            'You gave '+(totals.total)+' answers to '+
            totals.slides+' questions'+(totals.slides==1?'':'s')+':<br/>'+
            (totals.passed) +' '+ (totals.passed==1? 'was':'were') + ' correct,<br/>'+
            (totals.failed) +' '+ (totals.failed==1? 'was':'were') + ' incorrect.'+
            '</p>'
         )
        console.groupEnd('QuizSlideshow.beforeShowFinal leave');
    };

	return QuizSlideshow;
});
