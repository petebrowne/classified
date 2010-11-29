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
