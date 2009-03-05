
function Expectation(mock, method_name) {
	this.mock = mock;
	//this.method_matcher = new MethodMatcher(method_name);
	this.method_name = method_name;
	this.actual_parameters = null;
	this.replace_method(mock, method_name, this);
    //this.parameters_matcher = new ParametersMatcher();
	this.expected_invocations = 1;
	this.invocation_count = 0;
    //this.cardinality = Cardinality.exactly(1);
}

Expectation.prototype = {
	return_values: null,
	valid: true,
	
	times: function(number) {
		this.expected_invocations = number;
		return this;
	},
	once: function() {
		this.expected_invocations = 1;
		return this;
	},
	twice: function() {
		this.expected_invocations = 2;
		return this;
	},
	never: function() {
		this.expected_invocations = 0;
		return this;
	},
	at_least: function(number) {
		// TODO
		return this;
	},
	with: function() {
		console.log('expected to be called with: ('+object_to_array(arguments).join(', ')+')');
		this.parameters_matcher = new ParametersMatcher(arguments);
		return this;
	},
	returns: function(return_values) {
		this.return_values = return_values;
		return this;
	},
	replace_method: function(mock, method_name, self) {
		self.original_method = mock[method_name];
		mock[method_name] = function(){
			self.invocation_count += 1;
			self.parameters_matcher.match(arguments);
			console.log('function called with: '+arguments.length+' arguments, been called '+self.invocation_count+' times');
			return self.return_values;
		}
	},
	verify: function(){
		// check if it's been invoved the correct number of times
		if(this.invocation_count != this.expected_invocations){
			this.set_valid(false);
			console.log('wrong invocation times, expected '+this.expected_invocations+' was '+this.invocation_count);
		}
		else{
			this.set_valid(true);
			console.log('invoked the correct numebr of times');
		}
		// check the parameters
		param_report = this.parameters_matcher.report();
		if(param_report == true){
			this.set_valid(true);
			console.log('params OK');
		}
		else{
			this.set_valid(false);
			console.log('params not OK');
			console.log(param_report);
		}
		console.log("returning: "+this.is_valid());
		// return any error messages
		return(this.is_valid());
	},
	set_valid: function(valid) {
		if(this.valid != false){
			this.valid = valid;
		}
	},
	is_valid: function() {
		return this.valid;
	},
	restore: function(){
		this.mock[this.method_name] = this.original_method;
		delete this.mock.expects;
		delete this.mock.verify;
		delete this.mock.jsmocha;
	}
}