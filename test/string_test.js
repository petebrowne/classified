Screw.Unit(function() {
  describe("String", function() {
    describe("#camelize", function() {
      it("should not change strings without letters", function() {
        expect("".camelize()).to(equal, "");
        expect("-".camelize()).to(equal, "");
      });
      
      it("should not capitalize letters after underscores", function() {
        expect("foo_bar".camelize()).to(equal, "foo_bar");
      });
      
      it("should capitalize letters after dashes", function() {
        expect("border-bottom-width".camelize()).to(equal, "borderBottomWidth");
        expect("-moz-opacity".camelize()).to(equal, "MozOpacity");
      });
    });
  });
  
  describe("#capitalize", function() {
    it("should capitalize the first letter of a string", function() {
      expect("peter".capitalize()).to(equal, "Peter");
    });
    
    it("should downcase all other letters", function() {
      expect("PETER".capitalize()).to(equal, "Peter");
    });
  });
});
