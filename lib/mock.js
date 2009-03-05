
function Mock(objectToMock) {
	
	if(this.already_mocked(objectToMock)){
		console.log('object already mocked');
		return objectToMock;
	}
	
	this.expectations = new ExpectationList();
	mock = objectToMock || {};
	
	if(this.check_for_clashes(mock)){
		throw new Error("Cannot mock object, function names clash!!");
	}
	if( typeof(mock) == 'function' ) {
		// not dealing with functions for now
	} 
	else if( typeof(mock) == 'object') {
		this.add_methods_to_object(mock);
	} 
	else {
		throw new Error("Cannot mock something of type: " + typeof(mock));
	}
	return mock;
} 

Mock.prototype = {
	
	// might be able to add the verify method to the Mock object
	// will then not need it on the mocked object
	reservedNames: ['expects', 'verify', 'jsmocha'],
	
	already_mocked: function(object) {
		if(object.jsmocha){
			return true;
		}
		else{
			return false;
		}
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
			console.log('setting expectation for: '+ method_name);
			var expectation = new Expectation(this, method_name);
			this.jsmocha.expectations.add(expectation);
			return expectation;
		};
		// TODO move this out of the mocked objects namespace to further
		// avoid naming conflicts
		object.verify = function(){
			//console.log('verifying: '+this.name.toString());
			// check if all expectations have been satisfied
			var result = this.jsmocha.expectations.verify_all();
			this.jsmocha.teardown(this.jsmocha);
			return result;
		};
	},
	teardown: function(self){
		console.log('tearing down....');
		self.expectations.restore_all();
	}
}
