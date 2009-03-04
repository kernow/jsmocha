
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
  
  match: function(method_name, arguments){
    //return matching_expectations(method_name, *arguments).first;
  },
  
  match_allowing_invocation: function(method_name, arguments){
    //return matching_expectations(method_name, *arguments).detect { |e| e.invocations_allowed? }
  },
  
  verified: function(assertion_counter){
    //this.expectations.all? { |expectation| expectation.verified?(assertion_counter) }
  },
  
  to_a: function(){
    return this.expectations
  },
  
  to_set: function(){
    //return this.expectations.to_set
  },
  
  length: function(){
    return this.expectations.length
  },
  
  matching_expectations: function(method_name, arguments){
    //return this.expectations.select { |e| e.match?(method_name, *arguments) }
  },
  
};
