function ParametersMatcher(expected_parameters) {
	this.expected_parameters = expected_parameters;
}

ParametersMatcher.prototype = {
	expected_parameters: null,
	actual_parameters: null,
	valid: false,
	
	match: function(actual_parameters) {
		this.actual_parameters = actual_parameters;
    	return this.parameters_match(actual_parameters);
    },
	parameters_match: function(actual_parameters) {
		for(var i = 0; i < actual_parameters.length; i++){
			if(actual_parameters[i] != this.expected_parameters[i]){
				this.valid = false;
				return false;
			}
		}
		this.valid = true;
		return true;
	},
	report: function() {
		console.log('object valid: '+this.valid);
		console.log('expected params: '+this.expected_parameters);
		console.log('actual params: '+this.actual_parameters);
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
		return object_to_array(parameters).join(', ');
	}
};
