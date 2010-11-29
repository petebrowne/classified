classify(Function, function() {
  // Binds this function to the given `context` by wrapping it in another
  // function and returning the wrapper. Whenever the resulting "bound"
  // function is called, it will call the original ensuring that `this` is set
  // to `context`. Also optionally curries arguments for the function.
  def('bind', function(context) {
    if (context == null) {
      return this;
    }
    var method = this;
    return function() {
      return method.apply(context, arguments);
    }
  });
});
