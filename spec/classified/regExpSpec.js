describe('RegExp', function() {
  describe('#escape', function() {
    it('escapes slashes', function() {
      expect(RegExp.escape('/slashes/')).toEqual('\\/slashes\\/');
    });
    
    it('escapes backslashes', function() {
      expect(RegExp.escape('\\backslashes\\')).toEqual('\\\\backslashes\\\\');
    });
    
    it('escapes the border of words', function() {
      expect(RegExp.escape('\\border of word')).toEqual('\\\\border of word');
    });
    
    it('escapes non-capturing characters', function() {
      expect(RegExp.escape('(?:non-capturing)')).toEqual('\\(\\?\\:non-capturing\\)');
      expect(new RegExp(RegExp.escape('(?:') + '([^)]+)').exec('(?:non-capturing)')[1]).toEqual('non-capturing');
    });
    
    it('escapes look behind/ahead characters', function() {
      expect(RegExp.escape('(?<=positive-lookbehind)')).toEqual('\\(\\?<\\=positive-lookbehind\\)');
      expect(new RegExp(RegExp.escape('(?<=') + '([^)]+)').exec('(?<=positive-lookbehind)')[1]).toEqual('positive-lookbehind');
      
      expect(RegExp.escape('(?!negative-lookahead)')).toEqual('\\(\\?\\!negative-lookahead\\)');
      expect(new RegExp(RegExp.escape('(?!') + '([^)]+)').exec('(?!negative-lookahead)')[1]).toEqual('negative-lookahead');
      
      expect(RegExp.escape('(?<!negative-lookbehind)')).toEqual('\\(\\?<\\!negative-lookbehind\\)');
      expect(new RegExp(RegExp.escape('(?<!') + '([^)]+)').exec('(?<!negative-lookbehind)')[1]).toEqual('negative-lookbehind');
    });
    
    it('escapes character classes', function() {
      expect(RegExp.escape('[\\w]+')).toEqual('\\[\\\\w\\]\\+');
      expect(new RegExp(RegExp.escape('[') + '([^\\]]+)').exec('[character class]')[1]).toEqual('character class');
    });
    
    it('correctly escapes in other misc cases', function() {
      expect(new RegExp(RegExp.escape('<div>')).exec('<td><div></td>')[0]).toEqual('<div>');
      
      expect(RegExp.escape(false)).toEqual('false');
      expect(RegExp.escape()).toEqual('undefined');
      expect(RegExp.escape(null)).toEqual('null');
      expect(RegExp.escape(42)).toEqual('42');
      
      expect(RegExp.escape('\\n\\r\\t')).toEqual('\\\\n\\\\r\\\\t');
      expect(RegExp.escape('\n\r\t')).toEqual('\n\r\t');
      
      expect(RegExp.escape('{5,2}')).toEqual('\\{5,2\\}');
      
      expect(
        '\\/\\(\\[\\.\\*\\+\\?\\^\\=\\!\\:\\$\\{\\}\\(\\)\\|\\[\\\\\\]\\\\\\\/\\\\\\\\\\]\\)\\/g'
      ).toEqual(
        RegExp.escape('/([.*+?^=!:${}()|[\\]\\/\\\\])/g')
      );
    });
  });
});
