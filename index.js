var util = require('util');
var EventEmitter = require('events').EventEmitter;

function FiniteInterval(toExec, intervalMillis, timeoutMillis, maxExec) {
    var self = this;
    var execCount = 0;
    var interval = setInterval(exec, intervalMillis);
    var timeout;

    if(timeoutMillis && timeoutMillis > 0) {
        timeout = setTimeout(function(){ self.stop(); }, timeoutMillis);
    }

    function exec() {
        // if(maxExec && execCount >= maxExec) return;

        if(toExec) toExec();

        execCount++;
        self.emit('exec', execCount);
        if(maxExec && execCount >= maxExec) self.stop();
    }

    this.stop = function() {
        if(!interval) return; // not running

        if(interval) clearInterval(interval);
        if(timeout) clearTimeout(timeout);
        self.emit('stop', execCount);
    }
}

util.inherits(FiniteInterval, EventEmitter);
module.exports = {
    start : function(toExec, intervalMillis, timeoutMillis, maxExec) {
        return new FiniteInterval(toExec, intervalMillis, timeoutMillis, maxExec);
    }
};
