define(['jquery'], function (jQuery) {
	/*
		@param uri [string] - uri of `mod_autoindex` directory or similar HTML page
		@param re [RegExp] - hyperlinks for files to select from directory listing
		@param next [function] - callback
	*/
	var Ls = function (properties) {
        if (typeof properties !== 'object'){
            throw new TypeError('Ls requires an object as sole parameter.')
        }
		var self = this;

		this.uri = properties.uri;
		this.re = properties.re || /^.+\.(png|jpg|gif)$/;
		this.next = properties.next || function () {};
		this.uris = [];

		if (! this.hasOwnProperty('uri')){
			throw new TypeError('Ls requires a uri in its properties argument.')
		}

		jQuery.get( this.uri, function (html) {
			jQuery('<html/>', { html: html })
				.find('a')
				.each( function(i,el){
					// Only links to images
					if (jQuery(el).attr('href').match( self.re )){
						self.uris.push( self.uri +'/'+ jQuery(el).attr('href') );
					}
				}
			);

			self.next( self.uris );
		});
	}

	return Ls;
});
