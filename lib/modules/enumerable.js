/**
 * 
 */
var $break = {};

/**
 * 
 */
module("Enumerable", function() {
  /**
   * 
   */
  var $identity = function(item) {
    return item;
  };
  
  /**
   * 
   */
  def("each", function(iterator, context) {
    var index = 0;
    try {
      this._each(function(value) {
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

  /**
   * 
   */
  def("all", function(iterator, context) {
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
  alias("every", "all");
  
  /**
   * 
   */
  def("any", function(iterator, context) {
    iterator = iterator || $identity;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index)) {
        throw $break;
      }
    });
    return result;
  });
  alias("some", "any");
  
  /**
   * 
   */
  def("collect", function(iterator, context) {
    iterator = iterator || $identity;
    return this.inject([], function(results, value, index) {
      results.push(iterator.call(context, value, index));
      return results;
    });
  });
  alias("map", "collect");
  
  /**
   * 
   */
  def("detect", function(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  });
  alias("find", "detect");
  
  /**
   * 
   */
  def("include", function(item) {
    if (typeof this.indexOf === "function") {
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
  
  /**
   * 
   */
  def("inject", function(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  });
  
  /**
   * 
   */
  def("reject", function(iterator, context) {
    return this.inject([], function(results, value, index) {
      if (!iterator.call(context, value, index)) {
        results.push(value);
      }
      return results;
    });
  });
  
  /**
   * 
   */
  def("select", function(iterator, context) {
    return this.inject([], function(results, value, index) {
      if (iterator.call(context, value, index)) {
        results.push(value);
      }
      return results;
    });
  });
  alias("findAll", "select");
});
