//--------------------------------------------------------------------------
//
//  Classified.js v0.5.3
//  http://github.com/petebrowne/classify
//
//  Copyright (c) 2010, Peter Browne
//
//  Dependencies:
//  - classify  0.10.7  http://github.com/petebrowne/classify
//
//--------------------------------------------------------------------------

(function () {

//----------------------------------
//  Shortcuts
//----------------------------------

var global    = this,
    def       = global.def,
    classify  = global.classify,
    module    = global.module,
    include   = global.include,
    extend    = global.extend,
    alias     = global.alias,
    
    // When using the Enumerable loops, throwing this object
    // will break out of the loop early;
    $break = global.$break = {};
    
extend(Object, function() {
  
  //----------------------------------
  //  Typecasting Methods
  //----------------------------------
  
  // Shortcut to the toString method used for type checking.
  var toString = Object.prototype.toString;
  
  // Returns `true` if `object` is of type `undefined`.
  def('isUndefined', function(object) {
    return typeof object === 'undefined';
  });
  
  // Returns `true` if `object` is not undefined.
  def('isDefined', function(object) {
    return !Object.isUndefined(object);
  });
  
  // Returns `true` if `object` is an object.
  def('isObject', function(object) {
    if (object == null) return false;
    return toString.call(object) === '[object Object]';
  });
  
  // Returns `true` if `object` is a function.
  def('isFunction', function(object) {
    return toString.call(object) === '[object Function]';
  });
  
  // Returns `true` if `object` is a string.
  def('isString', function(object) {
    return toString.call(object) === '[object String]';
  });
  
  // Returns `true` if `object` is a number.
  def('isNumber', function(object) {
    return toString.call(object) === '[object Number]';
  });
  
  // Returns `true` if `object` is a date.
  def('isDate', function(object) {
    return toString.call(object) === '[object Date]';
  });
  
  // Returns `true` if `object` is a regexp.
  def('isRegExp', function(object) {
    return toString.call(object) === '[object RegExp]';
  });
  
  // Returns `true` if `object` is an array.
  if (Object.isFunction(Array.isArray)) {
    def('isArray', Array.isArray);
  }
  else {
    def('isArray', function(object) {
      return toString.call(object) === '[object Array]';
    });
  }
  
  //----------------------------------
  //  Class Methods
  //----------------------------------
  
  // Copies all properties from the `estension` to the `original` object.
  //
  // Aliased as `merge`.
  def('extend', function(original, extension) {
    for (var property in extension) {
      original[property] = extension[property];
    }
    return original;
  });
  alias('merge', 'extend');
  
  // Creates and returns a shallow duplicate of the passed object by copying
  // all of the original's key/value pairs onto an empty object.
  // 
  // Do note that this is a _shallow_ copy, not a _deep_ copy. Nested objects
  // will retain their references.
  def('clone', function(properties) {
    return this.extend({}, properties);
  });
  
  // Loops through all the properties of a given object.
  def('each', function(object, iterator, context) {
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        iterator.call(context, property, object[property]);
      }
    }
  });
  
  // Returns an array of the object's property names.
  if (!Object.isFunction(Object.keys)) {
    def('keys', function(object) {
      if (!Object.isObject(object)) throw new TypeError();
      var results = [];
      Object.each(object, function(key, value) {
        results.push(key);
      });
      return results;
    });
  }
  
  // Returns an array of the object's property values.
  def('values', function(object) {
    var results = [];
    Object.each(object, function(key, value) {
      results.push(value);
    });
    return results;
  });
});

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
    if (Object.isFunction(this.indexOf)) {
      return this.indexOf(item) != -1;
    }

    var found = false;
    this.each(function(value) {
      if (Object.isDefined(value.value)) {
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
  
  // Invokes the same method, with the same arguments, for all items in a
  // collection. Returns an array of the results of the method calls.
  def('invoke', function(method) {
    var args = Array.slice(arguments, 1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  });
  
  // Pre-baked implementation for a common use-case of Enumerable#collect
  // and Enumerable#each: fetching the same property for all of the
  // elements. Returns an array of the property values.
  def('pluck', function(property) {
    return this.map(function(value) {
      return value[property];
    });
  });
  
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
          handler.apply(this, Array.slice(args, 1));
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

module('Inflector', function() {
  
  this.plurals      = [];
  this.singulars    = [];
  this.uncountables = [];
  
  // Specifies a new pluralization rule and its replacement.
  // The rule can either be a string or a regular expression.
  // The replacement should always be a string that may include
  // references to the matched data from the rule.
  def('plural', function(rule, replacement) {
    if (!Object.isRegExp(rule)) rule = new RegExp(rule + '$');
    Inflector.plurals.unshift([ rule, replacement ]);
  });
  
  // Specifies a new singularization rule and its replacement.
  // The rule can either be a string or a regular expression.
  // The replacement should always be a string that may include
  // references to the matched data from the rule.
  def('singular', function(rule, replacement) {
    if (!Object.isRegExp(rule)) rule = new RegExp(rule + '$');
    Inflector.singulars.unshift([ rule, replacement ]);
  });
  
  // Specifies a new irregular that applies to both pluralization
  // and singularization at the same time. This can only be used
  // for strings, not regular expressions. You simply pass the
  // irregular in singular and plural form.
  def('irregular', function(singular, plural) {
    Inflector.plural(
      new RegExp('(' + singular.charAt(0) + ')' + singular.slice(1) + '$', 'i'), '$1' + plural.slice(1)
    );
    Inflector.singular(
      new RegExp('(' + plural.charAt(0) + ')' + plural.slice(1) + '$', 'i'), '$1' + singular.slice(1)
    );
  });
  
  // Add uncountable words that shouldn't cannot be converted
  // to singular or plural forms.
  def('uncountable', function() {
    Inflector.uncountables = Inflector.uncountables.concat(Array.slice(arguments));
  });
  
  // Returns the plural form of the word in the string.
  def('pluralize', function(string) {
    var word = string.split(/\s/).pop();
    
    if (Inflector.uncountables.contains(word.toLowerCase())) {
      return string;
    }
    
    var inflection = Inflector.plurals.find(function(plural) {
      return plural[0].test(word);
    });
    if (inflection) return string.replace(inflection[0], inflection[1]);
    
    return string;
  });
  
  // The reverse of `pluralize`, returns the singular form of a word in a string.
  def('singularize', function(string) {
    var word = string.split(/\s/).pop();
    
    if (Inflector.uncountables.contains(word.toLowerCase())) {
      return string;
    }
    
    var inflection = Inflector.singulars.find(function(singular) {
      return singular[0].test(word);
    });
    if (inflection) return string.replace(inflection[0], inflection[1]);
    
    return string;
  });
});

classify(Array, function() {
  include(Enumerable);
  
  // Convenience method for slicing/cloning arrays. Useful
  // for turning arguments into an array.
  def(this, 'slice', function(array, start, end) {
    return Array.prototype.slice.call(array, start, end);
  });
  
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
    return Array.slice(this, 0);
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
      if (Object.isArray(value)) {
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
  
  if (!Object.isFunction(Array.prototype.indexOf)) {
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
  
  if (!Object.isFunction(Array.prototype.lastIndexOf)) {
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
    while (Object.isDefined(this.remove(object))) {
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
    return this.charAt(0).toUpperCase() + this.substring(1);
  });
  
  // Tries to find a constant with the name specified. The name
  // is assumed to be the one of a top-level constant.
  def('constantize', function() {
    var names    = this.split('.'),
        constant = global;
        
    names.each(function(name) {
      constant = constant[name];
      if (Object.isUndefined(constant)) throw $break;
    });
        
    return constant;
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
    return this.replace(/[-_]+/g, ' ').capitalize();
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

(function(plural, singular, irregular) {
  plural(/$/, 's');
  plural(/s$/i, 's');
  plural(/(ax|test)is$/i, '$1es');
  plural(/(octop|vir)us$/i, '$1i');
  plural(/(alias|status)$/i, '$1es');
  plural(/(bu)s$/i, '$1ses');
  plural(/(buffal|tomat)o$/i, '$1oes');
  plural(/([ti])um$/i, '$1a');
  plural(/sis$/i, 'ses');
  plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves');
  plural(/(hive)$/i, '$1s');
  plural(/([^aeiouy]|qu)y$/i, '$1ies');
  plural(/(x|ch|ss|sh)$/i, '$1es');
  plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');
  plural(/([m|l])ouse$/i, '$1ice');
  plural(/^(ox)$/i, '$1en');
  plural(/(quiz)$/i, '$1zes');
  
  singular(/s$/i, '');
  singular(/(n)ews$/i, '$1ews');
  singular(/([ti])a$/i, '$1um');
  singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis');
  singular(/(^analy)ses$/i, '$1sis');
  singular(/([^f])ves$/i, '$1fe');
  singular(/(hive)s$/i, '$1');
  singular(/(tive)s$/i, '$1');
  singular(/([lr])ves$/i, '$1f');
  singular(/([^aeiouy]|qu)ies$/i, '$1y');
  singular(/(s)eries$/i, '$1eries');
  singular(/(m)ovies$/i, '$1ovie');
  singular(/(x|ch|ss|sh)es$/i, '$1');
  singular(/([m|l])ice$/i, '$1ouse');
  singular(/(bus)es$/i, '$1');
  singular(/(o)es$/i, '$1');
  singular(/(shoe)s$/i, '$1');
  singular(/(cris|ax|test)es$/i, '$1is');
  singular(/(octop|vir)i$/i, '$1us');
  singular(/(alias|status)es$/i, '$1');
  singular(/^(ox)en/i, '$1');
  singular(/(vert|ind)ices$/i, '$1ex');
  singular(/(matr)ices$/i, '$1ix');
  singular(/(quiz)zes$/i, '$1');
  singular(/(database)s$/i, '$1');
  
  irregular('person', 'people');
  irregular('man', 'men');
  irregular('child', 'children');
  irregular('sex', 'sexes');
  irregular('move', 'moves');
  irregular('cow', 'kine');
  
  Inflector.uncountable(
    'equipment',
    'information',
    'rice',
    'money',
    'species',
    'series',
    'fish',
    'sheep'
  );
})(Inflector.plural, Inflector.singular, Inflector.irregular);

})();
