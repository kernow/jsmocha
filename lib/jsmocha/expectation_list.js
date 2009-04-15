
function ExpectationList() {
	this.expectations = new Array();
}

ExpectationList.prototype = {

	add: function(expectation){
		this.expectations.push(expectation);
		return expectation;
	},
	verify_all: function(){
		var results = new Array();
		for(var i = 0; i < this.expectations.length; i++){
			results.push(this.expectations[i].verify());
		}
		return this.all_passed(results);
	},
	all_passed: function(array){
		for(var i=0; i < array.length; i++){
			if(array[i] == false){
				return false;
			}
		}
		return true;
	},
	reports: function(){
		var results = new Array();
		for(var i = 0; i < this.expectations.length; i++){
			results.push(this.expectations[i].report());
		}
		return "\r\n"+results.join("\r\n");
	},
	restore_all: function(){
		for(var i = 0; i < this.expectations.length; i++){
			this.expectations[i].restore();
		}
	},
};
