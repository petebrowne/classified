describe('Array', function() {
  describe('#clear', function() {
    it('empties the array', function() {
      var numbers = [ 1, 2, 3 ];
      numbers.clear();
      expect(numbers.length).toEqual(0);
    });
  });
  
  describe('#compact', function() {
    it('removes null values from the array', function() {
      var values = [ 1, 2, null, 3, null ];
      expect(values.compact()).toEqual([ 1, 2, 3 ]);
    });
  });
  
  describe('#first', function() {
    it('returns the first value from the array', function() {
      var numbers = [ 1, 2, 3 ];
      expect(numbers.first()).toEqual(1);
    });
  });
  
  describe('#isBlank', function() {
    it('returns true if there are no elements in the array', function() {
      expect(([]).isBlank()).toBe(true);
    });
    
    it('returns false if there are elements in the array', function() {
      expect(([ 1, 2, 3 ]).isBlank()).toBe(false);
    });
    
    it('returns true if there are only nulls in the array', function() {
      expect(([ null, null ]).isBlank()).toBe(true);
    });
  });
  
  describe('#isEmpty', function() {
    it('returns true if there are no elements in the array', function() {
      expect(([]).isEmpty()).toBe(true);
    });
    
    it('returns false if there are elements in the array', function() {
      expect(([ 1, 2, 3 ]).isEmpty()).toBe(false);
    });
    
    it('returns false if there are only nulls in the array', function() {
      expect(([ null, null ]).isEmpty()).toBe(false);
    });
  });
  
  describe('#indexOf', function() {
    it('returns the index of the found item', function() {
      var values = [ 'a', 'b', 'c', 'b' ];
      expect(values.indexOf('b')).toEqual(1);
    });
    
    it("returns -1 if the item isn't found", function() {
      var values = [ 'a', 'b', 'c' ];
      expect(values.indexOf('d')).toEqual(-1);
    });
  });
  
  describe('#last', function() {
    it('returns the last value from the array', function() {
      var numbers = [ 1, 2, 3 ];
      expect(numbers.last()).toEqual(3);
    });
  });
  
  describe('#lastIndexOf', function() {
    it('returns the last index of the found item', function() {
      var values = [ 'a', 'b', 'c', 'b' ];
      expect(values.lastIndexOf("b")).toEqual(3);
    });
    
    it("returns -1 if the item isn't found", function() {
      var values = [ 'a', 'b', 'c' ];
      expect(values.lastIndexOf('d')).toEqual(-1);
    });
  });
  
  describe('#remove', function() {
    it('removes the first instance of the given object from the array', function() {
      var array = [ 1, 2, 2, 3 ];
      array.remove(2);
      
      expect(array).toEqual([ 1, 2, 3 ]);
    });
    
    it('returns the removed object if found', function() {
      var array = [ 1, 2, 3 ];
      
      expect(array.remove(2)).toEqual(2);
    });
    
    it('returns undefined if not found', function() {
      var array = [ 1, 3 ];
      
      expect(array.remove(2)).toBeUndefined();
    });
  });
  
  describe('#removeAll', function() {
    it('removes all instances of the given object from the array', function() {
      var array = [ 1, 2, 2, 3 ];
      array.removeAll(2);
      
      expect(array).toEqual([ 1, 3 ]);
    });
    
    it('returns the removed object if found', function() {
      var array = [ 1, 2, 2, 3 ];
      
      expect(array.removeAll(2)).toEqual(2);
    });
    
    it('returns undefined if not found', function() {
      var array = [ 1, 3 ];
      
      expect(array.removeAll(2)).toBeUndefined();
    });
  });
  
  describe('#removeAt', function() {
    it('removes the object at the given index from the array', function() {
      var array = [ 1, 2, 3 ];
      array.removeAt(1);
      
      expect(array).toEqual([ 1, 3 ]);
    });
    
    it('returns the removed object if found', function() {
      var array = [ 1, 2, 3 ];
      
      expect(array.removeAt(1)).toEqual(2);
    });
    
    it('returns undefined if not found', function() {
      var array = [ 1, 2, 3 ];
      
      expect(array.removeAt(50)).toBeUndefined();
    });
  });
  
  describe('#uniq', function() {
    it('removes duplicate values from the array', function() {
      var values = [ 1, 4, 2, 4, 3, 4 ];
      expect(values.uniq()).toEqual([ 1, 4, 2, 3 ]);
    });
  });
  
  describe('with Enumberable methods', function() {
    it('uses $break to stop iterators', function() {
      var result = 0;
      ([ 1, 2, 3 ]).each(function(value) {
        if ((result = value) == 2) {
          throw $break;
        }
      });
      
      expect(result).toEqual(2);
    });
    
    describe('#all, #every', function() {
      it('returns false if anything returns false', function() {
        var strings = [ 'a', 'b', 'c', '1', 'e' ];
        var noNumbers = strings.all(function(value) {
          return value.match(/\D/);
        });
        expect(noNumbers).toBeFalsy();
      });
    
      it('returns true if everything returns true', function() {
        var strings = [ 'a', 'b', 'c', 'd', 'e' ];
        var noNumbers = strings.every(function(value) {
          return value.match(/\D/);
        });
        expect(noNumbers).toBeTruthy();
      });
    
      it('evaluates without an iterator', function() {
        expect([ 1, 2, 3 ].all()).toBeTruthy();
        expect([ 0, 1, 2 ].all()).toBeFalsy();
      });
    });
  
    describe('#any, #some', function() {
      it('returns true if anything returns true', function() {
        var strings = [ 'a', 'b', 'c', '1', 'e' ];
        var noNumbers = strings.any(function(value) {
          return value.match(/\d/);
        });
        expect(noNumbers).toBeTruthy();
      });
    
      it('returns false if everything returns false', function() {
        strings = [ 'a', 'b', 'c', 'd', 'e' ];
        noNumbers = strings.some(function(value) {
          return value.match(/\d/);
        });
        expect(noNumbers).toBeFalsy();
      });
    
      it('evaluates without an iterator', function() {
        expect([ 0, 0, 1 ].any()).toBeTruthy();
        expect([ 0, 0, 0 ].any()).toBeFalsy();
      });
    });
  
    describe('#collect, #map', function() {
      it('returns a new array with each value transformed', function() {
        var numbers = [ 1, 2, 3, 4, 5 ];
        var newNumbers = numbers.collect(function(value) {
          return value + 1;
        });
        expect(newNumbers).toEqual([ 2, 3, 4, 5, 6 ]);
      });
    
      it('returns a copy of the array without an interator', function() {
        var numbers = [ 1, 2, 3, 4, 5 ];
        expect(numbers.map()).toEqual([ 1, 2, 3, 4, 5 ]);
      });
    });
  
    describe('#detect, #find', function() {
      it('returns the first value that returns true', function() {
        var strings = [ 'a', 'b', 'c', '1', '2' ];
        var numbers = strings.detect(function(value) {
          return value.match(/\d+/);
        });
        expect(numbers).toEqual('1');
      });
    
      it('returns null if no value is found', function() {
        var strings = [ 'a', 'b', 'c' ];
        var numbers = strings.find(function(value) {
          return value.match(/\d+/);
        });
        expect(numbers).toBeNull();
      });
    });
  
    describe('#include', function() {
      it('returns true if it has the item', function() {
        var numbers = [ 1, 2, 3 ];
        expect(numbers.include(3)).toBeTruthy();
      });
    
      it("returns false if it doesn't have the item", function() {
        var numbers = [ 1, 2, 3  ];
        expect(numbers.include(4)).toBeFalsy();
      });
    });
  
    describe('#inject', function() {
      it('transforms the given object over the course of the loop', function() {
        var numbers = [ 1, 2, 3, 4, 5 ];
        var sum = numbers.inject(0, function(sum, value) {
          return sum + value;
        });
        expect(sum).toEqual(15);
      });
    });
  
    describe('#reject', function() {
      it('returns a new array without the matched values', function() {
        var strings = [ 'a', 'b', '1', '2', 'e' ];
        var numbers = strings.reject(function(value) {
          return value.match(/\d+/);
        });
        expect(numbers).toEqual([ 'a', 'b', 'e' ]);
      });
    });
  
    describe('#select', function() {
      it('should return a new array with only the matched values', function() {
        var strings = [ 'a', 'b', '1', '2', 'e' ];
        var numbers = strings.select(function(value) {
          return value.match(/\d+/);
        });
        expect(numbers).toEqual([ '1', '2' ]);
      });
    });
  });
});
