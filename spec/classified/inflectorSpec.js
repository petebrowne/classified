describe('Inflector', function() {
  describe('.plural', function() {
    it('adds a new plural rule', function() {
      Inflector.plural('singular', 'plural');
      expect(Inflector.plurals[0][0].test('singular')).toBe(true);
      expect(Inflector.plurals[0][1]).toEqual('plural');
    });
  });
  
  describe('.singular', function() {
    it('adds a new singular rule', function() {
      Inflector.singular('plural', 'singular');
      expect(Inflector.singulars[0][0].test('plural')).toBe(true);
      expect(Inflector.singulars[0][1]).toEqual('singular');
    });
  });
  
  describe('.pluralize', function() {
    Object.each(SingularToPlural, function(singular, plural) {
      it("pluralizes '" + singular + "' to '" + plural + "'", function() {
        expect(Inflector.pluralize(singular)).toEqual(plural);
        expect(Inflector.pluralize(singular.capitalize())).toEqual(plural.capitalize());
      });
    });
  });
  
  describe('.singularize', function() {
    Object.each(SingularToPlural, function(singular, plural) {
      it("singularizes '" + plural + "' to '" + singular + "'", function() {
        expect(Inflector.singularize(plural)).toEqual(singular);
        expect(Inflector.singularize(plural.capitalize())).toEqual(singular.capitalize());
      });
    });
  });
});
