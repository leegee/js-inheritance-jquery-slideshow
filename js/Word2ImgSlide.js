'use strict';

define(['Slide'], function (Slide) {

	var Word2ImgSlide = function (properties) {
		console.group('Word2ImgSlide.constructor enter ', arguments);
		Slide.call(this, properties);
	    this.el.html(
	    	this.walkDOM( this.el.get(0) )
	    );
	    console.groupEnd('Word2ImgSlide.constructor leave');
	};

	Word2ImgSlide.prototype = Object.create( Slide.prototype );
	Word2ImgSlide.prototype.constructor = Word2ImgSlide;

	Word2ImgSlide.prototype.addSlide = function (args) {
		if ( ! args instanceof Object){
			throw new TypeError('arguments[0] should be an instanceof Object');
		}
		this.slides.push(new Word2ImgSlide(args) );
		console.debug('Word2ImgSlide.addSlide [%d]', this.startIndex);
	};

	Word2ImgSlide.prototype.walkDOM = function (inputNode, rvNodes) { // DOM walker
		rvNodes = rvNodes || document.createElement('span');
	    if (inputNode.nodeType == 3) { // text node
	        if (1 || nonWhitespaceMatcher.test(node.nodeValue)) {
	            var parentNode = inputNode.parentNode;
	            parentNode.replaceChild(
	            	this._textNode2NodeArray( inputNode, rvNodes ),
	            	inputNode
	            );
	        }
	    } else {
	        for (var i = 0, len = inputNode.childNodes.length; i < len; ++i) {
	        	rvNodes = this.walkDOM( inputNode.childNodes[i], rvNodes )
	        }
	    }
	}

	// TODO: Currently reates a few extra nodes
	Word2ImgSlide.prototype._textNode2NodeArray = function (textNode) {
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
				var node 		= document.createElement('img');
				node.src 		= this.Words2ImgPaths[ wordAsKey ];
				node.alt 		= 'word';
				node.className 	= 'word';
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

	return Word2ImgSlide;
});
