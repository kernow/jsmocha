//= require "../jsmocha"
jsMocha.ExpectationList = function() {
	this.expectations = {};
};

jsMocha.ExpectationList.prototype = {

	add: function(mock, method_name, options){
	  options = options || { type: 'mock' };
	  var expectation = new jsMocha.Expectation(mock, method_name);
	  var local_expectation = this.find_or_create(method_name);
	  this.store_local_expectation(local_expectation, expectation, options);
	  this.store_mocked_object(local_expectation, mock);
    this.replace_method(mock, method_name, local_expectation, options);
		return expectation;
	},
	find_or_create: function(name){
	  if(!this.expectations[name]){
	    this.expectations[name] = { expectations: { mock: [], spy: [], stub: [] }, obj: null, original_method: null, invocation_count: 0 };
	  }
	  return this.expectations[name];
	},
	store_local_expectation: function(local_expectation, expectation, options){
	  local_expectation.expectations[options.type].push(expectation); // stubs always need to be last in the array
	},
	store_mocked_object: function(expectation, obj) {
	  if(expectation.obj === null){
	    expectation.obj = obj;
	  }
	},
	replace_method: function(mock, method_name, expectation, options) {
	  var self = this;
	  if(expectation.original_method === null){
	    expectation.original_method = mock[method_name];
	  }
   // runs in the context of the mocked object
   mock[method_name] = function(){
     jsMocha.console.log("JSMOCHA INFO: method invoked with the parameters:");
     jsMocha.console.log(jsMocha.utility.extend(true, [], arguments));
     expectation.invocation_count += 1;
     var matched_expectation = self.check_for_matches(expectation.expectations.mock, arguments);
     if(matched_expectation === false){
       matched_expectation = self.check_for_matches(expectation.expectations.spy, arguments);
     }
     if(matched_expectation === false){
       matched_expectation = self.check_for_matches(expectation.expectations.stub, arguments);
     }
     if(matched_expectation !== false && matched_expectation.should_return_something()){
       return matched_expectation.next_return_value();
     }
     if(options.type == 'spy'){
       // May have issues with scope/context that will need investigating if they crop up
       expectation.original_method.apply(mock, arguments);
     }
   };
  },
  check_for_matches: function(expectations, args){
    var len = expectations.length;
    for(var i = 0; i < len; i++){
      if(expectations[i].match(args)){
        expectations[i].run_callbacks(args);
        return expectations[i]; // parameter match was found, return the expectation
      }
    }
    return false;
  },
	verify_all: function(){
		var results = [];
		for(var key in this.expectations){
		  if (this.expectations.hasOwnProperty(key)) {
		    jsMocha.console.log("JSMOCHA INFO: total invocations: "+this.expectations[key].invocation_count);
		    results = this.verify_each(this.expectations[key].expectations.mock, results);
		    results = this.verify_each(this.expectations[key].expectations.spy, results);
		    results = this.verify_each(this.expectations[key].expectations.stub, results);
  		}
		}
		// get the invocation count for all expectations
		// check it agains the invocation count
		return this.all_passed(results);
	},
	verify_each: function(expectations, results){
	  var len = expectations.length;
		for(var i = 0; i < len; i++){
			results.push(expectations[i].verify());
		}
		return results;
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
    		results = this.reports_for_each(this.expectations[key].expectations.mock, results);
		    results = this.reports_for_each(this.expectations[key].expectations.spy, results);
		    results = this.reports_for_each(this.expectations[key].expectations.stub, results);
  		}
		}
    // TODO get a report for the global invocation count
		return "\r\n"+results.join("\r\n");
	},
	reports_for_each: function(expectations, results){
	  var len = expectations.length;
		for(var i = 0; i < len; i++){
			results.push(expectations[i].report());
		}
		return results;
	},
	restore_all: function(){
	  for(var key in this.expectations){
		  if (this.expectations.hasOwnProperty(key)) {
		    this.restore(key, this.expectations[key]);
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
