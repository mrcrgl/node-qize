# qize [![Build Status](https://secure.travis-ci.org/mrcrgl/node-qize.png)](http://travis-ci.org/mrcrgl/node-qize)
---------------

Converts asynchronous functions to [Q(https://github.com/foo/q)] promises 

## Installation

Easily via [npm](http://npmjs.org).

```bash
npm install qize --save
```

## Usage

```javascript
var qize = require('qize');

var sum = function (a, b, callback) {
    setImmediate(function () {
        callback(null, a + b);
    });
};

// It returns a [Q(https://github.com/foo/q)] compatible version of `sum`.
var sumPromised = qize.getPromised(sum);

Q.all([sumPromised(4)]).spread(..your stuff;
```

## API

- `qize.getPromised` requires exactly one function as argument. The last argument of given function needs to 
be a callback, it will be appended when calling the Promised one.
- The callbacks first argument is required to be an error or non-positive. 

### The logical result is:

```javascript

sumPromised = function (a, b) {
    var deferred = Q.defer();
    sum(a, b, function (err, sum) {
        if (err) {
            return deferred.reject(err);
        }
        deferred.resolve(sum);
    });
    
    return deferred.promise;
}

```

## Examples

### Use it for your prototype methods

```javascript
var TestClass = function () {
    this._private = 5;
};

TestClass.prototype.someAsync = function (num, callback) {
    var result = num + this._private;
    setTimeout(function () {
        callback(null, result);
    }, 10);
};

// It binds `this` gracefully
TestClass.prototype.someAsyncPromised = qize.getPromised(TestClass.prototype.someAsync);

var test = new TestClass();

test.someAsyncPromised(6).then(function (sum) {}); // <- sum is 11
```

### Provide Q and vanilla callbacks in your classes

```javascript

['loadX', 'doThat', 'makeIt', 'saveIt'].forEach(function (methodName) {
    MySuperClass.prototype[methodName + 'Promised'] = qize.getPromised(MySuperClass.prototype[methodName]);
});

```

## LICENCE

See LICENCE file