describe('Hash', function() {
  describe('#initialize', function() {
    it('clones the given properties', function() {
      var object = { 'a' : 1 };
      var hash   = new Hash(object);
      hash['b']  = 2;
      
      expect(hash['a']).toEqual(1);
      expect(hash['b']).toEqual(2);
      expect(object['b']).toBeUndefined();
    });
    
    it('clones the given hash', function() {
      var hash1  = new Hash({ 'a' : 1 });
      var hash2  = new Hash(hash1);
      hash2['b'] = 2;
      
      expect(hash2['b']).toEqual(2);
      expect(hash1['b']).toBeUndefined();
    });
    
    it('can be called using $H alias', function() {
      var hash = $H({ 'a' : 1 });
      
      expect(hash).toBeAnInstanceOf(Hash);
    });
  });
  
  describe('#keys', function() {
    it('returns an array of all the keys', function() {
      var hash = new Hash({ 'a' : 1, 'b' : 2 });
      
      expect(hash.keys()).toEqual([ 'a', 'b' ]);
    });
  });
  
  describe('#merge', function() {
    it('creates a new hash with the key/value pairs merged in', function() {
      var hash1 = new Hash({ 'a' : 1 });
      var hash2 = hash1.merge({ 'a' : 0, 'b' : 1 });
      
      expect(hash1['a']).toEqual(1);
      expect(hash1['b']).toBeUndefined();
      expect(hash2['a']).toEqual(0);
      expect(hash2['b']).toEqual(1);
      expect(hash1).not.toBe(hash2);
    });
  });
  
  describe('#reverseMerge', function() {
    it('creates a new hash with the key/value pairs merged in', function() {
      var hash1 = new Hash({ 'a' : 1 });
      var hash2 = hash1.reverseMerge({ 'a' : 0, 'b' : 1 });
      
      expect(hash1['a']).toEqual(1);
      expect(hash1['b']).toBeUndefined();
      expect(hash2['a']).toEqual(1);
      expect(hash2['b']).toEqual(1);
      expect(hash1).not.toBe(hash2);
    });
  });
  
  describe('#update', function() {
    it('updates a hash with the given properties', function() {
      var hash = new Hash({ 'a' : 1 });
      hash.update({ 'a' : 0, 'b' : 1 });
      
      expect(hash['a']).toEqual(0);
      expect(hash['b']).toEqual(1);
    });
    
    it('updates a hash with the given hash', function() {
      var hash = new Hash({ 'a' : 1 });
      hash.update($H({ 'a' : 0, 'b' : 1 }));
      
      expect(hash['a']).toEqual(0);
      expect(hash['b']).toEqual(1);
    });
  });
  
  describe('#values', function() {
    it('returns an array of all the values', function() {
      var hash = new Hash({ 'a' : 1, 'b' : 2 });
      
      expect(hash.values()).toEqual([ 1, 2 ]);
    });
  });
  
  describe('Enumerable methods', function() {
    it('adds #each', function() {
      var hash   = new Hash({ 'a' : 1, 'b' : 1 });
      var object = {};
      
      hash.each(function(pair) {
        object[pair.key] = pair.value;
      });
      
      expect(object).toEqual({ 'a' : 1, 'b' : 1 });
    });
    
    it('adds #all', function() {
      var hash = new Hash({ 'a' : 1, 'b' : 1 });
      
      expect(hash.all(function(pair) {
        return pair.value == 1;
      })).toBe(true);
    });
    
    it('adds #any', function() {
      var hash = new Hash({ 'a' : 0, 'b' : 1 });
      
      expect(hash.any(function(pair) {
        return pair.value == 1;
      })).toBe(true);
    });
    
    it('adds #collect', function() {
      var hash = new Hash({ 'a' : 0, 'b' : 1 });
      
      expect(hash.collect(function(pair) {
        return pair.value + 1;
      })).toEqual([ 1, 2 ]);
    });
    
    it('adds #detect', function() {
      var hash = new Hash({ 'a' : 0, 'b' : 1 });
      
      expect(hash.detect(function(pair) {
        return pair.value == 1;
      })).toEqualPair([ 'b', 1 ]);
    });
    
    it('adds #include', function() {
      var hash = new Hash({ 'a' : 0, 'b' : 1 });
      
      expect(hash.include(1)).toBe(true);
    });
  
    it('adds #inject', function() {
      var hash = new Hash({ 'a' : 1, 'b' : 2 });
      
      var sum = hash.inject(0, function(sum, pair) {
        return sum + pair.value;
      });
      expect(sum).toEqual(3);
    });
  
    it('adds #reject', function() {
      var hash = new Hash({ 'a' : 0, 'b' : 1, 'c' : 2 });
      
      var rejected = hash.reject(function(pair) {
        return pair.value <= 0;
      });
      
      expect(rejected.length).toEqual(2);
      expect(rejected[0]).toEqualPair([ 'b', 1 ]);
      expect(rejected[1]).toEqualPair([ 'c', 2 ]);
    });
    
    it('adds #select', function() {
      var hash = new Hash({ 'a' : 0, 'b' : 1, 'c' : 2 });
      
      var selected = hash.select(function(pair) {
        return pair.value > 0;
      });
      
      expect(selected.length).toEqual(2);
      expect(selected[0]).toEqualPair([ 'b', 1 ]);
      expect(selected[1]).toEqualPair([ 'c', 2 ]);
    });
  });
});
