//= require "../jsmocha"
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
  // extend the object and function objects to include the expects and subs methods
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
			var expectation = new jsMocha.Expectation(this, method_name);
			expectation.at_least(0);
			this.jsmocha.expectations.add(expectation);
			return expectation;
		};
		object.expects = function(method_name){
			var expectation = new jsMocha.Expectation(this, method_name);
			this.jsmocha.expectations.add(expectation);
			return expectation;
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
