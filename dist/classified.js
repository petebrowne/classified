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
  
  def('collect', function(iterator, context) {
    iterator = iterator || $identity;
    return this.inject([], function(results, value, index) {
      results.push(iterator.call(context, value, index));
      return results;
    });
  });
  alias('map', 'collect');
  
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
  
  def('inject', function(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  });
  alias('reduce', 'inject');
  
  def('reject', function(iterator, context) {
    return this.inject([], function(results, value, index) {
      if (!iterator.call(context, value, index)) {
        results.push(value);
      }
      return results;
    });
  });
  alias('not', 'reject');
  
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
    var events   = this.__events__ || (this.__events__ = {});
    var handlers = events[type] || (events[type] = []);
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
  
  def('__each__', function(iterator) {
    for (var i = 0, n = this.length; i < n; i++) {
      iterator.call(null, this[i]);
    }
  });
  
  if (typeof Array.prototype.indexOf === UNDEFINED) {
    def('indexOf', function(item) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (this[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }
  
  if (typeof Array.prototype.lastIndexOf === UNDEFINED) {
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
  
  def('clear', function() {
    this.length = 0;
    return this;
  });
  
  def('first', function() {
    return this[0];
  });
  
  def('last', function() {
    return this[this.length - 1];
  });
  
  def('compact', function() {
    return this.reject(function(value) {
      return value == null;
    });
  });
  
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
  def('abs', function() {
    return Math.abs(this);
  });
  
  def('ceil', function() {
    return Math.ceil(this);
  });
  
  def('floor', function() {
    return Math.floor(this);
  });
  
  def('round', function() {
    return Math.round(this);
  });
});

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

classify(RegExp, function() {
  def(this, 'escape', function(string) {
    return String(string).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  });
});

classify(String, function() {

  def('endsWith', function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
  });
  
  def('include', function(pattern) {
    return this.indexOf(pattern) > -1;
  });
  
  def('isBlank', function() {
    return /^\s*$/.test(this);
  });
  
  def('isEmpty', function() {
    return this == '';
  });
  
  def('startsWith', function(pattern) {
    return this.lastIndexOf(pattern, 0) === 0;
  });
  
  def('strip', function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  });
  
  //----------------------------------
  //  Inflector Methods
  //----------------------------------
  
  def('camelize', function() {
    return this.replace(/[-_]+(.)?/g, function(match, char) {
      return char ? char.toUpperCase() : '';
    });
  });
  
  def('capitalize', function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  });
  
  def('dasherize', function() {
    return this.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
               .replace(/([a-z\d])([A-Z])/g, '$1-$2')
               .replace(/_/g, '-')
               .toLowerCase();
  });
  
  def('humanize', function() {
    return this.replace(/[_|-]+/g, ' ').capitalize();
  });
  
  def('titleize', function() {
    return this.underscore().humanize().replace(/\b('?[a-z])/g, function(match, word) {
      return word.capitalize();
    });
  });
  alias('toTitleCase', 'titleize');
  
  def('underscore', function() {
    return this.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  });
});

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

})();
