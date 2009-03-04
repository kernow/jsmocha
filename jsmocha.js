/*
function Mock(objectToMock) {
	
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
	return objectToMock;
} 

Mock.prototype = {
	
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
			alert('called expects for: '+ method_name);
			// store the original methods
			expectation = new Expectation(this, method_name);
			//this.methods[method_name] = this[method_name];
			//jsMocha.mockMethod(this, method_name);
			return expectation;
		};
		
		object.methods = [];
	}
}
*/