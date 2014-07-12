// AMD stub?
var define = define || function (deps,module){ return module }

define([], function () {
    /*
        @param uri [string] - uri of `mod_autoindex` directory or similar HTML page
        @param re [RegExp] - hyperlinks for files to select from directory listing
        @param next [function] - optional callback
        @param error [function] - optional callback
    */
    var Ls = function (properties) {
        console.log('Ls new - enter');
        var self = this;
        if (typeof properties !== 'object'){
            throw new TypeError('Ls requires an object as sole parameter.')
        }
        this.re    = properties.re || /^.+\.(png|jpg|gif)$/;
        this.next  = properties.next || function () {};
        this.uris  = [];
        this.error = properties.error || function (e) {
            throw new Error('Error getting '+self.uri);
        };
        this.uri   = properties.uri;
        if (! this.hasOwnProperty('uri')){
            throw new TypeError('Ls requires a uri in its properties argument.')
        }

        var req = new XMLHttpRequest();
        req.open('GET', this.uri);

        req.onload = function () {
            console.log('Ls.onload enter');
            if (req.status == 200) {
                var html = document.createElement('div');
                html.innerHTML = req.response;
                var anchorNodeList = html.querySelectorAll( 'a[href]' );
                for (var i = 0; i < anchorNodeList.length; ++i) {
                    var href = anchorNodeList[i].getAttribute('href');
                    if (href.match( self.re )){
                        self.uris.push( self.uri +'/'+ href );
                    }
                }
                console.log('Ls.onload leave, calling this.next with this.uris');
                return self.next( self.uris );
            }
            else {
                this.error(req.statusText);
                return self;
            }
        };

        req.onerror = function() {
            this.error(req.statusText);
        };

        req.send();
        console.log('Ls new - leave with',this);
    };

    return Ls;
});
