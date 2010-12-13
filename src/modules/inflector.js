module('Inflector', function() {
  
  this.plurals      = [];
  this.singulars    = [];
  this.uncountables = [];
  
  // Specifies a new pluralization rule and its replacement.
  // The rule can either be a string or a regular expression.
  // The replacement should always be a string that may include
  // references to the matched data from the rule.
  def('plural', function(rule, replacement) {
    if (!Object.isRegExp(rule)) rule = new RegExp(rule + '$');
    Inflector.plurals.unshift([ rule, replacement ]);
  });
  
  // Specifies a new singularization rule and its replacement.
  // The rule can either be a string or a regular expression.
  // The replacement should always be a string that may include
  // references to the matched data from the rule.
  def('singular', function(rule, replacement) {
    if (!Object.isRegExp(rule)) rule = new RegExp(rule + '$');
    Inflector.singulars.unshift([ rule, replacement ]);
  });
  
  // Specifies a new irregular that applies to both pluralization
  // and singularization at the same time. This can only be used
  // for strings, not regular expressions. You simply pass the
  // irregular in singular and plural form.
  def('irregular', function(singular, plural) {
    Inflector.plural(
      new RegExp('(' + singular.charAt(0) + ')' + singular.slice(1) + '$', 'i'), '$1' + plural.slice(1)
    );
    Inflector.singular(
      new RegExp('(' + plural.charAt(0) + ')' + plural.slice(1) + '$', 'i'), '$1' + singular.slice(1)
    );
  });
  
  // Add uncountable words that shouldn't cannot be converted
  // to singular or plural forms.
  def('uncountable', function() {
    Inflector.uncountables = Inflector.uncountables.concat(Array.slice(arguments));
  });
  
  // Returns the plural form of the word in the string.
  def('pluralize', function(string) {
    var word = string.split(/\s/).pop();
    
    if (Inflector.uncountables.contains(word.toLowerCase())) {
      return string;
    }
    
    var inflection = Inflector.plurals.find(function(plural) {
      return plural[0].test(word);
    });
    if (inflection) return string.replace(inflection[0], inflection[1]);
    
    return string;
  });
  
  // The reverse of `pluralize`, returns the singular form of a word in a string.
  def('singularize', function(string) {
    var word = string.split(/\s/).pop();
    
    if (Inflector.uncountables.contains(word.toLowerCase())) {
      return string;
    }
    
    var inflection = Inflector.singulars.find(function(singular) {
      return singular[0].test(word);
    });
    if (inflection) return string.replace(inflection[0], inflection[1]);
    
    return string;
  });
});
