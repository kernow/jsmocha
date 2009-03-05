
function ExpectationList() {
}

ExpectationList.prototype = {
	expectations: new Array(),

	add: function(expectation){
		this.expectations.push(expectation);
		return expectation;
	},
	matches_method: function(method_name){
		//return this.expectations.any? { |expectation| expectation.matches_method?(method_name) }
	},
	verify_all: function(){
		var results = new Array();
		for(var i = 0; i < this.expectations.length; i++){
			results.push(this.expectations[i].verify());
		}
		return this.all_valid(results);
	},
	all_valid: function(array){
		for(var i=0; i < array.length; i++){
			if(array[i] == false){
				return false;
			}
		}
		return true;
	},
	restore_all: function(){
		for(var i = 0; i < this.expectations.length; i++){
			this.expectations[i].restore();
		}
	},
};
