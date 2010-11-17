beforeEach(function() {
  this.addMatchers({
    toBeAnInstanceOf : function(expected) {
      return this.actual instanceof expected;
    },
    toBeATypeOf : function(expected) {
      return typeof this.actual === expected;
    },
    toEqualPair : function(expected) {
      return (
        this.actual[0]    == expected[0] &&
        this.actual[1]    == expected[1] &&
        this.actual.key   == expected[0] &&
        this.actual.value == expected[1]
      );
    }
  });
});
