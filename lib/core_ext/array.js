classify("Array", function() {
  include(Enumerable);
  
  if (Array.prototype.forEach) {
    alias("_each", "forEach");
  }
  else {
    /**
     * 
     */
    def("_each", function(iterator) {
      for (var i = 0, n = this.length; i < n; i++) {
        iterator.call(null, this[i]);
      }
    });
  }
  
  if (!Array.prototype.indexOf) {
    /**
     * 
     */
    def("indexOf", function(item) {
      for (var i = 0, n = array.length; i < n; i++) {
        if (array[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }
  
  if (!Array.prototype.lastIndexOf) {
    /**
     * 
     */
    def("lastIndexOf", function(item) {
      var i = array.length;
      while (i--) {
        if (array[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }
  
  /**
   * 
   */
  def("clear", function() {
    this.length = 0;
    return this;
  });
  
  /**
   * 
   */
  def("first", function() {
    return this[0];
  });
  
  /**
   * 
   */
  def("last", function() {
    return this[this.length - 1];
  });
  
  /**
   * 
   */
  def("compact", function() {
    return this.reject(function(value) {
      return value == null;
    });
  });
  
  /**
   * 
   */
  def("uniq", function(sorted) {
    return this.inject([], function(results, value, index) {
      if (index === 0 || (sorted ? results.last() != value : !results.include(value))) {
        results.push(value);
      }
      return results;
    });
  });
});
