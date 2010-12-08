classify(Function, function() {
  // Binds this function to the given `context` by wrapping it in another
  // function and returning the wrapper. Whenever the resulting "bound"
  // function is called, it will call the original ensuring that `this` is set
  // to `context`. Also optionally curries arguments for the function.
  def('bind', function(context) {
    if (arguments.length < 2 && context == null) {
      return this;
    }
    
    var method = this,
        args   = Array.slice(arguments, 1);
        
    return function() {
      return method.apply(context, args.concat(Array.slice(arguments)));
    }
  });
  
  // *Curries* (burns in) arguments to a function, returning a new function
  // that when called with call the original passing in the curried arguments
  // (along with any new ones):
  def('curry', function() {
    if (!arguments.length) return this;
    
    var method = this,
        args   = Array.slice(arguments);
        
    return function() {
      return method.apply(null, args.concat(Array.slice(arguments)));
    }
  });
  
  // Schedules the function to run after the specified amount of time, passing
  // any arguments given.
  // 
  // Behaves much like `window.setTimeout`, but the timeout is in seconds
  // rather than milliseconds. Returns an integer ID that can be used to
  // clear the timeout with `window.clearTimeout` before it runs.
  def('delay', function(timeout) {
    var method = this,
        args   = Array.slice(arguments, 1);
        
    if (timeout <= 0) {
      return method.apply(null, args);
    }
    else {
      return this.__timeoutID__ = setTimeout(function() {
        return method.apply(null, args);
      }, timeout * 1000);
    }
  });
  
  // Schedules the function to run as soon as the interpreter is idle.
  def('defer', function() {
    return this.delay.apply(this, [ 0.01 ].concat(Array.slice(arguments)));
  });
  
  // Schedules the function to run in the specified intervals of time, passing
  // any arguments given.
  // 
  // Behaves much like `window.setInterval`, but the interval is in seconds
  // rather than milliseconds. Returns an integer ID that can be used to
  // clear the interval with `window.clearInterval` before it runs.
  def('periodical', function(interval) {
    var method = this,
        args   = Array.slice(arguments, 1);
        
    return this.__intervalID__ = setInterval(function() {
      return method.apply(null, args);
    }, interval * 1000);
  });
  
  // If a #delay, #defer, or #periodical call has been made, calling #stop
  // will stop the function call from being made.
  def('stop', function() {
    clearTimeout(this.__timeoutID__);
    clearInterval(this.__intervalID__);
  });
});
