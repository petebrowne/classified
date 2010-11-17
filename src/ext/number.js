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
