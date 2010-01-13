//= require "../jsmocha"
jsMocha.ExpectationList = function() {
	this.expectations = {};
};

jsMocha.ExpectationList.prototype = {

	add: function(mock, method_name){
	  var expectation = new jsMocha.Expectation(mock, method_name);
	  var local_expectation = this.find_or_create(method_name);
	  local_expectation.expectations.push(expectation);
	  this.store_mocked_object(local_expectation, mock);
    this.replace_method(mock, method_name, local_expectation);
		return expectation;
	},
	find_or_create: function(name){
	  if(!this.expectations[name]){
	    this.expectations[name] = { expectations: [], obj: null, original_method: null, invocation_count: 0 };
	  }
	  return this.expectations[name];
	},
	store_mocked_object: function(expectation, obj) {
	  if(expectation.obj === null){
	    expectation.obj = obj;
	  }
	},
	replace_method: function(mock, method_name, expectation) {
   expectation.original_method = mock[method_name];
   // runs in the context of the mocked object
   mock[method_name] = function(){
     expectation.invocation_count += 1;
     var len = expectation.expectations.length;
     for(var i = 0; i < len; i++){
       if(expectation.expectations[i].match(arguments)){
         if(expectation.expectations[i].should_return_something()){ return expectation.expectations[i].next_return_value(); }
         break; // parameter match was found, stop execution of loop
       }
     }
   };
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
		    results.push("object: " + this.get_name(this.expectations[key].obj) + '.' + key);
		    results.push("INFO called " + this.expectations[key].invocation_count + " time(s)");
  		  var len = this.expectations[key].expectations.length;
    		for(var i = 0; i < len; i++){
    			results.push(this.expectations[key].expectations[i].report());
    		}
  		}
		}
    // TODO get a report for the global invocation count
		return "\r\n"+results.join("\r\n");
	},
	restore_all: function(){
	  for(var key in this.expectations){
		  if (this.expectations.hasOwnProperty(key)) {
		    this.restore(key, this.expectations[key]);
        // var len = this.expectations[key].expectations.length;
        //        for(var i = 0; i < len; i++){
        //          this.expectations[key].expectations[i].restore();
        //        }
  		}
		}
	},
  restore: function(method_name, expectation){
    expectation.obj[method_name] = expectation.original_method;
  },
  get_name: function(mock) { 
	   var funcNameRegex = /function (.{1,})\(/;
	   var results = (funcNameRegex).exec((mock).constructor.toString());
	   return (results && results.length > 1) ? results[1] : "";
	}
};
