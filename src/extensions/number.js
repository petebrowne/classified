classify(Number, function() {
  // Returns the absolute value of the number. Convenience method that simply
  // calls `Math.abs` on this instance and returns the result.
  def('abs', function() {
    return Math.abs(this);
  });
  
  // Rounds the number to the nearest integer. Convenience method that simply
  // calls `Math.round` on this instance and returns the result.
  def('round', function() {
    return Math.round(this);
  });
  
  // Returns the smallest integer greater than or equal to the number.
  // Convenience method that simply calls `Math.ceil` on this instance and
  // returns the result.
  def('ceil', function() {
    return Math.ceil(this);
  });
  
  // Returns the largest integer less than or equal to the number.
  // Convenience method that simply calls `Math.floor` on this instance and
  // returns the result.
  def('floor', function() {
    return Math.floor(this);
  });
});
