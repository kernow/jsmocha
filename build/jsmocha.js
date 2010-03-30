var jsMocha = {};
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
jsMocha.Expectation = function(mock, method_name) {
	this.mock = mock;
	this.mock_name = this.get_name(mock);
	this.method_name = method_name;
	this.actual_parameters = null;
	this.replace_method(mock, method_name);
  this.cardinality = jsMocha.Cardinality.exactly(1);
	this.invocation_count = 0;
	this.local_report = [];
	this.return_values = null;
	this.valid = true;
};

jsMocha.Expectation.prototype = {

	times: function(number) {
		this.cardinality = jsMocha.Cardinality.exactly(number);
		return this;
	},
	once: function() {
		this.cardinality = jsMocha.Cardinality.exactly(1);
		return this;
	},
	twice: function() {
		this.cardinality = jsMocha.Cardinality.exactly(2);
		return this;
	},
	never: function() {
		this.cardinality = jsMocha.Cardinality.exactly(0);
		return this;
	},
	at_least: function(number) {
		this.cardinality = jsMocha.Cardinality.at_least(number);
		return this;
	},
	at_most: function(number) {
		this.cardinality = jsMocha.Cardinality.at_most(number);
		return this;
	},
	passing: function() {
		this.parameters_matcher = new jsMocha.ParametersMatcher(arguments);
		return this;
	},
	returns: function() {
		this.return_values = arguments;
		return this;
	},
	replace_method: function(mock, method_name) {
		this.original_method = mock[method_name];
		var self = this;
		mock[method_name] = function(){
			self.invocation_count += 1;
			if(self.parameters_matcher){
				self.parameters_matcher.match(arguments);
			}
			if(self.return_values){ return self.next_return_value(); }
		};
	},
	next_return_value: function() {
	  var return_vals_length = this.return_values.length;
	  if( return_vals_length == 1 ){
	    return this.return_values[0];
	  }
	  else if( return_vals_length > 1 ){
	    var return_indxed = this.invocation_count-1;
	    if(return_indxed > return_vals_length-1){
	      return this.return_values[return_vals_length-1];
	    }
	    else{
	      return this.return_values[return_indxed];
      }
	  }
	},
	verify: function(){
		this.valid = true;
		this.local_report = [];
		this.add_report("object: "+this.mock_name+'.'+this.method_name);

    if(this.cardinality.verify(this.invocation_count)){
      this.set_valid(true);
			this.add_report('PASS '+this.cardinality.inspect()+' invoked '+this.cardinality.times(this.invocation_count));
		}
		else{
			this.set_valid(false);
			this.add_report('FAIL wrong number of invocations, '+this.cardinality.inspect()+' invoked '+this.cardinality.times(this.invocation_count));
		}

		if(this.parameters_matcher){
			param_report = this.parameters_matcher.report();
			if(param_report === true){
				this.set_valid(true);
			}
			else{
				this.set_valid(false);
				this.add_report('FAIL '+param_report);
			}
		}
		return(this.is_valid());
	},
	set_valid: function(valid) {
		if(this.valid !== false){
			this.valid = valid;
		}
	},
	is_valid: function() {
		return this.valid;
	},
	report: function(){
		return this.local_report.join("\r\n");
	},
	add_report: function(report){
		this.local_report.push(report);
	},
	restore: function(){
		this.mock[this.method_name] = this.original_method;
	},
	get_name: function(mock) {
	   var funcNameRegex = /function (.{1,})\(/;
	   var results = (funcNameRegex).exec((mock).constructor.toString());
	   return (results && results.length > 1) ? results[1] : "";
	}
};
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
Mock = function(object, force) {
	var mock = object || {};
	if(this.already_mocked(mock)){
		return mock;
	}
	this.expectations = new jsMocha.ExpectationList();
	if(this.check_for_clashes(mock) && !force){
		throw new Error("Cannot mock object, function names clash!!");
	}
	var type = typeof(mock);
	var type2 = Object.prototype.toString.call(object);
	if((type === 'function' || type === 'object') && (type2 !== '[object Date]' && type2 !== '[object Array]')) {
		this.add_methods_to_object(mock);
	} else {
		throw new Error("Cannot mock something of type: " + typeof(mock));
	}
	this.mock = mock;
	Mock.mocked_objects.push(mock);
	return mock;
};

Mock.mocked_objects = [];

Mock.mockerize = function(){
  Object.prototype.expects = function(method_name){
    if(Mock.is_real_call(arguments)){ return Mock.mock_from_expects(this, method_name); }
  };
  Function.prototype.expects = function(method_name){
    if(Mock.is_real_call(arguments)){ return Mock.mock_from_expects(this, method_name); }
  };
  Object.prototype.stubs = function(method_name){
    if(Mock.is_real_call(arguments)){ return Mock.mock_from_stubs(this, method_name); }
  };
  Function.prototype.stubs = function(method_name){
    if(Mock.is_real_call(arguments)){ return Mock.mock_from_stubs(this, method_name); }
  };
};

Mock.is_real_call = function(args){
  return args.length == 1 && typeof(args[0]) == 'string';
};

Mock.mock_from_expects = function(obj, method_name){
  var m = new Mock(obj, true);
  return obj.expects(method_name);
};

Mock.mock_from_stubs = function(obj, method_name){
  var m = new Mock(obj, true);
  return obj.stubs(method_name);
};

Mock.teardown_all = function(){
  var l = Mock.mocked_objects.length;
  for(var i = 0; i < l; i++){
    if(typeof Mock.mocked_objects[i].jsmocha !== 'undefined'){
      Mock.mocked_objects[i].jsmocha.teardown(true);
    }
  }
  Mock.mocked_objects = [];
};

Mock.remove_from_mocked_objects = function(obj){
  var l = Mock.mocked_objects.length;
  for(var i = 0; i < l; i++){
    if(Mock.mocked_objects[i] === obj){
      Mock.mocked_objects.splice(i,1);
      return;
    }
  }
};

Mock.prototype = {
	reservedNames: ['expects', 'stubs', 'jsmocha'],

	already_mocked: function(object) {
		return object.jsmocha ? true : false;
	},
	check_for_clashes: function(object) {
		for( property in object ){
			if(this.in_array(property, this.reservedNames)){
				return true;
			}
		}
	},
	in_array: function(subject, array){
	  var len = array.length;
  	for(var i = 0; i < len; i++){
  		if(subject == array[i]){
  			return true;
			}
		}
  	return false;
	},
	add_methods_to_object: function(object, stub) {
		object.jsmocha = this;
	  object.stubs = function(method_name){
      var expectation = this.jsmocha.expectations.add(this, method_name);
      expectation.at_least(0);
      return expectation;
		};
		object.expects = function(method_name){
			return this.jsmocha.expectations.add(this, method_name);
		};
	},
	verify: function(){
		var result = this.expectations.verify_all();
		return result;
	},
	report: function(){
		var reports = this.expectations.reports();
		this.teardown();
		return reports;
	},
	teardown: function(skip_remove){
	  if(!skip_remove){ Mock.remove_from_mocked_objects(this.mock); }
		this.expectations.restore_all();
		delete this.mock.expects;
		delete this.mock.stubs;
		delete this.mock.jsmocha;
	}
};
jsMocha.ParametersMatcher = function(expected_parameters) {
	this.expected_parameters = expected_parameters;
	this.serialize_stack_limit = 4;
	this.invocations = [];
};

jsMocha.ParametersMatcher.prototype = {

	valid: function() {
	  var len = this.invocations.length;
	  for(var i = 0; i < len; i++){
	    if(this.invocations[i] === false){
	      return false;
	    }
    }
    return true;
	},
	match: function(actual_parameters) {
	  this.actual_parameters = actual_parameters;
		if(this.block_given()){
		  this.invocations.push(this.block(actual_parameters));
		  return this.valid();
		}
		else{
      return this.parameters_match(actual_parameters);
    }
  },
	parameters_match: function(actual_parameters) {
	  var len = this.expected_parameters.length;
		for(var i = 0; i <= len; i++){
			if(actual_parameters[i] != this.expected_parameters[i]){
				this.invocations.push(false);
				return false;
			}
		}
		this.invocations.push(true);
		return true;
	},
	block_given: function() {
	  if(this.expected_parameters.length == 1 && this.is_function(this.expected_parameters[0])){
	    this.block = this.expected_parameters[0];
	    return true;
	  }
	  else{
	    return false;
	  }
	},
	is_function: function(o) {
	  return typeof o == 'function' || Object.prototype.toString.call(o) == '[object Function]' ? true : false;
	},
	report: function() {
		if(this.valid()) {
			return true;
		}
		else{
		  var msg = '';
		  if(this.block_given()){
		    msg += "received (";
	    }
	    else{
			  msg += "expected (";
			  msg += this.list_parameters(this.expected_parameters);
			  msg += ") but got (";
		  }
			msg += this.list_parameters(this.actual_parameters);
      msg += ")";
			return msg;
		}
	},
	list_parameters: function(parameters) {
    if(parameters){
         var a = [];
         var len = parameters.length;
         for(var i = 0; i < len; i++){
           a.push(this.serialize(parameters[i], 0));
         }
         return a.join(', ');
        }
	},
	serialize: function(obj, recursion_level) {
	  if(recursion_level > this.serialize_stack_limit){
	    return 'object too complex to fully display';
    }
	  if(obj === null){return 'null';}
    switch (typeof obj){
      case 'number':
      case 'boolean':
      case 'function':
        return obj;

      case 'string':
        return '"' + obj + '"';

      case 'object':
        var str;
        if (typeof obj.toSource !== 'undefined' && typeof obj.callee === 'undefined'){
          str = obj.toSource();
          return str.substring(1,str.length-1);
        }
        else{
          var a = [];
          if (obj.constructor === Array || typeof obj.callee !== 'undefined'){
            var len = obj.length - 1;
            for(var i = 0; i < len; i++) { a.push(this.serialize(obj[i], (recursion_level+1))); }
            a.push(this.serialize(obj[i], (recursion_level+1)));
            str = '[' + a.join(', ') + ']';
          }
          else{
            for(var key in obj) {
              if (obj.hasOwnProperty(key)) {
                a.push(key + ':' + this.serialize(obj[key], (recursion_level+1)));
              }
            }
            str = '{' + a.join(', ').replace(/\,$/, '') + '}';
          }
          return str;
        }

      default:
        return 'UNKNOWN';
    }
  }
};
