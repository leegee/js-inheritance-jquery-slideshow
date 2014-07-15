'use strict';

define(["jquery"], function (jQuery) {
	function Base (properties) {
		console.log('Base.constructor enter')
		// Merge properties into defaults, into instance:
		properties = properties || {};
		properties = jQuery.extend({}, this.defaults, properties);
		for (var i in properties){
			this[i] = properties[i];
		}

		// Create the .el field as a jQuery object, if it is not already.
		if (properties.el instanceof jQuery === false){
			this.el = jQuery(this.el);
		}
		if (this.el===null){
			throw new TypeError('Argument "el" should be a selector string or jQuery instance.');
		}

		// Create an id for the element if necessary:
		if (typeof this.el.attr('id') === 'undefined'){
			var d = new Date().getTime();
			var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = (d + Math.random()*16)%16 | 0;
				d = Math.floor(d/16);
				return (c=='x' ? r : (r&0x7|0x8)).toString(16);
			});
			this.el.attr('id',  '_'+uid );
		}

		console.log('Base.constructor leave', this)
	}

	Base.prototype.populateFromElementData = function (regexp, callbackPerAttr) {
		if (! regexp instanceof RegExp){
			throw new TypeError('First argument must be a RegExp object.');
		}
		if (! callbackPerAttr instanceof Function){
			throw new TypeError('Second argument must be a function to call per attribute, receiving the result of the first argument\'s application, in the context of the caller.');
		}

		for (var i=0; i <= this.el[0].attributes.length; i++){
			var attr = this.el[0].attributes[i];
			if (typeof attr !== 'undefined'){
				var matched = attr.nodeName.match( regexp );
				if (matched !== null){
					callbackPerAttr.call( this, attr, matched );
				}
			}
		}
	}

	Base.prototype.createObject = function (name, properties) {
		console.log('Base.createObject');
	    return new name(properties);
	}

	Base.prototype.requireObject = function (moduleName, prototypeName, properties) {
		var nom = require(moduleName);
		console.log('Base.requireObject ', arguments);
	    return new prototypeName(properties);
	}

	return Base;
})
