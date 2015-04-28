'use strict';

var chai = require('chai'),
    expect = chai.expect,
    qize = require('../');


describe.skip('qize.getPromise', function () {

    it('copied values match deeply', function (done) {
        var copy = copyObject(sourceObj);

        Object.keys(sourceObj).forEach(function (key) {
            expect(sourceObj[key]).is.deep.equal(copy[key]);
        });

        done();
    });

    it('copied object !== source', function (done) {
        var copy = copyObject(sourceObj);

        expect(copy !== sourceObj).equal(true);

        done();
    });

    it('copied object === previously created object', function (done) {
        var copy = {},
            response = copyObject(sourceObj, copy);

        expect(copy).is.deep.equal(response);
        expect(copy === response).equal(true);

        done();
    });

    it('copies only parts of source', function (done) {
        var response = copyObject(sourceObj, {}, ['a']);

        expect(response).is.deep.equal({ a: 1 });

        done();
    });

    it('extends existing destination object', function (done) {
        var destination = { v: 12, w: 15 },
            response = copyObject(sourceObj, destination, ['a']);

        expect(response).is.deep.equal({ a: 1, v: 12, w: 15 });

        done();
    });

});
