function ParametersMatcher(expected_parameters) {
	this.expected_parameters = expected_parameters;
	this.actual_parameters = null;
	this.valid = false;
}

ParametersMatcher.prototype = {
	
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
			msg  = "expected (";
			msg += this.list_parameters(this.expected_parameters);
			msg += ") but got (";
			msg += this.list_parameters(this.actual_parameters);
			msg += ")";
			return msg;
		}
	},
	list_parameters: function(parameters) {
		if(parameters){
			return this.object_to_array(parameters).join(', ');
		}
	},
	object_to_array: function(o) {
  	var a = [];
  	for(var i = 0; i < o.length; i++){
  		a.push(o[i]);
  	}
  	return a;
  }
};
