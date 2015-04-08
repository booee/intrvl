var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Intrvl(toExec, intervalMillis, timeoutMillis, maxExec) {
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

util.inherits(Intrvl, EventEmitter);
module.exports = {
    setIntrvl : function(toExec, intervalMillis, timeoutMillis, maxExec) {
        return new Intrvl(toExec, intervalMillis, timeoutMillis, maxExec);
    }
};
