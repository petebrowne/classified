classify(String, function() {
  // Checks if the string ends with `pattern`.
  def('endsWith', function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
  });
  
  // Checks if the string contains `pattern`.
  //
  // Aliased as `contains`.
  def('include', function(pattern) {
    return this.indexOf(pattern) > -1;
  });
  alias('contains', 'include');
  
  // Check if the string is "blank" - either empty (length of `0`) or
  // containing only whitespace.
  def('isBlank', function() {
    return /^\s*$/.test(this);
  });
  
  // Checks if the string is empty.
  def('isEmpty', function() {
    return this == '';
  });
  
  // Checks if the string starts with `pattern`.
  def('startsWith', function(pattern) {
    return this.lastIndexOf(pattern, 0) === 0;
  });
  
  // Strips all leading and trailing whitespace from a string.
  def('strip', function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  });
  
  //----------------------------------
  //  Inflector Methods
  //----------------------------------
  
  // Converts a string separated by dashes into a camelCase equivalent. For
  // instance, `'foo-bar'` would be converted to `'fooBar'`.
  def('camelize', function() {
    return this.replace(/[-_]+(.)?/g, function(match, char) {
      return char ? char.toUpperCase() : '';
    });
  });
  
  // Capitalizes the first letter of a string.
  def('capitalize', function() {
    return this.charAt(0).toUpperCase() + this.substring(1);
  });
  
  // Tries to find a constant with the name specified. The name
  // is assumed to be the one of a top-level constant.
  def('constantize', function() {
    return this.split('.').inject(global, function(constant, name) {
      if (Object.isUndefined(constant)) throw $break;
      return constant[name];
    });
  });
  
  // Converts a camelized string into a series of words separated by an
  // dash (`'-'`). Also replaces underscores `'_'` with dashes.
  def('dasherize', function() {
    return this.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
               .replace(/([a-z\d])([A-Z])/g, '$1-$2')
               .replace(/_/g, '-')
               .toLowerCase();
  });
  
  // Capitalizes the first word and turns underscores and dashes into spaces.
  def('humanize', function() {
    return this.replace(/[-_]+/g, ' ').capitalize();
  });
  
  // Returns the plural form of the word in the string.
  def('pluralize', function() {
    return Inflector.pluralize(this);
  });
  
  // The reverse of `pluralize`, returns the singular form of a word in a string.
  def('singularize', function() {
    return Inflector.singularize(this);
  });
  
  // Capitalizes all the words and replaces some characters in the string to create a nicer looking title.
  def('titleize', function() {
    return this.underscore().humanize().replace(/\b('?[a-z])/g, function(match, word) {
      return word.capitalize();
    });
  });
  alias('toTitleCase', 'titleize');
  
  // Converts a camelized string into a series of words separated by an
  // underscore (`'_'`). Also replaces dashes `'-'` with underscores.
  def('underscore', function() {
    return this.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  });
});
