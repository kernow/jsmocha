Screw.Matchers["be_an_object"] = {
  match: function(expected, actual) {
    return actual && typeof actual === 'object';
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + ' to be an object';
  }
};

Screw.Matchers["be_a_function"] = {
  match: function(expected, actual) {
    return typeof(actual) === 'function';
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + ' to be a function';
  }
};

Screw.Matchers["be_an_array"] = {
  match: function(expected, actual) {
    return Object.prototype.toString.call(actual) === '[object Array]';
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + ' to be an array';
  }
};
