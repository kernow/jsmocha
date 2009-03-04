
function ExpectationList() {
}

ExpectationList.prototype = {
  
	expectations: new Array(),

	add: function(expectation){
		//alert('adding expectation to the list');
		this.expectations.unshift(expectation);
		return expectation;
	},

	matches_method: function(method_name){
		//return this.expectations.any? { |expectation| expectation.matches_method?(method_name) }
	},

	verify_all: function(){
		for(var i = 0; i < this.expectations.length; i++){
			this.expectations[i].verify();
		}
		return false;
	}
};
