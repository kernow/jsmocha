/*global jsMocha: false */
//= require "../jsmocha"

// this code is ripped directly from jQuery http://jquery.com

jsMocha.utility = {
  
  isFunction: function( obj ) {
		return Object.prototype.toString.call(obj) === "[object Function]";
	},
	
	isArray: function( obj ) {
		return Object.prototype.toString.call(obj) === "[object Array]";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || Object.prototype.toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval ) {
			return false;
		}
		
		// Not own constructor property must be Object
		if ( obj.constructor
			&& !Object.prototype.hasOwnProperty.call(obj, "constructor")
			&& !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
		
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
	
		var key;
		for ( key in obj ) {}
		
		return key === undefined || Object.prototype.hasOwnProperty.call( obj, key );
	},
  
  extend: function() {
    // copy reference to target object
    var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jsMocha.utility.isFunction(target) ) {
      target = {};
    }

    for ( ; i < length; i++ ) {
      // Only deal with non-null/undefined values
      if ( (options = arguments[ i ]) != null ) {
        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }

          // Recurse if we're merging object literal values or arrays
          if ( deep && copy && ( jsMocha.utility.isPlainObject(copy) || jsMocha.utility.isArray(copy) ) ) {
            var clone = src && ( jsMocha.utility.isPlainObject(src) || jsMocha.utility.isArray(src) ) ? src
              : jsMocha.utility.isArray(copy) ? [] : {};

            // Never move original objects, clone them
            target[ name ] = jsMocha.utility.extend( deep, clone, copy );

          // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  }
  
};
