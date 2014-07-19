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
            if (slide.el.attr('id') === null){
                console.error('Slide has no id or name attribute: ', slide);
                throw new TypeError('No id or name attribute on slide element');
            }
            self.anchors2slides[ slide.el.attr('id') ] = slide;
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
        if (m !== null){
            var nom = this.anchors2slides[ m[1] ].index;
            if (typeof nom === 'undefined'){
                console.error('Bad index: no such slide as %s from %s', m[1], url);
                throw new TypeError('Bad index: no such slide');
            }
            console.debug(url, nom);
            return nom;
        }
    };

/** @param nextIndex [int] - Index of slide to show during the 'change'
    @param nextIndex [int] - Index of slide to show during the 'change'
*/
    StorySlideshow.prototype.beforeChange = function (nextIndex) {
        console.log('No-op call to StorySlideshow.beforeChange');
        return nextIndex;
    };

    StorySlideshow.prototype.beforeShowFinal = function () {
        console.log('No-op call to StorySlideshow.beforeChange');
    }

/** This subclass is as the superclass, but
    does not allow 'previous' and 'next' as arguments.
    @args nextIndex [integer] Index of a slide
    @return Void
    @throws TypeError If the parameter is invalid.
*/
    StorySlideshow.prototype.change = function (nextIndex) {
        console.log('StorySlideshow.change enter for slide #%d, nextIndex [%d]', this.currentIndex, nextIndex);

        if (parseInt(nextIndex) !== nextIndex || parseInt(nextIndex) < 0){
            console.trace();
            throw new TypeError('Parameter must be a slide index, hence a positive integer you supplied a '
                +(typeof nextIndex) +" — ["+ nextIndex +"]"
            );
        }

        QuizSlideshow.prototype.change.call(this, nextIndex);
        console.log('StorySlideshow.change leave for slide #%d, used a nextIndex of [%d]', this.currentIndex, nextIndex);
    };


	return StorySlideshow;
});
