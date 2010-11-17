classify('Hash', function() {
  include(Enumerable);

  //----------------------------------
  //  Constructor
  //----------------------------------

  def('initialize', function(object) {
    this.update(object);
  });
  
  //----------------------------------
  //  Methods
  //----------------------------------
  
  // Looping method required for Enumberable.
  def('__each__', function(iterator) {
    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        var value  = this[key];
        var pair   = [ key, value ];
        pair.key   = key;
        pair.value = value;
        iterator.call(null, pair);
      }
    }
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
  
  // Updates a hash *in place* with the key/value pairs of `object`,
  // returns the Hash.
  def('update', function(object) {
    if (object instanceof Hash) {
      object.each(function(pair) {
        this[pair.key] = pair.value;
      }, this);
    }
    else {
      Object.extend(this, object);
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
