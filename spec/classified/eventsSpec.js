describe('Events', function() {
  describe('#bind', function() {
    it('returns itself for chaining', function() {
      var object = {};
      extend(object, Events);
      
      expect(object.bind('event', function() {})).toBe(object);
    });
    
    it('calls the callback when the event is triggered', function() {
      var object = { 'counter' : 0 };
      extend(object, Events);
      
      object.bind('event', function() { this.counter++; });
      object.trigger('event');
      
      expect(object.counter).toEqual(1);
    });
    
    describe("with 'all'", function() {
      it('calls the callback when any event is triggered', function() {
        var object = { 'counter' : 0 };
        extend(object, Events);
      
        object.bind('all', function() { this.counter++; });
        object.trigger('first');
        object.trigger('second');
      
        expect(object.counter).toEqual(2);
      });
    });
  });
  
  describe('#unbind', function() {
    it('returns itself for chaining', function() {
      var object = {};
      extend(object, Events);
      
      expect(object.unbind('event')).toBe(object);
    });
    
    it('removes the callback for the given event', function() {
      var object = { 'counter' : 0 };
      extend(object, Events);
      
      var callback = function() { this.counter += 2; };
      object.bind('event', callback);
      object.bind('event', function() { this.counter -= 1; });
      object.unbind('event', callback);
      object.trigger('event');
      
      expect(object.counter).toEqual(-1);
    });
    
    describe('without a callback', function() {
      it('removes all callbacks for the given event', function() {
        var object = { 'counter' : 0 };
        extend(object, Events);
      
        object.bind('event', function() { this.counter += 2; });
        object.bind('event', function() { this.counter--; });
        object.unbind('event');
        object.trigger('event');
      
        expect(object.counter).toEqual(0);
      });
    });
    
    describe('without an event or callback', function() {
      it('removes all callbacks', function() {
        var object = { 'counter' : 0 };
        extend(object, Events);
      
        object.bind('first', function() { this.counter += 2; });
        object.bind('second', function() { this.counter--; });
        object.unbind();
        object.trigger('first');
        object.trigger('second');
      
        expect(object.counter).toEqual(0);
      });
    });
  });
  
  describe('#trigger', function() {
    it('returns itself for chaining', function() {
      var object = {};
      extend(object, Events);
      
      expect(object.trigger('event')).toBe(object);
    });
    
    it('passes arguments to the event callback', function() {
      var object = {};
      extend(object, Events);
      
      var args;
      object.bind('event', function() {
        args = Array.prototype.slice.call(arguments);
      });
      object.trigger('event', 1, 2, 3);
      
      expect(args).toEqual([ 1, 2, 3 ]);
    });
  });
});
