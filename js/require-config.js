'use strict';

(function() {
    var noop     = function () {};
    var console  = (window.console = window.console || {});
    var methods  = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;

    var method;
    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

require.config({
    baseUrl: "js/lib/",
    paths: {
        "Modernizer":        "../vendor/modernizr-2.6.2.min",
        "jquery":            "../vendor/jquery-1.10.2.min",
        "jquery-transit":    "../vendor/jquery.transit.min"
    },
    waitSeconds: 2
});


