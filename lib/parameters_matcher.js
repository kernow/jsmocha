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
			// alert(actual_parameters[i]);
			if(actual_parameters[i] != this.expected_parameters[i]){
				this.valid = false;
				return false;
			}
		}
		this.valid = true;
		return true;
	},
	report: function() {
		alert(this.valid);
		if(this.valid) {
			return true;
		}
		else{
			msg  = "expected ";
			msg += this.list_parameters(this.expected_parameters);
			msg += "but got ";
			msg += this.list_parameters(this.actual_parameters);
			return msg;
		}
	},
	list_parameters: function(parameters) {
		msg = '';
		for(var i = 0; i < parameters.length; i++){
			msg += parameters[i] + ', ';
		}
		return msg;
	}
};
