'use strict';

define(['Word2ImgSlide'], function (Word2ImgSlide) {

	var QuizSlide = function (properties) {
		console.group('QuizSlide.constructor enter ', arguments);
		Word2ImgSlide.call(this, properties);
	    // this.el.html(
	    // 	this.walkDOM( this.el.get(0) )
	    // );
	    console.groupEnd('QuizSlide.constructor leave');
	};

	QuizSlide.prototype = Object.create( Word2ImgSlide.prototype );
	QuizSlide.prototype.constructor = QuizSlide;

	QuizSlide.prototype.addSlide = function (args) {
		if ( ! args instanceof Object){
			throw new TypeError('arguments[0] should be an instanceof Object');
		}
        Word2ImgSlide.addSlide.call(this, args);
		console.log('QuizSlide.addSlide [%d]', this.startIndex);
	};

    QuizSlide.prototype.defaults = Word2ImgSlide.prototype.defaults;
    QuizSlide.prototype.defaults.correctAttr = 'data-correct';

    QuizSlide.prototype.getScore = function () {
        var self = this;
        var score = {
            passed: 0,
            failed: 0,
            total:  0
        };

        // Checkboxes, radios
        jQuery(this.el).find('input:checked').each( function () {
            if (jQuery(this).attr( self.correctAttr )){
                score.passed ++;
            } else {
                score.failed ++;
            }
            score.total ++;
        });

        // Regexp
        jQuery(this.el).find('input[type="text"]').each( function () {
            var el = jQuery(this);
            if (el.attr( self.correctAttr )){
                try {
                    var re = new RegExp( el.attr( self.correctAttr ), 'ig' );
                    var val = el.val();
                    if (typeof val !== 'undefed'){
                        var m = val.match( re );
                        if (m[1]){
                            console.info(m);
                            'debugger';
                            score.passed ++;
                        } else {
                            score.failed --;
                        }
                    } else {
                        score.failed --;
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                score.failed ++;
            }
            score.total ++;
        });

        return score;
    };

	return QuizSlide;
});
