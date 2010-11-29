module('Enumerable', function() {
  
  // A function that just returns the first argument.
  // Used internally when functions aren't given to a looping function.
  var $identity = function(item) {
    return item;
  };
  
  // Calls `iterator` for each item in the collection.
  def('each', function(iterator, context) {
    var index = 0;
    try {
      this.__each__(function(value) {
        iterator.call(context, value, index++);
      });
    }
    catch (error) {
      if (error != $break) {
        throw error;
      }
    }
    return this;
  });
  
  // Determines whether all the elements are "truthy" (boolean-equivalent to
  // `true`), either directly or through computation by the provided iterator.
  // Stops on the first falsy element found (e.g., the first element that
  // is boolean-equivalent to `false`, such as `undefined`, `0`).
  // 
  // Aliased as `every`
  def('all', function(iterator, context) {
    iterator = iterator || $identity;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index);
      if (!result) {
        throw $break;
      }
    });
    return result;
  });
  alias('every', 'all');
  
  // Determines whether at least one element is truthy (boolean-equivalent to
  // `true`), either directly or through computation by the provided iterator.
  //
  // Aliased as `some`.
  def('any', function(iterator, context) {
    iterator = iterator || $identity;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index)) {
        throw $break;
      }
    });
    return result;
  });
  alias('some', 'any');
  
  // Returns the result of applying `iterator` to each element. If no
  // `iterator` is provided, the elements are simply copied to the
  // returned array.
  //
  // Aliased as `map`.
  def('collect', function(iterator, context) {
    iterator = iterator || $identity;
    return this.inject([], function(results, value, index) {
      results.push(iterator.call(context, value, index));
      return results;
    });
  });
  alias('map', 'collect');
  
  // Returns the first element for which the iterator returns a truthy value.
  //
  // Aliased as `find`.
  def('detect', function(iterator, context) {
    var result = null;
    this.each(function(value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  });
  alias('find', 'detect');
  
  // Determines whether a given object is in the enumerable or not,
  // based on the `==` comparison operator (equality with implicit type
  // conversion).
  //
  // Aliased as `contains`.
  def('include', function(item) {
    if (typeof this.indexOf === 'function') {
      return this.indexOf(item) != -1;
    }

    var found = false;
    this.each(function(value) {
      if (typeof value.value !== UNDEFINED) {
        value = value.value;
      }
      if (value == item) {
        found = true;
        throw $break;
      }
    });
    return found;
  });
  alias('contains', 'include');
  
  // Incrementally builds a result value based on the successive results
  // of the iterator. This can be used for array construction, numerical
  // sums/averages, etc.
  //
  // The `iterator` function is called once for each element in the
  // enumeration, receiving the current value of the accumulator as its first
  // argument, the element as its second argument, and the element's index as
  // its third. It returns the new value for the accumulator.
  //
  // Aliased as `reduce`.
  def('inject', function(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  });
  alias('reduce', 'inject');
  
  // Returns all the elements for which the iterator returns a falsy value.
  // For the opposite operation, see Enumerable#findAll.
  //
  // Aliased as `not`.
  def('reject', function(iterator, context) {
    return this.inject([], function(results, value, index) {
      if (!iterator.call(context, value, index)) {
        results.push(value);
      }
      return results;
    });
  });
  alias('not', 'reject');
  
  // Returns all the elements for which the iterator returned a truthy value.
  // For the opposite operation, see Enumerable#reject.
  //
  // Aliased as `findAll` & `filter`.
  def('select', function(iterator, context) {
    return this.inject([], function(results, value, index) {
      if (iterator.call(context, value, index)) {
        results.push(value);
      }
      return results;
    });
  });
  alias('findAll', 'select');
  alias('filter', 'select');
});
