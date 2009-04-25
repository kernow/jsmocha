
jsMocha.ExpectationCollection = function() {
	this.expectations = [];
}

jsMocha.ExpectationCollection.prototype = {

	add: function(expectation){
		this.expectations.push(expectation);
		return expectation;
	},
	verify_all: function(){
		var results = [];
		for(var i = 0; i < this.expectations.length; i++){
			results.push(this.expectations[i].verify());
		}
		return this.all_passed(results);
	},
	all_passed: function(array){
		for(var i=0; i < array.length; i++){
			if(array[i] === false){
				return false;
			}
		}
		return true;
	},
	reports: function(){
		var results = [];
		for(var i = 0; i < this.expectations.length; i++){
			results.push(this.expectations[i].report());
		}
		return "\r\n"+results.join("\r\n");
	},
	restore_all: function(){
		for(var i = 0; i < this.expectations.length; i++){
			this.expectations[i].restore();
		}
	}
};
