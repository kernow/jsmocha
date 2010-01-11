//= require "../jsmocha"
jsMocha.ExpectationList = function() {
	this.expectations = [];
};

jsMocha.ExpectationList.prototype = {

	add: function(mock, method_name){
	  var expectation = new jsMocha.Expectation(mock, method_name);
		this.expectations.push(expectation);
		return expectation;
	},
	verify_all: function(){
		var results = [];
		var len = this.expectations.length;
		for(var i = 0; i < len; i++){
			results.push(this.expectations[i].verify());
		}
		return this.all_passed(results);
	},
	all_passed: function(array){
	  var len = array.length;
		for(var i=0; i < len; i++){
			if(array[i] === false){
				return false;
			}
		}
		return true;
	},
	reports: function(){
		var results = [];
		var len = this.expectations.length;
		for(var i = 0; i < len; i++){
			results.push(this.expectations[i].report());
		}
		return "\r\n"+results.join("\r\n");
	},
	restore_all: function(){
	  var len = this.expectations.length;
		for(var i = 0; i < len; i++){
			this.expectations[i].restore();
		}
	}
};
