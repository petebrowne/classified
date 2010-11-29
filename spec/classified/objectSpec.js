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
  
  describe('.clone', function() {
    it('returns an empty object if given no properties', function() {
      expect(Object.clone()).toEqual({});
    });
    
    it('returns an object equal to the given properties', function() {
      var properties = { 'foo' : 'bar' };
      
      expect(Object.clone(properties)).toEqual(properties);
    });
    
    it('returns a clone of the given object', function() {
      var properties = { 'foo' : 'bar' };
      
      expect(Object.clone(properties)).not.toBe(properties);
    });
  });
  
  describe('.each', function() {
    it('loops over each property of an object', function() {
      var object = { 'a' : 1, 'b' : 2 };
      var keys   = [];
      var values = [];
      
      Object.each(object, function(key, value) {
        keys.push(key);
        values.push(value);
      });
      
      expect(keys).toEqual([ 'a', 'b' ]);
      expect(values).toEqual([ 1, 2 ]);
    });
  });
});
