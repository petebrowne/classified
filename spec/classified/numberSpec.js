describe('Number', function() {
  describe('#abs', function() {
    it('returns the absolute value of a number', function() {
      expect((-1).abs()).toEqual(1);
    });
  });
  
  describe('#ceil', function() {
    it('returns the smallest integer greater than or equal to the number', function() {
      expect((0.1).ceil()).toEqual(1);
    });
  });
  
  describe('#floor', function() {
    it('returns the largest integer less than or equal to the number.r', function() {
      expect((1.9).floor()).toEqual(1);
    });
  });
  
  describe('#round', function() {
    it('rounds the number to the nearest integer', function() {
      expect((0.8).round()).toEqual(1);
    });
  });
});
