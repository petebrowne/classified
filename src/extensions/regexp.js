classify(RegExp, function() {
  // Escapes any characters in the string that have special meaning in a
  // regular expression.
  def(this, 'escape', function(string) {
    return String(string).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  });
});
