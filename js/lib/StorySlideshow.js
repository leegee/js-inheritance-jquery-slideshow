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
		this.anchors2slides = {};
        QuizSlideshow.prototype.constructor.call(this, properties);
        console.groupEnd('StorySlideshow.constructor done ', this);
	};

	StorySlideshow.prototype 			 = Object.create( QuizSlideshow.prototype );
	StorySlideshow.prototype.constructor = StorySlideshow;
    StorySlideshow.prototype.moduleName  = 'StorySlidehosw';

/** Capture clicks on internal hyperlinks
    @return Void
*/
    StorySlideshow.prototype.afterSlidesAdded = function () {
        var self = this;

        this.slides.forEach( function (slide) {
            var id = null; // id or name?
            ['id', 'slide'].forEach( function (attr) {
                if (slide.el.is("["+attr+"]")){
                    id = slide.el.attr(attr);
                    return; // ie break
                }
            });
            if (id === null){
                console.error('Slide has no id or name attribute: ', slide);
                throw new TypeError('No id or name attribute on slide element');
            }
            self.anchors2slides[ id ] = slide;
        });

        jQuery( '#' + this.el.attr('id') +' a').on('click', function (e) {
            e.preventDefault();
            self.change(
                self.url2index( this.href )
            );
        });
    };

/** @param url [string] Fully qualified URI or anchor fragment.
    @returns An index to a slide.
*/
    StorySlideshow.prototype.url2index = function (url) {
        var m = url.match(/#(.+)$/);
        if (m === null){
            throw new SyntaxError('Not a valid URL');
        }
        var index = this.anchors2slides[ m[1] ].index;
        if (typeof index === 'undefined'){
            console.error('Bad index: no such slide as %s from %s', m[1], url);
            throw new TypeError('Bad index: no such slide');
        }
        return index;
    };

    StorySlideshow.prototype.beforeChange = function (nextIndex) {
        console.log('No-op call to beforeChange');
        alert('x')
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

        QuizSlideshow.prototype.call(this, nextIndex);
    };


	return StorySlideshow;
});
