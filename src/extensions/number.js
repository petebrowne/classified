classify(Number, function() {
  // Copy over each Math method into the Number prototype.
  (function(math) {
    math.each(function(name) {
      def(name, function() {
        return Math[name].apply(null, [ this ].concat(slice.call(arguments)));
      });
    });
  })([ 'abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'round', 'sin', 'sqrt', 'tan' ]);
});
