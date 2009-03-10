
function Expectation(mock, method_name) {
	this.mock = mock;
	// TODO find a more robust way of getting the constructor and/or variable name
	this.mock_name = this.get_name(mock);
	this.method_name = method_name;
	this.actual_parameters = null;
	this.replace_method(mock, method_name, this);
	this.expected_invocations = 1;
	this.invocation_count = 0;
	this.local_report = new Array();
	this.return_values = null;
	this.valid = true;
}

Expectation.prototype = {
	
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
	passing: function() {
		// console.log('expected to be called passing: ('+object_to_array(arguments).join(', ')+')');
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
			if(self.parameters_matcher){
				self.parameters_matcher.match(arguments);
			}
			return self.return_values;
		}
	},
	verify: function(){
		// clear verification
		this.valid = true;
		this.local_report = new Array();
		// check if it's been invoved the correct number of times
		this.add_report("object: "+this.mock_name+'.'+this.method_name);
		if(this.invocation_count != this.expected_invocations){
			var invocation_reprt = 'FAIL wrong number of invocations, expected '+this.expected_invocations+' invoked '+this.invocation_count+' times';
			this.set_valid(false);
			this.add_report(invocation_reprt);
		}
		else{
			var invocation_reprt = 'PASS invoked '+this.invocation_count+' times';
			this.set_valid(true);
			this.add_report(invocation_reprt);
		}
		
		// check the parameters if any have been set
		if(this.parameters_matcher){
			param_report = this.parameters_matcher.report();
			if(param_report == true){
				this.set_valid(true);
			}
			else{
				this.set_valid(false);
				this.add_report('FAIL '+param_report);
			}
		}
		// console.log("returning: "+this.is_valid());
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
	report: function(){
		return this.local_report.join("\r\n");
	},
	add_report: function(report){
		this.local_report.push(report);
	},
	restore: function(){
		this.mock[this.method_name] = this.original_method;
	},
	get_name: function(mock) { 
	   var funcNameRegex = /function (.{1,})\(/;
	   var results = (funcNameRegex).exec((mock).constructor.toString());
	   return (results && results.length > 1) ? results[1] : "";
	}
}