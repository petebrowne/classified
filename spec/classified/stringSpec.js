describe('String', function() {
  describe('#endsWith', function() {
    it('returns true if the string ends with the given string', function() {
      expect('hello there'.endsWith('there')).toBe(true);
    });
    
    it('returns false if the string does not end with the given string', function() {
      expect('hello there'.endsWith('hello')).toBe(false);
    });
  });
  
  describe('#include', function() {
    it('returns true if the string includes the given string', function() {
      expect('hello there'.include('hello')).toBe(true);
    });
    
    it('returns false if the string does not include the given string', function() {
      expect('hey there'.include('hello')).toBe(false);
    });
  });
  
  describe('#isBlank', function() {
    it('returns true if the string is empty', function() {
      expect(''.isBlank()).toBe(true);
    });
    
    it('returns true if the string only contains whitespace', function() {
      expect('      '.isBlank()).toBe(true);
    });
    
    it('returns false if the string contains characters', function() {
      expect('hello'.isBlank()).toBe(false);
    });
  });
  
  describe('#isEmpty', function() {
    it('returns true if the string is empty', function() {
      expect(''.isEmpty()).toBe(true);
    });
    
    it('returns false if the string only contains whitespace', function() {
      expect('      '.isEmpty()).toBe(false);
    });
    
    it('returns false if the string contains characters', function() {
      expect('hello'.isEmpty()).toBe(false);
    });
  });
  
  describe('#startsWith', function() {
    it('returns true if the string starts with the given string', function() {
      expect('hello there'.startsWith('hello')).toBe(true);
    });
    
    it('returns false if the string does not start with the given string', function() {
      expect('hello there'.startsWith('there')).toBe(false);
    });
  });
  
  describe('#strip', function() {
    it('removes leading whitespace', function() {
      expect('   hello'.strip()).toEqual('hello');
    });
    
    it('removes trailing whitespace', function() {
      expect('hello     '.strip()).toEqual('hello');
    });
  });
  
  describe('inflector methods', function() {
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
      
      it('ignores the rest of the string', function() {
        expect('PETER'.capitalize()).toEqual('PETER');
      });
    });
    
    describe('#dasherize', function() {
      it("deos not affect strings that aren't camelized", function() {
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
});
