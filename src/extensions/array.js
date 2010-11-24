classify(Array, function() {
  include(Enumerable);
  
  def('__each__', function(iterator) {
    for (var i = 0, n = this.length; i < n; i++) {
      iterator.call(null, this[i]);
    }
  });
  
  if (typeof Array.prototype.indexOf === UNDEFINED) {
    def('indexOf', function(item) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (this[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }
  
  if (typeof Array.prototype.lastIndexOf === UNDEFINED) {
    def('lastIndexOf', function(item) {
      var i = this.length;
      while (i--) {
        if (this[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }
  
  def('clear', function() {
    this.length = 0;
    return this;
  });
  
  def('first', function() {
    return this[0];
  });
  
  def('last', function() {
    return this[this.length - 1];
  });
  
  def('compact', function() {
    return this.reject(function(value) {
      return value == null;
    });
  });
  
  def('uniq', function(sorted) {
    return this.inject([], function(results, value, index) {
      if (index === 0 || (sorted ? results.last() != value : !results.include(value))) {
        results.push(value);
      }
      return results;
    });
  });
});
