'use strict';

define(['Word2ImgSlide'], function (Word2ImgSlide) {

	var QuizSlide = function (properties) {
		console.log('QuizSlide.constructor enter ', arguments);
		Word2ImgSlide.call(this, properties);
	    // this.el.html(
	    // 	this.walkDOM( this.el.get(0) )
	    // );
	    console.log('QuizSlide.constructor leave');
	};

	QuizSlide.prototype = Object.create( Word2ImgSlide.prototype );
	QuizSlide.prototype.constructor = QuizSlide;

	QuizSlide.prototype.addSlide = function (args) {
		if ( ! args instanceof Object){
			throw new TypeError('arguments[0] should be an instanceof Object');
		}
        Word2ImgSlide.call(this, args);
		console.debug('QuizSlide.addSlide [%d]', this.startIndex);
	};

    // TODO: Currently reates a few extra nodes
    QuizSlide.prototype.X_textNode2NodeArray = function (textNode) {
        var rvNode = document.createElement('span');
        var _words = textNode.data.split(/\s+/);
        for (var i in _words){
            var word      = _words[i];
            var wordAsKey = word.toLowerCase().replace(/\W+/g, '');
            if (wordAsKey && this.Words2ImgPaths[ wordAsKey ] ){
                // Check for word's pre- and post-
                // position punctuation, and add as text nodes
                var m = word.match(/^\s*(\W*?)\w+(\W*?)\s*$/);
                if (m !== null){
                    if (m[1]){
                        rvNode.appendChild(document.createTextNode(m[1]) )
                    }
                }
                var node        = document.createElement('img');
                node.src        = this.Words2ImgPaths[ wordAsKey ];
                node.alt        = 'word';
                node.className  = 'word';
                rvNode.appendChild( node );
                if (m !== null && m.length > 1){
                    if (m[2]){
                        rvNode.appendChild(document.createTextNode(m[2]) )
                    }
                }
            }
            else {
                rvNode.appendChild( document.createTextNode( word ) );
            }

            rvNode.appendChild(
                document.createTextNode(' ')
            );
        }
        // Return one or more textNodes
        return rvNode;
    }

	return QuizSlide;
});