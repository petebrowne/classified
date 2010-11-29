classify(Array, function() {
  include(Enumerable);
  
  // Looping method used by Enumerable.
  def('__each__', function(iterator) {
    for (var i = 0, n = this.length; i < n; i++) {
      iterator.call(null, this[i]);
    }
  });
  
  if (typeof Array.prototype.indexOf === UNDEFINED) {
    // Returns the index of the first occurrence of `item` within the array,
    // or `-1` if `item` doesn't exist in the array. It compares items
    // using strict equality (`===`).
    def('indexOf', function(item, offset) {
      for (var i = offset || 0, n = this.length; i < n; i++) {
        if (this[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }
  
  if (typeof Array.prototype.lastIndexOf === UNDEFINED) {
    // Returns the position of the last occurrence of `item` within the array,
    // or `-1` if item doesn't exist in the array.
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
  
  // Clears the array (makes it empty) and returns the array reference.
  def('clear', function() {
    this.length = 0;
    return this;
  });
  
  // Returns the array's first item
  def('first', function() {
    return this[0];
  });
  
  // Returns the array's last item
  def('last', function() {
    return this[this.length - 1];
  });
  
  // Returns a copy of the array without any null or undefined values.
  def('compact', function() {
    return this.reject(function(value) {
      return value == null;
    });
  });
  
  // Produces a duplicate-free version of an array. If no duplicates are
  // found, the original array is returned.
  //
  // On large arrays when `sorted` is `false`, this method has a potentially
  // large performance cost.
  def('uniq', function(sorted) {
    return this.inject([], function(results, value, index) {
      if (index === 0 || (sorted ? results.last() != value : !results.include(value))) {
        results.push(value);
      }
      return results;
    });
  });
});
