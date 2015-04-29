'use strict';

var chai = require('chai'),
    expect = chai.expect,
    qize = require('../');

describe('qize.getPromise', function () {
    var myTestFunction = function (a, b, c, callback) {
        setTimeout(function () {
            callback(null, a + b + c);
        }, 10);
    };

    var divide = function (a, b, callback) {
        setTimeout(function () {
            callback(null, a / b);
        }, 10);
    };

    it('returns a new function', function (done) {
        var myPromised = qize.getPromised(myTestFunction);

        expect(myPromised).to.be.an('function');
        done();
    });

    it('throws an error on false arguments', function (done) {
        var doIt = function () {
            qize.getPromised('foobar');
        };

        expect(doIt).to.throw(Error, /Argument/);
        done();
    });

    it('handles gracefully promise results', function (done) {
        var myPromised = qize.getPromised(myTestFunction);

        myPromised(5, 3, 6).then(function (sum) {
            expect(sum).to.be.equal(14);
            done();
        }).fail(function (err) {
            expect(err).to.be.null;
            done();
        });

    });

    it('handles errors', function (done) {
        var dividePromised = qize.getPromised(divide);

        dividePromised(0, 1).then(function (division) {
            expect(division).to.be.undefined;
            done();
        }).fail(function (err) {
            expect(err).to.be.an('object');
            done();
        });

    });

    it('works fine with prototype methods', function (done) {
        var TestClass = function () {
            this._private = 5;
        };
        TestClass.prototype = Object.create({});
        TestClass.prototype.someAsync = function (num, callback) {
            var result = num + this._private;
            setTimeout(function () {
                callback(null, result);
            }, 10);
        };
        TestClass.prototype.someAsyncPromised = qize.getPromised(TestClass.prototype.someAsync);

        var test = new TestClass();

        test.someAsyncPromised(6).then(function (sum) {
            expect(sum).to.be.equal(11);
            done();
        }).fail(function (err) {
            expect(err).to.be.null;
            done();
        });
    });

});
