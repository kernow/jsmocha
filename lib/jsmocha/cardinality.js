/*global jsMocha: false */
//= require "../jsmocha"
jsMocha.Cardinality = new function() {
    function Cardinality(required, maximum) {
        this.required = required;
        this.maximum = maximum;
        
        this.verify = function(invocation_count) {
          return invocation_count >= this.required && invocation_count <= this.maximum ? true : false;
        };
        
        this.allowed_any_number_of_times = function() {
          return this.required === 0 && this.maximum == Infinity ? true : false;
        };
        
        this.inspect = function() {
          if(this.allowed_any_number_of_times()){
            return "allowed any number of times";
          }
          else{
            if(this.required === 0 && this.maximum === 0){
              return "expected never";
            }
            else if(this.required == this.maximum){
              return "expected exactly " + this.times(this.required);
            }
            else if(this.maximum == Infinity){
              return "expected at least " + this.times(this.required);
            }
            else if(this.required === 0){
              return "expected at most " + this.times(this.maximum);
            }
          }
        };
        
        this.times = function(number) {
          switch(number){
            case 0:
              return "no times";
            case 1:
              return "once";
            case 2:
              return "twice";
            default:
              return number + " times";
          }
        };
    }
    this.exactly = function(number) {
        return new Cardinality(number, number);
    };
    this.at_least = function(number) {
        return new Cardinality(number, Infinity);
    };
    this.at_most = function(number) {
        return new Cardinality(0, number);
    };
};
