'use strict';

var Q = require('q');

module.exports = {
    getPromised: function getPromised(functionToHook) {
        var deferred = Q.defer();

        var callback = function (err) {
            if (err) {
                return deferred.reject(err);
            }

            var callbackArgs = Array.prototype.slice.apply(arguments, [1]);
            deferred.resolve.apply(deferred, callbackArgs);
        };

        // This is the Promised
        return function () {
            var args = Array.prototype.slice.apply(arguments);

            args.push(callback);
            functionToHook.apply(this, args);

            return deferred.promise;
        };
    }
};
