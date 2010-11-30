describe('Number', function() {
  describe('#times', function() {
    it('calls the iterator the given number of times', function() {
      var count = 0;
      (5).times(function() {
        count++;
      });
    
      expect(count).toEqual(5);
    });
  });
  
  describe('with Math functions', function() {
    it('includes #abs', function() {
      expect((-1).abs()).toEqual(Math.abs(-1));
    });
  
    it('includes #acos', function() {
      expect((-1).acos()).toEqual(Math.acos(-1));
    });

    it('includes #asin', function() {
      expect((-1).asin()).toEqual(Math.asin(-1));
    });
  
    it('includes #atan', function() {
      expect((1).atan()).toEqual(Math.atan(1));
    });
  
    it('includes #atan2', function() {
      expect((4).atan2(8)).toEqual(Math.atan2(4, 8));
    });
  
    it('includes #ceil', function() {
      expect((0.1).ceil()).toEqual(Math.ceil(0.1));
    });
  
    it('includes #exp', function() {
      expect((5).exp()).toEqual(Math.exp(5));
    });
  
    it('includes #floor', function() {
      expect((1.9).floor()).toEqual(Math.floor(1.9));
    });
    
    it('includes #log', function() {
      expect((5).log()).toEqual(Math.log(5));
    });
    
    it('includes #max', function() {
      expect((25).max(10, 15, 0)).toEqual(Math.max(25, 10, 15, 0));
    });
    
    it('includes #min', function() {
      expect((5).min(10, 15)).toEqual(Math.min(5, 10, 15));
    });
    
    it('includes #pow', function() {
      expect((5).pow(2)).toEqual(Math.pow(5, 2));
    });
    
    it('includes #round', function() {
      expect((0.8).round()).toEqual(Math.round(0.8));
    });
  
    it('includes #sin', function() {
      expect((1).sin()).toEqual(Math.sin(1));
    });
    
    it('includes #sqrt', function() {
      expect((9).sqrt()).toEqual(Math.sqrt(9));
    });
    
    it('includes #tan', function() {
      expect((1).tan()).toEqual(Math.tan(1));
    });
  });
});
