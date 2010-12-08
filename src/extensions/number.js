classify(Number, function() {
  // Calls `iterator` the specified number of times, passing in a number as
  // the first parameter. The number will be 0 on first call, 1 on second
  // call, etc. `times` returns the number instance it was called on.
  def('times', function(iterator, context) {
    for (var i = 0; i < this; i++) {
      iterator.call(context, i);
    }
    return this;
  });
  
  // Copy over each Math method into the Number prototype.
  (function(math) {
    math.each(function(name) {
      def(name, function() {
        return Math[name].apply(null, [ this ].concat(Array.slice(arguments)));
      });
    });
  })('abs acos asin atan atan2 ceil cos exp floor log max min pow round sin sqrt tan'.split(' '));
});
