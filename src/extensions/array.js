classify(Array, function() {
  include(Enumerable);
  
  // Looping method used by Enumerable.
  def('__each__', function(iterator) {
    for (var i = 0, n = this.length; i < n; i++) {
      iterator.call(null, this[i]);
    }
  });
  
  // Clears the array (makes it empty) and returns the array reference.
  def('clear', function() {
    this.length = 0;
    return this;
  });
  
  // Returns a duplicate of the array, leaving the original array intact.
  def('clone', function() {
    return this.slice.call(this, 0);
  });
  
  // Returns a copy of the array without any null or undefined values.
  def('compact', function() {
    return this.reject(function(value) {
      return value == null;
    });
  });
  
  // Returns the array's first item
  def('first', function() {
    return this[0];
  });
  
  // Returns a flattened (one-dimensional) copy of the array, leaving
  // the original array unchanged.
  def('flatten', function() {
    return this.inject([], function(array, value) {
      if (value instanceof Array) {
        array = array.concat(value.flatten());
      }
      else {
        array.push(value);
      }
      return array;
    });
  });
  
  // Checks if the array is empty or only contains `null` objects.
  def('isBlank', function() {
    return this.compact().length == 0;
  });
  
  // Checks if the array is empty.
  def('isEmpty', function() {
    return this.length == 0;
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
  
  // Returns the array's last item
  def('last', function() {
    return this[this.length - 1];
  });
  
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

  // Removes the first instance of the given object from the array.
  def('remove', function(object) {
    var indexOf = this.indexOf(object);
    if (indexOf != -1) {
      this.splice(indexOf, 1);
      return object;
    }
  });
  
  // Removes all instances of the given object from the array.
  def('removeAll', function(object) {
    var removed = false;
    while (typeof this.remove(object) !== UNDEFINED) {
      removed = true;
    }
    if (removed) return object;
  });
  
  // Removes the object at the specified index.
  def('removeAt', function(index) {
    if (index > 0 && index < this.length) {
      return this.splice(index, 1)[0];
    }
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
