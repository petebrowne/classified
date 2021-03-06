extend(Object, function() {
  
  // Shortcut to the `toString` method used for type checking.
  var toString = Object.prototype.toString;
  
  // An iterator function where the value of the key/value
  // pair is returned. Used in Enumerable Object functions
  // when an iterator is not given.
  function $identity(key, value) { return value; }
  
  //----------------------------------
  //  Typecasting Methods
  //----------------------------------
  
  // Returns `true` if `object` is of type `undefined`.
  def('isUndefined', function(object) {
    return typeof object === 'undefined';
  });
  
  // Returns `true` if `object` is not undefined.
  def('isDefined', function(object) {
    return typeof object !== 'undefined';
  });
  
  // Returns `true` if `object` is an object.
  def('isObject', function(object) {
    if (object == null) return false;
    return toString.call(object) === '[object Object]';
  });
  
  // Returns `true` if `object` is a true boolean.
  def('isBoolean', function(object) {
    return toString.call(object) === '[object Boolean]';
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
    try {
      for (var property in object) {
        if (object.hasOwnProperty(property)) {
          iterator.call(context, property, object[property]);
        }
      }
    }
    catch (error) {
      if (error !== $break) throw error;
    }
  });
  
  // Returns true if every value in the object satisfies
  // the provided testing function.
  def('all', function(object, iterator, context) {
    iterator = iterator || $identity;
    var result = true;
    Object.each(object, function(key, value) {
      if (!iterator.call(context, key, value)) {
        result = false;
        throw $break;
      }
    });
    return result;
  });
  alias('every', 'all');
  
  // Returns true if at least one value in the object satisfies
  // the provided testing function.
  def('any', function(object, iterator, context) {
    iterator = iterator || $identity;
    var result = false;
    Object.each(object, function(key, value) {
      if (result = !!iterator.call(context, key, value)) throw $break;
    });
    return result;
  });
  alias('some', 'any');
  
  // Tests for the presence of a specified value in the object.
  def('include', function(object, value) {
    return Object.any(object, function(key, objectValue) {
      return objectValue === value;
    });
  });
  alias('contains', 'include');
  
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
