//= require "../jsmocha"
jsMocha.ParametersMatcher = function(expected_parameters) {
	this.expected_parameters = expected_parameters;
	this.serialize_stack_limit = 4;
	this.invocations = [];
};

jsMocha.ParametersMatcher.prototype = {
	
	valid: function() {
	  var len = this.invocations.length;
	  if(len < 1){
	    return false;
    }
	  for(var i = 0; i < len; i++){
	    if(this.invocations[i] === false){
	      return false;
	    }
    }
    return true;
	},
	match: function(actual_parameters) {
	  this.actual_parameters = actual_parameters;
		if(this.block_given()){
		  var match = this.block(actual_parameters);
		  if(match){
		    this.invocations.push(true);
		    return true;
		  }
		  else{
		    return false;
		  }
      // this.invocations.push();
      // return this.valid();
		}
		else{
      return this.parameters_match(actual_parameters);
    }
  },
	parameters_match: function(actual_parameters) {
	  var len = this.expected_parameters.length;
		for(var i = 0; i <= len; i++){
      // console.log('matching');
      // console.log(this.expected_parameters[i]);
      // console.log('to');
      // console.log(actual_parameters[i]);
      if(Match.is_a_method_of(this.expected_parameters[i])){
        console.warn("not running regular matcher");
        if(!this.expected_parameters[i](actual_parameters[i])){
          return false;
        }
			}else if(!this.equal(this.expected_parameters[i], actual_parameters[i])){
        // this.invocations.push(true);
        // console.log('no match');
				return false;
			}
		}
    this.invocations.push(true);
		return true;
	},
	equal: function(expected, actual, recursion_level) {
	  recursion_level = recursion_level || 0;
	  if(recursion_level > this.serialize_stack_limit){
	    console.warn('object too complex to fully match');
	    return true;
    }
	  console.warn("running regular matcher");
    if(expected instanceof Array) {
      for(var i = 0; i < actual.length; i++) {
        if(!this.equal(expected[i], actual[i], (recursion_level+1))){ return false; }
      }
      return actual.length == expected.length;
    } else if (expected instanceof Object) {
      for (var key in expected){
        if(actual[key]){
          if(key != 'expects' && key != 'spies' && key != 'stubs'){
            if(!this.equal(expected[key], actual[key], (recursion_level+1))){ return false; }
          }else{
            return true;
          }
        }else{
          return false;
        }
      }
      for (var key in actual){
        if(expected[key]){
          if(!this.equal(expected[key], actual[key], (recursion_level+1))){ return false; }
        }else{
          return false;
        }
      }
      return true;
    }else{
      return expected == actual;
    }
  },
	block_given: function() {
	  if(this.expected_parameters.length == 1 && this.is_function(this.expected_parameters[0]) && !Match.is_a_method_of(this.expected_parameters[0])){
	    this.block = this.expected_parameters[0];
	    return true;
	  }
	  else{
	    return false;
	  }
	},
	is_function: function(o) {
	  return typeof o == 'function' || Object.prototype.toString.call(o) == '[object Function]' ? true : false;
	},
	report: function() {
		if(this.valid() || this.invocations.length < 1) {
			return true;
		}
		else{
		  var msg = '';
		  if(this.block_given()){
		    msg += "received (";
	    }
	    else{
			  msg += "expected (";
			  msg += this.list_parameters(this.expected_parameters);
			  msg += ") but got (";
		  }
			msg += this.list_parameters(this.actual_parameters);
      msg += ")";
			return msg;
		}
	},
	list_parameters: function(parameters) {
    if(parameters){
         var a = [];
         var len = parameters.length;
         for(var i = 0; i < len; i++){
           a.push(this.serialize(parameters[i], 0));
         }
         return a.join(', ');
        }
	},
	serialize: function(obj, recursion_level) {
	  if(recursion_level > this.serialize_stack_limit){
	    return 'object too complex to fully display';
    }
	  if(obj === null){return 'null';}
    switch (typeof obj){
      case 'number':
      case 'boolean':
      case 'function':
        return obj;

      case 'string':
        return '"' + obj + '"';

      case 'object':
        var str;
        if (typeof obj.toSource !== 'undefined' && typeof obj.callee === 'undefined'){
          str = obj.toSource();
          return str.substring(1,str.length-1);
        }
        else{
          var a = [];
          if (obj.constructor === Array || typeof obj.callee !== 'undefined'){
            var len = obj.length - 1;
            for(var i = 0; i < len; i++) { a.push(this.serialize(obj[i], (recursion_level+1))); }
            a.push(this.serialize(obj[i], (recursion_level+1)));
            str = '[' + a.join(', ') + ']';
          }
          else{
            for(var key in obj) {
              if (obj.hasOwnProperty(key)) {
                a.push(key + ':' + this.serialize(obj[key], (recursion_level+1)));
              }
            }
            str = '{' + a.join(', ').replace(/\,$/, '') + '}';
          }
          return str;
        }

      default:
        return 'UNKNOWN';
    }
  }
};
