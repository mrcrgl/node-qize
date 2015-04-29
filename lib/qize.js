'use strict';

var Q = require('q');

module.exports = {
    getPromised: function getPromised(functionToHook) {

        if ('function' !== typeof functionToHook) {
            var e = new Error('Argument is not a function');
            e.code = 'E_ATTRIBUTE';
            throw e;
        }

        // This is the Promised
        var promised = function () {
            var deferred = Q.defer(),
                args = Array.prototype.slice.apply(arguments);

            var innerCallback = function (err) {
                if (err) {
                    return deferred.reject(err);
                }

                var callbackArgs = Array.prototype.slice.apply(arguments, [1]);
                deferred.resolve.apply(deferred, callbackArgs);
            };

            args.push(innerCallback);

            functionToHook.apply(this, args);

            return deferred.promise;
        };

        return promised;
    }
};
