(function(plural, singular, irregular) {
  plural(/$/, 's');
  plural(/s$/i, 's');
  plural(/(ax|test)is$/i, '$1es');
  plural(/(octop|vir)us$/i, '$1i');
  plural(/(alias|status)$/i, '$1es');
  plural(/(bu)s$/i, '$1ses');
  plural(/(buffal|tomat)o$/i, '$1oes');
  plural(/([ti])um$/i, '$1a');
  plural(/sis$/i, 'ses');
  plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves');
  plural(/(hive)$/i, '$1s');
  plural(/([^aeiouy]|qu)y$/i, '$1ies');
  plural(/(x|ch|ss|sh)$/i, '$1es');
  plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');
  plural(/([m|l])ouse$/i, '$1ice');
  plural(/^(ox)$/i, '$1en');
  plural(/(quiz)$/i, '$1zes');
  
  singular(/s$/i, '');
  singular(/(n)ews$/i, '$1ews');
  singular(/([ti])a$/i, '$1um');
  singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis');
  singular(/(^analy)ses$/i, '$1sis');
  singular(/([^f])ves$/i, '$1fe');
  singular(/(hive)s$/i, '$1');
  singular(/(tive)s$/i, '$1');
  singular(/([lr])ves$/i, '$1f');
  singular(/([^aeiouy]|qu)ies$/i, '$1y');
  singular(/(s)eries$/i, '$1eries');
  singular(/(m)ovies$/i, '$1ovie');
  singular(/(x|ch|ss|sh)es$/i, '$1');
  singular(/([m|l])ice$/i, '$1ouse');
  singular(/(bus)es$/i, '$1');
  singular(/(o)es$/i, '$1');
  singular(/(shoe)s$/i, '$1');
  singular(/(cris|ax|test)es$/i, '$1is');
  singular(/(octop|vir)i$/i, '$1us');
  singular(/(alias|status)es$/i, '$1');
  singular(/^(ox)en/i, '$1');
  singular(/(vert|ind)ices$/i, '$1ex');
  singular(/(matr)ices$/i, '$1ix');
  singular(/(quiz)zes$/i, '$1');
  singular(/(database)s$/i, '$1');
  
  irregular('person', 'people');
  irregular('man', 'men');
  irregular('child', 'children');
  irregular('sex', 'sexes');
  irregular('move', 'moves');
  irregular('cow', 'kine');
  
  Inflector.uncountable(
    'equipment',
    'information',
    'rice',
    'money',
    'species',
    'series',
    'fish',
    'sheep'
  );
})(Inflector.plural, Inflector.singular, Inflector.irregular);
