function MethodMatcher(expected_method_name) {
	this.expected_method_name == expected_method_name
}

MethodMatcher.prototype = {
	match: function(actual_method_name) {
      return(this.expected_method_name == actual_method_name);
    }
};
