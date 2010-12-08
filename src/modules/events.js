module('Events', function() {
  // Bind an event, specified by a string name, `event`, to a `handler` function.
  // Passing `"all"` will bind the handler to all events fired.
  def('bind', function(type, handler) {
    var events   = this.__events__ || (this.__events__ = {}),
        handlers = events[type] || (events[type] = []);
        
    handlers.push(handler);
    return this;
  });
  
  // Remove one or many events. If `handler` is null, removes all
  // events for the event. If `event` is null, removes all bound events
  // for all events.
  def('unbind', function(type, handler) {
    var events, handlers;
    
    if (!type) {
      delete this.__events__;
    }
    else if (events = this.__events__) {
      if (!handler) {
        delete events[type];
      }
      else if (handlers = events[type]) {
        for (var i = 0, l = handlers.length; i < l; i++) {
          if (handlers[i] === handler) {
            handlers.splice(i, 1);
            break;
          }
        }
      }
    }
    
    return this;
  });
  
  // Trigger an event, firing all bound events. Callbacks are passed the
  // same arguments as `trigger` is, apart from the event name.
  // Listening for `"all"` passes the true event name as the first argument.
  def('trigger', function(type) {
    var events;
    
    if (events = this.__events__) {
      var args = arguments, handlers;
      
      if (handlers = events[type]) {
        handlers.each(function(handler) {
          handler.apply(this, Array.slice(args, 1));
        }, this);
      }
    
      if (handlers = events['all']) {
        handlers.each(function(handler) {
          handler.apply(this, args);
        }, this);
      }
    }
    
    return this;
  });
});
