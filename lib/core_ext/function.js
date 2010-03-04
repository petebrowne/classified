classify("Function", function() {
  /**
   * 
   */
  def("bind", function(context) {
    if (context === undefined) {
      return this;
    }
    var method = this;
    return function() {
      return method.apply(context, arguments);
    }
  });
});
