//= require "../jsmocha"
jsMocha.ExpectationList = function() {
	this.expectations = {};
};

jsMocha.ExpectationList.prototype = {

	add: function(mock, method_name){
	  var expectation = new jsMocha.Expectation(mock, method_name);
	  this.find_or_create(method_name).expectations.push(expectation);
		return expectation;
	},
	find_or_create: function(name){
	  if(!this.expectations[name]){
	    this.expectations[name] = { expectations: [], original_method: null };
	  }
	  return this.expectations[name];
	},
	verify_all: function(){
		var results = [];
		for(var key in this.expectations){
		  if (this.expectations.hasOwnProperty(key)) {
  		  var len = this.expectations[key].expectations.length;
    		for(var i = 0; i < len; i++){
    			results.push(this.expectations[key].expectations[i].verify());
    		}
  		}
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
		for(var key in this.expectations){
		  if (this.expectations.hasOwnProperty(key)) {
  		  var len = this.expectations[key].expectations.length;
    		for(var i = 0; i < len; i++){
    			results.push(this.expectations[key].expectations[i].report());
    		}
  		}
		}
		return "\r\n"+results.join("\r\n");
	},
	restore_all: function(){
	  for(var key in this.expectations){
		  if (this.expectations.hasOwnProperty(key)) {
  		  var len = this.expectations[key].expectations.length;
    		for(var i = 0; i < len; i++){
    			this.expectations[key].expectations[i].restore();
    		}
  		}
		}
	}
};
