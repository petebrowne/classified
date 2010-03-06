Screw.Unit(function() {
  describe("String", function() {
    describe("#camelize", function() {
      it("should not change strings without letters", function() {
        expect("".camelize()).to(equal, "");
      });
      
      it("should remove dashes", function() {
        expect("-".camelize()).to(equal, "");
      });
      
      it("should remove underscores", function() {
        expect("_".camelize()).to(equal, "");
      });
      
      it("should capitalize letters after dashes", function() {
        expect("border-bottom-width".camelize()).to(equal, "borderBottomWidth");
        expect("-moz-opacity".camelize()).to(equal, "MozOpacity");
      });
      
      it("should capitalize letters after underscores", function() {
        expect("border_bottom_width".camelize()).to(equal, "borderBottomWidth");
        expect("_moz_opacity".camelize()).to(equal, "MozOpacity");
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
  
  describe("#dasherize", function() {
    it("should not affect strings that aren't camelized", function() {
      expect("".dasherize()).to(equal, "");
      expect("foo-bar".dasherize()).to(equal, "foo-bar");
    });
    
    it("should lowercase the string", function() {
      expect("Foo".dasherize()).to(equal, "foo");
    });
    
    it("should convert camelized strings into dashed strings", function() {
      expect("borderBottomWidth".dasherize()).to(equal, "border-bottom-width");
    });
    
    it("should convert underscores to dashes", function() {
      expect("_".dasherize()).to(equal, "-");
      expect("border_bottom_width".dasherize()).to(equal, "border-bottom-width");
    });
  });
  
  describe("#humanize", function() {
    it("should capitalize the first word", function() {
      expect("foo bar".humanize()).to(equal, "Foo bar");
    });
    
    it("should turn dashes into spaces", function() {
      expect("border-bottom--width".humanize()).to(equal, "Border bottom width");
    });
    
    it("should turn underscores into spaces", function() {
      expect("border_bottom__width".humanize()).to(equal, "Border bottom width");
    });
  });
  
  describe("#titleize", function() {
    it("should capitalize each word", function() {
      expect("man from the boondocks".titleize()).to(equal, "Man From The Boondocks");
      expect("x-men: the last stand".toTitleCase()).to(equal, "X Men: The Last Stand");
      expect("it's a wonderful life".titleize()).to(equal, "It's A Wonderful Life");
    });
  });
  
  describe("#underscore", function() {
    it("should not affect strings that aren't camelized", function() {
      expect("".underscore()).to(equal, "");
      expect("foo_bar".underscore()).to(equal, "foo_bar");
    });
    
    it("should lowercase the string", function() {
      expect("Foo".underscore()).to(equal, "foo");
    });
    
    it("should convert camelized strings into underscored strings", function() {
      expect("borderBottomWidth".underscore()).to(equal, "border_bottom_width");
    });
    
    it("should convert dashes to underscores", function() {
      expect("-".underscore()).to(equal, "_");
      expect("border-bottom-width".underscore()).to(equal, "border_bottom_width");
    });
  });
});
