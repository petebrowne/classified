describe('Number', function() {
  describe('#abs', function() {
    it('returns the abs of a number', function() {
      expect((-1).abs()).toEqual(Math.abs(-1));
    });
  });
  
  describe('#acos', function() {
    it('returns the acos of a number', function() {
      expect((-1).acos()).toEqual(Math.acos(-1));
    });
  });
  
  describe('#asin', function() {
    it('returns the asin of a number', function() {
      expect((-1).asin()).toEqual(Math.asin(-1));
    });
  });
  
  describe('#atan', function() {
    it('returns the atan of a number', function() {
      expect((1).atan()).toEqual(Math.atan(1));
    });
  });
  
  describe('#atan2', function() {
    it('returns the atan2 of a number', function() {
      expect((4).atan2(8)).toEqual(Math.atan2(4, 8));
    });
  });
  
  describe('#ceil', function() {
    it('returns the ceil of a number', function() {
      expect((0.1).ceil()).toEqual(Math.ceil(0.1));
    });
  });
  
  describe('#exp', function() {
    it('returns the exp of a number', function() {
      expect((5).exp()).toEqual(Math.exp(5));
    });
  });
  
  describe('#floor', function() {
    it('returns the floor of a number', function() {
      expect((1.9).floor()).toEqual(Math.floor(1.9));
    });
  });
  
  describe('#log', function() {
    it('returns the log of a number', function() {
      expect((5).log()).toEqual(Math.log(5));
    });
  });
  
  describe('#max', function() {
    it('returns the max of a number', function() {
      expect((25).max(10, 15, 0)).toEqual(Math.max(25, 10, 15, 0));
    });
  });
  
  describe('#min', function() {
    it('returns the min of a number', function() {
      expect((5).min(10, 15)).toEqual(Math.min(5, 10, 15));
    });
  });
  
  describe('#pow', function() {
    it('returns the pow of a number', function() {
      expect((5).pow(2)).toEqual(Math.pow(5, 2));
    });
  });
  
  describe('#round', function() {
    it('rounds the number to the nearest integer', function() {
      expect((0.8).round()).toEqual(Math.round(0.8));
    });
  });
  
  describe('#sin', function() {
    it('returns the sin of a number', function() {
      expect((1).sin()).toEqual(Math.sin(1));
    });
  });
  
  describe('#sqrt', function() {
    it('returns the sqrt of a number', function() {
      expect((9).sqrt()).toEqual(Math.sqrt(9));
    });
  });
  
  describe('#tan', function() {
    it('returns the tan of a number', function() {
      expect((1).tan()).toEqual(Math.tan(1));
    });
  });
});
