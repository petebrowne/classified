describe('String', function() {
  describe('#camelize', function() {
    it("doesn't change strings without letters", function() {
      expect(''.camelize()).toEqual('');
    });
    
    it('removes dashes', function() {
      expect('-'.camelize()).toEqual('');
    });
    
    it('removes underscores', function() {
      expect('_'.camelize()).toEqual('');
    });
    
    it('capitalizes letters after dashes', function() {
      expect('border-bottom-width'.camelize()).toEqual('borderBottomWidth');
      expect('-moz-opacity'.camelize()).toEqual('MozOpacity');
    });
    
    it('capitalizes letters after underscores', function() {
      expect('border_bottom_width'.camelize()).toEqual('borderBottomWidth');
      expect('_moz_opacity'.camelize()).toEqual('MozOpacity');
    });
  });

  describe('#capitalize', function() {
    it('capitalizes the first letter of a string', function() {
      expect('peter'.capitalize()).toEqual('Peter');
    });
    
    it('lowercases all other letters', function() {
      expect('PETER'.capitalize()).toEqual('Peter');
    });
  });
  
  describe('#dasherize', function() {
    it("deosn't affect strings that aren't camelized", function() {
      expect(''.dasherize()).toEqual('');
      expect('foo-bar'.dasherize()).toEqual('foo-bar');
    });
    
    it('lowercases the string', function() {
      expect('Foo'.dasherize()).toEqual('foo');
    });
    
    it('converts camelized strings into dashed strings', function() {
      expect('borderBottomWidth'.dasherize()).toEqual('border-bottom-width');
    });
    
    it('converts underscores to dashes', function() {
      expect('_'.dasherize()).toEqual('-');
      expect('border_bottom_width'.dasherize()).toEqual('border-bottom-width');
    });
  });
  
  describe('#humanize', function() {
    it('capitalizes the first word', function() {
      expect('foo bar'.humanize()).toEqual('Foo bar');
    });
    
    it('turns dashes into spaces', function() {
      expect('border-bottom--width'.humanize()).toEqual('Border bottom width');
    });
    
    it('turns underscores into spaces', function() {
      expect('border_bottom__width'.humanize()).toEqual('Border bottom width');
    });
  });
  
  describe('#titleize', function() {
    it('capitalizes each word', function() {
      expect('man from the boondocks'.titleize()).toEqual('Man From The Boondocks');
      expect('x-men: the last stand'.toTitleCase()).toEqual('X Men: The Last Stand');
      expect("it's a wonderful life".titleize()).toEqual("It's A Wonderful Life");
    });
  });
  
  describe('#underscore', function() {
    it("doesn't affect strings that aren't camelized", function() {
      expect(''.underscore()).toEqual('');
      expect('foo_bar'.underscore()).toEqual('foo_bar');
    });
    
    it('lowercases the string', function() {
      expect('Foo'.underscore()).toEqual('foo');
    });
    
    it('converts camelized strings into underscored strings', function() {
      expect('borderBottomWidth'.underscore()).toEqual('border_bottom_width');
    });
    
    it('converts dashes to underscores', function() {
      expect('-'.underscore()).toEqual('_');
      expect('border-bottom-width'.underscore()).toEqual('border_bottom_width');
    });
  });
});
