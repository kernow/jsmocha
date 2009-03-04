
function Mock(objectToMock) {
	
	this.expectations = new ExpectationList();
	
	if(objectToMock != null) {
		
		if(this.checkForClashes(objectToMock)){
			throw new Error("Cannot mock object, function names clash!!");
		}
		
		if( typeof(objectToMock) == 'function' ) {
			// not dealing with functions for now
		} 
		else if( typeof(objectToMock) == 'object') {
			this.addMethodsToObject(objectToMock);
		} 
		else {
			throw new Error("Cannot mock something of type: " + typeof(objectToMock));
		}
	}
	else {
		objectToMock = {};
		this.addMethodsToObject(objectToMock);
	}
	// set self to refer to this object for use 
	// with setting expectations on the mock object
	self = this;
	return objectToMock;
} 

Mock.prototype = {
	
	// might be able to add the verify method to the Mock object
	// will then not need it on the mocked object
	reservedNames: ['expects', 'verify'],
	
	checkForClashes: function(object) {
		for( property in object ){
			if(this.reservedNames.inArray(property)){
				return true;
			}
		}
	},
	
	addMethodsToObject: function(object) {
		object.expects = function(method_name){
			// alert('setting expectation for: '+ method_name);
			expectation = new Expectation(this, method_name);
			self.expectations.add(expectation);
			return expectation;
		};
		object.verify = function(){
			// check if all expectations have been satisfied
			return self.expectations.verify_all();
		};
	}
}
