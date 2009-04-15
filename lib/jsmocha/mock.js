
function Mock(objectToMock) {

	mock = objectToMock || {};
	
	if(this.already_mocked(mock)){
		// console.log('object already mocked');
		return mock;
	}
	
	this.expectations = new ExpectationList();
	
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
	reservedNames: ['expects', 'jsmocha'],
	
	already_mocked: function(object) {
		return object.jsmocha ? true : false;
	},
	check_for_clashes: function(object) {
		for( property in object ){
			if(this.reservedNames.inArray(property)){
				return true;
			}
		}
	},
	add_methods_to_object: function(object) {
		object.jsmocha = this;
		object.expects = function(method_name){
			// console.log('setting expectation for: '+ method_name);
			var expectation = new Expectation(this, method_name);
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
}