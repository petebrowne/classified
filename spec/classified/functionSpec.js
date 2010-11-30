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
    
    it('curries arguments for the function', function() {
      var method = function() {
        return Array.prototype.slice.call(arguments);
      };
      
      expect(method.bind(null, 1, 2, 3)(4, 5)).toEqual([ 1, 2, 3, 4, 5 ]);
    });
  });
  
  describe('#curry', function() {
    it('curries arguments for the function', function() {
      var method = function() {
        return Array.prototype.slice.call(arguments);
      };
      
      expect(method.curry(1, 2, 3)(4, 5)).toEqual([ 1, 2, 3, 4, 5 ]);
    });
  });
  
  describe('#delay', function() {
    it('delays a function by given amount of time', function() {
      var delayed = false;
      var method = function() {
        delayed = true;
      };
      
      method.delay(0.1);
      expect(delayed).toBe(false);
      
      waits(150);
      runs(function() {
        expect(delayed).toBe(true);
      });
    });
    
    it('passes arguments to the delayed function', function() {
      var args;
      var method = function() {
        args = Array.prototype.slice.call(arguments);
      };
      
      method.delay(0.1, 1, 2, 3);
      expect(args).toBeUndefined();
      
      waits(150);
      runs(function() {
        expect(args).toEqual([ 1, 2, 3 ]);
      });
    });
  });
  
  describe('#defer', function() {
    it('defers a function', function() {
      var defered = false;
      var method = function() {
        defered = true;
      };
      
      method.defer();
      expect(defered).toBe(false);
      
      waits(50);
      runs(function() {
        expect(defered).toBe(true);
      });
    });
    
    it('passes arguments to the deferred function', function() {
      var args;
      var method = function() {
        args = Array.prototype.slice.call(arguments);
      };
      
      method.defer(1, 2, 3);
      expect(args).toBeUndefined();
      
      waits(50);
      runs(function() {
        expect(args).toEqual([ 1, 2, 3 ]);
      });
    });
  });
  
  describe('#stop', function() {
    it('stops delayed calls', function() {
      var delayed = false;
      var method = function() {
        delayed = true;
      };
      
      method.delay(0.1);
      method.stop();
      
      waits(150);
      runs(function() {
        expect(delayed).toBe(false);
      });
    });
    
    it('stops deferred calls', function() {
      var defered = false;
      var method = function() {
        defered = true;
      };
      
      method.defer();
      method.stop();
      
      waits(50);
      runs(function() {
        expect(defered).toBe(false);
      });
    });
  });
});
