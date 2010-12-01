extend(Object, function() {
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
  if (typeof Object.keys === UNDEFINED) {
    def('keys', function(object) {
      if (typeof object !== 'object') throw new TypeError();
      var results = [];
      this.each(object, function(key, value) {
        results.push(key);
      });
      return results;
    });
  }
  
  // Returns an array of the object's property values.
  def('values', function(object) {
    var results = [];
    this.each(object, function(key, value) {
      results.push(value);
    });
    return results;
  });
  
  // Returns `true` if `object` is of type `undefined`; `false` otherwise.
  def('isUndefined', function(value) {
    return typeof value === 'undefined';
  });
  
  // Returns `false` if `object` is of type `undefined`; `true` otherwise.
  def('isDefined', function(value) {
    return !Object.isUndefined(value);
  });
});
