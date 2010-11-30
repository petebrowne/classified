describe('Function', function() {
  describe('#bind', function() {
    var method = function() {
      return this;
    };
    
    it('changes the context of the function', function() {
      expect(method.bind('hello')()).toEqual('hello');
    });
    
    it('does not wrap the function if the context is undefined', function() {
      expect(method.bind()).toBe(method);
      expect(method.bind(null)).toBe(method);
    });
  });
});
