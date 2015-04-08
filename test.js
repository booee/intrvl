// mochaaaaaaaaaa

var assert = require('assert');
var setIntrvl = require('./index').setIntrvl;

it('should end on max execution', function(done){
    this.timeout(2000);
    var someNum = 0;

    var interval = setIntrvl(function() {
        someNum++;
    }, 1, undefined, 100); // kill after 100 executions

    interval.on('stop', function(execCount) {
        assert.equal(execCount, 100);
        done();
    });
})

it('should be stopped by a timeout', function(done){
    this.timeout(2000);
    var someNum = 0;

    var interval = setIntrvl(function() {
        someNum++;
    }, 1, 100); // kill after 100ms

    interval.on('stop', function(execCount) {
        assert.equal(execCount > 1, true);
        done();
    });
})
