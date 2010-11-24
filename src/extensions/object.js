extend(Object, function() {
  def('extend', function(original, extension) {
    for (var property in extension) {
      original[property] = extension[property];
    }
    return original;
  });
  
  def('clone', function(properties) {
    return this.extend({}, properties);
  });
});
