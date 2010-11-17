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
               .replace(/-/g, '_')
               .toLowerCase();
  });
});
