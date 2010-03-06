module("RegExp", function() {
  /**
   * 
   */
  def("escape", function(string) {
    return String(string).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
  });
});
