jsMocha.ParametersMatcher = function(expected_parameters) {
	this.expected_parameters = expected_parameters;
	this.actual_parameters = null;
	this.valid = false;
}

jsMocha.ParametersMatcher.prototype = {
	
	match: function(actual_parameters) {
		if(this.block_given()){
		  this.valid = this.block(actual_parameters);
		  return this.valid;
		}
		else{
  		this.actual_parameters = actual_parameters;
      return this.parameters_match(actual_parameters);
    }
  },
	parameters_match: function(actual_parameters) {
		for(var i = 0; i < this.expected_parameters.length; i++){
			if(actual_parameters[i] != this.expected_parameters[i]){
				this.valid = false;
				return false;
			}
		}
		this.valid = true;
		return true;
	},
	block_given: function() {
	  if(this.expected_parameters.length == 1 && this.is_function(this.expected_parameters[0])){
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
		if(this.valid) {
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
  	  for(var i=0; i<parameters.length; i++){
  		  a.push(this.serialize(parameters[i]));
  	  }
  	  return a.join(', ');
    }
	},
	serialize: function(obj) {
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
            for(var i = 0; i < obj.length-1; i++) { a.push(this.serialize(obj[i])); }
            a.push(this.serialize(obj[i]));
            str = '[' + a.join(', ') + ']';
          }
          else{
            for(var key in obj) { a.push(key + ':' + this.serialize(obj[key])); }
            str = '{' + a.join(', ').replace(/\,$/, '') + '}';
          }
          return str;
        }

      default:
        return 'UNKNOWN';
    }
  }
};
