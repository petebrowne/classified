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
  
  describe('Enumberable methods', function() {
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
      
      it('uses $break to stop iterators', function() {
        var object     = { 'a' : 1, 'b' : 2 };
        var iterations = 0;
        Object.each(object, function(key, value) {
          iterations++;
          if (value == 1) throw $break;
        });
        expect(iterations).toEqual(1);
      });
    });
  
    describe('.all', function() {
      it('returns false if anything returns false', function() {
        var object = { 'a' : 'a', 'b' : 'b', 'c' : '1' };
        expect(Object.all(object, function(key, value) {
          return value.match(/\D/);
        })).toBe(false);
      });
    
      it('returns true if everything returns true', function() {
        var object = { 'a' : 'a', 'b' : 'b', 'c' : 'c' };
        expect(Object.all(object, function(key, value) {
          return value.match(/\D/);
        })).toBe(true);
      });
    
      it('evaluates without an iterator', function() {
        expect(Object.all({ 'a' : 1, 'b' : 2 })).toBe(true);
        expect(Object.all({ 'a' : 0, 'b' : 1 })).toBe(false);
      });
    });
  
    describe('.any', function() {
      it('returns true if anything returns true', function() {
        var object = { 'a' : 'a', 'b' : 'b', 'c' : '1' };
        expect(Object.any(object, function(key, value) {
          return value.match(/\d/);
        })).toBe(true);
      });
    
      it('returns false if everything returns false', function() {
        var object = { 'a' : 'a', 'b' : 'b', 'c' : 'c' };
        expect(Object.any(object, function(key, value) {
          return value.match(/\d/);
        })).toBe(false);
      });
    
      it('evaluates without an iterator', function() {
        expect(Object.any({ 'a' : 0, 'b' : 1 })).toBe(true);
        expect(Object.any({ 'a' : 0, 'b' : 0 })).toBe(false);
      });
    });
    
    describe('.include', function() {
      it('returns true if it has the item', function() {
        expect(Object.include({ 'a' : 1, 'b' : 2 }, 2)).toBe(true);
      });
    
      it("returns false if it doesn't have the item", function() {
        expect(Object.include({ 'a' : 1, 'b' : 2 }, 3)).toBe(false);
      });
    });
  });
  
  describe('.keys', function() {
    describe('when given an empty object', function() {
      it('returns an empty array', function() {
        expect(Object.keys({})).toEqual([]);
      });
    });
    
    describe('when given an object with properties', function() {
      it('returns an array of those properties', function() {
        expect(Object.keys({ 'a' : 1, 'b' : 2, 'c' : 3 }).sort()).toEqual([ 'a', 'b', 'c' ]);
      });
    });
  });
  
  describe('.values', function() {
    describe('when given an empty object', function() {
      it('returns an empty array', function() {
        expect(Object.values({})).toEqual([]);
      });
    });
    
    describe('when given an object with properties', function() {
      it('returns an array of the values', function() {
        expect(Object.values({ 'a' : 1, 'b' : 2, 'c' : 3 }).sort()).toEqual([ 1, 2, 3 ]);
      });
    });
  });
  
  describe('type checking', function() {
    var noop  = function() {};
    var undef = noop();
    var date  = new Date();
    
    describe('.isUndefined', function() {
      it('returns true when the value is undefined', function() {
        expect(Object.isUndefined(undef)).toBe(true);
      });
      
      it('returns false when the value is defined', function() {
        expect(Object.isUndefined(null)).toBe(false);
        expect(Object.isUndefined(false)).toBe(false);
        expect(Object.isUndefined(0)).toBe(false);
        expect(Object.isUndefined('')).toBe(false);
        expect(Object.isUndefined(noop)).toBe(false);
        expect(Object.isUndefined({})).toBe(false);
        expect(Object.isUndefined([])).toBe(false);
        expect(Object.isUndefined(date)).toBe(false);
        expect(Object.isUndefined(/asdf/)).toBe(false);
      });
    });
    
    describe('.isDefined', function() {
      it('returns false when the value is undefined', function() {
        expect(Object.isDefined(undef)).toBe(false);
      });
      
      it('returns true when the value is defined', function() {
        expect(Object.isDefined(null)).toBe(true);
        expect(Object.isDefined(false)).toBe(true);
        expect(Object.isDefined(0)).toBe(true);
        expect(Object.isDefined('')).toBe(true);
        expect(Object.isDefined(noop)).toBe(true);
        expect(Object.isDefined({})).toBe(true);
        expect(Object.isDefined([])).toBe(true);
        expect(Object.isDefined(date)).toBe(true);
        expect(Object.isDefined(/asdf/)).toBe(true);
      });
    });
    
    describe('.isString', function() {
      it('returns true when the value is a string', function() {
        expect(Object.isString('')).toBe(true);
      });
      
      it('returns false when the value is not a string', function() {
        expect(Object.isString(undef)).toBe(false);
        expect(Object.isString(null)).toBe(false);
        expect(Object.isString(false)).toBe(false);
        expect(Object.isString(0)).toBe(false);
        expect(Object.isString(noop)).toBe(false);
        expect(Object.isString({})).toBe(false);
        expect(Object.isString([])).toBe(false);
        expect(Object.isString(date)).toBe(false);
        expect(Object.isString(/asdf/)).toBe(false);
        expect(Object.isString(document)).toBe(false);
      });
    });
    
    describe('.isNumber', function() {
      it('returns true when the value is a number', function() {
        expect(Object.isNumber(0)).toBe(true);
      });
      
      it('returns false when the value is not a number', function() {
        expect(Object.isNumber(undef)).toBe(false);
        expect(Object.isNumber(null)).toBe(false);
        expect(Object.isNumber(false)).toBe(false);
        expect(Object.isNumber('')).toBe(false);
        expect(Object.isNumber(noop)).toBe(false);
        expect(Object.isNumber({})).toBe(false);
        expect(Object.isNumber([])).toBe(false);
        expect(Object.isNumber(date)).toBe(false);
        expect(Object.isNumber(/asdf/)).toBe(false);
        expect(Object.isNumber(document)).toBe(false);
      });
    });
    
    describe('.isArray', function() {
      it('returns true when the value is an array', function() {
        expect(Object.isArray([])).toBe(true);
      });
      
      it('returns false when the value is not an array', function() {
        expect(Object.isArray(undef)).toBe(false);
        expect(Object.isArray(null)).toBe(false);
        expect(Object.isArray(false)).toBe(false);
        expect(Object.isArray('')).toBe(false);
        expect(Object.isArray(0)).toBe(false);
        expect(Object.isArray(noop)).toBe(false);
        expect(Object.isArray({})).toBe(false);
        expect(Object.isArray(date)).toBe(false);
        expect(Object.isArray(/asdf/)).toBe(false);
        expect(Object.isArray(document)).toBe(false);
      });
    });
    
    describe('.isFunction', function() {
      it('returns true when the value is a function', function() {
        expect(Object.isFunction(noop)).toBe(true);
      });
      
      it('returns false when the value is not a function', function() {
        expect(Object.isFunction(undef)).toBe(false);
        expect(Object.isFunction(null)).toBe(false);
        expect(Object.isFunction(false)).toBe(false);
        expect(Object.isFunction('')).toBe(false);
        expect(Object.isFunction(0)).toBe(false);
        expect(Object.isFunction({})).toBe(false);
        expect(Object.isFunction([])).toBe(false);
        expect(Object.isFunction(date)).toBe(false);
        expect(Object.isFunction(/asdf/)).toBe(false);
        expect(Object.isFunction(document)).toBe(false);
      });
    });
    
    describe('.isDate', function() {
      it('returns true when the value is a date', function() {
        expect(Object.isDate(date)).toBe(true);
      });
      
      it('returns false when the value is not a date', function() {
        expect(Object.isDate(undef)).toBe(false);
        expect(Object.isDate(null)).toBe(false);
        expect(Object.isDate(false)).toBe(false);
        expect(Object.isDate('')).toBe(false);
        expect(Object.isDate(0)).toBe(false);
        expect(Object.isDate(noop)).toBe(false);
        expect(Object.isDate({})).toBe(false);
        expect(Object.isDate([])).toBe(false);
        expect(Object.isDate(/asdf/)).toBe(false);
        expect(Object.isDate(document)).toBe(false);
      });
    });
    
    describe('.isObject', function() {
      it('returns true when the value is an object', function() {
        expect(Object.isObject({})).toBe(true);
      });
      
      it('returns false when the value is not an object', function() {
        expect(Object.isObject(undef)).toBe(false);
        expect(Object.isObject(null)).toBe(false);
        expect(Object.isObject(false)).toBe(false);
        expect(Object.isObject('')).toBe(false);
        expect(Object.isObject(0)).toBe(false);
        expect(Object.isObject(noop)).toBe(false);
        expect(Object.isObject([])).toBe(false);
        expect(Object.isObject(date)).toBe(false);
        expect(Object.isObject(/asdf/)).toBe(false);
      });
    });
    
    describe('.isBoolean', function() {
      it('returns true when the value is a true boolean', function() {
        expect(Object.isBoolean(true)).toBe(true);
        expect(Object.isBoolean(false)).toBe(true);
      });
      
      it('returns false when the value is not an object', function() {
        expect(Object.isBoolean(undef)).toBe(false);
        expect(Object.isBoolean(null)).toBe(false);
        expect(Object.isBoolean('')).toBe(false);
        expect(Object.isBoolean(0)).toBe(false);
        expect(Object.isBoolean(noop)).toBe(false);
        expect(Object.isBoolean({})).toBe(false);
        expect(Object.isBoolean([])).toBe(false);
        expect(Object.isBoolean(date)).toBe(false);
        expect(Object.isBoolean(/asdf/)).toBe(false);
      });
    });
    
    describe('.isRegExp', function() {
      it('returns true when the value is a regex', function() {
        expect(Object.isRegExp(/asdf/)).toBe(true);
      });
      
      it('returns false when the value is not an object', function() {
        expect(Object.isRegExp(undef)).toBe(false);
        expect(Object.isRegExp(null)).toBe(false);
        expect(Object.isRegExp(false)).toBe(false);
        expect(Object.isRegExp('')).toBe(false);
        expect(Object.isRegExp(0)).toBe(false);
        expect(Object.isRegExp(noop)).toBe(false);
        expect(Object.isRegExp([])).toBe(false);
        expect(Object.isRegExp(date)).toBe(false);
      });
    });
  });
});
