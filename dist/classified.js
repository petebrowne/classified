//--------------------------------------------------------------------------
//
//  Classified.js, version 0.2.1
//  Copyright (c) 2010, Peter Browne
//
//  Dependencies:
//  - classify  0.10.0  http://github.com/petebrowne/classify
//
//--------------------------------------------------------------------------

// When using the Enumerable loops, throwing this object
// will break out of the loop early;
var $break = {};

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

classify(Array, function() {
  include(Enumerable);
  
  if (typeof Array.prototype.forEach === 'undefined') {
    def('__each__', function(iterator) {
      for (var i = 0, n = this.length; i < n; i++) {
        iterator.call(null, this[i]);
      }
    });
  }
  else {
    alias('__each__', 'forEach');
  }
  
  if (typeof Array.prototype.indexOf === 'undefined') {
    def('indexOf', function(item) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (this[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }
  
  if (typeof Array.prototype.lastIndexOf === 'undefined') {
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

classify(RegExp, function() {
  def(this, 'escape', function(string) {
    return String(string).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  });
});

classify(String, function() {
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
               .replace(/-/g, "_")
               .toLowerCase();
  });
});
