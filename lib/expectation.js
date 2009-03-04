
function Expectation(mock, method_name) {
	this.mock = mock;
	//this.method_matcher = new MethodMatcher(method_name);
	this.method_name = method_name;
	this.actual_parameters = null;
	this.replaceMethod(method_name);
    //this.parameters_matcher = new ParametersMatcher();
	this.expected_invocation = 1;
	this.invocation_count = 0;
    //this.cardinality = Cardinality.exactly(1);
	myself = this;
}

Expectation.prototype = {
	return_values: null,
	
	times: function(number) {
		this.expected_invocation = number;
		return this;
	},
	once: function() {
		this.expected_invocation = 1;
		return this;
	},
	twice: function() {
		this.expected_invocation = 2;
		return this;
	},
	never: function() {
		this.expected_invocation = 0;
		return this;
	},
	at_least: function(number) {
		return this;
	},
	with: function() {
		this.parameters_matcher = new ParametersMatcher(arguments);
		return this;
	},
	returns: function(return_values) {
		this.return_values = return_values;
		return this;
	},
	replaceMethod: function(method_name) {
		this.mock[method_name] = this.invoke;
	},
	invoke: function(){
		// javascript doesn't appear to be able to get the method name that was called
		// in this case we will need to store the method name and just assume its correct
		myself.invocation_count += 1;
		if(myself.parameters_matcher.match(arguments)) {
			// alert('params match!');
		}
		// alert('function called with: '+arguments.length+' arguments, been called '+myself.invocation_count+' times');
		return myself.return_values;
	},
	verify: function(){
		alert('verifying an expectation');
		// check if it's been invoved the correct number of times
		if(this.invocation_count != this.expected_invocation){
			alert('wrong invocation times, expected '+this.expected_invocation+' was '+this.invocation_count);
		}
		else{
			alert('invoked the correct numebr of times');
		}
		// check the parameters
		param_report = this.parameters_matcher.report();
		if(param_report == true){
			alert('params OK');
		}
		else{
			alert('params not OK');
			alert(param_report);
		}
		// return any error messages
	}
}