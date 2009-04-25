
Mock = function(object) {

	mock = object || {};
	
	if(this.already_mocked(mock)){
		return mock;
	}
	
	this.expectations = new jsMocha.ExpectationCollection();
	
	if(this.check_for_clashes(mock)){
		throw new Error("Cannot mock object, function names clash!!");
	}
	if( typeof(mock) == 'function' ) {
	  this.add_methods_to_object(mock);
		// not dealing with functions for now
    throw new Error("Cannot mock something of type: " + typeof(mock));
	} 
	else if( typeof(mock) == 'object') {
		this.add_methods_to_object(mock);
	} 
	else {
		throw new Error("Cannot mock something of type: " + typeof(mock));
	}
	this.mock = mock;
	return mock;
} 

Mock.prototype = {
	reservedNames: ['expects', 'stubs', 'jsmocha'],
	
	already_mocked: function(object) {
		return object.jsmocha ? true : false;
	},
	check_for_clashes: function(object) {
		for( property in object ){
			if(this.in_array(property, this.reservedNames)){
				return true;
			}
		}
	},
	in_array: function(subject, array){
  	for(var i = 0; i < array.length; i++){
  		if(subject == array[i]){
  			return true;
			}
		}
  	return false;
	},
	add_methods_to_object: function(object, stub) {
		object.jsmocha = this;
	  object.stubs = function(method_name){
			var expectation = new jsMocha.Expectation(this, method_name);
			expectation.at_least(0);
			this.jsmocha.expectations.add(expectation);
			return expectation;
		};
		object.expects = function(method_name){
			var expectation = new jsMocha.Expectation(this, method_name);
			this.jsmocha.expectations.add(expectation);
			return expectation;
		};
	},
	verify: function(){
		var result = this.expectations.verify_all();
		return result;
	},
	report: function(){
		var reports = this.expectations.reports();
		this.teardown(mock);
		return reports;
	},
	teardown: function(){
		this.expectations.restore_all();
		delete this.mock.expects;
		delete this.mock.jsmocha;
	}
};
