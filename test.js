// mochaaaaaaaaaa

var assert = require('assert');
var fi = require('./index');

it('should end on max execution', function(done){
    this.timeout(2000);
    var execCount = 0;

    var interval = fi.start(function() {
        // do some work
    }, 1, undefined, 100);

    interval.on('exec', function() {
        execCount++;
    });

    interval.on('stop', function() {
        assert.equal(execCount, 100);
        done();
    });
})

it('should be stopped by a timeout', function(done){
    this.timeout(2000);
    var execCount = 0;

    var interval = fi.start(function() {
        // do some work
    }, 1, 100); // kill after 100ms

    interval.on('exec', function() {
        execCount++;
    });

    interval.on('stop', function() {
        assert.equal(execCount > 1, true);
        done();
    });
})
