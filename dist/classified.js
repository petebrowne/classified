//--------------------------------------------------------------------------
//
//  Classified.js v0.4.0
//  http://github.com/petebrowne/classify
//
//  Copyright (c) 2010, Peter Browne
//
//  Dependencies:
//  - classify  0.10.4  http://github.com/petebrowne/classify
//
//--------------------------------------------------------------------------

(function () {

//----------------------------------
//  Constants
//----------------------------------

var UNDEFINED = 'undefined',
    global    = this,
    def       = global.def,
    classify  = global.classify,
    module    = global.module,
    include   = global.include,
    extend    = global.extend,
    alias     = global.alias,
    slice     = Array.prototype.slice,
    
    // When using the Enumerable loops, throwing this object
    // will break out of the loop early;
    $break = global.$break = {};
    
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

module('Events', function() {
  // Bind an event, specified by a string name, `event`, to a `handler` function.
  // Passing `"all"` will bind the handler to all events fired.
  def('bind', function(type, handler) {
    var events   = this.__events__ || (this.__events__ = {}),
        handlers = events[type] || (events[type] = []);
        
    handlers.push(handler);
    return this;
  });
  
  // Remove one or many events. If `handler` is null, removes all
  // events for the event. If `event` is null, removes all bound events
  // for all events.
  def('unbind', function(type, handler) {
    var events, handlers;
    
    if (!type) {
      delete this.__events__;
    }
    else if (events = this.__events__) {
      if (!handler) {
        delete events[type];
      }
      else if (handlers = events[type]) {
        for (var i = 0, l = handlers.length; i < l; i++) {
          if (handlers[i] === handler) {
            handlers.splice(i, 1);
            break;
          }
        }
      }
    }
    
    return this;
  });
  
  // Trigger an event, firing all bound events. Callbacks are passed the
  // same arguments as `trigger` is, apart from the event name.
  // Listening for `"all"` passes the true event name as the first argument.
  def('trigger', function(type) {
    var events;
    
    if (events = this.__events__) {
      var args = arguments, handlers;
      
      if (handlers = events[type]) {
        handlers.each(function(handler) {
          handler.apply(this, slice.call(args, 1));
        }, this);
      }
    
      if (handlers = events['all']) {
        handlers.each(function(handler) {
          handler.apply(this, args);
        }, this);
      }
    }
    
    return this;
  });
});

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
  
  // Checks if the array is empty.
  def('isEmpty', function() {
    return this.length == 0;
  });
  
  // Checks if the array is empty or only contains `null` objects.
  def('isBlank', function() {
    return this.compact().length == 0;
  });
  
  // Removes the object at the specified index.
  def('removeAt', function(index) {
    if (index > 0 && index < this.length) {
      return this.splice(index, 1)[0];
    }
  });

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

classify(Number, function() {
  // Returns the absolute value of the number. Convenience method that simply
  // calls `Math.abs` on this instance and returns the result.
  def('abs', function() {
    return Math.abs(this);
  });
  
  // Rounds the number to the nearest integer. Convenience method that simply
  // calls `Math.round` on this instance and returns the result.
  def('round', function() {
    return Math.round(this);
  });
  
  // Returns the smallest integer greater than or equal to the number.
  // Convenience method that simply calls `Math.ceil` on this instance and
  // returns the result.
  def('ceil', function() {
    return Math.ceil(this);
  });
  
  // Returns the largest integer less than or equal to the number.
  // Convenience method that simply calls `Math.floor` on this instance and
  // returns the result.
  def('floor', function() {
    return Math.floor(this);
  });
});

extend(Object, function() {
  // Copies all properties from the `estension` to the `original` object.
  def('extend', function(original, extension) {
    for (var property in extension) {
      original[property] = extension[property];
    }
    return original;
  });
  
  // Creates and returns a shallow duplicate of the passed object by copying
  // all of the original's key/value pairs onto an empty object.
  // 
  // Do note that this is a _shallow_ copy, not a _deep_ copy. Nested objects
  // will retain their references.
  def('clone', function(properties) {
    return this.extend({}, properties);
  });
});

classify(RegExp, function() {
  // Escapes any characters in the string that have special meaning in a
  // regular expression.
  def(this, 'escape', function(string) {
    return String(string).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  });
});

classify(String, function() {
  // Checks if the string ends with `pattern`.
  def('endsWith', function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
  });
  
  // Checks if the string contains `pattern`.
  //
  // Aliased as `contains`.
  def('include', function(pattern) {
    return this.indexOf(pattern) > -1;
  });
  alias('contains', 'include');
  
  // Check if the string is "blank" - either empty (length of `0`) or
  // containing only whitespace.
  def('isBlank', function() {
    return /^\s*$/.test(this);
  });
  
  // Checks if the string is empty.
  def('isEmpty', function() {
    return this == '';
  });
  
  // Checks if the string starts with `pattern`.
  def('startsWith', function(pattern) {
    return this.lastIndexOf(pattern, 0) === 0;
  });
  
  // Strips all leading and trailing whitespace from a string.
  def('strip', function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  });
  
  //----------------------------------
  //  Inflector Methods
  //----------------------------------
  
  // Converts a string separated by dashes into a camelCase equivalent. For
  // instance, `'foo-bar'` would be converted to `'fooBar'`.
  def('camelize', function() {
    return this.replace(/[-_]+(.)?/g, function(match, char) {
      return char ? char.toUpperCase() : '';
    });
  });
  
  // Capitalizes the first letter of a string.
  def('capitalize', function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  });
  
  // Converts a camelized string into a series of words separated by an
  // dash (`'-'`). Also replaces underscores `'_'` with dashes.
  def('dasherize', function() {
    return this.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
               .replace(/([a-z\d])([A-Z])/g, '$1-$2')
               .replace(/_/g, '-')
               .toLowerCase();
  });
  
  // Capitalizes the first word and turns underscores and dashes into spaces.
  def('humanize', function() {
    return this.replace(/[_|-]+/g, ' ').capitalize();
  });
  
  // Capitalizes all the words and replaces some characters in the string to create a nicer looking title.
  def('titleize', function() {
    return this.underscore().humanize().replace(/\b('?[a-z])/g, function(match, word) {
      return word.capitalize();
    });
  });
  alias('toTitleCase', 'titleize');
  
  // Converts a camelized string into a series of words separated by an
  // underscore (`'_'`). Also replaces dashes `'-'` with underscores.
  def('underscore', function() {
    return this.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  });
});

})();
