describe('Object', function() {
  describe('.extend', function() {
    it('returns the same object if extension is null', function() {
      var object = { 'a' : 1 };
      expect(Object.extend(object, null)).toEqual(object);
    });
    
    it('adds properties from the extension', function() {
      var object = { 'a' : 1 };
      expect(Object.extend(object, { 'b' : 2 })).toEqual({ 'a' : 1, 'b' : 2 });
    });
    
    it('overwrites original properties', function() {
      var object = { 'a' : 1 };
      expect(Object.extend(object, { 'a' : 0, 'b' : 1 })).toEqual({ 'a' : 0, 'b' : 1 });
    });
  });
});
