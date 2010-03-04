Screw.Unit(function() {
  describe("Function", function() {
    describe("#bind", function() {
      var method;
      
      before(function() {
        method = function() { return this; };
      });
      
      it("should change the context of the function", function() {
        expect(method.bind("hello")()).to(equal, "hello");
      });
      
      it("should not wrap the function if the context is undefined", function() {
        expect(method === method.bind()).to(be_true);
        expect(method === method.bind(undefined)).to(be_true);
      });
    });
  });
});
