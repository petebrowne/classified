Screw.Unit(function() {
  describe("Array", function() {
    it("should use $break to stop iterators", function() {
      var result = 0;
      ([ 1, 2, 3 ]).each(function(value) {
        if ((result = value) == 2) {
          throw $break;
        }
      });
      
      expect(result).to(equal, 2);
    });
    
    if (Array.prototype.forEach) {
      it("should use #forEach for #_each", function() {
        expect(Array.prototype._each === Array.prototype.forEach).to(be_true);
      });
    }
    
    describe("#indexOf", function() {
      it("should return the index of the found item", function() {
        var values = [ "a", "b", "c", "b" ];
        expect(values.indexOf("b")).to(equal, 1);
      });
      
      it("should return -1 if the item isn't found", function() {
        var values = [ "a", "b", "c" ];
        expect(values.indexOf("d")).to(equal, -1);
      });
    });
    
    describe("#lastIndexOf", function() {
      it("should return the last index of the found item", function() {
        var values = [ "a", "b", "c", "b" ];
        expect(values.lastIndexOf("b")).to(equal, 3);
      });
      
      it("should return -1 if the item isn't found", function() {
        var values = [ "a", "b", "c" ];
        expect(values.lastIndexOf("d")).to(equal, -1);
      });
    });
    
    describe("#clear", function() {
      it("should empty the array", function() {
        var numbers = [ 1, 2, 3 ];
        numbers.clear();
        expect(numbers.length).to(equal, 0);
      });
    });
    
    describe("#first", function() {
      it("should return the first value from the array", function() {
        var numbers = [ 1, 2, 3 ];
        expect(numbers.first()).to(equal, 1);
      });
    });
    
    describe("#last", function() {
      it("should return the last value from the array", function() {
        var numbers = [ 1, 2, 3 ];
        expect(numbers.last()).to(equal, 3);
      });
    });
    
    describe("#compact", function() {
      it("should remove null values from the array", function() {
        var values = [ 1, 2, null, 3, null ];
        expect(values.compact()).to(equal, [ 1, 2, 3 ]);
      });
    });
    
    describe("#uniq", function() {
      it("should remove duplicate values from the array", function() {
        var values = [ 1, 4, 2, 4, 3, 4 ];
        expect(values.uniq()).to(equal, [ 1, 4, 2, 3 ]);
      });
    });
    
    describe("with Enumberable methods", function() {
      describe("#all, #every", function() {
        it("should be false if anything returns false", function() {
          var strings = [ "a", "b", "c", "1", "e" ];
          var noNumbers = strings.all(function(value) {
            return value.match(/\D/);
          });
          expect(noNumbers).to(be_false);
        });
      
        it("should be true if everything returns true", function() {
          var strings = [ "a", "b", "c", "d", "e" ];
          var noNumbers = strings.every(function(value) {
            return value.match(/\D/);
          });
          expect(noNumbers).to(be_true);
        });
      
        it("should evaluate without an iterator", function() {
          expect([ 1, 2, 3 ].all()).to(be_true);
          expect([ 0, 1, 2 ].all()).to(be_false);
        });
      });
    
      describe("#any, #some", function() {
        it("should be true if anything returns true", function() {
          var strings = [ "a", "b", "c", "1", "e" ];
          var noNumbers = strings.any(function(value) {
            return value.match(/\d/);
          });
          expect(noNumbers).to(be_true);
        });
      
        it("should be false if everything returns false", function() {
          strings = [ "a", "b", "c", "d", "e" ];
          noNumbers = strings.some(function(value) {
            return value.match(/\d/);
          });
          expect(noNumbers).to(be_false);
        });
      
        it("should evaluate without an iterator", function() {
          expect([ 0, 0, 1 ].any()).to(be_true);
          expect([ 0, 0, 0 ].any()).to(be_false);
        });
      });
    
      describe("#collect, #map", function() {
        it("return a new array with each value transformed", function() {
          var numbers = [ 1, 2, 3, 4, 5 ];
          var newNumbers = numbers.collect(function(value) {
            return value + 1;
          });
          expect(newNumbers).to(equal, [ 2, 3, 4, 5, 6 ]);
        });
      
        it("return a copy of the array without an interator", function() {
          var numbers = [ 1, 2, 3, 4, 5 ];
          expect(numbers.map()).to(equal, [ 1, 2, 3, 4, 5 ]);
        });
      });
    
      describe("#detect, #find", function() {
        it("should return the first value that returns true", function() {
          var strings = [ "a", "b", "c", "1", "2" ];
          var numbers = strings.detect(function(value) {
            return value.match(/\d+/);
          });
          expect(numbers).to(equal, "1");
        });
      
        it("should return null if no value is found", function() {
          var strings = [ "a", "b", "c" ];
          var numbers = strings.find(function(value) {
            return value.match(/\d+/);
          });
          expect(numbers).to(equal, null);
        });
      });
    
      describe("#include", function() {
        it("should return true if it has the item", function() {
          var numbers = [ 1, 2, 3 ];
          expect(numbers.include(3)).to(be_true);
        });
      
        it("should return false if it doesn't have the item", function() {
          var numbers = [ 1, 2, 3  ];
          expect(numbers.include(4)).to(be_false);
        });
      });
    
      describe("#inject", function() {
        it("should transform the given over the course of the loop", function() {
          var numbers = [ 1, 2, 3, 4, 5 ];
          var sum = numbers.inject(0, function(sum, value) {
            return sum + value;
          });
          expect(sum).to(equal, 15);
        });
      });
    
      describe("#reject", function() {
        it("should return a new array without the matched values", function() {
          var strings = [ "a", "b", "1", "2", "e" ];
          var numbers = strings.reject(function(value) {
            return value.match(/\d+/);
          });
          expect(numbers).to(equal, [ "a", "b", "e" ]);
        });
      });
    
      describe("#select", function() {
        it("should return a new array with only the matched values", function() {
          var strings = [ "a", "b", "1", "2", "e" ];
          var numbers = strings.select(function(value) {
            return value.match(/\d+/);
          });
          expect(numbers).to(equal, [ "1", "2" ]);
        });
      });
    });
  });
});
