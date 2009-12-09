//= require "../jsmocha"
jsMocha.Expectation = function(mock, method_name) {
	this.mock = mock;
	// TODO find a more robust way of getting the constructor and/or variable name
	this.mock_name = this.get_name(mock);
	this.method_name = method_name;
	this.actual_parameters = null;
	this.replace_method(mock, method_name);
  this.cardinality = jsMocha.Cardinality.exactly(1);
	this.invocation_count = 0;
	this.local_report = [];
	this.return_values = null;
	this.valid = true;
};

jsMocha.Expectation.prototype = {
	
	times: function(number) {
		this.cardinality = jsMocha.Cardinality.exactly(number);
		return this;
	},
	once: function() {
		this.cardinality = jsMocha.Cardinality.exactly(1);
		return this;
	},
	twice: function() {
		this.cardinality = jsMocha.Cardinality.exactly(2);
		return this;
	},
	never: function() {
		this.cardinality = jsMocha.Cardinality.exactly(0);
		return this;
	},
	at_least: function(number) {
		this.cardinality = jsMocha.Cardinality.at_least(number);
		return this;
	},
	at_most: function(number) {
		this.cardinality = jsMocha.Cardinality.at_most(number);
		return this;
	},
	passing: function() {
		this.parameters_matcher = new jsMocha.ParametersMatcher(arguments);
		return this;
	},
	returns: function() {
		this.return_values = arguments;
		return this;
	},
	replace_method: function(mock, method_name) {
		this.original_method = mock[method_name];
		var self = this;
		// runs in the context of the mocked object
		mock[method_name] = function(){
			self.invocation_count += 1;
			if(self.parameters_matcher){
				self.parameters_matcher.match(arguments);
			}
			if(self.return_values){ return self.next_return_value(); }
		};
	},
	next_return_value: function() {
	  var return_vals_length = this.return_values.length;
	  if( return_vals_length == 1 ){
	    return this.return_values[0];
	  }
	  else if( return_vals_length > 1 ){
	    var return_indxed = this.invocation_count-1;
	    if(return_indxed > return_vals_length-1){
	      return this.return_values[return_vals_length-1];
	    }
	    else{
	      return this.return_values[return_indxed];
      }
	  }
	},
	verify: function(){
		// clear verification
		this.valid = true;
		this.local_report = [];
		// check if it's been invoved the correct number of times
		this.add_report("object: "+this.mock_name+'.'+this.method_name);
		
    if(this.cardinality.verify(this.invocation_count)){
      this.set_valid(true);
			this.add_report('PASS '+this.cardinality.inspect()+' invoked '+this.cardinality.times(this.invocation_count));
		}
		else{
			this.set_valid(false);
			this.add_report('FAIL wrong number of invocations, '+this.cardinality.inspect()+' invoked '+this.cardinality.times(this.invocation_count));
		}
		
		// check the parameters if any have been set
		if(this.parameters_matcher){
			param_report = this.parameters_matcher.report();
			if(param_report === true){
				this.set_valid(true);
			}
			else{
				this.set_valid(false);
				this.add_report('FAIL '+param_report);
			}
		}
		// return any error messages
		return(this.is_valid());
	},
	set_valid: function(valid) {
		if(this.valid !== false){
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
};