
function Expectation(mock, method_name) {
	this.mock = mock;
	this.method_matcher = new MethodMatcher(method_name);
	this.replaceMethod(method_name);
    //this.parameters_matcher = new ParametersMatcher();
	this.invocation_count = 0;
    //this.cardinality = Cardinality.exactly(1);
    //this.return_values = new ReturnValues();
}

Expectation.prototype = {
	times: function(number) {
		// TODO
		//alert('expecting '+number+' times');
		return this;
	},
	once: function() {
		// TODO
		return this;
	},
	twice: function() {
		// TODO
		return this;
	},
	never: function() {
		// TODO
		return this;
	},
	at_least: function() {
		// TODO
		return this;
	},
	with: function(expected_params) {
		// TODO
		//alert('expecting with params '+expected_params);
		return this;
	},
	returns: function(values) {
		// TODO
		//alert('will return '+values);
		return this;
	},
	replaceMethod: function(method_name) {
		this.mock[method_name] = this.method_matcher[method_name];
	}
}