// AMD stub?
var define = define || function ( deps, module ) {
	return module
}

define( [], function () {
	/*
        @param uri [string] - uri of `mod_autoindex` directory or similar HTML page
        @param re [RegExp] - hyperlinks for files to select from directory listing
        @param next [function] - optional callback
        @param error [function] - optional callback
    */
	var Ls = function ( properties ) {
		console.log( 'Ls new - enter' );
		var self = this;

		if ( typeof properties !== 'string' && typeof properties !== 'object' ) {
			throw new TypeError( 'Ls this.requires an object or string as sole parameter.' )
		}
		if ( typeof properties === 'string' ) {
			properties = {
				uri: properties
			};
		}
		this.uri = properties.uri;
		if ( !this.hasOwnProperty( 'uri' ) ) {
			throw new TypeError( 'Ls this.requires a uri in its properties argument.' )
		}

		this.re = properties.re || /^.+\.(png|jpg|gif)$/;

		this.uris = [];

		this.next = properties.next || function () {};

		this.error = properties.error || function ( e ) {
			throw new Error( 'Error getting ' + self.uri );
		};

		this.req = new XMLHttpRequest();
		this.req.open( 'GET', this.uri );
		this.req.onload = this.onload.bind( this );
		this.req.onerror = this.onerror.bind( this );

		this.req.send();
		console.log( 'Ls new - leave with', this );
	};

	Ls.prototype.onload = function () {
		console.log( 'Ls.onload enter ', this );
		if ( this.req.status == 200 ) {
			var html = document.createElement( 'div' );
			html.innerHTML = this.req.response;
			var anchorNodeList = html.querySelectorAll( 'a[href]' );
			for ( var i = 0; i < anchorNodeList.length; ++i ) {
				var href = anchorNodeList[ i ].getAttribute( 'href' );
				if ( href.match( this.re ) ) {
					this.uris.push( this.uri + '/' + href );
				}
			}
			console.log( 'Ls.onload leave, calling this.next with this.uris' );
			return this.next( this.uris );
		} else {
			this.error( this.req.statusText );
			return this;
		}
	};

	Ls.prototype.onerror = function () {
		this.error( this.req.statusText );
	};

	return Ls;
} );
