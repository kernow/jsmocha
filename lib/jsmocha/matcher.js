/*global jsMocha: false */
var Match = {
  
  is_a_method_of: function(method){
    // jsMocha.console.warn("running detection");
    for(var meth in Match){
      // jsMocha.console.log("method: "+meth);
      if(method === Match[meth]){
        // jsMocha.console.warn("yay we found a method");
        return true;
      }
    }
  },
  
  a_string: function(o){
    return typeof o === Match.STRING;
  },
  
  an_array: function(o) {
    return Match.type(o) === Match.ARRAY;
  },

  a_boolean: function(o) {
    return typeof o === Match.BOOLEAN;
  },
  
  a_function: function(o) {
    return Match.type(o) === Match.FUNCTION;
  },
  
  a_date: function(o) {
    // return o instanceof Date;
    return Match.type(o) === Match.DATE;
  },
  
  is_null: function(o) {
    return o === null;
  },
  
  a_number: function(o) {
    return typeof o === Match.NUMBER && isFinite(o);
  },
  
  an_object: function(o, failfn) {
    return (o && (typeof o === Match.OBJECT || (!failfn && Match.a_function(o)))) || false;
  },
  
  is_undefined: function(o) {
    return typeof o === Match.UNDEFINED;
  },

  type: function(o) {
    jsMocha.console.warn();
    jsMocha.console.warn(Match.TYPES[typeof o]);
    jsMocha.console.warn(Match.TYPES[Match.TOSTRING.call(o)]);
    return Match.TYPES[typeof o] || Match.TYPES[Match.TOSTRING.call(o)] || (o ? Match.OBJECT : Match.NULL);
  }
};

Match.ARRAY     = 'array';
Match.BOOLEAN   = 'boolean';
Match.DATE      = 'date';
Match.ERROR     = 'error';
Match.FUNCTION  = 'function';
Match.NUMBER    = 'number';
Match.NULL      = 'null';
Match.OBJECT    = 'object';
Match.REGEX     = 'regexp';
Match.STRING    = 'string';
Match.TOSTRING  = Object.prototype.toString;
Match.UNDEFINED = 'undefined';

Match.TYPES = {
  'undefined'         : Match.UNDEFINED,
  'number'            : Match.NUMBER,
  'boolean'           : Match.BOOLEAN,
  'string'              : Match.STRING,
  '[object Function]' : Match.FUNCTION,
  '[object RegExp]'   : Match.REGEX,
  '[object Array]'    : Match.ARRAY,
  '[object Date]'     : Match.DATE,
  '[object Error]'    : Match.ERROR
};
