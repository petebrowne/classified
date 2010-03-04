module("Inflector", function() {
  
  /**
   * 
   */
  def("camelize", function() {
    return this.replace(/-+(.)?/g, function(match, char) {
      return char ? char.toUpperCase() : "";
    });
  });
  
  /**
   * 
   */
  def("capitalize", function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  });
});
