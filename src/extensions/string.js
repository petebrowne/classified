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
