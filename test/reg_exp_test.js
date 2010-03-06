Screw.Unit(function() {
  describe("RegExp", function() {
    describe("#escape", function() {
      it("should escape slashes", function() {
        expect(RegExp.escape("/slashes/")).to(equal, "\\/slashes\\/");
      });
      
      it("should escape backslashes", function() {
        expect(RegExp.escape("\\backslashes\\")).to(equal, "\\\\backslashes\\\\");
      });
      
      it("should escape the border of words", function() {
        expect(RegExp.escape("\\border of word")).to(equal, "\\\\border of word");
      });
      
      it("should escape non-capturing characters", function() {
        expect(RegExp.escape("(?:non-capturing)")).to(equal, "\\(\\?\\:non-capturing\\)");
        expect(new RegExp(RegExp.escape("(?:") + "([^)]+)").exec("(?:non-capturing)")[1]).to(equal, "non-capturing");
      });
      
      it("should escape look behind/ahead characters", function() {
        expect(RegExp.escape("(?<=positive-lookbehind)")).to(equal, "\\(\\?<\\=positive-lookbehind\\)");
        expect(new RegExp(RegExp.escape("(?<=") + "([^)]+)").exec("(?<=positive-lookbehind)")[1]).to(equal, "positive-lookbehind");
        
        expect(RegExp.escape("(?!negative-lookahead)")).to(equal, "\\(\\?\\!negative-lookahead\\)");
        expect(new RegExp(RegExp.escape("(?!") + "([^)]+)").exec("(?!negative-lookahead)")[1]).to(equal, "negative-lookahead");
        
        expect(RegExp.escape("(?<!negative-lookbehind)")).to(equal, "\\(\\?<\\!negative-lookbehind\\)");
        expect(new RegExp(RegExp.escape("(?<!") + "([^)]+)").exec("(?<!negative-lookbehind)")[1]).to(equal, "negative-lookbehind");
      });
      
      it("should escape character classes", function() {
        expect(RegExp.escape("[\\w]+")).to(equal, "\\[\\\\w\\]\\+");
        expect(new RegExp(RegExp.escape("[") + "([^\\]]+)").exec("[character class]")[1]).to(equal, "character class");
      });
      
      it("should correctly escape in other misc cases", function() {
        expect(new RegExp(RegExp.escape("<div>")).exec("<td><div></td>")[0]).to(equal, "<div>");
        
        expect(RegExp.escape(false)).to(equal, "false");
        expect(RegExp.escape()).to(equal, "undefined");
        expect(RegExp.escape(null)).to(equal, "null");
        expect(RegExp.escape(42)).to(equal, "42");
        
        expect(RegExp.escape("\\n\\r\\t")).to(equal, "\\\\n\\\\r\\\\t");
        expect(RegExp.escape("\n\r\t")).to(equal, "\n\r\t");
        
        expect(RegExp.escape("{5,2}")).to(equal, "\\{5,2\\}");
        
        expect(
          "\\/\\(\\[\\.\\*\\+\\?\\^\\=\\!\\:\\$\\{\\}\\(\\)\\|\\[\\\\\\]\\\\\\\/\\\\\\\\\\]\\)\\/g"
        ).to(equal,
          RegExp.escape("/([.*+?^=!:${}()|[\\]\\/\\\\])/g")
        );
      });
    });
  });
});
