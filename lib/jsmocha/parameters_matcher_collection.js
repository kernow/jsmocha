
jsMocha.ParametersMatcherCollection = function() {
	this.parameters_matchers = [];
};

jsMocha.ParametersMatcherCollection.prototype = {

	add: function(parameters){
	  var parameters_matcher = new jsMocha.ParametersMatcher(parameters);
		this.parameters_matchers.push(parameters_matcher);
		return parameters_matcher;
	},
	match: function(parameters){
	  for(var i = 0; i < this.parameters_matchers.length; i++){
	    if(this.parameters_matchers[i].match(parameters)){
	      return true;
	    }
    }
    return false;
	},
	report: function(){
	  var results = [];
		for(var i = 0; i < this.parameters_matchers.length; i++){
		  var report = this.parameters_matchers[i].report();
		  if(report !== true){
			  results.push(report);
		  }
		}
		return results.length > 0 ? results.join("\r\n") : true;
	}
};
