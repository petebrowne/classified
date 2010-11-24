classify('Hash', function() {
  include(Enumerable);

  //----------------------------------
  //  Constructor
  //----------------------------------

  def('initialize', function(object) {
    this.__object__ = object instanceof Hash ? object.toObject() : Object.clone(object);
  });
  
  //----------------------------------
  //  Methods
  //----------------------------------
  
  // Iterates over the name/value pairs in the hash.
  def('__each__', function(iterator) {
    var object = this.__object__;
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var value  = object[key];
        var pair   = [ key, value ];
        pair.key   = key;
        pair.value = value;
        iterator.call(null, pair);
      }
    }
  });
  
  // Returns the stored value for the given `key`.
  def('get', function(key) {
    var object = this.__object__;
    
    if (object[key] !== Object.prototype[key]) {
      return object[key];
    }
  });
  
  // Stores `value` in the hash using the key `key` and returns `value`.
  def('set', function(key, value) {
    return this.__object__[key] = value;;
  });
  
  // Deletes the stored pair for the given `key` from the hash
  // and returns its value.
  def('unset', function(key) {
    var object = this.__object__,
        value  = object[key];
        
    delete object[key];
    return value;
  });
  
  // Returns an array of all the keys in the hash
  def('keys', function() {
    return this.collect(function(pair) {
      return pair.key;
    });
  });
  
  // Returns a new hash instance with the key/value pairs merged in;
  // this hash remains unchanged.
  def('merge', function(object) {
    return new Hash(this).update(object);
  });
  
  // Returns a new hash instance where the current properties are merged
  // into the given key/value pairs; this hash remains unchanged.
  def('reverseMerge', function(object) {
    return new Hash(object).update(this);
  });
  
  // Returns a cloned, vanilla object whose properties (and property values)
  // match the keys (and values) from the hash.
  def('toObject', function() {
    return Object.clone(this.__object__);
  });
  
  // Updates a hash *in place* with the key/value pairs of `object`,
  // returns the Hash.
  def('update', function(object) {
    if (object instanceof Hash) {
      this.update(object.__object__);
    }
    else {
      Object.extend(this.__object__, object);
    }
    return this;
  });
  
  // Returns an array of all the values in the hash
  def('values', function() {
    return this.collect(function(pair) {
      return pair.value;
    });
  });
});

// Alias method for creating Hashes.
def('$H', function(object) {
  return new Hash(object);
});
