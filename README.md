# intrvl

A quick tool for creating a time-based interval that stops itself based on timeout or execution count

### Installation

```
npm install intrvl
```

### Usage

#### intrvl.start(toExecute, intervalMillis, timeoutMillis, maxExecutionCount)
* `toExecute` Function. Executes at every interval
* `intervalMillis` Number. How many milliseconds between execution
* `timeoutMillis` Number. How long to allow the interval to run. Left `undefined`, the interval will run without a timeout
* `maxExecutionCount` Number. How many times to execute the interval. Left `undefined`, the interval will run without a max

Returns a new `Intrvl` class instance (running by default)

#### Class: intrvl.Intrvl
Passed back from the `intrvl.start` method.

##### Intrvl.stop()
```
var interval = require('./index').start(function(){ console.log('Hello, World') }, 1000);
interval.on('stop', function() {
    console.log('I was explicitly stopped!');
});

setTimeout(function() { interval.stop(); }, 5000)
```

##### Event: 'exec'
Emitted on each execution of the interval
```
var execCount = 0;

// runs every 5 seconds, 5 times total, and dies
var interval = require('./index').start(function(){ console.log('Hello, World') }, 1000, undefined, 5);

interval.on('exec', function() { execCount++; });
```

##### Event: 'stop'
Emitted when an interval has finished, either by self-imposed limits (timeoutMills, maxExecutionCount), or by calling `.stop()` on a running instance

```
var execCount = 0;

// runs every 5 seconds, 5 times total, and dies
var interval = require('./index').start(function(){ console.log('Hello, World') }, 1000, undefined, 5);

interval.on('exec', function() { execCount++; });

interval.on('stop', function() {
    console.log('Executions: ' + execCount);
});
```

### More Examples
```
// runs every 1 ms, ends after 100 executions

var intrvl = require('./index');

var execCount = 0;
var intervalMillis = 1;
var timeoutMillis = undefined;
var maxExecutionCount = 100;

var interval = intrvl.start(function() {
    console.log('Hello, World');
}, intervalMillis, timeoutMillis, maxExecutionCount);

interval.on('exec', function() {
    execCount++;
});

interval.on('stop', function() {
    console.log('ENDED: ' + execCount);
});
```



```
// runs every 1 ms, ends after 1000 ms

var intrvl = require('./index');

var execCount = 0;
var intervalMillis = 1;
var timeoutMillis = 1000;
var maxExecutionCount = undefined;

var interval = intrvl.start(function() {
    console.log('Hello, World');
}, intervalMillis, timeoutMillis, maxExecutionCount);

interval.on('exec', function() {
    execCount++;
});

interval.on('stop', function() {
    console.log('ENDED: ' + execCount);
});
```

```
// runs every 1 ms, never ends... might as well use setInterval at this point

var intrvl = require('./index');

var execCount = 0;
var intervalMillis = 1;
var timeoutMillis = undefined;
var maxExecutionCount = undefined;

var interval = intrvl.start(function() {
    console.log('Hello, World');
}, intervalMillis, timeoutMillis, maxExecutionCount);

interval.on('exec', function() {
    execCount++;
});

interval.on('stop', function() {
    console.log('I'm never called!');
});
```
